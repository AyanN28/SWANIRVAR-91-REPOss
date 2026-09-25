import React, { useState, useEffect } from 'react';
import { EnterpriseState } from './dashboardTypes';
import { fetchFeasibilityAi, fetchExtractIntentNlp } from '../../services/spatialApiService';
import {
  Mic,
  MicOff,
  Volume2,
  CheckCircle2,
  Undo2,
  Sparkles,
  MapPin,
  IndianRupee,
  Briefcase,
  Store,
  ArrowRight,
  ArrowLeft,
  X,
  Compass,
  Loader2,
} from 'lucide-react';

interface OnboardingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  enterprise: EnterpriseState;
  onSaveEnterprise: (updated: Partial<EnterpriseState>) => void;
  onSpeak: (text: string) => void;
}

interface StepData {
  businessType: string;
  locationName: string;
  districtName: string;
  stateName: string;
  lat: number;
  lng: number;
  capitalAmount: number;
  occupation: string;
  experienceYears: number;
  customerDemand: string;
  rawInputNotes: string;
}

export const OnboardingWizardModal: React.FC<OnboardingWizardModalProps> = ({
  isOpen,
  onClose,
  enterprise,
  onSaveEnterprise,
  onSpeak,
}) => {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiStatusMessage, setAiStatusMessage] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  const [undoTimer, setUndoTimer] = useState<number | null>(null);
  const [lastCommittedState, setLastCommittedState] = useState<EnterpriseState | null>(null);

  const [formData, setFormData] = useState<StepData>({
    businessType: enterprise.businessType || 'Organic Dooars Tea Leaf & Processing Unit',
    locationName: enterprise.locationName || 'Gairkata',
    districtName: enterprise.districtName || 'Jalpaiguri',
    stateName: enterprise.stateName || 'West Bengal',
    lat: enterprise.lat || 26.5894,
    lng: enterprise.lng || 89.007,
    capitalAmount: enterprise.capitalAmount || 250000,
    occupation: 'Smallholder Tea Grower / Agrarian Entrepreneur',
    experienceYears: 4,
    customerDemand: 'Daily fresh CTC packaging, high tea stall consumption, highway transit footfall',
    rawInputNotes: 'Voice captured & normalized via Indic NER pipeline',
  });

  // Voice recognition simulation / native web speech
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type or use quick chips.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleVoiceNerParse(text, currentStep);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e) {
      setIsRecording(false);
    }
  };

  // Natural Entity Recognition (NER) parser for voice input
  const handleVoiceNerParse = async (text: string, step: number) => {
    const lower = text.toLowerCase();

    // If a full sentence with multi-field intent is spoken (e.g. "Ami Murshidabad er Domkal e thaki, amar kache 50,000 taka ache, ami dairy korte chai")
    if (text.split(' ').length >= 4 || text.includes('thaki') || text.includes('ache') || text.includes('rehta') || text.includes('chahiye')) {
      try {
        const intent = await fetchExtractIntentNlp(text);
        if (intent) {
          setFormData((prev) => ({
            ...prev,
            businessType: intent.businessCategory ? `${intent.businessCategory} Micro-Enterprise` : prev.businessType,
            locationName: intent.locationName || prev.locationName,
            districtName: intent.districtName || prev.districtName,
            stateName: intent.stateName || prev.stateName,
            capitalAmount: intent.marginCapital || prev.capitalAmount,
          }));
          return;
        }
      } catch (err) {
        console.warn('NLP async parse error, falling back to local regex:', err);
      }
    }

    if (step === 1) {
      if (lower.includes('tea') || lower.includes('chai')) {
        setFormData((prev) => ({ ...prev, businessType: 'Organic Dooars Tea Leaf & Processing Unit' }));
      } else if (lower.includes('oil') || lower.includes('tel') || lower.includes('shorshe')) {
        setFormData((prev) => ({ ...prev, businessType: 'Cold-Pressed Mustard Oil Ghani Unit' }));
      } else if (lower.includes('dairy') || lower.includes('doodh') || lower.includes('dudh')) {
        setFormData((prev) => ({ ...prev, businessType: 'Village Dairy Chilling & Ghee Packaging' }));
      } else if (lower.includes('handloom') || lower.includes('saree') || lower.includes('tant')) {
        setFormData((prev) => ({ ...prev, businessType: 'Handloom Khadi & Silk Weaving Workshop' }));
      } else if (lower.includes('makhana')) {
        setFormData((prev) => ({ ...prev, businessType: 'Makhana Roasting & Processing Unit' }));
      } else {
        setFormData((prev) => ({ ...prev, businessType: text }));
      }
    } else if (step === 2) {
      setFormData((prev) => ({ ...prev, locationName: text }));
    } else if (step === 3) {
      const numMatch = text.match(/\d+/g);
      if (numMatch) {
        const parsed = parseInt(numMatch.join(''), 10);
        if (parsed > 0) {
          const val = parsed < 1000 ? parsed * 1000 : parsed;
          setFormData((prev) => ({ ...prev, capitalAmount: val }));
        }
      }
    }
  };

  // Step questions & voice prompts
  const questions = [
    {
      step: 1,
      hindi: 'Namaste! Aap kya banana ya shuru karna chahte hain?',
      english: 'What rural enterprise or product do you want to create?',
      chips: [
        'Organic Dooars Tea Leaf & Processing Unit',
        'Cold-Pressed Mustard Oil Ghani Unit',
        'Village Dairy Chilling & Ghee Packaging',
        'Clay Pottery & Terracotta Handicrafts',
        'Bamboo Craft & Furniture Cluster',
        'Mushroom Cultivation & Solar Dry Unit',
      ],
    },
    {
      step: 2,
      hindi: 'Business kahan shuru karna chahte hain?',
      english: 'Where will your business be located (Village / Block / District)?',
      chips: [
        'Gairkata, Dhupguri, Jalpaiguri (West Bengal)',
        'Banarhat, Malbazar, Jalpaiguri (West Bengal)',
        'Madurai East, Madurai (Tamil Nadu)',
        'Niphad, Nashik (Maharashtra)',
        'Panchayat Hub, Varanasi (Uttar Pradesh)',
      ],
    },
    {
      step: 3,
      hindi: 'Apne business mein kitna paisa (Margin Equity) laga sakte hain?',
      english: 'How much capital can you invest from your own savings (10% Margin)?',
      chips: ['₹1,00,000', '₹2,50,000', '₹5,00,000', '₹7,50,000', '₹10,00,000'],
    },
    {
      step: 4,
      hindi: 'Abhi aap kya kaam karte hain aur kitne saal ka anubhav hai?',
      english: 'What is your current occupation and business experience?',
      chips: [
        'Smallholder Tea Plucker / Planter (4 years)',
        'Agrarian Farmer / Paddy Grower (6 years)',
        'Village Retail Kirana Shopkeeper (3 years)',
        'Self-Help Group (SHG) Member (5 years)',
        'Artisan / Rural Craftsman (8 years)',
      ],
    },
    {
      step: 5,
      hindi: 'Aapke aas-paas ke log aur dukaandar kya kharidte hain?',
      english: 'What do local customers, weekly haats, and transit travelers buy most?',
      chips: [
        'Daily fresh packaged CTC leaf for home tea & dhabas',
        'Cold pressed pure mustard oil for festive cooking',
        'Local fresh milk, curd and unadulterated cottage paneer',
        'Eco-friendly bamboo mats, baskets and homeware',
      ],
    },
  ];

  const currentQ = questions[currentStep - 1];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinalCommit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinalCommit = async () => {
    setIsGeneratingAi(true);
    setAiStatusMessage('Synthesizing 5–10 km market reach, competitor density & SWOT with Gemini AI...');
    setLastCommittedState(enterprise);

    let aiData = enterprise.aiFeasibilityData;
    try {
      aiData = await fetchFeasibilityAi({
        businessType: formData.businessType,
        locationName: formData.locationName,
        districtName: formData.districtName,
        stateName: formData.stateName,
        capitalAmount: formData.capitalAmount,
        locationType: enterprise.locationType || 'Rural',
        language: 'en',
      });
      setAiStatusMessage('Feasibility & loan structuring synthesized successfully!');
    } catch (err) {
      console.warn('Feasibility AI call warning:', err);
    } finally {
      setIsGeneratingAi(false);
    }

    onSaveEnterprise({
      businessType: formData.businessType,
      locationName: formData.locationName,
      districtName: formData.districtName,
      stateName: formData.stateName,
      capitalAmount: formData.capitalAmount,
      lat: formData.lat,
      lng: formData.lng,
      scanned: true,
      aiFeasibilityData: aiData,
    });

    onSpeak(
      `Congratulations! Profile created for ${formData.businessType} in ${formData.locationName}. Margin capital registered at rupees ${formData.capitalAmount.toLocaleString('en-IN')}. AI feasibility study, SWOT, and 10 percent margin loan engine are active.`
    );

    // 30-second undo window
    setUndoTimer(30);
    const interval = setInterval(() => {
      setUndoTimer((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          onClose();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleUndo = () => {
    if (lastCommittedState) {
      onSaveEnterprise(lastCommittedState);
      setUndoTimer(null);
      alert('Changes reverted to previous state.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#083b5e] to-[#0c4f36] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Progressive Voice-First Enterprise Intake (Section 4)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Conversational Business Onboarding
          </h2>
          <p className="text-xs text-slate-200 mt-1">
            Build or recalibrate your rural enterprise in 5 simple questions. No complex government forms.
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === currentStep
                    ? 'w-8 bg-amber-400'
                    : s < currentStep
                    ? 'w-4 bg-emerald-400'
                    : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Question Card */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider">
                Screen {currentStep} of 5
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                "{currentQ.hindi}"
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">{currentQ.english}</p>
            </div>
            <button
              onClick={() => onSpeak(`${currentQ.hindi}. ${currentQ.english}`)}
              className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shrink-0 shadow-sm"
              title="Read Question Aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Step Inputs */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Proposed Enterprise / Business Idea
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="flex-1 p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#083b5e]"
                    placeholder="e.g. Organic Dooars Tea Leaf & Processing Unit"
                  />
                  <button
                    onClick={toggleVoiceInput}
                    className={`p-3 rounded-xl flex items-center gap-1 font-bold text-xs transition-colors shadow-sm ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                    title="Bolo (Speak)"
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-700" />}
                    <span>{isRecording ? 'Listening...' : 'Bolo'}</span>
                  </button>
                </div>
              </div>

              {/* Indic Full Voice Utterance Quick Parsers */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[11px] font-bold text-blue-900 uppercase">
                    Try Natural Indic Voice Phrases (Auto-Extracts Location, Margin & Scheme):
                  </span>
                </div>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => handleVoiceNerParse('Ami Murshidabad er Domkal e thaki, amar kache 50,000 taka ache, ami dairy korte chai', 1)}
                    className="w-full text-left p-2 rounded-lg bg-white hover:bg-blue-100/60 border border-blue-200/70 text-xs font-semibold text-blue-950 flex items-center justify-between transition-colors"
                  >
                    <span>🎙️ &quot;Ami Murshidabad er Domkal e thaki, amar kache 50,000 taka ache, ami dairy korte chai&quot;</span>
                    <span className="text-[10px] text-blue-600 font-bold shrink-0 bg-blue-100 px-2 py-0.5 rounded">Bengali (Domkal + ₹50k Dairy)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVoiceNerParse('मैं गाजीपुर के बक्षा में रहता हूँ, मेरे पास 1,00,000 रुपये हैं, मुझे सरसों का तेल मिल लगाना है', 1)}
                    className="w-full text-left p-2 rounded-lg bg-white hover:bg-blue-100/60 border border-blue-200/70 text-xs font-semibold text-blue-950 flex items-center justify-between transition-colors"
                  >
                    <span>🎙️ &quot;मैं गाजीपुर के बक्षा में रहता हूँ, मेरे पास 1,00,000 रुपये हैं, मुझे सरसों का तेल मिल लगाना है&quot;</span>
                    <span className="text-[10px] text-emerald-700 font-bold shrink-0 bg-emerald-100 px-2 py-0.5 rounded">Hindi (Ghazipur + ₹1L Oil)</span>
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-2">
                  Quick Select (Tap to Choose):
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentQ.chips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setFormData({ ...formData, businessType: chip })}
                      className={`text-xs px-3 py-2 rounded-xl border text-left transition-all ${
                        formData.businessType === chip
                          ? 'bg-[#083b5e] text-white border-[#083b5e] shadow-sm font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Village / Town</label>
                  <input
                    type="text"
                    value={formData.locationName}
                    onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">District</label>
                  <input
                    type="text"
                    value={formData.districtName}
                    onChange={(e) => setFormData({ ...formData, districtName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={formData.stateName}
                    onChange={(e) => setFormData({ ...formData, stateName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-2">
                  Demonstration Geographies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentQ.chips.map((loc) => {
                    const parts = loc.split(', ');
                    const village = parts[0];
                    const district = parts[2]?.replace(' (West Bengal)', '') || 'Jalpaiguri';
                    const isSelected = formData.locationName === village;

                    return (
                      <button
                        key={loc}
                        onClick={() => {
                          if (village === 'Gairkata') {
                            setFormData({
                              ...formData,
                              locationName: 'Gairkata',
                              districtName: 'Jalpaiguri',
                              stateName: 'West Bengal',
                              lat: 26.5894,
                              lng: 89.007,
                            });
                          } else if (village.includes('Madurai')) {
                            setFormData({
                              ...formData,
                              locationName: 'Madurai East',
                              districtName: 'Madurai',
                              stateName: 'Tamil Nadu',
                              lat: 9.9252,
                              lng: 78.1198,
                            });
                          } else if (village.includes('Niphad')) {
                            setFormData({
                              ...formData,
                              locationName: 'Niphad',
                              districtName: 'Nashik',
                              stateName: 'Maharashtra',
                              lat: 20.0768,
                              lng: 74.1082,
                            });
                          } else {
                            setFormData({
                              ...formData,
                              locationName: village,
                              districtName: district,
                              stateName: 'West Bengal',
                              lat: 26.5894,
                              lng: 89.007,
                            });
                          }
                        }}
                        className={`text-xs px-3 py-2 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#083b5e] text-white border-[#083b5e] font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                        }`}
                      >
                        <MapPin className="w-3 h-3 inline mr-1 text-amber-500" />
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Margin Equity (Your Capital Investment)
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      value={formData.capitalAmount}
                      onChange={(e) => setFormData({ ...formData, capitalAmount: Number(e.target.value) || 0 })}
                      className="w-full pl-8 pr-3 py-3 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:border-[#083b5e]"
                    />
                  </div>
                </div>
              </div>

              {/* 10% Margin Rule Explanation */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Deterministic 10% Capital Rule (Section 22)</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Supported Project Cost</div>
                    <div className="text-base font-black text-[#083b5e]">
                      ₹{(formData.capitalAmount / 0.1).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Max Bank Loan (90%)</div>
                    <div className="text-base font-black text-emerald-700">
                      ₹{((formData.capitalAmount / 0.1) * 0.9).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-2">
                  Quick Capital Chips:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[100000, 250000, 500000, 750000, 1000000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setFormData({ ...formData, capitalAmount: amt })}
                      className={`text-xs px-3 py-2 rounded-xl border transition-all ${
                        formData.capitalAmount === amt
                          ? 'bg-[#083b5e] text-white border-[#083b5e] font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                      }`}
                    >
                      ₹{(amt / 100000).toFixed(amt >= 100000 ? 1 : 2)} Lakh
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Current Background & Experience
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-2">
                  Select Profile Match:
                </span>
                <div className="flex flex-col gap-2">
                  {currentQ.chips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setFormData({ ...formData, occupation: chip })}
                      className={`text-xs p-3 rounded-xl border text-left transition-all ${
                        formData.occupation === chip
                          ? 'bg-[#083b5e] text-white border-[#083b5e] font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <Briefcase className="w-3.5 h-3.5 inline mr-2 text-amber-500" />
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Local Demand Observation (Customer Capacity)
                </label>
                <textarea
                  rows={3}
                  value={formData.customerDemand}
                  onChange={(e) => setFormData({ ...formData, customerDemand: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-2">
                  Observed Local Patterns:
                </span>
                <div className="flex flex-col gap-2">
                  {currentQ.chips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setFormData({ ...formData, customerDemand: chip })}
                      className={`text-xs p-3 rounded-xl border text-left transition-all ${
                        formData.customerDemand === chip
                          ? 'bg-[#083b5e] text-white border-[#083b5e] font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5 inline mr-2 text-emerald-600" />
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Undo Notification Bar */}
          {undoTimer !== null && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center justify-between text-xs text-rose-950 animate-in fade-in">
              <div className="flex items-center gap-2">
                <Undo2 className="w-4 h-4 text-rose-600" />
                <span>Enterprise Profile committed. Undo window active ({undoTimer}s)</span>
              </div>
              <button
                onClick={handleUndo}
                className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                Undo Changes
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={isGeneratingAi}
            className="px-6 py-2.5 rounded-xl bg-[#083b5e] hover:bg-[#062c46] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-60"
          >
            {isGeneratingAi ? (
              <>
                <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Synthesizing Gemini Feasibility...</span>
              </>
            ) : (
              <>
                <span>{currentStep === 5 ? 'Finish & Launch Feasibility Pipeline' : 'Next Step'}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
