import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  searchTerm?: string;
  onBrowseCategories?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, onBrowseCategories }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-brand-teal/10 p-6 rounded-full text-brand-teal mb-6">
        <Search size={48} />
      </div>
      <h3 className="text-2xl font-bold text-neutral-charcoal mb-2">No results found</h3>
      <p className="text-neutral-mid-gray max-w-md mb-8">
        We couldn't find any matches for <span className="font-semibold text-neutral-charcoal">"{searchTerm}"</span>. 
        Try a different term or browse categories.
      </p>
      <div className="flex gap-4">
        <button 
          onClick={onBrowseCategories}
          className="px-6 py-3 bg-brand-teal text-white rounded-full font-bold hover:bg-brand-teal/90 transition-all shadow-lg shadow-brand-teal/20"
        >
          Browse Categories
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-white border border-neutral-light-gray text-neutral-mid-gray rounded-full font-bold hover:bg-neutral-near-white transition-all"
        >
          Clear Search
        </button>
      </div>
    </div>
  );
};
