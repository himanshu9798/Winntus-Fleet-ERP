import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Truck, 
  HelpCircle, 
  CreditCard, 
  Award, 
  Clock, 
  ChevronUp, 
  HardHat, 
  FileText, 
  Receipt, 
  Layers, 
  ArrowRight, 
  Code2, 
  Heart,
  BookOpen,
  Scale
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function Footer({ onNavigate, onOpenManual }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="no-print bg-slate-950 text-slate-300 text-xs w-full mt-16 border-t border-purple-900/40 relative overflow-hidden">
      
      {/* Top Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-24 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-24 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Smooth "Back to Top" Ribbon */}
      <button
        onClick={scrollToTop}
        className="w-full bg-slate-900 hover:bg-violet-950/80 text-purple-200 hover:text-white py-3 text-center text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border-b border-purple-900/30"
      >
        <ChevronUp className="w-4 h-4 text-violet-400" />
        <span>Back to Top</span>
      </button>

      {/* Main Multi-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Column 1: About Winntus Group */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center font-bold text-white shadow-md shadow-purple-500/20 border border-purple-400/30">
                W
              </div>
              <div>
                <span className="font-display font-black text-base text-white tracking-tight block">
                  WINNTUS GROUP
                </span>
                <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider block">
                  Enterprise Scaffolding ERP
                </span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              ISO 9001:2008 Certified Leader in heavy-duty modular Cuplock scaffolding, adjustable CT prop jacks, steel shuttering plates &amp; construction equipment rentals across Maharashtra.
            </p>

            <div className="pt-1 space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>ISO 9001:2008 Certified Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Computerized Weight Slip Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-violet-400" />
                <span>Clause 7 Loss Rate: ₹65/Kg + 18% GST</span>
              </div>
            </div>
          </div>

          {/* Column 2: Equipment Fleet */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>Certified Fleet Items</span>
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Cuplock Standards (Vertical 2.5m/3.0m)
              </li>
              <li className="hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Cuplock Ledgers (1.0m / 1.5m / 2.0m)
              </li>
              <li className="hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                CT Shuttering Props (Acrow Jacks 2m–4m)
              </li>
              <li className="hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Base &amp; U-Head Jacks (350mm / 450mm)
              </li>
              <li className="hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Right Angle Couplers &amp; Swivel Clamps
              </li>
              <li className="hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                MS Perforated Walkway Challi Boards
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial & Legal Terms */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Commercial Terms (9 Clauses)</span>
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>• <strong>Clause 1:</strong> 20% Refundable Security Deposit</li>
              <li>• <strong>Clause 2:</strong> Min 30 Days Hire Billing Cycle</li>
              <li>• <strong>Clause 3:</strong> Transport &amp; Loading at Hirer's Cost</li>
              <li>• <strong>Clause 5:</strong> Clean Concrete-Free Return Condition</li>
              <li>• <strong>Clause 7:</strong> Shortage / Damage @ ₹65/Kg replacement</li>
              <li>• <strong>Clause 9:</strong> Legal Jurisdiction: Nashik Courts</li>
            </ul>
          </div>

          {/* Column 4: PDF Manuals & Support */}
          <div className="space-y-3.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official PDF Documents</span>
            </h4>
            
            <p className="text-[11px] text-slate-400">
              Access the complete illustrated software guide and 4 original commercial documents.
            </p>

            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>📖 यूजर गाइड व 5 PDFs खोलें</span>
              </button>
            )}

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p>📍 <strong>Depot #2:</strong> MIDC Ambad, Nashik, MH</p>
              <p>📞 <strong>Helpline:</strong> +91 98112 34567</p>
              <p>✉️ <strong>Email:</strong> support@winntus.com</p>
            </div>
          </div>

        </div>

        {/* Bottom Credits Strip */}
        <div className="border-t border-purple-900/40 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 WINNTUS Scaffolding &amp; Shuttering ERP. All Rights Reserved.</p>
          
          {/* Developer Credit */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-purple-800/60 shadow-inner text-slate-300">
            <Code2 className="w-3.5 h-3.5 text-violet-400" />
            <span>Developed with <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" /> by <strong className="text-white font-bold">Himanshu</strong></span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[10px]">
            <span>ISO 9001:2008</span>
            <span>•</span>
            <span>GST Registered</span>
            <span>•</span>
            <span>Annexure-A Format</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
