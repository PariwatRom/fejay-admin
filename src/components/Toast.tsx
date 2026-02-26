import React, { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex flex-col items-center space-y-3 px-4 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const bgColor = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-indigo-500'
  }[toast.type];

  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-2xl shadow-2xl animate-slideDown pointer-events-auto flex items-center space-x-3 min-w-[200px] border border-white/20`}>
      <span className="text-sm font-black uppercase tracking-widest">{toast.message}</span>
    </div>
  );
};

export default Toast;
