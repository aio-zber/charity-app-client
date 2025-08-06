import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          border: 'border-emerald-500/30',
          bg: 'from-emerald-500/10 to-green-500/10',
          icon: <CheckCircle className="h-6 w-6 text-emerald-400" />,
          textColor: 'text-emerald-300',
        };
      case 'error':
        return {
          border: 'border-red-500/30',
          bg: 'from-red-500/10 to-pink-500/10',
          icon: <AlertCircle className="h-6 w-6 text-red-400" />,
          textColor: 'text-red-300',
        };
      case 'info':
        return {
          border: 'border-cyan-500/30',
          bg: 'from-cyan-500/10 to-blue-500/10',
          icon: <Info className="h-6 w-6 text-cyan-400" />,
          textColor: 'text-cyan-300',
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-in-up">
      <div className={`glass-dark p-4 rounded-xl border ${styles.border} relative overflow-hidden min-w-[300px]`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${styles.bg} animate-pulse`}></div>
        <div className="flex items-center space-x-3 relative z-10">
          {styles.icon}
          <p className={`${styles.textColor} font-medium`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;