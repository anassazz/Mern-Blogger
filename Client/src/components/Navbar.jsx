import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, UserPlus, LogIn, FilePlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-100 transition">
          404.js Blog
        </Link>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to="/create" 
                className="flex items-center space-x-1 bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-100 transition"
              >
                <FilePlus size={18} />
                <span>New Article</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-100 text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-200 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
              <span className="px-3 py-1 bg-white text-indigo-700 rounded-full text-sm font-semibold shadow-sm">
                {user.name}
              </span>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="flex items-center space-x-1 bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-100 transition"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link 
                to="/register" 
                className="flex items-center space-x-1 bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-100 transition"
              >
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
