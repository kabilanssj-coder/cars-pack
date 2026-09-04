import { DEALERSHIP } from "../../config/constants";

const AdminSettings = () => (
  <div>
    <p className="uppercase-label mb-2">Configuration</p>
    <h1 className="font-display text-3xl md:text-4xl mb-8">SETTINGS</h1>

    <div className="bg-black2 border border-white/10 p-6 md:p-8 max-w-2xl space-y-6">
      <div>
        <p className="uppercase-label mb-1.5">Dealership Name</p>
        <p className="text-sm">{DEALERSHIP.name}</p>
      </div>
      <div>
        <p className="uppercase-label mb-1.5">Phone</p>
        <p className="text-sm">+91 {DEALERSHIP.phone}</p>
      </div>
      <div>
        <p className="uppercase-label mb-1.5">WhatsApp</p>
        <p className="text-sm">+91 {DEALERSHIP.whatsapp}</p>
      </div>
      <div>
        <p className="uppercase-label mb-1.5">Email</p>
        <p className="text-sm">{DEALERSHIP.email}</p>
      </div>
      <div>
        <p className="uppercase-label mb-1.5">Instagram</p>
        <p className="text-sm">{DEALERSHIP.instagram}</p>
      </div>

      <div className="pt-4 border-t border-white/10">
        <p className="text-xs text-silver leading-relaxed">
          Core identity details (name, phone, WhatsApp, email, Instagram) are set in the frontend
          configuration file for security and consistency. To change them, edit{" "}
          <code className="text-accent">frontend/src/config/constants.js</code> and redeploy.
          Branch addresses, hours and map links can be edited from the{" "}
          <span className="text-offwhite">Branches</span> page without touching code. Security
          secrets (JWT secret, database credentials, Cloudinary keys, email password, admin
          password) are never editable from this console — they live only in the backend{" "}
          <code className="text-accent">.env</code> file.
        </p>
      </div>
    </div>
  </div>
);

export default AdminSettings;
