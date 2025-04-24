import { forwardRef } from "react";
import { FaSpinner } from "react-icons/fa";

const Button = forwardRef(
  (
    {
      children,
      loading = false,
      variant = "primary",
      size = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };
    
    const variantClasses = {
      primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
      secondary: "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary-500",
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        disabled={loading}
        {...props}
      >
        {loading && <FaSpinner className="animate-spin mr-2" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;