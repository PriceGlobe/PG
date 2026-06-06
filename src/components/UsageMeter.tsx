import React from 'react';
import { Zap } from 'lucide-react';
import { clsx } from 'clsx';

interface UsageMeterProps {
  used: number;
  total: number;
}

export const UsageMeter: React.FC<UsageMeterProps> = ({ used, total }) => {
  const percent = Math.min((used / total) * 100, 100);
  const isHigh = percent > 80;

  return (
    <div className="bg-brand-ocean/10 border border-brand-ocean/20 rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-brand-ocean">
          <Zap size={16} fill="currentColor" />
          <span className="text-xs font-bold uppercase tracking-wider">Free Tier Usage</span>
        </div>
        <span className="text-xs font-bold text-brand-ocean">{used} / {total} searches</span>
      </div>
      <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
        <div 
          className={clsx(
            "h-full transition-all duration-500",
            isHigh ? "bg-brand-coral" : "bg-brand-teal"
          )}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      {isHigh && (
        <p className="text-[10px] text-brand-coral font-bold mt-2 animate-pulse">
          Limit nearly reached! Upgrade to Pro for unlimited searches.
        </p>
      )}
    </div>
  );
};
