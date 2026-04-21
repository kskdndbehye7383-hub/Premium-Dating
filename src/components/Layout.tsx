import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Flame, MessageCircle, User } from "lucide-react";
import { cn } from "../lib/utils";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-white text-gray-900 w-full overflow-hidden">
      {/* Desktop Sidebar Navigation */}
      <nav className="w-20 md:w-64 border-r border-gray-100 bg-white flex flex-col pt-8 pb-4 shrink-0 transition-all duration-300">
        <div className="px-6 mb-8 flex items-center justify-center md:justify-start">
          <div className="w-10 h-10 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-200">
            <Flame className="text-white" size={24} />
          </div>
          <span className="hidden md:block ml-3 font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
            Spark
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-2 px-2 md:px-4">
          <NavItem to="/" icon={<Flame size={24} />} label="Discover" />
          <NavItem to="/matches" icon={<MessageCircle size={24} />} label="Messages" />
          <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative bg-gray-50/50">
        <Outlet />
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center p-3 rounded-xl transition-all duration-200 group",
          isActive
            ? "bg-rose-50 text-rose-500"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        )
      }
    >
      <div className="flex items-center justify-center w-10 md:w-auto md:mr-3">
        {icon}
      </div>
      <span className="hidden md:block font-medium">{label}</span>
    </NavLink>
  );
}
