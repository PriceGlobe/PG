import React from 'react';
import { Star, MapPin, ExternalLink, Trophy } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PriceResult {
  id: string;
  storeName: string;
  country: string;
  city?: string;
  rating: number;
  originalPrice: number;
  currentPrice: number;
  currency: string;
  isLowest: boolean;
  isFeatured?: boolean;
  shippingEstimate?: number;
  dutyEstimate?: number;
}

interface PriceCardProps {
  result: PriceResult;
}

export const PriceCard: React.FC<PriceCardProps> = ({ result }) => {
  const savings = result.originalPrice - result.currentPrice;
  const savingsPercent = Math.round((savings / result.originalPrice) * 100);
  const hasExtraCosts = (result.shippingEstimate || 0) > 0 || (result.dutyEstimate || 0) > 0;

  return (
    <div 
      className={cn(
        "bg-white rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md relative overflow-hidden",
        result.isLowest ? "border-brand-success border-l-4" : "border-neutral-light-gray",
        result.isFeatured && "border-brand-gold"
      )}
    >
      {result.isLowest && (
        <div className="absolute top-0 right-0 bg-brand-success text-white px-3 py-1 rounded-bl-lg flex items-center gap-1 text-xs font-semibold">
          <Trophy size={12} />
          Best Landed Cost
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-neutral-charcoal text-lg">{result.storeName}</h3>
          <div className="flex items-center gap-1 text-neutral-mid-gray text-sm">
            <MapPin size={14} />
            <span>{result.country}{result.city ? `, ${result.city}` : ''}</span>
          </div>
        </div>
        <div className="flex items-center text-brand-gold">
          <Star size={14} fill="currentColor" />
          <span className="text-sm font-medium ml-1">{result.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="text-neutral-mid-gray text-sm line-through">
          {result.currency}{result.originalPrice.toFixed(2)}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-neutral-charcoal">
            {result.currency}{result.currentPrice.toFixed(2)}
          </span>
          {savings > 0 && (
            <span className="bg-brand-coral/10 text-brand-coral px-2 py-0.5 rounded-full text-xs font-bold">
              Save {result.currency}{savings.toFixed(0)} ({savingsPercent}%)
            </span>
          )}
        </div>
        {hasExtraCosts && (
          <div className="text-[10px] text-neutral-mid-gray font-medium uppercase tracking-wider">
            Includes est. {result.currency}{(result.shippingEstimate || 0) + (result.dutyEstimate || 0)} shipping & duties
          </div>
        )}
      </div>

      <button className="w-full mt-6 bg-brand-teal hover:bg-brand-teal-dark text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Deal
        <ExternalLink size={16} />
      </button>
    </div>
  );
};
