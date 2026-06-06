import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-light-gray shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-neutral-light-gray rounded-md w-3/4 animate-pulse"></div>
          <div className="h-4 bg-neutral-light-gray/60 rounded-md w-1/2 animate-pulse"></div>
        </div>
        <div className="h-6 w-12 bg-neutral-light-gray rounded-full animate-pulse"></div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-neutral-light-gray/40 rounded-md w-1/4 animate-pulse"></div>
        <div className="flex items-end gap-2">
          <div className="h-8 bg-neutral-light-gray rounded-md w-1/3 animate-pulse"></div>
          <div className="h-6 bg-brand-coral/10 rounded-full w-1/4 animate-pulse"></div>
        </div>
      </div>
      
      <div className="h-10 bg-neutral-light-gray rounded-lg w-full animate-pulse"></div>
    </div>
  );
};
