import { AlertTriangle, SearchX } from "lucide-react";
import { GhostButton } from "./Buttons";

export const CarCardSkeleton = () => (
  <div className="bg-black2 border border-white/5 overflow-hidden animate-pulse">
    <div className="aspect-[4/3] bg-white/5" />
    <div className="p-5 space-y-3">
      <div className="h-3 w-16 bg-white/5" />
      <div className="h-6 w-3/4 bg-white/5" />
      <div className="h-4 w-1/2 bg-white/5" />
      <div className="h-5 w-1/3 bg-white/5" />
    </div>
  </div>
);

export const CarGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <CarCardSkeleton key={i} />
    ))}
  </div>
);

export const EmptyState = ({
  title = "NO VEHICLES FOUND",
  subtitle = "Try changing your filters.",
  actionLabel = "CLEAR FILTERS",
  onAction,
}) => (
  <div className="flex flex-col items-center justify-center text-center py-24 px-4">
    <SearchX size={40} className="text-silver/40 mb-6" />
    <h3 className="font-display text-2xl mb-2">{title}</h3>
    <p className="text-silver text-sm mb-6">{subtitle}</p>
    {onAction && <GhostButton onClick={onAction}>{actionLabel}</GhostButton>}
  </div>
);

export const ErrorState = ({
  title = "UNABLE TO CONNECT",
  subtitle = "Please check the server connection.",
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center text-center py-24 px-4">
    <AlertTriangle size={40} className="text-accent mb-6" />
    <h3 className="font-display text-2xl mb-2">{title}</h3>
    <p className="text-silver text-sm mb-6">{subtitle}</p>
    {onRetry && <GhostButton onClick={onRetry}>RETRY</GhostButton>}
  </div>
);

export const TableSkeleton = ({ rows = 6, cols = 5 }) => (
  <div className="w-full animate-pulse">
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="flex gap-4 py-4 border-b border-white/5">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} className="h-4 bg-white/5 flex-1" />
        ))}
      </div>
    ))}
  </div>
);
