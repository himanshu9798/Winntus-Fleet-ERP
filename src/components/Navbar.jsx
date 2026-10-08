import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  ChevronDown, 
  ShieldCheck, 
  FileText, 
  Receipt, 
  Truck, 
  Building2, 
  Layers, 
  HardHat, 
  Package, 
  HelpCircle,
  Sparkles,
  ArrowRightLeft,
  UserCheck,
  User,
  LogOut,
  Plus,
  Users,
  SlidersHorizontal,
  Menu,
  X,
  Code2,
  Heart,
  BookOpen,
  Bell,
  Scale
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentUser,
  onOpenLogin,
  onLogout,
  onOpenManual,
  cartItemsCount, 
  onOpenCart,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = currentUser.role === 'admin';

  const categories = [
    { id: 'All', name: 'All Equipment', icon: Layers },
    { id: 'Cuplock', name: 'Cuplock Standards', icon: Package },
    { id: 'Ledger', name: 'Ledgers & Horizontals', icon: Package },
    { id: 'Shuttering', name: 'Shuttering Plates', icon: Building2 },
    { id: 'Props', name: 'CT Prop Jacks', icon: HardHat },
    { id: 'Accessories', name: 'Base / U-Jacks & Clamps', icon: ShieldCheck },
    { id: 'Walkway', name: 'MS Walkway Challi', icon: Layers },
    { id: 'Pipes', name: 'MS & SQ Pipes', icon: Package },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-purple-subtle w-full max-w-full transition-all">
        
        {/* Top Slim Utility & Status Strip */}
        <div className="bg-slate-950 text-slate-300 text-xs px-3 sm:px-6 lg:px-8 py-1.5 border-b border-purple-950/40 w-full">
          <div className="w-full flex items-center justify-between gap-2 max-w-7xl mx-auto">
            
            <div className="flex items-center gap-2 sm:gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-violet-400 font-black flex items-center gap-1.5 text-[11px] sm:text-xs shrink-0 tracking-wide">
                <HardHat className="w-3.5 h-3.5 text-amber-400" />
                WINNTUS B2B FLEET ERP
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-400 truncate">
                ISO 9001:2008 Godown #2, Nashik
              </span>
              <span className="text-slate-700 hidden md:inline">•</span>
              <span className="hidden md:flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                Live Yard Stock: <strong>8,240 MT</strong>
              </span>
            </div>

            {/* User Status, Manual & Fast Login / Logout Triggers */}
            <div className="flex items-center gap-2 shrink-0">
              {onOpenManual && (
                <button
                  onClick={onOpenManual}
                  className="text-[11px] bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm transition-all hover:scale-105 active:scale-95 border border-violet-400/40"
                  title="Open Illustrated User Manual & PDF Reader"
                >
                  <BookOpen className="w-3 h-3 text-amber-300" />
                  <span>📖 यूजर गाइड (PDF)</span>
                </button>
              )}

              {/* Role Indicator Pill */}
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center gap-1 shadow-xs border ${
                isAdmin 
                  ? 'bg-violet-950/80 text-violet-300 border-violet-700' 
                  : 'bg-amber-950/80 text-amber-300 border-amber-700'
              }`}>
                {isAdmin ? '👑 Admin (Owner)' : `👷 ${currentUser.company || 'Contractor'}`}
              </span>

              {/* Role Switcher */}
              {onOpenLogin && (
                <button
                  onClick={onOpenLogin}
                  className="text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 px-2 py-0.5 rounded transition-colors hidden sm:flex items-center gap-1"
                >
                  <ArrowRightLeft className="w-3 h-3 text-violet-400" />
                  <span>Switch Role</span>
                </button>
              )}

              {/* Logout Button */}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-[11px] text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 px-2 py-0.5 rounded transition-colors flex items-center gap-1 border border-rose-900/50"
                  title="Logout from session"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Navbar Row */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Left: Brand Logo & Tagline */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button 
                onClick={() => handleTabClick(isAdmin ? 'dashboard' : 'marketplace')}
                className="flex items-center gap-2.5 text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform border border-purple-300/30">
                  W
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-display font-black text-lg sm:text-xl tracking-tight text-slate-900">
                    <span>WINNTUS</span>
                    <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs">
                      {isAdmin ? 'ADMIN ERP' : 'PORTAL'}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-purple-700 font-semibold block tracking-tight">
                    {isAdmin ? 'Yard Master & Tariff Control' : 'B2B Equipment Hire Store'}
                  </span>
                </div>
              </button>
            </div>

            {/* Center: Search Equipment Input */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-purple-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Cuplock, Props, Ledgers, Walkway, Clamps, Pipes..."
                  className="w-full pl-10 pr-4 py-2 bg-purple-50/50 hover:bg-purple-50/80 focus:bg-white border border-purple-200 focus:border-violet-500 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 shadow-inner transition-all"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Actions & Cart Drawer Trigger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Hire Cart Button (ONLY FOR CONTRACTOR / BUYER) */}
              {!isAdmin ? (
                <button
                  onClick={onOpenCart}
                  className="relative flex items-center gap-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-purple-500/20 hover:shadow-purple-500/35 transition-all hover:scale-105 active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Hire Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-1.5 py-0.2 rounded-full shadow-xs animate-bounce">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              ) : (
                <div className="hidden sm:flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200 text-xs">
                  <span className="w-2 h-2 rounded-full bg-violet-600" />
                  <span className="font-bold text-violet-950 text-[11px]">Yard Master Active</span>
                </div>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Tabs Bar */}
        <div className="bg-slate-50/90 border-t border-purple-100/80 px-3 sm:px-6 lg:px-8 py-1.5 hidden lg:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Primary Navigation Tabs */}
            <nav className="flex items-center gap-1 text-xs">
              
              {/* ADMIN-SPECIFIC TABS */}
              {isAdmin ? (
                <>
                  <button
                    onClick={() => handleTabClick('dashboard')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'dashboard'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>📊 Yard Dashboard &amp; Stock</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('marketplace')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'marketplace'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>📦 Stock &amp; Price Controller</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('clients')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'clients'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>👥 Contractor Accounts</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('quotations')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'quotations'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>📄 Quotation Maker</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('invoices')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'invoices'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>📑 GST Invoices Engine</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('eway-bills')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'eway-bills'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>🚚 E-Way Bills &amp; Gate Pass</span>
                  </button>
                </>
              ) : (
                /* CONTRACTOR / USER SPECIFIC TABS */
                <>
                  <button
                    onClick={() => handleTabClick('marketplace')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'marketplace'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Equipment Store</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('quotations')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'quotations'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>My Quotations</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('invoices')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'invoices'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>My Tax Invoices</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('eway-bills')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'eway-bills'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>My Delivery Dispatches</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('client-portal')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'client-portal'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20'
                        : 'text-slate-600 hover:text-violet-700 hover:bg-purple-100/60'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>My Site Account</span>
                  </button>
                </>
              )}
            </nav>

            {/* Quick Category Badges for Marketplace */}
            {activeTab === 'marketplace' && (
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {categories.slice(0, 5).map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      selectedCategory === c.id
                        ? 'bg-purple-200/80 text-purple-900 font-bold border border-purple-300'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-purple-100/40'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-purple-100 p-4 shadow-xl space-y-3 animate-in slide-in-from-top-4 duration-200">
            
            {/* Mobile Search */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-purple-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Scaffolding items..."
                className="w-full pl-9 pr-3 py-2 bg-purple-50/70 border border-purple-200 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
            </div>

            {/* Mobile Nav Links based on Role */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {isAdmin ? (
                <>
                  <button
                    onClick={() => handleTabClick('dashboard')}
                    className={`p-2.5 rounded-xl font-bold flex items-center gap-2 ${
                      activeTab === 'dashboard' ? 'bg-violet-600 text-white' : 'bg-purple-50 text-slate-800'
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('clients')}
                    className={`p-2.5 rounded-xl font-bold flex items-center gap-2 ${
                      activeTab === 'clients' ? 'bg-violet-600 text-white' : 'bg-purple-50 text-slate-800'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Contractors</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleTabClick('marketplace')}
                  className={`p-2.5 rounded-xl font-bold flex items-center gap-2 ${
                    activeTab === 'marketplace' ? 'bg-violet-600 text-white' : 'bg-purple-50 text-slate-800'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Equipment Store</span>
                </button>
              )}

              <button
                onClick={() => handleTabClick('quotations')}
                className={`p-2.5 rounded-xl font-bold flex items-center gap-2 ${
                  activeTab === 'quotations' ? 'bg-violet-600 text-white' : 'bg-purple-50 text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Quotations</span>
              </button>

              <button
                onClick={() => handleTabClick('invoices')}
                className={`p-2.5 rounded-xl font-bold flex items-center gap-2 ${
                  activeTab === 'invoices' ? 'bg-violet-600 text-white' : 'bg-purple-50 text-slate-800'
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span>GST Invoices</span>
              </button>

              <button
                onClick={() => handleTabClick('eway-bills')}
                className={`p-2.5 rounded-xl font-bold flex items-center gap-2 ${
                  activeTab === 'eway-bills' ? 'bg-violet-600 text-white' : 'bg-purple-50 text-slate-800'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>E-Way Bills</span>
              </button>

              {!isAdmin && (
                <button
                  onClick={() => handleTabClick('client-portal')}
                  className={`p-2.5 rounded-xl font-bold flex items-center gap-2 ${
                    activeTab === 'client-portal' ? 'bg-violet-600 text-white' : 'bg-purple-50 text-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>My Site Account</span>
                </button>
              )}
            </div>

            {/* Mobile User Manual trigger */}
            {onOpenManual && (
              <button
                onClick={() => {
                  onOpenManual();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>सचित्र यूजर मैनुअल व 5 PDF डाक्यूमेंट्स</span>
              </button>
            )}

          </div>
        )}

      </header>
    </>
  );
}
