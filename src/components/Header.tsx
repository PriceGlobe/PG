import React from 'react';
import { Search, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-[#0D1B2A] to-[#1B3A4B] text-white py-4 px-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="PriceGlobe Logo" className="h-8" />
        </div>
        
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search sports, gas, groceries..."
            className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white focus:text-neutral-charcoal transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
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
