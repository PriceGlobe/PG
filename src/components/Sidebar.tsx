import React from 'react';
import { 
  LayoutDashboard, 
  Bookmark, 
  Bell, 
  Clock, 
  Crown, 
  Settings,
  X
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  isOpen, 
  onClose 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'watchlist', label: 'Watchlist', icon: Bookmark, badge: 8 },
    { id: 'alerts', label: 'Price Alerts', icon: Bell, badge: 3 },
    { id: 'history', label: 'Search History', icon: Clock },
    { id: 'premium', label: 'Premium', icon: Crown, premium: true },
    { id: 'account', label: 'Account', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden" 
          onClick={onClose}
        />
      )}

      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-light-gray transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-ocean rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="font-bold text-xl text-brand-ocean">PriceGlobe</span>
          </div>
          <button onClick={onClose} className="md:hidden text-neutral-mid-gray">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-6">
          <div className="flex items-center gap-3 px-4 py-3 mb-6 bg-neutral-near-white rounded-xl">
            <div className="w-10 h-10 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal font-bold text-lg">
              AJ
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-charcoal leading-none">Alex Johnson</div>
              <div className="text-[10px] font-medium text-neutral-mid-gray uppercase tracking-wider mt-1">Free Plan</div>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (window.innerWidth < 768) onClose();
                  }}
                  className={clsx(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                    isActive 
                      ? "bg-brand-teal/10 text-brand-teal border-r-4 border-brand-teal" 
                      : "text-neutral-mid-gray hover:bg-neutral-near-white hover:text-neutral-charcoal"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={clsx(
                      isActive ? "text-brand-teal" : "text-neutral-mid-gray group-hover:text-neutral-charcoal",
                      item.premium && !isActive && "text-brand-gold"
                    )} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={clsx(
                      "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                      isActive ? "bg-brand-teal text-white" : "bg-neutral-light-gray text-neutral-mid-gray"
                    )}>
                      {item.badge}
                    </span>
                  )}
                  {item.premium && !isActive && (
                    <span className="text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-1.5 py-0.5 rounded">PRO</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-brand-coral/5 border border-brand-coral/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-brand-coral mb-2 text-xs font-bold uppercase tracking-wider">
              <Crown size={14} />
              Upgrade Now
            </div>
            <p className="text-[10px] text-neutral-mid-gray mb-3">
              Get unlimited searches and real-time price alerts.
            </p>
            <button className="w-full py-2 bg-brand-coral text-white rounded-lg text-xs font-bold hover:bg-brand-coral/90 transition-all shadow-md shadow-brand-coral/20">
              Go Premium
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
