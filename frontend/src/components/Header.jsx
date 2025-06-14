import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import {
  LogOut,
  LogIn,
  Home,
  LayoutDashboard,
  Menu,
  User,
  X,
} from "lucide-react";
import { FaFeatherAlt } from "react-icons/fa"; // Classy feather icon

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl">
      <nav className="flex justify-between items-center py-3 px-6">
        {/* Logo & Brand */}
        <Link
          to="/"
          className="flex items-center space-x-3 text-blue-800 hover:text-blue-900 transition"
        >
          <FaFeatherAlt className="text-2xl text-indigo-700 drop-shadow-md" />
          <span className="text-xl font-[Playfair Display] font-semibold tracking-wide text-gray-800">
            Jobora
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
          </li>

          {user ? (
            <>
              <li className="flex items-center space-x-1 text-gray-600">
                <User size={18} />
                <span>{user.name}</span>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 font-semibold px-4 py-2 rounded-xl border border-red-500 hover:bg-red-100 hover:shadow-md transition"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">
                <button className="flex items-center space-x-2 text-blue-700 font-semibold px-4 py-2 rounded-xl border border-blue-500 hover:bg-blue-100 hover:shadow-md transition">
                  <LogIn size={18} />
                  <span>Sign In</span>
                </button>
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="space-y-4 text-sm font-medium">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
            </li>

            {user ? (
              <>
                <li className="flex items-center space-x-2 text-gray-600">
                  <User size={18} />
                  <span>{user.name}</span>
                </li>

                {user.role === "admin" && (
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                    >
                      <LayoutDashboard size={18} />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                )}

                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-600 font-semibold px-4 py-2 rounded-xl border border-red-500 hover:bg-red-100 hover:shadow-md transition"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="flex items-center space-x-2 text-blue-700 font-semibold px-4 py-2 rounded-xl border border-blue-500 hover:bg-blue-100 hover:shadow-md transition">
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
