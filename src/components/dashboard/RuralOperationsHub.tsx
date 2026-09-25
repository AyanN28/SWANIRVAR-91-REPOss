import React, { useState } from 'react';
import { EnterpriseState } from './dashboardTypes';
import {
  Mic,
  MicOff,
  Volume2,
  Plus,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Clock,
  Sparkles,
  Zap,
  Building,
  RefreshCw,
  Wallet,
  Coins,
  Send,
  Trash2,
} from 'lucide-react';
import { ProvenanceBadge } from './ProvenanceBadge';

interface RuralOperationsHubProps {
  enterprise: EnterpriseState;
  onSpeak: (text: string) => void;
}

interface LedgerEntry {
  id: string;
  date: string;
  type: 'sale' | 'purchase' | 'expense';
  item: string;
  qty: string;
  rate: number;
  total: number;
  customerOrSupplier: string;
  paymentMode: 'Cash' | 'UPI' | 'Udhaar';
}

interface InventoryItem {
  id: string;
  sku: string;
  category: string;
  qtyKg: number;
  costBasis: number;
  marketRate: number;
  ageDays: number;
  status: 'Fresh' | 'Normal' | 'Aging Alert' | 'Dead Stock';
}

interface ReceivableItem {
  id: string;
  customerName: string;
  amount: number;
  dueDate: string;
  ageDays: number;
  phone: string;
  status: 'Current' | 'Overdue 1-30d' | 'Critical 31-60d' | 'Default Risk';
}

