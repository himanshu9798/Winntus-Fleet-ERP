import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Calculator, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  FileDown
} from 'lucide-react';
import { COMPANY_INFO, INITIAL_PRODUCTS } from '../data/mockData';

export default function QuotationGenerator({ quotations, onSaveQuotation, onOpenPrint }) {
  const [activeQuoteId, setActiveQuoteId] = useState(quotations[0]?.id || 'WIN/NSK/SEP/40');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New Quote Form State
  const [formData, setFormData] = useState({
    quotationNo: `WIN/NSK/OCT/${Math.floor(100 + Math.random() * 900)}`,
    date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
    preparedBy: "SANDHYA",
    leadPerson: "MANGESH VALSHETE - 8956704924",
    companyName: "SHREERAM CONSTRUCTION",
    contactPerson: "MR. ANUP ROY",
    mobileNum: "9823456789",
    siteLocation: "NASHIK ROAD",
    duration: "3 MONTH",
    gstNo: "27AFEFS6800H1ZY",
    items: [
      { name: "Standrad 0.5 Mtr", rateDay: 0.35, rateMonth: 10.50, quantity: 50, orderWeightKg: 110.00, rentMonth: 525 },
      { name: "Ledger 1150mm", rateDay: 0.48, rateMonth: 14.40, quantity: 250, orderWeightKg: 1000.00, rentMonth: 3600 },
      { name: "Ledger 950mm", rateDay: 0.40, rateMonth: 12.00, quantity: 300, orderWeightKg: 1050.00, rentMonth: 3600 },
      { name: "Ledger 550mm", rateDay: 0.35, rateMonth: 10.50, quantity: 250, orderWeightKg: 550.00, rentMonth: 2625 },
      { name: "Movable Clmap", rateDay: 0.33, rateMonth: 9.90, quantity: 200, orderWeightKg: 160.00, rentMonth: 1980 },
      { name: "MS Pipe 6 MTR", rateDay: 3.00, rateMonth: 90.00, quantity: 60, orderWeightKg: 1200.00, rentMonth: 5400 }
    ]
  });

  const currentSelectedQuote = quotations.find(q => q.id === activeQuoteId) || quotations[0];

  // Helper calculation for dynamic items
  const calculateTotals = (items) => {
    const totalQty = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    const totalWeightKg = items.reduce((sum, item) => sum + (Number(item.orderWeightKg) || 0), 0);
    const totalWeightMT = (totalWeightKg / 1000).toFixed(3);
    const subtotalRent = items.reduce((sum, item) => sum + (Number(item.rentMonth) || 0), 0);
    const monthlyWithGST = Math.round(subtotalRent * 1.18);
    const depositAdvance = Math.round(monthlyWithGST * 3); // 3 Month Rent as Mobilisation Advance
    const securityCheque = Math.round(totalWeightKg * 80); // Replacement value approx

    return { totalQty, totalWeightKg, totalWeightMT, subtotalRent, monthlyWithGST, depositAdvance, securityCheque };
  };

  const formTotals = calculateTotals(formData.items);

  const handleAddItem = (productId) => {
    const prod = INITIAL_PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const defaultQty = 100;
    const weight = Number((prod.unitWeightKg * defaultQty).toFixed(2));
    const rent = Math.round(prod.rateMonth * defaultQty);

    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          name: prod.name,
          rateDay: prod.rateDay,
          rateMonth: prod.rateMonth,
          quantity: defaultQty,
          orderWeightKg: weight,
          rentMonth: rent
        }
      ]
    }));
  };

  const handleUpdateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === 'quantity') {
      const qty = Number(value) || 0;
      const rateMonth = Number(newItems[index].rateMonth) || 0;
      // find product to get unit weight
      const prod = INITIAL_PRODUCTS.find(p => p.name === newItems[index].name);
      const unitWeight = prod ? prod.unitWeightKg : (newItems[index].orderWeightKg / (newItems[index].quantity || 1)) || 2.5;
      
      newItems[index].rentMonth = Math.round(qty * rateMonth);
      newItems[index].orderWeightKg = Number((qty * unitWeight).toFixed(2));
    }

    if (field === 'rateMonth') {
      const rate = Number(value) || 0;
      const qty = Number(newItems[index].quantity) || 0;
      newItems[index].rentMonth = Math.round(qty * rate);
      newItems[index].rateDay = Number((rate / 30).toFixed(2));
    }

    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleRemoveItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    const newQuotationObj = {
      id: formData.quotationNo,
      date: formData.date,
      preparedBy: formData.preparedBy,
      leadPerson: formData.leadPerson,
      branchHead: COMPANY_INFO.branchHead,
      client: {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        mobile: formData.mobileNum,
        siteLocation: formData.siteLocation,
        duration: formData.duration,
        gstin: formData.gstNo
      },
      items: formData.items,
      totalQuantity: formTotals.totalQty,
      totalWeightKg: formTotals.totalWeightKg,
      totalWeightMT: formTotals.totalWeightMT,
      subtotalMonthlyRent: formTotals.subtotalRent,
      monthlyRentWithGST: formTotals.monthlyWithGST,
      depositMobilisationAdvance: formTotals.depositAdvance,
      securityChequeValue: formTotals.securityCheque,
      status: "Approved"
    };

    onSaveQuotation(newQuotationObj);
    setActiveQuoteId(newQuotationObj.id);
    setIsCreatingNew(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full min-w-0">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2874f0]" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">Scaffolding Rental Quotations</h2>
            <span className="bg-blue-50 text-[#2874f0] text-xs px-2 py-0.5 rounded border border-blue-200 font-bold">
              {quotations.length} Quotes
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Generate formal ISO-standard rental offers with 3-month mobilisation deposits & security cheques (PDF 1).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isCreatingNew ? (
            <>
              <button
                onClick={() => setIsCreatingNew(true)}
                className="flex items-center gap-1.5 bg-[#2874f0] hover:bg-[#1754be] text-white text-xs font-bold px-3 py-2 rounded shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create Quotation</span>
              </button>

              <button
                onClick={() => onOpenPrint('quotation', currentSelectedQuote)}
                className="flex items-center gap-1.5 bg-[#fb641b] hover:bg-[#f45300] text-white text-xs font-bold px-3 py-2 rounded shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download PDF</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsCreatingNew(false)}
              className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-2 rounded border border-slate-300 font-bold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      {isCreatingNew ? (
        /* CREATE / EDIT FORM */
        <div className="bg-white border border-slate-200 rounded-sm p-4 sm:p-5 space-y-4 sm:space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-[#2874f0] flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              New Rental Quotation Generator
            </h3>
            <span className="text-xs text-slate-500 font-mono">Ref: {formData.quotationNo}</span>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Company / Contractor Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:border-[#2874f0] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Contact Person Name</label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Mobile Number</label>
              <input
                type="text"
                value={formData.mobileNum}
                onChange={e => setFormData({ ...formData, mobileNum: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Site Location</label>
              <input
                type="text"
                value={formData.siteLocation}
                onChange={e => setFormData({ ...formData, siteLocation: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Client GSTIN</label>
              <input
                type="text"
                value={formData.gstNo}
                onChange={e => setFormData({ ...formData, gstNo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Lead Executive</label>
              <input
                type="text"
                value={formData.leadPerson}
                onChange={e => setFormData({ ...formData, leadPerson: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Quotation Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Item Selector & Table */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-200">Selected Scaffolding & Shuttering Items</span>
              <div className="flex items-center gap-2">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddItem(e.target.value);
                      e.target.value = "";
                    }
                  }}
                  className="bg-slate-800 text-sky-400 text-xs rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none"
                >
                  <option value="">+ Add Product from Master Catalog...</option>
                  {INITIAL_PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (₹{p.rateMonth}/mo, ₹{p.rateDay}/day)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-800/80 text-slate-300 font-semibold uppercase">
                  <tr>
                    <th className="p-2.5">Item Name</th>
                    <th className="p-2.5 text-right">Rate/Day (₹)</th>
                    <th className="p-2.5 text-right">Rate/Month (₹)</th>
                    <th className="p-2.5 text-right">Quantity</th>
                    <th className="p-2.5 text-right">Order Weight (Kg)</th>
                    <th className="p-2.5 text-right">Rent/Month (₹)</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {formData.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-2.5 font-medium text-white">{item.name}</td>
                      <td className="p-2.5 text-right">
                        <input
                          type="number"
                          step="0.01"
                          value={item.rateDay}
                          onChange={(e) => handleUpdateItem(idx, 'rateDay', Number(e.target.value))}
                          className="w-16 bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-right text-slate-200"
                        />
                      </td>
                      <td className="p-2.5 text-right">
                        <input
                          type="number"
                          step="0.01"
                          value={item.rateMonth}
                          onChange={(e) => handleUpdateItem(idx, 'rateMonth', Number(e.target.value))}
                          className="w-20 bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-right text-slate-200"
                        />
                      </td>
                      <td className="p-2.5 text-right">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(idx, 'quantity', Number(e.target.value))}
                          className="w-20 bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-right text-sky-400 font-bold"
                        />
                      </td>
                      <td className="p-2.5 text-right text-slate-300 font-mono">
                        {item.orderWeightKg?.toLocaleString()} kg
                      </td>
                      <td className="p-2.5 text-right text-emerald-400 font-bold font-mono">
                        ₹{item.rentMonth?.toLocaleString()}
                      </td>
                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals & Advance Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-400">Total Order Weight:</span>
              <p className="text-base font-bold text-white mt-1">
                {formTotals.totalWeightMT} <span className="text-xs font-normal text-slate-400">Metric Ton ({formTotals.totalWeightKg} Kg)</span>
              </p>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-400">Monthly Rent (with 18% GST):</span>
              <p className="text-base font-bold text-sky-400 mt-1">
                ₹{formTotals.monthlyRentWithGST?.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-amber-500/30">
              <span className="text-amber-400 font-semibold">3-Month Mobilisation Deposit:</span>
              <p className="text-base font-bold text-amber-300 mt-1">
                ₹{formTotals.depositAdvance?.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-400">5 Security Cheques Value:</span>
              <p className="text-base font-bold text-purple-400 mt-1">
                ₹{formTotals.securityCheque?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => setIsCreatingNew(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold rounded-lg text-xs shadow-lg"
            >
              Save & Finalize Quotation
            </button>
          </div>
        </div>
      ) : (
        /* QUOTATION PREVIEW - EXACT MATCH TO PDF DOCUMENT 1 */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-full min-w-0">
          {/* Quote Selector Sidebar */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">All Saved Quotations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {quotations.map(q => (
                <div
                  key={q.id}
                  onClick={() => setActiveQuoteId(q.id)}
                  className={`p-3 rounded-sm border cursor-pointer transition-all ${
                    activeQuoteId === q.id 
                      ? 'bg-blue-50 border-[#2874f0] shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{q.id}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                      {q.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#2874f0] font-bold mt-1 truncate">{q.client.companyName}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1.5 border-t border-slate-100">
                    <span>{q.date}</span>
                    <span className="font-bold text-slate-800 font-mono">₹{q.monthlyRentWithGST?.toLocaleString()}/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quotation Document View (Exact PDF Layout) */}
          <div className="lg:col-span-3 bg-white text-slate-900 rounded-xl p-6 sm:p-8 shadow-2xl border border-slate-300 font-sans">
            {/* Header */}
            <div className="border-2 border-slate-800">
              {/* Brand Banner */}
              <div className="bg-[#1e3a8a] text-white p-3 text-center border-b-2 border-slate-800">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-black tracking-widest font-display text-white">WINNTUS</span>
                </div>
                <h1 className="text-sm sm:text-base font-extrabold uppercase tracking-wide">
                  WINNTUS SCAFFOLDING & SHUTTERING NASHIK
                </h1>
                <p className="text-[11px] text-slate-200">
                  ADD: GAT NO,2. TRIMBAKESHWAR ROAD, KHAMBALE, NASHIK, MAHARASHTRA-422213
                </p>
                <p className="text-[11px] font-bold text-amber-300">
                  GST NO- 27AAEFW3842N1ZN | BRANCH HEAD:- ANIL DASH - 8956704931
                </p>
                <p className="text-[10px] text-slate-200">
                  EMAIL ID: 1) anil.kumardash@winntus.com 2) marketing.nashik@winntus.com
                </p>
              </div>

              {/* Title Bar */}
              <div className="bg-sky-100 text-slate-900 font-black text-center py-1 border-b-2 border-slate-800 text-sm tracking-wider uppercase">
                RENTAL QUOTATION
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 text-xs border-b-2 border-slate-800">
                <div className="p-2 border-r-2 border-slate-800 space-y-1">
                  <p><strong>DATE :</strong> {currentSelectedQuote.date}</p>
                  <p><strong>PREPARED BY :</strong> {currentSelectedQuote.preparedBy}</p>
                  <p><strong>COMPANY NAME :</strong> <span className="font-bold text-blue-900">{currentSelectedQuote.client.companyName}</span></p>
                  <p><strong>CONTACT PERSON :</strong> {currentSelectedQuote.client.contactPerson}</p>
                  <p><strong>MOBILE NUM :</strong> {currentSelectedQuote.client.mobile}</p>
                  <p><strong>SITE LOCATION :</strong> {currentSelectedQuote.client.siteLocation}</p>
                  <p><strong>DURATION :</strong> {currentSelectedQuote.client.duration}</p>
                  <p><strong>GST NO :</strong> {currentSelectedQuote.client.gstin}</p>
                </div>
                <div className="p-2 space-y-1">
                  <p><strong>QUOTATION NO :</strong> <span className="font-bold">{currentSelectedQuote.id}</span></p>
                  <p><strong>LEAD PERSON :</strong> {currentSelectedQuote.leadPerson}</p>
                  <p><strong>SECURITY REQUIRED :</strong> 5 Cheques + 3 Mo Advance</p>
                  <p><strong>STATUS :</strong> <span className="text-emerald-700 font-bold">{currentSelectedQuote.status}</span></p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-200 border-b-2 border-slate-800 font-bold">
                  <tr>
                    <th className="p-1.5 border-r border-slate-800">ITEM NAME</th>
                    <th className="p-1.5 border-r border-slate-800 text-right">Rate/Pc/Day</th>
                    <th className="p-1.5 border-r border-slate-800 text-right">MONTHLY RENT/PC</th>
                    <th className="p-1.5 border-r border-slate-800 text-right">QUANTITY</th>
                    <th className="p-1.5 border-r border-slate-800 text-right">ORDER WEIGHT (KG)</th>
                    <th className="p-1.5 text-right">RENT/MONTH (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {currentSelectedQuote.items.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="p-1.5 border-r border-slate-800 font-medium">{item.name}</td>
                      <td className="p-1.5 border-r border-slate-800 text-right">{item.rateDay?.toFixed(2)}</td>
                      <td className="p-1.5 border-r border-slate-800 text-right">{item.rateMonth?.toFixed(2)}</td>
                      <td className="p-1.5 border-r border-slate-800 text-right font-bold">{item.quantity}</td>
                      <td className="p-1.5 border-r border-slate-800 text-right">{item.orderWeightKg?.toFixed(2)}</td>
                      <td className="p-1.5 text-right font-bold">{item.rentMonth?.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-200 font-black border-t-2 border-slate-800">
                    <td colSpan={3} className="p-1.5 border-r border-slate-800 text-right">TOTAL</td>
                    <td className="p-1.5 border-r border-slate-800 text-right">{currentSelectedQuote.totalQuantity}</td>
                    <td className="p-1.5 border-r border-slate-800 text-right">{currentSelectedQuote.totalWeightKg?.toLocaleString()} KG</td>
                    <td className="p-1.5 text-right">₹{currentSelectedQuote.subtotalMonthlyRent?.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              {/* Financial Calculation Box */}
              <div className="grid grid-cols-2 text-xs border-t-2 border-b-2 border-slate-800 bg-sky-50">
                <div className="p-2 border-r-2 border-slate-800 font-bold space-y-1">
                  <p>TOTAL WEIGHT (METRIC TON):</p>
                  <p>MONTHLY RENT (WITH 18% GST):</p>
                  <p className="text-amber-900">DEPOSIT AMT. 3 MONTH RENT AS MOBILISATION ADVANCE:</p>
                  <p>SECURITY CHEQUE VALUE:</p>
                </div>
                <div className="p-2 font-black space-y-1 text-right">
                  <p>{currentSelectedQuote.totalWeightMT} MT</p>
                  <p className="text-blue-800">₹{currentSelectedQuote.monthlyRentWithGST?.toLocaleString()}</p>
                  <p className="text-amber-700">₹{currentSelectedQuote.depositMobilisationAdvance?.toLocaleString()}</p>
                  <p>₹{currentSelectedQuote.securityChequeValue?.toLocaleString()}</p>
                </div>
              </div>

              {/* Terms and Conditions (Verbatim from PDF 1) */}
              <div className="p-3 text-[11px] space-y-1 bg-white">
                <h4 className="font-bold text-xs text-red-800 uppercase tracking-wide">TERMS AND CONDITIONS:</h4>
                <ol className="list-decimal pl-4 space-y-0.5 text-slate-700">
                  <li>The rental will be charged from the date of dispatch & till the day material is reached to our Godown.</li>
                  <li>Transportation for the entire transit appears into your account (Both sides).</li>
                  <li>Deposit of 3 months is refundable only at the time of closure of the agreement & will not be concilitate in monthly rents.</li>
                  <li>FIVE Without Date Security Cheque's of value Rs. <strong>{currentSelectedQuote.securityChequeValue?.toLocaleString()}/-</strong> which will be returned after amicable closure of the agreement.</li>
                  <li>Dispatch shall only be initiated once deposit amount has credited in our account.</li>
                  <li>Continuous Monthly bill to be paid by 10th of every month without any failure.</li>
                  <li>The Loss charges for our scaffolding & shuttering material will charged at Rs. 65/kg + 18% gst.</li>
                  <li>All other according to the rent agreement.</li>
                  <li>
                    <strong>KYC Documents Required:</strong>
                    <span className="block pl-2 text-slate-600">
                      i) Company GST Registration (3 pages) | ii) Company Pan Card | iii) Site address proof (Work order copy) | iv) Aadhar Card of Authorized signatory.
                    </span>
                  </li>
                </ol>
              </div>

              {/* Footer Stamp & Sign */}
              <div className="border-t-2 border-slate-800 p-3 flex items-center justify-between text-xs bg-slate-50">
                <div>
                  <p className="font-bold">FOR MORE INFO: www.winntus.com</p>
                  <p className="text-[10px] text-slate-500">Auto-generated with WINNTUS ScaffFlow ERP</p>
                </div>
                <div className="text-right">
                  <p className="font-bold uppercase text-slate-800">WINNTUS SCAFFOLDING AND SHUTTERING</p>
                  <div className="h-10 flex items-center justify-end">
                    <span className="text-[10px] text-slate-400 italic">[Authorized Digital Signatory]</span>
                  </div>
                  <p className="font-semibold text-slate-700">THANK YOU !</p>
                </div>
              </div>
            </div>

            {/* Quick Actions below document */}
            <div className="mt-4 flex justify-end gap-3 no-print">
              <button
                onClick={() => onOpenPrint('quotation', currentSelectedQuote)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 shadow"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                Print Exact PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
