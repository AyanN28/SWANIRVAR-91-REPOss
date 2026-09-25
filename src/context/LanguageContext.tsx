import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  setupUniversalDOMTranslator,
  translateDOMSubtree,
  translateText,
} from '../utils/domTranslator';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'Pan-India / International' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'North / Central India' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'West Bengal / Tripura' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra Pradesh / Telangana' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Gujarat' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Karnataka' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'Kerala' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'Punjab' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'Odisha' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', region: 'Assam' },
];

export type Translations = Record<string, Record<string, string>>;

export const TRANSLATIONS: Translations = {
  en: {
    // Nav
    nav_dashboard: 'Dashboard',
    nav_finance: 'Finance',
    nav_negotiation: 'Negotiation',
    nav_states: 'States',
    nav_login: 'Login',
    nav_signup: 'Sign Up',
    nav_play_preloader: 'Preloader',
    nav_official: 'OFFICIAL',
    nav_change_lang: 'Language',

    // Hero
    hero_badge: 'National Self-Reliance Network',
    hero_title_p1: 'A New Way Towards',
    hero_title_aatmanirbhar: 'Aatmanirbhar',
    hero_title_bharat: 'Bharat',
    hero_subtitle:
      'SWANIRVAR connects state treasuries, verified regional enterprises, and institutional buyers with transparent real-time negotiation and autonomous settlement.',
    hero_cta_dashboard: 'Explore Dashboard',
    hero_cta_preloader: 'Replay Brand Preloader',

    // Language Selector Section
    lang_section_title: 'Sovereign Multilingual Interface',
    lang_section_subtitle: 'Choose your preferred working language for all current and future portals, dashboards, and settlement contracts across India.',
    lang_active_badge: 'Active System Language',

    // Continuity card
    continuity_title: 'Brand Identity Continuity',
    continuity_heading: 'Unified Navbar & Preloader Vector Spec',
    continuity_badge: '100% Geometry Match',
    continuity_navbar_title: 'Navbar Brand Logo',
    continuity_navbar_desc: 'Scales seamlessly from 42px in normal header mode to 34px in scrolled floating pill state, keeping the 24-spoke Ashoka Chakra crisp.',
    continuity_preloader_title: 'Preloader Reveal Logo',
    continuity_preloader_desc: 'Shares the exact vector coordinates, Royal Blue stroke (#1e3a8a), Tiranga gradient, and revolving Chakra.',

    // Dashboard
    dash_tag: 'National Dashboard',
    dash_title: 'Procurement & Sovereign Trade Index',
    dash_live_badge: 'LIVE SYNC • 28 STATES & 8 UTs',
    kpi_gross_trade: 'Gross Trade Volume',
    kpi_registered_msme: 'Registered MSMEs',
    kpi_active_hubs: 'Active State Hubs',
    kpi_dispute_settlement: 'Dispute Settlement',
    kpi_vs_cycle: 'vs preceding cycle',
    kpi_onboarded: 'onboarded this week',
    kpi_pan_india: '100% Pan-India Coverage',
    kpi_escrow: 'Automated Escrow Clearances',

    // Finance
    fin_tag: 'Finance & Treasury',
    fin_title: 'Autonomous Liquidity & Escrow Clearances',
    fin_desc: 'T-Zero settlements secured by state bank reserves and verifiable micro-invoicing pipelines.',
    fin_card1_title: 'State Reserve Guarantees',
    fin_card1_desc: 'Every negotiation contract is backed by pre-verified state liquidity pools, eliminating default risks for rural sellers.',
    fin_card2_title: 'Subsidized MSME Factoring',
    fin_card2_desc: 'Instant credit factoring at benchmark RBI sovereign repo rates with zero collateral pledge for artisans and producers.',
    fin_card3_title: 'Cryptographic GST Audit',
    fin_card3_desc: 'Real-time reconciliation with the national e-Way bill and GSTN ledger for friction-free compliance.',

    // Negotiation
    neg_tag: 'Dynamic Negotiation Engine',
    neg_title: 'Transparent Multilateral Price Discovery',
    neg_desc: 'Interactive multi-party procurement workflows balancing price, delivery timelines, and local production quotas.',
    neg_step1_title: 'Requirement Broadcast',
    neg_step1_desc: 'Buyer enters state commodity requirement with regional preference',
    neg_step2_title: 'Algorithmic Matching',
    neg_step2_desc: 'Verified local producers matched by logistics distance & capacity',
    neg_step3_title: 'Consensus Negotiation',
    neg_step3_desc: 'Automated reverse-auction & fair price corridor enforcement',
    neg_step4_title: 'Smart Contract Lock',
    neg_step4_desc: 'Autonomous escrow execution upon delivery milestone signoff',
    neg_simulation_title: 'Active Step: Real-Time Corridor Simulation',
    neg_simulation_desc: 'Dynamic bid range locked between ₹4,200/Qtl and ₹4,650/Qtl across 14 competing cooperatives.',
    neg_advance_btn: 'Advance Simulation Step →',

    // States
    state_tag: 'Regional Federated Grid',
    state_title: 'State-Level Procurement Health',
    state_subtitle: 'Showing real-time performance indicators for active hubs',
    th_state: 'State / Region',
    th_volume: 'Volume Handled',
    th_msmes: 'Active MSMEs',
    th_expansion: 'YoY Expansion',
    th_status: 'Hub Status',

    // Preloader
    preloader_badge: 'Brand Motion Reveal',
    preloader_skip: 'Skip to Interface',
    preloader_tagline_w1: 'A',
    preloader_tagline_w2: 'NEW',
    preloader_tagline_w3: 'WAY',
    preloader_tagline_w4: 'TOWARDS',
    preloader_tagline_w5: 'AATMANIRBHAR',
    preloader_tagline_w6: 'BHARAT',
    preloader_sub_left: 'SOVEREIGN PROCUREMENT',
    preloader_sub_right: 'NATIONAL INTEGRATION',

    // Footer
    footer_desc: 'SWANIRVAR is dedicated to strengthening sovereign domestic commerce, sustainable trade corridors, and equitable market access across all Indian states and union territories.',
    footer_rights: 'SWANIRVAR National Commerce Infrastructure. All Rights Reserved.',
  },

  hi: {
    // Nav
    nav_dashboard: 'डैशबोर्ड',
    nav_finance: 'वित्त एवं कोष',
    nav_negotiation: 'वार्ता एवं मोलभाव',
    nav_states: 'राज्य संजाल',
    nav_login: 'लॉग इन',
    nav_signup: 'पंजीकरण',
    nav_play_preloader: 'प्रीलोडर',
    nav_official: 'आधिकारिक',
    nav_change_lang: 'भाषा',

    // Hero
    hero_badge: 'राष्ट्रीय आत्मनिर्भर व्यापार नेटवर्क',
    hero_title_p1: 'की ओर एक नया मार्ग:',
    hero_title_aatmanirbhar: 'आत्मनिर्भर',
    hero_title_bharat: 'भारत',
    hero_subtitle:
      'स्वनिर्भर (SWANIRVAR) राज्य कोषों, सत्यापित क्षेत्रीय उद्यमों और संस्थागत खरीदारों को पारदर्शी रीयल-टाइम मूल्य निर्धारण और त्वरित भुगतान से जोड़ता है।',
    hero_cta_dashboard: 'डैशबोर्ड देखें',
    hero_cta_preloader: 'ब्रांड प्रीलोडर पुनः चलाएं',

    // Language Selector Section
    lang_section_title: 'सार्वभौमिक बहुभाषी इंटरफ़ेस',
    lang_section_subtitle: 'भारत भर के सभी वर्तमान और भावी पोर्टल्स, अनुबंधों और डैशबोर्ड के लिए अपनी पसंदीदा भाषा चुनें। सभी आगामी पृष्ठ स्वतः इस भाषा में परिवर्तित होंगे।',
    lang_active_badge: 'सक्रिय प्रणाली भाषा',

    // Continuity card
    continuity_title: 'ब्रांड पहचान निरंतरता',
    continuity_heading: 'समान नेवबार एवं प्रीलोडर वेक्टर प्रारूप',
    continuity_badge: '१००% ज्यामितीय एकरूपता',
    continuity_navbar_title: 'नेवबार ब्रांड प्रतीक',
    continuity_navbar_desc: 'सामान्य 42px आकार से स्क्रॉल किए गए 34px कैप्सूल रूप में भी 24 तीलियों वाले अशोक चक्र को स्पष्ट रखता है।',
    continuity_preloader_title: 'प्रीलोडर अनावरण प्रतीक',
    continuity_preloader_desc: 'समान निर्देशांक, नेवी ब्लू रेखांकन (#1e3a8a), तिरंगा ग्रेडिएंट और घूमते हुए चक्र का उपयोग करता है।',

    // Dashboard
    dash_tag: 'राष्ट्रीय डैशबोर्ड',
    dash_title: 'खरीद एवं संप्रभु व्यापार सूचकांक',
    dash_live_badge: 'सजीव समन्वय • २८ राज्य एवं ८ केंद्र शासित प्रदेश',
    kpi_gross_trade: 'सकल व्यापार परिमाण',
    kpi_registered_msme: 'पंजीकृत एमएसएमई उद्यम',
    kpi_active_hubs: 'सक्रिय राज्य केंद्र',
    kpi_dispute_settlement: 'विवाद समाधान दर',
    kpi_vs_cycle: 'पूर्व चक्र की तुलना में',
    kpi_onboarded: 'इस सप्ताह जुड़े नए उद्यम',
    kpi_pan_india: '१००% अखिल भारतीय कवरेज',
    kpi_escrow: 'स्वचालित एस्क्रो भुगतान',

    // Finance
    fin_tag: 'वित्त एवं राजकोषीय सुरक्षा',
    fin_title: 'स्वायत्त तरलता एवं एस्क्रो निकासी',
    fin_desc: 'राज्य बैंक आरक्षित निधि और डिजिटल माइक्रो-चालान से सुरक्षित टी-शून्य निपटान।',
    fin_card1_title: 'राज्य आरक्षित निधि गारंटी',
    fin_card1_desc: 'प्रत्येक वार्ता अनुबंध को पूर्व-सत्यापित राज्य तरलता भंडार से सुरक्षा प्राप्त है, जिससे ग्रामीण विक्रेताओं का जोखिम समाप्त होता है।',
    fin_card2_title: 'रियायती एमएसएमई फैक्टरिंग',
    fin_card2_desc: 'कारीगरों और उत्पादकों के लिए शून्य संपार्श्विक पर आरबीआई रेपो दर पर तत्काल कार्यशील पूंजी।',
    fin_card3_title: 'क्रिप्टोग्राफिक जीएसटी ऑडिट',
    fin_card3_desc: 'राष्ट्रीय ई-वे बिल और जीएसटीएन बहीखाते के साथ रीयल-टाइम स्वतः समाधान।',

    // Negotiation
    neg_tag: 'गतिशील वार्ता इंजन',
    neg_title: 'पारदर्शी बहुपक्षीय मूल्य निर्धारण',
    neg_desc: 'मूल्य, वितरण समय और स्थानीय उत्पादन कोटा को संतुलित करने वाली आधुनिक खरीद प्रक्रिया।',
    neg_step1_title: 'मांग का प्रसारण',
    neg_step1_desc: 'क्रेता क्षेत्रीय वरीयता के साथ राज्य स्तर पर वस्तु की आवश्यकता दर्ज करता है',
    neg_step2_title: 'एल्गोरिद्मिक मिलान',
    neg_step2_desc: 'लॉजिस्टिक्स दूरी और क्षमता के आधार पर स्थानीय निर्माताओं का चयन',
    neg_step3_title: 'सहमति वार्ता',
    neg_step3_desc: 'स्वचालित रिवर्स-नीलामी एवं न्यायसंगत मूल्य सीमा प्रवर्तन',
    neg_step4_title: 'स्मार्ट अनुबंध लॉक',
    neg_step4_desc: 'वितरण सत्यापन के पश्चात स्वायत्त एस्क्रो भुगतान निष्पादन',
    neg_simulation_title: 'सक्रिय चरण: रीयल-टाइम मूल्य गलियारा अनुकरण',
    neg_simulation_desc: '१४ प्रतिस्पर्धी सहकारी समितियों के बीच बोली सीमा ₹४,२०० से ₹४,६५० प्रति क्विंटल के बीच निर्धारित।',
    neg_advance_btn: 'अगला चरण देखें →',

    // States
    state_tag: 'क्षेत्रीय संघीय संजाल',
    state_title: 'राज्य-स्तरीय खरीद स्वास्थ्य',
    state_subtitle: 'सक्रिय केंद्रों के लिए रीयल-टाइम प्रदर्शन सूचक',
    th_state: 'राज्य / क्षेत्र',
    th_volume: 'व्यापार परिमाण',
    th_msmes: 'सक्रिय एमएसएमई',
    th_expansion: 'वार्षिक वृद्धि दर',
    th_status: 'केंद्र स्थिति',

    // Preloader
    preloader_badge: 'ब्रांड गति अनावरण',
    preloader_skip: 'मुख्य पृष्ठ पर जाएं',
    preloader_tagline_w1: 'एक',
    preloader_tagline_w2: 'नया',
    preloader_tagline_w3: 'मार्ग',
    preloader_tagline_w4: 'की',
    preloader_tagline_w5: 'आत्मनिर्भर',
    preloader_tagline_w6: 'भारत',
    preloader_sub_left: 'संप्रभु खरीद प्रणाली',
    preloader_sub_right: 'राष्ट्रीय एकीकरण',

    // Footer
    footer_desc: 'स्वनिर्भर (SWANIRVAR) भारत के सभी राज्यों एवं केंद्र शासित प्रदेशों में घरेलू वाणिज्य, टिकाऊ व्यापार और निष्पक्ष बाजार पहुंच को सुदृढ़ करने के लिए समर्पित है।',
    footer_rights: 'स्वनिर्भर राष्ट्रीय वाणिज्य अवसंरचना। सर्वाधिकार सुरक्षित।',
  },

  bn: {
    // Nav
    nav_dashboard: 'ড্যাশবোর্ড',
    nav_finance: 'অর্থ ও কোষাগার',
    nav_negotiation: 'দরকষাকষি ও চুক্তি',
    nav_states: 'রাজ্যসমূহ',
    nav_login: 'লগইন',
    nav_signup: 'নিবন্ধন',
    nav_play_preloader: 'প্রিলোডার',
    nav_official: 'অফিসিয়াল',
    nav_change_lang: 'ভাষা',

    // Hero
    hero_badge: 'জাতীয় আত্মনির্ভর বাণিজ্য নেটওয়ার্ক',
    hero_title_p1: 'একটি নতুন দিগন্ত:',
    hero_title_aatmanirbhar: 'আত্মনির্ভর',
    hero_title_bharat: 'ভারত',
    hero_subtitle:
      'স্বনির্ভর (SWANIRVAR) রাজ্য কোষাগার, প্রত্যয়িত আঞ্চলিক উদ্যোগ এবং প্রাতিষ্ঠানিক ক্রেতাদের স্বচ্ছ দরকষাকষি ও স্বয়ংক্রিয় অর্থছাড়ের সাথে সংযুক্ত করে।',
    hero_cta_dashboard: 'ড্যাশবোর্ড দেখুন',
    hero_cta_preloader: 'ব্র্যান্ড প্রিলোডার চালান',

    // Language Selector Section
    lang_section_title: 'সার্বভৌম বহুভাষিক ইন্টারফেস',
    lang_section_subtitle: 'বর্তমান এবং ভবিষ্যতের সমস্ত পোর্টাল, চুক্তি এবং ড্যাশবোর্ডের জন্য আপনার পছন্দের ভাষা নির্বাচন করুন। পরবর্তী সমস্ত পৃষ্ঠা স্বয়ংক্রিয়ভাবে এই ভাষায় রূপান্তরিত হবে।',
    lang_active_badge: 'সক্রিয় সিস্টেম ভাষা',

    // Continuity card
    continuity_title: 'ব্র্যান্ড পরিচয়ের ধারাবাহিকতা',
    continuity_heading: 'ন্যাভবার ও প্রিলোডারের অভিন্ন ভেক্টর রূপ',
    continuity_badge: '১০০% জ্যামিতিক সামঞ্জস্য',
    continuity_navbar_title: 'ন্যাভবার ব্র্যান্ড লোগো',
    continuity_navbar_desc: 'স্ক্রোল অবস্থায় ছোট হলেও ২৪-দণ্ডের অশোক চক্রটি সম্পূর্ণ সুস্পষ্ট ও ঘূর্ণায়মান থাকে।',
    continuity_preloader_title: 'প্রিলোডার উন্মোচন লোগো',
    continuity_preloader_desc: 'একই ভেক্টর স্থানাঙ্ক, তিরঙ্গা গ্রেডিয়েন্ট এবং রয়্যাল ব্লু স্ট্রোক ব্যবহার করে।',

    // Dashboard
    dash_tag: 'জাতীয় ড্যাশবোর্ড',
    dash_title: 'সংগ্রহ ও সার্বভৌম বাণিজ্য সূচক',
    dash_live_badge: 'লাইভ সিঙ্ক • ২৮টি রাজ্য ও ৮টি কেন্দ্রশাসিত অঞ্চল',
    kpi_gross_trade: 'মোট বাণিজ্য পরিমাণ',
    kpi_registered_msme: 'নিবন্ধিত এমএসএমই',
    kpi_active_hubs: 'সক্রিয় রাজ্য কেন্দ্র',
    kpi_dispute_settlement: 'বিরোধ নিষ্পত্তি হার',
    kpi_vs_cycle: 'পূর্ববর্তী চক্রের তুলনায়',
    kpi_onboarded: 'এই সপ্তাহে যুক্ত হয়েছেন',
    kpi_pan_india: '১০০% সর্বভারতীয় বিস্তৃতি',
    kpi_escrow: 'স্বয়ংক্রিয় এসক্রো নিষ্পত্তি',

    // Finance
    fin_tag: 'অর্থ ও কোষাগার',
    fin_title: 'স্বায়ত্তশাসিত তহবিল ও এসক্রো নিষ্পত্তি',
    fin_desc: 'রাজ্য ব্যাংকের গ্যারান্টি এবং ডিজিটাল চালান দ্বারা সুরক্ষিত তাৎক্ষণিক লেনদেন।',
    fin_card1_title: 'রাজ্য তহবিল সুরক্ষা',
    fin_card1_desc: 'প্রতিটি চুক্তি রাজ্য তারল্য দ্বারা সমর্থিত, গ্রামীণ বিক্রেতাদের অর্থপ্রাপ্তি সম্পূর্ণ সুরক্ষিত।',
    fin_card2_title: 'ভর্তুকিযুক্ত এমএসএমই সহায়তা',
    fin_card2_desc: 'কারিগর ও ক্ষুদ্র ব্যবসায়ীদের জন্য শূন্য জামানতে আরবিআই রেপো রেটে সরাসরি ঋণসুবিধা।',
    fin_card3_title: 'জিএসটি ডিজিটাল নিরীক্ষা',
    fin_card3_desc: 'ই-ওয়ে বিল ও জিএসটিএন লেজারের সাথে স্বয়ংক্রিয় রিয়েল-টাইম সমন্বয়।',

    // Negotiation
    neg_tag: 'গতিশীল দরকষাকষি ইঞ্জিন',
    neg_title: 'স্বচ্ছ বহুমুখী মূল্য নির্ধারণ',
    neg_desc: 'মূল্য, সরবরাহের সময় এবং স্থানীয় উৎপাদন কোটার ভারসাম্য বজায় রেখে কেনাকাটার প্রক্রিয়া।',
    neg_step1_title: 'চাহিদা প্রচার',
    neg_step1_desc: 'ক্রেতা আঞ্চলিক অগ্রাধিকারের সাথে পণ্যের চাহিদা ঘোষণা করেন',
    neg_step2_title: 'অ্যালগরিদমিক ম্যাচিং',
    neg_step2_desc: 'দূরত্ব ও ক্ষমতার ওপর ভিত্তি করে স্থানীয় উৎপাদক নির্বাচন',
    neg_step3_title: 'ঐকমত্য দরকষাকষি',
    neg_step3_desc: 'স্বয়ংক্রিয় রিভার্স-অকশন এবং ন্যায্য মূল্য সীমা প্রয়োগ',
    neg_step4_title: 'স্মার্ট চুক্তি অনুমোদন',
    neg_step4_desc: 'পণ্য সরবরাহের প্রমাণ সাপেক্ষে স্বয়ংক্রিয় অর্থছাড়',
    neg_simulation_title: 'সক্রিয় ধাপ: রিয়েল-টাইম মূল্য পরিসীমা',
    neg_simulation_desc: '১৪টি সমবায়ের মধ্যে দর প্রতি কুইন্টাল ৪,২০০ থেকে ৪,৬৫০ টাকার মধ্যে সংরক্ষিত।',
    neg_advance_btn: 'পরবর্তী ধাপ দেখুন →',

    // States
    state_tag: 'আঞ্চলিক ফেডারেল গ্রিড',
    state_title: 'রাজ্যভিত্তিক সংগ্রহের অবস্থা',
    state_subtitle: 'সক্রিয় রাজ্য কেন্দ্রগুলির লাইভ কর্মক্ষমতা তথ্য',
    th_state: 'রাজ্য / অঞ্চল',
    th_volume: 'বাণিজ্যিক পরিমাণ',
    th_msmes: 'সক্রিয় এমএসএমই',
    th_expansion: 'বার্ষিক প্রবৃদ্ধি',
    th_status: 'কেন্দ্রের স্থিতি',

    // Preloader
    preloader_badge: 'ব্র্যান্ড উন্মোচন অ্যানিমেশন',
    preloader_skip: 'প্রধান পেজে যান',
    preloader_tagline_w1: 'একটি',
    preloader_tagline_w2: 'নতুন',
    preloader_tagline_w3: 'পথ',
    preloader_tagline_w4: 'দিকে',
    preloader_tagline_w5: 'আত্মনির্ভর',
    preloader_tagline_w6: 'ভারত',
    preloader_sub_left: 'সার্বভৌম সংগ্রহ ব্যবস্থা',
    preloader_sub_right: 'জাতীয় সংহতি',

    // Footer
    footer_desc: 'স্বনির্ভর (SWANIRVAR) সমগ্র ভারতের প্রতিটি রাজ্য ও অঞ্চলে টেকসই অভ্যন্তরীণ বাণিজ্য ও সমতা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।',
    footer_rights: 'স্বনির্ভর জাতীয় বাণিজ্য পরিকাঠামো। সর্বস্বত্ব সংরক্ষিত।',
  },

  mr: {
    // Nav
    nav_dashboard: 'डॅशबोर्ड',
    nav_finance: 'वित्त व कोषागार',
    nav_negotiation: 'वाटाघाटी व व्यवहार',
    nav_states: 'राज्ये',
    nav_login: 'लॉगिन',
    nav_signup: 'नोंदणी',
    nav_play_preloader: 'प्रिलोड',
    nav_official: 'अधिकृत',
    nav_change_lang: 'भाषा',

    // Hero
    hero_badge: 'राष्ट्रीय आत्मनिर्भर व्यापार नेटवर्क',
    hero_title_p1: 'दिशेने एक नवीन मार्ग:',
    hero_title_aatmanirbhar: 'आत्मनिर्भर',
    hero_title_bharat: 'भारत',
    hero_subtitle:
      'स्वनिर्भर (SWANIRVAR) राज्य कोषागार, प्रमाणित स्थानिक उद्योग आणि संस्थात्मक खरेदीदारांना पारदर्शक वाटाघाटी व त्वरित देयक सुविधेने जोडते.',
    hero_cta_dashboard: 'डॅशबोर्ड पहा',
    hero_cta_preloader: 'ब्रँड प्रिलोड पुन्हा सुरू करा',

    // Language Selector Section
    lang_section_title: 'सार्वभौम बहुभाषिक इंटरफेस',
    lang_section_subtitle: 'भारतातील सर्व चालू आणि भावी पोर्टल्स, करार आणि डॅशबोर्डसाठी आपली पसंतीची भाषा निवडा. सर्व पुढील पृष्ठे आपोआप या भाषेत बदलतील.',
    lang_active_badge: 'सक्रिय प्रणाली भाषा',

    // Continuity card
    continuity_title: 'ब्रँड सातत्य',
    continuity_heading: 'नेव्हबार आणि प्रिलोडरचे तंतोतंत समान स्वरूप',
    continuity_badge: '१००% भूमितीय अचूकता',
    continuity_navbar_title: 'नेव्हबार ब्रँड चिन्ह',
    continuity_navbar_desc: '४२px वरून ३४px वर बदलतानाही २४ आऱ्यांचे अशोक चक्र स्पष्ट व फिरत राहते.',
    continuity_preloader_title: 'प्रिलोडर अनावरण चिन्ह',
    continuity_preloader_desc: 'तिरंगा रंगसंगती व निळ्या रेषांकनासह संपूर्ण समानता जपते.',

    // Dashboard
    dash_tag: 'राष्ट्रीय डॅशबोर्ड',
    dash_title: 'खरेदी व राष्ट्रीय व्यापार निर्देशांक',
    dash_live_badge: 'थेट समन्वय • २८ राज्ये व ८ केंद्रशासित प्रदेश',
    kpi_gross_trade: 'एकूण व्यापार उलाढाल',
    kpi_registered_msme: 'नोंदणीकृत एमएसएमई',
    kpi_active_hubs: 'सक्रिय राज्य केंद्रे',
    kpi_dispute_settlement: 'तक्रार निवारण दर',
    kpi_vs_cycle: 'मागील टप्प्याच्या तुलनेत',
    kpi_onboarded: 'या आठवड्यात जोडलेले',
    kpi_pan_india: '१००% अखिल भारतीय व्याप्ती',
    kpi_escrow: 'स्वयंचलित एस्क्रो देयके',

    // Finance
    fin_tag: 'वित्त व कोषागार',
    fin_title: 'स्वायत्त तरलता व एस्क्रो मंजुरी',
    fin_desc: 'राज्य बँक हमी व ई-पावती प्रणालीद्वारे त्वरित टी-शून्य देयके.',
    fin_card1_title: 'राज्य राखीव हमी',
    fin_card1_desc: 'प्रत्येक करार राज्य तरलता निधीने सुरक्षित असल्यामुळे ग्रामीण उत्पादकांचे नुकसान टळते.',
    fin_card2_title: 'सवलतीचे एमएसएमई वित्तपुरवठा',
    fin_card2_desc: 'विनातारण रिझर्व्ह बँक रेपो दरावर कारागीर व उद्योजकांना त्वरित खेळते भांडवल.',
    fin_card3_title: 'जीएसटी डिजिटल पडताळणी',
    fin_card3_desc: 'ई-वे बिल आणि जीएसटीएन नोंदींशी थेट ताळमेळ.',

    // Negotiation
    neg_tag: 'गतिमान वाटाघाटी मंच',
    neg_title: 'पारदर्शक बहुपक्षीय भाव निश्चिती',
    neg_desc: 'किंमत, पुरवठा वेळ आणि स्थानिक उत्पादन प्रमाण यांचा सुवर्णमध्य साधणारी प्रणाली.',
    neg_step1_title: 'मागणीची नोंद',
    neg_step1_desc: 'खरेदीदार प्रादेशिक पसंतीसह वस्तूची आवश्यकता नोंदवतो',
    neg_step2_title: 'अल्गोरिदमद्वारे जुळवणी',
    neg_step2_desc: 'वाहतूक अंतर व उत्पादन क्षमतेनुसार स्थानिक पुरवठादारांची निवड',
    neg_step3_title: 'सहमत वाटाघाटी',
    neg_step3_desc: 'स्वयंचलित रिव्हर्स-लिलाव व योग्य दर मर्यादा अंमलबजावणी',
    neg_step4_title: 'स्मार्ट करार मंजुरी',
    neg_step4_desc: 'माल पोहोचल्यावर स्वायत्तपणे एस्क्रो खात्यातून रक्कम जमा',
    neg_simulation_title: 'सक्रिय टप्पा: थेट दर मर्यादा पडताळणी',
    neg_simulation_desc: '१४ सहकारी संस्थांमध्ये प्रति क्विंटल ४,२०० ते ४,६५० रुपयांची बोली मर्यादा निश्चित.',
    neg_advance_btn: 'पुढील टप्पा पहा →',

    // States
    state_tag: 'प्रादेशिक फेडरल जाळे',
    state_title: 'राज्यस्तरीय खरेदी स्थिती',
    state_subtitle: 'सक्रिय केंद्रांचे थेट कामगिरी निर्देशक',
    th_state: 'राज्य / प्रदेश',
    th_volume: 'व्यापार उलाढाल',
    th_msmes: 'सक्रिय एमएसएमई',
    th_expansion: 'वार्षिक वाढ',
    th_status: 'केंद्राची स्थिती',

    // Preloader
    preloader_badge: 'ब्रँड अनावरण',
    preloader_skip: 'थेट पुढे जा',
    preloader_tagline_w1: 'एक',
    preloader_tagline_w2: 'नवीन',
    preloader_tagline_w3: 'मार्ग',
    preloader_tagline_w4: 'दिशेने',
    preloader_tagline_w5: 'आत्मनिर्भर',
    preloader_tagline_w6: 'भारत',
    preloader_sub_left: 'सार्वभौम खरेदी व्यवस्था',
    preloader_sub_right: 'राष्ट्रीय एकात्मता',

    // Footer
    footer_desc: 'स्वनिर्भर (SWANIRVAR) भारतातील सर्व राज्यांमध्ये समृद्ध देशांतर्गत व्यापार व आर्थिक स्वावलंबन निर्माण करण्यास कटिबद्ध आहे.',
    footer_rights: 'स्वनिर्भर राष्ट्रीय व्यापार संरचना. सर्व हक्क सुरक्षित.',
  },

  ta: {
    // Nav
    nav_dashboard: 'டாஷ்போர்டு',
    nav_finance: 'நிதி மற்றும் கருவூலம்',
    nav_negotiation: 'பேச்சுவார்த்தை',
    nav_states: 'மாநிலங்கள்',
    nav_login: 'உள்நுழைக',
    nav_signup: 'பதிவு செய்க',
    nav_play_preloader: 'முன் திரையிடல்',
    nav_official: 'அதிகாரப்பூர்வ',
    nav_change_lang: 'மொழி',

    // Hero
    hero_badge: 'தேசிய தற்சார்பு வர்த்தக கட்டமைப்பு',
    hero_title_p1: 'புதிய பாதை:',
    hero_title_aatmanirbhar: 'தற்சார்பு',
    hero_title_bharat: 'பாரதம்',
    hero_subtitle:
      'சுவநிர்பர் (SWANIRVAR) மாநில கருவூலங்கள், சரிபார்க்கப்பட்ட பிராந்திய குறுந்தொழில்கள் மற்றும் நிறுவன கொள்முதலாளர்களை வெளிப்படையான நிகழ்நேர பேச்சுவார்த்தை மூலம் இணைக்கிறது.',
    hero_cta_dashboard: 'டாஷ்போர்டை ஆராய்க',
    hero_cta_preloader: 'அடையாள அனிமேஷனை மீண்டும் இயக்கு',

    // Language Selector Section
    lang_section_title: 'பன்மொழி இறையாண்மை இடைமுகம்',
    lang_section_subtitle: 'அனைத்து தற்போதைய மற்றும் எதிர்கால போர்ட்டல்கள், டாஷ்போர்டுகளுக்கு உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும். அனைத்து எதிர்கால பக்கங்களும் தானாக இந்த மொழிக்கு மாறும்.',
    lang_active_badge: 'செயலில் உள்ள கணினி மொழி',

    // Continuity card
    continuity_title: 'பிராண்ட் தொடர்ச்சி',
    continuity_heading: 'நேவ்பார் மற்றும் முன் திரையிடலின் ஒரே மாதிரியான லோகோ வடிவம்',
    continuity_badge: '100% வடிவியல் பொருத்தம்',
    continuity_navbar_title: 'நேவ்பார் முத்திரை',
    continuity_navbar_desc: 'ஸ்க்ரோல் செய்யப்படும்போது சிறியதாக மாறினாலும் 24 ஆரங்கள் கொண்ட அசோக சக்கரம் தெளிவாக சுழல்கிறது.',
    continuity_preloader_title: 'முன் திரையிடல் முத்திரை',
    continuity_preloader_desc: 'அதே மூவர்ண சாய்வு, நீல எல்லைக்கோடுகள் மற்றும் சுழலும் சக்கரத்தைக் கொண்டுள்ளது.',

    // Dashboard
    dash_tag: 'தேசிய டாஷ்போர்டு',
    dash_title: 'கொள்முதல் மற்றும் இறையாண்மை வர்த்தக குறியீடு',
    dash_live_badge: 'நேரலை • 28 மாநிலங்கள் & 8 யூனியன் பிரதேசங்கள்',
    kpi_gross_trade: 'மொத்த வர்த்தக மதிப்பு',
    kpi_registered_msme: 'பதிவுசெய்த குறு நிறுவனங்கள்',
    kpi_active_hubs: 'செயலில் உள்ள மையங்கள்',
    kpi_dispute_settlement: 'தீர்வு விகிதம்',
    kpi_vs_cycle: 'முந்தைய சுழற்சியுடன் ஒப்பிடுகையில்',
    kpi_onboarded: 'இந்த வாரம் இணைந்தவை',
    kpi_pan_india: '100% அகில இந்திய பரவல்',
    kpi_escrow: 'தானியங்கி எஸ்க்ரோ தீர்வுகள்',

    // Finance
    fin_tag: 'நிதி & கருவூலம்',
    fin_title: 'தன்னாட்சி பணப்புழக்கம் மற்றும் தீர்வுகள்',
    fin_desc: 'மாநில வங்கி இருப்பு மற்றும் டிஜிட்டல் இன்வாய்ஸ் மூலம் உடனடியாக தீர்க்கப்படும் பரிவர்த்தனைகள்.',
    fin_card1_title: 'மாநில இருப்பு உத்தரவாதம்',
    fin_card1_desc: 'ஒவ்வொரு ஒப்பந்தமும் அரசு திரவ நிதியால் பாதுகாக்கப்படுகிறது, இதனால் கிராமப்புற விற்பனையாளர்களுக்கு ஆபத்தில்லை.',
    fin_card2_title: 'மானிய குறுந்தொழில் நிதி',
    fin_card2_desc: 'கைவினைஞர்களுக்கும் உற்பத்தியாளர்களுக்கும் பிணையின்றி ரிசர்வ் வங்கி ரெப்போ விகிதத்தில் உடனடி மூலதனம்.',
    fin_card3_title: 'ஜிஎஸ்டி டிஜிட்டல் தணிக்கை',
    fin_card3_desc: 'மின்-வழி பில் மற்றும் ஜிஎஸ்டிஎன் பதிவேடுகளுடன் நிகழ்நேர சமரசம்.',

    // Negotiation
    neg_tag: 'கொள்முதல் பேச்சுவார்த்தை இயந்திரம்',
    neg_title: 'வெளிப்படையான பலதரப்பு விலை நிர்ணயம்',
    neg_desc: 'விலை, விநியோக காலம் மற்றும் உள்ளூர் ஒதுக்கீட்டை சமநிலைப்படுத்தும் நவீன கொள்முதல் செயல்முறை.',
    neg_step1_title: 'தேவை அறிவிப்பு',
    neg_step1_desc: 'வாங்குபவர் பிராந்திய முன்னுரிமையுடன் கொள்முதல் தேவையை பதிவு செய்கிறார்',
    neg_step2_title: 'அல்காரிதம் பொருத்தம்',
    neg_step2_desc: 'தூரம் மற்றும் உற்பத்தித் திறனின் அடிப்படையில் உற்பத்தியாளர்களை தேர்ந்தெடுத்தல்',
    neg_step3_title: 'ஒப்பந்த பேச்சுவார்த்தை',
    neg_step3_desc: 'தானியங்கி விலை குறைப்பு ஏலம் மற்றும் நியாய விலை எல்லை அமலாக்கம்',
    neg_step4_title: 'ஸ்மார்ட் ஒப்பந்த பூட்டு',
    neg_step4_desc: 'பொருட்கள் ஒப்படைக்கப்பட்டவுடன் எஸ்க்ரோ கணக்கிலிருந்து தானியங்கி நிதி விடுவிப்பு',
    neg_simulation_title: 'செயலில் உள்ள படி: நிகழ்நேர விலை எல்லை உருவகப்படுத்துதல்',
    neg_simulation_desc: '14 கூட்டுறவு சங்கங்களிடையே குவிண்டாலுக்கு ₹4,200 முதல் ₹4,650 வரை விலை பூட்டப்பட்டுள்ளது.',
    neg_advance_btn: 'அடுத்த படிக்குச் செல்க →',

    // States
    state_tag: 'பிராந்திய கட்டமைப்பு',
    state_title: 'மாநில வாரியான கொள்முதல் நிலை',
    state_subtitle: 'செயலில் உள்ள மாநில மையங்களின் நேரலை செயல்திறன் குறியீடுகள்',
    th_state: 'மாநிலம் / பிராந்தியம்',
    th_volume: 'வர்த்தக மதிப்பு',
    th_msmes: 'செயலில் உள்ள தொழில் நிறுவனங்கள்',
    th_expansion: 'ஆண்டு வளர்ச்சி',
    th_status: 'மைய நிலை',

    // Preloader
    preloader_badge: 'பிராண்ட் அனிமேஷன்',
    preloader_skip: 'நேரடியாக நுழையவும்',
    preloader_tagline_w1: 'ஒரு',
    preloader_tagline_w2: 'புதிய',
    preloader_tagline_w3: 'பாதை',
    preloader_tagline_w4: 'நோக்கி',
    preloader_tagline_w5: 'தற்சார்பு',
    preloader_tagline_w6: 'பாரதம்',
    preloader_sub_left: 'இறையாண்மை கொள்முதல்',
    preloader_sub_right: 'தேசிய ஒருமைப்பாடு',

    // Footer
    footer_desc: 'சுவநிர்பர் (SWANIRVAR) இந்தியாவின் அனைத்து மாநிலங்களிலும் உள்நாட்டு வர்த்தகம் மற்றும் நிலையான வளர்ச்சியை வலுப்படுத்த அர்ப்பணிக்கப்பட்டுள்ளது.',
    footer_rights: 'சுவநிர்பர் தேசிய வர்த்தக உள்கட்டமைப்பு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
  },

  gu: {
    // Nav
    nav_dashboard: 'ડેશબોર્ડ',
    nav_finance: 'નાણાં અને તિજોરી',
    nav_negotiation: 'વાટાઘાટો',
    nav_states: 'રાજ્યો',
    nav_login: 'લૉગ ઇન',
    nav_signup: 'સાઇન અપ',
    nav_play_preloader: 'પ્રીલોડર',
    nav_official: 'સત્તાવાર',
    nav_change_lang: 'ભાષા',

    // Hero
    hero_badge: 'રાષ્ટ્રીય આત્મનિર્ભર નેટવર્ક',
    hero_title_p1: 'તરફ એક નવો માર્ગ:',
    hero_title_aatmanirbhar: 'આત્મનિર્ભર',
    hero_title_bharat: 'ભારત',
    hero_subtitle:
      'સ્વનિર્ભર (SWANIRVAR) રાજ્ય તિજોરીઓ, પ્રમાણિત એમએસએમઇ એકમો અને સંસ્થાકીય ખરીદદારોને પારદર્શક રિયલ-ટાઇમ વાટાઘાટો અને સ્વાયત્ત ચુકવણી સાથે જોડે છે.',
    hero_cta_dashboard: 'ડેશબોર્ડ જુઓ',
    hero_cta_preloader: 'બ્રાન્ડ પ્રીલોડર ફરી ચલાવો',

    // Language Selector Section
    lang_section_title: 'સાર્વભૌમ બહુભાષી ઇન્ટરફેસ',
    lang_section_subtitle: 'ભારતના તમામ વર્તમાન અને ભાવિ પોર્ટલ, કરારો અને ડેશબોર્ડ માટે તમારી પસંદગીની ભાષા પસંદ કરો. આગળના તમામ પૃષ્ઠો આપોઆપ આ ભાષામાં બદલાઈ જશે.',
    lang_active_badge: 'સક્રિય સિસ્ટમ ભાષા',

    // Continuity card
    continuity_title: 'બ્રાન્ડ સુસંગતતા',
    continuity_heading: 'નેવબાર અને પ્રીલોડરનો એકસમાન લોગો',
    continuity_badge: '૧૦૦% ભૌમિતિક એકરૂપતા',
    continuity_navbar_title: 'નેવબાર પ્રતીક',
    continuity_navbar_desc: 'સ્ક્રોલ સ્થિતિમાં પણ ૨૪ આરાવાળું અશોક ચક્ર સ્પષ્ટ અને ફરતું રહે છે.',
    continuity_preloader_title: 'પ્રીલોડર પ્રતીક',
    continuity_preloader_desc: 'તિરંગા રંગછટા અને રોયલ બ્લુ બોર્ડર સાથે સંપૂર્ણ એકરૂપતા ધરાવે છે.',

    // Dashboard
    dash_tag: 'રાષ્ટ્રીય ડેશબોર્ડ',
    dash_title: 'ખરીદી અને વેપાર સૂચકાંક',
    dash_live_badge: 'લાઇવ સિંક • ૨૮ રાજ્યો અને ૮ કેન્દ્રશાસિત પ્રદેશો',
    kpi_gross_trade: 'કુલ વેપાર પરિમાણ',
    kpi_registered_msme: 'નોંધાયેલા એમએસએમઇ',
    kpi_active_hubs: 'સક્રિય રાજ્ય હબ',
    kpi_dispute_settlement: 'વિવાદ નિવારણ દર',
    kpi_vs_cycle: 'પાછલા ચક્રની સરખામણીએ',
    kpi_onboarded: 'આ અઠવાડિયે જોડાયેલા',
    kpi_pan_india: '૧૦૦% અખિલ ભારતીય વ્યાપ',
    kpi_escrow: 'સ્વચાલિત એસ્ક્રો ચુકવણી',

    // Finance
    fin_tag: 'નાણાં અને તિજોરી સુરક્ષા',
    fin_title: 'સ્વાયત્ત તરલતા અને એસ્ક્રો મંજૂરી',
    fin_desc: 'રાજ્ય બેંક અનામત અને ડિજિટલ ઇનવોઇસ દ્વારા સુરક્ષિત ત્વરિત ચુકવણી.',
    fin_card1_title: 'રાજ્ય અનામત ગેરંટી',
    fin_card1_desc: 'દરેક વાટાઘાટો કરાર રાજ્ય ભંડોળથી સુરક્ષિત છે, જેનાથી ગ્રામીણ વિક્રેતાઓનું જોખમ દૂર થાય છે.',
    fin_card2_title: 'સબસિડીવાળી એમએસએમઇ સહાય',
    fin_card2_desc: 'કારીગરો અને ઉત્પાદકો માટે કોઈ પણ ગીરો વગર આરબીઆઇ રેપો દરે તાત્કાલિક લોન.',
    fin_card3_title: 'જીએસટી ડિજિટલ ઓડિટ',
    fin_card3_desc: 'રાષ્ટ્રીય ઇ-વે બિલ અને જીએસટીએન ખાતાવહી સાથે સીધું સમાધાન.',

    // Negotiation
    neg_tag: 'વાટાઘાટો એન્જિન',
    neg_title: 'પારદર્શક બહુપક્ષીય ભાવ નિર્ધારણ',
    neg_desc: 'ભાવ, ડિલિવરી સમય અને સ્થાનિક ઉત્પાદન ક્ષમતાનું સંતુલન સાધતી આધુનિક પ્રાપ્તિ પ્રક્રિયા.',
    neg_step1_title: 'જરૂરિયાત પ્રસારણ',
    neg_step1_desc: 'ખરીદનાર પ્રાદેશિક પસંદગી સાથે માલસામાનની જરૂરિયાત નોંધાવે છે',
    neg_step2_title: 'અલ્ગોરિધમિક મેળવણી',
    neg_step2_desc: 'અંતર અને ક્ષમતાના આધારે સ્થાનિક ઉત્પાદકોની પસંદગી',
    neg_step3_title: 'સહમતિ વાટાઘાટો',
    neg_step3_desc: 'સ્વચાલિત રિવર્સ-હરાજી અને વાજબી ભાવ મર્યાદા અમલીકરણ',
    neg_step4_title: 'સ્માર્ટ કરાર સીલ',
    neg_step4_desc: 'માલ પહોંચ્યાની પુષ્ટિ થતાં એસ્ક્રોમાંથી આપોઆપ રકમ ટ્રાન્સફર',
    neg_simulation_title: 'સક્રિય પગલું: રિયલ-ટાઇમ ભાવ મર્યાદા મોડેલ',
    neg_simulation_desc: '૧૪ સહકારી મંડળીઓ વચ્ચે ક્વિન્ટલ દીઠ ₹૪,૨૦૦ થી ₹૪,૬૫૦ વચ્ચે બોલી સીમા નક્કી કરાઈ.',
    neg_advance_btn: 'આગળનું પગલું જુઓ →',

    // States
    state_tag: 'પ્રાદેશિક ફેડરેટેડ ગ્રીડ',
    state_title: 'રાજ્યવાર પ્રાપ્તિ સ્થિતિ',
    state_subtitle: 'સક્રિય કેન્દ્રોની જીવંત કામગીરી માહિતી',
    th_state: 'રાજ્ય / પ્રદેશ',
    th_volume: 'વેપાર મૂલ્ય',
    th_msmes: 'સક્રિય એકમો',
    th_expansion: 'વાર્ષિક વૃદ્ધિ',
    th_status: 'કેન્દ્ર સ્થિતિ',

    // Preloader
    preloader_badge: 'બ્રાન્ડ અનાવરણ',
    preloader_skip: 'મુખ્ય પેજ પર જાઓ',
    preloader_tagline_w1: 'એક',
    preloader_tagline_w2: 'નવો',
    preloader_tagline_w3: 'માર્ગ',
    preloader_tagline_w4: 'તરફ',
    preloader_tagline_w5: 'આત્મનિર્ભર',
    preloader_tagline_w6: 'ભારત',
    preloader_sub_left: 'સાર્વભૌમ પ્રાપ્તિ વ્યવસ્થા',
    preloader_sub_right: 'રાષ્ટ્રીય એકતા',

    // Footer
    footer_desc: 'સ્વનિર્ભર (SWANIRVAR) સમગ્ર ભારતમાં સ્થાનિક વેપાર અને આર્થિક સ્વાવલંબનને પ્રોત્સાહન આપવા માટે સમર્પિત છે.',
    footer_rights: 'સ્વનિર્ભર રાષ્ટ્રીય વાણિજ્ય માળખું. સર્વાધિકાર સુરક્ષિત.',
  },

  te: {
    // Nav
    nav_dashboard: 'డాష్‌బోర్డ్',
    nav_finance: 'ఆర్థికం & ఖజానా',
    nav_negotiation: 'చర్చలు & ఒప్పందాలు',
    nav_states: 'రాష్ట్రాలు',
    nav_login: 'లాగిన్',
    nav_signup: 'రిజిస్టర్',
    nav_play_preloader: 'ప్రీలోడర్',
    nav_official: 'అధికారిక',
    nav_change_lang: 'భాష',

    // Hero
    hero_badge: 'జాతీయ స్వయం సమృద్ధి వాణిజ్య నెట్‌వర్క్',
    hero_title_p1: 'దిశగా నూతన మార్గం:',
    hero_title_aatmanirbhar: 'ఆత్మనిర్భర్',
    hero_title_bharat: 'భారత్',
    hero_subtitle:
      'స్వనిర్భర్ (SWANIRVAR) రాష్ట్ర ఖజానాలు, నమోదిత సూక్ష్మ-చిన్న పరిశ్రమలు మరియు సంస్థాగత కొనుగోలుదారులను పారదర్శక ప్రత్యక్ష చర్చలు, తక్షణ చెల్లింపులతో అనుసంధానిస్తుంది.',
    hero_cta_dashboard: 'డాష్‌బోర్డ్ చూడండి',
    hero_cta_preloader: 'బ్రాండ్ ప్రీలోడర్ ప్లే చేయండి',

    // Language Selector Section
    lang_section_title: 'బహుభాషా సార్వభౌమ ఇంటర్‌ఫేస్',
    lang_section_subtitle: 'భారతదేశ వ్యాప్తంగా ప్రస్తుత మరియు భవిష్యత్ పోర్టల్‌లు, ఒప్పందాలు మరియు డాష్‌బోర్డ్‌ల కోసం మీ ప్రాధాన్య భాషను ఎంచుకోండి. భవిష్యత్ పేజీలన్నీ స్వయంచాలకంగా ఈ భాషకు మారతాయి.',
    lang_active_badge: 'ప్రస్తుత సిస్టమ్ భాష',

    // Continuity card
    continuity_title: 'బ్రాండ్ గుర్తింపు కొనసాగింపు',
    continuity_heading: 'న్యావ్‌బార్ మరియు ప్రీలోడర్ ఒకే విధమైన లోగో రూపం',
    continuity_badge: '100% జ్యామితీయ అనుగుణ్యత',
    continuity_navbar_title: 'న్యావ్‌బార్ లోగో',
    continuity_navbar_desc: 'స్క్రోల్ అయినప్పుడు కూడా 24 ఆకుల అశోక చక్రం స్పష్టంగా తిరుగుతూ కనిపిస్తుంది.',
    continuity_preloader_title: 'ప్రీలోడర్ లోగో',
    continuity_preloader_desc: 'త్రివర్ణ రంగులు, రాయల్ బ్లూ బోర్డర్ మరియు తిరిగే చక్రంతో సంపూర్ణ ఏకరూపతను కలిగి ఉంటుంది.',

    // Dashboard
    dash_tag: 'జాతీయ డాష్‌బోర్డ్',
    dash_title: 'కొనుగోళ్లు మరియు సార్వభౌమ వాణిజ్య సూచిక',
    dash_live_badge: 'ప్రత్యక్ష సమన్వయం • 28 రాష్ట్రాలు & 8 కేంద్రపాలిత ప్రాంతాలు',
    kpi_gross_trade: 'మొత్తం వాణిజ్య పరిమాణం',
    kpi_registered_msme: 'నమోదిత ఎంఎస్‌ఎంఈలు',
    kpi_active_hubs: 'క్రియాశీల రాష్ట్ర కేంద్రాలు',
    kpi_dispute_settlement: 'సమస్యల పరిష్కార రేటు',
    kpi_vs_cycle: 'గత చక్రంతో పోలిస్తే',
    kpi_onboarded: 'ఈ వారం చేరిన సంస్థలు',
    kpi_pan_india: '100% అఖిల భారత కవరేజ్',
    kpi_escrow: 'స్వయంచాలక ఎస్క్రో క్లియరెన్స్‌లు',

    // Finance
    fin_tag: 'ఆర్థిక భద్రత & ఖజానా',
    fin_title: 'స్వతంత్ర ద్రవ్యత మరియు ఎస్క్రో విడుదల',
    fin_desc: 'రాష్ట్ర బ్యాంక్ నిల్వలు మరియు డిజిటల్ ఇన్వాయిస్‌ల ద్వారా తక్షణ చెల్లింపుల హామీ.',
    fin_card1_title: 'రాష్ట్ర రిజర్వ్ హామీ',
    fin_card1_desc: 'ప్రతి ఒప్పందం రాష్ట్ర నిధులతో భద్రపరచబడుతుంది, గ్రామీణ విక్రేతలకు ఎలాంటి నష్టం జరగదు.',
    fin_card2_title: 'రాయితీతో కూడిన చిన్న పరిశ్రమల రుణాలు',
    fin_card2_desc: 'ఎలాంటి తాకట్టు లేకుండా ఆర్బీఐ రెపో రేటు వద్ద చేతివృత్తుల వారికి మరియు సంస్థలకు తక్షణ మూలధనం.',
    fin_card3_title: 'జీఎస్టీ డిజిటల్ తనిఖీ',
    fin_card3_desc: 'ఈ-వే బిల్లులు మరియు జీఎస్టీఎన్ లెడ్జర్‌తో ప్రత్యక్ష సమన్వయం.',

    // Negotiation
    neg_tag: 'చర్చల ఇంజిన్',
    neg_title: 'పారదర్శక బహుపాక్షిక ధరల నిర్ణయం',
    neg_desc: 'ధర, డెలివరీ సమయం మరియు స్థానిక ఉత్పత్తి కోటాను సమతుల్యం చేసే ఆధునిక కొనుగోలు విధానం.',
    neg_step1_title: 'అవసరాల ప్రకటన',
    neg_step1_desc: 'కొనుగోలుదారు స్థానిక ప్రాధాన్యతతో వస్తువుల అవసరాన్ని నమోదు చేస్తారు',
    neg_step2_title: 'అల్గోరిథమిక్ ఎంపిక',
    neg_step2_desc: 'రవాణా దూరం మరియు సామర్థ్యం ఆధారంగా స్థానిక ఉత్పత్తిదారుల ఎంపిక',
    neg_step3_title: 'సమ్మతి చర్చలు',
    neg_step3_desc: 'రివర్స్ వేలం మరియు న్యాయమైన ధరల పరిధి అమలు',
    neg_step4_title: 'స్మార్ట్ కాంట్రాక్ట్ లాక్',
    neg_step4_desc: 'వస్తువుల చేరిక ధృవీకరణ తర్వాత ఎస్క్రో ఖాతా నుండి నిధుల విడుదల',
    neg_simulation_title: 'క్రియాశీల దశ: ప్రత్యక్ష ధరల పరిధి పరిశీలన',
    neg_simulation_desc: '14 సహకార సంఘాల మధ్య క్వింటాలుకు ₹4,200 నుండి ₹4,650 మధ్య బిడ్డింగ్ పరిధి నిర్ణయించబడింది.',
    neg_advance_btn: 'తదుపరి దశకు వెళ్లండి →',

    // States
    state_tag: 'ప్రాంతీయ ఫెడరేటెడ్ గ్రిడ్',
    state_title: 'రాష్ట్రాల వారీగా కొనుగోలు స్థితి',
    state_subtitle: 'క్రియాశీల రాష్ట్ర కేంద్రాల ప్రత్యక్ష పనితీరు సూచికలు',
    th_state: 'రాష్ట్రం / ప్రాంతం',
    th_volume: 'వాణిజ్య పరిమాణం',
    th_msmes: 'క్రియాశీల సంస్థలు',
    th_expansion: 'వార్షిక వృద్ధి',
    th_status: 'కేంద్రం స్థితి',

    // Preloader
    preloader_badge: 'బ్రాండ్ ఆవిష్కరణ',
    preloader_skip: 'ప్రధాన పేజీకి వెళ్లండి',
    preloader_tagline_w1: 'ఒక',
    preloader_tagline_w2: 'కొత్త',
    preloader_tagline_w3: 'దారి',
    preloader_tagline_w4: 'దిశగా',
    preloader_tagline_w5: 'ఆత్మనిర్భర్',
    preloader_tagline_w6: 'భారత్',
    preloader_sub_left: 'సార్వభౌమ కొనుగోలు విధానం',
    preloader_sub_right: 'జాతీయ సమగ్రత',

    // Footer
    footer_desc: 'స్వనిర్భర్ (SWANIRVAR) భారతదేశంలోని అన్ని రాష్ట్రాలు మరియు కేంద్రపాలిత ప్రాంతాలలో స్వదేశీ వాణిజ్యాన్ని, సుస్థిర ఆర్థికాభివృద్ధిని పెంపొందించడానికి అంకితం చేయబడింది.',
    footer_rights: 'స్వనిర్భర్ జాతీయ వాణిజ్య మౌలిక సదుపాయాలు. సర్వహక్కులూ ప్రత్యేకించబడినవి.',
  },

  kn: {
    // Nav
    nav_dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    nav_finance: 'ಹಣಕಾಸು & ಖಜಾನೆ',
    nav_negotiation: 'ಸಮಾಲೋಚನೆ & ವಹಿವಾಟು',
    nav_states: 'ರಾಜ್ಯಗಳು',
    nav_login: 'ಲಾಗಿನ್',
    nav_signup: 'ನೋಂದಣಿ',
    nav_play_preloader: 'ಪ್ರೀಲೋಡರ್',
    nav_official: 'ಅಧಿಕೃತ',
    nav_change_lang: 'ಭಾಷೆ',

    // Hero
    hero_badge: 'ರಾಷ್ಟ್ರೀಯ ಸ್ವಾವಲಂಬನೆ ವಾಣಿಜ್ಯ ಜಾಲ',
    hero_title_p1: 'ಕಡೆಗೆ ಒಂದು ಹೊಸ ದಾರಿ:',
    hero_title_aatmanirbhar: 'ಆತ್ಮನಿರ್ಭರ',
    hero_title_bharat: 'ಭಾರತ',
    hero_subtitle:
      'ಸ್ವನಿರ್ಭರ್ (SWANIRVAR) ರಾಜ್ಯ ಖಜಾನೆಗಳು, ಪ್ರಮಾಣೀಕೃತ ಪ್ರಾದೇಶಿಕ ಉದ್ಯಮಗಳು ಮತ್ತು ಸಾಂಸ್ಥಿಕ ಖರೀದಿದಾರರನ್ನು ಪಾರದರ್ಶಕ ಸಮಾಲೋಚನೆ ಮತ್ತು ಸ್ವಾಯತ್ತ ಪಾವತಿಗಳೊಂದಿಗೆ ಸಂಯೋಜಿಸುತ್ತದೆ.',
    hero_cta_dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವೀಕ್ಷಿಸಿ',
    hero_cta_preloader: 'ಬ್ರ್ಯಾಂಡ್ ಪ್ರೀಲೋಡರ್ ಮರುಚಾಲನೆ',

    // Language Selector Section
    lang_section_title: 'ಸಾರ್ವಭೌಮ ಬಹುಭಾಷಾ ಇಂಟರ್‌ಫೇಸ್',
    lang_section_subtitle: 'ಭಾರತದಾದ್ಯಂತ ಎಲ್ಲಾ ಪ್ರಸ್ತುತ ಮತ್ತು ಭವಿಷ್ಯದ ಪೋರ್ಟಲ್‌ಗಳು, ಒಪ್ಪಂದಗಳು ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳಿಗಾಗಿ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಮುಂದಿನ ಎಲ್ಲಾ ಪುಟಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಈ ಭಾಷೆಗೆ ಬದಲಾಗುತ್ತವೆ.',
    lang_active_badge: 'ಸಕ್ರಿಯ ಸಿಸ್ಟಮ್ ಭಾಷೆ',

    // Continuity card
    continuity_title: 'ಬ್ರ್ಯಾಂಡ್ ನಿರಂತರತೆ',
    continuity_heading: 'ನ್ಯಾವ್‌ಬಾರ್ ಮತ್ತು ಪ್ರೀಲೋಡರ್‌ನ ಒಂದೇ ರೀತಿಯ ಲೋಗೋ ವಿನ್ಯಾಸ',
    continuity_badge: '೧೦೦% ಜ್ಯಾಮಿತೀಯ ಸಾಮ್ಯತೆ',
    continuity_navbar_title: 'ನ್ಯಾವ್‌ಬಾರ್ ಲೋಗೋ',
    continuity_navbar_desc: 'ಸ್ಕ್ರಾಲ್ ಆದಾಗಲೂ ೨೪ ಅರಗಳ ಅಶೋಕ ಚಕ್ರವು ಸ್ಪಷ್ಟವಾಗಿ ಸುತ್ತುತ್ತಿರುತ್ತದೆ.',
    continuity_preloader_title: 'ಪ್ರೀಲೋಡರ್ ಲೋಗೋ',
    continuity_preloader_desc: 'ಅದೇ ತ್ರಿವರ್ಣ ಗ್ರೇಡಿಯಂಟ್, ರಾಯಲ್ ನೀಲಿ ಅಂಚು ಮತ್ತು ತಿರುಗುವ ಚಕ್ರವನ್ನು ಹೊಂದಿದೆ.',

    // Dashboard
    dash_tag: 'ರಾಷ್ಟ್ರೀಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    dash_title: 'ಖರೀದಿ ಮತ್ತು ಸಾರ್ವಭೌಮ ವ್ಯಾಪಾರ ಸೂಚ್ಯಂಕ',
    dash_live_badge: 'ನೇರ ಸಮನ್ವಯ • ೨೮ ರಾಜ್ಯಗಳು & ೮ ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳು',
    kpi_gross_trade: 'ಒಟ್ಟು ವ್ಯಾಪಾರ ವಹಿವಾಟು',
    kpi_registered_msme: 'ನೋಂದಾಯಿತ ಎಂಎಸ್‌ಎಂಇಗಳು',
    kpi_active_hubs: 'ಸಕ್ರಿಯ ರಾಜ್ಯ ಕೇಂದ್ರಗಳು',
    kpi_dispute_settlement: 'ವಿವಾದ ಪರಿಹಾರ ದರ',
    kpi_vs_cycle: 'ಹಿಂದಿನ ಅವಧಿಗೆ ಹೋಲಿಸಿದರೆ',
    kpi_onboarded: 'ಈ ವಾರ ನೋಂದಣಿಯಾದ ಸಂಸ್ಥೆಗಳು',
    kpi_pan_india: '೧೦೦% ಅಖಿಲ ಭಾರತ ವ್ಯಾಪ್ತಿ',
    kpi_escrow: 'ಸ್ವಯಂಚಾಲಿತ ಎಸ್ಕ್ರೋ ಪಾವತಿಗಳು',

    // Finance
    fin_tag: 'ಹಣಕಾಸು & ಖಜಾನೆ ಭದ್ರತೆ',
    fin_title: 'ಸ್ವಾಯತ್ತ ನಗದು ಹರಿವು & ಎಸ್ಕ್ರೋ ಅನುಮೋದನೆ',
    fin_desc: 'ರಾಜ್ಯ ಬ್ಯಾಂಕ್ ಮೀಸಲು ಮತ್ತು ಡಿಜಿಟಲ್ ಇನ್‌ವಾಯ್ಸ್‌ಗಳಿಂದ ಸುರಕ್ಷಿತವಾದ ತಕ್ಷಣದ ಪಾವತಿ ವ್ಯವಸ್ಥೆ.',
    fin_card1_title: 'ರಾಜ್ಯ ಮೀಸಲು ಗ್ಯಾರಂಟಿ',
    fin_card1_desc: 'ಪ್ರತಿಯೊಂದು ಒಪ್ಪಂದವು ಸರ್ಕಾರದ ಹಣಕಾಸು ಬೆಂಬಲವನ್ನು ಹೊಂದಿರುವುದರಿಂದ ಗ್ರಾಮೀಣ ಮಾರಾಟಗಾರರಿಗೆ ಯಾವುದೇ ನಷ್ಟದ ಭಯವಿಲ್ಲ.',
    fin_card2_title: 'ರಿಯಾಯಿತಿ ಎಂಎಸ್‌ಎಂಇ ಹಣಕಾಸು',
    fin_card2_desc: 'ಯಾವುದೇ ಅಡಮಾನವಿಲ್ಲದೆ ಆರ್‌ಬಿಐ ರೆಪೊ ದರದಲ್ಲಿ ಕುಶಲಕರ್ಮಿಗಳಿಗೆ ಮತ್ತು ಉದ್ಯಮಿಗಳಿಗೆ ತಕ್ಷಣದ ಸಾಲ.',
    fin_card3_title: 'ಜಿಎಸ್‌ಟಿ ಡಿಜಿಟಲ್ ಪರಿಶೀಲನೆ',
    fin_card3_desc: 'ಇ-ವೇ ಬಿಲ್ ಮತ್ತು ಜಿಎಸ್‌ಟಿಎನ್ ಲೆಡ್ಜರ್‌ನೊಂದಿಗೆ ನೇರ ಸಮನ್ವಯ.',

    // Negotiation
    neg_tag: 'ಸಮಾಲೋಚನಾ ಎಂಜಿನ್',
    neg_title: 'ಪಾರದರ್ಶಕ ಬಹುಪಕ್ಷೀಯ ಬೆಲೆ ನಿರ್ಧಾರ',
    neg_desc: 'ಬೆಲೆ, ವಿತರಣಾ ಸಮಯ ಮತ್ತು ಸ್ಥಳೀಯ ಉತ್ಪಾದನಾ ಸಾಮರ್ಥ್ಯವನ್ನು ಸರಿದೂಗಿಸುವ ಆಧುನಿಕ ಖರೀದಿ ಪ್ರಕ್ರಿಯೆ.',
    neg_step1_title: 'ಬೇಡಿಕೆ ಪ್ರಕಟಣೆ',
    neg_step1_desc: 'ಖರೀದಿದಾರರು ಪ್ರಾದೇಶಿಕ ಆದ್ಯತೆಯೊಂದಿಗೆ ಸರಕುಗಳ ಅಗತ್ಯವನ್ನು ನೋಂದಾಯಿಸುತ್ತಾರೆ',
    neg_step2_title: 'ಅಲ್ಗಾರಿದಮಿಕ್ ಆಯ್ಕೆ',
    neg_step2_desc: 'ಸಾರಿಗೆ ದೂರ ಮತ್ತು ಸಾಮರ್ಥ್ಯದ ಆಧಾರದ ಮೇಲೆ ಸ್ಥಳೀಯ ಉತ್ಪಾದಕರ ಆಯ್ಕೆ',
    neg_step3_title: 'ಒಮ್ಮತ ಸಮಾಲೋಚನೆ',
    neg_step3_desc: 'ಸ್ವಯಂಚಾಲಿತ ರಿವರ್ಸ್-ಹರಾಜು ಮತ್ತು ನ್ಯಾಯಯುತ ಬೆಲೆ ಮಿತಿ ಅನುಷ್ಠಾನ',
    neg_step4_title: 'ಸ್ಮಾರ್ಟ್ ಕಾಂಟ್ರಾಕ್ಟ್ ಲಾಕ್',
    neg_step4_desc: 'ವಸ್ತು ತಲುಪಿದ ಖಚಿತತೆಯ ನಂತರ ಎಸ್ಕ್ರೋ ಖಾತೆಯಿಂದ ಹಣ ಬಿಡುಗಡೆ',
    neg_simulation_title: 'ಸಕ್ರಿಯ ಹಂತ: ನೇರ ಬೆಲೆ ಮಿತಿ ಪರಿಶೀಲನೆ',
    neg_simulation_desc: '೧೪ ಸಹಕಾರಿ ಸಂಘಗಳ ನಡುವೆ ಪ್ರತಿ ಕ್ವಿಂಟಲ್‌ಗೆ ₹೪,೨೦೦ ರಿಂದ ₹೪,೬೫೦ ರೊಳಗೆ ಬಿಡ್ಡಿಂಗ್ ನಿಗದಿಯಾಗಿದೆ.',
    neg_advance_btn: 'ಮುಂದಿನ ಹಂತಕ್ಕೆ ಹೋಗಿ →',

    // States
    state_tag: 'ಪ್ರಾದೇಶಿಕ ಫೆಡರೇಟೆಡ್ ಗ್ರಿಡ್',
    state_title: 'ರಾಜ್ಯವಾರು ಖರೀದಿ ಪ್ರಗತಿ',
    state_subtitle: 'ಸಕ್ರಿಯ ರಾಜ್ಯ ಕೇಂದ್ರಗಳ ನೇರ ಕಾರ್ಯಕ್ಷಮತೆ ಸೂಚಕಗಳು',
    th_state: 'ರಾಜ್ಯ / ಪ್ರಾದೇಶಿಕ',
    th_volume: 'ವ್ಯಾಪಾರ ಪ್ರಮಾಣ',
    th_msmes: 'ಸಕ್ರಿಯ ಎಂಎಸ್‌ಎಂಇಗಳು',
    th_expansion: 'ವಾರ್ಷಿಕ ಬೆಳವಣಿಗೆ',
    th_status: 'ಕೇಂದ್ರದ ಸ್ಥಿತಿ',

    // Preloader
    preloader_badge: 'ಬ್ರ್ಯಾಂಡ್ ಅನಾವರಣ',
    preloader_skip: 'ಮುಖ್ಯ ಪುಟಕ್ಕೆ ತೆರಳಿ',
    preloader_tagline_w1: 'ಒಂದು',
    preloader_tagline_w2: 'ಹೊಸ',
    preloader_tagline_w3: 'ದಾರಿ',
    preloader_tagline_w4: 'ಕಡೆಗೆ',
    preloader_tagline_w5: 'ಆತ್ಮನಿರ್ಭರ',
    preloader_tagline_w6: 'ಭಾರತ',
    preloader_sub_left: 'ಸಾರ್ವಭೌಮ ಖರೀದಿ ವ್ಯವಸ್ಥೆ',
    preloader_sub_right: 'ರಾಷ್ಟ್ರೀಯ ಏಕತೆ',

    // Footer
    footer_desc: 'ಸ್ವನಿರ್ಭರ್ (SWANIRVAR) ಭಾರತದ ಎಲ್ಲಾ ರಾಜ್ಯಗಳು ಮತ್ತು ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸ್ವಾವಲಂಬಿ ಆರ್ಥಿಕತೆ ಮತ್ತು ಸುಸ್ಥಿರ ವ್ಯಾಪಾರವನ್ನು ಉತ್ತೇಜಿಸಲು ಸಮರ್ಪಿತವಾಗಿದೆ.',
    footer_rights: 'ಸ್ವನಿರ್ಭರ್ ರಾಷ್ಟ್ರೀಯ ವಾಣಿಜ್ಯ ಮೂಲಸೌಕರ್ಯ. ಸರ್ವ ಹಕ್ಕುಗಳೂ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
  },

  ml: {
    // Nav
    nav_dashboard: 'ഡാഷ്‌ബോർഡ്',
    nav_finance: 'ധനകാര്യം & ഖജനാവ്',
    nav_negotiation: 'ചർച്ചകളും ഇടപാടുകളും',
    nav_states: 'സംസ്ഥാനങ്ങൾ',
    nav_login: 'ലോഗിൻ',
    nav_signup: 'രജിസ്ട്രേഷൻ',
    nav_play_preloader: 'പ്രീലോഡർ',
    nav_official: 'ഔദ്യോഗികം',
    nav_change_lang: 'ഭാഷ',

    // Hero
    hero_badge: 'ദേശീയ സ്വാശ്രയ വ്യാപാര ശൃംഖല',
    hero_title_p1: 'ഒരു പുതിയ വഴി:',
    hero_title_aatmanirbhar: 'ആത്മനിർഭർ',
    hero_title_bharat: 'ഭാരതം',
    hero_subtitle:
      'സംസ്ഥാന ഖജനാവുകളെയും പ്രാദേശിക സംരംഭങ്ങളെയും സ്ഥാപന വാങ്ങലുകാരെയും തത്സമയ സുതാര്യ ഇടപാടുകളിലൂടെ സ്വനിർഭർ (SWANIRVAR) ബന്ധിപ്പിക്കുന്നു.',
    hero_cta_dashboard: 'ഡാഷ്‌ബോർഡ് കാണുക',
    hero_cta_preloader: 'പ്രീലോഡർ വീണ്ടും കാണുക',

    // Language Selector Section
    lang_section_title: 'ബഹുഭാഷാ പരമാധികാര ഇന്റർഫേസ്',
    lang_section_subtitle: 'ഇന്ത്യയിലുടനീളമുള്ള നിലവിലുള്ളതും ഭാവിയിലെതുമായ എല്ലാ പോർട്ടലുകൾക്കും ഡാഷ്‌ബോർഡുകൾക്കുമായി നിങ്ങളുടെ ഇഷ്ട ഭാഷ തിരഞ്ഞെടുക്കുക. എല്ലാ ഭാവി പേജുകളും സ്വയമേവ ഈ ഭാഷയിലേക്ക് മാറും.',
    lang_active_badge: 'സജീവ സിസ്റ്റം ഭാഷ',

    // Continuity card
    continuity_title: 'ബ്രാൻഡ് തുടർച്ച',
    continuity_heading: 'നാവ്‌ബാറിലും പ്രീലോഡറിലും ഒരേപോലുള്ള ലോഗോ',
    continuity_badge: '100% ജ്യാമിതീയ പൊരുത്തം',
    continuity_navbar_title: 'നാവ്‌ബാർ ചിഹ്നം',
    continuity_navbar_desc: 'സ്ക്രോൾ ചെയ്യുമ്പോഴും 24 ആരങ്ങളുള്ള അശോകചക്രം വ്യക്തമായി കറങ്ങുന്നു.',
    continuity_preloader_title: 'പ്രീലോഡർ ചിഹ്നം',
    continuity_preloader_desc: 'ത്രിവർണ്ണ നിറങ്ങളും നീല വരകളും തിരിയുന്ന ചക്രവും പൂർണ്ണമായി ഒത്തുപോകുന്നു.',

    // Dashboard
    dash_tag: 'ദേശീയ ഡാഷ്‌ബോർഡ്',
    dash_title: 'സംഭരണവും ദേശീയ വ്യാപാര സൂചികയും',
    dash_live_badge: 'തത്സമയം • 28 സംസ്ഥാനങ്ങളും 8 കേന്ദ്രഭരണ പ്രദേശങ്ങളും',
    kpi_gross_trade: 'മൊത്തം വ്യാപാര മൂല്യം',
    kpi_registered_msme: 'രജിസ്റ്റർ ചെയ്ത സംരംഭങ്ങൾ',
    kpi_active_hubs: 'സജീവ സംസ്ഥാന കേന്ദ്രങ്ങൾ',
    kpi_dispute_settlement: 'തർക്ക പരിഹാര നിരക്ക്',
    kpi_vs_cycle: 'മുമ്പത്തെ ഘട്ടവുമായി താരതമ്യം ചെയ്യുമ്പോൾ',
    kpi_onboarded: 'ഈ ആഴ്ച ചേർന്ന പുതിയ സംരംഭങ്ങൾ',
    kpi_pan_india: '100% അഖിലേന്ത്യാ വ്യാപനം',
    kpi_escrow: 'യാന്ത്രിക എസ്ക്രോ ഇടപാടുകൾ',

    // Finance
    fin_tag: 'ധനകാര്യവും ഖജനാവും',
    fin_title: 'തടസ്സമില്ലാത്ത ധനലഭ്യതയും എസ്ക്രോയും',
    fin_desc: 'സംസ്ഥാന ബാങ്ക് ഉറപ്പുകളോടെയുള്ള തത്സമയ ഡിജിറ്റൽ ഇടപാടുകൾ.',
    fin_card1_title: 'സംസ്ഥാന കരുതൽ ഉറപ്പ്',
    fin_card1_desc: 'ഓരോ ഇടപാടും സർക്കാർ ഫണ്ടുകളാൽ സംരക്ഷിക്കപ്പെടുന്നു, അതിനാൽ കർഷകർക്കും വ്യാപാരികൾക്കും സുരക്ഷിതത്വം ഉറപ്പാണ്.',
    fin_card2_title: 'ലളിതമായ ചെറുകിട വായ്പകൾ',
    fin_card2_desc: 'ഈടില്ലാതെ റിസർവ് ബാങ്ക് നിരക്കിൽ നിർമ്മാതാക്കൾക്കും തൊഴിലാളികൾക്കും ഉടൻ പണലഭ്യത.',
    fin_card3_title: 'ജിഎസ്ടി ഡിജിറ്റൽ ഓഡിറ്റ്',
    fin_card3_desc: 'ഇ-വേ ബില്ലുകളുമായും ജിഎസ്ടിഎൻ രേഖകളുമായും തത്സമയ കൃത്യത.',

    // Negotiation
    neg_tag: 'വിലപേശൽ സംവിധാനം',
    neg_title: 'സുതാര്യമായ വിലനിർണ്ണയം',
    neg_desc: 'വിലയും ഗുണനിലവാരവും ഉറപ്പുവരുത്തുന്ന ആധുനിക സംഭരണ രീതി.',
    neg_step1_title: 'ആവശ്യം അറിയിക്കൽ',
    neg_step1_desc: 'വാങ്ങുന്നയാൾ പ്രാദേശിക ആവശ്യങ്ങൾ കൃത്യമായി രേഖപ്പെടുത്തുന്നു',
    neg_step2_title: 'അൽഗോരിതമിക് കണ്ടെത്തൽ',
    neg_step2_desc: 'ദൂരവും ശേഷിയും അടിസ്ഥാനമാക്കി ഉചിതമായ ഉൽപ്പാദകരെ കണ്ടെത്തൽ',
    neg_step3_title: 'വില ചർച്ച',
    neg_step3_desc: 'സുതാര്യമായ ലേലത്തിലൂടെ ന്യായവില ഉറപ്പാക്കൽ',
    neg_step4_title: 'കരാർ ഉറപ്പിക്കൽ',
    neg_step4_desc: 'ഉൽപ്പന്നങ്ങൾ ലഭിച്ചാലുടൻ എസ്ക്രോ അക്കൗണ്ടിൽ നിന്ന് പണം കൈമാറൽ',
    neg_simulation_title: 'സജീവ ഘട്ടം: തത്സമയ വില നിരീക്ഷണ മാതൃക',
    neg_simulation_desc: '14 സഹകരണ സംഘങ്ങൾക്കിടയിൽ ക്വിന്റലിന് ₹4,200 മുതൽ ₹4,650 വരെ പരിധി നിശ്ചയിച്ചു.',
    neg_advance_btn: 'അടുത്ത ഘട്ടം കാണുക →',

    // States
    state_tag: 'പ്രാദേശിക ശൃംഖല',
    state_title: 'സംസ്ഥാനതല സംഭരണ പുരോഗതി',
    state_subtitle: 'സജീവ കേന്ദ്രങ്ങളുടെ തത്സമയ പ്രവർത്തന വിവരങ്ങൾ',
    th_state: 'സംസ്ഥാനം / പ്രദേശം',
    th_volume: 'വ്യാപാര മൂല്യം',
    th_msmes: 'സജീവ സംരംഭങ്ങൾ',
    th_expansion: 'വാർഷിക വളർച്ച',
    th_status: 'കേന്ദ്ര നില',

    // Preloader
    preloader_badge: 'ബ്രാൻഡ് അനാവരണം',
    preloader_skip: 'പ്രധാന പേജിലേക്ക് കടക്കുക',
    preloader_tagline_w1: 'ഒരു',
    preloader_tagline_w2: 'പുതിയ',
    preloader_tagline_w3: 'വഴി',
    preloader_tagline_w4: 'ലക്ഷ്യമാക്കി',
    preloader_tagline_w5: 'ആത്മനിർഭർ',
    preloader_tagline_w6: 'ഭാരതം',
    preloader_sub_left: 'പരമാധികാര സംഭരണ രീതി',
    preloader_sub_right: 'ദേശീയ സമഗ്രത',

    // Footer
    footer_desc: 'ഇന്ത്യയിലെ എല്ലാ സംസ്ഥാനങ്ങളിലും തദ്ദേശീയ വ്യാപാരവും സ്വാശ്രയത്വവും വളർത്താൻ സ്വനിർഭർ (SWANIRVAR) പ്രവർത്തിക്കുന്നു.',
    footer_rights: 'സ്വനിർഭർ ദേശീയ വാണിജ്യ ശൃംഖല. സർവ്വ അവകാശങ്ങളും നിക്ഷിപ്തം.',
  },

  pa: {
    // Nav
    nav_dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    nav_finance: 'ਵਿੱਤ ਅਤੇ ਖ਼ਜ਼ਾਨਾ',
    nav_negotiation: 'ਗੱਲਬਾਤ ਅਤੇ ਸੌਦੇ',
    nav_states: 'ਸੂਬੇ',
    nav_login: 'ਲਾਗਇਨ',
    nav_signup: 'ਰਜਿਸਟਰ',
    nav_play_preloader: 'ਪ੍ਰੀਲੋਡਰ',
    nav_official: 'ਅਧਿਕਾਰਤ',
    nav_change_lang: 'ਭਾਸ਼ਾ',

    // Hero
    hero_badge: 'ਕੌਮੀ ਆਤਮਨਿਰਭਰ ਵਪਾਰਕ ਨੈੱਟਵਰਕ',
    hero_title_p1: 'ਵੱਲ ਇੱਕ ਨਵਾਂ ਰਾਹ:',
    hero_title_aatmanirbhar: 'ਆਤਮਨਿਰਭਰ',
    hero_title_bharat: 'ਭਾਰਤ',
    hero_subtitle:
      'ਸਵਨਿਰਭਰ (SWANIRVAR) ਸੂਬਾਈ ਖ਼ਜ਼ਾਨਿਆਂ, ਪ੍ਰਮਾਣਿਤ ਸਥਾਨਕ ਉੱਦਮਾਂ ਅਤੇ ਸੰਸਥਾਗਤ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਪਾਰਦਰਸ਼ੀ ਸੌਦੇਬਾਜ਼ੀ ਅਤੇ ਤੁਰੰਤ ਅਦਾਇਗੀਆਂ ਨਾਲ ਜੋੜਦਾ ਹੈ।',
    hero_cta_dashboard: 'ਡੈਸ਼ਬੋਰਡ ਵੇਖੋ',
    hero_cta_preloader: 'ਬ੍ਰਾਂਡ ਪ੍ਰੀਲੋਡਰ ਚਲਾਓ',

    // Language Selector Section
    lang_section_title: 'ਬਹੁ-ਭਾਸ਼ਾਈ ਸਾਰਵਭੌਮ ਇੰਟਰਫੇਸ',
    lang_section_subtitle: 'ਭਾਰਤ ਭਰ ਦੇ ਸਾਰੇ ਮੌਜੂਦਾ ਅਤੇ ਭਵਿੱਖੀ ਪੋਰਟਲਾਂ, ਇਕਰਾਰਨਾਮਿਆਂ ਅਤੇ ਡੈਸ਼ਬੋਰਡਾਂ ਲਈ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ। ਸਾਰੇ ਭਵਿੱਖੀ ਪੰਨੇ ਆਪਣੇ ਆਪ ਇਸ ਭਾਸ਼ਾ ਵਿੱਚ ਬਦਲ ਜਾਣਗੇ।',
    lang_active_badge: 'ਸਰਗਰਮ ਸਿਸਟਮ ਭਾਸ਼ਾ',

    // Continuity card
    continuity_title: 'ਬ੍ਰਾਂਡ ਦੀ ਨਿਰੰਤਰਤਾ',
    continuity_heading: 'ਨੈਵਬਾਰ ਅਤੇ ਪ੍ਰੀਲੋਡਰ ਦਾ ਬਿਲਕੁਲ ਇਕੋ ਜਿਹਾ ਲੋਗੋ',
    continuity_badge: '100% ਜਿਓਮੈਟ੍ਰਿਕ ਮੇਲ',
    continuity_navbar_title: 'ਨੈਵਬਾਰ ਲੋਗੋ',
    continuity_navbar_desc: 'ਸਕ੍ਰੋਲ ਹੋਣ ਤੇ ਵੀ 24 ਤੀਲੀਆਂ ਵਾਲਾ ਅਸ਼ੋਕ ਚੱਕਰ ਸਾਫ਼ ਘੁੰਮਦਾ ਵਿਖਾਈ ਦਿੰਦਾ ਹੈ।',
    continuity_preloader_title: 'ਪ੍ਰੀਲੋਡਰ ਲੋਗੋ',
    continuity_preloader_desc: 'ਤਿਰੰਗੇ ਰੰਗਾਂ, ਰਾਇਲ ਬਲੂ ਬਾਰਡਰ ਅਤੇ ਘੁੰਮਦੇ ਚੱਕਰ ਨਾਲ ਪੂਰਨ ਸਮਾਨਤਾ ਰੱਖਦਾ ਹੈ।',

    // Dashboard
    dash_tag: 'ਕੌਮੀ ਡੈਸ਼ਬੋਰਡ',
    dash_title: 'ਖਰੀਦ ਅਤੇ ਵਪਾਰ ਸੂਚਕਾਂਕ',
    dash_live_badge: 'ਲਾਈਵ • 28 ਸੂਬੇ ਅਤੇ 8 ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼',
    kpi_gross_trade: 'ਕੁੱਲ ਵਪਾਰਕ ਮਾਤਰਾ',
    kpi_registered_msme: 'ਰਜਿਸਟਰਡ ਐਮਐਸਐਮਈ',
    kpi_active_hubs: 'ਸਰਗਰਮ ਸੂਬਾਈ ਕੇਂਦਰ',
    kpi_dispute_settlement: 'ਨਿਪਟਾਰਾ ਦਰ',
    kpi_vs_cycle: 'ਪਿਛਲੇ ਗੇੜ ਦੇ ਮੁਕਾਬਲੇ',
    kpi_onboarded: 'ਇਸ ਹਫ਼ਤੇ ਜੁੜੇ ਉੱਦਮ',
    kpi_pan_india: '100% ਆਲ-ਇੰਡੀਆ ਕਵਰੇਜ',
    kpi_escrow: 'ਸਵੈਚਾਲਤ ਐਸਕਰੋ ਭੁਗਤਾਨ',

    // Finance
    fin_tag: 'ਵਿੱਤ ਅਤੇ ਖ਼ਜ਼ਾਨਾ ਸੁਰੱਖਿਆ',
    fin_title: 'ਤਰਲਤਾ ਅਤੇ ਐਸਕਰੋ ਕਲੀਅਰੈਂਸ',
    fin_desc: 'ਸਰਕਾਰੀ ਗਾਰੰਟੀ ਅਤੇ ਡਿਜੀਟਲ ਇਨਵੌਇਸ ਰਾਹੀਂ ਸੁਰੱਖਿਅਤ ਤੁਰੰਤ ਭੁਗਤਾਨ।',
    fin_card1_title: 'ਸੂਬਾਈ ਗਾਰੰਟੀ',
    fin_card1_desc: 'ਹਰੇਕ ਸੌਦਾ ਸਰਕਾਰੀ ਫੰਡਾਂ ਨਾਲ ਸੁਰੱਖਿਅਤ ਹੈ, ਜਿਸ ਨਾਲ ਪੇਂਡੂ ਵਿਕਰੇਤਾਵਾਂ ਦਾ ਕੋਈ ਨੁਕਸਾਨ ਨਹੀਂ ਹੁੰਦਾ।',
    fin_card2_title: 'ਸਸਤਾ ਵਪਾਰਕ ਕਰਜ਼ਾ',
    fin_card2_desc: 'ਬਿਨਾਂ ਗਹਿਣੇ ਆਰਬੀਆਈ ਦਰਾਂ ਤੇ ਕਾਰੀਗਰਾਂ ਅਤੇ ਛੋਟੇ ਵਪਾਰੀਆਂ ਨੂੰ ਤੁਰੰਤ ਪੂੰਜੀ।',
    fin_card3_title: 'ਜੀਐਸਟੀ ਡਿਜੀਟਲ ਜਾਂਚ',
    fin_card3_desc: 'ਈ-ਵੇਅ ਬਿੱਲਾਂ ਅਤੇ ਜੀਐਸਟੀਐਨ ਖਾਤਿਆਂ ਨਾਲ ਸਿੱਧਾ ਤਾਲਮੇਲ।',

    // Negotiation
    neg_tag: 'ਗੱਲਬਾਤ ਇੰਜਣ',
    neg_title: 'ਪਾਰਦਰਸ਼ੀ ਬਹੁ-ਪੱਖੀ ਮੁੱਲ ਨਿਰਧਾਰਨ',
    neg_desc: 'ਕੀਮਤ, ਡਿਲੀਵਰੀ ਸਮਾਂ ਅਤੇ ਸਥਾਨਕ ਉਤਪਾਦਨ ਕੋਟੇ ਨੂੰ ਸੰਤੁਲਿਤ ਕਰਨ ਵਾਲੀ ਆਧੁਨਿਕ ਪ੍ਰਣਾਲੀ।',
    neg_step1_title: 'ਮੰਗ ਦਾ ਪ੍ਰਸਾਰਣ',
    neg_step1_desc: 'ਖਰੀਦਦਾਰ ਖੇਤਰੀ ਤਰਜੀਹ ਨਾਲ ਮਾਲ ਦੀ ਲੋੜ ਦਰਜ ਕਰਦਾ ਹੈ',
    neg_step2_title: 'ਸਹੀ ਉਤਪਾਦਕਾਂ ਦੀ ਚੋਣ',
    neg_step2_desc: 'ਦੂਰੀ ਅਤੇ ਸਮਰੱਥਾ ਅਨੁਸਾਰ ਸਥਾਨਕ ਉਤਪਾਦਕਾਂ ਨਾਲ ਮੇਲ',
    neg_step3_title: 'ਸਹਿਮਤੀ ਗੱਲਬਾਤ',
    neg_step3_desc: 'ਸਵੈਚਾਲਤ ਬੋਲੀ ਅਤੇ ਵਾਜਬ ਕੀਮਤ ਸੀਮਾ ਲਾਗੂ ਕਰਨਾ',
    neg_step4_title: 'ਸਮਾਰਟ ਕੰਟਰੈਕਟ ਸੀਲ',
    neg_step4_desc: 'ਮਾਲ ਪਹੁੰਚਣ ਦੀ ਪੁਸ਼ਟੀ ਮਗਰੋਂ ਐਸਕਰੋ ਵਿੱਚੋਂ ਰਕਮ ਜਾਰੀ ਕਰਨਾ',
    neg_simulation_title: 'ਸਰਗਰਮ ਪੜਾਅ: ਲਾਈਵ ਮੁੱਲ ਸੀਮਾ ਮਾਡਲ',
    neg_simulation_desc: '14 ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ ਵਿਚਕਾਰ ਬੋਲੀ ₹4,200 ਤੋਂ ₹4,650 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਦੇ ਵਿਚਕਾਰ ਤੈਅ ਕੀਤੀ ਗਈ।',
    neg_advance_btn: 'ਅਗਲਾ ਪੜਾਅ ਵੇਖੋ →',

    // States
    state_tag: 'ਖੇਤਰੀ ਨੈੱਟਵਰਕ',
    state_title: 'ਸੂਬੇ ਅਨੁਸਾਰ ਖਰੀਦ ਪ੍ਰਗਤੀ',
    state_subtitle: 'ਸਰਗਰਮ ਕੇਂਦਰਾਂ ਦੇ ਲਾਈਵ ਅੰਕੜੇ',
    th_state: 'ਸੂਬਾ / ਖੇਤਰ',
    th_volume: 'ਵਪਾਰਕ ਮਾਤਰਾ',
    th_msmes: 'ਸਰਗਰਮ ਐਮਐਸਐਮਈ',
    th_expansion: 'ਸਾਲਾਨਾ ਵਾਧਾ',
    th_status: 'ਕੇਂਦਰ ਸਥਿਤੀ',

    // Preloader
    preloader_badge: 'ਬ੍ਰਾਂਡ ਅਨਾਵਰਣ',
    preloader_skip: 'ਮੁੱਖ ਪੰਨੇ ਤੇ ਜਾਓ',
    preloader_tagline_w1: 'ਇੱਕ',
    preloader_tagline_w2: 'ਨਵਾਂ',
    preloader_tagline_w3: 'ਰਾਹ',
    preloader_tagline_w4: 'ਵੱਲ',
    preloader_tagline_w5: 'ਆਤਮਨਿਰਭਰ',
    preloader_tagline_w6: 'ਭਾਰਤ',
    preloader_sub_left: 'ਸਾਰਵਭੌਮ ਖਰੀਦ ਪ੍ਰਣਾਲੀ',
    preloader_sub_right: 'ਕੌਮੀ ਏਕਤਾ',

    // Footer
    footer_desc: 'ਸਵਨਿਰਭਰ (SWANIRVAR) ਭਾਰਤ ਦੇ ਸਾਰੇ ਸੂਬਿਆਂ ਵਿੱਚ ਘਰੇਲੂ ਵਪਾਰ ਅਤੇ ਸਵੈ-ਨਿਰਭਰਤਾ ਨੂੰ ਮਜ਼ਬੂਤ ਕਰਨ ਲਈ ਸਮਰਪਿਤ ਹੈ।',
    footer_rights: 'ਸਵਨਿਰਭਰ ਕੌਮੀ ਵਪਾਰਕ ਢਾਂਚਾ। ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।',
  },

  or: {
    // Nav
    nav_dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
    nav_finance: 'ଅର୍ଥ ଓ କୋଷାଗାର',
    nav_negotiation: 'ଦରକଷାକଷି',
    nav_states: 'ରାଜ୍ୟଗୁଡ଼ିକ',
    nav_login: 'ଲଗଇନ',
    nav_signup: 'ପଞ୍ଜୀକରଣ',
    nav_play_preloader: 'ପ୍ରିଲୋଡର',
    nav_official: 'ଅଧିକୃତ',
    nav_change_lang: 'ଭାଷା',

    // Hero
    hero_badge: 'ଜାତୀୟ ଆତ୍ମନିର୍ଭର ବାଣିଜ୍ୟ ନେଟୱର୍କ',
    hero_title_p1: 'ଦିଗରେ ଏକ ନୂତନ ପଥ:',
    hero_title_aatmanirbhar: 'ଆତ୍ମନିର୍ଭର',
    hero_title_bharat: 'ଭାରତ',
    hero_subtitle:
      'ସ୍ୱନିର୍ଭର (SWANIRVAR) ରାଜ୍ୟ କୋଷାଗାର, ପ୍ରମାଣିତ ଆଞ୍ଚଳିକ ଉଦ୍ୟୋଗ ଏବଂ ସଂସ୍ଥାଗତ କ୍ରେତାମାନଙ୍କୁ ସ୍ୱଚ୍ଛ ଦରକଷାକଷି ଏବଂ ତ୍ୱରିତ ଅର୍ଥ ପ୍ରଦାନ ସହିତ ସଂଯୋଗ କରେ।',
    hero_cta_dashboard: 'ଡ୍ୟାସବୋର୍ଡ ଦେଖନ୍ତୁ',
    hero_cta_preloader: 'ବ୍ରାଣ୍ଡ ପ୍ରିଲୋଡର ପୁନଃ ଚଲାନ୍ତୁ',

    // Language Selector Section
    lang_section_title: 'ସାର୍ବଭୌମ ବହୁଭାଷୀ ଇଣ୍ଟରଫେସ',
    lang_section_subtitle: 'ଭାରତର ସମସ୍ତ ବର୍ତ୍ତମାନ ଏବଂ ଭବିଷ୍ୟତ ପୋର୍ଟାଲ, ଚୁକ୍ତି ଏବଂ ଡ୍ୟାସବୋର୍ଡ ପାଇଁ ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ। ସମସ୍ତ ପରବର୍ତ୍ତୀ ପୃଷ୍ଠା ସ୍ୱୟଂଚାଳିତ ଭାବେ ଏହି ଭାଷାକୁ ପରିବର୍ତ୍ତିତ ହେବ।',
    lang_active_badge: 'ସକ୍ରିୟ ସିଷ୍ଟମ ଭାଷା',

    // Continuity card
    continuity_title: 'ବ୍ରାଣ୍ଡ ନିରନ୍ତରତା',
    continuity_heading: 'ନ୍ୟାଭବାର ଏବଂ ପ୍ରିଲୋଡରର ସମାନ ଲୋଗୋ ରୂପ',
    continuity_badge: '୧୦୦% ଜ୍ୟାମିତିକ ସମାନତା',
    continuity_navbar_title: 'ନ୍ୟାଭବାର ଲୋଗୋ',
    continuity_navbar_desc: 'ସ୍କ୍ରୋଲ ହେଲେ ମଧ୍ୟ ୨୪ ଅର ବିଶିଷ୍ଟ ଅଶୋକ ଚକ୍ର ସ୍ପଷ୍ଟ ଭାବେ ଘୂର୍ଣ୍ଣନ କରେ।',
    continuity_preloader_title: 'ପ୍ରିଲୋଡର ଲୋଗୋ',
    continuity_preloader_desc: 'ସମାନ ତ୍ରିରଙ୍ଗା ରଙ୍ଗ ଓ ନୀଳ ସୀମାରେଖା ସହିତ ପୂର୍ଣ୍ଣ ଏକରୂପତା ବଜାୟ ରଖେ।',

    // Dashboard
    dash_tag: 'ଜାତୀୟ ଡ୍ୟାସବୋର୍ଡ',
    dash_title: 'କ୍ରୟ ଏବଂ ବାଣିଜ୍ୟ ସୂଚକାଙ୍କ',
    dash_live_badge: 'ଲାଇଭ ସମନ୍ୱୟ • ୨୮ ରାଜ୍ୟ ଓ ୮ କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ',
    kpi_gross_trade: 'ସମୁଦାୟ ବାଣିଜ୍ୟ ପରିମାଣ',
    kpi_registered_msme: 'ପଞ୍ଜୀକୃତ ଏମଏସଏମଇ',
    kpi_active_hubs: 'ସକ୍ରିୟ ରାଜ୍ୟ କେନ୍ଦ୍ର',
    kpi_dispute_settlement: 'ସମାଧାନ ହାର',
    kpi_vs_cycle: 'ପୂର୍ବ ଅବଧି ତୁଳନାରେ',
    kpi_onboarded: 'ଏହି ସପ୍ତାହରେ ଯୋଡ଼ି ହୋଇଥିବା',
    kpi_pan_india: '୧୦୦% ସର୍ବଭାରତୀୟ ସଂଯୋଗ',
    kpi_escrow: 'ସ୍ୱୟଂଚାଳିତ ଏସ୍କ୍ରୋ କ୍ଲିୟରାନ୍ସ',

    // Finance
    fin_tag: 'ଅର୍ଥ ଓ କୋଷାଗାର',
    fin_title: 'ସ୍ୱୟଂଶାସିତ ନଗଦ ପ୍ରବାହ ଓ ଏସ୍କ୍ରୋ',
    fin_desc: 'ରାଜ୍ୟ ବ୍ୟାଙ୍କ ନିରାପତ୍ତା ଓ ଇଲେକ୍ଟ୍ରୋନିକ ଚାଲାଣ ଦ୍ୱାରା ତୁରନ୍ତ ଟଙ୍କା ପୈଠ।',
    fin_card1_title: 'ରାଜ୍ୟ ସଂରକ୍ଷଣ ନିଶ୍ଚିତତା',
    fin_card1_desc: 'ପ୍ରତ୍ୟେକ ଚୁକ୍ତି ସରକାରୀ ପାଣ୍ଠି ଦ୍ୱାରା ସୁରକ୍ଷିତ, ଗ୍ରାମୀଣ ବିକ୍ରେତାଙ୍କର କୌଣସି ଆର୍ଥିକ କ୍ଷତିର ଭୟ ନାହିଁ।',
    fin_card2_title: 'ରିହାତି ଯୁକ୍ତ ଋଣ ସୁବିଧା',
    fin_card2_desc: 'କୌଣସି ବନ୍ଧକ ବିନା ଆରବିଆଇ ରେପୋ ହାରରେ କାରିଗର ଏବଂ କ୍ଷୁଦ୍ର ବ୍ୟବସାୟୀଙ୍କୁ ସିଧାସଳଖ ପୁଞ୍ଜି।',
    fin_card3_title: 'ଜିଏସଟି ଡିଜିଟାଲ ଅଡିଟ',
    fin_card3_desc: 'ଇ-ୱେ ବିଲ୍ ଏବଂ ଜିଏସଟିଏନ ଖାତା ସହିତ ସିଧାସଳଖ ସମନ୍ୱୟ।',

    // Negotiation
    neg_tag: 'ଦରକଷାକଷି ଇଞ୍ଜିନ',
    neg_title: 'ସ୍ୱଚ୍ଛ ବହୁପାକ୍ଷିକ ମୂଲ୍ୟ ନିର୍ଦ୍ଧାରଣ',
    neg_desc: 'ମୂଲ୍ୟ, ଯୋଗାଣ ସମୟ ଏବଂ ସ୍ଥାନୀୟ ଉତ୍ପାଦନ କୋଟାର ସନ୍ତୁଳନ ରକ୍ଷା କରୁଥିବା ଆଧୁନିକ ବ୍ୟବସ୍ଥା।',
    neg_step1_title: 'ଚାହିଦା ଘୋଷଣା',
    neg_step1_desc: 'କ୍ରେତା ଆଞ୍ଚଳିକ ପ୍ରାଥମିକତା ସହିତ ସାମଗ୍ରୀର ଆବଶ୍ୟକତା ପଞ୍ଜୀକରଣ କରନ୍ତି',
    neg_step2_title: 'ଆଲଗୋରିଦମିକ ମେଳକ',
    neg_step2_desc: 'ଦୂରତା ଓ କ୍ଷମତା ଆଧାରରେ ସ୍ଥାନୀୟ ଉତ୍ପାଦକ ଚୟନ',
    neg_step3_title: 'ସହମତି ଆଲୋଚନା',
    neg_step3_desc: 'ସ୍ୱୟଂଚାଳିତ ନିଲାମ ଓ ଉଚିତ ମୂଲ୍ୟ ସୀମା ଲାଗୁ',
    neg_step4_title: 'ସ୍ମାର୍ଟ ଚୁକ୍ତିନାମା ସିଲ',
    neg_step4_desc: 'ମାଲ ପହଞ୍ଚିବା ପରେ ଏସ୍କ୍ରୋ ଖାତାରୁ ସ୍ୱୟଂଚାଳିତ ଅର୍ଥ ଛାଡ଼',
    neg_simulation_title: 'ସକ୍ରିୟ ପଦକ୍ଷେପ: ଲାଇଭ ମୂଲ୍ୟ ସୀମା',
    neg_simulation_desc: '୧୪ଟି ସମବାୟ ସମିତି ମଧ୍ୟରେ କ୍ୱିଣ୍ଟାଲ ପିଛା ₹୪,୨୦୦ ରୁ ₹୪,୬୫୦ ମଧ୍ୟରେ ମୂଲ୍ୟ ନିର୍ଦ୍ଧାରିତ।',
    neg_advance_btn: 'ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ ଦେଖନ୍ତୁ →',

    // States
    state_tag: 'ଆଞ୍ଚଳିକ ଗ୍ରିଡ',
    state_title: 'ରାଜ୍ୟୱାରୀ କ୍ରୟ ପ୍ରଗତି',
    state_subtitle: 'ସକ୍ରିୟ କେନ୍ଦ୍ରଗୁଡ଼ିକର ଲାଇଭ ସୂଚନା',
    th_state: 'ରାଜ୍ୟ / ଅଞ୍ଚଳ',
    th_volume: 'ବାଣିଜ୍ୟ ପରିମାଣ',
    th_msmes: 'ସକ୍ରିୟ ଏମଏସଏମଇ',
    th_expansion: 'ବାର୍ଷିକ ଅଭିବୃଦ୍ଧି',
    th_status: 'କେନ୍ଦ୍ର ସ୍ଥିତି',

    // Preloader
    preloader_badge: 'ବ୍ରାଣ୍ଡ ଉନ୍ମୋଚନ',
    preloader_skip: 'ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଯାଆନ୍ତୁ',
    preloader_tagline_w1: 'ଏକ',
    preloader_tagline_w2: 'ନୂତନ',
    preloader_tagline_w3: 'ପଥ',
    preloader_tagline_w4: 'ଦିଗରେ',
    preloader_tagline_w5: 'ଆତ୍ମନିର୍ଭର',
    preloader_tagline_w6: 'ଭାରତ',
    preloader_sub_left: 'ସାର୍ବଭୌମ କ୍ରୟ ବ୍ୟବସ୍ଥା',
    preloader_sub_right: 'ଜାତୀୟ ଏକତା',

    // Footer
    footer_desc: 'ସ୍ୱନିର୍ଭର (SWANIRVAR) ଭାରତର ସମସ୍ତ ରାଜ୍ୟରେ ଆଞ୍ଚଳିକ ବାଣିଜ୍ୟ ଓ ଆତ୍ମନିର୍ଭରଶୀଳତାକୁ ସୁଦୃଢ଼ କରିବା ପାଇଁ ପ୍ରତିବଦ୍ଧ।',
    footer_rights: 'ସ୍ୱନିର୍ଭର ଜାତୀୟ ବାଣିଜ୍ୟ ଭିତ୍ତିଭୂମି। ସର୍ବସ୍ୱତ୍ୱ ସଂରକ୍ଷିତ।',
  },

  as: {
    // Nav
    nav_dashboard: 'ডেশ্ববৰ্ড',
    nav_finance: 'বিত্ত আৰু কোষাগাৰ',
    nav_negotiation: 'দৰদাম আৰু চুক্তি',
    nav_states: 'ৰাজ্যসমূহ',
    nav_login: 'লগইন',
    nav_signup: 'পঞ্জীয়ন',
    nav_play_preloader: 'প্ৰিল’ডাৰ',
    nav_official: 'আনুষ্ঠানিক',
    nav_change_lang: 'ভাষা',

    // Hero
    hero_badge: 'ৰাষ্ট্ৰীয় আত্মনিৰ্ভৰশীল বাণিজ্যিক নেটৱৰ্ক',
    hero_title_p1: 'দিশত এক নতুন পথ:',
    hero_title_aatmanirbhar: 'আত্মনিৰ্ভৰ',
    hero_title_bharat: 'ভাৰত',
    hero_subtitle:
      'স্বনিৰ্ভৰ (SWANIRVAR) ৰাজ্যিক কোষাগাৰ, প্ৰত্যায়িত স্থানীয় উদ্যোগ আৰু প্ৰতিষ্ঠানিক ক্ৰেতাসকলক স্বচ্ছ দৰদাম আৰু তাৎক্ষণিক ধন আদায়ৰ সৈতে সংযুক্ত কৰে।',
    hero_cta_dashboard: 'ডেশ্ববৰ্ড চাওক',
    hero_cta_preloader: 'ব্ৰেণ্ড প্ৰিল’ডাৰ পুনৰ চলাওক',

    // Language Selector Section
    lang_section_title: 'সাৰ্বভৌম বহুভাষিক ইন্টাৰফেচ',
    lang_section_subtitle: 'ভাৰতৰ সকলো বৰ্তমান আৰু ভৱিষ্যতৰ প’ৰ্টেল, চুক্তি আৰু ডেশ্ববৰ্ডৰ বাবে আপোনাৰ পছন্দৰ ভাষা বাছনি কৰক। ভৱিষ্যতৰ সকলো পৃষ্ঠা স্বয়ংক্ৰিয়ভাৱে এই ভাষালৈ ৰূপান্তৰিত হ’ব।',
    lang_active_badge: 'সক্ৰিয় ব্যৱস্থাৰ ভাষা',

    // Continuity card
    continuity_title: 'ব্ৰেণ্ড নিৰন্তৰতা',
    continuity_heading: 'নেভবাৰ আৰু প্ৰিল’ডাৰৰ একে ল’গ’ ৰূপ',
    continuity_badge: '১০০% জ্যামিতিক সামঞ্জস্য',
    continuity_navbar_title: 'নেভবাৰ ল’গ’',
    continuity_navbar_desc: 'স্ক্ৰল কৰিলে সৰু হ’লেও ২৪ ডাল দণ্ডযুক্ত অশোক চক্ৰটো স্পষ্টভাৱে ঘূৰি থাকে।',
    continuity_preloader_title: 'প্ৰিল’ডাৰ ল’গ’',
    continuity_preloader_desc: 'একে ত্ৰিৰংগা ৰং আৰু নীলা সীমাৰেখাৰে সম্পূৰ্ণ একৰূপতা বৰ্তাই ৰাখে।',

    // Dashboard
    dash_tag: 'ৰাষ্ট্ৰীয় ডেশ্ববৰ্ড',
    dash_title: 'ক্ৰয় আৰু সাৰ্বভৌম বাণিজ্য সূচক',
    dash_live_badge: 'লাইভ সমন্বয় • ২৮খন ৰাজ্য আৰু ৮খন কেন্দ্ৰীয় শাসিত অঞ্চল',
    kpi_gross_trade: 'মুঠ বাণিজ্যৰ পৰিমাণ',
    kpi_registered_msme: 'পঞ্জীভুক্ত এমএছএমই',
    kpi_active_hubs: 'সক্ৰিয় ৰাজ্যিক কেন্দ্ৰ',
    kpi_dispute_settlement: 'বিবাদ নিষ্পত্তিৰ হাৰ',
    kpi_vs_cycle: 'পূৰ্বৰ তুলনাত',
    kpi_onboarded: 'এই সপ্তাহত অন্তৰ্ভুক্ত হোৱা',
    kpi_pan_india: '১০০% সৰ্বভাৰতীয় প্ৰসাৰ',
    kpi_escrow: 'স্বয়ংক্ৰিয় এছক্ৰ’ নিষ্পত্তি',

    // Finance
    fin_tag: 'বিত্ত আৰু কোষাগাৰ সুৰক্ষা',
    fin_title: 'স্বায়ত্তশাসিত ধন প্ৰবাহ আৰু এছক্ৰ’ অনুমোদন',
    fin_desc: 'ৰাজ্যিক বেংক নিৰাপত্তা আৰু ডিজিটেল চালানেৰে সুৰক্ষিত তাৎক্ষণিক ধন আদায়।',
    fin_card1_title: 'ৰাজ্যিক সংৰক্ষণ গেৰাণ্টি',
    fin_card1_desc: 'প্ৰতিটো চুক্তি চৰকাৰী পুঁজিৰে সুৰক্ষিত, যাৰ ফলত গ্ৰাম্য বিক্ৰেতাৰ কোনো আৰ্থিক লোকচান নহয়।',
    fin_card2_title: 'ৰেহাইযুক্ত এমএছএমই ঋণ',
    fin_card2_desc: 'কোনো বন্ধকী নোহোৱাকৈ আৰবিআই ৰেপ’ হাৰত শিল্পী আৰু ক্ষুদ্ৰ ব্যৱসায়ীক তাৎক্ষণিক ঋণ।',
    fin_card3_title: 'জিএছটি ডিজিটেল নিৰীক্ষণ',
    fin_card3_desc: 'ই-ৱে বিল আৰু জিএছটিএন বহীৰ সৈতে পোনপটীয়া সংমিশ্ৰণ।',

    // Negotiation
    neg_tag: 'দৰদাম ইঞ্জিন',
    neg_title: 'স্বচ্ছ বহুমুখী মূল্য নিৰ্ধাৰণ',
    neg_desc: 'মূল্য, যোগানৰ সময় আৰু স্থানীয় উৎপাদন কোটাৰ ভাৰসাম্য ৰক্ষা কৰা আধুনিক ক্ৰয় প্ৰক্ৰিয়া।',
    neg_step1_title: 'চাহিদা প্ৰকাশ',
    neg_step1_desc: 'ক্ৰেতাই আঞ্চলিক অগ্ৰাধিকাৰৰ সৈতে সামগ্ৰীৰ প্ৰয়োজনীয়তা পঞ্জীয়ন কৰে',
    neg_step2_title: 'এলগৰিথমিক মিল',
    neg_step2_desc: 'দূৰত্ব আৰু ক্ষমতাৰ ভিত্তিত স্থানীয় উৎপাদক বাছনি',
    neg_step3_title: 'সহমত আলোচনা',
    neg_step3_desc: 'স্বয়ংক্ৰিয় ৰিভাৰ্ছ-নিলাম আৰু উচিত মূল্য সীমা বলবৎকৰণ',
    neg_step4_title: 'স্মাৰ্ট চুক্তি অনুমোদন',
    neg_step4_desc: 'সামগ্ৰী পোৱাৰ প্ৰমাণ সাপেক্ষে এছক্ৰ’ একাউন্টৰ পৰা ধন আদায়',
    neg_simulation_title: 'সক্ৰিয় স্তৰ: লাইভ মূল্য পৰিসীমা নিৰীক্ষণ',
    neg_simulation_desc: '১৪টা সমবায়ৰ মাজত কুইন্টলত ₹৪,২০০ৰ পৰা ₹৪,৬৫০ৰ ভিতৰত নিবিদা নিৰ্ধাৰিত।',
    neg_advance_btn: 'পৰৱৰ্তী স্তৰ চাওক →',

    // States
    state_tag: 'আঞ্চলিক গ্ৰিড',
    state_title: 'ৰাজ্যভিত্তিক ক্ৰয় অগ্ৰগতি',
    state_subtitle: 'সক্ৰিয় কেন্দ্ৰসমূহৰ লাইভ প্ৰদৰ্শন তথ্য',
    th_state: 'ৰাজ্য / অঞ্চল',
    th_volume: 'বাণিজ্যৰ পৰিমাণ',
    th_msmes: 'সক্ৰিয় এমএছএমই',
    th_expansion: 'বাৰ্ষিক বৃদ্ধি',
    th_status: 'কেন্দ্ৰৰ স্থিতি',

    // Preloader
    preloader_badge: 'ব্ৰেণ্ড উন্মোচন',
    preloader_skip: 'পোনপটীয়া পেজলৈ যাওক',
    preloader_tagline_w1: 'এক',
    preloader_tagline_w2: 'নতুন',
    preloader_tagline_w3: 'পথ',
    preloader_tagline_w4: 'দিশত',
    preloader_tagline_w5: 'আত্মনিৰ্ভৰ',
    preloader_tagline_w6: 'ভাৰত',
    preloader_sub_left: 'সাৰ্বভৌম ক্ৰয় ব্যৱস্থা',
    preloader_sub_right: 'ৰাষ্ট্ৰীয় একতা',

    // Footer
    footer_desc: 'স্বনিৰ্ভৰ (SWANIRVAR) ভাৰতৰ সকলো ৰাজ্যতে স্বাৱলম্বী বাণিজ্য আৰু আঞ্চলিক উন্নয়ন সুদৃঢ় কৰিবলৈ প্ৰতিশ্ৰুতিবদ্ধ।',
    footer_rights: 'স্বনিৰ্ভৰ ৰাষ্ট্ৰীয় বাণিজ্যিক আন্তঃগাঁথনি। সৰ্বস্বত্ব সংৰক্ষিত।',
  },
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
  languages: LanguageOption[];
  currentLanguageInfo: LanguageOption;
}

