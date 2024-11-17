interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
  }
  
  export const Input = ({ label, error, className = '', ...props }: InputProps) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          className={`
            w-full rounded-lg border border-gray-300 px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            disabled:bg-gray-50 disabled:text-gray-500
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  };