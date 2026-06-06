import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PriceCard } from './components/PriceCard';
import { SkeletonCard } from './components/SkeletonCard';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';
import { FilterBar } from './components/FilterBar';
import { UsageMeter } from './components/UsageMeter';
import { UpgradeModal } from './components/UpgradeModal';
import { Toast } from './components/Toast';
import { Dumbbell, Fuel, ShoppingCart, TrendingDown, Globe2, ShieldCheck, Loader2, Menu } from 'lucide-react';
import { clsx } from 'clsx';

const API_BASE_URL = 'http://localhost:3001/api';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [activeCategory, setActiveCategory] = useState<'sports' | 'gas' | 'groceries'>('sports');
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [searchCount, setSearchCount] = useState(3);
  
  // Filtering & Sorting State
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('landed');

  // Sidebar & Modal State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Watchlist State (mocked)
  const [watchedIds, setWatchedIds] = useState<string[]>(['1', '3', '5']);

  const categories = [
    { id: 'sports', name: 'Sports', icon: Dumbbell },
    { id: 'gas', name: 'Gas', icon: Fuel },
    { id: 'groceries', name: 'Groceries', icon: ShoppingCart },
  ];

  useEffect(() => {
    if (activePage === 'search') {
      fetchProducts();
    }
  }, [activeCategory, activePage]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/products?category=${activeCategory}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
      if (data.length > 0) {
        setSelectedProduct(data[0]);
        fetchPrices(data[0].id);
      } else {
        setPrices([]);
        setSelectedProduct(null);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrices = async (productId: number) => {
    setScanning(true);
    setError(null);
    setSelectedCountry(null); 
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const res = await fetch(`${API_BASE_URL}/prices/${productId}`);
      if (!res.ok) throw new Error('Failed to fetch prices');
      const data = await res.json();
      setPrices(data);
      setSearchCount(prev => Math.min(prev + 1, 10));
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };

  const handleSearch = async (term: string) => {
    if (!term) return;
    setActivePage('search');
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/products?q=${encodeURIComponent(term)}`);
      if (!res.ok) throw new Error('Failed to search products');
      const data = await res.json();
      setProducts(data);
      if (data.length > 0) {
        setSelectedProduct(data[0]);
        fetchPrices(data[0].id);
      } else {
        setPrices([]);
        setSelectedProduct(null);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleWatchlist = (id: string) => {
    const isWatched = watchedIds.includes(id);
    if (isWatched) {
      setWatchedIds(prev => prev.filter(i => i !== id));
    } else {
      setWatchedIds(prev => [...prev, id]);
      const product = prices.find(p => p.id.toString() === id);
      setToastMessage(`Price alert set for ${product?.store_name || 'this item'}!`);
      setIsToastVisible(true);
    }
  };

  const handleRetry = () => {
    if (selectedProduct) {
      fetchPrices(selectedProduct.id);
    } else {
      fetchProducts();
    }
  };

  const filteredPrices = useMemo(() => {
    let result = [...prices];
    if (selectedCountry) {
      result = result.filter(p => p.country === selectedCountry);
    }
    result.sort((a, b) => {
      if (sortBy === 'landed') return a.totalLandedCost - b.totalLandedCost;
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
    return result;
  }, [prices, selectedCountry, sortBy]);

  const availableCountries = useMemo(() => {
    const countries = new Set(prices.map(p => p.country));
    return Array.from(countries).sort();
  }, [prices]);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-left flex-1">
                <h1 className="text-3xl font-bold text-brand-ocean mb-2">
                  Search Results
                </h1>
                <p className="text-neutral-mid-gray">
                  Showing global prices for {selectedProduct?.name || 'your search'}.
                </p>
              </div>
              <div className="w-full md:w-72">
                <UsageMeter used={searchCount} total={5} />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex justify-center gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={clsx(
                      "flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all text-sm",
                      isActive 
                        ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" 
                        : "bg-white text-neutral-mid-gray hover:bg-neutral-light-gray"
                    )}
                  >
                    <Icon size={18} />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Product Selection */}
            {!loading && products.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      fetchPrices(p.id);
                    }}
                    className={clsx(
                      "px-4 py-2 rounded-lg border text-xs font-bold transition-all uppercase tracking-wider",
                      selectedProduct?.id === p.id
                        ? "border-brand-teal bg-brand-teal/5 text-brand-teal"
                        : "border-neutral-light-gray bg-white text-neutral-mid-gray hover:border-neutral-mid-gray"
                    )}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            )}

            {error ? (
              <ErrorState onRetry={handleRetry} />
            ) : loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : scanning ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin"></div>
                  <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-teal animate-pulse" size={24} />
                </div>
                <h3 className="text-xl font-bold text-neutral-charcoal mb-2">Scanning global prices...</h3>
                <p className="text-neutral-mid-gray italic text-sm">Comparing deals for {selectedProduct?.name} across 12 countries...</p>
              </div>
            ) : prices.length > 0 ? (
              <>
                <FilterBar 
                  countries={availableCountries}
                  selectedCountry={selectedCountry}
                  onCountryChange={setSelectedCountry}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  resultsCount={filteredPrices.length}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrices.map((result) => (
                    <PriceCard 
                      key={result.id} 
                      onToggleWatchlist={toggleWatchlist}
                      result={{
                        id: result.id.toString(),
                        storeName: result.store_name,
                        country: result.country,
                        city: result.city,
                        rating: result.rating,
                        originalPrice: result.totalLandedCost * 1.25, 
                        currentPrice: result.totalLandedCost,
                        currency: result.targetCurrency === 'EUR' ? '€' : '$', 
                        isLowest: result.isLowest && !selectedCountry,
                        isWatched: watchedIds.includes(result.id.toString()),
                        shippingEstimate: result.shippingEstimate,
                        dutyEstimate: result.dutyEstimate,
                      }} 
                    />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState 
                searchTerm={activeCategory} 
                onBrowseCategories={() => setActiveCategory('sports')} 
              />
            )}
          </div>
        );
      case 'premium':
        return (
          <div className="max-w-4xl mx-auto py-12 text-center">
             <div className="bg-brand-gold/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <Crown className="text-brand-gold" size={40} />
            </div>
            <h1 className="text-4xl font-bold text-neutral-charcoal mb-4">PriceGlobe Premium</h1>
            <p className="text-xl text-neutral-mid-gray mb-12">The ultimate tools for global shoppers and deal hunters.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Unlimited Searches', desc: 'No daily limits. Search as much as you want.' },
                { title: 'Price Alerts', desc: 'Get notified instantly when prices drop.' },
                { title: 'Price History', desc: 'Track trends over 90 days with interactive charts.' }
              ].map((f, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-neutral-light-gray shadow-sm">
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-neutral-mid-gray text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setIsUpgradeModalOpen(true)}
              className="mt-12 px-12 py-4 bg-brand-teal text-white rounded-2xl font-bold text-lg hover:bg-brand-teal/90 transition-all shadow-xl shadow-brand-teal/20"
            >
              Start Free Trial
            </button>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-40">
            <h2 className="text-2xl font-bold text-neutral-charcoal">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h2>
            <p className="text-neutral-mid-gray mt-2">This feature is coming soon.</p>
            <button 
              onClick={() => setActivePage('dashboard')}
              className="mt-6 text-brand-teal font-bold hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  const handleSidebarTabChange = (tab: string) => {
    if (tab === 'premium') {
      setIsUpgradeModalOpen(true);
    } else {
      setActivePage(tab);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-near-white font-sans text-neutral-charcoal flex overflow-hidden">
      <Sidebar 
        activeTab={activePage} 
        onTabChange={handleSidebarTabChange}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header 
          onSearch={handleSearch} 
          isSearching={loading} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
          
          <footer className="mt-20 py-12 border-t border-neutral-light-gray">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-mid-gray">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-brand-ocean rounded flex items-center justify-center text-white text-[10px] font-bold">P</div>
                  <span className="font-bold text-neutral-charcoal">PriceGlobe AI</span>
                </div>
                <p>© 2026 PriceGlobe. All rights reserved.</p>
              </div>
              <div className="flex gap-6 md:justify-end font-bold">
                <a href="#" className="hover:text-brand-teal">Privacy</a>
                <a href="#" className="hover:text-brand-teal">Terms</a>
                <a href="#" className="hover:text-brand-teal">Contact</a>
              </div>
            </div>
          </footer>
        </main>
      </div>

      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
      />

      <Toast 
        message={toastMessage} 
        isVisible={isToastVisible} 
        onClose={() => setIsToastVisible(false)} 
      />
    </div>
  );
}

export default App;
