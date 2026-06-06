import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { clsx } from 'clsx';

interface FilterBarProps {
  countries: string[];
  selectedCountry: string | null;
  onCountryChange: (country: string | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  resultsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  countries, 
  selectedCountry, 
  onCountryChange,
  sortBy,
  onSortChange,
  resultsCount
}) => {
  return (
    <div className="bg-white border border-neutral-light-gray rounded-xl p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <div className="flex items-center gap-2 text-neutral-mid-gray mr-2">
          <Filter size={18} />
          <span className="text-sm font-bold uppercase tracking-wider">Filter:</span>
        </div>
        <button 
          onClick={() => onCountryChange(null)}
          className={clsx(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            selectedCountry === null 
              ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20" 
              : "bg-neutral-near-white text-neutral-mid-gray hover:bg-neutral-light-gray"
          )}
        >
          All Countries
        </button>
        {countries.map(country => (
          <button 
            key={country}
            onClick={() => onCountryChange(country)}
            className={clsx(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
              selectedCountry === country 
                ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20" 
                : "bg-neutral-near-white text-neutral-mid-gray hover:bg-neutral-light-gray"
            )}
          >
            {country}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
        <div className="text-sm font-medium text-neutral-mid-gray">
          <span className="text-neutral-charcoal font-bold">{resultsCount}</span> deals found
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-neutral-mid-gray" />
          <select 
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-sm font-bold text-brand-teal focus:outline-none cursor-pointer"
          >
            <option value="landed">Best Landed Cost</option>
            <option value="price_low">Base Price: Low to High</option>
            <option value="rating">Top Rated Stores</option>
          </select>
        </div>
      </div>
    </div>
  );
};
