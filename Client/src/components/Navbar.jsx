import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">404.js Blog</Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/create" className="text-gray-600 hover:text-indigo-600">
                New Article
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-indigo-600"
              >
                Logout
              </button>
              <span className="text-gray-600">{user.name}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-indigo-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
