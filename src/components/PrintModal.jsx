import React, { useRef, useState } from 'react';
import { X, Printer, Download, CheckCircle2, QrCode, FileText, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PrintModal({ isOpen, onClose, docType, data }) {
  const documentRef = useRef(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!isOpen || !data) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!documentRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const canvas = await html2canvas(documentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      const filename = `${docType.toUpperCase()}_${(data.id || data.billNo || data.ewayBillNo || 'doc').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error('PDF generation failed, falling back to browser print:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="print-modal-container fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-md max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl overflow-hidden border border-slate-300">
        {/* Modal Controls Header (Hidden in Print) */}
        <div className="no-print p-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-400" />
              Document Preview: {docType.toUpperCase()} ({data.id || data.billNo || data.ewayBillNo})
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
              A4 Format Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct PDF Download Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fb641b] hover:bg-[#f45300] text-white rounded text-xs font-bold shadow transition-all disabled:opacity-50"
            >
              {isGeneratingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            {/* Direct Browser Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2874f0] hover:bg-[#1754be] text-white rounded text-xs font-bold shadow transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Document</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="print-document-content p-4 sm:p-8 overflow-y-auto bg-slate-100 flex justify-center">
          <div 
            ref={documentRef}
            className="printable-document bg-white text-slate-950 w-full max-w-[780px] p-6 rounded shadow-md font-sans text-xs border border-slate-300"
          >
            {/* ==============================================
                DOCUMENT 1: RENTAL QUOTATION (EXACT WINNTUS PDF)
                ============================================== */}
            {docType === 'quotation' && (
              <div className="border-2 border-slate-900">
                {/* Header Brand */}
                <div className="bg-[#1e3a8a] text-white p-3 text-center border-b-2 border-slate-900">
                  <div className="text-2xl font-black tracking-widest font-display">WINNTUS</div>
                  <h1 className="text-sm sm:text-base font-black uppercase tracking-wide">
                    WINNTUS SCAFFOLDING & SHUTTERING NASHIK
                  </h1>
                  <p className="text-[10px] text-slate-200">
                    ADD: GAT NO,2. TRIMBAKESHWAR ROAD, KHAMBALE, NASHIK, MAHARASHTRA-422213
                  </p>
                  <p className="text-[10px] font-bold text-amber-300">
                    GST NO- 27AAEFW3842N1ZN | BRANCH HEAD:- ANIL DASH - 8956704931
                  </p>
                  <p className="text-[9px] text-slate-200">
                    EMAIL ID: 1) anil.kumardash@winntus.com 2) marketing.nashik@winntus.com
                  </p>
                </div>

                {/* Title */}
                <div className="bg-sky-100 text-slate-900 font-black text-center py-1 border-b-2 border-slate-900 text-xs tracking-wider uppercase">
                  RENTAL QUOTATION
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 text-[11px] border-b-2 border-slate-900">
                  <div className="p-2 border-r-2 border-slate-900 space-y-0.5">
                    <p><strong>DATE :</strong> {data.date}</p>
                    <p><strong>PREPARED BY :</strong> {data.preparedBy}</p>
                    <p><strong>COMPANY NAME :</strong> <span className="font-bold text-blue-900">{data.client?.companyName}</span></p>
                    <p><strong>CONTACT PERSON :</strong> {data.client?.contactPerson}</p>
                    <p><strong>MOBILE NUM :</strong> {data.client?.mobile}</p>
                    <p><strong>SITE LOCATION :</strong> {data.client?.siteLocation}</p>
                    <p><strong>DURATION :</strong> {data.client?.duration}</p>
                    <p><strong>GST NO :</strong> {data.client?.gstin}</p>
                  </div>
                  <div className="p-2 space-y-0.5">
                    <p><strong>QUOTATION NO :</strong> <span className="font-bold">{data.id}</span></p>
                    <p><strong>LEAD PERSON-</strong> {data.leadPerson}</p>
                    <p><strong>STATUS :</strong> <span className="text-emerald-700 font-bold">{data.status || 'Approved'}</span></p>
                  </div>
                </div>

                {/* Items Table */}
                <table className="w-full text-[11px] text-left border-collapse">
                  <thead className="bg-slate-200 border-b-2 border-slate-900 font-bold">
                    <tr>
                      <th className="p-1.5 border-r border-slate-900">ITEM NAME</th>
                      <th className="p-1.5 border-r border-slate-900 text-right">Rate/Pc/Day</th>
                      <th className="p-1.5 border-r border-slate-900 text-right">MONTHLY RENT/PC</th>
                      <th className="p-1.5 border-r border-slate-900 text-right">QUANTITY</th>
                      <th className="p-1.5 border-r border-slate-900 text-right">ORDER WEIGHT</th>
                      <th className="p-1.5 text-right">RENT/MONTH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    {data.items?.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                        <td className="p-1.5 border-r border-slate-900 font-medium">{item.name}</td>
                        <td className="p-1.5 border-r border-slate-900 text-right">{item.rateDay?.toFixed(2)}</td>
                        <td className="p-1.5 border-r border-slate-900 text-right">{item.rateMonth?.toFixed(2)}</td>
                        <td className="p-1.5 border-r border-slate-900 text-right font-bold">{item.quantity}</td>
                        <td className="p-1.5 border-r border-slate-900 text-right">{item.orderWeightKg?.toFixed(2)}</td>
                        <td className="p-1.5 text-right font-bold">{item.rentMonth?.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-200 font-black border-t-2 border-slate-900">
                      <td colSpan={3} className="p-1.5 border-r border-slate-900 text-right">TOTAL</td>
                      <td className="p-1.5 border-r border-slate-900 text-right">{data.totalQuantity}</td>
                      <td className="p-1.5 border-r border-slate-900 text-right">{data.totalWeightKg?.toLocaleString()}</td>
                      <td className="p-1.5 text-right font-black">₹{data.subtotalMonthlyRent?.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Financial Summary Box */}
                <div className="grid grid-cols-2 text-[11px] border-t-2 border-b-2 border-slate-900 bg-sky-50">
                  <div className="p-2 border-r-2 border-slate-900 font-bold space-y-1">
                    <p>TOTAL WEIGHT (METRIC TON)</p>
                    <p>MONTHLY RENT (WITH GST)</p>
                    <p className="text-amber-900">DEPOSIT AMT. 3 MONTH RENT AS MOBILISATION ADVANCE</p>
                    <p>SECURITY CHEQUE</p>
                  </div>
                  <div className="p-2 font-black space-y-1 text-right">
                    <p>{data.totalWeightMT}</p>
                    <p className="text-blue-900">₹{data.monthlyRentWithGST?.toLocaleString()}</p>
                    <p className="text-amber-800">₹{data.depositMobilisationAdvance?.toLocaleString()}</p>
                    <p>₹{data.securityChequeValue?.toLocaleString()}</p>
                  </div>
                </div>

                {/* Terms and Conditions (Verbatim PDF 1) */}
                <div className="p-2.5 text-[10px] space-y-0.5 bg-white">
                  <h4 className="font-bold text-[11px] text-red-800 uppercase">TERMS AND CONDITIONS:</h4>
                  <ol className="list-decimal pl-4 space-y-0.5 text-slate-800">
                    <li>The rental will be charged from the date of dispatch & till the day material is reached to our Godown.</li>
                    <li>Transportation for the entire transit appears into your account (Both sides).</li>
                    <li>Deposit of 3 months is refundable only at the time of closure of the agreement & will not be concilitate in monthy rents.</li>
                    <li>FIVE Without Date Security Cheque's of value Rs. <strong>{data.securityChequeValue?.toLocaleString()}/-</strong> which will be returned after amicable closure of the agreement.</li>
                    <li>Dispatch shall only be intiated once deposit amount has credited in our account.</li>
                    <li>Continuous Monthly bill to be paid by 10th of every month without any failure.</li>
                    <li>The Loss charges for our scaffolding & shuttering material will charged at Rs. 65/kg + 18% gst.</li>
                    <li>All other according to the rent agreement.</li>
                    <li>
                      <strong>KYC Documents:</strong>
                      <span className="block pl-1 text-slate-700">
                        i) Company GST Registration (3pages) | ii) Company Pan Card | iii) Site address proof (Work order copy from client) | iv) Aadhar Card of Authorized signatory.
                      </span>
                    </li>
                  </ol>
                </div>

                {/* Footer Signature */}
                <div className="border-t-2 border-slate-900 p-2.5 flex items-center justify-between text-[10px] bg-slate-50">
                  <div>
                    <p className="font-bold">FOR MORE INFO: www.winntus.com</p>
                    <p className="text-slate-500">THANK YOU !</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold uppercase">WINNTUS SCAFFOLDING AND SHUTTERING</p>
                    <div className="h-6"></div>
                    <p className="text-slate-600 italic">[Authorized Signature]</p>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================
                DOCUMENT 3: TAX INVOICE (EXACT WINNTUS PDF)
                ============================================== */}
            {docType === 'invoice' && (
              <div className="border border-slate-900 text-xs">
                {/* Header */}
                <div className="p-3 text-center border-b border-slate-900 relative">
                  <div className="absolute right-2 top-2 text-[10px] text-slate-500 font-mono">Page 1 of 1</div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">TAX INVOICE</h2>
                  <h1 className="text-base font-black text-slate-950 uppercase mt-0.5">
                    WINNTUS SCAFFOLDING AND SHUTTERING
                  </h1>
                  <p className="text-[10px] text-slate-700">
                    GAT NO. 2, TRIMBAKESHWAR ROAD, KHAMBALE, NASHIK, MAHARASHTRA-422213
                  </p>
                  <p className="text-[11px] font-bold text-slate-900">
                    GSTIN NO. 27AAEFW3842N1ZN
                  </p>
                  <p className="text-[10px] text-slate-700">
                    BANK DETAIL-A/C NO.039905010289 IFSC-ICIC0000399 | SEC - 54, VIPUL ORCHID PLAZA, SUNCITY, GURGAON - 122003, HARYANA
                  </p>
                  <p className="text-[10px] text-slate-600">
                    Email :Nashik@winntus.com | Ph. No. 8956704931,8956704913
                  </p>
                </div>

                {/* Billed To & Bill Details */}
                <div className="grid grid-cols-2 border-b border-slate-900 text-xs">
                  <div className="p-3 border-r border-slate-900 space-y-1">
                    <p className="font-bold text-slate-950 text-sm">{data.client?.name}</p>
                    <p className="text-slate-700 text-[11px]">{data.client?.address}</p>
                    <p><strong>State Code:</strong> {data.client?.stateCode || '27'}</p>
                    <p><strong>GSTIN No:</strong> <span className="font-mono font-bold">{data.client?.gstin}</span></p>
                    <p><strong>PAN No:</strong> <span className="font-mono">{data.client?.pan}</span></p>
                  </div>
                  <div className="p-3 space-y-1.5 bg-slate-50">
                    <div className="grid grid-cols-2">
                      <p><strong>Bill No.</strong> {data.billNo}</p>
                      <p><strong>Date:</strong> {data.date}</p>
                    </div>
                    <div className="grid grid-cols-2">
                      <p><strong>From:</strong> {data.periodFrom}</p>
                      <p><strong>To:</strong> {data.periodTo}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-300 text-[11px]">
                      <p className="text-slate-500 font-semibold">Site Location / Dispatch Address:</p>
                      <p className="font-medium text-slate-800">{data.client?.site}</p>
                    </div>
                  </div>
                </div>

                {/* Items Calculation Table */}
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-100 border-b border-slate-900 font-bold">
                    <tr>
                      <th className="p-1.5 border-r border-slate-900">Description for Hire Charges</th>
                      <th className="p-1.5 border-r border-slate-900 text-center">Period</th>
                      <th className="p-1.5 border-r border-slate-900 text-right">Days</th>
                      <th className="p-1.5 border-r border-slate-900 text-right">Number</th>
                      <th className="p-1.5 border-r border-slate-900 text-right">Rate</th>
                      <th className="p-1.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    {data.items?.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                        <td className="p-1.5 border-r border-slate-900 font-medium">
                          {item.description}
                          <div className="text-[10px] text-slate-500 font-mono">Qty: {item.quantity}</div>
                          {item.subDetails && <div className="text-[10px] text-blue-900">{item.subDetails}</div>}
                        </td>
                        <td className="p-1.5 border-r border-slate-900 text-center text-slate-700">{item.period}</td>
                        <td className="p-1.5 border-r border-slate-900 text-right">{item.days}</td>
                        <td className="p-1.5 border-r border-slate-900 text-right font-mono font-semibold">{item.numberProduct?.toLocaleString()}</td>
                        <td className="p-1.5 border-r border-slate-900 text-right font-mono">{item.rate?.toFixed(3)}</td>
                        <td className="p-1.5 text-right font-mono font-bold">{item.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Tax Breakdown Block */}
                <div className="border-t border-slate-900 grid grid-cols-12 text-xs">
                  <div className="col-span-7 p-3 border-r border-slate-900 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-slate-800">Rupees in words:</p>
                      <p className="text-slate-800 font-medium italic mt-0.5">{data.amountInWords || 'Rupees Eighty One Thousand Five Hundred Thirty Two only'}</p>
                    </div>
                  </div>

                  <div className="col-span-5 divide-y divide-slate-300">
                    <div className="flex justify-between p-1.5 font-bold">
                      <span>Total:</span>
                      <span className="font-mono">{data.taxableTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between p-1.5 text-slate-700">
                      <span>CGST9%(9%):</span>
                      <span className="font-mono">{data.cgstAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between p-1.5 text-slate-700">
                      <span>SGST9%(9%):</span>
                      <span className="font-mono">{data.sgstAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between p-1.5 text-slate-600 text-[11px]">
                      <span>Round Off:</span>
                      <span className="font-mono">{data.roundOff?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between p-2 font-black text-sm bg-slate-100 text-slate-950">
                      <span>Grand Total:</span>
                      <span className="font-mono text-blue-900">{data.grandTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* Signatory */}
                <div className="border-t border-slate-900 p-2.5 flex justify-between items-end bg-slate-50 text-[10px]">
                  <div>
                    <p className="text-slate-500">Computer Generated Tax Invoice</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xs uppercase text-slate-900">For WINNTUS SCAFFOLDING AND SHUTTERING</p>
                    <div className="h-6"></div>
                    <p className="font-semibold text-slate-700">Authorised Signatory</p>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================
                DOCUMENT 4: e-WAY BILL (EXACT GOVERNMENT PDF)
                ============================================== */}
            {docType === 'eway' && (
              <div className="border border-slate-900 text-xs">
                {/* Header with e-Way Bill & QR Code */}
                <div className="p-3 border-b border-slate-900 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold text-base rounded">
                      e
                    </div>
                    <h1 className="text-xl font-black tracking-tight text-slate-950 font-display">e-Way Bill</h1>
                  </div>
                  <div className="w-14 h-14 bg-slate-900 p-1 flex items-center justify-center rounded">
                    <QrCode className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* 1. E-WAY BILL Details */}
                <div className="p-1.5 bg-slate-100 font-bold border-b border-slate-900 text-slate-900">
                  1. E-WAY BILL Details
                </div>
                <div className="p-2.5 border-b border-slate-900 space-y-1">
                  <div className="grid grid-cols-3 gap-2">
                    <p><strong>eWay Bill No:</strong> <span className="font-mono font-bold text-slate-950">{data.ewayBillNo}</span></p>
                    <p><strong>Generated Date:</strong> {data.generatedDate}</p>
                    <p><strong>Generated By:</strong> {data.from?.gstin || '27AAEFW3842N1ZN'}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200">
                    <p><strong>Valid Upto:</strong> <span className="font-bold text-emerald-800">{data.validUpto}</span></p>
                    <p><strong>Mode:</strong> {data.mode || 'Road'}</p>
                    <p><strong>Approx Distance:</strong> {data.approxDistance || '23km'}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200">
                    <p><strong>Type:</strong> {data.type || 'Outward - Others (SHUTTERING ON HIRE)'}</p>
                    <p><strong>Document Details:</strong> <span className="font-semibold">{data.documentDetails}</span></p>
                    <p><strong>Transaction type:</strong> {data.transactionType || 'Bill To - Ship To'}</p>
                  </div>
                </div>

                {/* 2. Address Details */}
                <div className="p-1.5 bg-slate-100 font-bold border-b border-slate-900 text-slate-900">
                  2. Address Details
                </div>
                <div className="grid grid-cols-2 border-b border-slate-900 text-xs">
                  <div className="p-2.5 border-r border-slate-900 space-y-1">
                    <p className="font-bold text-slate-900 underline">From</p>
                    <p><strong>GSTIN:</strong> <span className="font-mono font-bold">{data.from?.gstin || '27AAEFW3842N1ZN'}</span></p>
                    <p className="font-bold text-slate-950">{data.from?.name || 'WINNTUS SCAFFOLDING AND SHUTTERING'}</p>
                    <p className="text-slate-600">{data.from?.state || 'MAHARASHTRA'}</p>
                    <p className="text-[11px] text-slate-700 pt-1">
                      <strong>:: Dispatch From ::</strong><br />
                      {data.from?.dispatchFrom || 'Gat No. 2, Trimbakeshwar Road, Khambale, Nashik, MAHARASHTRA-422213'}
                    </p>
                  </div>
                  <div className="p-2.5 space-y-1">
                    <p className="font-bold text-slate-900 underline">To</p>
                    <p><strong>GSTIN:</strong> <span className="font-mono font-bold">{data.to?.gstin}</span></p>
                    <p className="font-bold text-slate-950">{data.to?.name}</p>
                    <p className="text-slate-600">{data.to?.state || 'MAHARASHTRA'}</p>
                    <p className="text-[11px] text-slate-700 pt-1">
                      <strong>:: Ship To ::</strong><br />
                      {data.to?.shipTo}
                    </p>
                  </div>
                </div>

                {/* 3. Goods Details */}
                <div className="p-1.5 bg-slate-100 font-bold border-b border-slate-900 text-slate-900">
                  3. Goods Details
                </div>
                <table className="w-full text-xs text-left border-collapse border-b border-slate-900">
                  <thead className="bg-slate-100 border-b border-slate-900 font-bold">
                    <tr>
                      <th className="p-1.5 border-r border-slate-900">HSN Code</th>
                      <th className="p-1.5 border-r border-slate-900">Product Name & Desc.</th>
                      <th className="p-1.5 border-r border-slate-900 text-right">Quantity</th>
                      <th className="p-1.5 border-r border-slate-900 text-right">Taxable Amount Rs.</th>
                      <th className="p-1.5 text-right">Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border-r border-slate-900 font-mono font-bold">{data.hsnCode || '730890'}</td>
                      <td className="p-2 border-r border-slate-900 uppercase font-medium">{data.productDesc || 'SCAFFOLDING AND SHUTTERING & SCAFFOLDING AND SHUTTERING'}</td>
                      <td className="p-2 border-r border-slate-900 text-right font-bold">{data.quantity?.toFixed(2)} {data.unit || 'PCS'}</td>
                      <td className="p-2 border-r border-slate-900 text-right font-mono font-bold">₹{data.taxableAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="p-2 text-right font-mono text-[10px] text-slate-600">{data.taxRate || '0.000+0.000+NE+0.000+0.00'}</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold border-t border-slate-300">
                      <td colSpan={3} className="p-1.5 border-r border-slate-900 text-right">Tot. Taxable Amt: ₹{data.taxableAmount?.toLocaleString()}</td>
                      <td colSpan={2} className="p-1.5 text-right text-slate-950 font-black">
                        Total Inv. Amt: ₹{data.totalInvAmt?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* 4. Transportation Details */}
                <div className="p-1.5 bg-slate-100 font-bold border-b border-slate-900 text-slate-900">
                  4. Transportation Details
                </div>
                <div className="p-2 border-b border-slate-900 grid grid-cols-2">
                  <p><strong>Transporter ID & Name:</strong> <span className="font-bold">{data.transporterName || 'NASHIK GOODS LOGISTICS'}</span></p>
                  <p><strong>Transporter Doc. No & Date:</strong> {data.transporterDocDate || '26/09/2026'}</p>
                </div>

                {/* 5. Vehicle Details */}
                <div className="p-1.5 bg-slate-100 font-bold border-b border-slate-900 text-slate-900">
                  5. Vehicle Details
                </div>
                <table className="w-full text-xs text-left border-collapse border-b border-slate-900">
                  <thead className="bg-slate-100 border-b border-slate-900 font-bold">
                    <tr>
                      <th className="p-1.5 border-r border-slate-900">Mode</th>
                      <th className="p-1.5 border-r border-slate-900">Vehicle / Trans Doc No.</th>
                      <th className="p-1.5 border-r border-slate-900">From</th>
                      <th className="p-1.5 border-r border-slate-900">Entered Date</th>
                      <th className="p-1.5 border-r border-slate-900">Entered By</th>
                      <th className="p-1.5 text-center">Portal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border-r border-slate-900">{data.mode || 'Road'}</td>
                      <td className="p-2 border-r border-slate-900 font-mono font-black text-slate-950 text-sm">{data.vehicleNo || 'MH15JW1118'}</td>
                      <td className="p-2 border-r border-slate-900">{data.vehicleFrom || 'Nashik'}</td>
                      <td className="p-2 border-r border-slate-900">{data.vehicleEnteredDate || data.generatedDate}</td>
                      <td className="p-2 border-r border-slate-900 font-mono">{data.from?.gstin || '27AAEFW3842N1ZN'}</td>
                      <td className="p-2 text-center font-bold">1</td>
                    </tr>
                  </tbody>
                </table>

                {/* Barcode Footer */}
                <div className="p-3 text-center bg-slate-50 flex flex-col items-center justify-center">
                  <div className="font-mono text-xl tracking-[0.25em] font-black border-y border-slate-900 py-1 px-4">
                    ||| | | |||| | || |||| | ||| || ||| ||||
                  </div>
                  <span className="font-mono text-[11px] mt-1 text-slate-700 font-bold">{data.ewayBillNo?.replace(/\s/g, '')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
