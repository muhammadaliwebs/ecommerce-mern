import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#020617] shadow-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/30 sm:h-11 sm:w-11">
            <span className="text-lg sm:text-xl">📦</span>
          </div>

          <div>
            <h1 className="text-xl font-black text-white sm:text-2xl">
              Product
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Hub
              </span>
            </h1>

            <p className="text-[11px] text-slate-400 sm:text-xs">
              MERN Dashboard
            </p>
          </div>
        </NavLink>

        {/* Navigation */}
        <ul className="flex w-full justify-center gap-2 sm:w-auto sm:gap-4">
          <li className="flex-1 sm:flex-none">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2 text-center text-sm font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Products
            </NavLink>
          </li>

          <li className="flex-1 sm:flex-none">
            <NavLink
              to="/addProduct"
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2 text-center text-sm font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 ${
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