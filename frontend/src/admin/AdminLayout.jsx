import { useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  MessageSquare,
  Tag,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/cars", label: "Cars", icon: Car },
  { to: "/admin/cars/new", label: "Add Car", icon: PlusCircle },
  { to: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { to: "/admin/sell-requests", label: "Sell Requests", icon: Tag },
  { to: "/admin/branches", label: "Branches", icon: MapPin },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = () => {
  const { user, loading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center text-silver text-sm">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-charcoal flex">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black2 border-b border-white/10 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Big Boys 18+" className="h-8 w-8 object-contain rounded-sm" />
          <span className="font-display text-sm">DEALER CONSOLE</span>
        </div>
        <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>

      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-black2 border-r border-white/10 shrink-0">
        <SidebarContent user={user} logout={logout} />
      </aside>

      {/* Sidebar (mobile drawer) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/70" onClick={() => setMobileOpen(false)}>
          <aside
            className="w-64 h-full bg-black2 border-r border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <SidebarContent user={user} logout={logout} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0 pt-16 lg:pt-0">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const SidebarContent = ({ user, logout, onNavigate }) => (
  <>
    <div className="hidden lg:flex items-center gap-3 px-6 py-6 border-b border-white/10">
      <img src="/logo.jpg" alt="Big Boys 18+" className="h-9 w-9 object-contain rounded-sm" />
      <div>
        <p className="font-display text-sm leading-none">DEALER CONSOLE</p>
        <p className="text-[10px] text-silver mt-1">BIG BOYS 18+</p>
      </div>
    </div>

    <nav className="flex-1 px-3 py-6 space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm rounded-sm transition-colors ${
              isActive
                ? "bg-accent/15 text-accent border-l-2 border-accent"
                : "text-silver hover:bg-white/5 hover:text-offwhite border-l-2 border-transparent"
            }`
          }
        >
          <item.icon size={18} />
          {item.label}
        </NavLink>
      ))}
    </nav>

    <div className="px-6 py-5 border-t border-white/10">
      <p className="text-xs text-silver mb-3 truncate">{user?.email}</p>
      <button
        onClick={logout}
        className="flex items-center gap-2 text-xs text-silver hover:text-accent transition-colors"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  </>
);

export default AdminLayout;
