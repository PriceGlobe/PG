import React, { useState, useEffect } from 'react';
import { Search, Globe, Dumbbell, Fuel, ShoppingCart, ArrowRight, Menu, User } from 'lucide-react';
import { clsx } from 'clsx';

interface HeaderProps {
  onSearch?: (term: string) => void;
  isSearching?: boolean;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, isSearching, onMenuClick }) => {
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
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer hidden sm:flex" onClick={() => window.location.href = '/'}>
            <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="text-xl font-bold tracking-tight">PriceGlobe</span>
          </div>
        </div>
        
        <div className="relative flex-1 max-w-xl mx-4">
          <form onSubmit={handleSubmit} className="relative z-50">
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onFocus={() => term.length >= 2 && setShowOverlay(true)}
              placeholder="Search sports, gas, groceries..."
              className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white focus:text-neutral-charcoal transition-all placeholder:text-white/50 text-sm"
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
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-light-gray overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-5 border-b border-neutral-light-gray">
                  <h3 className="text-[10px] font-bold text-neutral-mid-gray uppercase tracking-widest mb-3">Suggested Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button 
                        key={s.name}
                        onClick={() => {
                          setTerm(s.name);
                          if (onSearch) onSearch(s.name);
                          setShowOverlay(false);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-neutral-near-white hover:bg-brand-teal/10 hover:text-brand-teal rounded-full text-xs font-bold text-neutral-charcoal transition-colors"
                      >
                        <s.icon size={14} />
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="text-[10px] font-bold text-neutral-mid-gray uppercase tracking-widest px-2 py-2">Quick Results</h3>
                  <div className="space-y-1">
                    {[
                      { name: 'Nike Pegasus 40', price: '$89.99', country: 'Germany' },
                      { name: 'Shell V-Power', price: '$4.25', country: 'USA' }
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          if (onSearch) onSearch(item.name);
                          setShowOverlay(false);
                        }}
                        className="flex items-center justify-between p-3 hover:bg-neutral-near-white rounded-xl cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center text-brand-teal">
                            <Globe size={18} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-neutral-charcoal group-hover:text-brand-teal transition-colors">{item.name}</div>
                            <div className="text-xs text-neutral-mid-gray font-medium">from {item.price} • {item.country}</div>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-neutral-light-gray group-hover:text-brand-teal transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  className="w-full p-4 bg-neutral-near-white text-center text-xs font-bold text-brand-teal hover:bg-brand-teal/5 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  View all results for "{term}"
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-4 text-xs font-bold uppercase tracking-widest mr-4">
            <a href="#" className="hover:text-brand-teal transition-colors">How it works</a>
            <a href="#" className="hover:text-brand-teal transition-colors">Countries</a>
          </div>
          <button className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-xl transition-colors">
            <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal border border-brand-teal/20">
              <User size={18} />
            </div>
            <span className="hidden md:block text-sm font-bold">Alex</span>
          </button>
        </div>
      </div>
    </header>
  );
};
