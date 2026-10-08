import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  HardHat, 
  Sparkles,
  TrendingUp,
  Package
} from 'lucide-react';
import { INITIAL_PRODUCTS, COMPANY_INFO } from '../data/mockData';

export default function InventoryManager({ products, onUpdateProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scrapWeightKg, setScrapWeightKg] = useState(100);

  const categories = ['All', 'Cuplock', 'Ledger', 'Shuttering', 'Props', 'Walkway', 'Accessories', 'Pipes'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.size.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalGodownPcs = products.reduce((acc, p) => acc + p.stockGodown, 0);
  const totalRentPcs = products.reduce((acc, p) => acc + p.stockOnRent, 0);
  const totalWeightRentMT = (products.reduce((acc, p) => acc + (p.stockOnRent * p.unitWeightKg), 0) / 1000).toFixed(1);
  const totalWeightGodownMT = (products.reduce((acc, p) => acc + (p.stockGodown * p.unitWeightKg), 0) / 1000).toFixed(1);
  const overallUtilization = Math.round((totalRentPcs / (totalGodownPcs + totalRentPcs)) * 100);

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards (Flipkart Seller Hub Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>On-Site Equipment (Out on Rent)</span>
            <div className="w-7 h-7 rounded bg-blue-50 text-[#2874f0] flex items-center justify-center font-bold">
              <HardHat className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalRentPcs.toLocaleString()} <span className="text-xs text-slate-500 font-normal">PCS</span></p>
          <p className="text-xs text-[#2874f0] mt-1 font-mono font-bold">{totalWeightRentMT} Metric Tons on Site</p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Godown Yard Ready Stock</span>
            <div className="w-7 h-7 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalGodownPcs.toLocaleString()} <span className="text-xs text-slate-500 font-normal">PCS</span></p>
          <p className="text-xs text-emerald-700 mt-1 font-mono font-bold">{totalWeightGodownMT} Metric Tons Ready</p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Fleet Utilization Rate</span>
            <div className="w-7 h-7 rounded bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2">{overallUtilization}%</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#2874f0] h-full rounded-full" style={{ width: `${overallUtilization}%` }}></div>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700 font-bold flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-red-500" /> Loss / Scrap Clause 7
            </span>
            <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-mono font-bold">₹65/kg + 18%</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input 
              type="number" 
              value={scrapWeightKg} 
              onChange={e => setScrapWeightKg(Number(e.target.value))}
              className="w-16 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs text-slate-900" 
            />
            <span className="text-xs text-slate-500">kg lost = </span>
            <span className="text-xs font-black text-emerald-700 font-mono">
              ₹{Math.round(scrapWeightKg * 65 * 1.18).toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Automatic scrap compensation calculation</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search equipment, sizes..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#2874f0] w-56"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#2874f0] text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            const newItem = {
              id: `custom-${Date.now()}`,
              name: "New Scaffolding Component",
              category: "Cuplock",
              size: "Standard",
              unitWeightKg: 5.0,
              rateDay: 0.50,
              rateMonth: 15.00,
              stockGodown: 500,
              stockOnRent: 0,
              image: "/images/cuplock.jpg"
            };
            onUpdateProducts([newItem, ...products]);
          }}
          className="flex items-center gap-1.5 bg-[#2874f0] hover:bg-[#1754be] text-white text-xs font-bold px-3 py-2 rounded shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Rate Master Table (PDF Document 2) */}
      <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Scaffolding & Shuttering Rate Master (Document 2)
            </h3>
            <p className="text-xs text-slate-500">
              Winntus Official Rental Tariffs in Rs. and Paise
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Showing {filteredProducts.length} items
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Product / Material</th>
                <th className="p-3">Size Available</th>
                <th className="p-3 text-right">Unit Wt. (Kg)</th>
                <th className="p-3 text-right">Rate / Day (₹)</th>
                <th className="p-3 text-right">Rate / Month (₹)</th>
                <th className="p-3 text-center">Godown Yard Stock</th>
                <th className="p-3 text-center">On-Site Rent Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-10 h-10 object-contain rounded border border-slate-200 bg-white shrink-0 p-0.5" 
                      />
                      <div>
                        <span className="font-bold text-slate-900 text-xs block">{p.name}</span>
                        <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 font-semibold">
                          {p.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono font-medium text-slate-700">{p.size}</td>
                  <td className="p-3 text-right font-mono text-slate-700">{p.unitWeightKg} kg</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    ₹{p.rateDay?.toFixed(2)}
                  </td>
                  <td className="p-3 text-right font-mono font-black text-[#2874f0]">
                    ₹{p.rateMonth?.toFixed(2)}
                  </td>
                  <td className="p-3 text-center">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                      {p.stockGodown} pcs
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono">
                      {p.stockOnRent} pcs
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        const newRate = prompt(`Enter new Monthly Rate for ${p.name}:`, p.rateMonth);
                        if (newRate !== null) {
                          const updated = products.map(item => item.id === p.id ? { 
                            ...item, 
                            rateMonth: Number(newRate), 
                            rateDay: Number((Number(newRate) / 30).toFixed(2)) 
                          } : item);
                          onUpdateProducts(updated);
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-[#2874f0] hover:bg-slate-100 rounded transition-colors"
                      title="Edit Tariff"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
