import React, { useState } from 'react';
import { 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Clock, 
  HardHat, 
  FileText, 
  Scale, 
  Building2, 
  ChevronRight, 
  Filter, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Info,
  Package,
  Layers,
  Award,
  Check,
  Plus,
  Minus,
  Edit3,
  Save,
  SlidersHorizontal,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { INITIAL_PRODUCTS, COMPANY_INFO } from '../data/mockData';

export default function AmazonFlipkartStore({ 
  products, 
  currentUser,
  onUpdateProducts,
  onAddToCart, 
  onQuickQuote, 
  selectedCategory, 
  searchTerm 
}) {
  const isAdmin = currentUser?.role === 'admin';
  const [editingCardId, setEditingCardId] = useState(null);
  const [editPriceForm, setEditPriceForm] = useState({});
  const [liveToastMessage, setLiveToastMessage] = useState('');

  const filtered = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.size.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Admin Quick Stock Adjust
  const handleAdminStockDelta = (prodId, delta) => {
    if (!onUpdateProducts) return;
    const updated = products.map(p => {
      if (p.id === prodId) {
        const newStock = Math.max(0, (p.stockGodown || p.stock || 0) + delta);
        return { ...p, stockGodown: newStock, stock: newStock };
      }
      return p;
    });
    onUpdateProducts(updated);
    const prod = products.find(p => p.id === prodId);
    showToast(`✓ Updated stock for "${prod?.name}" by ${delta > 0 ? '+' : ''}${delta} PCS! Live on Contractor store.`);
  };

  // Admin Quick Price / Rate Adjust
  const handleAdminRateDelta = (prodId, deltaDay) => {
    if (!onUpdateProducts) return;
    const updated = products.map(p => {
      if (p.id === prodId) {
        const newDaily = Math.max(0.05, Number((p.rateDay + deltaDay).toFixed(2)));
        const newMonthly = Math.round(newDaily * 30);
        return { ...p, rateDay: newDaily, rateMonth: newMonthly };
      }
      return p;
    });
    onUpdateProducts(updated);
    const prod = products.find(p => p.id === prodId);
    showToast(`✓ Updated daily hire rate for "${prod?.name}" to ₹${(prod.rateDay + deltaDay).toFixed(2)}/day! Live in real-time.`);
  };

  // Admin Inline Form Save
  const handleSaveInlineEdit = (prodId) => {
    if (!onUpdateProducts) return;
    const form = editPriceForm[prodId] || {};
    const updated = products.map(p => {
      if (p.id === prodId) {
        const daily = form.rateDay !== undefined ? Number(form.rateDay) : p.rateDay;
        const monthly = form.rateMonth !== undefined ? Number(form.rateMonth) : Math.round(daily * 30);
        const stock = form.stock !== undefined ? Number(form.stock) : (p.stockGodown || p.stock || 0);
        const buyPrice = form.priceSale !== undefined ? Number(form.priceSale) : (p.priceSale || p.price || 1000);
        return {
          ...p,
          rateDay: daily,
          rateMonth: monthly,
          stockGodown: stock,
          stock: stock,
          priceSale: buyPrice
        };
      }
      return p;
    });

    onUpdateProducts(updated);
    setEditingCardId(null);
    showToast('✓ Saved changes! Live rates and yard stock updated instantly.');
  };

  const showToast = (msg) => {
    setLiveToastMessage(msg);
    setTimeout(() => setLiveToastMessage(''), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Live Toast Notification */}
      {liveToastMessage && (
        <div className="sticky top-20 z-50 p-3.5 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center justify-between gap-3 text-xs font-bold animate-in slide-in-from-top-3 duration-200 border border-emerald-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
            <span>{liveToastMessage}</span>
          </div>
          <button 
            onClick={() => setLiveToastMessage('')}
            className="p-1 hover:bg-emerald-700 rounded-lg text-emerald-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Banner (Different for Admin vs Contractor) */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl border border-purple-200/60 bg-gradient-to-r from-violet-950 via-indigo-950 to-purple-900 text-white p-6 sm:p-10">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="space-y-3.5 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-purple-300/30">
              <HardHat className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {isAdmin ? '👑 ADMIN LIVE INVENTORY & TARIFF CONTROLLER' : 'OFFICIAL B2B EQUIPMENT DEPOT • NASHIK YARD #2'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight leading-tight">
              {isAdmin 
                ? 'Master Equipment Stock & Price Master' 
                : 'Commercial Scaffolding & Formwork Fleet Hire'}
            </h1>

            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              {isAdmin 
                ? 'Admin can increase/decrease yard stock quantities, adjust daily/monthly rental tariffs, and set sale prices. All updates reflect instantly on all contractor store screens!' 
                : 'Certified Cuplock Standards, CT Prop Jacks, Ledgers & Walkway Boards with real-time daily hire calculation, electronic weighbridge slips, and Annexure-A Delivery Challans.'}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="text-xs bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-white font-medium flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Clause 7 Loss Rate: ₹65/kg</span>
              </span>
              <span className="text-xs bg-emerald-500/20 border border-emerald-400/40 px-3 py-1.5 rounded-xl text-emerald-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>18% GST Input Credit</span>
              </span>
              <span className="text-xs bg-violet-500/20 border border-violet-400/40 px-3 py-1.5 rounded-xl text-purple-200 font-medium">
                {isAdmin ? '⚡ Instant Store Sync Active' : 'Min Hire Period: 30 Days'}
              </span>
            </div>
          </div>

          <div className="w-full lg:w-96 h-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 group">
            <img 
              src="/images/hero.jpg" 
              alt="Scaffolding Yard" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>
      </div>

      {/* Equipment Product Grid */}
      <div className="space-y-4">
        
        {/* Results Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 font-display">
              {isAdmin ? 'Master Product Catalog (Live Stock & Rate Editor)' : 'Available Equipment (' + filtered.length + ' Items)'}
            </h2>
            <span className="text-xs text-purple-700 font-semibold bg-purple-100 px-2 py-0.5 rounded-full">
              Category: {selectedCategory}
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            {isAdmin ? 'Click +/- to adjust available yard quantity or edit price' : 'Showing all certified yard stock ready for dispatch'}
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((product) => {
            const currentStock = product.stockGodown !== undefined ? product.stockGodown : (product.stock || 0);
            const isOutOfStock = currentStock <= 0;
            const isEditing = editingCardId === product.id;
            const form = editPriceForm[product.id] || {
              rateDay: product.rateDay,
              rateMonth: product.rateMonth,
              stock: currentStock,
              priceSale: product.priceSale || 1450
            };

            return (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-purple-100 shadow-purple-subtle hover:shadow-purple-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Image Container */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img 
                    src={product.image || '/images/hero.jpg'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/20 uppercase tracking-wider">
                    {product.category}
                  </div>

                  {/* Stock Status Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    {isOutOfStock ? (
                      <span className="bg-rose-500/90 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm">
                        OUT OF STOCK (0)
                      </span>
                    ) : (
                      <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {currentStock} in Yard
                      </span>
                    )}
                  </div>

                  {/* Weight Overlay Bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-2 text-white flex items-center justify-between text-[11px] font-mono">
                    <span className="flex items-center gap-1">
                      <Scale className="w-3 h-3 text-amber-400" />
                      <strong>{product.weightKg} Kg</strong> / pc
                    </span>
                    <span className="text-slate-300">{product.size}</span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  
                  <div>
                    <h3 className="font-black text-sm text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-1 font-display">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* =========================================================
                      IF ADMIN: RENDER STOCK & TARIFF CONTROLS DIRECTLY
                     ========================================================= */}
                  {isAdmin ? (
                    <div className="space-y-2.5 pt-1">
                      
                      {/* Stock Quantity Controller */}
                      <div className="p-2.5 bg-purple-50/80 rounded-xl border border-purple-200/80 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700">Yard Stock Available:</span>
                          <span className="font-mono font-black text-emerald-700 text-xs">
                            {currentStock} PCS
                          </span>
                        </div>

                        {/* Stock Adjustment Buttons */}
                        <div className="flex items-center gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => handleAdminStockDelta(product.id, -50)}
                            className="flex-1 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-purple-200 rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all"
                            title="Decrease Stock by 50"
                          >
                            -50
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAdminStockDelta(product.id, 50)}
                            className="flex-1 py-1 bg-white hover:bg-emerald-50 text-emerald-700 border border-purple-200 rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all"
                            title="Increase Stock by 50"
                          >
                            +50
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAdminStockDelta(product.id, 200)}
                            className="flex-1 py-1 bg-white hover:bg-violet-50 text-violet-700 border border-purple-200 rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all"
                            title="Receive New Batch +200"
                          >
                            +200
                          </button>
                        </div>
                      </div>

                      {/* Tariff Rate Controller */}
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                        <div className="flex items-baseline justify-between">
                          <span className="font-bold text-slate-600">Daily Hire Tariff:</span>
                          <div className="text-right">
                            <span className="text-base font-black text-violet-800 font-mono">₹{product.rateDay}</span>
                            <span className="text-[10px] text-slate-400"> /day</span>
                          </div>
                        </div>

                        {/* Rate Increment / Decrement Steppers */}
                        <div className="flex items-center justify-between gap-1 pt-1">
                          <button
                            type="button"
                            onClick={() => handleAdminRateDelta(product.id, -0.10)}
                            className="px-2.5 py-0.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-[11px] font-bold active:scale-95"
                            title="Decrease rate by ₹0.10"
                          >
                            - ₹0.10
                          </button>

                          <span className="text-[10px] text-slate-500 font-mono">
                            Monthly: ₹{product.rateMonth}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleAdminRateDelta(product.id, 0.10)}
                            className="px-2.5 py-0.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-[11px] font-bold active:scale-95"
                            title="Increase rate by ₹0.10"
                          >
                            + ₹0.10
                          </button>
                        </div>
                      </div>

                      {/* Admin Quick Status Tag */}
                      <div className="pt-1 flex items-center justify-between text-[10px] text-purple-700 font-semibold">
                        <span>✓ Live sync on Contractor Store</span>
                        <span className="bg-purple-100 text-purple-900 px-1.5 py-0.2 rounded font-mono">Admin Mode</span>
                      </div>

                    </div>
                  ) : (
                    /* =========================================================
                       IF CONTRACTOR / USER: RENDER HIRE CART & QUOTE BUTTONS
                       ========================================================= */
                    <>
                      {/* Pricing Box */}
                      <div className="p-2.5 bg-purple-50/60 rounded-xl border border-purple-100/80 space-y-1.5">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[11px] font-bold text-slate-600">Daily Hire Rate:</span>
                          <div className="text-right">
                            <span className="text-base font-black text-violet-700">₹{product.rateDay}</span>
                            <span className="text-[10px] text-slate-500 font-medium"> / day</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-purple-200/60">
                          <span>Monthly Rent: <strong>₹{product.rateMonth}</strong></span>
                          <span>Buy Price: <strong>₹{product.priceSale || 1450}</strong></span>
                        </div>
                      </div>

                      {/* Card Action Buttons (Only for Contractors) */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => onAddToCart(product, 'hire')}
                          disabled={isOutOfStock}
                          className="w-full py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-40 disabled:hover:from-violet-600 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow-violet-500/25 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Hire Rent</span>
                        </button>

                        <button
                          onClick={() => onQuickQuote(product)}
                          className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-950 rounded-xl text-xs font-bold border border-purple-300/80 transition-all active:scale-95 flex items-center justify-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5 text-violet-700" />
                          <span>Quote PDF</span>
                        </button>
                      </div>
                    </>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
