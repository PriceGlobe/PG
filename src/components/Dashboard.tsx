import React from 'react';
import { 
  TrendingDown, 
  Globe2, 
  Bookmark, 
  Zap, 
  Search, 
  Fuel, 
  ShoppingCart, 
  Dumbbell,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { clsx } from 'clsx';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Searches Today', value: '3 / 5', icon: Search, color: 'text-brand-teal', bg: 'bg-brand-teal/10', progress: 60 },
    { label: 'Total Saved', value: '$247.50', icon: TrendingDown, color: 'text-brand-success', bg: 'bg-brand-success/10', trend: '+12%' },
    { label: 'Watched Items', value: '8', icon: Bookmark, color: 'text-brand-coral', bg: 'bg-brand-coral/10' },
    { label: 'Countries Tracked', value: '6', icon: Globe2, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
  ];

  const activity = [
    { 
      type: 'sports', 
      query: 'Nike running shoes', 
      detail: 'Compared 12 stores — Best: $89.99 Sport24', 
      time: '2 hours ago',
      icon: Dumbbell,
      color: 'text-brand-teal'
    },
    { 
      type: 'gas', 
      query: 'Shell gas Berlin', 
      detail: 'Compared 6 stations — Best: €1.89/L', 
      time: '5 hours ago',
      icon: Fuel,
      color: 'text-brand-ocean'
    },
    { 
      type: 'groceries', 
      query: 'Organic eggs', 
      detail: 'Compared 8 stores — Best: €3.49 Aldi', 
      time: 'Yesterday',
      icon: ShoppingCart,
      color: 'text-brand-coral'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-charcoal">Welcome back, Alex!</h1>
          <p className="text-neutral-mid-gray text-sm mt-1">Here's what's happening with your prices today.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg font-bold text-sm hover:bg-brand-teal/90 transition-all shadow-lg shadow-brand-teal/20">
          <Zap size={16} fill="currentColor" />
          Quick Scan
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-2xl border border-neutral-light-gray shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={clsx("p-2.5 rounded-xl", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              {stat.trend && (
                <span className="flex items-center gap-0.5 text-brand-success text-xs font-bold">
                  {stat.trend}
                  <ArrowUpRight size={14} />
                </span>
              )}
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-charcoal">{stat.value}</div>
              <div className="text-xs font-medium text-neutral-mid-gray mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
            {stat.progress !== undefined && (
              <div className="mt-4 w-full h-1.5 bg-neutral-light-gray rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-teal transition-all duration-500" 
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-light-gray shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-light-gray flex justify-between items-center">
            <h3 className="font-bold text-neutral-charcoal">Recent Activity</h3>
            <button className="text-brand-teal text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-neutral-near-white">
            {activity.map((item, i) => (
              <div key={i} className="p-6 flex items-start gap-4 hover:bg-neutral-near-white/50 transition-colors group cursor-pointer">
                <div className={clsx("p-3 rounded-xl bg-neutral-near-white group-hover:bg-white transition-colors", item.color)}>
                  <item.icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-neutral-charcoal group-hover:text-brand-teal transition-colors">{item.query}</h4>
                    <span className="text-xs text-neutral-mid-gray flex items-center gap-1">
                      <Clock size={12} />
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-mid-gray mt-1">{item.detail}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs font-bold text-brand-teal bg-brand-teal/5 px-3 py-1 rounded-full hover:bg-brand-teal/10 transition-colors">
                      Re-run Search
                    </button>
                    <button className="text-xs font-bold text-neutral-mid-gray hover:text-neutral-charcoal transition-colors">
                      View Results
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips / Ads */}
        <div className="space-y-6">
          <div className="bg-brand-ocean text-white p-6 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <Crown className="text-brand-gold" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">PriceGlobe Pro</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Unlock 90-day price history charts and unlimited searches for just $4.99/mo.
              </p>
              <button className="w-full py-3 bg-brand-teal text-white rounded-xl font-bold text-sm hover:bg-brand-teal/90 transition-all shadow-lg shadow-black/10">
                Upgrade Account
              </button>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-teal/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brand-coral/10 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-light-gray shadow-sm">
            <h3 className="font-bold text-neutral-charcoal mb-4">Savings Tip</h3>
            <p className="text-sm text-neutral-mid-gray leading-relaxed">
              Shipping from <span className="font-bold text-neutral-charcoal">Germany</span> to the USA is currently 15% cheaper on weekends due to carrier discounts.
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-near-white flex items-center gap-2 text-xs font-bold text-brand-teal">
              Learn More <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
