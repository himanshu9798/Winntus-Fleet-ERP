import React, { useState } from 'react';
import { 
  FileText, 
  X, 
  Download, 
  ExternalLink, 
  Printer, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  Maximize2,
  BookOpen,
  Eye,
  FileCheck,
  Receipt,
  FileSpreadsheet,
  FileBox
} from 'lucide-react';

export default function UserManualModal({ isOpen, onClose }) {
  // Available real PDF files
  const pdfList = [
    {
      id: 'manual',
      title: 'WINNTUS ERP Complete Illustrated User Manual (सचित्र यूजर मैनुअल)',
      subtitle: 'Complete Guide: What is ERP, Contractor Step-by-Step, Admin Stock/Tariff Control & 9 Clauses',
      url: '/manual.pdf',
      badge: 'Main Guide (मुख्य मैनुअल)',
      pages: '4 Pages A4',
      icon: BookOpen,
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'doc1',
      title: 'Doc 1: Winntus Quotation & Delivery Challan (कोटेशन व डिलीवरी चालान)',
      subtitle: 'Original Document: Client details, itemized rate cards, Annexure-A dispatch challan',
      url: '/docs/1_Winntus_Quotation_Challan.pdf',
      badge: 'Real PDF #1',
      pages: 'Original PDF',
      icon: FileCheck,
      color: 'from-sky-600 to-blue-700'
    },
    {
      id: 'doc2',
      title: 'Doc 2: Commercial Rental Agreement (9 Legal Clauses एग्रीमेंट)',
      subtitle: 'Original Document: 9 legal rental clauses, security deposit, freight, loading/unloading terms',
      url: '/docs/2_Winntus_Agreement_9_Clauses.pdf',
      badge: 'Real PDF #2',
      pages: 'Original PDF',
      icon: ShieldCheck,
      color: 'from-amber-600 to-orange-700'
    },
    {
      id: 'doc3',
      title: 'Doc 3: Scaffolding Technical Specs & Rate Matrix (उत्पाद व दर सूची)',
      subtitle: 'Original Document: Cuplock, Props, Spigots, Clamps with unit weight (Kg) and hire tariffs',
      url: '/docs/3_Winntus_Product_Specs_Rates.pdf',
      badge: 'Real PDF #3',
      pages: 'Original PDF',
      icon: Layers,
      color: 'from-emerald-600 to-teal-700'
    },
    {
      id: 'doc4',
      title: 'Doc 4: Final GST Tax Invoice & Ledger Reconciliation (टैक्स इनवॉइस)',
      subtitle: 'Original Document: Monthly 18% GST invoice, depot ledger, advance security adjustment',
      url: '/docs/4_Winntus_Tax_Invoice_Ledger.pdf',
      badge: 'Real PDF #4',
      pages: 'Original PDF',
      icon: Receipt,
      color: 'from-purple-600 to-violet-700'
    }
  ];

  const [activePdf, setActivePdf] = useState(pdfList[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-1 sm:p-3 overflow-hidden animate-in fade-in duration-200">
      
      {/* Main Container Window */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl shadow-2xl max-w-7xl w-full h-[95vh] flex flex-col border border-slate-700 overflow-hidden">
        
        {/* TOP BAR */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Logo & Document Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white font-black shadow-md border border-purple-400/40 shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black text-white font-display tracking-tight">
                  WINNTUS Official PDF Documents &amp; User Guide
                </h2>
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Real PDF Viewer
                </span>
              </div>
              <p className="text-xs text-slate-400">
                असली PDF डाक्यूमेंट्स, सचित्र गाइड व 4 ओरिजिनल डाक्यूमेंट्स व्यूअर
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Open in New Tab Button */}
            <a
              href={activePdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md transition-all active:scale-95"
              title="Open full PDF in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">नए टैब में खोलें (Open PDF)</span>
            </a>

            {/* Direct Download PDF Button */}
            <a
              href={activePdf.url}
              download
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md transition-all active:scale-95"
              title="Download this PDF file directly"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF डाउनलोड करें</span>
            </a>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700 ml-1"
              title="Close PDF Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF SELECTOR STRIP TABS */}
        <div className="bg-slate-950/80 border-b border-slate-800 px-3 py-2 flex items-center gap-2 overflow-x-auto text-xs shrink-0 no-scrollbar">
          {pdfList.map((pdf, idx) => {
            const Icon = pdf.icon;
            const isSelected = activePdf.id === pdf.id;
            return (
              <button
                key={pdf.id}
                onClick={() => setActivePdf(pdf)}
                className={`px-3 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-400 shadow-lg scale-100 ring-2 ring-violet-500/50'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{idx === 0 ? '📖 ' + pdf.badge : pdf.badge}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {pdf.pages}
                </span>
              </button>
            );
          })}
        </div>

        {/* MAIN BODY: SPLIT VIEW (LEFT INFO SIDEBAR + RIGHT NATIVE PDF EMBED) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-950">
          
          {/* LEFT SIDEBAR: Current Document Info & Direct Download Links */}
          <div className="w-full lg:w-80 bg-slate-900/95 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 flex flex-col justify-between overflow-y-auto shrink-0 gap-4">
            
            <div className="space-y-4">
              
              {/* Active Document Header Box */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-bold text-[#ffe500] uppercase tracking-wider block mb-1">
                  Active Document
                </span>
                <h3 className="text-sm font-black text-white leading-snug font-display">
                  {activePdf.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {activePdf.subtitle}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-blue-500/30">
                    File: {activePdf.url.split('/').pop()}
                  </span>
                </div>
              </div>

              {/* All 5 PDF Direct Downloads list */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                  सभी 5 PDF डाक्यूमेंट्स सूची:
                </span>
                <div className="space-y-1.5">
                  {pdfList.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActivePdf(item)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${
                        activePdf.id === item.id
                          ? 'bg-blue-950/70 border-blue-500/80 text-white font-bold'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                        activePdf.id === item.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block truncate text-[11px]">{item.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono block">{item.pages}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                <span className="font-bold block mb-1 text-amber-300">💡 PDF देखने की टिप:</span>
                यदि आपके ब्राउज़र में इनबिल्ट PDF व्यूअर लोड नहीं हो रहा है, तो ऊपर दिए गए <strong>"नए टैब में खोलें"</strong> या <strong>"PDF डाउनलोड करें"</strong> बटन पर क्लिक करें।
              </div>

            </div>

            {/* Bottom Download All Action */}
            <div className="pt-2 border-t border-slate-800">
              <a
                href={activePdf.url}
                download
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs py-2.5 rounded-xl shadow-lg transition-all active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>यह PDF फाइल डाउनलोड करें</span>
              </a>
            </div>

          </div>

          {/* RIGHT VIEWPORT: EMBEDDED REAL PDF VIEWER */}
          <div className="flex-1 h-full bg-slate-900 flex flex-col relative overflow-hidden">
            
            {/* Embedded Native PDF Viewer using Object / iFrame */}
            <object
              data={`${activePdf.url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
              type="application/pdf"
              className="w-full h-full min-h-[500px] border-none bg-slate-800"
            >
              {/* Fallback if browser doesn't embed PDF */}
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-300 space-y-4">
                <FileText className="w-16 h-16 text-blue-400 animate-pulse" />
                <h3 className="text-lg font-bold text-white">
                  {activePdf.title}
                </h3>
                <p className="text-xs text-slate-400 max-w-md">
                  ब्राउज़र इनलाइन PDF प्रीव्यू के बजाय आप सीधे इस PDF फाइल को डाउनलोड कर सकते हैं या नए टैब में देख सकते हैं।
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={activePdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>नए टैब में PDF खोलें</span>
                  </a>
                  <a
                    href={activePdf.url}
                    download
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF डाउनलोड करें</span>
                  </a>
                </div>
              </div>
            </object>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="bg-slate-950 border-t border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span className="text-slate-300 font-medium">
              सक्रिय PDF: {activePdf.badge}
            </span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-[11px] text-slate-400">{activePdf.url}</span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/manual.pdf"
              download="WINNTUS_ERP_User_Manual.pdf"
              className="text-yellow-400 hover:text-yellow-300 font-bold text-[11px] underline flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>डाउनलोड मुख्य यूजर मैनुअल (PDF)</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
