import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../assets/Omm.jpg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo and Site Name */}
          <div className="flex items-center space-x-3">
            <img
              src={LogoImage}
              alt="Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-lg font-bold">Sample Site Name</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" label="Home" />
            <NavLink to="/about" label="About" />
            <NavLink to="/contact" label="Contact" />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2">
            <NavLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
            <NavLink to="/about" label="About" onClick={() => setMenuOpen(false)} />
            <NavLink to="/contact" label="Contact" onClick={() => setMenuOpen(false)} />
          </div>
        )}
      </nav>
    </header>
  );
}

// Reusable NavLink component
function NavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-lg font-semibold hover:text-blue-300 transition"
    >
      {label}
    </Link>
  );
}

export default Header;
