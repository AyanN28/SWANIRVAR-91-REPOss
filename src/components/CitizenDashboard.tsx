import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translateDOMSubtree } from '../utils/domTranslator';
import { DashboardHeader, JOURNEY_STEPS } from './dashboard/DashboardHeader';
import { DashboardTab, EnterpriseState } from './dashboard/dashboardTypes';
import { LocationModule } from './dashboard/LocationModule';
import { AreaPeopleModule } from './dashboard/AreaPeopleModule';
import { CustomerModule } from './dashboard/CustomerModule';
import { CompetitorModule } from './dashboard/CompetitorModule';
import { MarketGtmModule } from './dashboard/MarketGtmModule';
import { ValidationModule } from './dashboard/ValidationModule';
import { FinancialsModule } from './dashboard/FinancialsModule';
import { DprBankModule } from './dashboard/DprBankModule';
import { OverviewModule } from './dashboard/OverviewModule';
import { RuralOperationsHub } from './dashboard/RuralOperationsHub';
import { GamifiedTrainingModule } from './dashboard/GamifiedTrainingModule';
import { OnboardingWizardModal } from './dashboard/OnboardingWizardModal';
import { AnalysisOrchestratorModal } from './dashboard/AnalysisOrchestratorModal';
import { AdminConsoleModal } from './dashboard/AdminConsoleModal';
import { AgentModeModal } from './dashboard/AgentModeModal';
import { RiskRegisterSwotModal } from './dashboard/RiskRegisterSwotModal';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import {
  speakText,
  stopSpeaking,
  isCurrentlySpeaking,
  VoiceOutputLanguage,
} from '../utils/textToSpeech';
import { VolumeX } from 'lucide-react';

