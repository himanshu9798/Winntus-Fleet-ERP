import React, { useState } from 'react';
import { 
  Receipt, 
  Printer, 
  Plus, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  Calculator, 
  Building, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, INITIAL_CLIENTS, INITIAL_PRODUCTS } from '../data/mockData';

export default function InvoiceBillingEngine({ invoices, onSaveInvoice, onOpenPrint }) {
  const [activeBillNo, setActiveBillNo] = useState(invoices[0]?.billNo || 'WSSN1303');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New Invoice Form State
  const [billForm, setBillForm] = useState({
    billNo: `WSSN${Math.floor(1000 + Math.random() * 9000)}`,
    date: '02/10/2026',
    periodFrom: '26/Aug/2026',
    periodTo: '25/Sept/2026',
    selectedClientId: 'cli-01',
    items: [
      { description: "Ledger 1150Mm", quantity: 1622, period: "26/08 - 25/09", days: 31, numberProduct: 50282, rate: 0.480, amount: 24135.36 },
      { description: "Ledger 850Mm", quantity: 533, period: "26/08 - 25/09", days: 31, numberProduct: 16523, rate: 0.400, amount: 6609.20 },
      { 
        description: "Prop Set 2X3Mtr (With Off-Hire Partial Return)", 
        subDetails: "250 qty (29 days) + 23 remaining qty (2 days)",
        quantity: 250, 
        period: "26/08 - 25/09", 
        days: 31, 
        numberProduct: 7296, 
        rate: 2.000, 
        amount: 14592.00 
      },
      { description: "Standard 1.5Mtr", quantity: 164, period: "26/08 - 25/09", days: 31, numberProduct: 5084, rate: 0.600, amount: 3050.40 },
      { description: "Standard 1Mtr", quantity: 200, period: "26/08 - 25/09", days: 31, numberProduct: 6200, rate: 0.400, amount: 2480.00 },
      { description: "Standard 3Mtr", quantity: 490, period: "26/08 - 25/09", days: 31, numberProduct: 15190, rate: 1.200, amount: 18228.00 }
    ]
  });

  const selectedClient = INITIAL_CLIENTS.find(c => c.id === billForm.selectedClientId) || INITIAL_CLIENTS[0];
  const currentInvoice = invoices.find(inv => inv.billNo === activeBillNo) || invoices[0];

  // Live Math Calculations
  const calculateInvoiceTotals = (items) => {
    const taxableTotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const cgstAmount = Number((taxableTotal * 0.09).toFixed(2));
    const sgstAmount = Number((taxableTotal * 0.09).toFixed(2));
    const rawGrand = taxableTotal + cgstAmount + sgstAmount;
    const roundedGrand = Math.round(rawGrand);
    const roundOff = Number((roundedGrand - rawGrand).toFixed(2));

    return { taxableTotal, cgstAmount, sgstAmount, roundOff, grandTotal: roundedGrand };
  };

  const totals = calculateInvoiceTotals(billForm.items);

  const handleUpdateItem = (index, field, val) => {
    const updated = [...billForm.items];
    updated[index][field] = val;

    const qty = Number(updated[index].quantity) || 0;
    const days = Number(updated[index].days) || 0;
    const rate = Number(updated[index].rate) || 0;

    const numProd = qty * days;
    updated[index].numberProduct = numProd;
    updated[index].amount = Number((numProd * rate).toFixed(2));

    setBillForm(prev => ({ ...prev, items: updated }));
  };

  const handleAddBillItem = (prodId) => {
    const prod = INITIAL_PRODUCTS.find(p => p.id === prodId);
    if (!prod) return;

    const qty = 100;
    const days = 31;
    const rate = prod.rateDay;
    const numProd = qty * days;
    const amt = Number((numProd * rate).toFixed(2));

    setBillForm(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: prod.name,
          quantity: qty,
          period: "26/08 - 25/09",
          days: days,
          numberProduct: numProd,
          rate: rate,
          amount: amt
        }
      ]
    }));
  };

  const handleSaveInvoice = () => {
    const newInvoiceObj = {
      billNo: billForm.billNo,
      date: billForm.date,
      periodFrom: billForm.periodFrom,
      periodTo: billForm.periodTo,
      client: {
        name: selectedClient.companyName,
        address: selectedClient.address,
        site: selectedClient.siteLocation,
        gstin: selectedClient.gstin,
        pan: selectedClient.pan,
        stateCode: selectedClient.stateCode
      },
      items: billForm.items,
      taxableTotal: totals.taxableTotal,
      cgstPct: 9,
      cgstAmount: totals.cgstAmount,
      sgstPct: 9,
      sgstAmount: totals.sgstAmount,
      roundOff: totals.roundOff,
      grandTotal: totals.grandTotal,
      amountInWords: `Rupees ${numberToWords(totals.grandTotal)} only`,
      paymentStatus: "Pending"
    };

    onSaveInvoice(newInvoiceObj);
    setActiveBillNo(newInvoiceObj.billNo);
    setIsCreatingNew(false);
  };

  // Convert numbers to words helper
  function numberToWords(num) {
    if (!num) return "Zero";
    // Simple readable presentation
    return `${num.toLocaleString('en-IN')}`;
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full min-w-0">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#2874f0]" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">Daily Hire Billing & Tax Invoices (GST)</h2>
            <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded border border-emerald-200 font-bold">
              {invoices.length} Bills
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Automated calculations based on Item Quantity × Active Days On Site × Daily Hire Rate + Split Return deductions (PDF 3).
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
                <span>Create Monthly Bill</span>
              </button>

              <button
                onClick={() => onOpenPrint('invoice', currentInvoice)}
                className="flex items-center gap-1.5 bg-[#fb641b] hover:bg-[#f45300] text-white text-xs font-bold px-3 py-2 rounded shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print GST Invoice</span>
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

      {isCreatingNew ? (
        /* CREATE / GENERATE INVOICE FORM */
        <div className="bg-white border border-slate-200 rounded-sm p-4 sm:p-5 space-y-4 sm:space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-[#2874f0] flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Generate Hire Charges Tax Invoice
            </h3>
            <span className="text-xs text-slate-500 font-mono">Bill No: {billForm.billNo}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Select Contractor / Client</label>
              <select
                value={billForm.selectedClientId}
                onChange={(e) => setBillForm({ ...billForm, selectedClientId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-[#2874f0]"
              >
                {INITIAL_CLIENTS.map(c => (
                  <option key={c.id} value={c.id}>{c.companyName} ({c.gstin})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Billing Date</label>
              <input
                type="text"
                value={billForm.date}
                onChange={(e) => setBillForm({ ...billForm, date: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Billing Period From</label>
              <input
                type="text"
                value={billForm.periodFrom}
                onChange={(e) => setBillForm({ ...billForm, periodFrom: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Billing Period To</label>
              <input
                type="text"
                value={billForm.periodTo}
                onChange={(e) => setBillForm({ ...billForm, periodTo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* Client summary badge */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs flex flex-wrap justify-between gap-2">
            <div>
              <span className="text-slate-400">Billed To: </span>
              <strong className="text-white">{selectedClient.companyName}</strong>
              <span className="text-slate-500 ml-2 font-mono">GST: {selectedClient.gstin} | PAN: {selectedClient.pan}</span>
            </div>
            <div className="text-amber-400">
              <span>Site: {selectedClient.siteLocation}</span>
            </div>
          </div>

          {/* Item Entries with Days * Qty calculation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Equipment On Hire (Quantity × Days Calculation)
              </span>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddBillItem(e.target.value);
                    e.target.value = "";
                  }
                }}
                className="bg-slate-800 text-amber-400 text-xs rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none"
              >
                <option value="">+ Add Item to Monthly Bill...</option>
                {INITIAL_PRODUCTS.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (₹{p.rateDay}/day)</option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-800/80 text-slate-300 uppercase">
                  <tr>
                    <th className="p-2.5">Description for Hire Charges</th>
                    <th className="p-2.5 text-right">Quantity</th>
                    <th className="p-2.5 text-center">Period</th>
                    <th className="p-2.5 text-right">Days</th>
                    <th className="p-2.5 text-right">Number (Qty × Days)</th>
                    <th className="p-2.5 text-right">Rate/Day (₹)</th>
                    <th className="p-2.5 text-right">Amount (₹)</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {billForm.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-2.5 text-white font-medium">
                        {item.description}
                        {item.subDetails && <div className="text-[10px] text-amber-400 mt-0.5">{item.subDetails}</div>}
                      </td>
                      <td className="p-2.5 text-right">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(idx, 'quantity', Number(e.target.value))}
                          className="w-16 bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-right text-slate-200"
                        />
                      </td>
                      <td className="p-2.5 text-center text-slate-400">{item.period}</td>
                      <td className="p-2.5 text-right">
                        <input
                          type="number"
                          value={item.days}
                          onChange={(e) => handleUpdateItem(idx, 'days', Number(e.target.value))}
                          className="w-12 bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-right text-slate-200"
                        />
                      </td>
                      <td className="p-2.5 text-right font-mono font-bold text-sky-400">
                        {item.numberProduct?.toLocaleString()}
                      </td>
                      <td className="p-2.5 text-right">
                        <input
                          type="number"
                          step="0.001"
                          value={item.rate}
                          onChange={(e) => handleUpdateItem(idx, 'rate', Number(e.target.value))}
                          className="w-16 bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-right text-slate-200"
                        />
                      </td>
                      <td className="p-2.5 text-right text-emerald-400 font-bold font-mono">
                        ₹{item.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => setBillForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }))}
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

          {/* GST Calculation Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-400">Hire Taxable Total:</span>
              <p className="text-base font-bold text-white mt-1">₹{totals.taxableTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-400">CGST (9%) + SGST (9%):</span>
              <p className="text-base font-bold text-sky-400 mt-1">
                ₹{(totals.cgstAmount + totals.sgstAmount)?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-400">Round Off:</span>
              <p className="text-base font-bold text-slate-300 mt-1">{totals.roundOff >= 0 ? `+${totals.roundOff}` : totals.roundOff}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 rounded-lg">
              <span className="text-amber-300 font-semibold">Grand Total (With GST):</span>
              <p className="text-lg font-black text-amber-400 mt-1">
                ₹{totals.grandTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => setIsCreatingNew(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveInvoice}
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-lg text-xs shadow-lg"
            >
              Generate & Save Tax Invoice
            </button>
          </div>
        </div>
      ) : (
        /* INVOICE PREVIEW - EXACT MATCH TO PDF DOCUMENT 3 */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-full min-w-0">
          {/* Invoice List */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Generated Invoices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {invoices.map(inv => (
                <div
                  key={inv.billNo}
                  onClick={() => setActiveBillNo(inv.billNo)}
                  className={`p-3 rounded-sm border cursor-pointer transition-all ${
                    activeBillNo === inv.billNo 
                      ? 'bg-blue-50 border-[#2874f0] shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{inv.billNo}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      inv.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {inv.paymentStatus}
                    </span>
                  </div>
                  <p className="text-xs text-[#2874f0] font-bold mt-1 truncate">{inv.client.name}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1.5 border-t border-slate-100">
                    <span>{inv.periodFrom}</span>
                    <span className="font-bold text-slate-900 font-mono">₹{inv.grandTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exact Tax Invoice Document */}
          <div className="lg:col-span-3 bg-white text-slate-900 rounded-xl p-6 sm:p-8 shadow-2xl border border-slate-300 font-sans">
            {/* Header Box */}
            <div className="border border-slate-800 text-xs">
              <div className="p-3 text-center border-b border-slate-800 relative">
                <div className="absolute right-3 top-3 text-[10px] text-slate-600 font-mono">Page 1 of 1</div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">TAX INVOICE</h2>
                <h1 className="text-base font-black text-slate-950 uppercase mt-0.5">
                  WINNTUS SCAFFOLDING AND SHUTTERING
                </h1>
                <p className="text-[11px] text-slate-700">
                  GAT NO. 2, TRIMBAKESHWAR ROAD, KHAMBALE, NASHIK, MAHARASHTRA-422213
                </p>
                <p className="text-[11px] font-bold text-slate-900">
                  GSTIN NO. 27AAEFW3842N1ZN
                </p>
                <p className="text-[10px] text-slate-600">
                  BANK DETAIL - A/C NO. 039905010289 | IFSC: ICIC0000399 | SEC - 54, VIPUL ORCHID PLAZA, SUNCITY, GURGAON - 122003, HARYANA
                </p>
                <p className="text-[10px] text-slate-600">
                  Email: Nashik@winntus.com | Ph. No. 8956704931, 8956704913
                </p>
              </div>

              {/* Billed To & Bill Details */}
              <div className="grid grid-cols-2 border-b border-slate-800 text-xs">
                <div className="p-3 border-r border-slate-800 space-y-1">
                  <p className="font-bold text-slate-950">{currentInvoice.client.name}</p>
                  <p className="text-slate-600 text-[11px]">{currentInvoice.client.address}</p>
                  <p><strong>State Code:</strong> {currentInvoice.client.stateCode}</p>
                  <p><strong>GSTIN No:</strong> <span className="font-mono font-bold">{currentInvoice.client.gstin}</span></p>
                  <p><strong>PAN No:</strong> <span className="font-mono">{currentInvoice.client.pan}</span></p>
                </div>
                <div className="p-3 space-y-1.5 bg-slate-50/50">
                  <div className="grid grid-cols-2">
                    <p><strong>Bill No.</strong> {currentInvoice.billNo}</p>
                    <p><strong>Date:</strong> {currentInvoice.date}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p><strong>From:</strong> {currentInvoice.periodFrom}</p>
                    <p><strong>To:</strong> {currentInvoice.periodTo}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-300 text-[11px]">
                    <p className="text-slate-500">Site Location / Dispatch Address:</p>
                    <p className="font-medium text-slate-800">{currentInvoice.client.site}</p>
                  </div>
                </div>
              </div>

              {/* Table of Hire Charges */}
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 border-b border-slate-800 font-bold">
                  <tr>
                    <th className="p-2 border-r border-slate-800">Description for Hire Charges</th>
                    <th className="p-2 border-r border-slate-800 text-center">Period</th>
                    <th className="p-2 border-r border-slate-800 text-right">Days</th>
                    <th className="p-2 border-r border-slate-800 text-right">Number</th>
                    <th className="p-2 border-r border-slate-800 text-right">Rate</th>
                    <th className="p-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {currentInvoice.items.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/70' : 'bg-white'}>
                      <td className="p-2 border-r border-slate-800">
                        <div className="font-medium text-slate-900">{item.description}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Qty: {item.quantity} pcs</div>
                        {item.subDetails && <div className="text-[10px] text-blue-800">{item.subDetails}</div>}
                      </td>
                      <td className="p-2 border-r border-slate-800 text-center text-slate-600">{item.period}</td>
                      <td className="p-2 border-r border-slate-800 text-right">{item.days}</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono font-semibold">{item.numberProduct?.toLocaleString()}</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">{item.rate?.toFixed(3)}</td>
                      <td className="p-2 text-right font-mono font-bold">{item.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Bottom Tax Calculation Block */}
              <div className="border-t border-slate-800 grid grid-cols-12 text-xs">
                <div className="col-span-7 p-3 border-r border-slate-800 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-slate-800">Amount Chargeable (in words):</p>
                    <p className="text-slate-700 italic font-medium mt-1">{currentInvoice.amountInWords}</p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-300 text-[10px] text-slate-500">
                    <p>• Interest @ 24% p.a. will be charged if payment is not made within due date.</p>
                    <p>• Subject to Nashik Jurisdiction only.</p>
                  </div>
                </div>

                <div className="col-span-5 divide-y divide-slate-300">
                  <div className="flex justify-between p-1.5 font-bold">
                    <span>Total Taxable:</span>
                    <span className="font-mono">₹{currentInvoice.taxableTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between p-1.5 text-slate-700">
                    <span>CGST 9% (9%):</span>
                    <span className="font-mono">₹{currentInvoice.cgstAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between p-1.5 text-slate-700">
                    <span>SGST 9% (9%):</span>
                    <span className="font-mono">₹{currentInvoice.sgstAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between p-1.5 text-slate-600 text-[11px]">
                    <span>Round Off:</span>
                    <span className="font-mono">{currentInvoice.roundOff?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2 font-black text-sm bg-slate-100 text-slate-950">
                    <span>Grand Total:</span>
                    <span className="font-mono text-blue-900">₹{currentInvoice.grandTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Signatory Footer */}
              <div className="border-t border-slate-800 p-3 flex justify-between items-end bg-slate-50">
                <div className="text-[10px] text-slate-500">
                  <p>Computer Generated Tax Invoice</p>
                  <p>E.& O.E.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs uppercase text-slate-900">For WINNTUS SCAFFOLDING AND SHUTTERING</p>
                  <div className="h-10"></div>
                  <p className="text-[11px] font-semibold text-slate-700">Authorised Signatory</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3 no-print">
              <button
                onClick={() => onOpenPrint('invoice', currentInvoice)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 shadow"
              >
                <Printer className="w-4 h-4 text-sky-400" />
                Print GST Tax Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
