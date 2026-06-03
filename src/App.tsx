import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PriceCard, PriceResult } from './components/PriceCard';
import { Dumbbell, Fuel, ShoppingCart, TrendingDown, Globe2, ShieldCheck, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

const API_BASE_URL = 'http://localhost:3001/api';

function App() {
  const [activeCategory, setActiveCategory] = useState<'sports' | 'gas' | 'groceries'>('sports');
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
    try {
      const res = await fetch(`${API_BASE_URL}/products?category=${activeCategory}`);
      const data = await res.json();
      setProducts(data);
      if (data.length > 0) {
        fetchPrices(data[0].id);
        setSelectedProduct(data[0]);
      } else {
        setPrices([]);
        setSelectedProduct(null);
      }
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrices = async (productId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/prices/${productId}`);
      const data = await res.json();
      setPrices(data);
    } catch (err) {
      console.error('Failed to fetch prices', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-near-white font-sans text-neutral-charcoal">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-ocean mb-4">
            Compare prices. <span className="text-brand-teal">Anywhere.</span>
          </h1>
          <p className="text-lg text-neutral-mid-gray max-w-2xl mx-auto">
            AI-powered global price comparison with real-time landed cost estimates.
          </p>
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
        {products.length > 0 && (
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
          <div className="bg-white p-4 rounded-xl border border-neutral-light-gray flex items-center gap-4">
            <div className="bg-brand-teal/10 p-3 rounded-lg text-brand-teal">
              <TrendingDown size={24} />
            </div>
            <div>
              <div className="font-bold text-xl">24% AVG</div>
              <div className="text-sm text-neutral-mid-gray">Daily savings found</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-neutral-light-gray flex items-center gap-4">
            <div className="bg-brand-success/10 p-3 rounded-lg text-brand-success">
              <Globe2 size={24} />
            </div>
            <div>
              <div className="font-bold text-xl">15 COUNTRIES</div>
              <div className="text-sm text-neutral-mid-gray">Real-time tracking</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-neutral-light-gray flex items-center gap-4">
            <div className="bg-brand-coral/10 p-3 rounded-lg text-brand-coral">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="font-bold text-xl">LANDED COST</div>
              <div className="text-sm text-neutral-mid-gray">Incl. shipping & duties</div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-teal mb-4" size={48} />
            <p className="text-neutral-mid-gray">Fetching latest prices...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map((result) => (
              <PriceCard 
                key={result.id} 
                result={{
                  id: result.id.toString(),
                  storeName: result.store_name,
                  country: result.country,
                  city: result.city,
                  rating: result.rating,
                  originalPrice: result.price * 1.2, // Mock original
                  currentPrice: result.totalLandedCost,
                  currency: '$', 
                  isLowest: result.isLowest || false,
                  shippingEstimate: result.shippingEstimate,
                  dutyEstimate: result.dutyEstimate,
                }} 
              />
            ))}
          </div>
        )}

        {!loading && prices.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-mid-gray">No prices found for this product yet.</p>
          </div>
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
          © 2024 PriceGlobe AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
