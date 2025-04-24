import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      id,
      type = "text",
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
            error ? "border-red-500" : "border"
          }`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;