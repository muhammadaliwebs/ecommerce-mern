import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#020617] shadow-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/30">
            <span className="text-xl">📦</span>
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-wide text-white">
              Product
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Hub
              </span>
            </h1>

            <p className="text-xs text-slate-400">MERN Dashboard</p>
          </div>
        </NavLink>

        {/* Navigation */}
        <ul className="flex items-center gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/addProduct"
              className={({ isActive }) =>
                `rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Add Product
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
