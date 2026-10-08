import React, { useState } from 'react';
import { 
  Building2, 
  Receipt, 
  Truck, 
  FileText, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Clock,
  Sparkles,
  HardHat,
  ChevronRight,
  Plus
} from 'lucide-react';
import { COMPANY_INFO, INITIAL_CLIENTS, INITIAL_INVOICES, INITIAL_DISPATCHES, INITIAL_QUOTATIONS } from '../data/mockData';

export default function ClientPortal({ onOpenPrint }) {
  const client = INITIAL_CLIENTS[0]; // Shreeram Constructions
  const [returnSuccessMsg, setReturnSuccessMsg] = useState(false);
  const [reqDispatchSuccessMsg, setReqDispatchSuccessMsg] = useState(false);

  // Active items on site
  const siteItems = [
    { name: "Ledger 1150Mm Horizontal", qty: 1622, rateDay: 0.48, daysActive: 31, accruedRent: 24135.36, img: "/images/ledger.jpg" },
    { name: "Ledger 850Mm Horizontal", qty: 533, rateDay: 0.40, daysActive: 31, accruedRent: 6609.20, img: "/images/ledger.jpg" },
    { name: "CT Prop Jack Set 2x3Mtr", qty: 250, rateDay: 2.00, daysActive: 29, accruedRent: 14592.00, img: "/images/shuttering.jpg" },
    { name: "Cuplock Standard 1.5Mtr", qty: 164, rateDay: 0.60, daysActive: 31, accruedRent: 3050.40, img: "/images/cuplock.jpg" },
    { name: "Cuplock Standard 1.0Mtr", qty: 200, rateDay: 0.40, daysActive: 31, accruedRent: 2480.00, img: "/images/cuplock.jpg" },
    { name: "Cuplock Standard 3.0Mtr", qty: 490, rateDay: 1.20, daysActive: 31, accruedRent: 18228.00, img: "/images/cuplock.jpg" },
  ];

  const totalAccrued = siteItems.reduce((acc, i) => acc + i.accruedRent, 0);

  const handleRequestReturn = () => {
    setReturnSuccessMsg(true);
    setTimeout(() => setReturnSuccessMsg(false), 5000);
  };

  const handleRequestDispatch = () => {
    setReqDispatchSuccessMsg(true);
    setTimeout(() => setReqDispatchSuccessMsg(false), 5000);
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full min-w-0">
      {/* Contractor Account Banner */}
      <div className="bg-white rounded-sm border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-[#ff9900] text-slate-950 rounded">
              CONTRACTOR SITE ACCOUNT
            </span>
            <span className="text-xs text-slate-500 font-mono">
              GSTIN: <strong>{client.gstin}</strong> | PAN: <strong>{client.pan}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-display">
            {client.companyName}
          </h1>
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            <HardHat className="w-4 h-4 text-amber-500" />
            Active Deployment Site: <strong className="text-slate-900">{client.siteLocation}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRequestReturn}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded text-xs font-bold shadow-sm transition-all"
          >
            <ArrowDownLeft className="w-4 h-4 text-amber-600" />
            <span>Schedule Off-Hire Pickup</span>
          </button>

          <button
            onClick={handleRequestDispatch}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#fb641b] hover:bg-[#f45300] text-white rounded text-xs font-bold shadow-sm transition-all"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Request More Material</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {returnSuccessMsg && (
        <div className="p-3.5 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900 flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Off-hire pickup request submitted! Winntus Yard Logistics has dispatched inspection vehicle <strong>MH15JW1118</strong>.</span>
        </div>
      )}

      {reqDispatchSuccessMsg && (
        <div className="p-3.5 bg-blue-50 border border-blue-300 rounded text-xs text-blue-900 flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-[#2874f0] shrink-0" />
          <span>Material requisition received! Delivery challan is being prepared for immediate site dispatch.</span>
        </div>
      )}

      {/* Financial & Security Badges (Light Clean Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Current Month Hire Meter</span>
          <p className="text-2xl font-black text-[#2874f0] mt-1 font-sans">
            ₹{Math.round(totalAccrued * 1.18).toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">Live bill accrual (incl. 18% GST)</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
          <span className="text-xs text-slate-500 font-medium">3-Mo Mobilisation Advance</span>
          <p className="text-2xl font-black text-emerald-700 mt-1 font-mono">
            ₹{client.depositHeld?.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">Refundable at project closure</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
          <span className="text-xs text-slate-500 font-medium">5 Security Cheques</span>
          <p className="text-2xl font-black text-purple-700 mt-1 font-mono">
            {client.securityChequesReceived} / 5 Deposited
          </p>
          <span className="text-[11px] text-slate-400">Clause 4 Vault Secured</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Equipment on Site</span>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">
            {client.totalWeightMT} <span className="text-xs font-normal text-slate-500">MT</span>
          </p>
          <span className="text-[11px] text-slate-500">{client.itemsOnSiteCount} components deployed</span>
        </div>
      </div>

      {/* Active Equipment on Site Table with Images */}
      <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Active Scaffolding & Shuttering Equipment on Site
            </h3>
            <p className="text-xs text-slate-500">
              Billing clock active until components reach Winntus Godown
            </p>
          </div>
          <span className="text-xs bg-blue-50 text-[#2874f0] font-bold px-2.5 py-1 rounded">
            {siteItems.length} Product Categories
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Component Description</th>
                <th className="p-2.5 text-right">Quantity on Site</th>
                <th className="p-2.5 text-right">Hire Rate (₹/day)</th>
                <th className="p-2.5 text-right">Days on Site</th>
                <th className="p-2.5 text-right">Accrued Hire Total (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {siteItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5">
                    <div className="flex items-center gap-2.5">
                      <img src={item.img} alt={item.name} className="w-8 h-8 object-contain rounded border border-slate-200 bg-white" />
                      <span className="font-bold text-slate-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-2.5 text-right font-mono font-bold text-[#2874f0]">{item.qty} pcs</td>
                  <td className="p-2.5 text-right font-mono text-slate-700">₹{item.rateDay?.toFixed(2)}</td>
                  <td className="p-2.5 text-right font-mono text-amber-700 font-bold">{item.daysActive} days</td>
                  <td className="p-2.5 text-right font-mono font-bold text-emerald-700">
                    ₹{item.accruedRent?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Available Documents for Download & Review */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Document 1: Quotation */}
        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2874f0]" />
            <h4 className="text-xs font-bold text-slate-900 uppercase">Approved Quotation (PDF 1)</h4>
          </div>
          <p className="text-xs text-slate-500">
            Ref: {INITIAL_QUOTATIONS[0].id} (3 Months Duration)
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs font-mono font-bold text-slate-900">
              ₹{INITIAL_QUOTATIONS[0].monthlyRentWithGST?.toLocaleString()}/mo
            </span>
            <button
              onClick={() => onOpenPrint('quotation', INITIAL_QUOTATIONS[0])}
              className="flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 text-[#2874f0] font-bold px-3 py-1.5 rounded border border-slate-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>View & Print</span>
            </button>
          </div>
        </div>

        {/* Document 2: GST Tax Invoice */}
        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase">Latest Tax Invoice (PDF 3)</h4>
          </div>
          <p className="text-xs text-slate-500">
            Bill: {INITIAL_INVOICES[0].billNo} (26/Aug - 25/Sept)
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs font-mono font-bold text-emerald-700">
              ₹{INITIAL_INVOICES[0].grandTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <button
              onClick={() => onOpenPrint('invoice', INITIAL_INVOICES[0])}
              className="flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 text-emerald-700 font-bold px-3 py-1.5 rounded border border-slate-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tax Invoice</span>
            </button>
          </div>
        </div>

        {/* Document 3: e-Way Bill Challan */}
        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-purple-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase">Delivery Gate Pass (PDF 4)</h4>
          </div>
          <p className="text-xs text-slate-500">
            eWay: {INITIAL_DISPATCHES[0].ewayBillNo} (Truck MH15JW1118)
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs font-mono font-bold text-purple-700">
              1,480 PCS Delivered
            </span>
            <button
              onClick={() => onOpenPrint('eway', INITIAL_DISPATCHES[0])}
              className="flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 text-purple-700 font-bold px-3 py-1.5 rounded border border-slate-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>e-Way Bill</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
