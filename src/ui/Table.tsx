interface TableProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const Table = ({ children, className = '' }: TableProps) => (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">{children}</table>
    </div>
  );
  
  export const Thead = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-50 border-b border-gray-200">
      {children}
    </thead>
  );
  
  export const Tbody = ({ children }: { children: React.ReactNode }) => (
    <tbody className="divide-y divide-gray-100">
      {children}
    </tbody>
  );
  
  export const Th = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <th className={`px-4 py-3 text-left text-sm font-semibold text-gray-600 ${className}`}>
      {children}
    </th>
  );
  
  export const Td = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <td className={`px-4 py-4 text-sm text-gray-600 ${className}`}>
      {children}
    </td>
  );
  