import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { PriceCard } from './components/PriceCard';
import { SkeletonCard } from './components/SkeletonCard';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';
import { FilterBar } from './components/FilterBar';
import { UsageMeter } from './components/UsageMeter';
import { Dumbbell, Fuel, ShoppingCart, TrendingDown, Globe2, ShieldCheck, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

const API_BASE_URL = 'http://localhost:3001/api';

function App() {
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

  const categories = [
    { id: 'sports', name: 'Sports', icon: Dumbbell },
    { id: 'gas', name: 'Gas', icon: Fuel },
    { id: 'groceries', name: 'Groceries', icon: ShoppingCart },
  ];

  useEffect(() => {
    fetchProducts();
  }, [activeCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    setSearchCount(prev => Math.min(prev + 1, 5));
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
    setSelectedCountry(null); // Reset filters on new product
    try {
      // Simulate scanning feel
      await new Promise(resolve => setTimeout(resolve, 800));
      const res = await fetch(`${API_BASE_URL}/prices/${productId}`);
      if (!res.ok) throw new Error('Failed to fetch prices');
      const data = await res.json();
      setPrices(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };

  const handleSearch = async (term: string) => {
    if (!term) return;
    setLoading(true);
    setError(null);
    try {
      setSearchCount(prev => prev + 1);
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

  const handleRetry = () => {
    if (selectedProduct) {
      fetchPrices(selectedProduct.id);
    } else {
      fetchProducts();
    }
  };

  // Memoized Filtered & Sorted Prices
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

  return (
    <div className="min-h-screen bg-neutral-near-white font-sans text-neutral-charcoal">
      <Header onSearch={handleSearch} isSearching={loading} />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-left flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-ocean mb-4">
              Compare prices. <span className="text-brand-teal">Anywhere.</span>
            </h1>
            <p className="text-lg text-neutral-mid-gray max-w-2xl">
              AI-powered global price comparison with real-time landed cost estimates.
            </p>
          </div>
          <div className="w-full md:w-72">
            <UsageMeter used={searchCount} total={5} />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={clsx(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                  isActive 
                    ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" 
                    : "bg-white text-neutral-mid-gray hover:bg-neutral-light-gray"
                )}
              >
                <Icon size={20} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Product Selection */}
        {!loading && products.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  fetchPrices(p.id);
                }}
                className={clsx(
                  "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
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

        {/* Stats / Value Prop Mini-cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-4 rounded-xl border border-neutral-light-gray flex items-center gap-4 shadow-sm">
            <div className="bg-brand-teal/10 p-3 rounded-lg text-brand-teal">
              <TrendingDown size={24} />
            </div>
            <div>
              <div className="font-bold text-xl uppercase text-neutral-charcoal">24% Avg</div>
              <div className="text-sm text-neutral-mid-gray">Daily savings found</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-neutral-light-gray flex items-center gap-4 shadow-sm">
            <div className="bg-brand-success/10 p-3 rounded-lg text-brand-success">
              <Globe2 size={24} />
            </div>
            <div>
              <div className="font-bold text-xl uppercase text-neutral-charcoal">15 Countries</div>
              <div className="text-sm text-neutral-mid-gray">Real-time tracking</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-neutral-light-gray flex items-center gap-4 shadow-sm">
            <div className="bg-brand-coral/10 p-3 rounded-lg text-brand-coral">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="font-bold text-xl uppercase text-neutral-charcoal">Landed Cost</div>
              <div className="text-sm text-neutral-mid-gray">Incl. shipping & duties</div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {error ? (
          <ErrorState onRetry={handleRetry} />
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
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
                  result={{
                    id: result.id.toString(),
                    storeName: result.store_name,
                    country: result.country,
                    city: result.city,
                    rating: result.rating,
                    originalPrice: result.totalLandedCost * 1.25, 
                    currentPrice: result.totalLandedCost,
                    currency: result.targetCurrency === 'EUR' ? '€' : '$', 
                    isLowest: result.isLowest && !selectedCountry, // Only show lowest tag if no country filter
                    shippingEstimate: result.shippingEstimate,
                    dutyEstimate: result.dutyEstimate,
                  }} 
                />
              ))}
            </div>
            
            {filteredPrices.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-neutral-light-gray">
                <p className="text-neutral-mid-gray">No results found in <span className="font-bold">{selectedCountry}</span>. Try another country or clear filters.</p>
              </div>
            )}
          </>
        ) : (
          <EmptyState 
            searchTerm={activeCategory} 
            onBrowseCategories={() => setActiveCategory('sports')} 
          />
        )}
      </main>

      <footer className="bg-white border-t border-neutral-light-gray mt-20 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/icon.svg" className="h-6" alt="" />
              <span className="text-xl font-bold">PriceGlobe</span>
            </div>
            <p className="text-neutral-mid-gray max-w-sm">
              Helping you find the best prices worldwide using advanced AI technology. No borders, just savings.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-neutral-mid-gray text-sm">
              <li><a href="#" className="hover:text-brand-teal">Sports Equipment</a></li>
              <li><a href="#" className="hover:text-brand-teal">Gas & Fuel</a></li>
              <li><a href="#" className="hover:text-brand-teal">Groceries</a></li>
              <li><a href="#" className="hover:text-brand-teal">Travel Deals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-neutral-mid-gray text-sm">
              <li><a href="#" className="hover:text-brand-teal">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-teal">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-teal">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-teal">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-neutral-light-gray text-center text-neutral-mid-gray text-xs">
          © 2026 PriceGlobe AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
