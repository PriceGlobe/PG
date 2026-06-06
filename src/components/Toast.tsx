import React, { useEffect } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { clsx } from 'clsx';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-10 duration-300">
      <div className="bg-neutral-charcoal text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px]">
        <div className="bg-brand-success/20 p-2 rounded-xl text-brand-success">
          <Bell size={20} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold">Alert Set!</div>
          <div className="text-xs text-white/70 mt-0.5">{message}</div>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
