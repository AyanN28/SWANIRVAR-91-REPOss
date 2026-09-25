import React, { useState } from 'react';
import { SwanirvarLogo } from '../SwanirvarLogo';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { VoiceSaathiLogo } from '../VoiceSaathiLogo';
import { PWAInstallButton } from '../PWAInstallButton';
import { DashboardTab } from './dashboardTypes';
import {
  Menu,
  X,
  MapPin,
  Compass,
  Users,
  Target,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  IndianRupee,
  FileText,
  Landmark,
  LayoutDashboard,
  LogOut,
  Home,
  CheckCircle2,
  Crosshair,
} from 'lucide-react';

interface DashboardHeaderProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  userName: string;
  userRole: string;
  onNavigateHome: () => void;
  onLogout?: () => void;
  onOpenVoiceModal: () => void;
  onOpenOrchestrator?: () => void;
  onOpenOnboarding?: () => void;
  onOpenAdmin?: () => void;
  onOpenAgentMode?: () => void;
}

export const JOURNEY_STEPS: { id: DashboardTab; label: string; short: string; icon: any }[] = [
  { id: 'location', label: 'Location', short: '1. Location', icon: MapPin },
  { id: 'area', label: 'Area', short: '2. Area', icon: Compass },
  { id: 'people', label: 'People', short: '3. People', icon: Users },
  { id: 'customer', label: 'Customer', short: '4. Customer', icon: Target },
  { id: 'competitor', label: 'Competitor', short: '5. Competitor', icon: Crosshair },
  { id: 'market', label: 'Market', short: '6. Market', icon: ShoppingBag },
  { id: 'validation', label: 'Validation', short: '7. Validation', icon: ShieldCheck },
  { id: 'gtm', label: 'GTM', short: '8. GTM', icon: TrendingUp },
  { id: 'financials', label: 'Financials', short: '9. Financials', icon: IndianRupee },
  { id: 'dpr', label: 'DPR', short: '10. DPR', icon: FileText },
  { id: 'bank', label: 'Bank', short: '11. Bank', icon: Landmark },
  { id: 'operations', label: 'Operations', short: '12. Ops Hub', icon: ShoppingBag },
  { id: 'training', label: 'Simulator', short: '13. Simulator', icon: ShieldCheck },
];

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  onSelectTab,
  userName,
  userRole,
  onNavigateHome,
  onLogout,
  onOpenVoiceModal,
  onOpenOrchestrator,
  onOpenOnboarding,
  onOpenAdmin,
  onOpenAgentMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeIndex = JOURNEY_STEPS.findIndex((s) => s.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-[#083b5e] text-white shadow-md border-b-2 border-[#e59a18]">
      {/* Top Institutional Bar */}
      <div className="bg-[#052840] border-b border-white/10 px-3 sm:px-6 py-1.5 text-xs flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          {onOpenOrchestrator && (
            <button
              onClick={onOpenOrchestrator}
              className="text-[11px] font-bold text-amber-300 hover:text-white bg-amber-400/10 hover:bg-amber-400/20 px-2 py-0.5 rounded transition-colors"
            >
              ⚡ 16-Step Pipeline
            </button>
          )}
          {onOpenOnboarding && (
            <button
              onClick={onOpenOnboarding}
              className="text-[11px] font-bold text-slate-300 hover:text-white px-2 py-0.5 rounded hover:bg-white/5 transition-colors hidden sm:inline"
            >
              Recalibrate
            </button>
          )}
          {onOpenAgentMode && (
            <button
              onClick={onOpenAgentMode}
              className="text-[11px] font-bold text-slate-300 hover:text-white px-2 py-0.5 rounded hover:bg-white/5 transition-colors"
            >
              VLE Agent Mode
            </button>
          )}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-[11px] font-bold text-slate-300 hover:text-white px-2 py-0.5 rounded hover:bg-white/5 transition-colors"
            >
              Admin Console
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <PWAInstallButton variant="header" />
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors py-0.5 px-2 rounded hover:bg-white/5"
            title="Back to Landing Page"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Back to Portal</span>
          </button>
          <span className="text-white/30">|</span>
          <LanguageSwitcher />
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1 text-red-300 hover:text-red-100 hover:bg-red-900/30 px-2 py-0.5 rounded transition-colors text-xs"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Brand & Actions Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => onSelectTab('overview')}
            className="group flex items-center gap-2 sm:gap-3 text-left focus:outline-none"
            title="Command Center"
          >
            <div className="p-1 rounded-xl bg-gradient-to-br from-white to-slate-100 shadow-sm border border-amber-400/40">
              <SwanirvarLogo className="h-8 sm:h-9 w-auto" idPrefix="dashHeader" />
            </div>
          </button>
        </div>

        {/* Action Controls: Voice Saathi + User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            onClick={onOpenVoiceModal}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg shadow-sm border border-amber-300/60 text-xs sm:text-sm transition-all transform hover:scale-[1.02]"
            title="Ask Voice Saathi in your language"
          >
            <VoiceSaathiLogo className="w-4 h-4 text-slate-950" />
            <span className="hidden md:inline">Voice Saathi</span>
            <span className="md:hidden">Voice</span>
          </button>

          <div className="hidden lg:flex flex-col text-right pr-1">
            <span className="text-xs font-bold text-white leading-tight">{userName}</span>
            <span className="text-[10px] text-amber-300/90 leading-tight">{userRole}</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Progressive Business Journey Stepper Bar */}
      <div className="bg-[#0b4870] border-t border-white/10 px-2 sm:px-4 py-2 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[760px] gap-1 text-xs">
          {/* Overview Tab Button */}
          <button
            onClick={() => onSelectTab('overview')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <div className="h-4 w-px bg-white/20" />

          {/* Stepper items */}
          {JOURNEY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeTab === step.id;
            const isCompleted = activeIndex > idx && activeIndex !== -1;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => onSelectTab(step.id)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                    isCurrent
                      ? 'bg-white text-[#083b5e] font-bold shadow-sm ring-1 ring-amber-400'
                      : isCompleted
                      ? 'text-emerald-300 hover:bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  title={step.label}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#083b5e]' : 'text-amber-300'}`} />
                  )}
                  <span>{step.short}</span>
                </button>
                {idx < JOURNEY_STEPS.length - 1 && (
                  <span className="text-white/30 text-xs select-none">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#052840] border-t border-white/20 px-4 py-3 space-y-1.5 shadow-xl animate-in slide-in-from-top duration-150">
          <div className="text-[11px] uppercase tracking-wider text-amber-300 font-bold px-2 py-1">
            Journey Modules
          </div>
          <button
            onClick={() => {
              onSelectTab('overview');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${
              activeTab === 'overview' ? 'bg-amber-400 text-slate-950' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Command Center Overview</span>
          </button>
          {JOURNEY_STEPS.map((step) => {
            const Icon = step.icon;
            const isCurrent = activeTab === step.id;
            return (
              <button
                key={step.id}
                onClick={() => {
                  onSelectTab(step.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                  isCurrent
                    ? 'bg-white text-[#083b5e] font-bold shadow'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-amber-300" />
                  <span>{step.label}</span>
                </div>
                <span className="text-xs text-white/50">{step.short}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
