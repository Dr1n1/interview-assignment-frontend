import React, { useEffect, useState } from 'react';
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle, IoClose } from 'react-icons/io5';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <IoCheckmarkCircle size={20} className="text-green-600 dark:text-green-400" />,
    error: <IoCloseCircle size={20} className="text-red-600 dark:text-red-400" />,
    info: <IoInformationCircle size={20} className="text-blue-600 dark:text-blue-400" />,
  };

  const borderColors = {
    success: 'border-l-green-600 dark:border-l-green-400',
    error: 'border-l-red-600 dark:border-l-red-400',
    info: 'border-l-blue-600 dark:border-l-blue-400',
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-4 rounded-md shadow-lg z-[1070] flex items-center gap-2 animate-slideInRight max-w-md min-w-[300px] border-l-4 ${borderColors[type]}`}>
      {icons[type]}
      <span className="flex-1">{message}</span>
      <button
        onClick={handleClose}
        className="bg-transparent border-none cursor-pointer p-1 flex items-center text-gray-900 dark:text-gray-100 opacity-70 hover:opacity-100"
        aria-label="Close"
      >
        <IoClose size={18} />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type?: 'success' | 'error' | 'info' }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[1070] flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};
