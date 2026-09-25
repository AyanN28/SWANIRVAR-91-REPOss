import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, ShieldCheck } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900/95 text-amber-300 px-4 py-2.5 text-xs font-semibold shadow-2xl border border-amber-400/40 backdrop-blur-md animate-bounce">
      <div className="flex items-center gap-1.5">
        <WifiOff className="w-4 h-4 text-rose-400" />
        <span className="text-white font-bold">Offline Mode Active</span>
      </div>
      <span className="text-white/40">|</span>
      <div className="flex items-center gap-1 text-slate-300 text-[11px]">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Cached Spatial Data &amp; Local Scheme Math</span>
      </div>
    </div>
  );
};
