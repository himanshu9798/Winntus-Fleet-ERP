import React, { useState } from 'react';
import { 
  Building2, 
  HardHat, 
  CheckCircle2, 
  ShieldCheck, 
  Calculator, 
  ArrowRight, 
  Sparkles, 
  Receipt, 
  Truck, 
  Layers, 
  Phone, 
  Mail, 
  ChevronRight,
  Star,
  Zap,
  Globe
} from 'lucide-react';
import { INITIAL_PRODUCTS, COMPANY_INFO } from '../data/mockData';

export default function PublicStorefront({ onNavigateToApp }) {
  // Live Instant Estimator Calculator
  const [estCuplockQty, setEstCuplockQty] = useState(200);
  const [estLedgerQty, setEstLedgerQty] = useState(500);
  const [estPropsQty, setEstPropsQty] = useState(150);
  const [estMonths, setEstMonths] = useState(3);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Estimator live computation
  const monthlyRent = (estCuplockQty * 27) + (estLedgerQty * 16.20) + (estPropsQty * 65);
  const monthlyWithGST = Math.round(monthlyRent * 1.18);
  const totalWeightKg = (estCuplockQty * 9.0) + (estLedgerQty * 4.0) + (estPropsQty * 17.5);
  const totalWeightMT = (totalWeightKg / 1000).toFixed(2);
  const deposit3Mo = Math.round(monthlyWithGST * 3);
  const securityChequesVal = Math.round(totalWeightKg * 80);

  return (
    <div className="space-y-16 py-4">
      {/* SaaS & Equipment Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-14 text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Cloud ERP for Scaffolding & Shuttering Rentals</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
            Automate Rental Quotations, <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">Daily Hire Billing</span> & Logistics.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate manual spreadsheets. Generate ISO-certified Scaffolding Quotations with 3-month advance calculation, daily hire rate Tax Invoices with partial returns, and GST e-Way bills in seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigateToApp('dashboard')}
              className="px-6 py-3.5 bg-gradient-to-r from-sky-500 via-blue-600 to-amber-500 hover:from-sky-400 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-sky-900/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Launch Live ERP Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('rental-calculator');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm border border-slate-700 transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Instant Rental Estimator</span>
            </button>
          </div>
        </div>

        {/* Hero Product Visual Showcase */}
        <div className="relative mt-12 max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
          <img 
            src="/images/hero.jpg" 
            alt="Scaffolding high rise site" 
            className="w-full h-80 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
            <div className="text-left text-white">
              <span className="text-xs bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded">
                ENTERPRISE COMMERCIAL SOFTWARE
              </span>
              <h3 className="text-lg font-bold mt-2">Winntus Scaffolding Cloud ERP Ecosystem</h3>
              <p className="text-xs text-slate-300">ISO 9001:2008 Certified Management Suite for Civil Contractors & Yard Depots</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core PDF Modules Showcased */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Built from 4 Ground-Truth Industry Workflows
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineered precisely around real-world quotations, hire invoices, e-Way bills, and tariffs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-sky-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">1. Rental Quotation Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-calculates 3-Month Mobilisation Deposit, 5 Security Cheques replacement value, metric ton weight totals, and Clause 1-9 Terms.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">2. Master Tariff Catalog</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete specification & rate book for Cuplocks, Ledgers, Shuttering Plates, CT Prop Jacks, Base Jacks, and MS Challi boards.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">3. Daily Hire Tax Invoices</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates daily hire charges based on actual days on site with support for split off-hire partial returns, CGST/SGST 18% & round-off.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">4. e-Way Bill Logistics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Government standard GST e-Way bills with HSN 730890, Gate Passes, Vehicle number tracking, and automated delivery challans.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Rental Estimator Calculator */}
      <section id="rental-calculator" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Live Contractor Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              Scaffolding Rental Cost Estimator
            </h2>
            <p className="text-xs text-slate-400">
              Adjust equipment quantities below to estimate monthly rental, weight & required mobilisation advance.
            </p>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cuplock */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Cuplock Standards (2m)</span>
                <span className="font-mono text-sky-400 font-bold">{estCuplockQty} PCS</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="25"
                value={estCuplockQty} 
                onChange={e => setEstCuplockQty(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
              <span className="text-[11px] text-slate-400 block text-right">₹27.00 / month / pc</span>
            </div>

            {/* Ledgers */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Ledgers 1150mm</span>
                <span className="font-mono text-sky-400 font-bold">{estLedgerQty} PCS</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                step="50"
                value={estLedgerQty} 
                onChange={e => setEstLedgerQty(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
              <span className="text-[11px] text-slate-400 block text-right">₹16.20 / month / pc</span>
            </div>

            {/* Props */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">CT Prop Jacks 2x3m</span>
                <span className="font-mono text-sky-400 font-bold">{estPropsQty} PCS</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10"
                value={estPropsQty} 
                onChange={e => setEstPropsQty(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
              <span className="text-[11px] text-slate-400 block text-right">₹65.00 / month / pc</span>
            </div>
          </div>

          {/* Live Estimate Result Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950 p-6 rounded-2xl border border-sky-500/30">
            <div>
              <span className="text-xs text-slate-400">Total Order Weight:</span>
              <p className="text-xl font-bold text-white mt-1 font-mono">
                {totalWeightMT} <span className="text-xs font-normal text-slate-400">Metric Tons</span>
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Monthly Rent (18% GST):</span>
              <p className="text-xl font-black text-sky-400 mt-1 font-mono">
                ₹{monthlyWithGST.toLocaleString()} <span className="text-xs font-normal text-slate-400">/mo</span>
              </p>
            </div>
            <div>
              <span className="text-xs text-amber-400 font-semibold">3-Mo Advance Deposit:</span>
              <p className="text-xl font-black text-amber-300 mt-1 font-mono">
                ₹{deposit3Mo.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-xs text-purple-400 font-semibold">5 Security Cheques:</span>
              <p className="text-xl font-black text-purple-300 mt-1 font-mono">
                ₹{securityChequesVal.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigateToApp('quotations')}
              className="px-8 py-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold rounded-xl text-xs shadow-lg"
            >
              Lock-in this Quotation in Admin Panel
            </button>
          </div>
        </div>
      </section>

      {/* SaaS Pricing Plans to Sell this Software */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            SaaS License & Deployment
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Commercial Software Pricing Plans
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Ready to sell to scaffolding rental businesses, civil contractors & shuttering yards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plan 1 */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5">
            <div>
              <h3 className="font-bold text-white text-base">Starter Yard</h3>
              <p className="text-xs text-slate-400 mt-1">For single-depot scaffolding rental providers</p>
            </div>
            <div className="text-2xl font-black text-white font-mono">
              ₹14,999 <span className="text-xs font-normal text-slate-400">/year</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Up to 50 Metric Tons Inventory</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Quotation & Invoice PDF Generator</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> e-Way Bill & Gate Pass Tracking</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1 Yard Admin Login</li>
            </ul>
          </div>

          {/* Plan 2 */}
          <div className="p-6 bg-gradient-to-b from-sky-950/60 to-slate-900 border-2 border-sky-500 rounded-2xl space-y-5 relative shadow-xl shadow-sky-950">
            <span className="absolute -top-3 right-6 bg-gradient-to-r from-sky-500 to-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              Most Popular
            </span>
            <div>
              <h3 className="font-bold text-white text-base">Commercial Multi-Site Pro</h3>
              <p className="text-xs text-slate-400 mt-1">For growing contractors & multi-city rental operations</p>
            </div>
            <div className="text-2xl font-black text-sky-400 font-mono">
              ₹29,999 <span className="text-xs font-normal text-slate-400">/year</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Fleet Weight (Metric Tons)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Customer / Contractor Portal Login</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated Split Off-Hire Return Deductions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 4-Point KYC Document Verification</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited User Roles & Gate Passes</li>
            </ul>
          </div>

          {/* Plan 3 */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5">
            <div>
              <h3 className="font-bold text-white text-base">Enterprise Conglomerate</h3>
              <p className="text-xs text-slate-400 mt-1">For national scaffolding manufacturers & infrastructure groups</p>
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              ₹59,999 <span className="text-xs font-normal text-slate-400">/year</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-Godown Yard Syncing across India</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom Domain & White-label Branding</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tally / SAP Integration Support</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 Dedicated Account Manager</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
        <p>© 2026 WINNTUS ScaffFlow Cloud ERP. All rights reserved. ISO 9001:2008 Certified.</p>
        <p className="mt-1">Gat No. 2, Trimbakeshwar Road, Khambale, Nashik, Maharashtra - 422213</p>
      </footer>
    </div>
  );
}
