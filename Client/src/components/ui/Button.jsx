import { FaSpinner } from "react-icons/fa";

export const Button = ({ children, loading, ...props }) => (
  <button
    {...props}
    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded flex items-center gap-2"
    disabled={loading}
  >
    {loading && <FaSpinner className="animate-spin" />}
    {children}
  </button>
);