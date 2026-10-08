import React, { useState } from 'react';
import { 
  Truck, 
  Printer, 
  Plus, 
  QrCode, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  FileCheck2, 
  Clock, 
  Building2,
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_DISPATCHES, INITIAL_CLIENTS, COMPANY_INFO } from '../data/mockData';

export default function EWayBillManager({ dispatches, onSaveDispatch, onOpenPrint }) {
  const [activeBillNo, setActiveBillNo] = useState(dispatches[0]?.ewayBillNo || '2622 9533 6390');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New Dispatch Form State
  const [formData, setFormData] = useState({
    ewayBillNo: `2622 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
    generatedDate: '26/09/2026 11:46 AM',
    validUpto: '27/09/2026',
    mode: 'Road',
    approxDistance: '23 km',
    type: 'Outward - Others - SHUTTERING ON HIRE',
    documentDetails: `Challan - IH${Math.floor(100 + Math.random() * 900)} - 26/09/2026`,
    selectedClientId: 'cli-01',
    hsnCode: '730890',
    productDesc: 'SCAFFOLDING AND SHUTTERING & SCAFFOLDING AND SHUTTERING',
    quantity: 1480.00,
    unit: 'PCS',
    taxableAmount: 422825.00,
    transporterName: 'NASHIK GOODS LOGISTICS',
    vehicleNo: 'MH15JW1118'
  });

  const selectedClient = INITIAL_CLIENTS.find(c => c.id === formData.selectedClientId) || INITIAL_CLIENTS[0];
  const currentDispatch = dispatches.find(d => d.ewayBillNo === activeBillNo) || dispatches[0];

  const handleSaveDispatch = () => {
    const newDispatchObj = {
      ewayBillNo: formData.ewayBillNo,
      generatedDate: formData.generatedDate,
      validUpto: formData.validUpto,
      mode: formData.mode,
      approxDistance: formData.approxDistance,
      type: formData.type,
      documentDetails: formData.documentDetails,
      transactionType: "Bill To - Ship To",
      portal: "1",
      from: {
        gstin: COMPANY_INFO.gstin,
        name: COMPANY_INFO.name,
        state: "MAHARASHTRA",
        dispatchFrom: COMPANY_INFO.address
      },
      to: {
        gstin: selectedClient.gstin,
        name: selectedClient.companyName.toUpperCase(),
        state: "MAHARASHTRA",
        shipTo: selectedClient.siteLocation.toUpperCase()
      },
      hsnCode: formData.hsnCode,
      productDesc: formData.productDesc,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      taxableAmount: Number(formData.taxableAmount),
      taxRate: "0.000+0.000+NE+0.000+0.00",
      totalInvAmt: Number(formData.taxableAmount),
      transporterName: formData.transporterName,
      transporterDocDate: "26/09/2026",
      vehicleNo: formData.vehicleNo,
      vehicleFrom: "Nashik",
      vehicleEnteredDate: formData.generatedDate,
      status: "In Transit"
    };

    onSaveDispatch(newDispatchObj);
    setActiveBillNo(newDispatchObj.ewayBillNo);
    setIsCreatingNew(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full min-w-0">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#2874f0]" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">e-Way Bill & Delivery Challan Dispatch Tracker</h2>
            <span className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded border border-purple-200 font-bold">
              {dispatches.length} Gate Passes
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Government compliant GST e-Way bills with HSN 730890, Vehicle tracking & Godown Dispatch Challans (PDF 4).
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
                <span>New Dispatch Challan</span>
              </button>

              <button
                onClick={() => onOpenPrint('eway', currentDispatch)}
                className="flex items-center gap-1.5 bg-[#fb641b] hover:bg-[#f45300] text-white text-xs font-bold px-3 py-2 rounded shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official e-Way Bill</span>
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
        /* CREATE DISPATCH CHALLAN */
        <div className="bg-white border border-slate-200 rounded-sm p-4 sm:p-5 space-y-4 sm:space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-[#2874f0] flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Generate Outward Delivery Challan & e-Way Bill
            </h3>
            <span className="text-xs text-slate-500 font-mono">eWay: {formData.ewayBillNo}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Destination Client</label>
              <select
                value={formData.selectedClientId}
                onChange={(e) => setFormData({ ...formData, selectedClientId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-[#2874f0]"
              >
                {INITIAL_CLIENTS.map(c => (
                  <option key={c.id} value={c.id}>{c.companyName} ({c.gstin})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Vehicle Number</label>
              <input
                type="text"
                value={formData.vehicleNo}
                onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono uppercase"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Transporter Name</label>
              <input
                type="text"
                value={formData.transporterName}
                onChange={(e) => setFormData({ ...formData, transporterName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Approx Distance (km)</label>
              <input
                type="text"
                value={formData.approxDistance}
                onChange={(e) => setFormData({ ...formData, approxDistance: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">HSN Code</label>
              <input
                type="text"
                value={formData.hsnCode}
                onChange={(e) => setFormData({ ...formData, hsnCode: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Total Quantity (PCS)</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Equipment Assessed Value (₹)</label>
              <input
                type="number"
                value={formData.taxableAmount}
                onChange={(e) => setFormData({ ...formData, taxableAmount: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold text-emerald-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Supply Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-[11px]"
              />
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
              onClick={handleSaveDispatch}
              className="px-5 py-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold rounded-lg text-xs shadow-lg"
            >
              Generate e-Way Bill & Gate Pass
            </button>
          </div>
        </div>
      ) : (
        /* E-WAY BILL PREVIEW - EXACT MATCH TO PDF DOCUMENT 4 */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-full min-w-0">
          {/* Dispatch List */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Dispatches & Challans</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {dispatches.map(d => (
                <div
                  key={d.ewayBillNo}
                  onClick={() => setActiveBillNo(d.ewayBillNo)}
                  className={`p-3 rounded-sm border cursor-pointer transition-all ${
                    activeBillNo === d.ewayBillNo 
                      ? 'bg-blue-50 border-[#2874f0] shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900">{d.ewayBillNo}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                      {d.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#2874f0] font-bold mt-1 truncate">{d.to.name}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1.5 border-t border-slate-100">
                    <span className="font-mono font-bold text-slate-800">{d.vehicleNo}</span>
                    <span className="font-semibold text-slate-700">{d.quantity} PCS</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Dispatch Photo Card */}
            <div className="p-3 bg-white rounded-sm border border-slate-200 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase">Yard Logistics Status</span>
              <img 
                src="/images/dispatch.jpg" 
                alt="Truck loaded with Scaffolding" 
                className="w-full h-32 object-cover rounded border border-slate-200"
              />
              <p className="text-[11px] text-slate-600">
                Truck <strong>MH15JW1118</strong> loaded at Nashik Godown. Transit clearance verified.
              </p>
            </div>
          </div>

          {/* Exact Government e-Way Bill Document Layout */}
          <div className="lg:col-span-3 bg-white text-slate-900 rounded-xl p-6 sm:p-8 shadow-2xl border border-slate-300 font-sans">
            <div className="border border-slate-800 text-xs">
              {/* Header */}
              <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold text-sm rounded">
                    e
                  </div>
                  <h1 className="text-lg font-black tracking-tight text-slate-950 font-display">e-Way Bill</h1>
                </div>
                {/* Simulated QR Code */}
                <div className="w-14 h-14 bg-slate-900 p-1 flex items-center justify-center rounded">
                  <QrCode className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Section 1: E-Way Bill Details */}
              <div className="p-2 bg-slate-100 font-bold border-b border-slate-800 text-slate-900">
                1. E-WAY BILL Details
              </div>
              <div className="p-3 border-b border-slate-800 space-y-1.5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <p><strong>eWay Bill No:</strong> <span className="font-mono font-bold text-slate-950">{currentDispatch.ewayBillNo}</span></p>
                  <p><strong>Generated Date:</strong> {currentDispatch.generatedDate}</p>
                  <p><strong>Generated By:</strong> {currentDispatch.from.gstin}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-200">
                  <p><strong>Valid Upto:</strong> <span className="font-bold text-emerald-800">{currentDispatch.validUpto}</span></p>
                  <p><strong>Mode:</strong> {currentDispatch.mode}</p>
                  <p><strong>Approx Distance:</strong> {currentDispatch.approxDistance}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-200">
                  <p><strong>Type:</strong> {currentDispatch.type}</p>
                  <p><strong>Document Details:</strong> <span className="font-semibold">{currentDispatch.documentDetails}</span></p>
                  <p><strong>Transaction type:</strong> {currentDispatch.transactionType}</p>
                </div>
              </div>

              {/* Section 2: Address Details */}
              <div className="p-2 bg-slate-100 font-bold border-b border-slate-800 text-slate-900">
                2. Address Details
              </div>
              <div className="grid grid-cols-2 border-b border-slate-800 text-xs">
                <div className="p-3 border-r border-slate-800 space-y-1">
                  <p className="font-bold text-slate-900 underline">From</p>
                  <p><strong>GSTIN:</strong> <span className="font-mono font-bold">{currentDispatch.from.gstin}</span></p>
                  <p className="font-bold text-slate-950">{currentDispatch.from.name}</p>
                  <p className="text-slate-600">{currentDispatch.from.state}</p>
                  <p className="text-[11px] text-slate-700 pt-1">
                    <strong>:: Dispatch From ::</strong><br />
                    {currentDispatch.from.dispatchFrom}
                  </p>
                </div>
                <div className="p-3 space-y-1">
                  <p className="font-bold text-slate-900 underline">To</p>
                  <p><strong>GSTIN:</strong> <span className="font-mono font-bold">{currentDispatch.to.gstin}</span></p>
                  <p className="font-bold text-slate-950">{currentDispatch.to.name}</p>
                  <p className="text-slate-600">{currentDispatch.to.state}</p>
                  <p className="text-[11px] text-slate-700 pt-1">
                    <strong>:: Ship To ::</strong><br />
                    {currentDispatch.to.shipTo}
                  </p>
                </div>
              </div>

              {/* Section 3: Goods Details */}
              <div className="p-2 bg-slate-100 font-bold border-b border-slate-800 text-slate-900">
                3. Goods Details
              </div>
              <table className="w-full text-xs text-left border-collapse border-b border-slate-800">
                <thead className="bg-slate-100 border-b border-slate-800 font-bold">
                  <tr>
                    <th className="p-1.5 border-r border-slate-800">HSN Code</th>
                    <th className="p-1.5 border-r border-slate-800">Product Name & Desc.</th>
                    <th className="p-1.5 border-r border-slate-800 text-right">Quantity</th>
                    <th className="p-1.5 border-r border-slate-800 text-right">Taxable Amount Rs.</th>
                    <th className="p-1.5 text-right">Tax Rate (C+S+I+Cess)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-r border-slate-800 font-mono font-bold">{currentDispatch.hsnCode}</td>
                    <td className="p-2 border-r border-slate-800 uppercase font-medium">{currentDispatch.productDesc}</td>
                    <td className="p-2 border-r border-slate-800 text-right font-bold">{currentDispatch.quantity?.toFixed(2)} {currentDispatch.unit}</td>
                    <td className="p-2 border-r border-slate-800 text-right font-mono font-bold">₹{currentDispatch.taxableAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="p-2 text-right font-mono text-[10px] text-slate-600">{currentDispatch.taxRate}</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold border-t border-slate-300">
                    <td colSpan={3} className="p-1.5 border-r border-slate-800 text-right">Tot. Taxable Amt: ₹{currentDispatch.taxableAmount?.toLocaleString()}</td>
                    <td colSpan={2} className="p-1.5 text-right text-slate-950 font-black">
                      Total Inv. Amt: ₹{currentDispatch.totalInvAmt?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Section 4: Transportation Details */}
              <div className="p-2 bg-slate-100 font-bold border-b border-slate-800 text-slate-900">
                4. Transportation Details
              </div>
              <div className="p-3 border-b border-slate-800 grid grid-cols-2">
                <p><strong>Transporter ID & Name:</strong> <span className="font-bold">{currentDispatch.transporterName}</span></p>
                <p><strong>Transporter Doc. No & Date:</strong> {currentDispatch.transporterDocDate}</p>
              </div>

              {/* Section 5: Vehicle Details */}
              <div className="p-2 bg-slate-100 font-bold border-b border-slate-800 text-slate-900">
                5. Vehicle Details
              </div>
              <table className="w-full text-xs text-left border-collapse border-b border-slate-800">
                <thead className="bg-slate-100 border-b border-slate-800 font-bold">
                  <tr>
                    <th className="p-1.5 border-r border-slate-800">Mode</th>
                    <th className="p-1.5 border-r border-slate-800">Vehicle / Trans Doc No.</th>
                    <th className="p-1.5 border-r border-slate-800">From</th>
                    <th className="p-1.5 border-r border-slate-800">Entered Date</th>
                    <th className="p-1.5 border-r border-slate-800">Entered By</th>
                    <th className="p-1.5 text-center">Portal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-r border-slate-800">{currentDispatch.mode}</td>
                    <td className="p-2 border-r border-slate-800 font-mono font-black text-slate-900">{currentDispatch.vehicleNo}</td>
                    <td className="p-2 border-r border-slate-800">{currentDispatch.vehicleFrom}</td>
                    <td className="p-2 border-r border-slate-800">{currentDispatch.vehicleEnteredDate}</td>
                    <td className="p-2 border-r border-slate-800 font-mono">{currentDispatch.from.gstin}</td>
                    <td className="p-2 text-center font-bold">1</td>
                  </tr>
                </tbody>
              </table>

              {/* Barcode Footer */}
              <div className="p-4 text-center bg-slate-50 flex flex-col items-center justify-center">
                <div className="font-mono text-2xl tracking-[0.25em] font-black border-y-2 border-slate-900 py-1 px-4">
                  ||| | | |||| | || |||| | ||| || ||| ||||
                </div>
                <span className="font-mono text-xs mt-1 text-slate-600 font-bold">{currentDispatch.ewayBillNo?.replace(/\s/g, '')}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3 no-print">
              <button
                onClick={() => onOpenPrint('eway', currentDispatch)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 shadow"
              >
                <Printer className="w-4 h-4 text-sky-400" />
                Print E-Way Bill Gate Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
