import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
          SanjYou🤖
        </Link>

        {/* Navigation */}
        <ul className="flex items-center space-x-6 text-sm font-medium">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Home
            </Link>
          </li>

          {user ? (
            <>
              <li className="text-gray-600">Hi, {user.name}</li>
              {user.role === "admin" && (
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition duration-200"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="backdrop-blur-md bg-white/30 text-red-700 font-semibold px-5 py-2 rounded-xl border border-red-500 hover:bg-red-100 hover:shadow-lg hover:border-red-700 transition-all duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">
                <button className="backdrop-blur-md bg-white/30 text-blue-700 font-semibold px-5 py-2 rounded-xl border border-blue-500 hover:bg-blue-100 hover:shadow-lg hover:border-blue-700 transition-all duration-300">
                  Sign In
                </button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
