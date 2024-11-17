interface CardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const Card = ({ children, className = '' }: CardProps) => {
    return (
      <div className={`bg-white rounded-xl shadow-sm ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children }: { children: React.ReactNode }) => {
    return <div className="p-6 border-b border-gray-100">{children}</div>;
  };
  
  export const CardContent = ({ children }: { children: React.ReactNode }) => {
    return <div className="p-6">{children}</div>;
  };