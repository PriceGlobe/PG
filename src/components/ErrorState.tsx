import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-brand-coral/10 p-6 rounded-full text-brand-coral mb-6">
        <AlertTriangle size={48} />
      </div>
      <h3 className="text-2xl font-bold text-neutral-charcoal mb-2">Connection Error</h3>
      <p className="text-neutral-mid-gray max-w-md mb-8">
        We're having trouble reaching our price database. This might be a temporary issue. 
        Your data is safe — nothing has been lost.
      </p>
      <div className="flex gap-4 items-center">
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-brand-coral text-white rounded-full font-bold hover:bg-brand-coral/90 transition-all shadow-lg shadow-brand-coral/20"
        >
          <RefreshCw size={20} />
          Try Again
        </button>
        <button 
          className="text-brand-teal font-semibold hover:underline"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};
