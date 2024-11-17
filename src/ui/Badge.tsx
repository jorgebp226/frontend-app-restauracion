interface BadgeProps {
    variant?: 'default' | 'success' | 'warning' | 'error';
    children: React.ReactNode;
    className?: string;
  }
  
  export const Badge = ({ 
    variant = 'default', 
    children, 
    className = '' 
  }: BadgeProps) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-emerald-100 text-emerald-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
  
    return (
      <span className={`
        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        ${variants[variant]}
        ${className}
      `}>
        {children}
      </span>
    );
  };