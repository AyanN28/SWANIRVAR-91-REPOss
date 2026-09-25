import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: t('Why are Punjab, Maharashtra, West Bengal, and Tamil Nadu selected for the prototype?'),
      a: t('These four states represent distinct economic and geographic corridors of India: Northern agriculture and agro-processing (Punjab), Western heavy engineering and finance (Maharashtra), Eastern maritime and handicraft exchanges (West Bengal), and Southern high-tech and automotive manufacturing (Tamil Nadu). This diversity validates the platform under varied state regulatory environments.'),
    },
    {
      q: t('How does the language flow work across all Indian states?'),
      a: t('SWANIRVAR provides end-to-end interface and contract translation across 12 scheduled Indian languages. When a user selects their language, the entire application, tender terminology, and negotiation contracts instantly adapt and persist across all current and future portals.'),
    },
    {
      q: t('What is the significance of "Indians are the new way of India"?'),
      a: t('It reflects our guiding conviction: rather than relying on predatory intermediary intermediaries or fragmented closed platforms, Indian citizens, MSMEs, and rural entrepreneurs are actively driving the future of national self-reliance (Aatmanirbhar Bharat).'),
    },
    {
      q: t('How do the 10 core features integrate with existing government portals like GeM and ONDC?'),
      a: t('SWANIRVAR utilizes open APIs and protocol adapters to sync seamlessly with the Government e-Marketplace (GeM), the Open Network for Digital Commerce (ONDC), GSTN, and TReDS invoice discounting systems with zero vendor lock-in.'),
    },
    {
      q: t('How can enterprises in pilot states participate in the prototype?'),
      a: t('Enterprises in Punjab, Maharashtra, West Bengal, and Tamil Nadu can click "Login" or "Sign Up" in the navbar to connect their Udyam registration, verify their enterprise credentials, and start participating in live tenders and state procurement auctions.'),
    },
  ];

  return (
    <section id="faq" className="py-16 px-4 sm:px-8 max-w-5xl mx-auto border-t-2 border-[#191970]">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191970]/10 text-[#191970] text-xs font-bold uppercase tracking-wider mb-2 border border-[#191970]">
          <HelpCircle className="w-3.5 h-3.5 text-[#FF671F]" />
          {t('Common Inquiries')}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#14120e]">
          {t('Frequently Asked Questions')}
        </h2>
        <p className="text-xs sm:text-sm text-[#5f5748] mt-2 max-w-xl mx-auto">
          {t('Essential insights regarding prototype deployment, institutional onboarding, and sovereign compliance standards.')}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#faf6ee] rounded-2xl border-2 border-[#191970] overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#f5ecdd] transition-colors"
              >
                <span className="font-bold text-sm sm:text-base text-[#14120e] pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#191970] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#191970]/30 text-xs sm:text-sm text-[#504a3e] leading-relaxed bg-[#fbf8f2]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
