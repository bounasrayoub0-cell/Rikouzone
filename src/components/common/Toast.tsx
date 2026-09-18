import React from 'react';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => onDismiss(toast.id)}
          className="pointer-events-auto flex items-center gap-3 rounded-xl border border-zinc-700/80 bg-zinc-900/95 px-4 py-3 text-sm text-zinc-100 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 cursor-pointer"
        >
          {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0" />}
          {toast.type === 'info' && <Info className="h-5 w-5 text-sky-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />}
          <p className="flex-1 font-medium">{toast.text}</p>
        </div>
      ))}
    </div>
  );
};
