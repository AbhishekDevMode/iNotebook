import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/NoteContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(noteContext);
  const { user, getUser } = context;

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      getUser();
    }
  }, [token, user, getUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <Link
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-emerald-800 hover:text-emerald-900 transition-colors"
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 shadow-xs">
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span>iNotebook</span>
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors md:hidden"
          aria-controls="navbar-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-xl">
            {menuOpen ? "✕" : "☰"}
          </span>
        </button>

        {/* Navigation items */}
        <div
          id="navbar-menu"
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full pt-4 md:flex md:w-auto md:items-center md:gap-6 md:pt-0`}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:items-center">
            <li>
              <Link
                className={`block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  location.pathname === "/"
                    ? "bg-emerald-50 text-emerald-900 font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  location.pathname === "/about"
                    ? "bg-emerald-50 text-emerald-900 font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
                to="/about"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-100 pt-4 md:mt-0 md:flex-row md:items-center md:border-0 md:pt-0">
            {!token ? (
              <>
                <Link
                  className="inline-flex min-h-9 items-center justify-center rounded-lg border border-emerald-600 px-4 py-1.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="inline-flex min-h-9 items-center justify-center rounded-lg bg-emerald-700 px-4.5 py-1.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-emerald-800"
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {user && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-emerald-200/80 font-bold text-emerald-900">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                    <span className="max-w-[120px] truncate">{user.name}</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-xs transition-colors hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
