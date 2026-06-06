import React, { useState, useEffect } from 'react';
import { Search, Globe, Dumbbell, Fuel, ShoppingCart, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface HeaderProps {
  onSearch?: (term: string) => void;
  isSearching?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, isSearching }) => {
  const [term, setTerm] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(term);
    setShowOverlay(false);
  };

  useEffect(() => {
    if (term.length >= 2) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [term]);

  const suggestions = [
    { name: 'Sports Equipment', icon: Dumbbell },
    { name: 'Gas Prices', icon: Fuel },
    { name: 'Groceries', icon: ShoppingCart },
  ];

  return (
    <header className="bg-gradient-to-br from-[#0D1B2A] to-[#1B3A4B] text-white py-4 px-6 shadow-lg sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <img src="/logo.svg" alt="PriceGlobe Logo" className="h-8" />
        </div>
        
        <div className="relative w-full md:w-96">
          <form onSubmit={handleSubmit} className="relative z-50">
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onFocus={() => term.length >= 2 && setShowOverlay(true)}
              placeholder="Search sports, gas, groceries..."
              className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white focus:text-neutral-charcoal transition-all placeholder:text-white/50"
            />
            {isSearching ? (
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin"></div>
              </div>
            ) : (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            )}
          </form>

          {showOverlay && (
            <>
              <div 
                className="fixed inset-0 bg-black/20 z-40" 
                onClick={() => setShowOverlay(false)}
              />
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-neutral-light-gray overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-neutral-light-gray">
                  <h3 className="text-xs font-bold text-neutral-mid-gray uppercase tracking-wider mb-3">Suggested Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button 
                        key={s.name}
                        onClick={() => {
                          setTerm(s.name);
                          if (onSearch) onSearch(s.name);
                          setShowOverlay(false);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-neutral-near-white hover:bg-brand-teal/10 hover:text-brand-teal rounded-full text-xs font-medium text-neutral-charcoal transition-colors"
                      >
                        <s.icon size={14} />
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-2">
                  <h3 className="text-xs font-bold text-neutral-mid-gray uppercase tracking-wider px-2 py-2">Quick Results</h3>
                  <div className="space-y-1">
                    {[1, 2].map(i => (
                      <div key={i} className="flex items-center justify-between p-2 hover:bg-neutral-near-white rounded-lg cursor-pointer transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-brand-teal/10 rounded-md flex items-center justify-center text-brand-teal">
                            <Globe size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-neutral-charcoal">Result Item {i}</div>
                            <div className="text-xs text-neutral-mid-gray">from $19.99 • USA</div>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-neutral-light-gray group-hover:text-brand-teal transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  className="w-full p-3 bg-neutral-near-white text-center text-sm font-bold text-brand-teal hover:bg-brand-teal/5 transition-colors flex items-center justify-center gap-2"
                >
                  View all results for "{term}"
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-brand-teal transition-colors">How it works</a>
          <a href="#" className="hover:text-brand-teal transition-colors">Countries</a>
          <button className="bg-brand-teal hover:bg-brand-teal-dark px-4 py-2 rounded-lg transition-colors">
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
};