const STORAGE_KEY = 'swanirvar_app_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
    } catch {
      // ignore localStorage errors
    }
    return 'en';
  });

  const currentLanguageRef = useRef(currentLanguage);
  currentLanguageRef.current = currentLanguage;

  const setLanguage = (code: string) => {
    const normalized = (code || '').trim().toLowerCase().split('-')[0].split('_')[0];
    const targetCode = TRANSLATIONS[normalized] ? normalized : (TRANSLATIONS[code] ? code : 'en');
    if (TRANSLATIONS[targetCode]) {
      setCurrentLanguageState(targetCode);
      try {
        localStorage.setItem(STORAGE_KEY, targetCode);
        // Persist HTML lang attribute
        document.documentElement.lang = targetCode;
        // Translate DOM immediately & after React re-renders
        translateDOMSubtree(document.body, targetCode);
        setTimeout(() => translateDOMSubtree(document.body, targetCode), 50);
        setTimeout(() => translateDOMSubtree(document.body, targetCode), 250);
        // Dispatch storage and window events so all components, tabs and future pages synchronize
        window.dispatchEvent(new CustomEvent('swanirvar_language_changed', { detail: targetCode }));
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    // Synchronize HTML lang attribute
    document.documentElement.lang = currentLanguage;
    // Activate universal DOM translation observer for all current and future elements
    setupUniversalDOMTranslator(() => currentLanguageRef.current);
    // Trigger initial translation
    translateDOMSubtree(document.body, currentLanguage);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && TRANSLATIONS[e.newValue]) {
        setCurrentLanguageState(e.newValue);
        document.documentElement.lang = e.newValue;
        translateDOMSubtree(document.body, e.newValue);
      }
    };
    const handleCustom = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && TRANSLATIONS[customEvent.detail]) {
        setCurrentLanguageState(customEvent.detail);
        document.documentElement.lang = customEvent.detail;
        translateDOMSubtree(document.body, customEvent.detail);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('swanirvar_language_changed', handleCustom);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('swanirvar_language_changed', handleCustom);
    };
  }, [currentLanguage]);

  const t = (key: string): string => {
    if (!key) return '';
    const langObj = TRANSLATIONS[currentLanguage];
    if (langObj && langObj[key]) {
      return langObj[key];
    }
    // Check phrase translation
    const phraseTrans = translateText(key, currentLanguage);
    if (phraseTrans && phraseTrans !== key) {
      return phraseTrans;
    }
    // Fallback to English translation key if present, then translate phrase
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      const enText = TRANSLATIONS.en[key];
      const translatedEn = translateText(enText, currentLanguage);
      return translatedEn || enText;
    }
    return key;
  };

  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageInfo,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