export const RuralOperationsHub: React.FC<RuralOperationsHubProps> = ({ enterprise, onSpeak }) => {
  const [activeTab, setActiveTab] = useState<'bolKhata' | 'gullak' | 'inventory' | 'receivables' | 'aa'>('bolKhata');

  // 1. BOL-KHATA STATE (Section 30)
  const [voiceQuery, setVoiceQuery] = useState('Aaj 80 kilo tea becha ₹200 kilo ke rate se Dhupguri Dhaba ko');
  const [isListening, setIsListening] = useState(false);
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([
    {
      id: 'l-1',
      date: 'Today, 10:30 AM',
      type: 'sale',
      item: 'Organic Dooars CTC Blend (500g)',
      qty: '80 kg',
      rate: 200,
      total: 16000,
      customerOrSupplier: 'Dhupguri Highway Dhaba',
      paymentMode: 'UPI',
    },
    {
      id: 'l-2',
      date: 'Yesterday, 04:15 PM',
      type: 'sale',
      item: 'First Flush Green Leaf Vacuum Foil',
      qty: '25 kg',
      rate: 340,
      total: 8500,
      customerOrSupplier: 'Gairkata Weekly Haat Shoppers',
      paymentMode: 'Cash',
    },
    {
      id: 'l-3',
      date: '21 Sep 2026',
      type: 'purchase',
      item: 'Raw Green Leaf Procurement (Banarhat STG)',
      qty: '200 kg',
      rate: 42,
      total: 8400,
      customerOrSupplier: 'Banarhat Small Tea Growers Co-op',
      paymentMode: 'UPI',
    },
    {
      id: 'l-4',
      date: '20 Sep 2026',
      type: 'sale',
      item: 'CTC Secondary Grade Tea Bag Packs',
      qty: '40 kg',
      rate: 180,
      total: 7200,
      customerOrSupplier: 'Gairkata Station Tea Stall',
      paymentMode: 'Udhaar',
    },
  ]);

  // Voice NER Parser for Bol-Khata
  const handleParseVoiceQuery = (query: string) => {
    const lower = query.toLowerCase();
    let qty = '50 kg';
    let rate = 220;
    let customer = 'Local Bazaar Buyer';
    let item = 'Fresh Dooars Tea Leaf';

    const qtyMatch = query.match(/(\d+)\s*(kilo|kg|packet|bori)/i);
    if (qtyMatch) {
      qty = `${qtyMatch[1]} kg`;
    }

    const rateMatch = query.match(/₹?\s*(\d+)\s*(kilo|rate|rupaye)/i);
    if (rateMatch) {
      rate = parseInt(rateMatch[1], 10);
    }

    if (lower.includes('dhaba')) customer = 'Highway Dhaba';
    if (lower.includes('stall')) customer = 'Local Tea Stall';
    if (lower.includes('haat')) customer = 'Weekly Haat Customer';

    const total = (parseInt(qty, 10) || 50) * rate;

    const newEntry: LedgerEntry = {
      id: `l-${Date.now()}`,
      date: 'Just now',
      type: lower.includes('kharida') || lower.includes('procured') ? 'purchase' : 'sale',
      item,
      qty,
      rate,
      total,
      customerOrSupplier: customer,
      paymentMode: lower.includes('udhaar') || lower.includes('baaki') ? 'Udhaar' : 'Cash',
    };

    setLedgerEntries([newEntry, ...ledgerEntries]);
    onSpeak(`Understood: Recorded sale of ${qty} at rupees ${rate} per kilo to ${customer}. Total recorded rupees ${total.toLocaleString()}.`);
  };

  // 2. DIGITAL GULLAK STATE (Section 31)
  const totalSales = ledgerEntries.filter((e) => e.type === 'sale').reduce((acc, e) => acc + e.total, 0);
  const totalPurchases = ledgerEntries.filter((e) => e.type === 'purchase').reduce((acc, e) => acc + e.total, 0);
  const totalCashBalance = totalSales - totalPurchases + 45000; // baseline cash
  const redPotWorkingCapital = Math.round(totalCashBalance * 0.70);
  const greenPotSurplusProfit = totalCashBalance - redPotWorkingCapital;
  const workingCapitalSafetyThreshold = 35000;
  const isReserveSafe = redPotWorkingCapital >= workingCapitalSafetyThreshold;

  // 3. INVENTORY & DEAD STOCK (Section 32)
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>([
    {
      id: 'inv-1',
      sku: 'TEA-DOOARS-CTC-250G',
      category: 'Branded Retail Foil Pack',
      qtyKg: 140,
      costBasis: 160,
      marketRate: 260,
      ageDays: 14,
      status: 'Fresh',
    },
    {
      id: 'inv-2',
      sku: 'TEA-GREEN-FLUSH-100G',
      category: 'Fine Plucked Green Leaf',
      qtyKg: 65,
      costBasis: 220,
      marketRate: 380,
      ageDays: 22,
      status: 'Normal',
    },
    {
      id: 'inv-3',
      sku: 'TEA-FANNINGS-MONSOON-BULK',
      category: 'Unblended Rain Flush Fannings',
      qtyKg: 180,
      costBasis: 135,
      marketRate: 175,
      ageDays: 39,
      status: 'Aging Alert',
    },
    {
      id: 'inv-4',
      sku: 'TEA-DUST-LOOSE-BAGS',
      category: 'Unbranded Paper Sacks',
      qtyKg: 95,
      costBasis: 110,
      marketRate: 140,
      ageDays: 48,
      status: 'Dead Stock',
    },
  ]);

  // 4. CREDIT & RECEIVABLES (Section 33)
  const [receivablesList, setReceivablesList] = useState<ReceivableItem[]>([
    {
      id: 'rec-1',
      customerName: 'Gairkata Station Road Dhaba',
      amount: 4800,
      dueDate: '28 Sep 2026',
      ageDays: 8,
      phone: '+91 98321 00000',
      status: 'Current',
    },
    {
      id: 'rec-2',
      customerName: 'Banarhat Bus Stand Tea Corner',
      amount: 3200,
      dueDate: '15 Sep 2026',
      ageDays: 19,
      phone: '+91 98321 11111',
      status: 'Overdue 1-30d',
    },
    {
      id: 'rec-3',
      customerName: 'Binaguri Weekly Kirana Hub',
      amount: 7600,
      dueDate: '25 Aug 2026',
      ageDays: 42,
      phone: '+91 98321 22222',
      status: 'Critical 31-60d',
    },
  ]);

  // 5. ACCOUNT AGGREGATOR MOCK (Section 34)
  const [aaConnected, setAaConnected] = useState(true);
  const cashFlowHealthScore = 82; // 0-100

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#083b5e] via-[#0c4f36] to-[#17211b] text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-amber-400/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider mb-1">
            <Coins className="w-4 h-4" />
            <span>Rural Business Operations Engine (Sections 30–34)</span>
            <ProvenanceBadge type="VERIFIED" source="Bol-Khata Engine & Core Ledger" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Bol-Khata, Digital Gullak & Working Capital Ops
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mt-1">
            Voice-first ledger accounting, dual-pot capital reserves, inventory aging alerts, and receivables tracking for micro-enterprises.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              onSpeak(
                `Rural Operations Command for ${enterprise.businessType}. Total cash balance is ₹${totalCashBalance.toLocaleString()}. Red Pot working capital is ₹${redPotWorkingCapital.toLocaleString()} against a safety runway of ₹${workingCapitalSafetyThreshold.toLocaleString()}. Digital gullak health is strong.`
              )
            }
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-white/20"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span>Voice Summary</span>
          </button>
        </div>
      </div>

      {/* Primary Tool Switcher Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { key: 'bolKhata', label: '1. Bol-Khata (Voice Ledger)', icon: Mic },
          { key: 'gullak', label: '2. Digital Gullak (Dual Pots)', icon: Wallet },
          { key: 'inventory', label: '3. Inventory & Dead Stock', icon: AlertTriangle },
          { key: 'receivables', label: '4. Receivables (Udhaar Aging)', icon: Clock },
          { key: 'aa', label: '5. Account Aggregator & Health', icon: Building },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                isActive
                  ? 'bg-[#083b5e] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. BOL-KHATA (VOICE LEDGER - SECTION 30) */}
      {activeTab === 'bolKhata' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-rose-600" />
                  <span>Bolo-Aur-Likho (Speak to Record Transaction)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Natural language Hinglish/Bengali ledger entry. Natural Entity Recognition extracts Quantity, Price, Product & Counterparty.
                </p>
              </div>

              <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Cash In Hand: ₹{totalCashBalance.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Input Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={voiceQuery}
                  onChange={(e) => setVoiceQuery(e.target.value)}
                  placeholder="e.g. Aaj 80 kilo tea becha ₹200 kilo ke rate se Dhupguri Dhaba ko"
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#083b5e] shadow-inner"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleParseVoiceQuery(voiceQuery)}
                  className="bg-[#083b5e] hover:bg-[#062c46] text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 shadow transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Record Entry</span>
                </button>

                <button
                  onClick={() => {
                    setVoiceQuery('Aaj 40 packet green tea becha ₹350 ke hisaab se weekly haat mein');
                    handleParseVoiceQuery('Aaj 40 packet green tea becha ₹350 ke hisaab se weekly haat mein');
                  }}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs px-3 py-3 rounded-xl transition-colors border border-amber-300"
                  title="Try Sample Voice String"
                >
                  Sample Prompt
                </button>
              </div>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Recent Bol-Khata Transactions</span>
              <span className="text-xs text-slate-500 font-normal">{ledgerEntries.length} records in audit journal</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                  <tr>
                    <th className="p-3">Time & Date</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Product / Particulars</th>
                    <th className="p-3">Qty & Unit Rate</th>
                    <th className="p-3">Counterparty</th>
                    <th className="p-3">Mode</th>
                    <th className="p-3 text-right">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ledgerEntries.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-slate-500 whitespace-nowrap">{row.date}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.type === 'sale'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {row.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-900">{row.item}</td>
                      <td className="p-3 text-slate-600">
                        {row.qty} @ ₹{row.rate}/kg
                      </td>
                      <td className="p-3 text-slate-700 font-medium">{row.customerOrSupplier}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.paymentMode === 'UPI'
                              ? 'bg-blue-100 text-blue-800'
                              : row.paymentMode === 'Cash'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {row.paymentMode}
                        </span>
                      </td>
                      <td className="p-3 text-right font-black text-slate-900">
                        {row.type === 'sale' ? '+' : '-'}₹{row.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. DIGITAL GULLAK (DUAL POTS - SECTION 31) */}
      {activeTab === 'gullak' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Green Pot: Surplus Profit */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 p-6 rounded-3xl border-2 border-emerald-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-emerald-950">GREEN POT: Surplus Profit</h3>
                    <p className="text-[11px] text-emerald-700">Available disposable savings for family & growth</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                  Unrestricted
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-2xs">
                <div className="text-xs text-slate-500 font-bold uppercase">Surplus Reserve Balance</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-800 mt-1">
                  ₹{greenPotSurplusProfit.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-700 font-medium mt-1">
                  Safe for reinvestment or family drawings without starving production.
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1.5 pt-1">
                <div className="flex justify-between border-b border-emerald-100 pb-1">
                  <span>Gross Operating Profit:</span>
                  <strong className="text-slate-900">₹{(totalSales - totalPurchases).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between border-b border-emerald-100 pb-1">
                  <span>Allocated to Working Capital (70%):</span>
                  <strong className="text-slate-900">₹{redPotWorkingCapital.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Available Entrepreneur Surplus (30%):</span>
                  <strong className="text-emerald-700 font-black">₹{greenPotSurplusProfit.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Red Pot: Working Capital Reserve */}
            <div className="bg-gradient-to-br from-rose-50 via-white to-amber-50/30 p-6 rounded-3xl border-2 border-rose-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#9b3430] flex items-center justify-center text-white shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-rose-950">RED POT: Working Capital Reserve</h3>
                    <p className="text-[11px] text-rose-700">Protected leaf procurement & wage buffer</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-300">
                  Protected Buffer
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-rose-100 shadow-2xs">
                <div className="text-xs text-slate-500 font-bold uppercase">Locked Operating Reserve</div>
                <div className="text-3xl sm:text-4xl font-black text-[#9b3430] mt-1">
                  ₹{redPotWorkingCapital.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 font-medium mt-1">
                  Threshold target: ₹{workingCapitalSafetyThreshold.toLocaleString()} (30-day runway)
                </div>
              </div>

              {isReserveSafe ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Reserve above safety threshold. Sufficient liquidity for upcoming flush procurement.</span>
                </div>
              ) : (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Working capital reserve is below configured safety threshold! Pause unessential capex.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. INVENTORY & DEAD STOCK (SECTION 32) */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Inventory Aging & Dead-Stock Liquidation Trigger</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Continuous shelf-life monitoring to prevent tea aroma degradation and working capital freeze.
                </p>
              </div>

              <button
                onClick={() =>
                  alert(
                    'Reverse Auction Broadcast Triggered! Alerted 14 regional tea blenders in Dhupguri & Siliguri to bid on 95 kg aging stock at 12% discounted reserve price.'
                  )
                }
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Broadcast Reverse Auction</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                  <tr>
                    <th className="p-3">SKU Code</th>
                    <th className="p-3">Category Description</th>
                    <th className="p-3">Stock On Hand</th>
                    <th className="p-3">Cost Basis</th>
                    <th className="p-3">Market Rate</th>
                    <th className="p-3">Batch Age</th>
                    <th className="p-3">Liquidation Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {inventoryList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900">{item.sku}</td>
                      <td className="p-3 text-slate-700">{item.category}</td>
                      <td className="p-3 font-bold text-slate-900">{item.qtyKg} kg</td>
                      <td className="p-3 text-slate-500">₹{item.costBasis}/kg</td>
                      <td className="p-3 font-semibold text-emerald-700">₹{item.marketRate}/kg</td>
                      <td className="p-3">
                        <span
                          className={`font-black ${
                            item.ageDays > 40
                              ? 'text-rose-700'
                              : item.ageDays > 30
                              ? 'text-amber-700'
                              : 'text-slate-700'
                          }`}
                        >
                          {item.ageDays} Days
                        </span>
                      </td>
                      <td className="p-3">
                        {item.status === 'Dead Stock' ? (
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
                            15% Discount Clearance Trigger
                          </span>
                        ) : item.status === 'Aging Alert' ? (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                            Bundle with Festive Puja Packs
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            Optimal Freshness
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. CREDIT & RECEIVABLES (UDHAAR AGING - SECTION 33) */}
      {activeTab === 'receivables' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Customer Receivables (Udhaar Khata Ageing)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Track overdue credits, protect working capital from bad debt, and generate one-click WhatsApp reminders.
                </p>
              </div>

              <div className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                Total Overdue Credit: ₹
                {receivablesList.reduce((acc, r) => acc + r.amount, 0).toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {receivablesList.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-[#083b5e] transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{rec.customerName}</h4>
                      <span className="text-[11px] text-slate-500 font-mono">{rec.phone}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rec.status === 'Critical 31-60d'
                          ? 'bg-rose-100 text-rose-800'
                          : rec.status === 'Overdue 1-30d'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Pending Balance</div>
                      <div className="text-lg font-black text-rose-700">₹{rec.amount.toLocaleString()}</div>
                    </div>

                    <button
                      onClick={() =>
                        alert(
                          `WhatsApp payment reminder link prepared for ${rec.customerName} for pending balance of ₹${rec.amount} with UPI QR.`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm"
                    >
                      <Send className="w-3 h-3" />
                      <span>Reminder</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. ACCOUNT AGGREGATOR (SECTION 34) */}
      {activeTab === 'aa' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-700" />
                  <span>RBI-Regulated Account Aggregator (AA) Integration Boundary</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Consent-based bank statement fetch without storing raw credentials (Setu / Sahamati standard).
                </p>
              </div>

              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black rounded-full text-xs border border-emerald-300">
                Consent Active · Live Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="text-xs text-slate-400 font-bold uppercase">Cash Flow Health Score</div>
                <div className="text-3xl font-black text-[#083b5e]">{cashFlowHealthScore} / 100</div>
                <div className="text-[11px] text-emerald-700 font-semibold">Healthy bank operating liquidity</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="text-xs text-slate-400 font-bold uppercase">Monthly Inflow Run-Rate</div>
                <div className="text-3xl font-black text-emerald-700">₹1,85,000</div>
                <div className="text-[11px] text-slate-500 font-medium">Derived from 6-month transaction history</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="text-xs text-slate-400 font-bold uppercase">Clean DSCR Margin</div>
                <div className="text-3xl font-black text-slate-900">1.82x</div>
                <div className="text-[11px] text-slate-500 font-medium">Exceeds RBI 1.25x minimum requirement</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
