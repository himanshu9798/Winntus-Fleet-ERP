import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Plus, 
  AlertCircle,
  CreditCard,
  Briefcase
} from 'lucide-react';
import { INITIAL_CLIENTS } from '../data/mockData';

export default function KYCManager({ clients, onUpdateClients }) {
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || 'cli-01');
  const [isAddingClient, setIsAddingClient] = useState(false);

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

  const handleToggleDoc = (docKey) => {
    const updated = clients.map(c => {
      if (c.id === selectedClientId) {
        const newDocs = { ...c.kycDocs, [docKey]: !c.kycDocs[docKey] };
        const allVerified = Object.values(newDocs).every(v => v === true);
        return {
          ...c,
          kycDocs: newDocs,
          kycStatus: allVerified ? "Verified" : "Pending Audit"
        };
      }
      return c;
    });
    onUpdateClients(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white font-display">Client CRM & 4-Point KYC Verification</h2>
            <span className="bg-sky-500/20 text-sky-300 text-xs px-2 py-0.5 rounded-full border border-sky-500/30">
              {clients.length} Contractors
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Mandatory compliance onboarding (GST, PAN, Work Order, Aadhar) & 5 Security Cheques Vault.
          </p>
        </div>

        <button
          onClick={() => {
            const name = prompt("Enter Contractor Company Name:");
            if (name) {
              const newClient = {
                id: `cli-${Date.now()}`,
                companyName: name,
                contactPerson: "Site Project Manager",
                mobile: "9800000000",
                email: "info@contractor.com",
                address: "Nashik, Maharashtra",
                siteLocation: "Nashik Construction Site",
                gstin: "27AAACN0000A1Z5",
                pan: "AAACN0000A",
                stateCode: "27",
                activeSite: "Tower Project",
                currentMonthlyRent: 0,
                depositHeld: 0,
                securityChequesReceived: 0,
                kycStatus: "Pending Audit",
                kycDocs: { gstCert: false, panCard: false, workOrder: false, aadharCard: false },
                itemsOnSiteCount: 0,
                totalWeightMT: 0
              };
              onUpdateClients([newClient, ...clients]);
              setSelectedClientId(newClient.id);
            }
          }}
          className="flex items-center gap-1.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard New Contractor</span>
        </button>
      </div>

      {/* Main Grid: Client List & KYC Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Contractors</h3>
          <div className="space-y-2">
            {clients.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedClientId(c.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedClientId === c.id 
                    ? 'bg-sky-950/40 border-sky-500/50 shadow-lg' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs">{c.companyName}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                    c.kycStatus === 'Verified' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {c.kycStatus === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {c.kycStatus}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 mt-2 space-y-1">
                  <p className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{c.siteLocation}</span>
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-slate-300">
                    <span>Active Rent: <strong className="text-sky-400">₹{c.currentMonthlyRent?.toLocaleString()}/mo</strong></span>
                    <span>{c.itemsOnSiteCount} Pcs ({c.totalWeightMT} MT)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Detailed Dashboard */}
        <div className="lg:col-span-2 space-y-5">
          {/* Client Overview Card */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-slate-400 font-mono">Contractor Profile & KYC Audit</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedClient.companyName}</h3>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                selectedClient.kycStatus === 'Verified' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                KYC STATUS: {selectedClient.kycStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 text-slate-300">
                <p><strong>Contact Person:</strong> {selectedClient.contactPerson}</p>
                <p><strong>Mobile:</strong> <span className="text-sky-400 font-mono font-medium">{selectedClient.mobile}</span></p>
                <p><strong>Email:</strong> {selectedClient.email}</p>
                <p><strong>GSTIN:</strong> <span className="font-mono text-amber-400 font-bold">{selectedClient.gstin}</span></p>
                <p><strong>PAN:</strong> <span className="font-mono">{selectedClient.pan}</span></p>
              </div>
              <div className="space-y-2 text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <p className="text-slate-400 font-semibold">Registered Godown & Billing Address:</p>
                <p className="text-[11px] text-slate-300">{selectedClient.address}</p>
                <p className="text-slate-400 font-semibold pt-1">Active Site Dispatch Location:</p>
                <p className="text-[11px] text-amber-300 font-medium">{selectedClient.siteLocation}</p>
              </div>
            </div>

            {/* Financial & Cheques Security Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400">3-Mo Advance Held</span>
                <p className="text-base font-bold text-emerald-400 mt-1">₹{selectedClient.depositHeld?.toLocaleString()}</p>
                <span className="text-[10px] text-slate-500">Refundable on site closure</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400">Security Cheques Vault</span>
                <p className="text-base font-bold text-purple-400 mt-1">{selectedClient.securityChequesReceived} / 5 Cheques</p>
                <span className="text-[10px] text-slate-500">Without date cheques deposited</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400">Equipment on Site</span>
                <p className="text-base font-bold text-sky-400 mt-1">{selectedClient.totalWeightMT} MT</p>
                <span className="text-[10px] text-slate-500">{selectedClient.itemsOnSiteCount} components deployed</span>
              </div>
            </div>
          </div>

            {/* 4-Point Mandatory KYC Document Checklist (Clause 9 from PDF 1) */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                4-Point KYC Compliance Verification (Clause 9)
              </h4>
              <span className="text-xs text-slate-400">Click toggle to verify / reject</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Doc 1 */}
              <div 
                onClick={() => handleToggleDoc('gstCert')}
                className={`p-3.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                  selectedClient.kycDocs?.gstCert 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                    : 'bg-red-950/20 border-red-500/40 text-red-300'
                }`}
              >
                <div>
                  <p className="font-bold text-xs">1. Company GST Registration</p>
                  <p className="text-[10px] text-slate-400">3-Page Certificate with Nashik / MH address</p>
                </div>
                {selectedClient.kycDocs?.gstCert ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>

              {/* Doc 2 */}
              <div 
                onClick={() => handleToggleDoc('panCard')}
                className={`p-3.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                  selectedClient.kycDocs?.panCard 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                    : 'bg-red-950/20 border-red-500/40 text-red-300'
                }`}
              >
                <div>
                  <p className="font-bold text-xs">2. Company PAN Card</p>
                  <p className="text-[10px] text-slate-400 font-mono">PAN: {selectedClient.pan}</p>
                </div>
                {selectedClient.kycDocs?.panCard ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>

              {/* Doc 3 */}
              <div 
                onClick={() => handleToggleDoc('workOrder')}
                className={`p-3.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                  selectedClient.kycDocs?.workOrder 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                    : 'bg-red-950/20 border-red-500/40 text-red-300'
                }`}
              >
                <div>
                  <p className="font-bold text-xs">3. Site Address Proof</p>
                  <p className="text-[10px] text-slate-400">Work order copy or client contract proof</p>
                </div>
                {selectedClient.kycDocs?.workOrder ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>

              {/* Doc 4 */}
              <div 
                onClick={() => handleToggleDoc('aadharCard')}
                className={`p-3.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                  selectedClient.kycDocs?.aadharCard 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                    : 'bg-red-950/20 border-red-500/40 text-red-300'
                }`}
              >
                <div>
                  <p className="font-bold text-xs">4. Aadhar Card of Authorized Signatory</p>
                  <p className="text-[10px] text-slate-400">{selectedClient.contactPerson}</p>
                </div>
                {selectedClient.kycDocs?.aadharCard ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
