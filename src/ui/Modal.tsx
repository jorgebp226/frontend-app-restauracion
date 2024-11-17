interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
  }
  
  export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
          <div className="relative bg-white rounded-xl shadow-lg max-w-xl w-full">
            {title && (
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
            )}
            <div className="p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };