'use client';

import * as React from "react";

interface ToastProps {
  title: string;
  description?: string;
}

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void;
}>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback((props: ToastProps) => {
    setToasts((prev) => [...prev, props]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast, index) => (
          <div
            key={index}
            className="bg-[#bca16b] text-black px-4 py-3 rounded-lg shadow-lg min-w-[300px] transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          >
            <div className="font-bold">{toast.title}</div>
            {toast.description && (
              <div className="text-sm mt-1">{toast.description}</div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
} 