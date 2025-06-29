import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {activeUser, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="w-full bg-[#27213C] text-white sticky top-0 z-50">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">My Site</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 font-semibold text-lg">
          <Link to="/" className="relative inline-block text-white group">
            Home
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link to="/cart" className="relative inline-block text-white group">
            Cart
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
          </Link>

          {activeUser ? (
            <button onClick={handleLogout} className="relative inline-block text-white group">
              Hello, {activeUser}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          ) : (
            <Link to="/login" className="relative inline-block text-white group">
              Login
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(true)} className="md:hidden text-3xl font-bold" aria-label="Open Menu">
          ☰
        </button>
      </nav>

      {/* Overlay */}
      {menuOpen && <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-40" />}

      {/* Slide-in Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#27213C] z-50 p-6 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}>
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold">Menu</div>
          <button onClick={() => setMenuOpen(false)} className="text-2xl font-bold">
            ✖
          </button>
        </div>
        <ul className="flex flex-col gap-6 text-xl font-semibold">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
