import { Link } from "react-router-dom";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-dark text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">MyBlog</Link>
        <div className="flex space-x-4">
          <Link to="/login" className="flex items-center hover:text-secondary">
            <FaSignInAlt className="mr-2" /> Login
          </Link>
          <Link to="/register" className="flex items-center hover:text-secondary">
            <FaUser className="mr-2" /> Register
          </Link>
        </div>
      </div>
    </nav>
  );
}