interface CitizenDashboardProps {
  userName?: string;
  userRole?: string;
  onNavigateHome: () => void;
  onLogout?: () => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  userName = 'Citizen Entrepreneur',
  userRole = 'Verified MSME / VLE Promoter',
  onNavigateHome,
  onLogout,
}) => {
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Modals state
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [orchestratorOpen, setOrchestratorOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [agentModeOpen, setAgentModeOpen] = useState(false);
  const [riskSwotOpen, setRiskSwotOpen] = useState(false);

  // Central Enterprise State
  const [enterprise, setEnterprise] = useState<EnterpriseState>({
    stateName: 'West Bengal',
    districtName: 'Jalpaiguri',
    locationName: 'Gairkata',
    businessType: 'Organic Dooars Tea Leaf & Processing Unit',
    capitalAmount: 150000,
    observedPrice: '280',
    category: 'General',
    locationType: 'Rural',
    lat: 26.5894,
    lng: 89.0070,
    radiusKm: 10,
    scanned: true,
  });

  // Keep DOM translation synced across tabs and modals
  useEffect(() => {
    if (typeof document !== 'undefined') {
      translateDOMSubtree(document.body, currentLanguage);
      const t1 = setTimeout(() => translateDOMSubtree(document.body, currentLanguage), 50);
      const t2 = setTimeout(() => translateDOMSubtree(document.body, currentLanguage), 200);
      const t3 = setTimeout(() => translateDOMSubtree(document.body, currentLanguage), 500);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [
    activeTab,
    currentLanguage,
    onboardingOpen,
    orchestratorOpen,
    adminOpen,
    agentModeOpen,
    riskSwotOpen,
    enterprise,
  ]);

  // Voice narration helper
  const handleSpeak = (text: string) => {
    stopSpeaking();
    const langCode = (['bn', 'hi', 'en'].includes(currentLanguage)
      ? currentLanguage
      : 'en') as VoiceOutputLanguage;

    setIsSpeaking(true);
    speakText(text, langCode, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const updateEnterprise = (partial: Partial<EnterpriseState>) => {
    setEnterprise((prev) => ({ ...prev, ...partial }));
  };

  // Stepper forward navigation helper
  const handleStepNext = (current: DashboardTab) => {
    const sequence: DashboardTab[] = [
      'overview',
      'location',
      'area',
      'people',
      'customer',
      'competitor',
      'market',
      'validation',
      'gtm',
      'financials',
      'dpr',
      'bank',
      'operations',
      'training',
    ];
    const currentIndex = sequence.indexOf(current);
    if (currentIndex >= 0 && currentIndex < sequence.length - 1) {
      const nextTab = sequence[currentIndex + 1];
      setActiveTab(nextTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#17211b] font-sans selection:bg-amber-400/30 selection:text-slate-900 pb-16">
      {/* Top Header with Dynamic Navbar */}
      <DashboardHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userName={userName}
        userRole={userRole}
        onNavigateHome={onNavigateHome}
        onLogout={onLogout}
        onOpenVoiceModal={() => setVoiceModalOpen(true)}
        onOpenOrchestrator={() => setOrchestratorOpen(true)}
        onOpenOnboarding={() => setOnboardingOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenAgentMode={() => setAgentModeOpen(true)}
      />

      {/* Floating Stop Speech Button if audio is currently reading */}
      {isSpeaking && (
        <button
          onClick={handleStopSpeaking}
          className="fixed bottom-6 right-6 z-50 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs animate-bounce"
          title="Stop reading aloud"
        >
          <VolumeX className="w-4 h-4" />
          <span>Stop Voice</span>
        </button>
      )}

      {/* Main Workspace Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'overview' && (
          <OverviewModule
            enterprise={enterprise}
            onSelectTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSpeak={handleSpeak}
            onOpenOrchestrator={() => setOrchestratorOpen(true)}
            onOpenOnboarding={() => setOnboardingOpen(true)}
            onOpenRiskSwot={() => setRiskSwotOpen(true)}
            onOpenAgentMode={() => setAgentModeOpen(true)}
            onOpenAdmin={() => setAdminOpen(true)}
          />
        )}

        {activeTab === 'location' && (
          <LocationModule
            enterprise={enterprise}
            onUpdateEnterprise={updateEnterprise}
            onProceedNext={() => handleStepNext('location')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'area' && (
          <AreaPeopleModule
            enterprise={enterprise}
            activeSection="area"
            onProceedNext={() => handleStepNext('area')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'people' && (
          <AreaPeopleModule
            enterprise={enterprise}
            activeSection="people"
            onProceedNext={() => handleStepNext('people')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'customer' && (
          <CustomerModule
            enterprise={enterprise}
            onProceedNext={() => handleStepNext('customer')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'competitor' && (
          <CompetitorModule
            enterprise={enterprise}
            onProceedNext={() => handleStepNext('competitor')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'market' && (
          <MarketGtmModule
            enterprise={enterprise}
            activeSection="market"
            onProceedNext={() => handleStepNext('market')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'gtm' && (
          <MarketGtmModule
            enterprise={enterprise}
            activeSection="gtm"
            onProceedNext={() => handleStepNext('gtm')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'validation' && (
          <ValidationModule
            enterprise={enterprise}
            onProceedNext={() => handleStepNext('validation')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'financials' && (
          <FinancialsModule
            enterprise={enterprise}
            onUpdateEnterprise={updateEnterprise}
            onProceedNext={() => handleStepNext('financials')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'dpr' && (
          <DprBankModule
            enterprise={enterprise}
            activeSection="dpr"
            onProceedNext={() => handleStepNext('dpr')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'bank' && (
          <DprBankModule
            enterprise={enterprise}
            activeSection="bank"
            onProceedNext={() => handleStepNext('bank')}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'operations' && (
          <RuralOperationsHub
            enterprise={enterprise}
            onSpeak={handleSpeak}
          />
        )}

        {activeTab === 'training' && (
          <GamifiedTrainingModule
            enterprise={enterprise}
            onSpeak={handleSpeak}
          />
        )}
      </main>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        pageContext="dashboard"
      />

      {/* Section 34: Voice-First Onboarding & Recalibration Wizard */}
      <OnboardingWizardModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        enterprise={enterprise}
        onSaveEnterprise={(updated) => {
          updateEnterprise(updated);
          setOrchestratorOpen(true);
        }}
        onSpeak={handleSpeak}
      />

      {/* Section 45: Live 16-Step Analysis Pipeline */}
      <AnalysisOrchestratorModal
        isOpen={orchestratorOpen}
        onClose={() => setOrchestratorOpen(false)}
        enterprise={enterprise}
        onComplete={() => setActiveTab('overview')}
      />

      {/* Sections 19 & 20: 11-Category Risk Register & SWOT Modal */}
      <RiskRegisterSwotModal
        isOpen={riskSwotOpen}
        onClose={() => setRiskSwotOpen(false)}
        enterprise={enterprise}
      />

      {/* Section 35: Assisted VLE Agent Mode Modal */}
      <AgentModeModal
        isOpen={agentModeOpen}
        onClose={() => setAgentModeOpen(false)}
        currentEnterprise={enterprise}
        onSwitchEnterprise={(newEnt) => setEnterprise(newEnt)}
      />

      {/* Sections 5, 41, 42, 43, 49: Enterprise Admin Console & PostGIS ERD */}
      <AdminConsoleModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
};
