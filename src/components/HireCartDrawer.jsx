import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  FileText, 
  Zap, 
  Receipt, 
  CheckCircle2, 
  HardHat, 
  Info,
  ArrowRight,
  ArrowLeft,
  Scale,
  Calendar,
  Layers,
  Sparkles,
  MapPin,
  CreditCard,
  Building2,
  Phone,
  User,
  QrCode,
  Check,
  Loader2,
  Clock,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HireCartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onProceedToQuotation,
  onProceedToDispatch 
}) {
  const [durationMonths, setDurationMonths] = useState(3);
  const [step, setStep] = useState('cart'); // 'cart' | 'address' | 'payment' | 'success'
  
  // Delivery Address Form State
  const [addressForm, setAddressForm] = useState({
    projectName: 'Shreeram Grandeur Heights (Phase-2)',
    siteAddress: 'Near Jatra Hotel, Mumbai-Agra Highway, Nashik Road',
    city: 'Nashik',
    pincode: '422003',
    inchargeName: 'Vikram Sharma (Site Engineer)',
    contactMobile: '98234 56789',
    vehiclePreference: '10-Wheeler Heavy Truck (Capacity 20 MT)',
    deliverySlot: 'Tomorrow Morning (8:00 AM - 12:00 PM)',
    specialInstructions: 'Please ensure weighbridge receipt (Dharmakanta) is attached with driver.'
  });

  // Dummy Payment Form State
  const [paymentMethod, setPaymentMethod] = useState('neft'); // 'neft' | 'upi' | 'cheque' | 'card'
  const [utrNumber, setUtrNumber] = useState('HDFC009284719283');
  const [chequeNumber, setChequeNumber] = useState('CHQ-889210');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedOrderDetails, setConfirmedOrderDetails] = useState(null);

  if (!isOpen) return null;

  // Realtime Live Calculations
  const totalQty = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const totalWeightKg = cartItems.reduce((sum, item) => sum + (item.quantity * item.unitWeightKg), 0);
  const totalWeightMT = (totalWeightKg / 1000).toFixed(3);
  
  const subtotalMonthlyRent = cartItems.reduce((sum, item) => sum + (item.quantity * item.rateMonth), 0);
  const monthlyRentWithGST = Math.round(subtotalMonthlyRent * 1.18);
  const mobilisationAdvance3Mo = Math.round(monthlyRentWithGST * durationMonths);
  const securityChequesValue = Math.round(totalWeightKg * 80);

  // Handle Order Submission
  const handleFinalOrderSubmit = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const orderId = `WIN-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const ewayBillNo = `2622 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
      
      const orderObj = {
        orderId,
        ewayBillNo,
        date: new Date().toLocaleDateString('en-GB'),
        totalWeightMT,
        totalQty,
        amountPaid: mobilisationAdvance3Mo,
        paymentMethod: paymentMethod.toUpperCase(),
        address: addressForm,
        itemsCount: cartItems.length
      };

      setConfirmedOrderDetails(orderObj);
      setStep('success');

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully
      }

      // Notify App level dispatch store
      if (onProceedToDispatch) {
        onProceedToDispatch({
          quantity: totalQty,
          taxableAmount: mobilisationAdvance3Mo,
          address: addressForm
        });
      }
    }, 900);
  };

  const handleResetAndClose = () => {
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-[#faf8ff] w-full max-w-2xl h-full flex flex-col shadow-2xl overflow-hidden border-l border-purple-200 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header with Step Indicator */}
        <div className="bg-gradient-to-r from-violet-950 via-indigo-950 to-purple-900 text-white p-4 sm:p-5 flex items-center justify-between shadow-md shrink-0 border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-sm border border-purple-300/30">
              {step === 'cart' && <Layers className="w-4 h-4" />}
              {step === 'address' && <MapPin className="w-4 h-4" />}
              {step === 'payment' && <CreditCard className="w-4 h-4" />}
              {step === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </div>
            <div>
              <h2 className="font-bold text-base font-display text-white tracking-tight">
                {step === 'cart' && 'Equipment Hire Basket & Tonnage'}
                {step === 'address' && 'Site Delivery Address & Transport'}
                {step === 'payment' && 'B2B Payment & Security Deposit'}
                {step === 'success' && 'Order Confirmed & Gate Pass Issued!'}
              </h2>
              <div className="flex items-center gap-2 text-xs text-purple-300 mt-0.5">
                <span className={step === 'cart' ? 'text-amber-300 font-bold' : ''}>1. Basket</span>
                <span>→</span>
                <span className={step === 'address' ? 'text-amber-300 font-bold' : ''}>2. Delivery</span>
                <span>→</span>
                <span className={step === 'payment' ? 'text-amber-300 font-bold' : ''}>3. Payment</span>
                <span>→</span>
                <span className={step === 'success' ? 'text-emerald-400 font-bold' : ''}>4. Dispatch</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: BASKET / CART REVIEW */}
        {step === 'cart' && (
          <>
            {/* Tonnage Summary Banner */}
            <div className="bg-purple-100/70 border-b border-purple-200 px-4 py-2.5 flex items-center justify-between text-xs text-purple-950 shrink-0">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-violet-700" />
                <span>Total Fleet Weight: <strong className="font-mono text-violet-900">{totalWeightMT} MT</strong> ({totalWeightKg} Kg)</span>
              </div>
              <span className="text-[11px] bg-white text-purple-900 font-bold px-2 py-0.5 rounded-full border border-purple-300">
                {totalWeightKg > 9000 ? '🚛 10-Wheeler Truck Required' : '🚚 1x 14ft Tempo Required'}
              </span>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                  <HardHat className="w-16 h-16 text-purple-300 animate-bounce" />
                  <h3 className="text-base font-bold text-slate-700">Your Hire Basket is Empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Browse our heavy equipment catalogue and add Cuplock standards, Props, or Walkway boards to generate a quotation.
                  </p>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div 
                    key={item.id || index}
                    className="bg-white rounded-2xl p-3.5 border border-purple-100 shadow-purple-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-200 transition-all"
                  >
                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-purple-100 text-purple-900 px-1.5 py-0.2 rounded font-mono">
                          {item.category || 'EQUIP'}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {item.name}
                        </h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span>Weight: <strong>{item.unitWeightKg} Kg</strong>/pc</span>
                        <span>•</span>
                        <span>Daily: <strong className="text-violet-700">₹{item.rateDay}</strong></span>
                        <span>•</span>
                        <span>Monthly: <strong>₹{item.rateMonth}</strong></span>
                      </div>
                    </div>

                    {/* Qty Counter & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-purple-50">
                      
                      {/* Stepper */}
                      <div className="flex items-center gap-1.5 bg-purple-50 p-1 rounded-xl border border-purple-200">
                        <button
                          onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 10))}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-purple-100 text-slate-700 flex items-center justify-center font-bold text-xs transition-colors shadow-xs"
                          title="-10 PCS"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => onUpdateQty(item.id, Math.max(1, Number(e.target.value) || 1))}
                          className="w-14 text-center font-mono font-bold text-xs bg-transparent focus:outline-none text-slate-900"
                        />

                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 10)}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-purple-100 text-slate-700 flex items-center justify-center font-bold text-xs transition-colors shadow-xs"
                          title="+10 PCS"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-[75px]">
                        <span className="block text-xs font-black text-violet-900 font-mono">
                          ₹{Math.round(item.quantity * item.rateMonth)}
                        </span>
                        <span className="text-[10px] text-slate-400">/ month</span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Bottom Total & Next Step */}
            {cartItems.length > 0 && (
              <div className="bg-white border-t border-purple-200 p-4 sm:p-5 space-y-3.5 shadow-xl shrink-0">
                
                {/* Duration Selector */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-violet-600" />
                    <span>Rental Period Mobilisation:</span>
                  </span>
                  <div className="flex items-center gap-1 bg-purple-50 p-1 rounded-xl border border-purple-200">
                    {[1, 2, 3, 6].map(m => (
                      <button
                        key={m}
                        onClick={() => setDurationMonths(m)}
                        className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                          durationMonths === m
                            ? 'bg-violet-600 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-purple-100'
                        }`}
                      >
                        {m} Month{m > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Calculations Breakdown */}
                <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Monthly Rent Subtotal:</span>
                    <span className="font-mono font-bold text-slate-900">₹{subtotalMonthlyRent.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (18% Applicable):</span>
                    <span className="font-mono text-slate-900">+ ₹{Math.round(subtotalMonthlyRent * 0.18).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Security Cheque (Clause 1):</span>
                    <span className="font-mono text-amber-700 font-bold">₹{securityChequesValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-purple-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                    <span>Total ({durationMonths} Mo Hire + GST):</span>
                    <span className="text-base font-black text-violet-800 font-mono">₹{mobilisationAdvance3Mo.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onProceedToQuotation}
                    className="py-2.5 px-4 bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold rounded-xl text-xs sm:text-sm border border-purple-300 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-violet-700" />
                    <span>Generate Quotation PDF</span>
                  </button>

                  <button
                    onClick={() => setStep('address')}
                    className="py-2.5 px-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs sm:text-sm shadow-md shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Place Delivery Order →</span>
                  </button>
                </div>

              </div>
            )}
          </>
        )}

        {/* STEP 2: SITE DELIVERY ADDRESS & TRANSPORT */}
        {step === 'address' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900 font-display">
                    Project Site &amp; Transport Details
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enter delivery location where scaffolding materials will be dispatched from Nashik Depot #2.
                  </p>
                </div>
                <span className="bg-purple-100 text-purple-900 font-bold text-xs px-2.5 py-1 rounded-full">
                  Weight: {totalWeightMT} MT
                </span>
              </div>

              {/* Form Fields */}
              <div className="space-y-3.5 text-xs">
                
                {/* Project Name */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Project / Construction Site Name *
                  </label>
                  <div className="relative flex items-center">
                    <Building2 className="w-4 h-4 text-purple-400 absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={addressForm.projectName}
                      onChange={e => setAddressForm({ ...addressForm, projectName: e.target.value })}
                      placeholder="e.g. Shreeram Grandeur Towers"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-purple-200 focus:border-violet-500 rounded-xl font-medium text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Site Address */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Site Delivery Address (Gate / Plot / Landmark) *
                  </label>
                  <div className="relative flex items-start">
                    <MapPin className="w-4 h-4 text-purple-400 absolute left-3 top-2.5 pointer-events-none" />
                    <textarea
                      rows={2}
                      required
                      value={addressForm.siteAddress}
                      onChange={e => setAddressForm({ ...addressForm, siteAddress: e.target.value })}
                      placeholder="Plot No., Road Name, Landmark, City..."
                      className="w-full pl-9 pr-3 py-2 bg-white border border-purple-200 focus:border-violet-500 rounded-xl font-medium text-slate-900 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* City & Pincode Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl font-medium text-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={addressForm.pincode}
                      onChange={e => setAddressForm({ ...addressForm, pincode: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl font-medium text-slate-900 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Site In-Charge Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Site In-Charge Person *</label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-purple-400 absolute left-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={addressForm.inchargeName}
                        onChange={e => setAddressForm({ ...addressForm, inchargeName: e.target.value })}
                        placeholder="Name of site engineer"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-purple-200 rounded-xl font-medium text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Site Mobile Number *</label>
                    <div className="relative flex items-center">
                      <Phone className="w-4 h-4 text-purple-400 absolute left-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={addressForm.contactMobile}
                        onChange={e => setAddressForm({ ...addressForm, contactMobile: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-purple-200 rounded-xl font-medium text-slate-900 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Transport Vehicle Selection */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Dispatch Vehicle Preference *
                  </label>
                  <select
                    value={addressForm.vehiclePreference}
                    onChange={e => setAddressForm({ ...addressForm, vehiclePreference: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl font-medium text-slate-900 focus:outline-none"
                  >
                    <option value="10-Wheeler Heavy Truck (Capacity 20 MT)">🚛 10-Wheeler Heavy Truck (Capacity 20 MT - Recommended)</option>
                    <option value="14ft Tata Tempo (Capacity 7 MT)">🚚 14ft Tata Tempo (Capacity 7 MT)</option>
                    <option value="Self Contractor Vehicle (Depot Pickup)">🏗️ Self Contractor Vehicle (Pick up from Nashik Depot #2)</option>
                  </select>
                </div>

                {/* Preferred Delivery Slot */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Preferred Delivery Time Slot
                  </label>
                  <select
                    value={addressForm.deliverySlot}
                    onChange={e => setAddressForm({ ...addressForm, deliverySlot: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl font-medium text-slate-900 focus:outline-none"
                  >
                    <option value="Tomorrow Morning (8:00 AM - 12:00 PM)">🌅 Tomorrow Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Tomorrow Afternoon (1:00 PM - 5:00 PM)">☀️ Tomorrow Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Urgent Same-Day Night Loading">⚡ Urgent Same-Day Night Loading</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Bottom Step Actions */}
            <div className="bg-white border-t border-purple-200 p-4 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => setStep('payment')}
                className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs sm:text-sm shadow-md shadow-violet-500/20 flex items-center gap-1.5 active:scale-95"
              >
                <span>Proceed to Payment Options →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DUMMY B2B PAYMENT & SECURITY DEPOSIT */}
        {step === 'payment' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* Header Amount */}
              <div className="p-4 bg-gradient-to-br from-violet-950 to-purple-900 text-white rounded-2xl border border-purple-800 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs text-purple-300 font-medium block">Total Payable for Mobilisation:</span>
                  <span className="text-2xl font-black text-amber-300 font-mono">
                    ₹{mobilisationAdvance3Mo.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-purple-300 block mt-0.5">
                    Includes {durationMonths} Mo Hire + 18% GST (Clause 1 &amp; 3)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    100% Tax Deductible
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select B2B Commercial Payment Mode:
                </label>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  
                  {/* Option 1: RTGS / NEFT */}
                  <div
                    onClick={() => setPaymentMethod('neft')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'neft'
                        ? 'bg-purple-50/90 border-violet-600 shadow-sm ring-1 ring-violet-500'
                        : 'bg-white border-purple-100 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900">🏦 RTGS / NEFT</strong>
                      {paymentMethod === 'neft' && <CheckCircle2 className="w-4 h-4 text-violet-600" />}
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">Direct Bank Account Transfer</span>
                  </div>

                  {/* Option 2: UPI / QR Fast Pay */}
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'upi'
                        ? 'bg-purple-50/90 border-violet-600 shadow-sm ring-1 ring-violet-500'
                        : 'bg-white border-purple-100 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900">📱 B2B UPI / QR</strong>
                      {paymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-violet-600" />}
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">Instant QR Code Scan</span>
                  </div>

                  {/* Option 3: Security Cheque */}
                  <div
                    onClick={() => setPaymentMethod('cheque')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'cheque'
                        ? 'bg-purple-50/90 border-violet-600 shadow-sm ring-1 ring-violet-500'
                        : 'bg-white border-purple-100 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900">📑 Security Cheque</strong>
                      {paymentMethod === 'cheque' && <CheckCircle2 className="w-4 h-4 text-violet-600" />}
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">Clause 1 Security Deposit</span>
                  </div>

                  {/* Option 4: Corporate Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'card'
                        ? 'bg-purple-50/90 border-violet-600 shadow-sm ring-1 ring-violet-500'
                        : 'bg-white border-purple-100 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900">💳 Corporate Card</strong>
                      {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-violet-600" />}
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">Visa / Master / RuPay B2B</span>
                  </div>

                </div>
              </div>

              {/* Dynamic Payment Details Area */}
              <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs space-y-3 text-xs">
                
                {paymentMethod === 'neft' && (
                  <div className="space-y-2.5">
                    <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200/70 font-mono text-[11px] space-y-1">
                      <p><strong>Bank:</strong> HDFC Bank Ltd, Industrial Estate Branch</p>
                      <p><strong>A/C Name:</strong> WINNTUS SCAFFOLDING &amp; SHUTTERING PVT LTD</p>
                      <p><strong>A/C No:</strong> 50200028471928</p>
                      <p><strong>IFSC:</strong> HDFC0001824</p>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Bank UTR / Transaction Reference Number *
                      </label>
                      <input
                        type="text"
                        value={utrNumber}
                        onChange={e => setUtrNumber(e.target.value)}
                        placeholder="e.g. HDFC009284719283"
                        className="w-full px-3 py-2 bg-purple-50/40 border border-purple-200 rounded-xl font-mono text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="flex flex-col items-center justify-center p-3 text-center space-y-2">
                    <div className="w-32 h-32 bg-white border-2 border-dashed border-purple-300 rounded-2xl p-2 flex flex-col items-center justify-center shadow-inner">
                      <QrCode className="w-20 h-20 text-violet-700" />
                      <span className="text-[9px] font-bold text-slate-400">WINNTUS B2B UPI</span>
                    </div>
                    <p className="font-mono font-bold text-xs text-violet-900">
                      winntus.erp@hdfcbank
                    </p>
                    <span className="text-[11px] text-slate-500">
                      Scan via PhonePe, GooglePay, Paytm, or BHIM for instant verification.
                    </span>
                  </div>
                )}

                {paymentMethod === 'cheque' && (
                  <div className="space-y-2">
                    <p className="text-slate-600 leading-relaxed">
                      As per <strong>Clause 1 &amp; 7</strong> of the Scaffolding Hire Agreement, a refundable security cheque of <strong className="text-amber-700">₹{securityChequesValue.toLocaleString('en-IN')}</strong> must be handed over during depot vehicle loading.
                    </p>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Cheque Number / Bank Name *</label>
                      <input
                        type="text"
                        value={chequeNumber}
                        onChange={e => setChequeNumber(e.target.value)}
                        placeholder="e.g. CHQ-889210 (ICICI Bank)"
                        className="w-full px-3 py-2 bg-purple-50/40 border border-purple-200 rounded-xl font-mono text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-2.5">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        defaultValue="4111 8890 2841 9021"
                        className="w-full px-3 py-2 bg-purple-50/40 border border-purple-200 rounded-xl font-mono text-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          defaultValue="12/28"
                          className="w-full px-3 py-2 bg-purple-50/40 border border-purple-200 rounded-xl font-mono text-slate-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">CVV</label>
                        <input
                          type="password"
                          defaultValue="789"
                          className="w-full px-3 py-2 bg-purple-50/40 border border-purple-200 rounded-xl font-mono text-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Bottom Payment Actions */}
            <div className="bg-white border-t border-purple-200 p-4 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setStep('address')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Address</span>
              </button>

              <button
                type="button"
                onClick={handleFinalOrderSubmit}
                disabled={isProcessingPayment}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-500/20 flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authorizing B2B Payment...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm &amp; Place Order (₹{mobilisationAdvance3Mo.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ORDER CONFIRMED & DISPATCH SLIP */}
        {step === 'success' && confirmedOrderDetails && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden p-4 sm:p-6 space-y-4">
            
            <div className="flex-1 overflow-y-auto space-y-4 text-center">
              
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-lg animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="bg-emerald-100 text-emerald-900 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Order Successfully Dispatched!
                </span>
                <h3 className="text-xl font-black text-slate-900 font-display mt-2">
                  Scaffolding Fleet Order Confirmed
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your delivery challan (Annexure-A) and E-Way bill have been officially generated.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-purple-100 shadow-purple-subtle text-left space-y-3 text-xs">
                
                <div className="flex items-center justify-between border-b border-purple-100 pb-2.5">
                  <div>
                    <span className="text-slate-400 block text-[10px]">ORDER ID:</span>
                    <strong className="font-mono text-slate-900 text-sm">{confirmedOrderDetails.orderId}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">E-WAY BILL NO:</span>
                    <strong className="font-mono text-violet-700 text-xs">{confirmedOrderDetails.ewayBillNo}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div>
                    <span className="text-slate-400 block">Site Project:</span>
                    <strong className="text-slate-900">{confirmedOrderDetails.address.projectName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Delivery Slot:</span>
                    <strong className="text-slate-900">{confirmedOrderDetails.address.deliverySlot}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Total Equipment:</span>
                    <strong className="text-slate-900">{confirmedOrderDetails.totalQty} PCS ({confirmedOrderDetails.totalWeightMT} MT)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Payment Mode:</span>
                    <strong className="text-emerald-700">{confirmedOrderDetails.paymentMethod} (Paid)</strong>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200/80 text-[11px] text-purple-950 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-violet-700 shrink-0" />
                  <div>
                    <strong>Assigned Vehicle:</strong> {confirmedOrderDetails.address.vehiclePreference} • Weighbridge slip included.
                  </div>
                </div>

              </div>

            </div>

            {/* Success Bottom Buttons */}
            <div className="bg-white border-t border-purple-200 p-4 space-y-2 shrink-0">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs sm:text-sm shadow-md shadow-violet-500/25 transition-all active:scale-95"
              >
                View Dispatched Gate Pass &amp; Track Vehicle
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
