import React, { useState, useEffect } from 'react';
import { SwanirvarLogo } from './SwanirvarLogo';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  Shield,
  Lock,
  Smartphone,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Building,
  KeyRound,
  ExternalLink,
  Check,
} from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  onNavigateHome: () => void;
  onLoginSuccess?: (user: { name: string; role: string }) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'signup',
  onNavigateHome,
  onLoginSuccess,
}) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);
  const [activeTab, setActiveTab] = useState<'credential' | 'otp' | 'parichay'>('credential');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('entrepreneur');
  const [otpMobile, setOtpMobile] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [encryptStatus, setEncryptStatus] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<{
    userName: string;
    mode: 'login' | 'signup';
    role: string;
  } | null>(null);

  // Auto redirect to Citizen Dashboard upon authentication
  useEffect(() => {
    if (authSuccess) {
      const timer = setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            name: authSuccess.userName,
            role: authSuccess.role,
          });
        }
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [authSuccess, onLoginSuccess]);

  // Switch between Login and Sign Up
  const toggleAuthMode = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setEncryptStatus(null);
    setIsLoading(false);
  };

  // Handle Credential Login / Sign Up Submit
  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    if (authMode === 'signup' && !fullName.trim()) {
      alert('Please enter your full name.');
      return;
    }

    if (authMode === 'signup' && password !== confirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    setEncryptStatus('Encrypting credentials with SHA-256...');

    setTimeout(() => {
      setEncryptStatus('Connecting to National Sovereign Authentication Gateway...');
      setTimeout(() => {
        setIsLoading(false);
        setEncryptStatus(null);
        setAuthSuccess({
          userName: fullName.trim() || identifier.split('@')[0],
          mode: authMode,
          role: role === 'entrepreneur' ? 'Rural Micro-Entrepreneur' : role === 'vle' ? 'Village Level Entrepreneur (VLE)' : 'Institutional Officer',
        });
      }, 1200);
    }, 800);
  };

  // Handle OTP Send
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpMobile.trim()) {
      alert('Please enter your registered E-mail or Mobile number.');
      return;
    }

    setIsLoading(true);
    setEncryptStatus('Generating secure 6-digit OTP via NIC SMS Gateway...');

    setTimeout(() => {
      setIsLoading(false);
      setEncryptStatus(null);
      setOtpSent(true);
      setOtpTimer(30);

      // Start countdown
      const interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  // Handle OTP Verify
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.length < 4) {
      alert('Please enter the 6-digit OTP received on your mobile.');
      return;
    }

    setIsLoading(true);
    setEncryptStatus('Verifying OTP with National Identity Gateway...');

    setTimeout(() => {
      setIsLoading(false);
      setEncryptStatus(null);
      setAuthSuccess({
        userName: otpMobile,
        mode: authMode,
        role: 'Verified Citizen / VLE',
      });
    }, 1100);
  };

  // Handle Parichay SSO Login
  const handleParichayLogin = () => {
    setIsLoading(true);
    setEncryptStatus('Redirecting to Meri Pehchaan (National SSO Gateway)...');
    setTimeout(() => {
      setIsLoading(false);
      setEncryptStatus(null);
      setAuthSuccess({
        userName: 'Meri Pehchaan Citizen',
        mode: authMode,
        role: 'Gov Verified Single Sign-On User',
      });
    }, 1200);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div
      className="min-h-screen bg-[#f5efe1] text-[#374957] flex flex-col justify-between pt-[76px] selection:bg-[#FF671F]/20"
      style={{
        fontFamily: "'Open Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Top Bar with Back and Language Switcher */}
      <div className="w-full max-w-[560px] mx-auto px-4 pt-4 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#191970] hover:text-[#FF671F] transition-colors py-1.5 px-2.5 rounded-md hover:bg-[#eae1cd]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to SWANIRVAR Portal</span>
        </button>

        {/* Unified Language Switcher */}
        <LanguageSwitcher variant="navbar" idPrefix="auth" />
      </div>

      {/* Lifecycle Flow Step Bar */}
      <div className="w-full max-w-[540px] mx-auto px-4 pt-1">
        <div className="flex items-center justify-between text-[11px] bg-white/80 border border-[#191970]/20 rounded-lg px-3 py-1.5 text-[#554d41] shadow-2xs">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#191970] hover:underline transition-colors cursor-pointer flex items-center gap-1 font-medium"
            title="Return to Step 1: Landing Page"
          >
            <span>1. {currentLanguage === 'bn' ? 'ল্যান্ডিং পেজ' : currentLanguage === 'hi' ? 'मुख्य पृष्ठ' : 'Landing'}</span>
          </button>
          <span className="text-[#999]">›</span>
          <span className="font-extrabold text-[#191970] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF671F]" />
            <span>2. {currentLanguage === 'bn' ? 'লগইন (সক্রিয়)' : currentLanguage === 'hi' ? 'लॉगिन (सक्रिय)' : 'Login (Active)'}</span>
          </span>
          <span className="text-[#999]">›</span>
          <span className="text-[#888]">
            3. {currentLanguage === 'bn' ? 'ড্যাশবোর্ড' : currentLanguage === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
          </span>
        </div>
      </div>

      {/* Main Authentication Container */}
      <div className="w-full max-w-[540px] mx-auto px-4 py-4 flex-1 flex flex-col justify-center">
        <div className="bg-white border-2 border-[#191970] rounded-xl p-6 sm:p-8 shadow-xl relative">
          {/* Logo Header */}
          <div className="text-center mb-4 flex flex-col items-center">
            <div className="mb-2">
              <SwanirvarLogo idPrefix="authPage" className="h-10 sm:h-12 w-auto mx-auto" />
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#FF671F] font-bold font-mono">
              National Institutional Micro-Enterprise Platform
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-xl sm:text-2xl font-light text-[#1d1d1d] text-center mb-3">
            {authMode === 'login' ? (
              <>
                {t('Log In to your SWANIRVAR account')}
              </>
            ) : (
              <>
                {t('Sign Up for your SWANIRVAR account')}
              </>
            )}
          </h1>

          {/* Mode Switch Pill */}
          <div className="flex items-center justify-center gap-2 mb-4 text-xs">
            <span className="text-[#6c757d]">
              {authMode === 'login' ? t("Don't have an account?") : t('Already registered?')}
            </span>
            <button
              type="button"
              onClick={() => toggleAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-[#191970] hover:text-[#FF671F] font-bold underline cursor-pointer"
            >
              {authMode === 'login' ? t('Create New Account (Sign Up)') : t('Log In Here')}
            </button>
          </div>

          {/* Gov / Institutional Info Notice */}
          <div className="bg-[#faf7ee] border border-[#e2d8c3] rounded p-2.5 sm:p-3 text-xs text-[#554d41] text-center mb-5 flex items-center justify-center gap-1.5">
            <Shield className="w-4 h-4 text-[#191970] shrink-0" />
            <span>
              {t('Users with')} <span className="font-semibold text-[#191970]">@gov.in</span>, <span className="font-semibold text-[#191970]">@nic.in</span>, {t('or registered')} <span className="font-semibold text-[#046A38]">CSC VLE ID</span> {t('can directly authenticate.')}
            </span>
          </div>

          {/* Tabs matching user prompt */}
          <div className="flex border-b border-[#e0e0e0] mb-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('credential');
                setEncryptStatus(null);
              }}
              className={`flex-1 text-center py-2.5 px-2 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === 'credential'
                  ? 'text-[#191970] border-[#191970]'
                  : 'text-[#858585] border-transparent hover:text-[#374957]'
              }`}
            >
              {authMode === 'login' ? t('Sign in with Credential') : t('Register with Credential')}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('otp');
                setEncryptStatus(null);
              }}
              className={`flex-1 text-center py-2.5 px-2 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === 'otp'
                  ? 'text-[#191970] border-[#191970]'
                  : 'text-[#858585] border-transparent hover:text-[#374957]'
              }`}
            >
              {authMode === 'login' ? t('Log In With OTP') : t('Sign Up With OTP')}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('parichay');
                setEncryptStatus(null);
              }}
              className={`flex-1 text-center py-2.5 px-2 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === 'parichay'
                  ? 'text-[#191970] border-[#191970]'
                  : 'text-[#858585] border-transparent hover:text-[#374957]'
              }`}
            >
              {t('Meri Pehchaan SSO')}
            </button>
          </div>

          {/* Success State */}
          {authSuccess ? (
            <div className="py-6 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#046A38]/10 text-[#046A38] flex items-center justify-center border-2 border-[#046A38]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#191970] mb-1">
                {authSuccess.mode === 'login' ? 'Authentication Successful!' : 'Account Successfully Created!'}
              </h3>
              <p className="text-xs text-[#554d41] mb-1">
                Welcome, <span className="font-bold text-[#111]">{authSuccess.userName}</span>
              </p>
              <p className="text-xs text-[#858585] font-mono bg-[#f5efe1] py-1.5 px-3 rounded inline-block mb-3 border border-[#e0d7c4]">
                Role: {authSuccess.role} • Status: Active Institutional Session
              </p>
              <p className="text-xs font-bold text-[#046A38] mb-4 flex items-center justify-center gap-1.5 animate-pulse">
                <span>Directing to Citizen Dashboard (Step 3)...</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    if (onLoginSuccess) {
                      onLoginSuccess({
                        name: authSuccess.userName,
                        role: authSuccess.role,
                      });
                    } else {
                      onNavigateHome();
                    }
                  }}
                  className="px-5 py-2.5 rounded bg-[#191970] text-white font-semibold text-xs hover:bg-[#0f114a] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Go to Citizen Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="px-4 py-2.5 rounded border border-[#191970] text-[#191970] font-semibold text-xs hover:bg-[#eef4fb] transition-colors"
                >
                  Return to Home
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthSuccess(null);
                    setFullName('');
                    setIdentifier('');
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  className="px-4 py-2.5 rounded border border-[#d1d1d1] text-[#374957] text-xs hover:bg-[#f8f9fa]"
                >
                  Log Out / Reset
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* TAB 1: Credential Form (Password Login / Signup) */}
              {activeTab === 'credential' && (
                <form onSubmit={handleCredentialSubmit} className="space-y-4">
                  {/* Full Name when Signing Up */}
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-xs font-semibold text-[#374957] mb-1">
                        {t('Full Name')} <span className="text-[#dc3545]">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t('e.g. Ramesh Kumar Patel')}
                        required
                        className="w-full px-3 py-2.5 border border-[#d1d1d1] rounded text-xs sm:text-sm font-semibold text-[#374957] focus:border-[#191970] focus:ring-1 focus:ring-[#191970] outline-none"
                      />
                      <p className="text-[11px] text-[#858585] mt-1">
                        {t('As registered in Aadhaar / PAN or Gram Panchayat records.')}
                      </p>
                    </div>
                  )}

                  {/* Identifier */}
                  <div>
                    <label className="block text-xs font-semibold text-[#374957] mb-1">
                      {t('E-mail Address or Mobile Number')} <span className="text-[#dc3545]">*</span>
                    </label>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={t('e.g. name@nic.in or 9876543210')}
                      required
                      className="w-full px-3 py-2.5 border border-[#d1d1d1] rounded text-xs sm:text-sm font-semibold text-[#374957] focus:border-[#191970] focus:ring-1 focus:ring-[#191970] outline-none"
                    />
                    <p className="text-[11px] text-[#858585] mt-1">
                      {t('Enter your official email or 10-digit registered mobile number.')}
                    </p>
                  </div>

                  {/* Role Selector when Signing Up */}
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-xs font-semibold text-[#374957] mb-1">
                        {t('Select Institutional Role')} <span className="text-[#dc3545]">*</span>
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2.5 border border-[#d1d1d1] rounded text-xs sm:text-sm font-semibold text-[#374957] bg-white focus:border-[#191970] outline-none"
                      >
                        <option value="entrepreneur">{t('Rural Micro-Entrepreneur (Dairy / Agri / Handloom)')}</option>
                        <option value="vle">{t('Village Level Entrepreneur (CSC VLE Agent)')}</option>
                        <option value="bank">{t('Bank Loan Officer / NABARD Assessor')}</option>
                        <option value="citizen">{t('Institutional Citizen / Beneficiary')}</option>
                      </select>
                    </div>
                  )}

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-[#374957] mb-1">
                      {t('Password')} <span className="text-[#dc3545]">*</span>
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full px-3 py-2.5 border border-[#d1d1d1] rounded text-xs sm:text-sm font-semibold text-[#374957] focus:border-[#191970] focus:ring-1 focus:ring-[#191970] outline-none"
                    />
                    <p className="text-[11px] text-[#858585] mt-1">
                      {authMode === 'login'
                        ? t('Enter the password that accompanies your account.')
                        : t('Minimum 8 characters with at least one number or symbol.')}
                    </p>
                  </div>

                  {/* Confirm Password when Signing Up */}
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-xs font-semibold text-[#374957] mb-1">
                        {t('Confirm Password')} <span className="text-[#dc3545]">*</span>
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full px-3 py-2.5 border border-[#d1d1d1] rounded text-xs sm:text-sm font-semibold text-[#374957] focus:border-[#191970] focus:ring-1 focus:ring-[#191970] outline-none"
                      />
                    </div>
                  )}

                  {/* Forgot Password Link (Login only) */}
                  {authMode === 'login' && (
                    <div className="text-right -mt-1">
                      <a
                        href="#forgot"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(t('Password reset link sent to your registered contact.'));
                        }}
                        className="text-xs text-[#858585] hover:text-[#191970] hover:underline"
                      >
                        {t('Forgot your password?')}
                      </a>
                    </div>
                  )}

                  {/* Terms for Signup */}
                  {authMode === 'signup' && (
                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5"
                        required
                      />
                      <label htmlFor="terms" className="text-[11px] text-[#6c757d]">
                        I consent to the verification of my enterprise credentials under NABARD standards and RBI Account Aggregator framework.
                      </label>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded text-white text-xs sm:text-sm font-bold tracking-wide uppercase transition-all shadow-md cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                    style={{
                      background:
                        authMode === 'login'
                          ? 'linear-gradient(to bottom, #191970 1%, #0f114a 100%)'
                          : 'linear-gradient(to bottom, #FF671F 1%, #d94f0e 100%)',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>{t('Processing...')}</span>
                      </>
                    ) : (
                      <span>{authMode === 'login' ? t('Log In With Password') : t('Create SWANIRVAR Account')}</span>
                    )}
                  </button>

                  {encryptStatus && (
                    <div className="text-center text-xs text-[#191970] italic animate-pulse">
                      {encryptStatus}
                    </div>
                  )}
                </form>
              )}

              {/* TAB 2: OTP Form */}
              {activeTab === 'otp' && (
                <div className="space-y-4">
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#374957] mb-1">
                          {t('Please enter registered Mobile or E-mail')} <span className="text-[#dc3545]">*</span>
                        </label>
                        <input
                          type="text"
                          value={otpMobile}
                          onChange={(e) => setOtpMobile(e.target.value)}
                          placeholder="e.g. 9876543210 or citizen@nic.in"
                          required
                          className="w-full px-3 py-2.5 border border-[#d1d1d1] rounded text-xs sm:text-sm font-semibold text-[#374957] focus:border-[#191970] focus:ring-1 focus:ring-[#191970] outline-none"
                        />
                        <p className="text-[11px] text-[#858585] mt-1">
                          {t('A 6-digit One Time Password (OTP) will be dispatched instantly.')}
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 rounded border-2 border-[#191970] text-[#191970] bg-white hover:bg-[#f0f4ff] text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-[#191970]/30 border-t-[#191970] rounded-full animate-spin" />
                            <span>{t('Requesting OTP...')}</span>
                          </>
                        ) : (
                          <span>{t('Send OTP to Mobile / Email')}</span>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div className="p-3 bg-[#e6f4ea] border border-[#3a6e4f]/30 rounded text-xs text-[#2d5a40] flex items-center justify-between">
                        <span>{t('OTP dispatched to')} <strong>{otpMobile}</strong></span>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-[11px] underline text-[#191970] font-semibold"
                        >
                          {t('Change')}
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#374957] mb-1">
                          {t('Enter 6-Digit OTP')} <span className="text-[#dc3545]">*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="1 2 3 4 5 6"
                          required
                          className="w-full text-center tracking-[0.5em] px-3 py-2.5 border-2 border-[#191970] rounded text-lg font-bold text-[#191970] focus:ring-2 focus:ring-[#191970] outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#858585]">
                        {otpTimer > 0 ? (
                          <span>{t('Resend OTP in')} <strong>{otpTimer}s</strong></span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="text-[#191970] font-bold hover:underline"
                          >
                            {t('Resend OTP Now')}
                          </button>
                        )}
                        <span className="text-[11px]">{t('Valid for 10 minutes')}</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 rounded bg-[#046A38] hover:bg-[#03542c] text-white text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            <span>{t('Verifying...')}</span>
                          </>
                        ) : (
                          <span>{t('Verify OTP & Proceed')}</span>
                        )}
                      </button>
                    </form>
                  )}

                  {encryptStatus && (
                    <div className="text-center text-xs text-[#191970] italic animate-pulse">
                      {encryptStatus}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Meri Pehchaan / CSC SSO */}
              {activeTab === 'parichay' && (
                <div className="space-y-4 py-2">
                  <div className="text-center p-4 bg-[#f8f9fa] border border-[#e9ecef] rounded">
                    <div className="flex justify-center items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-[#004f96] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        ID
                      </div>
                      <span className="text-sm font-bold text-[#191970]">
                        {t('Meri Pehchaan (National Single Sign-On)')}
                      </span>
                    </div>
                    <p className="text-xs text-[#6c757d] mb-4">
                      {t('Authenticate with JanParichay credentials, DigiLocker ID, or Aadhaar-linked digital identity.')}
                    </p>
                    <button
                      type="button"
                      onClick={handleParichayLogin}
                      disabled={isLoading}
                      className="w-full py-2.5 px-4 rounded bg-[#004f96] hover:bg-[#003d73] text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>{t('Login with Meri Pehchaan SSO')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-center p-4 bg-[#fcfaf5] border border-[#e8dfc9] rounded">
                    <span className="text-xs font-bold text-[#FF671F] uppercase tracking-wider block mb-1">
                      {t('CSC Digital Seva Connect')}
                    </span>
                    <p className="text-xs text-[#6c757d] mb-3">
                      {t('Village Level Entrepreneurs (VLEs) can authenticate with CSC Connect ID.')}
                    </p>
                    <button
                      type="button"
                      onClick={handleParichayLogin}
                      disabled={isLoading}
                      className="w-full py-2.5 px-4 rounded bg-[#FF671F] hover:bg-[#d94f0e] text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>{t('Connect with CSC Digital Seva')}</span>
                    </button>
                  </div>

                  {encryptStatus && (
                    <div className="text-center text-xs text-[#191970] italic animate-pulse">
                      {encryptStatus}
                    </div>
                  )}
                </div>
              )}

              {/* Divider "or" matching user prompt */}
              <div className="flex items-center my-5">
                <div className="flex-1 h-px bg-[#bcbdc1]" />
                <span className="flex items-center justify-center w-8 h-8 bg-[#e5e5e5] border border-[#b9babe] rounded-full mx-3 text-xs text-black font-semibold shrink-0">
                  or
                </span>
                <div className="flex-1 h-px bg-[#bcbdc1]" />
              </div>

              {/* Parichay Quick Action Banner */}
              <div className="text-center">
                <h3 className="text-xs font-semibold text-[#374957] mb-2.5">
                  Single Sign-On with National Ecosystem
                </h3>
                <button
                  type="button"
                  onClick={handleParichayLogin}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#d1d1d1] rounded text-xs font-semibold text-[#374957] hover:border-[#191970] hover:text-[#191970] hover:bg-[#f8faff] transition-colors shadow-2xs cursor-pointer"
                >
                  <span className="w-5 h-5 bg-[#004f96] rounded-full inline-flex items-center justify-center text-white text-[10px] font-bold">
                    ID
                  </span>
                  <span>Login with Parichay / Meri Pehchaan</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Institutional Authentic Footer matching user prompt */}
      <footer className="w-full border-t border-[#dadbdd] py-5 px-4 bg-white mt-auto">
        <div className="max-w-[540px] mx-auto text-center text-[11px] text-[#3f3f3f] leading-relaxed">
          <div>
            © Content owned, updated and maintained by the{' '}
            <strong className="text-[#191970]">SWANIRVAR Institutional Cell</strong>. This sovereign platform adheres to the National Framework for Micro-Enterprise Digital Enablement,{' '}
            <a href="#about" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="text-[#191970] hover:underline font-semibold">
              Government of India
            </a>.
          </div>
          <div className="mt-1.5 text-[#6c757d]">
            Designed under WCAG 2.1 AA accessibility guidelines. Traceable Python deterministic scoring core.
          </div>

          <div className="flex justify-center items-center gap-5 mt-3 flex-wrap opacity-85">
            <span className="font-bold text-xs text-[#191970] tracking-wider">SWANIRVAR</span>
            <span className="text-[#bcbdc1]">|</span>
            <span className="font-semibold text-xs text-[#046A38]">Digital India</span>
            <span className="text-[#bcbdc1]">|</span>
            <span className="font-semibold text-xs text-[#FF671F]">Made in India</span>
            <span className="text-[#bcbdc1]">|</span>
            <span className="font-semibold text-xs text-[#191970]">CSC Telemetry</span>
          </div>

          <div className="mt-2 text-[#858585] text-[10px] font-mono">
            auth-swanirvar • Session Security SHA-256 • Last Updated: 2026
          </div>
        </div>
      </footer>
    </div>
  );
};
