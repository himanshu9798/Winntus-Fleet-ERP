import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Layers, 
  Edit3, 
  Plus, 
  Minus, 
  Check, 
  Save, 
  HardHat, 
  ArrowUpRight, 
  Search, 
  ChevronRight, 
  Receipt, 
  FileText, 
  Truck,
  Sparkles,
  AlertCircle,
  SlidersHorizontal,
  Scale
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function AdminDashboard({ 
  products, 
  onUpdateProducts, 
  clients, 
  invoices, 
  quotations, 
  dispatches,
  onNavigate, 
  onOpenPrint 
}) {
  const [selectedCustomerId, setSelectedCustomerId] = useState(clients[0]?.id || 'cli-01');
  const [editingProductId, setEditingProductId] = useState(null);
  const [editPriceForm, setEditPriceForm] = useState({ rateMonth: 0, rateDay: 0, stockGodown: 0 });
  const [searchProductTerm, setSearchProductTerm] = useState('');
  const [priceUpdateSuccess, setPriceUpdateSuccess] = useState('');

  // Total Business Aggregations
  const totalCustomersCount = clients.length;
  const totalMonthlySalesRevenue = clients.reduce((acc, c) => acc + c.currentMonthlyRent, 0);
  const totalFleetWeightMT = clients.reduce((acc, c) => acc + c.totalWeightMT, 0).toFixed(1);
  const totalGodownStockPcs = products.reduce((acc, p) => acc + p.stockGodown, 0);
  const totalOnRentStockPcs = products.reduce((acc, p) => acc + p.stockOnRent, 0);
  const totalStockPcs = totalGodownStockPcs + totalOnRentStockPcs;

  // Selected Customer Details
  const activeCustomer = clients.find(c => c.id === selectedCustomerId) || clients[0];

  // Quick Inline Price & Stock Editor
  const handleStartEdit = (prod) => {
    setEditingProductId(prod.id);
    setEditPriceForm({
      rateMonth: prod.rateMonth,
      rateDay: prod.rateDay,
      stockGodown: prod.stockGodown
    });
  };

  const handleSaveProductEdit = (prodId) => {
    const updated = products.map(p => {
      if (p.id === prodId) {
        return {
          ...p,
          rateMonth: Number(editPriceForm.rateMonth),
          rateDay: Number((editPriceForm.rateMonth / 30).toFixed(2)),
          stockGodown: Number(editPriceForm.stockGodown)
        };
      }
      return p;
    });

    onUpdateProducts(updated);
    setEditingProductId(null);
    setPriceUpdateSuccess('✓ Updated successfully! New price & stock are immediately live for all contractors.');
    setTimeout(() => setPriceUpdateSuccess(''), 4000);
  };

  const handleQuickStockAdjust = (prodId, delta) => {
    const updated = products.map(p => {
      if (p.id === prodId) {
        const newStock = Math.max(0, p.stockGodown + delta);
        return { ...p, stockGodown: newStock };
      }
      return p;
    });
    onUpdateProducts(updated);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchProductTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchProductTerm.toLowerCase()) ||
    p.size.toLowerCase().includes(searchProductTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      
      {/* Top Admin Summary Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-purple-100 shadow-purple-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              👑 Master Admin Console
            </span>
            <span className="text-xs text-purple-700 font-semibold">
              Live Fleet Inventory &amp; Tariff Controller
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-1">
            Yard Operations, Customer Accounts &amp; Product Master
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor contractor site deployments, adjust warehouse stock (+/-), and update rental tariffs in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('quotations')}
            className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-950 text-xs font-bold rounded-xl border border-purple-300 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-violet-700" />
            <span>Quotes ({quotations.length})</span>
          </button>
          <button
            onClick={() => onNavigate('invoices')}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-violet-500/20 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Invoices ({invoices.length})</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {priceUpdateSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-bold flex items-center gap-2 shadow-sm animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{priceUpdateSuccess}</span>
        </div>
      )}

      {/* 4 Core Admin KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Metric 1: Total Users / Customers */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-purple-subtle hover:shadow-purple-hover hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold text-slate-600">Registered Contractors</span>
            <div className="w-8 h-8 bg-purple-50 text-violet-600 rounded-xl flex items-center justify-center font-bold border border-purple-200/60">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-display">
            {totalCustomersCount} <span className="text-xs font-semibold text-slate-400">Accounts</span>
          </p>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            3 Active Commercial Sites Deployed
          </span>
        </div>

        {/* Metric 2: Total Sales / Monthly Rental Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-purple-subtle hover:shadow-purple-hover hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold text-slate-600">Monthly Rental Dues</span>
            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold border border-emerald-200/60">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-2 font-display">
            ₹{totalMonthlySalesRevenue.toLocaleString()}
            <span className="text-xs text-slate-400 font-normal"> /mo</span>
          </p>
          <span className="text-[11px] text-slate-400 block mt-1 font-mono">
            Across {totalFleetWeightMT} MT Material Fleet
          </span>
        </div>

        {/* Metric 3: Total Quantity In Godown */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-purple-subtle hover:shadow-purple-hover hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold text-slate-600">Godown Yard Stock</span>
            <div className="w-8 h-8 bg-purple-50 text-violet-600 rounded-xl flex items-center justify-center font-bold border border-purple-200/60">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-violet-900 mt-2 font-mono font-bold">
            {totalGodownStockPcs.toLocaleString()} <span className="text-xs text-slate-400 font-normal">PCS</span>
          </p>
          <span className="text-[11px] text-purple-700 font-medium block mt-1">
            Ready for instant truck dispatch
          </span>
        </div>

        {/* Metric 4: Material Sold / Out on Rent */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-purple-subtle hover:shadow-purple-hover hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold text-slate-600">Material on Sites</span>
            <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold border border-amber-200/60">
              <HardHat className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-700 mt-2 font-mono font-bold">
            {totalOnRentStockPcs.toLocaleString()} <span className="text-xs text-slate-400 font-normal">PCS</span>
          </p>
          <span className="text-[11px] text-amber-700 font-bold block mt-1">
            {totalFleetWeightMT} Metric Tons Active
          </span>
        </div>
      </div>

      {/* SECTION 1: CUSTOMER REVENUE & MATERIAL BREAKDOWN */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-purple-100 shadow-purple-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-3">
          <div>
            <h2 className="text-base font-black text-slate-900 font-display flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-600" />
              <span>Contractor Portfolios &amp; Active Site Deployments</span>
            </h2>
            <p className="text-xs text-slate-500">
              Select any contractor to inspect components currently deployed at their site and monthly billing dues.
            </p>
          </div>
          <span className="text-xs font-bold text-violet-700 bg-purple-100 px-3 py-1 rounded-full w-fit">
            {clients.length} Active Accounts
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Customer Selection Column */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block px-1">
              Select Contractor Account
            </span>
            {clients.map(client => (
              <div
                key={client.id}
                onClick={() => setSelectedCustomerId(client.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedCustomerId === client.id 
                    ? 'bg-purple-50/80 border-violet-500 shadow-md ring-1 ring-violet-400' 
                    : 'bg-slate-50/70 border-purple-100 hover:border-purple-200 hover:bg-purple-50/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-bold text-slate-900">{client.companyName}</strong>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {client.kycStatus}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 truncate flex items-center gap-1">
                  <HardHat className="w-3 h-3 text-amber-500 shrink-0" />
                  {client.siteLocation}
                </p>
                <div className="mt-2.5 pt-2.5 border-t border-purple-100 flex justify-between text-xs">
                  <span className="text-slate-500">Monthly Bill:</span>
                  <span className="font-bold text-violet-700 font-mono">₹{client.currentMonthlyRent.toLocaleString()}/mo</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Itemized Material Taken by Selected Customer */}
          <div className="lg:col-span-2 bg-purple-50/40 p-4 sm:p-5 rounded-2xl border border-purple-100 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-200/60 pb-3">
              <div>
                <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider">Site Equipment Ledger</span>
                <h3 className="text-sm font-black text-slate-900">{activeCustomer.companyName}</h3>
                <span className="text-xs text-slate-500 font-mono">GST: {activeCustomer.gstin} | Site: {activeCustomer.siteLocation}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Total Material On Site:</span>
                <span className="text-sm font-black text-violet-900 font-mono">
                  {activeCustomer.itemsOnSiteCount} PCS ({activeCustomer.totalWeightMT} MT)
                </span>
              </div>
            </div>

            {/* Site Components Table */}
            <div className="overflow-x-auto bg-white rounded-xl border border-purple-100 shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-purple-100/60 text-purple-950 uppercase font-bold text-[10px] border-b border-purple-200/80">
                  <tr>
                    <th className="p-2.5">Component Description</th>
                    <th className="p-2.5 text-right">Quantity</th>
                    <th className="p-2.5 text-right">Daily Tariff</th>
                    <th className="p-2.5 text-right">Days on Site</th>
                    <th className="p-2.5 text-right">Monthly Rent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-50">
                  {activeCustomer.id === 'cli-01' ? (
                    <>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900">Ledger / Horizontal 1150mm</td>
                        <td className="p-2.5 text-right font-mono font-bold text-violet-700">1,622 pcs</td>
                        <td className="p-2.5 text-right font-mono">₹0.48/day</td>
                        <td className="p-2.5 text-right font-mono text-amber-700 font-bold">31 days</td>
                        <td className="p-2.5 text-right font-mono font-bold text-emerald-700">₹24,135.36</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900">Ledger / Horizontal 850mm</td>
                        <td className="p-2.5 text-right font-mono font-bold text-violet-700">533 pcs</td>
                        <td className="p-2.5 text-right font-mono">₹0.40/day</td>
                        <td className="p-2.5 text-right font-mono text-amber-700 font-bold">31 days</td>
                        <td className="p-2.5 text-right font-mono font-bold text-emerald-700">₹6,609.20</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900">CT Prop Jack Set 2x3 Mtr</td>
                        <td className="p-2.5 text-right font-mono font-bold text-violet-700">250 pcs</td>
                        <td className="p-2.5 text-right font-mono">₹2.00/day</td>
                        <td className="p-2.5 text-right font-mono text-amber-700 font-bold">29 days</td>
                        <td className="p-2.5 text-right font-mono font-bold text-emerald-700">₹14,592.00</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900">Cuplock Standard (Vertical) 3.0 Mtr</td>
                        <td className="p-2.5 text-right font-mono font-bold text-violet-700">490 pcs</td>
                        <td className="p-2.5 text-right font-mono">₹1.20/day</td>
                        <td className="p-2.5 text-right font-mono text-amber-700 font-bold">31 days</td>
                        <td className="p-2.5 text-right font-mono font-bold text-emerald-700">₹18,228.00</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td className="p-2.5 font-bold text-slate-900">Cuplock Standards &amp; Ledgers Bulk Set</td>
                      <td className="p-2.5 text-right font-mono font-bold text-violet-700">{activeCustomer.itemsOnSiteCount} pcs</td>
                      <td className="p-2.5 text-right font-mono">Contract Tariff</td>
                      <td className="p-2.5 text-right font-mono text-amber-700 font-bold">Active</td>
                      <td className="p-2.5 text-right font-mono font-bold text-emerald-700">₹{activeCustomer.currentMonthlyRent.toLocaleString()}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick Customer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span>3-Mo Advance Held: <strong className="text-emerald-700">₹{activeCustomer.depositHeld.toLocaleString()}</strong></span>
                <span>•</span>
                <span>Security Cheques: <strong className="text-purple-700">{activeCustomer.securityChequesReceived} Cheques</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('invoices')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95"
                >
                  Generate Tax Invoice
                </button>
                <button
                  onClick={() => onNavigate('eway-bills')}
                  className="px-3 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95"
                >
                  Issue Gate Pass
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 2: LIVE INVENTORY & TARIFF CONTROLLER */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-purple-100 shadow-purple-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-3">
          <div>
            <h2 className="text-base font-black text-slate-900 font-display flex items-center gap-2">
              <Package className="w-5 h-5 text-violet-600" />
              <span>Live Equipment Stock &amp; Daily/Monthly Tariff Editor</span>
            </h2>
            <p className="text-xs text-slate-500">
              Admin adjustments to stock quantity or tariffs here update instantly across all contractor marketplaces!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchProductTerm}
                onChange={e => setSearchProductTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-purple-50/50 border border-purple-200 rounded-xl focus:outline-none focus:border-violet-500"
              />
            </div>

            <button
              onClick={() => {
                const name = prompt("Enter new Scaffolding Component name:");
                if (name) {
                  const rate = Number(prompt("Enter Monthly Rental Rate (₹/month):", "25")) || 25;
                  const stock = Number(prompt("Enter Godown Stock Quantity (PCS):", "500")) || 500;
                  const newP = {
                    id: `prod-${Date.now()}`,
                    name: name,
                    category: "Cuplock",
                    size: "Standard",
                    unitWeightKg: 4.5,
                    rateDay: Number((rate / 30).toFixed(2)),
                    rateMonth: rate,
                    stockGodown: stock,
                    stockOnRent: 0,
                    image: "/images/cuplock.jpg"
                  };
                  onUpdateProducts([newP, ...products]);
                  setPriceUpdateSuccess(`✓ Added "${name}" to product master! Available immediately to contractors.`);
                }
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1 shrink-0 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Equipment</span>
            </button>
          </div>
        </div>

        {/* Live Editable Products Table */}
        <div className="w-full overflow-x-auto border border-purple-100 rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-purple-100/60 text-purple-950 uppercase font-bold text-[10px] border-b border-purple-200/80">
              <tr>
                <th className="p-3">Product Name &amp; Category</th>
                <th className="p-3">Size</th>
                <th className="p-3 text-center">Yard Stock (Adjust Qty)</th>
                <th className="p-3 text-center">On Rent</th>
                <th className="p-3 text-right">Daily Rate (₹/day)</th>
                <th className="p-3 text-right">Monthly Rate (₹/mo)</th>
                <th className="p-3 text-right">Monthly Revenue</th>
                <th className="p-3 text-center">Admin Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filteredProducts.map((p) => {
                const isEditing = editingProductId === p.id;
                const monthlyRevenue = Math.round(p.stockOnRent * p.rateMonth);

                return (
                  <tr key={p.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-10 h-10 object-cover rounded-lg border border-purple-100 shrink-0" 
                        />
                        <div>
                          <strong className="text-slate-900 text-xs block">{p.name}</strong>
                          <span className="text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200 font-semibold">
                            {p.category} • {p.unitWeightKg} kg/pc
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 font-mono font-medium text-slate-700">{p.size}</td>

                    {/* Godown Stock Quantity Editor */}
                    <td className="p-3 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editPriceForm.stockGodown}
                          onChange={e => setEditPriceForm({ ...editPriceForm, stockGodown: Number(e.target.value) })}
                          className="w-20 px-2 py-1 border border-violet-500 rounded text-center text-xs font-bold text-slate-900"
                        />
                      ) : (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleQuickStockAdjust(p.id, -50)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-purple-50 rounded"
                            title="Decrease Stock by 50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-mono text-xs">
                            {p.stockGodown} PCS
                          </span>
                          <button
                            onClick={() => handleQuickStockAdjust(p.id, 50)}
                            className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-purple-50 rounded"
                            title="Increase Stock by 50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Stock on Rent */}
                    <td className="p-3 text-center">
                      <span className="font-bold text-violet-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 font-mono text-xs">
                        {p.stockOnRent} PCS
                      </span>
                    </td>

                    {/* Daily Rate */}
                    <td className="p-3 text-right font-mono font-semibold text-slate-800">
                      ₹{p.rateDay.toFixed(2)}
                    </td>

                    {/* Monthly Rate Editor */}
                    <td className="p-3 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-xs text-slate-500">₹</span>
                          <input
                            type="number"
                            step="0.10"
                            value={editPriceForm.rateMonth}
                            onChange={e => setEditPriceForm({ ...editPriceForm, rateMonth: Number(e.target.value) })}
                            className="w-20 px-2 py-1 border border-violet-500 rounded text-right text-xs font-bold text-violet-700"
                          />
                        </div>
                      ) : (
                        <span className="font-black text-violet-700 font-mono text-xs">
                          ₹{p.rateMonth.toFixed(2)}
                        </span>
                      )}
                    </td>

                    {/* Revenue Generated */}
                    <td className="p-3 text-right font-mono font-bold text-emerald-700">
                      ₹{monthlyRevenue.toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-center">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleSaveProductEdit(p.id)}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm"
                            title="Save Changes"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingProductId(null)}
                            className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl font-bold text-[11px] flex items-center gap-1 mx-auto transition-colors"
                        >
                          <Edit3 className="w-3 h-3 text-violet-600" />
                          <span>Edit Rate/Stock</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
