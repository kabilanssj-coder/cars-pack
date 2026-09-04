import { useState, useRef, useEffect } from "react";
import { UploadCloud, X, Star, Loader2, GripVertical, AlertCircle } from "lucide-react";
import { uploadCarImages, deleteCarImage, updateCar } from "../../services/carService";

const categories = ["EXTERIOR", "INTERIOR", "DASHBOARD", "ENGINE", "DETAILS"];
const MAX_IMAGES = 25;
const MAX_FILE_MB = 5;

/**
 * Admin image uploader for a single car.
 *
 * Ownership model: this component is the source of truth for persistence.
 * Upload / delete / set-main / reorder all write straight to
 * PUT /api/cars/:id (or the dedicated image endpoints) as soon as the user
 * acts, with optimistic local updates that roll back on failure so a
 * network error can never silently "lose" a change. onImagesChange keeps
 * the parent form's local state mirrored for the rest of the form/preview.
 */
const ImageUploader = ({ carId, images, onImagesChange }) => {
  const [localImages, setLocalImages] = useState(images || []);
  const [category, setCategory] = useState("EXTERIOR");
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [persisting, setPersisting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // dragIndex tracks which thumbnail is currently being dragged for reorder
  const dragIndex = useRef(null);
  const [overIndex, setOverIndex] = useState(null);

  // Keep local list in sync if the parent swaps cars (e.g. navigating between edits)
  useEffect(() => {
    setLocalImages(images || []);
  }, [carId]); // eslint-disable-line react-hooks/exhaustive-deps

  const persist = async (nextImages, rollbackImages) => {
    setError("");
    setPersisting(true);
    try {
      const res = await updateCar(carId, { images: nextImages });
      const saved = res.data.images;
      setLocalImages(saved);
      onImagesChange(saved);
      return true;
    } catch (err) {
      // Roll back so the UI never shows a change that didn't actually save
      setLocalImages(rollbackImages);
      onImagesChange(rollbackImages);
      setError(err.response?.data?.message || "Could not save your change. Please try again.");
      return false;
    } finally {
      setPersisting(false);
    }
  };

  const handleFiles = async (fileList) => {
    setError("");
    const files = Array.from(fileList);
    if (!files.length) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalid = files.find((f) => !validTypes.includes(f.type));
    if (invalid) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      return;
    }
    const tooLarge = files.find((f) => f.size > MAX_FILE_MB * 1024 * 1024);
    if (tooLarge) {
      setError(`Each image must be under ${MAX_FILE_MB}MB.`);
      return;
    }
    if (localImages.length + files.length > MAX_IMAGES) {
      setError(
        `Maximum ${MAX_IMAGES} images per vehicle. This car has ${localImages.length}, so you can add up to ${
          MAX_IMAGES - localImages.length
        } more.`
      );
      return;
    }
    if (!carId) {
      setError("Save the car as a draft first, then upload photos.");
      return;
    }

    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));
    formData.append("category", category);

    setUploading(true);
    setProgress(0);
    try {
      const res = await uploadCarImages(carId, formData, setProgress);
      setLocalImages(res.data.images);
      onImagesChange(res.data.images);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDelete = async (publicId) => {
    if (!carId) return;
    setError("");
    const rollback = localImages;
    // Optimistic removal
    setLocalImages((prev) => prev.filter((img) => img.publicId !== publicId));
    try {
      const res = await deleteCarImage(carId, publicId);
      setLocalImages(res.data.images);
      onImagesChange(res.data.images);
    } catch (err) {
      setLocalImages(rollback);
      onImagesChange(rollback);
      setError(err.response?.data?.message || "Could not delete this image. Please try again.");
    }
  };

  const handleSetMain = (targetPublicId) => {
    const rollback = localImages;
    const updated = localImages.map((img) => ({ ...img, isMain: img.publicId === targetPublicId }));
    setLocalImages(updated); // optimistic, so the star updates instantly
    persist(updated, rollback);
  };

  // --- Drag-and-drop reordering among existing thumbnails ---
  const handleDragStart = (index) => (e) => {
    dragIndex.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (index) => (e) => {
    e.preventDefault();
    setOverIndex(index);
  };

  const handleDragOverThumb = (e) => {
    e.preventDefault();
  };

  const handleDropReorder = (index) => (e) => {
    e.preventDefault();
    setOverIndex(null);
    const from = dragIndex.current;
    dragIndex.current = null;
    if (from === null || from === index) return;

    const reordered = [...localImages];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(index, 0, moved);
    // Recompute the persisted `order` field to match the new sequence
    const withOrder = reordered.map((img, i) => ({ ...img, order: i }));

    const rollback = localImages;
    setLocalImages(withOrder); // optimistic reorder
    persist(withOrder, rollback);
  };

  const handleDragEnd = () => {
    dragIndex.current = null;
    setOverIndex(null);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 text-[10px] tracking-widest2 uppercase font-semibold border transition-colors ${
              category === c ? "bg-accent border-accent text-white" : "border-white/10 text-silver"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
          dragOver ? "border-accent bg-accent/5" : "border-white/15 hover:border-white/30"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="animate-spin text-accent" size={28} />
            <p className="text-sm text-silver">Uploading... {progress}%</p>
            <div className="w-full max-w-xs h-1.5 bg-white/10 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <UploadCloud className="text-silver" size={32} />
            <p className="text-sm font-semibold tracking-wide">DROP CAR PHOTOS HERE</p>
            <p className="text-xs text-silver">
              or click to choose photos ({category}) &middot; {localImages.length}/{MAX_IMAGES} used
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-accent text-xs mt-3 flex items-center gap-1.5">
          <AlertCircle size={13} /> {error}
        </p>
      )}
      {persisting && !error && (
        <p className="text-silver text-xs mt-3 flex items-center gap-1.5">
          <Loader2 size={12} className="animate-spin" /> Saving...
        </p>
      )}

      {localImages.length > 0 && (
        <>
          <p className="text-[10px] tracking-widest2 uppercase text-silver/60 mt-6 mb-2">
            Drag photos to reorder &middot; the first photo is used as the card thumbnail unless a main image is set
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {localImages.map((img, index) => (
              <div
                key={img.publicId}
                draggable
                onDragStart={handleDragStart(index)}
                onDragEnter={handleDragEnter(index)}
                onDragOver={handleDragOverThumb}
                onDrop={handleDropReorder(index)}
                onDragEnd={handleDragEnd}
                className={`relative group border transition-colors cursor-grab active:cursor-grabbing ${
                  overIndex === index ? "border-accent" : "border-white/10"
                }`}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-sm p-0.5">
                  <GripVertical size={12} className="text-silver" />
                </div>
                <img src={img.url} alt={img.category} className="w-full h-28 object-cover pointer-events-none" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-between">
                    <span className="text-[9px] tracking-widest2 uppercase bg-black/60 px-2 py-1">
                      {img.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(img.publicId)}
                      className="bg-black/60 p-1 hover:text-accent"
                      title="Delete image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSetMain(img.publicId)}
                    disabled={persisting}
                    className={`self-start flex items-center gap-1 text-[9px] tracking-widest2 uppercase px-2 py-1 disabled:opacity-50 ${
                      img.isMain ? "bg-accent text-white" : "bg-black/60 text-silver"
                    }`}
                  >
                    <Star size={11} fill={img.isMain ? "currentColor" : "none"} />
                    {img.isMain ? "Main" : "Set Main"}
                  </button>
                </div>
                {img.isMain && (
                  <span className="absolute top-2 left-2 bg-accent text-white text-[9px] tracking-widest2 uppercase px-2 py-0.5 group-hover:opacity-0 transition-opacity">
                    Main
                  </span>
                )}
                <span className="absolute bottom-2 right-2 bg-black/60 text-[9px] text-silver px-1.5 py-0.5 group-hover:opacity-0 transition-opacity">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
