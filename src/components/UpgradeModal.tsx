import React from 'react';
import { Crown, Check, X, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    "Unlimited global price searches",
    "Real-time price drop alerts",
    "90-day price history charts",
    "Exclusive ad-free experience",
    "Priority support"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-brand-ocean/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-mid-gray hover:text-neutral-charcoal transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Features Side */}
          <div className="p-8 md:p-12 flex-1 bg-neutral-near-white">
            <div className="bg-brand-gold/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <Crown className="text-brand-gold" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-neutral-charcoal mb-2">Upgrade to Pro</h2>
            <p className="text-neutral-mid-gray text-sm mb-8">Take your global shopping to the next level with PriceGlobe Pro.</p>
            
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-brand-success/10 p-0.5 rounded-full">
                    <Check className="text-brand-success" size={14} />
                  </div>
                  <span className="text-sm font-medium text-neutral-charcoal">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Side */}
          <div className="p-8 md:p-12 flex-1 flex flex-col justify-center items-center text-center">
            <div className="mb-8">
              <div className="text-neutral-mid-gray text-sm font-bold uppercase tracking-widest mb-1">Monthly Plan</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-neutral-charcoal">$4.99</span>
                <span className="text-neutral-mid-gray font-medium">/mo</span>
              </div>
              <p className="text-xs text-neutral-mid-gray mt-2 font-medium">Cancel anytime. No hidden fees.</p>
            </div>

            <button className="w-full py-4 bg-brand-teal text-white rounded-2xl font-bold text-lg hover:bg-brand-teal/90 transition-all shadow-xl shadow-brand-teal/20 mb-6">
              Start 7-Day Free Trial
            </button>

            <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-mid-gray uppercase tracking-wider">
              <ShieldCheck size={14} />
              Secure Payment via Stripe
            </div>
            
            <button 
              onClick={onClose}
              className="mt-8 text-sm font-bold text-neutral-mid-gray hover:text-neutral-charcoal transition-colors"
            >
              No thanks, I'll stick to Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
