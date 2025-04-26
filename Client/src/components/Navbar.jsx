import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut, UserPlus, LogIn, Menu, X, PenSquare, Home, BookOpen } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white hover:text-indigo-100 transition">
            <span className="bg-white text-indigo-700 px-2 py-1 rounded-md mr-1">404</span>
            .js Blog
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 mx-auto">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white font-semibold hover:bg-white/20 px-4 py-2 rounded-md transition"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link
            to="/articles"
            className="flex items-center space-x-2 text-white font-semibold hover:bg-white/20 px-4 py-2 rounded-md transition"
          >
            <BookOpen size={18} />
            <span>Articles</span>
          </Link>
          <Link
            to="/articles/create"
            className="flex items-center space-x-2 bg-white text-indigo-700 px-4 py-2 rounded-md font-semibold hover:bg-indigo-100 transition"
          >
            <PenSquare size={18} />
            <span>New Article</span>
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-md font-semibold hover:bg-red-200 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
              <span className="px-4 py-2 bg-white/90 text-indigo-700 rounded-full text-sm font-bold shadow-sm">
                {user.name}
              </span>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="flex items-center space-x-2 bg-white/90 text-indigo-700 px-4 py-2 rounded-md font-semibold hover:bg-white transition"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link 
                to="/register" 
                className="flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md font-semibold hover:bg-indigo-200 transition"
              >
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none p-2 rounded-md hover:bg-white/20"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-800/95 py-4 px-4 space-y-3">
          <Link
            to="/"
            className="block w-full text-left flex items-center space-x-3 text-white font-semibold hover:bg-white/20 px-4 py-3 rounded-md transition"
            onClick={() => setIsOpen(false)}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link
            to="/articles"
            className="block w-full text-left flex items-center space-x-3 text-white font-semibold hover:bg-white/20 px-4 py-3 rounded-md transition"
            onClick={() => setIsOpen(false)}
          >
            <BookOpen size={18} />
            <span>Articles</span>
          </Link>
          <Link
            to="/articles/create"
            className="block w-full text-left flex items-center space-x-3 bg-white text-indigo-700 px-4 py-3 rounded-md font-semibold hover:bg-indigo-100 transition"
            onClick={() => setIsOpen(false)}
          >
            <PenSquare size={18} />
            <span>New Article</span>
          </Link>

          {user ? (
            <div className="space-y-3 pt-2 border-t border-white/20">
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left flex items-center space-x-3 bg-red-100 text-red-700 px-4 py-3 rounded-md font-semibold hover:bg-red-200 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
              <div className="px-4 py-2 bg-white/90 text-indigo-700 rounded-full text-sm font-bold text-center">
                {user.name}
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-2 border-t border-white/20">
              <Link 
                to="/login" 
                className="block w-full text-left flex items-center space-x-3 bg-white/90 text-indigo-700 px-4 py-3 rounded-md font-semibold hover:bg-white transition"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link 
                to="/register" 
                className="block w-full text-left flex items-center space-x-3 bg-indigo-100 text-indigo-700 px-4 py-3 rounded-md font-semibold hover:bg-indigo-200 transition"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;