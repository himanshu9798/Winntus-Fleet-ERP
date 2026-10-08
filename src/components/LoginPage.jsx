import React, { useState } from 'react';
import { 
  Building2, 
  Lock, 
  User, 
  ShieldCheck, 
  HardHat, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  X,
  Eye,
  EyeOff,
  Layers,
  Truck,
  Check,
  Loader2,
  FileText,
  Receipt,
  BookOpen
} from 'lucide-react';
import { INITIAL_CLIENTS } from '../data/mockData';

export default function LoginPage({ isOpen = true, isModal = false, onClose, onLoginSuccess, onOpenManual }) {
  const [loginType, setLoginType] = useState('admin'); // 'admin' or 'user'
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const performLogin = (role, clientObj = null) => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      if (role === 'admin') {
        onLoginSuccess({
          role: 'admin',
          name: 'Anil Dash (Branch Head)',
          company: 'WINNTUS SCAFFOLDING & SHUTTERING',
          gstin: '27AAEFW3842N1ZN'
        });
      } else {
        const client = clientObj || INITIAL_CLIENTS[0];
        onLoginSuccess({
          role: 'user',
          name: client.contactPerson,
          company: client.companyName,
          clientData: client,
          gstin: client.gstin
        });
      }
      if (onClose) onClose();
    }, 450);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (loginType === 'admin') {
      if (
        username.toLowerCase().includes('admin') || 
        username.toLowerCase().includes('anil') || 
        username.toLowerCase().includes('winntus') ||
        username === '1'
      ) {
        performLogin('admin');
      } else {
        setError('Invalid Admin credentials. Try "admin" / "admin123" or use 1-Click Fast Login.');
      }
    } else {
      const matchedClient = INITIAL_CLIENTS.find(c => 
        c.companyName.toLowerCase().includes(username.toLowerCase()) || 
        c.contactPerson.toLowerCase().includes(username.toLowerCase()) ||
        c.gstin.toLowerCase().includes(username.toLowerCase())
      );

      if (
        matchedClient || 
        username.toLowerCase().includes('user') || 
        username.toLowerCase().includes('shreeram') ||
        username.toLowerCase().includes('contractor') ||
        username === '2'
      ) {
        performLogin('user', matchedClient || INITIAL_CLIENTS[0]);
      } else {
        setError('Contractor not found. Try "contractor" / "user123" or select from 1-Click Login below.');
      }
    }
  };

  return (
    <div className={`${isModal ? 'fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3' : 'min-h-screen w-full flex flex-col justify-between p-3 sm:p-6 bg-[#faf8ff] relative overflow-x-hidden'}`}>
      
      {/* Vivid HD Background Photo - Scaffolding Construction Yard */}
      {!isModal && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <img 
            src="/images/hero.jpg" 
            alt="Scaffolding Construction Background" 
            className="w-full h-full object-cover object-center scale-105 filter brightness-95 contrast-110"
          />
          {/* Subtle cinematic gradient overlay to ensure perfect card contrast without washing out the photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/55 to-slate-950/75 backdrop-blur-[2px]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        </div>
      )}

      {/* Top Header Bar */}
      {!isModal && (
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between p-3 sm:px-6 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl relative z-10 text-white">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center font-bold text-white shadow-md shadow-purple-500/30 border border-purple-300/40">
              W
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-display font-black text-lg sm:text-xl tracking-tight text-white">
                <span>WINNTUS</span>
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs">
                  Cloud ERP
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-purple-300 font-semibold block">
                Scaffolding &amp; Shuttering Enterprise SaaS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-purple-800/60 shadow-inner text-slate-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-emerald-400 font-bold text-[11px]">Godown Online</span>
              <span className="text-purple-400">•</span>
              <span className="text-[11px] text-slate-300">Nashik Depot #2</span>
            </div>
          </div>
        </div>
      )}

      {/* Center Authentication Card */}
      <div className="w-full max-w-4xl mx-auto my-auto py-4 relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-purple-subtle border border-purple-200/80 overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-purple-hover">
          
          {/* Left Visual Column */}
          <div className="md:w-5/12 bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            
            {/* Soft Ambient Glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border border-purple-300/30">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Enterprise Portal 2026</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight leading-snug">
                Construction Fleet &amp; Yard Management
              </h2>

              <p className="text-xs text-purple-200/90 leading-relaxed">
                Log in to manage live inventory, adjust daily hire tariffs, approve delivery challans (Annexure-A), and calculate GST quotations.
              </p>

              {/* Feature Pills */}
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time Stock Inventory Sync</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Daily &amp; Monthly Rental Tariff Engine</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>9-Clause Legal Agreement &amp; GST Invoicing</span>
                </div>
              </div>
            </div>

            {/* Bottom Certification */}
            <div className="relative z-10 pt-6 mt-6 border-t border-purple-800/60 flex items-center justify-between text-[11px] text-purple-300">
              <span>ISO 9001:2008 Certified</span>
              <span className="text-amber-400 font-bold">Nashik Yard Godown</span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="md:w-7/12 p-6 sm:p-8 bg-white flex flex-col justify-between">
            
            <div>
              {/* Modal close button if modal mode */}
              {isModal && onClose && (
                <div className="flex justify-end mb-2">
                  <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Role Selection Tabs */}
              <div className="flex items-center p-1 bg-purple-50 rounded-2xl border border-purple-200 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setLoginType('admin');
                    setUsername('admin');
                    setPassword('admin123');
                    setError('');
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                    loginType === 'admin'
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                      : 'text-slate-600 hover:text-violet-700'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>👑 Admin (Owner)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoginType('user');
                    setUsername('contractor');
                    setPassword('user123');
                    setError('');
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                    loginType === 'user'
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                      : 'text-slate-600 hover:text-violet-700'
                  }`}
                >
                  <HardHat className="w-4 h-4" />
                  <span>👷 Contractor (Buyer)</span>
                </button>
              </div>

              {/* Form Heading */}
              <div className="mb-4">
                <h3 className="text-lg font-black text-slate-900 font-display">
                  {loginType === 'admin' ? 'Admin / Yard Depot Login' : 'Contractor & Buyer Login'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {loginType === 'admin' 
                    ? 'Enter your administrator credentials to manage stock & tariffs'
                    : 'Access client orders, generate quotations, and track rental equipment'}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Authentication Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Username / Mobile / GSTIN */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {loginType === 'admin' ? 'Admin Username / Email' : 'Contractor Name / Mobile / GSTIN'}
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-purple-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={loginType === 'admin' ? 'e.g. admin or anil' : 'e.g. contractor or shreeram'}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-purple-50/40 hover:bg-purple-50/70 focus:bg-white border border-purple-200 focus:border-violet-500 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-purple-50/40 hover:bg-purple-50/70 focus:bg-white border border-purple-200 focus:border-violet-500 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Help */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 text-violet-600 rounded border-purple-300 focus:ring-violet-500"
                    />
                    <span>Remember session</span>
                  </label>
                  <span className="text-violet-600 font-bold hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-black shadow-md shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Log In to {loginType === 'admin' ? 'Admin Dashboard' : 'Equipment Store'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* 1-Click Demo Logins Section */}
            <div className="pt-5 mt-5 border-t border-purple-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                ⚡ 1-Click Instant Test Logins:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => performLogin('admin')}
                  className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100/80 text-left transition-all group flex items-center justify-between"
                >
                  <div>
                    <span className="block text-xs font-bold text-violet-950">👑 Admin Owner</span>
                    <span className="text-[10px] text-purple-700">Anil Dash (Full Access)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:text-violet-700 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => performLogin('user')}
                  className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/80 text-left transition-all group flex items-center justify-between"
                >
                  <div>
                    <span className="block text-xs font-bold text-amber-950">👷 Contractor</span>
                    <span className="text-[10px] text-amber-700">Shreeram Construction</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:text-amber-700 transition-colors" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* User Manual & Software Guide Button Bar (Below Center Card) */}
      {onOpenManual && !isModal && (
        <div className="w-full max-w-4xl mx-auto my-2 flex justify-center relative z-10">
          <button
            type="button"
            onClick={onOpenManual}
            className="flex items-center gap-2.5 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-full font-black text-xs sm:text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-105 active:scale-95 border-2 border-purple-300"
          >
            <BookOpen className="w-4 h-4 text-amber-300 shrink-0 animate-bounce" />
            <span>📖 सचित्र ई-मैनुअल व 5 PDF डाक्यूमेंट्स देखें (Illustrated Visual PDF Manual &amp; 4-Doc Guide)</span>
            <ArrowRight className="w-4 h-4 text-white shrink-0" />
          </button>
        </div>
      )}

      {/* Bottom Footer Info when in full page mode */}
      {!isModal && (
        <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300 p-2.5 sm:px-5 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl relative z-10">
          <p>© 2026 WINNTUS Scaffolding &amp; Shuttering Cloud ERP. All Rights Reserved.</p>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms (Clause 1–9)</span>
            <span>•</span>
            <span>ISO 9001:2008 Certified</span>
          </div>
        </div>
      )}
    </div>
  );
}
