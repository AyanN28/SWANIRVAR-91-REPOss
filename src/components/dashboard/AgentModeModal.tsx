import React, { useState } from 'react';
import { EnterpriseState } from './dashboardTypes';
import {
  Users,
  ShieldCheck,
  Building,
  CheckCircle2,
  Plus,
  ArrowRight,
  X,
  FileText,
  UserCheck,
} from 'lucide-react';
import { ProvenanceBadge } from './ProvenanceBadge';

interface AgentModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEnterprise: EnterpriseState;
  onSwitchEnterprise: (enterprise: EnterpriseState) => void;
}

export const AgentModeModal: React.FC<AgentModeModalProps> = ({
  isOpen,
  onClose,
  currentEnterprise,
  onSwitchEnterprise,
}) => {
  if (!isOpen) return null;

  const [managedEntrepreneurs, setManagedEntrepreneurs] = useState<
    {
      id: string;
      name: string;
      village: string;
      block: string;
      business: string;
      capital: number;
      dprStatus: 'Ready' | 'In Progress' | 'Sanctioned';
      lat: number;
      lng: number;
    }[]
  >([
    {
      id: 'ent-1',
      name: 'Ramesh Barman',
      village: 'Gairkata',
      block: 'Dhupguri, Jalpaiguri',
      business: 'Organic Dooars Tea Leaf & Processing Unit',
      capital: 250000,
      dprStatus: 'Ready',
      lat: 26.5894,
      lng: 89.007,
    },
    {
      id: 'ent-2',
      name: 'Sunita Roy',
      village: 'Banarhat',
      block: 'Malbazar, Jalpaiguri',
      business: 'Broiler Poultry & Solar Cold Room Feed Unit',
      capital: 150000,
      dprStatus: 'In Progress',
      lat: 26.7981,
      lng: 89.0305,
    },
    {
      id: 'ent-3',
      name: 'Debashis Das',
      village: 'Mainaguri',
      block: 'Mainaguri, Jalpaiguri',
      business: 'Cold-Pressed Mustard Oil Ghani Expeller',
      capital: 300000,
      dprStatus: 'Sanctioned',
      lat: 26.5613,
      lng: 88.8242,
    },
    {
      id: 'ent-4',
      name: 'Parvati Devi',
      village: 'Nagrakata',
      block: 'Nagrakata, Jalpaiguri',
      business: 'Village Dairy Chilling & Traditional Ghee Hub',
      capital: 200000,
      dprStatus: 'Ready',
      lat: 26.892,
      lng: 88.913,
    },
  ]);

  const handleSelect = (ent: (typeof managedEntrepreneurs)[0]) => {
    onSwitchEnterprise({
      businessType: ent.business,
      locationName: ent.village,
      districtName: 'Jalpaiguri',
      stateName: 'West Bengal',
      lat: ent.lat,
      lng: ent.lng,
      radiusKm: 10,
      capitalAmount: ent.capital,
      observedPrice: '260',
      category: 'Special',
      locationType: 'Rural',
      scanned: true,
      lastSync: new Date().toLocaleTimeString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#083b5e] to-[#0c4f36] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Assisted VLE / CSC / SHG Agent Mode (Section 35)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Village Level Entrepreneur (VLE) Multi-Citizen Console
          </h2>
          <p className="text-xs text-slate-200 mt-1">
            Assisted operator mode with strict tenant isolation. One authenticated CSC operator assists multiple local citizens.
          </p>
        </div>

        {/* List of Managed Citizens */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>Registered Rural Entrepreneurs ({managedEntrepreneurs.length})</span>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              VLE ID: WB-JAL-CSC-49102
            </span>
          </div>

          <div className="space-y-3">
            {managedEntrepreneurs.map((ent) => {
              const isCurrent = currentEnterprise.locationName === ent.village;
              return (
                <div
                  key={ent.id}
                  onClick={() => handleSelect(ent)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-blue-50/80 border-[#083b5e] ring-2 ring-[#083b5e]/20'
                      : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{ent.name}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#083b5e] text-white">
                          Active Session
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#083b5e]">{ent.business}</p>
                    <div className="text-[11px] text-slate-500">
                      {ent.village}, {ent.block} · Capital: ₹{ent.capital.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                        ent.dprStatus === 'Sanctioned'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : ent.dprStatus === 'Ready'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      DPR {ent.dprStatus}
                    </span>

                    <button className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1 shadow-sm">
                      <span>Switch</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500">Strict Tenant Isolation Enforced</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
