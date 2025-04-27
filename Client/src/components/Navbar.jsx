import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut, UserPlus, LogIn, Menu, X, PenSquare, Home, BookOpen, Search, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/articles?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-emerald-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Main Navigation */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold text-white group-hover:text-emerald-100 transition">
              <span className="bg-white text-emerald-700 px-2 py-1 rounded-md mr-1 font-mono">404</span>
              .js Blog
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-4 pr-10 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-800"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center space-x-1 text-white font-medium hover:bg-white/10 px-3 py-2 rounded-md transition"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/articles"
              className="flex items-center space-x-1 text-white font-medium hover:bg-white/10 px-3 py-2 rounded-md transition"
            >
              <BookOpen size={18} />
              <span>Articles</span>
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/articles/create"
                  className="flex items-center space-x-1 bg-white text-emerald-700 px-3 py-2 rounded-md font-medium hover:bg-emerald-50 transition ml-2"
                >
                  <PenSquare size={18} />
                  <span>Create</span>
                </Link>
                <div className="relative group ml-2">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 bg-emerald-700 text-white px-3 py-2 rounded-md font-medium hover:bg-emerald-600 transition"
                  >
                    <User size={18} />
                    <span>{user.name.split(' ')[0]}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-emerald-700 hover:bg-emerald-100 flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center space-x-1 bg-white/90 text-emerald-700 px-3 py-2 rounded-md font-medium hover:bg-white transition"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center space-x-1 bg-emerald-100 text-emerald-800 px-3 py-2 rounded-md font-medium hover:bg-emerald-200 transition"
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
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-emerald-700/95 py-4 px-4 space-y-3 mt-2 rounded-lg">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-4 pr-10 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600"
              >
                <Search size={18} />
              </button>
            </form>

            <Link
              to="/"
              className="block w-full text-left flex items-center space-x-3 text-white font-medium hover:bg-white/10 px-4 py-3 rounded-md transition"
              onClick={() => setIsOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/articles"
              className="block w-full text-left flex items-center space-x-3 text-white font-medium hover:bg-white/10 px-4 py-3 rounded-md transition"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen size={18} />
              <span>Articles</span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/articles/create"
                  className="block w-full text-left flex items-center space-x-3 bg-white text-emerald-700 px-4 py-3 rounded-md font-medium hover:bg-emerald-50 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <PenSquare size={18} />
                  <span>Create Article</span>
                </Link>
                <div className="pt-2 border-t border-white/20 space-y-3">
                  <div className="px-4 py-2 bg-white/90 text-emerald-700 rounded-full text-sm font-bold text-center">
                    {user.name}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left flex items-center space-x-3 bg-red-100 text-red-700 px-4 py-3 rounded-md font-medium hover:bg-red-200 transition"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-2 border-t border-white/20 space-y-3">
                <Link 
                  to="/login" 
                  className="block w-full text-left flex items-center space-x-3 bg-white/90 text-emerald-700 px-4 py-3 rounded-md font-medium hover:bg-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="block w-full text-left flex items-center space-x-3 bg-emerald-100 text-emerald-800 px-4 py-3 rounded-md font-medium hover:bg-emerald-200 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus size={18} />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;