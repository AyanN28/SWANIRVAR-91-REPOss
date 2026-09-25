import { DASHBOARD_TRANSLATIONS } from '../data/dashboardDictionaries';

/**
 * Sovereign Universal DOM Translation Engine for SWANIRVAR
 * Automatically translates ALL existing pages, sections, and any future pages/components
 * into any of the 12 official Indian languages without requiring component modifications.
 */

export const PHRASE_DICTIONARIES: Record<string, Record<string, string>> = {
  hi: {
    // Nav & Common
    'Overview': 'सिंहावलोकन',
    'Statistics': 'आंकड़े एवं सांख्यिकी',
    'About Us': 'हमारे बारे में',
    'FAQ': 'अक्सर पूछे जाने वाले प्रश्न',
    'Login': 'लॉग इन',
    'Sign Up': 'पंजीकरण',
    'Voice': 'आवाज़',
    'Language': 'भाषा',
    'Select Language': 'भाषा चुनें',
    'OFFICIAL': 'आधिकारिक',
    'Navigation': 'नेविगेशन',
    'Aatmanirbhar Bharat Sovereign Platform': 'आत्मनिर्भर भारत संप्रभु मंच',
    'Speak in your local language to automatically switch website language': 'वेबसाइट भाषा स्वतः बदलने हेतु अपनी स्थानीय भाषा में बोलें',
    'Speak in Local Language (Auto-Detect)': 'अपनी स्थानीय भाषा में बोलें (स्वतः पहचान)',
    'Speak in Local Language': 'स्थानीय भाषा में बोलें',

    // Hero Section
    'PROTOTYPE DEPLOYED': 'प्रोटोटाइप सक्रिय',
    'Indians are the new way of India': 'भारतीय ही हैं भारत का नया मार्ग',
    'A New Way Towards Aatmanirbhar Bharat': 'आत्मनिर्भर भारत की ओर एक नया मार्ग',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'स्वनिर्भर: ग्रामीण उद्यम आकांक्षा को मातृभाषा वाक् बुद्धिमत्ता और निश्चित अनुपालन के माध्यम से बैंक-सत्यापित पूंजी में परिवर्तित करता है।',
    'Active Prototype Corridor:': 'सक्रिय प्रोटोटाइप गलियारा:',
    'Active Prototype Corridor': 'सक्रिय प्रोटोटाइप गलियारा',
    'Punjab': 'पंजाब',
    'Maharashtra': 'महाराष्ट्र',
    'West Bengal': 'पश्चिम बंगाल',
    'Tamil Nadu': 'तमिलनाडु',
    'Explore Dashboard': 'डैशबोर्ड देखें',
    'Replay Brand Preloader': 'ब्रांड प्रीलोडर पुनः चलाएं',
    'Select a Corridor State on India Map or Speak Your State': 'भारत मानचित्र पर गलियारा राज्य चुनें अथवा अपना राज्य बोलें',
    'Interactive Sovereign Prototype': 'संवादात्मक संप्रभु प्रोटोटाइप',
    'Click or tap any highlight state to review regional trade corridor specifications, active MSME clusters, and autonomous bank-verified settlement.':
      'क्षेत्रीय व्यापार विनिर्देशों, सक्रिय एमएसएमई समूहों और स्वायत्त बैंक भुगतान की समीक्षा के लिए किसी भी राज्य पर क्लिक करें।',

    // Statistics Section
    'National Scale': 'राष्ट्रीय पैमाना',
    'Real-Time Sovereign Metrics': 'रीयल-टाइम संप्रभु आंकड़े',
    'NABARD & RBI Core Aggregator Ledger': 'नाबार्ड एवं आरबीआई कोर एग्रीगेटर लेजर',
    'Live Institutional Data': 'प्रत्यक्ष संस्थागत आंकड़े',
    'National Administrative Scale': 'राष्ट्रीय प्रशासनिक विस्तार',
    'States & UTs': 'राज्य एवं केंद्र शासित प्रदेश',
    '36 (28 States and 8 Union Territories)': '३६ (२८ राज्य एवं ८ केंद्र शासित प्रदेश)',
    'Total Village Reach': 'कुल ग्रामीण पहुंच',
    'Lakhs': 'लाख',
    'Approximately 6.64 Lakhs (664,369 recorded rural jurisdictions across India)':
      'लगभग ६.६४ लाख (भारत भर में ६,६४,३६९ दर्ज ग्रामीण अधिकार क्षेत्र)',
    'Grassroots Digital Infrastructure': 'जमीनी डिजिटल अवसंरचना',
    'Over 2.5 Lakh CSCs': '२.५ लाख से अधिक सीएससी',
    'Lakh CSCs': 'लाख सीएससी',
    'Over 2.5 Lakh Common Service Centres (CSCs) deployed across Gram Panchayats nationwide':
      'देश भर की ग्राम पंचायतों में २.५ लाख से अधिक सामान्य सेवा केंद्र (सीएससी) तैनात',
    'Field Agent Workforce': 'क्षेत्रीय कार्यबल',
    'Lakh+ VLEs': 'लाख+ वीएलई',
    'Over 5.5 to 6 Lakh+ active Village Level Entrepreneurs (VLEs) operating under the CSC digital framework':
      'सीएससी डिजिटल ढांचे के तहत ५.५ से ६ लाख से अधिक सक्रिय ग्राम स्तरीय उद्यमी (वीएलई) कार्यरत',
    'Over': 'से अधिक',
    'to': 'से',
    'Compare': 'तुलना करें',
    'Reset Compare': 'तुलना रीसेट करें',
    'Compare FY 24-25': 'वित्तीय वर्ष २४-२५ से तुलना',
    'FY 25-26 (Curr)': 'वि.वर्ष २५-२६ (वर्तमान)',
    'FY 24-25 (Prev)': 'वि.वर्ष २४-२५ (पूर्व)',
    '100% Saturation': '१००% संतृप्ति',
    'Stable Full Coverage': 'स्थिर पूर्ण कवरेज',
    '+12.2% YoY': '+१२.२% वार्षिक वृद्धि',
    '+72,259 Villages Mapped': '+७२,२५९ गांव मैप किए गए',
    '+16.3% YoY': '+१६.३% वार्षिक वृद्धि',
    '+35,000 New Centres': '+३५,००० नए केंद्र',
    '+18.8% YoY': '+१८.८% वार्षिक वृद्धि',
    '+95,000 Active VLEs': '+९५,००० सक्रिय वीएलई',

    // FAQ Section
    'Common Inquiries': 'सामान्य जिज्ञासाएं',
    'Frequently Asked Questions': 'अक्सर पूछे जाने वाले प्रश्न',
    'Essential insights regarding prototype deployment, institutional onboarding, and sovereign compliance standards.':
      'प्रोटोटाइप परिनियोजन, संस्थागत ऑनबोर्डिंग और संप्रभु अनुपालन मानकों से संबंधित महत्वपूर्ण जानकारी।',
    'Why are Punjab, Maharashtra, West Bengal, and Tamil Nadu selected for the prototype?':
      'प्रोटोटाइप के लिए पंजाब, महाराष्ट्र, पश्चिम बंगाल और तमिलनाडु का चयन क्यों किया गया?',
    'These four states represent distinct economic and geographic corridors of India: Northern agriculture and agro-processing (Punjab), Western heavy engineering and finance (Maharashtra), Eastern maritime and handicraft exchanges (West Bengal), and Southern high-tech and automotive manufacturing (Tamil Nadu). This diversity validates the platform under varied state regulatory environments.':
      'ये चार राज्य भारत के विभिन्न आर्थिक और भौगोलिक गलियारों का प्रतिनिधित्व करते हैं: उत्तर का कृषि प्रसंस्करण (पंजाब), पश्चिम का भारी इंजीनियरिंग व वित्त (महाराष्ट्र), पूर्व का समुद्री व हस्तशिल्प व्यापार (पश्चिम बंगाल), और दक्षिण का उच्च तकनीक व ऑटोमोटिव निर्माण (तमिलनाडु)। यह विविधता मंच को विभिन्न विनियामक वातावरणों में प्रमाणित करती है।',
    'How does the language flow work across all Indian states?':
      'सभी भारतीय राज्यों में भाषा प्रवाह कैसे कार्य करता है?',
    'SWANIRVAR provides end-to-end interface and contract translation across 12 scheduled Indian languages. When a user selects their language, the entire application, tender terminology, and negotiation contracts instantly adapt and persist across all current and future portals.':
      'स्वनिर्भर १२ आधिकारिक भारतीय भाषाओं में पूर्ण इंटरफ़ेस और अनुबंध अनुवाद प्रदान करता है। जब कोई उपयोगकर्ता अपनी भाषा चुनता है, तो संपूर्ण एप्लिकेशन, निविदा शब्दावली और अनुबंध तुरंत रूपांतरित होते हैं और सभी वर्तमान व भविष्य के पोर्टलों पर सुरक्षित रहते हैं।',
    'What is the significance of "Indians are the new way of India"?':
      '"भारतीय ही हैं भारत का नया मार्ग" का क्या महत्व है?',
    'It reflects our guiding conviction: rather than relying on predatory intermediary intermediaries or fragmented closed platforms, Indian citizens, MSMEs, and rural entrepreneurs are actively driving the future of national self-reliance (Aatmanirbhar Bharat).':
      'यह हमारे मूल विश्वास को दर्शाता है: बिचौलियों या बंद मंचों पर निर्भर रहने के बजाय, भारतीय नागरिक, एमएसएमई और ग्रामीण उद्यमी सक्रिय रूप से राष्ट्रीय आत्मनिर्भरता (आत्मनिर्भर भारत) के भविष्य को गति दे रहे हैं।',
    'How do the 10 core features integrate with existing government portals like GeM and ONDC?':
      '१० मुख्य विशेषताएं GeM और ONDC जैसे मौजूदा सरकारी पोर्टलों के साथ कैसे एकीकृत होती हैं?',
    'SWANIRVAR utilizes open APIs and protocol adapters to sync seamlessly with the Government e-Marketplace (GeM), the Open Network for Digital Commerce (ONDC), GSTN, and TReDS invoice discounting systems with zero vendor lock-in.':
      'स्वनिर्भर गवर्नमेंट ई-मार्केटप्लेस (GeM), ओएनडीसी (ONDC), जीएसटीएन और टीआरईडीएस बिल डिस्काउंटिंग सिस्टम के साथ सहज रूप से समन्वय के लिए ओपन एपीआई और प्रोटोकॉल एडेप्टर का उपयोग करता है।',
    'How can enterprises in pilot states participate in the prototype?':
      'पायलट राज्यों के उद्यम प्रोटोटाइप में कैसे भाग ले सकते हैं?',
    'Enterprises in Punjab, Maharashtra, West Bengal, and Tamil Nadu can click "Login" or "Sign Up" in the navbar to connect their Udyam registration, verify their enterprise credentials, and start participating in live tenders and state procurement auctions.':
      'पंजाब, महाराष्ट्र, पश्चिम बंगाल और तमिलनाडु के उद्यम अपने उद्यम पंजीकरण को जोड़ने, क्रेडेंशियल्स सत्यापित करने और प्रत्यक्ष निविदाओं व खरीद नीलामियों में भाग लेने के लिए नेवबार में "लॉग इन" या "पंजीकरण" पर क्लिक कर सकते हैं।',

    // About Us Page
    'Institutional Framework': 'संस्थागत ढांचा',
    'Hybrid Vernacular-First Institutional Platform transforming unorganized rural micro-entrepreneur intent into bank-verified, NABARD-standard enterprises.':
      'असंगठित ग्रामीण सूक्ष्म उद्यमियों के उद्देश्य को बैंक-सत्यापित, नाबार्ड-मानक उद्यमों में परिवर्तित करने वाला बहुभाषी संस्थागत मंच।',
    'Back to Overview': 'सिंहावलोकन पर वापस जाएं',
    'Pilot Context': 'पायलट संदर्भ',
    'Core Capabilities': 'मूल क्षमताएं',
    'Financial Scoring': 'वित्तीय मूल्यांकन',
    'Mandi Intelligence': 'मंडी विश्लेषण',
    'Account Aggregator': 'खाता संचायक (AA)',
    'DPR Generator': 'डीपीआर जनरेटर',
    'Stakeholders': 'हितधारक एवं साझेदार',
    'Institutional Architecture & Sovereign Deployment': 'संस्थागत वास्तुकला एवं संप्रभु परिनियोजन',
    'Back to Home': 'मुख्य पृष्ठ पर वापस',
    'Download DPR': 'डीपीआर डाउनलोड करें',
    'Active': 'सक्रिय',
    'Testing': 'परीक्षण जारी',
    'Integrated': 'एकीकृत',
    'Verified': 'सत्यापित',
    'PILOT ACTIVE': 'पायलट सक्रिय',
    'NABARD ALIGNED': 'नाबार्ड अनुरूप',
    'Pilot Context: Ghazipur District, Uttar Pradesh': 'पायलट संदर्भ: गाजीपुर जिला, उत्तर प्रदेश',
    'Demonstrating deterministic financial scoring, grassroots telemetry capture, and formal bank syndication without black-box generative AI interference in the credit path.':
      'ऋण प्रक्रिया में ब्लैक-बॉक्स जनरेटिव एआई के हस्तक्षेप के बिना नियतात्मक वित्तीय स्कोरिंग, जमीनी टेलीमेट्री और औपचारिक बैंक सिंडिकेशन का प्रदर्शन।',
    'Beneficiary': 'लाभार्थी',
    'Ramesh of Baksha village': 'बक्षा गांव के रमेश',
    'Dairy micro-enterprise': 'डेयरी सूक्ष्म उद्यम',
    'Promoter Contribution': 'प्रवर्तक अंशदान',
    'Equity injection': 'इक्विटी निवेश',
    'Scoring Core': 'स्कोरिंग कोर',
    'Deterministic Python modules': 'नियतात्मक पायथन मॉड्यूल',
    'No LLM in scoring path': 'स्कोरिंग में कोई एलएलएम नहीं',
    '8 Verified Modules': '८ सत्यापित मॉड्यूल',
    'Voice Intake (Bol-Khata)': 'वॉयस इनटेक (बोल-खाता)',
    'Vernacular-first intent capture via voice. Transcripts stored with SHA-256 hash.':
      'आवाज के माध्यम से स्थानीय भाषा में उद्देश्य रिकॉर्डिंग। ट्रांसक्रिप्ट SHA-256 हैश के साथ सुरक्षित।',
    'Deterministic Scoring Core': 'नियतात्मक स्कोरिंग कोर',
    'Python modules produce all financial figures. No LLM in scoring path.':
      'पायथन मॉड्यूल सभी वित्तीय आंकड़ों की गणना करते हैं। स्कोरिंग प्रक्रिया में कोई एलएलएम नहीं।',
    'Rule-Based Scheme Router': 'नियम-आधारित योजना राउटर',
    'Matches enterprise profile with NABARD, PMEGP, State schemes.':
      'नाबार्ड, पीएमईजीपी और राज्य योजनाओं के साथ उद्यम प्रोफाइल का मिलान करता है।',
    'GIS Market Intelligence': 'जीआईएस बाजार विश्लेषण',
    'Hyper-local mandi prices with four confidence tiers.':
      'चार विश्वसनीयता स्तरों के साथ स्थानीय मंडी कीमतें।',
    'Dual-AI Simulation Suite': 'दोहरी-एआई सिमुलेशन सुइट',
    'Confidence training via deterministic + stochastic simulation.':
      'नियतात्मक एवं संभाव्यता सिमुलेशन द्वारा आत्मविश्वास प्रशिक्षण।',
    'Digital Gullak System': 'डिजिटल गुल्लक प्रणाली',
    'Cash-flow discipline with envelope-budgeting interface.':
      'लिफाफा-बजट इंटरफेस के साथ नकदी प्रवाह अनुशासन।',
    '40-page DPR Generator': '४० पृष्ठ डीपीआर जनरेटर',
    'Audit-ready Detailed Project Report with traceable calculations.':
      'जांच-योग्य गणनाओं के साथ ऑडिट-तैयार विस्तृत परियोजना रिपोर्ट (डीपीआर)।',
    'RBI Account Aggregator': 'आरबीआई खाता संचायक',
    'Consent-based financial data via Sahamati framework.':
      'सहमति फ्रेमवर्क के माध्यम से सहमति-आधारित वित्तीय डेटा साझाकरण।',
    'Financial Scoring & Scheme Router': 'वित्तीय स्कोरिंग एवं योजना राउटर',
    'Deterministic Python core produces all financial figures across scoring, scheme routing, and financial intelligence modules.':
      'नियतात्मक पायथन कोर स्कोरिंग, योजना रूटिंग और वित्तीय विश्लेषण मॉड्यूल में सभी आंकड़े उत्पन्न करता है।',
    'Parameter': 'पैरामीटर',
    'Value': 'मान / मूल्य',
    'Confidence': 'विश्वसनीयता',
    'Scheme Match': 'योजना मिलान',
    'Subsidy Estimate': 'अनुदान अनुमान',
    'Working Capital Requirement': 'कार्यशील पूंजी आवश्यकता',
    'Debt Service Coverage Ratio': 'ऋण सेवा कवरेज अनुपात (DSCR)',
    'Projected Margin': 'अनुमानित लाभ मार्जिन',
    'Repayment Period': 'चुकौती अवधि',
    '5 years': '५ वर्ष',
    'High': 'उच्च',
    'Medium': 'मध्यम',
    'Assumption': 'अनुमान',
    'Standard': 'मानक',
    'PMEGP + State Subsidy': 'पीएमईजीपी + राज्य अनुदान',
    '₹75,000 (preliminary)': '₹७५,००० (प्रारंभिक)',
    'NABARD Refinance': 'नाबार्ड पुनर्वित्त',
    'Interest subvention eligible': 'ब्याज अनुदान हेतु पात्र',
    'All schemes': 'सभी योजनाएं',
    'Meets minimum requirement': 'न्यूनतम आवश्यकता पूरी करता है',
    'Not scheme-dependent': 'योजना पर निर्भर नहीं',
    'N/A': 'लागू नहीं',
    'Bank term loan': 'बैंक मियादी ऋण',
    'Moratorium: 18 months': 'अधिस्थगन (मोराटोरियम): १८ माह',
    'The 10% margin rate is an assumption for projection purposes, not a universal rule. Actual margins may vary based on local market conditions.':
      '१०% मार्जिन दर केवल वित्तीय अनुमान के उद्देश्य से है, यह सार्वभौमिक नियम नहीं है। वास्तविक मार्जिन स्थानीय बाजार की परिस्थितियों पर निर्भर करेगा।',
    'Mandi Price Intelligence': 'मंडी मूल्य विश्लेषण',
    'Four confidence tiers: Live (Agmarknet / e-NAM), Historical, Estimated (~42,000 informal haats), Crowdsourced (VLE GPS + timestamp). Never show interpolated as live.':
      'चार विश्वसनीयता स्तर: लाइव (एगमार्कनेट / ई-नाम), ऐतिहासिक, अनुमानित (~४२,००० स्थानीय हाट), क्राउडसोर्स्ड (वीएलई जीपीएस + समय)। अनुमानित को कभी लाइव न दिखाएं।',
    'LIVE': 'लाइव (सजीव)',
    'HISTORICAL': 'ऐतिहासिक',
    'ESTIMATED': 'अनुमानित',
    'CROWDSOURCED': 'फील्ड से प्राप्त',
    'Agmarknet / e-NAM': 'एगमार्कनेट / ई-नाम',
    'Seasonal Archive': 'मौसमी रिकॉर्ड संग्रह',
    'Spatial Interpolation': 'स्थानिक प्रक्षेप (अनुमान)',
    'VLE Field Data': 'वीएलई क्षेत्रीय डेटा',
    'Real-time verified prices from regulated mandis': 'विनियमित मंडियों से वास्तविक समय की सत्यापित कीमतें',
    '5-year price patterns for trend analysis': 'रुझान विश्लेषण के लिए ५ वर्षों का मूल्य पैटर्न',
    'For ~42,000 informal haats without direct data': 'बिना प्रत्यक्ष डेटा वाले ~४२,००० अनौपचारिक हाटों के लिए',
    'GPS-timestamped local price reports': 'जीपीएस और समय-मुद्रांकित स्थानीय मूल्य रिपोर्ट',
    'Commodity': 'वस्तु / जिंस',
    'Unit': 'इकाई',
    'Live Price': 'लाइव मूल्य',
    'Historical Range': 'ऐतिहासिक दायरा',
    'Estimated': 'अनुमानित',
    'Crowdsourced': 'क्राउडसोर्स्ड',
    'Milk': 'दूध',
    'Curd': 'दही',
    'Ghee': 'घी',
    'Paneer': 'पनीर',
    'Liter': 'लीटर',
    'Kg': 'किग्रा',
    'Account Aggregator Integration': 'खाता संचायक एकीकरण (AA)',
    'Uses RBI/Sahamati framework. Never uses UPI credentials. Consent-based data sharing with 24-hour validity.':
      'आरबीआई/सहमति फ्रेमवर्क का उपयोग। यूपीआई क्रेडेंशियल्स का कभी उपयोग नहीं। २४ घंटे की वैधता के साथ सहमति-आधारित डेटा साझाकरण।',
    'Consent Flow': 'सहमति प्रक्रिया',
    'Beneficiary initiates consent via AA app': 'लाभार्थी एए ऐप के माध्यम से सहमति शुरू करता है',
    'Specifies data type (bank statements, GST returns)': 'डेटा प्रकार निर्दिष्ट करता है (बैंक विवरण, जीएसटी रिटर्न)',
    '24-hour validity period': '२४ घंटे की वैधता अवधि',
    'FIUs receive encrypted data': 'वित्तीय सूचना प्रयोक्ता (FIUs) एन्क्रिप्टेड डेटा प्राप्त करते हैं',
    'Financial Data Retrieved': 'प्राप्त वित्तीय डेटा',
    'Bank Statements': 'बैंक विवरण (स्टेटमेंट)',
    'Last 12 months cash flow': 'पिछले १२ महीनों का नकदी प्रवाह',
    'GST Returns': 'जीएसटी रिटर्न',
    'If registered under GST': 'यदि जीएसटी के तहत पंजीकृत है',
    'Investment Proof': 'निवेश प्रमाण',
    'FDs, mutual fund statements': 'सावधि जमा, म्यूचुअल फंड विवरण',
    'Credit Report': 'क्रेडिट रिपोर्ट',
    'Through RBI-approved CICs': 'आरबीआई-स्वीकृत क्रेडिट ब्यूरो के माध्यम से',
    'Audit-Ready DPR Generator': 'ऑडिट-तैयार डीपीआर जनरेटर',
    '40-page Detailed Project Report with bank-ready sections. All calculations traceable to source modules.':
      'बैंक-स्वीकृत वर्गों के साथ ४० पृष्ठों की विस्तृत परियोजना रिपोर्ट। सभी गणनाएं स्रोत मॉड्यूल तक सीधे जांचने योग्य।',
    'Executive Summary': 'कार्यकारी सारांश',
    'Enterprise Profile': 'उद्यम प्रोफाइल',
    'Market Analysis': 'बाजार विश्लेषण',
    'Financial Projections': 'वित्तीय अनुमान',
    'Scheme Alignment': 'योजना मिलान',
    'Risk Assessment': 'जोखिम मूल्यांकन',
    'Cash Flow Discipline': 'नकदी प्रवाह अनुशासन',
    'Compliance Checklist': 'अनुपालन चेकलिस्ट',
    'Appendices': 'परिशिष्ट',
    'Pages': 'पृष्ठ',
    'Auto-generated': 'स्वतः जनित',
    'From Bol-Khata': 'बोल-खाता से',
    'GIS Intelligence': 'जीआईएस विश्लेषण',
    'Scheme Router': 'योजना राउटर',
    'Dual-AI Simulation': 'दोहरी-एआई सिमुलेशन',
    'Digital Gullak': 'डिजिटल गुल्लक',
    'Regulatory Core': 'नियामक कोर',
    'Source Data': 'मूल डेटा',
    'DPR Output Sample': 'डीपीआर नमूना आउटपुट',
    'Generates PDF with watermarked page numbers, digital signature of scoring core, and audit metadata.':
      'वॉटरमार्क किए गए पृष्ठ नंबर, स्कोरिंग कोर के डिजिटल हस्ताक्षर और ऑडिट मेटाडेटा के साथ पीडीएफ बनाता है।',
    'View Sample Pages': 'नमूना पृष्ठ देखें',
    'Stakeholder Access Points': 'हितधारक पहुंच बिंदु',
    'Voice interface (Bol-Khata), vernacular UI': 'आवाज इंटरफेस (बोल-खाता), स्थानीय भाषा यूआई',
    'Simple intent capture, subsidy matching, cash flow tracking': 'सरल इरादा संकलन, अनुदान मिलान, नकदी प्रवाह ट्रैकिंग',
    'Dual-AI confidence simulation': 'दोहरी-एआई आत्मविश्वास सिमुलेशन',
    'VLE / CSC Agent': 'वीएलई / सीएससी एजेंट',
    'Assisted-entry dashboard, GPS price reporting': 'सहायता प्राप्त प्रविष्टि डैशबोर्ड, जीपीएस मूल्य रिपोर्टिंग',
    'Quick beneficiary onboarding, document scanning': 'त्वरित लाभार्थी ऑनबोर्डिंग, दस्तावेज स्कैनिंग',
    'Agent training module': 'एजेंट प्रशिक्षण मॉड्यूल',
    'Bank Official': 'बैंक अधिकारी',
    'DPR review portal, scoring audit trail': 'डीपीआर समीक्षा पोर्टल, स्कोरिंग ऑडिट ट्रेल',
    'Standardized reports, compliance checklist': 'मानकीकृत रिपोर्ट, अनुपालन चेकलिस्ट',
    'Scheme interpretation guide': 'योजना व्याख्या मार्गदर्शिका',
    'NABARD/SCA Evaluator': 'नाबार्ड / एससीए मूल्यांकनकर्ता',
    'Portfolio dashboard, GIS market maps': 'पोर्टफोलियो डैशबोर्ड, जीआईएस बाजार मानचित्र',
    'Sectoral analysis, subsidy impact assessment': 'क्षेत्रीय विश्लेषण, अनुदान प्रभाव मूल्यांकन',
    'Policy alignment module': 'नीति समन्वय मॉड्यूल',
    'Access': 'पहुंच माध्यम',
    'Primary Needs': 'प्राथमिक आवश्यकताएं',
    'Training Module': 'प्रशिक्षण मॉड्यूल',
    'Authenticate Portal': 'पोर्टल प्रमाणित करें',
    'Audit-Ready Inspection': 'ऑडिट-तैयार निरीक्षण',
    'DPR Sample: Pages 12-15': 'डीपीआर नमूना: पृष्ठ १२-१५',
    'Page 12: Financial Projections': 'पृष्ठ १२: वित्तीय अनुमान',
    '3-year cash flow projection based on deterministic scoring core': 'नियतात्मक स्कोरिंग कोर पर आधारित ३-वर्षीय नकदी प्रवाह अनुमान',
    'Year 1': 'वर्ष १',
    'Year 2': 'वर्ष २',
    'Year 3': 'वर्ष ३',
    'Projected Net Surplus': 'अनुमानित शुद्ध अधिशेष',
    'Page 14: Market Intelligence': 'पृष्ठ १४: बाजार विश्लेषण',
    'Ghazipur dairy market analysis with confidence-tiered pricing': 'विश्वसनीयता स्तरित मूल्यों के साथ गाजीपुर डेयरी बाजार विश्लेषण',
    'Milk procurement price:': 'दूध खरीद मूल्य:',
    'Curd market price:': 'दही बाजार मूल्य:',
    'Close': 'बंद करें',
    'Download Sample (PDF)': 'नमूना डाउनलोड करें (PDF)',
    'DPR sample PDF generation initiated for Ghazipur Pilot.': 'गाजीपुर पायलट के लिए डीपीआर नमूना पीडीएफ निर्माण शुरू किया गया।',

    // Auth Page
    'National Single Sign-On': 'राष्ट्रीय एकल साइन-ऑन',
    'Log In to your SWANIRVAR account': 'अपने स्वनिर्भर खाते में लॉग इन करें',
    'Sign Up for your SWANIRVAR account': 'अपने स्वनिर्भर खाते के लिए पंजीकरण करें',
    'Aadhaar / Mobile OTP': 'आधार / मोबाइल ओटीपी',
    'DigiLocker / Meri Pehchaan': 'डिजिलॉकर / मेरी पहचान',
    'Password Authentication': 'पासवर्ड प्रमाणीकरण',
    'Official Email or Mobile Number': 'आधिकारिक ईमेल अथवा मोबाइल नंबर',
    'Enter official email or 10-digit mobile': 'आधिकारिक ईमेल या १० अंकों का मोबाइल दर्ज करें',
    'Password': 'पासवर्ड',
    'Enter your password': 'अपना पासवर्ड दर्ज करें',
    'Full Name': 'पूरा नाम',
    'Enter your full name': 'अपना पूरा नाम दर्ज करें',
    'Confirm Password': 'पासवर्ड की पुष्टि करें',
    'Re-enter your password': 'पासवर्ड पुनः दर्ज करें',
    'Institutional Role': 'संस्थागत भूमिका',
    'State / Union Territory': 'राज्य / केंद्र शासित प्रदेश',
    'District': 'ज़िला',
    'Select your state': 'अपना राज्य चुनें',
    'Select your role': 'अपनी भूमिका चुनें',
    'Enter your district': 'अपना ज़िला दर्ज करें',
    'Verify & Continue': 'सत्यापित करें एवं आगे बढ़ें',
    'Create Verified Account': 'सत्यापित खाता बनाएं',
    'Already have an account?': 'क्या आपके पास पहले से खाता है?',
    "Don't have an account?": 'क्या आपके पास खाता नहीं है?',
    'Rural Micro-Entrepreneur': 'ग्रामीण सूक्ष्म उद्यमी',
    'CSC VLE Agent': 'सीएससी वीएलई एजेंट',
    'Institutional Citizen': 'संस्थागत नागरिक',
    'Bank Loan Officer': 'बैंक ऋण अधिकारी',
    'Self-Help Group (SHG) Leader': 'स्वयं सहायता समूह (एसएचजी) प्रमुख',
    'State Procurement Officer': 'राज्य खरीद अधिकारी',

    // Voice Modal & Assistant
    'Voice Recognition': 'आवाज़ पहचान प्रणाली',
    'Listening...': 'सुन रहे हैं...',
    'Speak now in your regional language': 'अब अपनी क्षेत्रीय भाषा में बोलें',
    'Say your state or choose a language': 'अपने राज्य का नाम कहें या भाषा चुनें',
    'Cancel': 'रद्द करें',
    'Switch Language': 'भाषा बदलें',

    // Dashboard Core & Navigation
    'Dashboard': 'डैशबोर्ड',
    'Location': 'स्थान',
    'Area': 'क्षेत्र',
    'People': 'जनसांख्यिकी',
    'Customer': 'ग्राहक',
    'Competitor': 'प्रतिस्पर्धी',
    'Market': 'बाजार',
    'Validation': 'सत्यापन',
    'GTM': 'बाजार प्रवेश (GTM)',
    'Financials': 'वित्तीय संरचना',
    'DPR': 'विस्तृत रिपोर्ट (DPR)',
    'Bank': 'बैंक एवं एससीए',
    'Operations': 'संचालन केंद्र',
    'Simulator': 'सिम्युलेटर',
    '1. Location': '१. स्थान',
    '2. Area': '२. क्षेत्र',
    '3. People': '३. लोग',
    '4. Customer': '४. ग्राहक',
    '5. Competitor': '५. प्रतिस्पर्धी',
    '6. Market': '६. बाजार',
    '7. Validation': '७. सत्यापन',
    '8. GTM': '८. जीटीएम',
    '9. Financials': '९. वित्तीय',
    '10. DPR': '१०. डीपीआर',
    '11. Bank': '११. बैंक',
    '12. Ops Hub': '१२. संचालन',
    '13. Simulator': '१३. सिम्युलेटर',
    'Back to Portal': 'पोर्टल पर वापस',
    'Logout': 'लॉग आउट',
    'Recalibrate': 'पुनः कैलिब्रेट करें',
    'VLE Agent Mode': 'वीएलई एजेंट मोड',
    'Admin Console': 'एडमिन कंसोल',
    '16-Step Pipeline': '१६-चरणीय पाइपलाइन',
    'Listen': 'सुनें',
    'Proceed to Next': 'आगे बढ़ें',
    'Next Step': 'अगला कदम',
    'Back': 'पीछे',
    'Finish & Launch Feasibility Pipeline': 'समाप्त करें एवं विश्लेषण शुरू करें',
    'Conversational Business Onboarding': 'संवादात्मक व्यावसायिक ऑनबोर्डिंग',
    'Progressive Voice-First Enterprise Intake': 'प्रगतिशील वॉयस-फर्स्ट उद्यम प्रविष्टि',
    'Proceed to Demographics & People': 'जनसांख्यिकी एवं लोगों पर आगे बढ़ें',
    'Proceed to Customer Demand': 'ग्राहक मांग पर आगे बढ़ें',
    'Proceed to Competitor Analysis': 'प्रतिस्पर्धी विश्लेषण पर आगे बढ़ें',
    'Proceed to Market Intelligence': 'बाजार विश्लेषण पर आगे बढ़ें',
    'Proceed to 7D Validation': '७डी सत्यापन पर आगे बढ़ें',
    'Proceed to GTM Strategy': 'जीटीएम रणनीति पर आगे बढ़ें',
    'Proceed to Smart Financials': 'स्मार्ट वित्तीय योजना पर आगे बढ़ें',
    'Proceed to Bank-Ready DPR': 'बैंक-तैयार डीपीआर पर आगे बढ़ें',
    'Proceed to SCA / Bank Hand-Off': 'एससीए / बैंक हैंड-ऑफ पर आगे बढ़ें',
    'Proceed to Rural Operations Hub': 'ग्रामीण संचालन केंद्र पर आगे बढ़ें',
    'Proceed to Gamified Simulator': 'सिम्युलेटर पर आगे बढ़ें',

    // Financial Module
    '1. The 10% Margin Engine (Pure Algorithm)': '१. १०% मार्जिन इंजन (शुद्ध एल्गोरिदम)',
    'Total Feasible Project Cost = Available Margin ÷ 0.10 | Maximum Loan = 90%':
      'कुल व्यवहार्य परियोजना लागत = उपलब्ध मार्जिन ÷ ०.१० | अधिकतम ऋण = ९०%',
    'Your Available Margin Capital': 'आपकी उपलब्ध मार्जिन पूंजी',
    'Margin Capital (10%)': 'मार्जिन पूंजी (१०%)',
    'Total Feasible Project Cost': 'कुल व्यवहार्य परियोजना लागत',
    'Maximum Concessional Loan': 'अधिकतम रियायती ऋण',
    'Bank Financing (90%)': 'बैंक वित्तपोषण (९०%)',
    'Borrower own equity contribution': 'उद्यमी का स्वयं का अंशदान',
    '100% bank-appraisal basis (10x Margin)': '१००% बैंक मूल्यांकन आधार (१० गुना मार्जिन)',
    '2 & 3. Zero-Hallucination Scheme Auto-Router': '२ एवं ३. विश्वसनीय योजना ऑटो-राउटर',
    'Auto-Selected Scheme': 'स्वतः चयनित योजना',
    'Selected Scheme': 'चयनित योजना',
    'Micro Finance Scheme': 'माइक्रो फाइनेंस योजना',
    'Term Loan Scheme (SCA / PMEGP)': 'मियादी ऋण योजना (एससीए / पीएमईजीपी)',
    'Interest Rate': 'ब्याज दर',
    'Tenure': 'कार्यकाल',
    'Moratorium': 'मोराटोरियम (अधिस्थगन)',
    'Total Quarters': 'कुल तिमाही',
    'Years': 'वर्ष',
    'Months': 'माह',
    'Qtrs': 'तिमाही',
    'Statutory Scheme Parameters': 'वैधानिक योजना मानक',
    'Margin Required': 'आवश्यक मार्जिन',
    'Strictly 10%': 'अनिवार्य रूप से १०%',
    'Max Funding': 'अधिकतम वित्तपोषण',
    'Repayment Mode': 'चुकौती प्रणाली',
    'Quarterly (EQI)': 'त्रैमासिक (EQI)',
    '4. Subsidy & Grant Entitlement': '४. सब्सिडी एवं अनुदान पात्रता',
    'Eligible Margin Money Subsidy': 'पात्र मार्जिन मनी सब्सिडी',
    'Government Grant Amount': 'सरकारी अनुदान राशि',
    '5 & 6. Quarterly Repayment & Moratorium Breakdown': '५ एवं ६. त्रैमासिक चुकौती एवं मोराटोरियम विवरण',
    '7. CapEx vs Working Capital Allocation': '७. पूंजीगत व्यय बनाम कार्यशील पूंजी आवंटन',
    'Term Loan (CapEx Component)': 'मियादी ऋण (पूंजीगत परिसंपत्ति)',
    'Working Capital (Revolving Limit)': 'कार्यशील पूंजी (स्टॉक एवं कच्चा माल)',
    'Monthly Operational Outflow': 'मासिक परिचालन व्यय',
    'Complete Repayment Amortization Schedule': 'संपूर्ण त्रैमासिक ऋण चुकौती समय-सारणी',
    'View All Quarters': 'सभी तिमाही देखें',
    'Download CSV': 'सीएसवी डाउनलोड करें',
    'Print Schedule': 'समय-सारणी प्रिंट करें',
    'Close Schedule': 'तालिका बंद करें',
    'Quarter Number': 'तिमाही संख्या',
    'Period Label': 'अवधि विवरण',
    'Opening Balance': 'प्रारंभिक शेष',
    'Principal Repaid': 'मूलधन भुगतान',
    'Total Installment': 'कुल त्रैमासिक किस्त',
    'Closing Balance': 'अंतिम शेष',
    'Repayment Phase': 'चुकौती चरण',
    'Sanctioned Principal': 'स्वीकृत मूलधन',
    'Total Interest Payable': 'कुल देय ब्याज',
    'Total Cash Outflow': 'कुल नकदी भुगतान',
    'Moratorium Window': 'मोराटोरियम अवधि',
    'Statutory Concessional Scheme Ceiling Notice': 'वैधानिक रियायती योजना सीमा सूचना',
    'Cap Applied: ₹1.25L': 'लागू सीमा: ₹१.२५ लाख',
    'Cap Applied: ₹45L': 'लागू सीमा: ₹४५ लाख',

    // SCA/CA Bank Module
    '4. Designated State Channelizing Agency (SCA/CA) Office': '४. नामित राज्य चैनलाइजिंग एजेंसी (SCA/CA) कार्यालय',
    'Official nodal agency responsible for disbursing 90% concessional loans & margin money subsidies':
      '९०% रियायती ऋण और मार्जिन मनी सब्सिडी वितरित करने हेतु जिम्मेदार आधिकारिक नोडल एजेंसी',
    'State Channelizing Body': 'राज्य चैनलाइजिंग संस्था',
    'District Office': 'ज़िला कार्यालय',
    'Nodal Officer': 'नोडल अधिकारी',
    'Contact / Helpline': 'संपर्क / हेल्पलाइन',
    'Email': 'ईमेल',
    'Official Portal': 'आधिकारिक पोर्टल',
    'Lead District Bank (LDM)': 'लीड डिस्ट्रिक्ट बैंक (LDM)',
    'District Industries Centre (DIC)': 'ज़िला उद्योग केंद्र (DIC)',
    'SCA / Bank Document Checklist': 'एससीए / बैंक दस्तावेज़ चेकलिस्ट',
    'Common Application Form (CAF) Auto-Fill': 'कॉमन एप्लीकेशन फॉर्म (CAF) स्वतः भरण',
    'Download SCA Docket (PDF)': 'एससीए आवेदन डॉकेट डाउनलोड करें (PDF)',
    'Download 40-Page DPR (PDF)': '४०-पृष्ठ डीपीआर डाउनलोड करें (PDF)',
    'Preview Document': 'दस्तावेज़ पूर्वावलोकन',
    'Copy Form Data': 'डेटा कॉपी करें',
    'Copied to Clipboard!': 'क्लिपबोर्ड पर कॉपी हो गया!',
    'Physical Application Hand-off Step': 'भौतिक आवेदन जमा करने का चरण',
    'Mandatory Doc': 'अनिवार्य दस्तावेज़',
    'Optional Doc': 'वैकल्पिक दस्तावेज़',
    'Doc Verified': 'दस्तावेज़ सत्यापित',
    'Doc Pending': 'दस्तावेज़ लंबित',

    // Location & LGD
    '5. Granular Local Government Directory (LGD) Cascading Selector': '५. स्थानीय निकाय निर्देशिका (LGD) ड्रॉपडाउन चयनकर्ता',
    'Select State → District → Sub-Division/Block → Gram Panchayat':
      'राज्य → ज़िला → अनुमंडल/ब्लॉक → ग्राम पंचायत का चयन करें',
    'LGD Cascader': 'एलजीडी चयनकर्ता',
    'Custom Typing': 'मैन्युअल टाइपिंग',
    '1. State / UT': '१. राज्य / केंद्र शासित प्रदेश',
    '2. District': '२. ज़िला',
    '3. Block / Sub-Division': '३. ब्लॉक / अनुमंडल',
    '4. Gram Panchayat': '४. ग्राम पंचायत',
    'GP Population': 'ग्राम पंचायत जनसंख्या',
    'Sex Ratio': 'लिंगानुपात',
    'Literacy Rate': 'साक्षरता दर',
    'SC / ST Ratio': 'एससी / एसटी अनुपात',
    'Postal Code': 'पिन कोड',
    'Block Distance': 'ब्लॉक दूरी',
    'Live Leaflet.js Spatial Ecosystem Map': 'सजीव लीफलेट.जेएस स्थानिक पारिस्थितिकी तंत्र मानचित्र',
    'Live GPS Fix': 'प्रत्यक्ष जीपीएस स्थान',
    'Scanning...': 'स्कैन किया जा रहा है...',
    'Competitors': 'प्रतिस्पर्धी',
    'Mandis & Haats': 'मंडियां एवं हाट',
    'Suppliers': 'आपूर्तिकर्ता',
    'Agricultural Nodes': 'कृषि क्लस्टर',
    'Location Sector': 'स्थान का प्रकार',
    'Beneficiary Category': 'लाभार्थी वर्ग',
    'Rural (PMEGP 25%-35% Subsidy)': 'ग्रामीण (२५%-३५% सब्सिडी)',
    'Urban (PMEGP 15%-25% Subsidy)': 'शहरी (१५%-२५% सब्सिडी)',
    'General Category': 'सामान्य वर्ग',
    'Special (SC/ST/OBC/Women/Minority)': 'विशेष वर्ग (SC/ST/OBC/महिला/अल्पसंख्यक)',
    'Proposed Business Activity': 'प्रस्तावित व्यावसायिक गतिविधि',
    'Enterprise & Scheme Parameters': 'उद्यम एवं योजना मानक',
    'Primary Agrarian / Industrial Base:': 'प्राथमिक कृषि / औद्योगिक आधार:',
    'STRENGTHS (Internal)': 'ताकत / खूबियां (आंतरिक)',
    'WEAKNESSES (Internal)': 'कमजोरियां (आंतरिक)',
    'OPPORTUNITIES (External)': 'अवसर (बाहरी)',
    'THREATS (External)': 'जोखिम एवं खतरे (बाहरी)',
    'Close Risk Matrix': 'जोखिम मैट्रिक्स बंद करें',
    'Close Preview': 'पूर्वावलोकन बंद करें',
    'Download Full 40-Page PDF': 'पूर्ण ४०-पृष्ठ पीडीएफ डाउनलोड करें',
  },

  bn: {
    // Nav & Common
    'Overview': 'একনজরে',
    'Statistics': 'পরিসংখ্যান ও তথ্য',
    'About Us': 'আমাদের সম্পর্কে',
    'FAQ': 'সাধারণ জিজ্ঞাসা',
    'Login': 'লগইন',
    'Sign Up': 'নিবন্ধন',
    'Voice': 'ভয়েস',
    'Language': 'ভাষা',
    'Select Language': 'ভাষা নির্বাচন করুন',
    'OFFICIAL': 'অফিসিয়াল',
    'Navigation': 'ন্যাভিগেশন',
    'Aatmanirbhar Bharat Sovereign Platform': 'আত্মনির্ভর ভারত সার্বভৌম প্ল্যাটফর্ম',
    'Speak in your local language to automatically switch website language': 'ওয়েবসাইটের ভাষা স্বয়ংক্রিয়ভাবে পরিবর্তন করতে স্থানীয় ভাষায় কথা বলুন',
    'Speak in Local Language (Auto-Detect)': 'স্থানীয় ভাষায় কথা বলুন (স্বয়ংক্রিয় শনাক্তকরণ)',
    'Speak in Local Language': 'স্থানীয় ভাষায় কথা বলুন',

    // Hero Section
    'PROTOTYPE DEPLOYED': 'প্রোটোটাইপ কার্যকর',
    'Indians are the new way of India': 'ভারতীয়রাই ভারতের নতুন পথ',
    'A New Way Towards Aatmanirbhar Bharat': 'আত্মনির্ভর ভারতের দিকে একটি নতুন পথ',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'স্বনির্ভর: গ্রামীণ উদ্যোগের স্বপ্নকে স্থানীয় ভয়েস ইন্টেলিজেন্স ও নিশ্চিত নীতিমালার মাধ্যমে ব্যাংক-স্বীকৃত পুঁজিতে রূপান্তরিত করে।',
    'Active Prototype Corridor:': 'সক্রিয় প্রোটোটাইপ করিডোর:',
    'Active Prototype Corridor': 'সক্রিয় প্রোটোটাইপ করিডোর',
    'Punjab': 'পাঞ্জাব',
    'Maharashtra': 'মহারাষ্ট্র',
    'West Bengal': 'পশ্চিমবঙ্গ',
    'Tamil Nadu': 'তামিলনাড়ু',
    'Explore Dashboard': 'ড্যাশবোর্ড দেখুন',
    'Replay Brand Preloader': 'ব্র্যান্ড প্রিলোডার পুনরায় চালান',
    'Select a Corridor State on India Map or Speak Your State': 'ভারতের মানচিত্রে একটি করিডোর রাজ্য নির্বাচন করুন বা আপনার রাজ্যের নাম বলুন',
    'Interactive Sovereign Prototype': 'ইন্টারেক্টিভ সার্বভৌম প্রোটোটাইপ',
    'Click or tap any highlight state to review regional trade corridor specifications, active MSME clusters, and autonomous bank-verified settlement.':
      'আঞ্চলিক বাণিজ্য রূপরেখা, সক্রিয় এমএসএমই ক্লাস্টার এবং স্বয়ংক্রিয় ব্যাংক লেনদেন দেখতে যে কোনো রাজ্যে ক্লিক করুন।',

    // Statistics Section
    'National Scale': 'জাতীয় পরিধি',
    'Real-Time Sovereign Metrics': 'রিয়েল-টাইম সার্বভৌম মেট্রিক্স',
    'NABARD & RBI Core Aggregator Ledger': 'নাবার্ড ও আরবিআই কোর লেজার',
    'Live Institutional Data': 'লাইভ প্রাতিষ্ঠানিক তথ্য',
    'National Administrative Scale': 'জাতীয় প্রশাসনিক পরিধি',
    'States & UTs': 'রাজ্য ও কেন্দ্রশাসিত অঞ্চল',
    '36 (28 States and 8 Union Territories)': '৩৬ (২৮টি রাজ্য ও ৮টি কেন্দ্রশাসিত অঞ্চল)',
    'Total Village Reach': 'সর্বমোট গ্রাম সংযোগ',
    'Lakhs': 'লক্ষ',
    'Approximately 6.64 Lakhs (664,369 recorded rural jurisdictions across India)':
      'প্রায় ৬.৬৪ লক্ষ (ভারতজুড়ে ৬৬৪,৩৬৯টি নথিভুক্ত গ্রামীণ অঞ্চল)',
    'Grassroots Digital Infrastructure': 'তৃণমূল ডিজিটাল অবকাঠামো',
    'Over 2.5 Lakh CSCs': '২.৫ লক্ষাধিক সিএসসি',
    'Lakh CSCs': 'লক্ষ সিএসসি',
    'Over 2.5 Lakh Common Service Centres (CSCs) deployed across Gram Panchayats nationwide':
      'দেশব্যাপী গ্রাম পঞ্চায়েতে ২.৫ লক্ষেরও বেশি কমন সার্ভিস সেন্টার (সিএসসি) সক্রিয়',
    'Field Agent Workforce': 'মাঠপর্যায়ের কর্মীবাহিনী',
    'Lakh+ VLEs': 'লক্ষ+ ভিএলই',
    'Over 5.5 to 6 Lakh+ active Village Level Entrepreneurs (VLEs) operating under the CSC digital framework':
      'সিএসসি কাঠামোর অধীনে ৫.৫ থেকে ৬ লক্ষাধিক সক্রিয় গ্রাম পর্যায়ের উদ্যোক্তা (ভিএলই) যুক্ত',
    'Over': 'এর বেশি',
    'to': 'থেকে',
    'Compare': 'তুলনা করুন',
    'Reset Compare': 'তুলনা রিসেট করুন',
    'Compare FY 24-25': 'আর্থিক বছর ২৪-২৫ এর সাথে তুলনা',
    'FY 25-26 (Curr)': 'আর্থিক বছর ২৫-২৬ (বর্তমান)',
    'FY 24-25 (Prev)': 'আর্থিক বছর ২৪-২৫ (পূর্ববর্তী)',

    // FAQ Section
    'Common Inquiries': 'সাধারণ জিজ্ঞাসা',
    'Frequently Asked Questions': 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলি',
    'Essential insights regarding prototype deployment, institutional onboarding, and sovereign compliance standards.':
      'প্রোটোটাইপ বাস্তবায়ন, প্রাতিষ্ঠানিক সংযুক্তি এবং সার্বভৌম নীতিমালার মূল তথ্য।',
    'Why are Punjab, Maharashtra, West Bengal, and Tamil Nadu selected for the prototype?':
      'প্রোটোটাইপের জন্য পাঞ্জাব, মহারাষ্ট্র, পশ্চিমবঙ্গ এবং তামিলনাড়ু কেন নির্বাচিত হলো?',
    'These four states represent distinct economic and geographic corridors of India: Northern agriculture and agro-processing (Punjab), Western heavy engineering and finance (Maharashtra), Eastern maritime and handicraft exchanges (West Bengal), and Southern high-tech and automotive manufacturing (Tamil Nadu). This diversity validates the platform under varied state regulatory environments.':
      'এই চারটি রাজ্য ভারতের স্বতন্ত্র অর্থনৈতিক করিডোরের প্রতিনিধিত্ব করে: উত্তরের কৃষি ও খাদ্য প্রক্রিয়াকরণ (পাঞ্জাব), পশ্চিমের ভারী প্রকৌশল ও অর্থনীতি (মহারাষ্ট্র), পূর্বের সামুদ্রিক ও হস্তশিল্প বিনিময় (পশ্চিমবঙ্গ), এবং দক্ষিণের উচ্চ-প্রযুক্তি ও স্বয়ংচালিত উৎপাদন (তামিলনাড়ু)।',
    'How does the language flow work across all Indian states?':
      'সমস্ত ভারতীয় রাজ্যে ভাষার প্রবাহ কীভাবে কাজ করে?',
    'SWANIRVAR provides end-to-end interface and contract translation across 12 scheduled Indian languages. When a user selects their language, the entire application, tender terminology, and negotiation contracts instantly adapt and persist across all current and future portals.':
      'স্বনির্ভর ১২টি ভারতীয় ভাষায় সম্পূর্ণ ইন্টারফেস এবং চুক্তি অনুবাদ প্রদান করে। ভাষা নির্বাচন করলে সম্পূর্ণ পোর্টাল তৎক্ষণাৎ অনূদিত হয়।',
    'What is the significance of "Indians are the new way of India"?':
      '"ভারতীয়রাই ভারতের নতুন পথ" এর তাৎপর্য কী?',
    'It reflects our guiding conviction: rather than relying on predatory intermediary intermediaries or fragmented closed platforms, Indian citizens, MSMEs, and rural entrepreneurs are actively driving the future of national self-reliance (Aatmanirbhar Bharat).':
      'এটি আমাদের অটল বিশ্বাসের প্রতিফলন: মধ্যস্বত্বভোগীদের ওপর নির্ভর না করে দেশের নাগরিক, এমএসএমই এবং গ্রামীণ উদ্যোক্তারা সক্রিয়ভাবে আত্মনির্ভর ভারতের ভবিষ্যৎ গড়ে তুলছেন।',
    'How do the 10 core features integrate with existing government portals like GeM and ONDC?':
      '১০টি মূল বৈশিষ্ট্য GeM এবং ONDC-এর মতো বিদ্যমান সরকারি পোর্টালগুলির সাথে কীভাবে একীভূত হয়?',
    'SWANIRVAR utilizes open APIs and protocol adapters to sync seamlessly with the Government e-Marketplace (GeM), the Open Network for Digital Commerce (ONDC), GSTN, and TReDS invoice discounting systems with zero vendor lock-in.':
      'স্বনির্ভর মুক্ত এপিআই ব্যবহার করে GeM, ONDC, GSTN এবং TReDS ইনভয়েস সিস্টেমের সাথে সহজে সংযুক্ত হয়।',
    'How can enterprises in pilot states participate in the prototype?':
      'পাইলট রাজ্যগুলির উদ্যোগগুলি কীভাবে প্রোটোটাইপে অংশ নিতে পারে?',
    'Enterprises in Punjab, Maharashtra, West Bengal, and Tamil Nadu can click "Login" or "Sign Up" in the navbar to connect their Udyam registration, verify their enterprise credentials, and start participating in live tenders and state procurement auctions.':
      'পাঞ্জাব, মহারাষ্ট্র, পশ্চিমবঙ্গ ও তামিলনাড়ুর উদ্যোগগুলি সরাসরি উদয়ম রেজিস্ট্রেশন সংযুক্ত করে নিলাম ও কেনাকাটায় অংশ নিতে পারে।',

    // About Us & Auth
    'Institutional Framework': 'প্রাতিষ্ঠানিক পরিকাঠামো',
    'Hybrid Vernacular-First Institutional Platform transforming unorganized rural micro-entrepreneur intent into bank-verified, NABARD-standard enterprises.':
      'অসংগঠিত গ্রামীণ ক্ষুদ্র উদ্যোক্তাদের পরিকল্পনাকে ব্যাংক-যাচাইকৃত এবং নাবার্ড-মানসম্পন্ন উদ্যোগে রূপান্তরিত করার বহুমাত্রিক প্রতিষ্ঠানিক প্ল্যাটফর্ম।',
    'Back to Overview': 'সংক্ষিপ্ত বিবরণে ফিরে যান',
    'Pilot Context': 'পাইলট পরিপ্রেক্ষিত',
    'Core Capabilities': 'মূল সক্ষমতা',
    'Financial Scoring': 'আর্থিক স্কোরিং',
    'Mandi Intelligence': 'মণ্ডি গোয়েন্দা তথ্য',
    'Account Aggregator': 'অ্যাকাউন্ট অ্যাগ্রিগেটর',
    'DPR Generator': 'ডিপিআর জেনারেটর',
    'Stakeholders': 'অংশীদার ও অংশীজন',
    'Active': 'সক্রিয়',
    'Testing': 'পরীক্ষাধীন',
    'Integrated': 'সংযুক্ত',
    'Verified': 'যাচাইকৃত',
    'PILOT ACTIVE': 'পাইলট সক্রিয়',
    'NABARD ALIGNED': 'নাবার্ড অনুমোদিত',
    'Pilot Context: Ghazipur District, Uttar Pradesh': 'পাইলট পরিপ্রেক্ষিত: গাজিপুর জেলা, উত্তরপ্রদেশ',
    'Demonstrating deterministic financial scoring, grassroots telemetry capture, and formal bank syndication without black-box generative AI interference in the credit path.':
      'ঋণ প্রক্রিয়ায় কোনো ব্ল্যাক-বক্স জেনারেটিভ এআই-এর হস্তক্ষেপ ছাড়াই সুনির্দিষ্ট আর্থিক স্কোরিং, তৃণমূল স্তরের টেলিমেট্রি এবং আনুষ্ঠানিক ব্যাংক অর্থায়নের বাস্তবায়ন।',
    'Beneficiary': 'সুবিধাভোগী',
    'Ramesh of Baksha village': 'বকশা গ্রামের রমেশ',
    'Dairy micro-enterprise': 'দুগ্ধজাত ক্ষুদ্র উদ্যোগ',
    'Promoter Contribution': 'উদ্যোক্তার নিজস্ব বিনিয়োগ',
    'Equity injection': 'ইকুইটি বিনিয়োগ',
    'Scoring Core': 'স্কোরিং কোর',
    'Deterministic Python modules': 'সুনির্দিষ্ট পাইথন মডিউল',
    'No LLM in scoring path': 'স্কোরিং প্রক্রিয়ায় কোনো এলএলএম নেই',
    '8 Verified Modules': '৮টি যাচাইকৃত মডিউল',
    'Voice Intake (Bol-Khata)': 'ভয়েস ইনটেক (বোল-খাতা)',
    'Vernacular-first intent capture via voice. Transcripts stored with SHA-256 hash.':
      'কণ্ঠস্বরের মাধ্যমে স্থানীয় ভাষায় উদ্দেশ্য সংগ্রহ। ট্রান্সক্রিপ্ট SHA-256 হ্যাশ দ্বারা সুরক্ষিত।',
    'Deterministic Scoring Core': 'সুনির্দিষ্ট স্কোরিং কোর',
    'Python modules produce all financial figures. No LLM in scoring path.':
      'পাইথন মডিউল সকল আর্থিক হিসাব নির্ণয় করে। স্কোরিং পদ্ধতিতে কোনো এলএলএম হস্তক্ষেপ নেই।',
    'Rule-Based Scheme Router': 'নিয়ম-ভিত্তিক প্রকল্প রাউটার',
    'Matches enterprise profile with NABARD, PMEGP, State schemes.':
      'নাবার্ড, পিএমইজিপি ও রাজ্য সরকারি প্রকল্পের সাথে উদ্যোগের প্রোফাইল মেলায়।',
    'GIS Market Intelligence': 'জিআইএস বাজার বিশ্লেষণ',
    'Hyper-local mandi prices with four confidence tiers.':
      'চারটি নির্ভরযোগ্যতা স্তরের ভিত্তিতে স্থানীয় মণ্ডির বাজারদর।',
    'Dual-AI Simulation Suite': 'ডুয়াল-এআই সিমুলেশন স্যুট',
    'Confidence training via deterministic + stochastic simulation.':
      'সুনির্দিষ্ট ও সম্ভাবনামূলক সিমুলেশনের মাধ্যমে আত্মবিশ্বাস প্রশিক্ষণ।',
    'Digital Gullak System': 'ডিজিটাল গুল্লক ব্যবস্থা',
    'Cash-flow discipline with envelope-budgeting interface.':
      'খাম-বাজেটিং ইন্টারফেসের মাধ্যমে নগদ প্রবাহের শৃঙ্খলা রক্ষা।',
    '40-page DPR Generator': '৪০ পৃষ্ঠার ডিপিআর জেনারেটর',
    'Audit-ready Detailed Project Report with traceable calculations.':
      'নিরীক্ষা-উপযোগী বিস্তারিত প্রকল্প প্রতিবেদন (ডিপিআর) যার প্রতিটি হিসাব স্পষ্ট যাচাইযোগ্য।',
    'RBI Account Aggregator': 'আরবিআই অ্যাকাউন্ট অ্যাগ্রিগেটর',
    'Consent-based financial data via Sahamati framework.':
      'সহমতি কাঠামোর মাধ্যমে সম্মতি-ভিত্তিক আর্থিক ডেটা শেয়ারিং।',
    'Financial Scoring & Scheme Router': 'আর্থিক স্কোরিং ও প্রকল্প রাউটার',
    'Deterministic Python core produces all financial figures across scoring, scheme routing, and financial intelligence modules.':
      'সুনির্দিষ্ট পাইথন কোর স্কোরিং, স্কিম রাউটিং এবং আর্থিক বুদ্ধিমত্তা মডিউলে নির্ভুল হিসাব প্রস্তুত করে।',
    'Parameter': 'প্যারামিটার',
    'Value': 'মান',
    'Confidence': 'নির্ভরযোগ্যতা',
    'Scheme Match': 'প্রকল্প সামঞ্জস্য',
    'Subsidy Estimate': 'ভর্তুকি প্রাক্কলন',
    'Working Capital Requirement': 'চলতি মূলধনের প্রয়োজন',
    'Debt Service Coverage Ratio': 'ঋণ সেবা কভারেজ অনুপাত (DSCR)',
    'Projected Margin': 'প্রত্যাশিত লাভের হার',
    'Repayment Period': 'পরিশোধের মেয়াদ',
    '5 years': '৫ বছর',
    'High': 'উচ্চ',
    'Medium': 'মাঝারি',
    'Assumption': 'পূর্বানুমান',
    'Standard': 'প্রমিত',
    'PMEGP + State Subsidy': 'পিএমইজিপি + রাজ্য ভর্তুকি',
    '₹75,000 (preliminary)': '₹৭৫,০০০ (প্রাথমিক)',
    'NABARD Refinance': 'নাবার্ড পুনঃঅর্থায়ন',
    'Interest subvention eligible': 'সুদ ভর্তুকির যোগ্য',
    'All schemes': 'সকল প্রকল্প',
    'Meets minimum requirement': 'ন্যূনতম শর্ত পূরণ করে',
    'Not scheme-dependent': 'প্রকল্প নির্ভর নয়',
    'N/A': 'প্রযোজ্য নয়',
    'Bank term loan': 'ব্যাংক মেয়াদী ঋণ',
    'Moratorium: 18 months': 'মোরেটোরিয়াম: ১৮ মাস',
    'The 10% margin rate is an assumption for projection purposes, not a universal rule. Actual margins may vary based on local market conditions.':
      '১০% লাভের হার কেবল প্রাক্কলনের সুবিধার্থে একটি অনুমান, এটি কোনো সার্বজনীন নিয়ম নয়। স্থানীয় বাজারের ওপর ভিত্তি করে প্রকৃত মার্জিন পরিবর্তিত হতে পারে।',
    'Mandi Price Intelligence': 'মণ্ডি দর বিশ্লেষণ ও গোয়েন্দা তথ্য',
    'Four confidence tiers: Live (Agmarknet / e-NAM), Historical, Estimated (~42,000 informal haats), Crowdsourced (VLE GPS + timestamp). Never show interpolated as live.':
      'চারটি আস্থার স্তর: লাইভ (এগম্যার্কনেট / ই-ন্যাম), ঐতিহাসিক, আনুমানিক (~৪২,০০০ স্থানীয় হাট), ক্রাউডসোর্সড (ভিএলই জিপিএস + সময়)। অনুমান করা মানকে কখনোই লাইভ হিসেবে দেখানো হয় না।',
    'LIVE': 'সরাসরি (লাইভ)',
    'HISTORICAL': 'ঐতিহাসিক',
    'ESTIMATED': 'আনুমানিক',
    'CROWDSOURCED': 'মাঠপর্যায় থেকে সংগৃহীত',
    'Agmarknet / e-NAM': 'এগম্যার্কনেট / ই-ন্যাম',
    'Seasonal Archive': 'মৌসুমী সংগ্রহশালা',
    'Spatial Interpolation': 'স্থানিক প্রাক্কলন',
    'VLE Field Data': 'ভিএলই মাঠ পর্যায়ের তথ্য',
    'Real-time verified prices from regulated mandis': 'নিয়ন্ত্রিত মণ্ডি থেকে তাৎক্ষণিক যাচাইকৃত মূল্য',
    '5-year price patterns for trend analysis': 'প্রবণতা পর্যালোচনার জন্য ৫ বছরের মূল্যের ধারা',
    'For ~42,000 informal haats without direct data': 'সরাসরি ডেটাবিহীন প্রায় ৪২,০০০ অনানুষ্ঠানিক গ্রামীণ হাটের জন্য',
    'GPS-timestamped local price reports': 'জিপিএস ও সময় সম্বলিত স্থানীয় মূল্যের প্রতিবেদন',
    'Commodity': 'পণ্যদ্রব্য',
    'Unit': 'একক',
    'Live Price': 'বর্তমান দর',
    'Historical Range': 'ঐতিহাসিক পরিসীমা',
    'Estimated': 'আনুমানিক',
    'Crowdsourced': 'ক্রাউডসোর্সড',
    'Milk': 'দুধ',
    'Curd': 'দই',
    'Ghee': 'ঘি',
    'Paneer': 'পনির',
    'Liter': 'লিটার',
    'Kg': 'কেজি',
    'Account Aggregator Integration': 'অ্যাকাউন্ট অ্যাগ্রিগেটর সংযোগ',
    'Uses RBI/Sahamati framework. Never uses UPI credentials. Consent-based data sharing with 24-hour validity.':
      'আরবিআই/সহমতি কাঠামো ব্যবহার করে। কখনো ইউপিআই প্রমাণপত্র সংগ্রহ করে না। ২৪ ঘণ্টার মেয়াদে সম্মতি-ভিত্তিক ডেটা আদান-প্রদান।',
    'Consent Flow': 'সম্মতি প্রবাহ',
    'Beneficiary initiates consent via AA app': 'সুবিধাভোগী এএ অ্যাপের মাধ্যমে সম্মতি শুরু করেন',
    'Specifies data type (bank statements, GST returns)': 'তথ্যের ধরন নির্বাচন করেন (ব্যাংক বিবরণী, জিএসটি রিটার্ন)',
    '24-hour validity period': '২৪ ঘণ্টার বৈধতার মেয়াদ',
    'FIUs receive encrypted data': 'আর্থিক তথ্য ব্যবহারকারী (FIU) এনক্রিপ্ট করা ডেটা পান',
    'Financial Data Retrieved': 'সংগৃহীত আর্থিক তথ্য',
    'Bank Statements': 'ব্যাংক স্টেটমেন্ট',
    'Last 12 months cash flow': 'বিগত ১২ মাসের নগদ প্রবাহ',
    'GST Returns': 'জিএসটি রিটার্ন',
    'If registered under GST': 'যদি জিএসটি নিবন্ধিত থাকে',
    'Investment Proof': 'বিনিয়োগ প্রমাণপত্র',
    'FDs, mutual fund statements': 'স্থায়ী আমানত, মিউচুয়াল ফান্ড বিবরণী',
    'Credit Report': 'ক্রেডিট রিপোর্ট',
    'Through RBI-approved CICs': 'আরবিআই অনুমোদিত ক্রেডিট ব্যুরোর মাধ্যমে',
    'Audit-Ready DPR Generator': 'নিরীক্ষা-উপযোগী ডিপিআর জেনারেটর',
    '40-page Detailed Project Report with bank-ready sections. All calculations traceable to source modules.':
      'ব্যাংক-প্রস্তুত বিভাগসহ ৪০ পৃষ্ঠার বিস্তারিত প্রকল্প প্রতিবেদন (DPR)। সকল হিসাবের উৎস স্পষ্টভাবে যাচাইযোগ্য।',
    'Executive Summary': 'সারসংক্ষেপ',
    'Enterprise Profile': 'উদ্যোগের প্রোফাইল',
    'Market Analysis': 'বাজার বিশ্লেষণ',
    'Financial Projections': 'আর্থিক পূর্বাভাস',
    'Scheme Alignment': 'প্রকল্পের সাথে সমন্বয়',
    'Risk Assessment': 'ঝুঁকি নিরূপণ',
    'Cash Flow Discipline': 'নগদ প্রবাহ শৃঙ্খলা',
    'Compliance Checklist': 'সম্মতি ও নিয়মাবলী চেকলিস্ট',
    'Appendices': 'সংযোজনী',
    'Pages': 'পৃষ্ঠা',
    'Auto-generated': 'স্বয়ংক্রিয় প্রস্তুত',
    'From Bol-Khata': 'বোল-খাতা থেকে',
    'GIS Intelligence': 'জিআইএস তথ্য',
    'Scheme Router': 'প্রকল্প রাউটার',
    'Dual-AI Simulation': 'ডুয়াল-এআই সিমুলেশন',
    'Digital Gullak': 'ডিজিটাল গুল্লক',
    'Regulatory Core': 'নিয়ামক কোর',
    'Source Data': 'উৎস তথ্য',
    'DPR Output Sample': 'ডিপিআর আউটপুট নমুনা',
    'Generates PDF with watermarked page numbers, digital signature of scoring core, and audit metadata.':
      'জলছাপযুক্ত পৃষ্ঠা নম্বর, স্কোরিং কোরের ডিজিটাল স্বাক্ষর এবং অডিট মেটাডেটা সহ পিডিএফ তৈরি করে।',
    'View Sample Pages': 'নমুনা পৃষ্ঠা দেখুন',
    'Stakeholder Access Points': 'অংশীজনদের অ্যাক্সেস পয়েন্ট',
    'Rural Micro-Entrepreneur': 'গ্রামীণ ক্ষুদ্র উদ্যোক্তা',
    'Voice interface (Bol-Khata), vernacular UI': 'ভয়েস ইন্টারফেস (বোল-খাতা), স্থানীয় ভাষার ইউআই',
    'Simple intent capture, subsidy matching, cash flow tracking': 'সহজ উদ্দেশ্য সংগ্রহ, ভর্তুকি নির্বাচন, নগদ প্রবাহ পর্যবেক্ষণ',
    'Dual-AI confidence simulation': 'ডুয়াল-এআই আত্মবিশ্বাস সিমুলেশন',
    'VLE / CSC Agent': 'ভিএলই / সিএসসি প্রতিনিধি',
    'Assisted-entry dashboard, GPS price reporting': 'সহায়তাপ্রাপ্ত এন্ট্রি ড্যাশবোর্ড, জিপিএস মূল্য প্রতিবেদন',
    'Quick beneficiary onboarding, document scanning': 'দ্রুত সুবিধাভোগী সংযোজন, নথি স্ক্যানিং',
    'Agent training module': 'প্রতিনিধি প্রশিক্ষণ মডিউল',
    'Bank Official': 'ব্যাংক কর্মকর্তা',
    'DPR review portal, scoring audit trail': 'ডিপিআর পর্যালোচনা পোর্টাল, স্কোরিং অডিট ট্রেইল',
    'Standardized reports, compliance checklist': 'মানসম্পন্ন প্রতিবেদন, সম্মতি চেকলিস্ট',
    'Scheme interpretation guide': 'প্রকল্প ব্যাখ্যা নির্দেশিকা',
    'NABARD/SCA Evaluator': 'নাবার্ড / এসসিএ মূল্যায়নকারী',
    'Portfolio dashboard, GIS market maps': 'পোর্টফোলিও ড্যাশবোর্ড, জিআইএস বাজার মানচিত্র',
    'Sectoral analysis, subsidy impact assessment': 'খাতভিত্তিক বিশ্লেষণ, ভর্তুকি প্রভাব মূল্যায়ন',
    'Policy alignment module': 'নীতি সমন্বয় মডিউল',
    'Access': 'প্রবেশাধিকার',
    'Primary Needs': 'প্রাথমিক প্রয়োজন',
    'Training Module': 'প্রশিক্ষণ মডিউল',
    'Authenticate Portal': 'পোর্টাল প্রমাণীকরণ',
    'Audit-Ready Inspection': 'নিরীক্ষা-উপযোগী পরিদর্শন',
    'DPR Sample: Pages 12-15': 'ডিপিআর নমুনা: পৃষ্ঠা ১২-১৫',
    'Page 12: Financial Projections': 'পৃষ্ঠা ১২: আর্থিক পূর্বাভাস',
    '3-year cash flow projection based on deterministic scoring core': 'সুনির্দিষ্ট স্কোরিং কোরের ওপর ভিত্তি করে ৩ বছরের নগদ প্রবাহ প্রাক্কলন',
    'Year 1': '১ম বছর',
    'Year 2': '২য় বছর',
    'Year 3': '৩য় বছর',
    'Projected Net Surplus': 'প্রত্যাশিত নিট উদ্বৃত্ত',
    'Page 14: Market Intelligence': 'পৃষ্ঠা ১৪: বাজার গোয়েন্দা তথ্য',
    'Ghazipur dairy market analysis with confidence-tiered pricing': 'আস্থার স্তরভিত্তিক মূল্যসহ গাজিপুর দুগ্ধ বাজার বিশ্লেষণ',
    'Milk procurement price:': 'দুধ সংগ্রহের দর:',
    'Curd market price:': 'দই বিক্রির দর:',
    'Close': 'বন্ধ করুন',
    'Download Sample (PDF)': 'নমুনা ডাউনলোড করুন (PDF)',
    'DPR sample PDF generation initiated for Ghazipur Pilot.': 'গাজিপুর পাইলটের জন্য ডিপিআর নমুনা পিডিএফ তৈরি শুরু হয়েছে।',
    'National Single Sign-On': 'জাতীয় সিঙ্গেল সাইন-অন',
    'Log In to your SWANIRVAR account': 'আপনার স্বনির্ভর অ্যাকাউন্টে লগইন করুন',
    'Sign Up for your SWANIRVAR account': 'আপনার স্বনির্ভর অ্যাকাউন্টের জন্য নিবন্ধন করুন',
    'Official Email or Mobile Number': 'অফিসিয়াল ইমেইল বা মোবাইল নম্বর',
    'Enter official email or 10-digit mobile': 'অফিসিয়াল ইমেইল অথবা ১০-সংখ্যার মোবাইল নম্বর দিন',
    'Password': 'পাসওয়ার্ড',
    'Enter your password': 'আপনার পাসওয়ার্ড লিখুন',
    'Full Name': 'পুরো নাম',
    'Enter your full name': 'আপনার পূর্ণ নাম লিখুন',
    'Confirm Password': 'পাসওয়ার্ড নিশ্চিত করুন',
    'Verify & Continue': 'যাচাই করুন ও এগিয়ে যান',
    'Create Verified Account': 'যাচাইকৃত অ্যাকাউন্ট তৈরি করুন',
    'Already have an account?': 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    "Don't have an account?": 'অ্যাকাউন্ট নেই?',
    'Back to Home': 'হোমে ফিরে যান',

    // Dashboard Core & Navigation
    'Dashboard': 'ড্যাশবোর্ড',
    'Location': 'অবস্থান',
    'Area': 'এলাকা',
    'People': 'জনসংখ্যা ও মানুষ',
    'Customer': 'ক্রেতা ও চাহিদা',
    'Competitor': 'প্রতিযোগী বিশ্লেষণ',
    'Market': 'বাজার বিশ্লেষণ',
    'Validation': 'যাচাইকরণ',
    'GTM': 'বাজার কৌশল (GTM)',
    'Financials': 'আর্থিক কাঠামো',
    'DPR': 'বিস্তারিত রিপোর্ট (DPR)',
    'Bank': 'ব্যাংক ও এসসিএ',
    'Operations': 'অপারেশনস কেন্দ্র',
    'Simulator': 'সিমুলেটর',
    '1. Location': '১. অবস্থান',
    '2. Area': '২. এলাকা',
    '3. People': '৩. মানুষ',
    '4. Customer': '৪. ক্রেতা',
    '5. Competitor': '৫. প্রতিযোগী',
    '6. Market': '৬. বাজার',
    '7. Validation': '৭. যাচাইকরণ',
    '8. GTM': '৮. জিটিএম',
    '9. Financials': '৯. আর্থিক',
    '10. DPR': '১০. ডিপিআর',
    '11. Bank': '১১. ব্যাংক',
    '12. Ops Hub': '১২. অপারেশনস',
    '13. Simulator': '১৩. সিমুলেটর',
    'Back to Portal': 'পোর্টাল এ ফিরে যান',
    'Logout': 'লগআউট',
    'Recalibrate': 'পুনঃগণনা করুন',
    'VLE Agent Mode': 'ভিএলই এজেন্ট মোড',
    'Admin Console': 'অ্যাডমিন কনসোল',
    '16-Step Pipeline': '১৬-ধাপের পাইপলাইন',
    'Listen': 'শুনুন',
    'Proceed to Next': 'পরবর্তী ধাপে যান',
    'Next Step': 'পরবর্তী ধাপ',
    'Back': 'পূর্ববর্তী',
    'Finish & Launch Feasibility Pipeline': 'সম্পন্ন ও বিশ্লেষণ শুরু করুন',
    'Conversational Business Onboarding': 'কথোপকথনমূলক ব্যবসায়িক অনবোর্ডিং',
    'Progressive Voice-First Enterprise Intake': 'ভয়েস-ফার্স্ট উদ্যোগ সংযোজন',
    'Proceed to Demographics & People': 'জনমিতি ও জনসংখ্যার ধাপে যান',
    'Proceed to Customer Demand': 'ক্রেতার চাহিদায় যান',
    'Proceed to Competitor Analysis': 'প্রতিযোগী বিশ্লেষণে যান',
    'Proceed to Market Intelligence': 'বাজার তথ্যে যান',
    'Proceed to 7D Validation': '৭ডি যাচাইকরণে যান',
    'Proceed to GTM Strategy': 'জিটিএম কৌশলে যান',
    'Proceed to Smart Financials': 'স্মার্ট অর্থায়নে যান',
    'Proceed to Bank-Ready DPR': 'ব্যাংক ডিপিআরে যান',
    'Proceed to SCA / Bank Hand-Off': 'এসসিএ / ব্যাংক হস্তান্তরে যান',

    // Financial Module
    '1. The 10% Margin Engine (Pure Algorithm)': '১. ১০% মার্জিন ইঞ্জিন (বিশুদ্ধ অ্যালগরিদম)',
    'Total Feasible Project Cost = Available Margin ÷ 0.10 | Maximum Loan = 90%':
      'মোট প্রকল্প খরচ = নিজস্ব মার্জিন ÷ ০.১০ | সর্বোচ্চ ঋণ = ৯০%',
    'Your Available Margin Capital': 'আপনার নিজস্ব উপলব্ধ মার্জিন তহবিল',
    'Margin Capital (10%)': 'মার্জিন মূলধন (১০%)',
    'Total Feasible Project Cost': 'মোট সম্ভাবনাময় প্রকল্প খরচ',
    'Maximum Concessional Loan': 'সর্বোচ্চ রেয়াতি ব্যাংক ঋণ',
    'Bank Financing (90%)': 'ব্যাংক অর্থায়ন (৯০%)',
    'Borrower own equity contribution': 'উদ্যোক্তার নিজস্ব মূলধন অবদান',
    '100% bank-appraisal basis (10x Margin)': '১০০% ব্যাংক মূল্যায়নের ভিত্তি (১০ গুণ মার্জিন)',
    '2 & 3. Zero-Hallucination Scheme Auto-Router': '২ ও ৩. সরকারি প্রকল্প অটো-রাউটার',
    'Auto-Selected Scheme': 'স্বয়ংক্রিয় নির্বাচিত প্রকল্প',
    'Selected Scheme': 'নির্বাচিত সরকারি স্কিম',
    'Micro Finance Scheme': 'মাইক্রো ফিনান্স প্রকল্প (ক্ষুদ্র ঋণ)',
    'Term Loan Scheme (SCA / PMEGP)': 'মেয়াদী ঋণ প্রকল্প (এসসিএ / পিএমইজিপি)',
    'Interest Rate': 'সুদের হার',
    'Tenure': 'মেয়াদ',
    'Moratorium': 'মোরাটোরিয়াম (ছাড়ের সময়)',
    'Total Quarters': 'সর্বমোট ত্রৈমাসিক',
    'Years': 'বছর',
    'Months': 'মাস',
    'Qtrs': 'ত্রৈমাসিক',
    'Statutory Scheme Parameters': 'বিধিগত প্রকল্পের শর্তাবলি',
    'Margin Required': 'প্রয়োজনীয় মার্জিন',
    'Strictly 10%': 'অবশ্যই ১০%',
    'Max Funding': 'সর্বোচ্চ তহবিল',
    'Repayment Mode': 'পরিশোধের পদ্ধতি',
    'Quarterly (EQI)': 'ত্রৈমাসিক কিস্তি (EQI)',
    '4. Subsidy & Grant Entitlement': '৪. সরকারি অনুদান ও ভর্তুকির অধিকার',
    'Eligible Margin Money Subsidy': 'প্রাপ্য মার্জিন মানি ভর্তুকি',
    'Government Grant Amount': 'সরকারি অনুদানের পরিমাণ',
    '5 & 6. Quarterly Repayment & Moratorium Breakdown': '৫ ও ৬. ত্রৈমাসিক ঋণ পরিশোধ ও মোরাটোরিয়াম বিবরণী',
    '7. CapEx vs Working Capital Allocation': '৭. স্থায়ী মূলধন বনাম চলতি মূলধন বণ্টন',
    'Term Loan (CapEx Component)': 'মেয়াদী ঋণ (যন্ত্রপাতি ও পরিকাঠামো)',
    'Working Capital (Revolving Limit)': 'চলতি মূলধন (কাঁচামাল ও স্টক তহবিল)',
    'Monthly Operational Outflow': 'মাসিক পরিচালন খরচ',
    'Complete Repayment Amortization Schedule': 'সম্পূর্ণ ত্রৈমাসিক ঋণ পরিশোধের সময়সারণী',
    'View All Quarters': 'সকল ত্রৈমাসিক দেখুন',
    'Download CSV': 'সিএসভি ডাউনলোড করুন',
    'Print Schedule': 'তালিকা প্রিন্ট করুন',
    'Close Schedule': 'তালিকা বন্ধ করুন',
    'Quarter Number': 'ত্রৈমাসিক সংখ্যা',
    'Period Label': 'সময়কালের বিবরণ',
    'Opening Balance': 'প্রারম্ভিক স্থিতি',
    'Principal Repaid': 'পরিশোধিত আসল',
    'Total Installment': 'মোট ত্রৈমাসিক কিস্তি',
    'Closing Balance': 'সমাপনী স্থিতি',
    'Repayment Phase': 'পরিশোধের পর্যায়',
    'Sanctioned Principal': 'অনুমোদিত আসল ঋণ',
    'Total Interest Payable': 'মোট প্রদেয় সুদ',
    'Total Cash Outflow': 'মোট পরিশোধযোগ্য নগদ',
    'Moratorium Window': 'মোরাটোরিয়াম সময়সীমা',
    'Statutory Concessional Scheme Ceiling Notice': 'বিধিগত স্কিম সর্বোচ্চ সীমা সংক্রান্ত বিজ্ঞপ্তি',
    'Cap Applied: ₹1.25L': 'প্রযুক্ত সীমা: ₹১.২৫ লক্ষ',
    'Cap Applied: ₹45L': 'প্রযুক্ত সীমা: ₹৪৫ লক্ষ',

    // SCA/CA Bank Module
    '4. Designated State Channelizing Agency (SCA/CA) Office': '৪. মনোনীত স্টেট চ্যানেলাইজিং এজেন্সি (SCA/CA) কার্যালয়',
    'Official nodal agency responsible for disbursing 90% concessional loans & margin money subsidies':
      '৯০% রেয়াতি ঋণ ও মার্জিন মানি অনুদান বিতরণের দায়িত্বপ্রাপ্ত সরকারি নোডাল সংস্থা',
    'State Channelizing Body': 'স্টেট চ্যানেলাইজিং সংস্থা',
    'District Office': 'জেলা কার্যালয়',
    'Nodal Officer': 'নোডাল অফিসার',
    'Contact / Helpline': 'যোগাযোগ / হেল্পলাইন',
    'Email': 'ইমেইল',
    'Official Portal': 'অফিসিয়াল পোর্টাল',
    'Lead District Bank (LDM)': 'লিড ডিস্ট্রিক্ট ব্যাংক (LDM)',
    'District Industries Centre (DIC)': 'জেলা শিল্প কেন্দ্র (DIC)',
    'SCA / Bank Document Checklist': 'এসসিএ / ব্যাংক নথি চেকলিস্ট',
    'Common Application Form (CAF) Auto-Fill': 'কমন অ্যাপ্লিকেশন ফর্ম (CAF) অটো-ফিল',
    'Download SCA Docket (PDF)': 'এসসিএ আবেদন ডকেট ডাউনলোড (PDF)',
    'Download 40-Page DPR (PDF)': '৪০ পৃষ্ঠার ডিপিআর ডাউনলোড (PDF)',
    'Preview Document': 'নথি প্রাকদর্শন',
    'Copy Form Data': 'তথ্য কপি করুন',
    'Copied to Clipboard!': 'ক্লিপবোর্ডে কপি সম্পন্ন!',
    'Physical Application Hand-off Step': 'কাগজে আবেদন জমা দেওয়ার ধাপ',
    'Mandatory Doc': 'আবশ্যিক নথি',
    'Optional Doc': 'ঐচ্ছিক নথি',
    'Doc Verified': 'নথি যাচাইকৃত',
    'Doc Pending': 'নথি অপেক্ষমান',

    // Location & LGD
    '5. Granular Local Government Directory (LGD) Cascading Selector': '৫. এলজিডি গ্রাম পঞ্চায়েত ড্রপডাউন নির্বাচন',
    'Select State → District → Sub-Division/Block → Gram Panchayat':
      'রাজ্য → জেলা → মহকুমা/ব্লক → গ্রাম পঞ্চায়েত নির্বাচন করুন',
    'LGD Cascader': 'এলজিডি সিলেক্টর',
    'Custom Typing': 'নিজ হাতে লিখুন',
    '1. State / UT': '১. রাজ্য / কেন্দ্রশাসিত অঞ্চল',
    '2. District': '২. জেলা',
    '3. Block / Sub-Division': '৩. ব্লক / মহকুমা',
    '4. Gram Panchayat': '৪. গ্রাম পঞ্চায়েত',
    'GP Population': 'গ্রাম পঞ্চায়েত জনসংখ্যা',
    'Sex Ratio': 'লিঙ্গানুপাত',
    'Literacy Rate': 'স্বাক্ষরতার হার',
    'SC / ST Ratio': 'এসসি / এসটি অনুপাত',
    'Postal Code': 'পিন কোড',
    'Block Distance': 'ব্লক সদর থেকে দূরত্ব',
    'Live Leaflet.js Spatial Ecosystem Map': 'সরাসরি লিফলেট মানচিত্র ও ভৌগোলিক তথ্য',
    'Live GPS Fix': 'লাইভ জিপিএস অবস্থান',
    'Scanning...': 'স্ক্যান করা হচ্ছে...',
    'Competitors': 'প্রতিযোগী দোকান',
    'Mandis & Haats': 'মণ্ডি ও হাটবাজার',
    'Suppliers': 'সরবরাহকারী',
    'Agricultural Nodes': 'কৃষি ক্লাস্টার',
    'Location Sector': 'এলাকার ধরন',
    'Beneficiary Category': 'সুবিধাভোগী শ্রেণী',
    'Rural (PMEGP 25%-35% Subsidy)': 'গ্রামীণ (২৫%-৩৫% অনুদান)',
    'Urban (PMEGP 15%-25% Subsidy)': 'শহুরে (১৫%-২৫% অনুদান)',
    'General Category': 'সাধারণ শ্রেণী',
    'Special (SC/ST/OBC/Women/Minority)': 'বিশেষ শ্রেণী (SC/ST/OBC/মহিলা/সংখ্যালঘু)',
    'Proposed Business Activity': 'প্রস্তাবিত ব্যবসায়িক উদ্যোগ',
    'Enterprise & Scheme Parameters': 'উদ্যোগ ও স্কিম বিবরণী',
    'Primary Agrarian / Industrial Base:': 'প্রধান জীবিকা ও অর্থনৈতিক ভিত্তি:',
    'STRENGTHS (Internal)': 'শক্তি ও সুযোগ্য দিক (অভ্যন্তরীণ)',
    'WEAKNESSES (Internal)': 'দুর্বলতা ও সীমাবদ্ধতা (অভ্যন্তরীণ)',
    'OPPORTUNITIES (External)': 'সম্ভাবনা ও সুযোগ (বাহ্যিক)',
    'THREATS (External)': 'ঝুঁকি ও প্রতিকূলতা (বাহ্যিক)',
    'Close Risk Matrix': 'ঝুঁকি ম্যাট্রিক্স বন্ধ করুন',
    'Close Preview': 'প্রাকদর্শন বন্ধ করুন',
    'Download Full 40-Page PDF': 'সম্পূর্ণ ৪০ পৃষ্ঠার পিডিএফ ডাউনলোড করুন',
  },

  mr: {
    'Overview': 'आढावा',
    'Statistics': 'आकडेवारी',
    'About Us': 'आमच्याबद्दल',
    'FAQ': 'वारंवार विचारले जाणारे प्रश्न',
    'Login': 'लॉग इन',
    'Sign Up': 'नोंदणी करा',
    'Voice': 'आवाज',
    'Language': 'भाषा',
    'Select Language': 'भाषा निवडा',
    'OFFICIAL': 'अधिकृत',
    'Navigation': 'नेव्हिगेशन',
    'Aatmanirbhar Bharat Sovereign Platform': 'आत्मनिर्भर भारत सार्वभौम व्यासपीठ',
    'Speak in your local language to automatically switch website language': 'वेबसाइटची भाषा बदलण्यासाठी स्थानिक भाषेत बोला',
    'Speak in Local Language (Auto-Detect)': 'स्थानिक भाषेत बोला (स्वयं-ओळख)',
    'Speak in Local Language': 'स्थानिक भाषेत बोला',
    'PROTOTYPE DEPLOYED': 'प्रोटोटाइप सक्रिय',
    'Indians are the new way of India': 'भारतीय हेच भारताचा नवा मार्ग आहेत',
    'A New Way Towards Aatmanirbhar Bharat': 'आत्मनिर्भर भारताकडे एक नवा मार्ग',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'स्वनिर्भर: ग्रामीण उद्योजकतेला स्थानिक व्हॉइस बुद्धिमत्ता आणि निश्चित नियमांद्वारे बँक-सत्यापित भांडवलात रूपांतरित करतो.',
    'Active Prototype Corridor:': 'सक्रिय प्रोटोटाइप कॉरिडॉर:',
    'Punjab': 'पंजाब',
    'Maharashtra': 'महाराष्ट्र',
    'West Bengal': 'पश्चिम बंगाल',
    'Tamil Nadu': 'तमिळनाडू',
    'National Administrative Scale': 'राष्ट्रीय प्रशासकीय प्रमाण',
    'States & UTs': 'राज्ये आणि केंद्रशासित प्रदेश',
    'Total Village Reach': 'एकूण ग्रामीण पोहोच',
    'Lakhs': 'लाख',
    'Grassroots Digital Infrastructure': 'तळागाळातील डिजिटल पायाभूत सुविधा',
    'Over 2.5 Lakh CSCs': '२.५ लाखांपेक्षा जास्त सीएससी',
    'Field Agent Workforce': 'फील्ड एजंट कार्यबल',
    'Lakh+ VLEs': 'लाख+ व्हीएलई',
    'Frequently Asked Questions': 'वारंवार विचारले जाणारे प्रश्न',
    'Common Inquiries': 'सामान्य चौकशी',
    'Pilot Context': 'पायलट संदर्भ',
    'Core Capabilities': 'मुख्य क्षमता',
    'Financial Scoring': 'आर्थिक मूल्यांकन',
    'National Single Sign-On': 'राष्ट्रीय एकल साइन-ऑन',
    'Log In to your SWANIRVAR account': 'आपल्या स्वनिर्भर खात्यात लॉग इन करा',
    'Sign Up for your SWANIRVAR account': 'आपल्या स्वनिर्भर खात्यासाठी नोंदणी करा',
    'Back to Home': 'मुख्यपृष्ठावर परत जा',
    'Citizen Command Center': 'नागरिक कमांड सेंटर',
    'Live Feasibility & Risk Engine': 'थेट व्यवहार्यता आणि जोखीम इंजिन',
    'Location Intelligence': 'स्थान बुद्धिमत्ता',
    'Mandi Price Intelligence': 'मंडी भाव बुद्धिमत्ता',
    'Seasonal Demand Trends & Cycles': 'हंगामी मागणी कल आणि चक्रे',
    'Proactive Risk & Opportunity Alerts': 'सक्रिय जोखीम आणि संधी सूचना',
    'Bank-Ready DPR Generator': 'बँक-तयार डीपीआर जनरेटर',
    'Digital Gullak & Cashflow Simulator': 'डिजिटल गल्ला आणि रोख प्रवाह सिम्युलेटर',
    'Mudra & Subsidy Eligibility Engine': 'मुद्रा आणि अनुदान पात्रता इंजिन',
    'Sovereign Helpdesk & Advisory': 'सार्वभौम मदत कक्ष आणि सल्लागार',
    'Logout': 'लॉग आउट',
    'Search': 'शोधा',
    'Download DPR': 'डीपीआर डाउनलोड करा',
    'Download Sample (PDF)': 'नमुना डाउनलोड करा (PDF)',
    'Enterprise Profile': 'उद्यम प्रोफाइल',
    'Capital': 'भांडवल',
    'State': 'राज्य',
    'District': 'जिल्हा',

    // Dashboard Core & Navigation
    'Dashboard': 'डॅशबोर्ड',
    'Location': 'स्थान',
    'Area': 'क्षेत्र',
    'People': 'लोकसंख्या',
    'Customer': 'ग्राहक',
    'Competitor': 'स्पर्धक',
    'Market': 'बाजार',
    'Validation': 'सत्यापन',
    'GTM': 'बाजार धोरण (GTM)',
    'Financials': 'आर्थिक रचना',
    'DPR': 'सविस्तर अहवाल (DPR)',
    'Bank': 'बँक व एससीए',
    'Operations': 'ऑपरेशन्स हब',
    'Simulator': 'सिम्युलेटर',
    '1. Location': '१. स्थान',
    '2. Area': '२. क्षेत्र',
    '3. People': '३. लोक',
    '4. Customer': '४. ग्राहक',
    '5. Competitor': '५. स्पर्धक',
    '6. Market': '६. बाजार',
    '7. Validation': '७. सत्यापन',
    '8. GTM': '८. जीटीएम',
    '9. Financials': '९. वित्तीय',
    '10. DPR': '१०. डीपीआर',
    '11. Bank': '११. बँक',
    '12. Ops Hub': '१२. ऑपरेशन्स',
    '13. Simulator': '१३. सिम्युलेटर',
    'Back to Portal': 'पोर्टलवर परत जा',
    'Recalibrate': 'पुन्हा मोजा',
    'VLE Agent Mode': 'व्हीएलई एजंट मोड',
    'Admin Console': 'प्रशासक कन्सोल',
    '16-Step Pipeline': '१६-टप्प्यांची पाइपलाइन',
    'Listen': 'ऐका',
    'Proceed to Next': 'पुढे जा',
    'Next Step': 'पुढील टप्पा',
    'Back': 'मागे',
    'Finish & Launch Feasibility Pipeline': 'पूर्ण करा व विश्लेषण सुरू करा',
    'Conversational Business Onboarding': 'संभाषणात्मक व्यवसाय नोंदणी',
    '1. The 10% Margin Engine (Pure Algorithm)': '१. १०% मार्जिन इंजिन (शुद्ध अल्गोरिदम)',
    'Your Available Margin Capital': 'आपले उपलब्ध मार्जिन भांडवल',
    'Margin Capital (10%)': 'मार्जिन भांडवल (१०%)',
    'Total Feasible Project Cost': 'एकूण व्यवहार्य प्रकल्प खर्च',
    'Maximum Concessional Loan': 'कमाल सवलतीचे कर्ज',
    'Bank Financing (90%)': 'बँक वित्तपुरवठा (९०%)',
    '2 & 3. Zero-Hallucination Scheme Auto-Router': '२ व ३. अचूक योजना ऑटो-राउटर',
    'Auto-Selected Scheme': 'स्वयं-निवडलेली योजना',
    'Selected Scheme': 'निवडलेली योजना',
    'Micro Finance Scheme': 'मायक्रो फायनान्स योजना',
    'Term Loan Scheme (SCA / PMEGP)': 'मुदत कर्ज योजना (एससीए / पीएमईजीपी)',
    'Interest Rate': 'व्याज दर',
    'Tenure': 'कालावधी',
    'Moratorium': 'हप्ता सवलत (मोरेटोरियम)',
    'Total Quarters': 'एकूण तिमाही',
    'Years': 'वर्षे',
    'Months': 'महिने',
    'Qtrs': 'तिमाही',
    'Download CSV': 'सीएसव्ही डाउनलोड करा',
    'Print Schedule': 'वेळापत्रक मुद्रित करा',
    'Close Schedule': 'वेळापत्रक बंद करा',
    'Quarter Number': 'तिमाही क्रमांक',
    'Period Label': 'कालावधी तपशील',
    'Opening Balance': 'सुरुवातीची शिल्लक',
    'Principal Repaid': 'परतफेड केलेली मुद्दल',
    'Total Installment': 'एकूण हप्ता',
    'Closing Balance': 'अखेरची शिल्लक',
    'Repayment Phase': 'परतफेड टप्पा',
    '4. Designated State Channelizing Agency (SCA/CA) Office': '४. नियुक्त राज्य चॅनेलायझिंग एजन्सी (SCA/CA) कार्यालय',
    'State Channelizing Body': 'राज्य चॅनेलायझिंग संस्था',
    'District Office': 'जिल्हा कार्यालय',
    'Nodal Officer': 'नोडल अधिकारी',
    'Contact / Helpline': 'संपर्क / हेल्पलाईन',
    'Download SCA Docket (PDF)': 'एससीए अर्ज डॉकेट डाउनलोड करा (PDF)',
    'Download 40-Page DPR (PDF)': '४०-पानी डीपीआर डाउनलोड करा (PDF)',
    'Preview Document': 'दस्तऐवज पूर्वावलोकन',
    'Copy Form Data': 'माहिती कॉपी करा',
    'Copied to Clipboard!': 'क्लिपबोर्डवर कॉपी केले!',
    'Mandatory': 'अनिवार्य',
    'Optional': 'पर्यायी',
    'Verified': 'सत्यापित',
    'Pending': 'प्रलंबित',
    '5. Granular Local Government Directory (LGD) Cascading Selector': '५. स्थानिक स्वराज्य निर्देशिका (LGD) निवड',
    '1. State / UT': '१. राज्य / केंद्रशासित प्रदेश',
    '2. District': '२. जिल्हा',
    '3. Block / Sub-Division': '३. तालुका / गट',
    '4. Gram Panchayat': '४. ग्रामपंचायत',
    'GP Population': 'ग्रामपंचायत लोकसंख्या',
    'Sex Ratio': 'लिंग गुणोत्तर',
    'Literacy Rate': 'साक्षरता दर',
    'SC / ST Ratio': 'एससी / एसटी प्रमाण',
    'Postal Code': 'पिन कोड',
    'Block Distance': 'तालुक्यापासून अंतर',
    'Live Leaflet.js Spatial Ecosystem Map': 'थेट नकाशे व स्थानिक परिसंस्था',
    'Live GPS Fix': 'थेट जीपीएस स्थान',
    'Competitors': 'स्पर्धक',
    'Mandis & Haats': 'मंड्या व आठवडे बाजार',
    'Suppliers': 'पुरवठादार',
    'Agricultural Nodes': 'कृषी नोड्स',
    'Location Sector': 'स्थानाचा प्रकार',
    'Beneficiary Category': 'लाभार्थी प्रवर्ग',
    'Rural (PMEGP 25%-35% Subsidy)': 'ग्रामीण (२५%-३५% अनुदान)',
    'Urban (PMEGP 15%-25% Subsidy)': 'शहरी (१५%-२५% अनुदान)',
    'General Category': 'सर्वसाधारण प्रवर्ग',
    'Special (SC/ST/OBC/Women/Minority)': 'विशेष प्रवर्ग (SC/ST/OBC/महिला/अल्पसंख्याक)',
  },

  ta: {
    'Overview': 'கண்ணோட்டம்',
    'Statistics': 'புள்ளிவிவரங்கள்',
    'About Us': 'எங்களைப் பற்றி',
    'FAQ': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    'Login': 'உள்நுழைக',
    'Sign Up': 'பதிவு செய்க',
    'Voice': 'குரல்',
    'Language': 'மொழி',
    'Select Language': 'மொழியைத் தேர்ந்தெடுக்கவும்',
    'OFFICIAL': 'அதிகாரப்பூர்வ',
    'Navigation': 'வழிகாட்டல்',
    'Aatmanirbhar Bharat Sovereign Platform': 'சுயசார்பு இந்தியா இறையாண்மை தளம்',
    'Speak in your local language to automatically switch website language': 'தளத்தின் மொழியை மாற்ற உங்கள் வட்டார மொழியில் பேசுங்கள்',
    'Speak in Local Language (Auto-Detect)': 'உள்ளூர் மொழியில் பேசுங்கள் (தானியங்கி கண்டறிதல்)',
    'Speak in Local Language': 'உள்ளூர் மொழியில் பேசுங்கள்',
    'PROTOTYPE DEPLOYED': 'முன்மாதிரி செயல்பாட்டில் உள்ளது',
    'Indians are the new way of India': 'இந்தியர்களே இந்தியாவின் புதிய வழி',
    'A New Way Towards Aatmanirbhar Bharat': 'சுயசார்பு இந்தியாவை நோக்கிய புதிய பாதை',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'ஸ்வநிர்வார்: கிராமப்புற தொழில்முனைவோரின் தேவையை வட்டார மொழி நுண்ணறிவு மூலம் வங்கி அங்கீகரித்த மூலதனமாக மாற்றுகிறது.',
    'Active Prototype Corridor:': 'செயலில் உள்ள முன்மாதிரி பாதை:',
    'Punjab': 'பஞ்சாப்',
    'Maharashtra': 'மகாராஷ்டிரா',
    'West Bengal': 'மேற்கு வங்கம்',
    'Tamil Nadu': 'தமிழ்நாடு',
    'National Administrative Scale': 'தேசிய நிர்வாக அளவு',
    'States & UTs': 'மாநிலங்கள் & யூனியன் பிரதேசங்கள்',
    'Total Village Reach': 'மொத்த கிராமப்புற சென்றடைதல்',
    'Lakhs': 'இலட்சம்',
    'Grassroots Digital Infrastructure': 'அடிப்படை டிஜிட்டல் உள்கட்டமைப்பு',
    'Over 2.5 Lakh CSCs': '2.5 லட்சத்திற்கும் மேற்பட்ட CSCகள்',
    'Field Agent Workforce': 'களப் பணியாளர்கள்',
    'Lakh+ VLEs': 'இலட்சம்+ VLEகள்',
    'Frequently Asked Questions': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    'Common Inquiries': 'பொதுவான வினாக்கள்',
    'Pilot Context': 'முன்னோடி சூழல்',
    'Core Capabilities': 'முக்கிய திறன்கள்',
    'National Single Sign-On': 'தேசிய ஒற்றை உள்நுழைவு',
    'Log In to your SWANIRVAR account': 'உங்கள் ஸ்வநிர்வார் கணக்கில் உள்நுழைக',
    'Sign Up for your SWANIRVAR account': 'உங்கள் ஸ்வநிர்வார் கணக்கிற்கு பதிவு செய்க',
    'Back to Home': 'முகப்புக்குத் திரும்பு',
    'Citizen Command Center': 'குடிமக்கள் கட்டளை மையம்',
    'Live Feasibility & Risk Engine': 'நேரடி சாத்தியக்கூறு & இடர் இயந்திரம்',
    'Location Intelligence': 'இருப்பிட நுண்ணறிவு',
    'Mandi Price Intelligence': 'மண்டி விலை நுண்ணறிவு',
    'Seasonal Demand Trends & Cycles': 'பருவகால தேவை போக்குகள் & சுழற்சிகள்',
    'Proactive Risk & Opportunity Alerts': 'முன்னெச்சரிக்கை இடர் & வாய்ப்பு எச்சரிக்கைகள்',
    'Bank-Ready DPR Generator': 'வங்கி-தயார் டிபிஆர் உருவாக்கி',
    'Digital Gullak & Cashflow Simulator': 'டிஜிட்டல் குல்லக் & பணப்புழக்க மாதிரி',
    'Mudra & Subsidy Eligibility Engine': 'முத்ரா & மானிய தகுதி இயந்திரம்',
    'Sovereign Helpdesk & Advisory': 'இறையாண்மை உதவி மையம் & ஆலோசனை',
    'Logout': 'வெளியேறுக',
    'Search': 'தேடுக',
    'Download DPR': 'டிபிஆர் பதிவிறக்குக',
    'Download Sample (PDF)': 'மாதிரியைப் பதிவிறக்குக (PDF)',
    'Enterprise Profile': 'தொழில் சுயவிவரம்',
    'Capital': 'மூலதனம்',
    'State': 'மாநிலம்',
    'District': 'மாவட்டம்',
  },

  te: {
    'Overview': 'అవలోకనం',
    'Statistics': 'గణాంకాలు',
    'About Us': 'మా గురించి',
    'FAQ': 'తరచుగా అడిగే ప్రశ్నలు',
    'Login': 'లాగిన్',
    'Sign Up': 'నమోదు చేసుకోండి',
    'Voice': 'వాయిస్',
    'Language': 'భాష',
    'Select Language': 'భాషను ఎంచుకోండి',
    'OFFICIAL': 'అధికారిక',
    'Navigation': 'నావిగేషన్',
    'Aatmanirbhar Bharat Sovereign Platform': 'ఆత్మనిర్భర్ భారత్ సార్వభౌమ వేదిక',
    'Speak in your local language to automatically switch website language': 'వెబ్‌సైట్ భాష మార్చడానికి మీ స్థానిక భాషలో మాట్లాడండి',
    'Speak in Local Language (Auto-Detect)': 'స్థానిక భాషలో మాట్లాడండి (ఆటో-గుర్తింపు)',
    'Speak in Local Language': 'స్థానిక భాషలో మాట్లాడండి',
    'PROTOTYPE DEPLOYED': 'ప్రోటోటైప్ ప్రారంభించబడింది',
    'Indians are the new way of India': 'భారతీయులే భారతదేశపు కొత్త మార్గం',
    'A New Way Towards Aatmanirbhar Bharat': 'ఆత్మనిర్భర్ భారత్ వైపు కొత్త మార్గం',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'స్వనిర్వార్: గ్రామీణ పారిశ్రామిక ఆకాంక్షను స్థానిక వాయిస్ ఇంటెలిజెన్స్ ద్వారా బ్యాంక్ ధృవీకరించిన మూలధనంగా మారుస్తుంది.',
    'Active Prototype Corridor:': 'క్రియాశీల ప్రోటోటైప్ కారిడార్:',
    'Punjab': 'పంజాబ్',
    'Maharashtra': 'మహారాష్ట్ర',
    'West Bengal': 'పశ్చిమ బెంగాల్',
    'Tamil Nadu': 'తమిళనాడు',
    'National Administrative Scale': 'జాతీయ పరిపాలనా పరిధి',
    'States & UTs': 'రాష్ట్రాలు & కేంద్రపాలిత ప్రాంతాలు',
    'Total Village Reach': 'మొత్తం గ్రామాల చేరువ',
    'Lakhs': 'లక్షలు',
    'Grassroots Digital Infrastructure': 'గ్రామీణ డిజిటల్ మౌలిక సదుపాయాలు',
    'Over 2.5 Lakh CSCs': '2.5 లక్షలకు పైగా CSCలు',
    'Field Agent Workforce': 'క్షేత్రస్థాయి వర్క్‌ఫోర్స్',
    'Lakh+ VLEs': 'లక్షల+ VLEలు',
    'Frequently Asked Questions': 'తరచుగా అడిగే ప్రశ్నలు',
    'Common Inquiries': 'సాధారణ విచారణలు',
    'Pilot Context': 'పైలట్ సందర్భం',
    'Core Capabilities': 'ప్రధాన సామర్థ్యాలు',
    'National Single Sign-On': 'జాతీయ సింగిల్ సైన్-ఆన్',
    'Log In to your SWANIRVAR account': 'మీ స్వనిర్వార్ ఖాతాలోకి లాగిన్ అవ్వండి',
    'Sign Up for your SWANIRVAR account': 'మీ స్వనిర్వార్ ఖాతా కోసం నమోదు చేసుకోండి',
    'Back to Home': 'హోమ్‌కు తిరిగి వెళ్ళండి',
    'Citizen Command Center': 'పౌర కమాండ్ సెంటర్',
    'Live Feasibility & Risk Engine': 'ప్రత్యక్ష సాధ్యత & ప్రమాద ఇంజిన్',
    'Location Intelligence': 'స్థాన మేధస్సు',
    'Mandi Price Intelligence': 'మండి ధరల మేధస్సు',
    'Seasonal Demand Trends & Cycles': 'కాలానుగుణ డిమాండ్ పోకడలు & చక్రాలు',
    'Proactive Risk & Opportunity Alerts': 'క్రియాశీల రిస్క్ & అవకాశ హెచ్చరికలు',
    'Bank-Ready DPR Generator': 'బ్యాంక్-సిద్ధంగా ఉన్న డిపిఆర్ జనరేటర్',
    'Digital Gullak & Cashflow Simulator': 'డిజిటల్ గుల్లక్ & నగదు ప్రవాహ సిమ్యులేటర్',
    'Mudra & Subsidy Eligibility Engine': 'ముద్ర & రాయితీ అర్హత ఇంజిన్',
    'Sovereign Helpdesk & Advisory': 'సార్వభౌమ సహాయ డెస్క్ & సలహా',
    'Logout': 'లాగ్ అవుట్',
    'Search': 'శోధించండి',
    'Download DPR': 'డిపిఆర్ డౌన్‌లోడ్ చేయండి',
    'Download Sample (PDF)': 'నమూనాను డౌన్‌లోడ్ చేయండి (PDF)',
    'Enterprise Profile': 'ఎంటర్‌ప్రైజ్ ప్రొఫైల్',
    'Capital': 'మూలధనం',
    'State': 'రాష్ట్రం',
    'District': 'జిల్లా',
    'Location': 'ప్రాంతం',
    'Business Type': 'వ్యాపార రకం',
    'Working Capital': 'వర్కింగ్ క్యాపిటల్',
    'Term Loan': 'టర్మ్ లోన్',
    'Promoter Equity': 'ప్రమోటర్ ఈక్విటీ',
  },

  gu: {
    'Overview': 'ઝાંખી',
    'Statistics': 'આંકડાશાસ્ત્ર',
    'About Us': 'અમારા વિશે',
    'FAQ': 'વારંવાર પૂછાતા પ્રશ્નો',
    'Login': 'લૉગિન',
    'Sign Up': 'સાઇન અપ',
    'Voice': 'અવાજ',
    'Language': 'ભાષા',
    'Select Language': 'ભાષા પસંદ કરો',
    'OFFICIAL': 'સત્તાવાર',
    'Navigation': 'નેવિગેશન',
    'Aatmanirbhar Bharat Sovereign Platform': 'આત્મનિર્ભર ભારત સાર્વભૌમ પ્લેટફોર્મ',
    'Speak in your local language to automatically switch website language': 'વેબસાઇટની ભાષા બદલવા માટે સ્થાનિક ભાષામાં બોલો',
    'Speak in Local Language (Auto-Detect)': 'સ્થાનિક ભાષામાં બોલો (ઓટો-ડિટેક્ટ)',
    'Speak in Local Language': 'સ્થાનિક ભાષામાં બોલો',
    'PROTOTYPE DEPLOYED': 'પ્રોટોટાઇપ કાર્યરત',
    'Indians are the new way of India': 'ભારતીયો જ ભારતનો નવો માર્ગ છે',
    'A New Way Towards Aatmanirbhar Bharat': 'આત્મનિર્ભર ભારત તરફ એક નવો માર્ગ',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'સ્વનિર્ભર: ગ્રામીણ ઉદ્યોગ સાહસિકતાને સ્થાનિક વોઇસ ઇન્ટેલિજન્સ દ્વારા બેંક-પ્રમાણિત મૂડીમાં રૂપાંતરિત કરે છે.',
    'Active Prototype Corridor:': 'સક્રિય પ્રોટોટાઇપ કોરિડોર:',
    'Punjab': 'પંજાબ',
    'Maharashtra': 'મહારાષ્ટ્ર',
    'West Bengal': 'પશ્ચિમ બંગાળ',
    'Tamil Nadu': 'તમિલનાડુ',
    'National Administrative Scale': 'રાષ્ટ્રીય વહીવટી સ્કેલ',
    'States & UTs': 'રાજ્યો અને કેન્દ્રશાસિત પ્રદેશો',
    'Total Village Reach': 'કુલ ગ્રામીણ પહોંચ',
    'Lakhs': 'લાખ',
    'Grassroots Digital Infrastructure': 'ગ્રામીણ ડિજિટલ ઇન્ફ્રાસ્ટ્રક્ચર',
    'Over 2.5 Lakh CSCs': '૨.૫ લાખથી વધુ સીએસસી',
    'Field Agent Workforce': 'ફીલ્ડ એજન્ટ વર્કફોર્સ',
    'Lakh+ VLEs': 'લાખ+ વીએલઈ',
    'Frequently Asked Questions': 'વારંવાર પૂછાતા પ્રશ્નો',
    'Common Inquiries': 'સામાન્ય પૂછપરછ',
    'Pilot Context': 'પાયલોટ સંદર્ભ',
    'Core Capabilities': 'મુખ્ય ક્ષમતાઓ',
    'National Single Sign-On': 'રાષ્ટ્રીય સિંગલ સાઇન-ઓન',
    'Log In to your SWANIRVAR account': 'તમારા સ્વનિર્ભર ખાતામાં લૉગિન કરો',
    'Sign Up for your SWANIRVAR account': 'તમારા સ્વનિર્ભર ખાતા માટે સાઇન અપ કરો',
    'Back to Home': 'હોમ પર પાછા જાઓ',
    'Citizen Command Center': 'નાગરિક કમાન્ડ સેન્ટર',
    'Live Feasibility & Risk Engine': 'લાઇવ સદ્ધરતા અને જોખમ એન્જિન',
    'Location Intelligence': 'સ્થાન બુદ્ધિમત્તા',
    'Mandi Price Intelligence': 'મંડી ભાવ બુદ્ધિમત્તા',
    'Seasonal Demand Trends & Cycles': 'મોસમી માંગ વલણો અને ચક્રો',
    'Proactive Risk & Opportunity Alerts': 'સક્રિય જોખમ અને તક ચેતવણીઓ',
    'Bank-Ready DPR Generator': 'બેંક-તૈયાર ડીપીઆર જનરેટર',
    'Digital Gullak & Cashflow Simulator': 'ડિજિટલ ગલ્લો અને કેશફ્લો સિમ્યુલેટર',
    'Mudra & Subsidy Eligibility Engine': 'મુદ્રા અને સબસિડી પાત્રતા એન્જિન',
    'Sovereign Helpdesk & Advisory': 'સાર્વભૌમ હેલ્પડેસ્ક અને સલાહકાર',
    'Logout': 'લૉગ આઉટ',
    'Search': 'શોધો',
    'Download DPR': 'ડીપીઆર ડાઉનલોડ કરો',
    'Download Sample (PDF)': 'નમૂનો ડાઉનલોડ કરો (PDF)',
    'Enterprise Profile': 'ઉદ્યોગ પ્રોફાઇલ',
    'Capital': 'મૂડી',
    'State': 'રાજ્ય',
    'District': 'જિલ્લો',
    'Location': 'સ્થળ',
    'Business Type': 'વ્યવસાય પ્રકાર',
    'Working Capital': 'કાર્યકારી મૂડી',
    'Term Loan': 'ટર્મ લોન',
    'Promoter Equity': 'પ્રમોટર ઇક્વિટી',
  },

  kn: {
    'Overview': 'ಅವಲೋಕನ',
    'Statistics': 'ಅಂಕಿಅಂಶಗಳು',
    'About Us': 'ನಮ್ಮ ಬಗ್ಗೆ',
    'FAQ': 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
    'Login': 'ಲಾಗಿನ್',
    'Sign Up': 'ಸೈನ್ ಅಪ್',
    'Voice': 'ಧ್ವನಿ',
    'Language': 'ಭಾಷೆ',
    'Select Language': 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    'OFFICIAL': 'ಅಧಿಕೃತ',
    'Navigation': 'ನ್ಯಾವಿಗೇಷನ್',
    'Aatmanirbhar Bharat Sovereign Platform': 'ಆತ್ಮನಿರ್ಭರ ಭಾರತ ಸಾರ್ವಭೌಮ ವೇದಿಕೆ',
    'Speak in your local language to automatically switch website language': 'ವೆಬ್‌ಸೈಟ್ ಭಾಷೆ ಬದಲಾಯಿಸಲು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ',
    'Speak in Local Language (Auto-Detect)': 'ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ (ಸ್ವಯಂ-ಪತ್ತೆ)',
    'Speak in Local Language': 'ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ',
    'PROTOTYPE DEPLOYED': 'ಮಾದರಿ ನಿಯೋಜಿಸಲಾಗಿದೆ',
    'Indians are the new way of India': 'ಭಾರತೀಯರೇ ಭಾರತದ ಹೊಸ ಹಾದಿ',
    'A New Way Towards Aatmanirbhar Bharat': 'ಆತ್ಮನಿರ್ಭರ ಭಾರತದೆಡೆಗೆ ಹೊಸ ಹಾದಿ',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'ಸ್ವನಿರ್ಭರ್: ಗ್ರಾಮೀಣ ಉದ್ಯಮಶೀಲತೆಯ ಆಶಯವನ್ನು ಸ್ಥಳೀಯ ಧ್ವನಿ ಬುದ್ಧಿವಂತಿಕೆಯ ಮೂಲಕ ಬ್ಯಾಂಕ್-ದೃಢೀಕೃತ ಬಂಡವಾಳವಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ.',
    'Active Prototype Corridor:': 'ಸಕ್ರಿಯ ಕಾರಿಡಾರ್:',
    'Punjab': 'ಪಂಜಾಬ್',
    'Maharashtra': 'ಮಹಾರಾಷ್ಟ್ರ',
    'West Bengal': 'ಪಶ್ಚಿಮ ಬಂಗಾಳ',
    'Tamil Nadu': 'ತಮಿಳುನಾಡು',
    'National Administrative Scale': 'ರಾಷ್ಟ್ರೀಯ ಆಡಳಿತಾತ್ಮಕ ಪ್ರಮಾಣ',
    'States & UTs': 'ರಾಜ್ಯಗಳು ಮತ್ತು ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳು',
    'Total Village Reach': 'ಒಟ್ಟು ಗ್ರಾಮ ವ್ಯಾಪ್ತಿ',
    'Lakhs': 'ಲಕ್ಷಗಳು',
    'Grassroots Digital Infrastructure': 'ತಳಮಟ್ಟದ ಡಿಜಿಟಲ್ ಮೂಲಸೌಕರ್ಯ',
    'Over 2.5 Lakh CSCs': '೨.೫ ಲಕ್ಷಕ್ಕೂ ಹೆಚ್ಚು ಸಿಎಸ್‌ಸಿಗಳು',
    'Field Agent Workforce': 'ಕ್ಷೇತ್ರ ಕಾರ್ಯಪಡೆ',
    'Lakh+ VLEs': 'ಲಕ್ಷ+ ವಿಎಲ್‌ಇಗಳು',
    'Frequently Asked Questions': 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
    'Common Inquiries': 'ಸಾಮಾನ್ಯ ವಿಚಾರಣೆಗಳು',
    'National Single Sign-On': 'ರಾಷ್ಟ್ರೀಯ ಏಕ ಸೈನ್-ಆನ್',
    'Log In to your SWANIRVAR account': 'ನಿಮ್ಮ ಸ್ವನಿರ್ಭರ್ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ',
    'Sign Up for your SWANIRVAR account': 'ನಿಮ್ಮ ಸ್ವನಿರ್ಭರ್ ಖಾತೆಗಾಗಿ ನೋಂದಾಯಿಸಿ',
    'Back to Home': 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    'Citizen Command Center': 'ನಾಗರಿಕ ಕಮಾಂಡ್ ಸೆಂಟರ್',
    'Live Feasibility & Risk Engine': 'ಲೈವ್ ಕಾರ್ಯಸಾಧ್ಯತೆ ಮತ್ತು ಅಪಾಯದ ಎಂಜಿನ್',
    'Location Intelligence': 'ಸ್ಥಳ ಬುದ್ಧಿಮತ್ತೆ',
    'Mandi Price Intelligence': 'ಮಂಡಿ ಬೆಲೆ ಬುದ್ಧಿಮತ್ತೆ',
    'Seasonal Demand Trends & Cycles': 'ಋತುಮಾನದ ಬೇಡಿಕೆ ಪ್ರವೃತ್ತಿಗಳು ಮತ್ತು ಚಕ್ರಗಳು',
    'Proactive Risk & Opportunity Alerts': 'ಮುನ್ನೆಚ್ಚರಿಕೆ ಅಪಾಯ ಮತ್ತು ಅವಕಾಶ ಎಚ್ಚರಿಕೆಗಳು',
    'Bank-Ready DPR Generator': 'ಬ್ಯಾಂಕ್-ಸಿದ್ಧ ಡಿಪಿಆರ್ ಜನರೇಟರ್',
    'Digital Gullak & Cashflow Simulator': 'ಡಿಜಿಟಲ್ ಗುಲ್ಲಕ್ ಮತ್ತು ನಗದು ಹರಿವು ಸಿಮ್ಯುಲೇಟರ್',
    'Mudra & Subsidy Eligibility Engine': 'ಮುದ್ರಾ ಮತ್ತು ಸಬ್ಸಿಡಿ ಅರ್ಹತಾ ಎಂಜಿನ್',
    'Sovereign Helpdesk & Advisory': 'ಸಾರ್ವಭೌಮ ಸಹಾಯವಾಣಿ ಮತ್ತು ಸಲಹೆಗಾರ',
    'Logout': 'ಲಾಗ್ ಔಟ್',
    'Search': 'ಹುಡುಕಿ',
    'Download DPR': 'ಡಿಪಿಆರ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    'Download Sample (PDF)': 'ಮಾದರಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (PDF)',
    'Enterprise Profile': 'ಉದ್ಯಮ ಪ್ರೊಫೈಲ್',
    'Capital': 'ಬಂಡವಾಳ',
    'State': 'ರಾಜ್ಯ',
    'District': 'ಜಿಲ್ಲೆ',
    'Location': 'ಸ್ಥಳ',
    'Business Type': 'ವ್ಯವಹಾರ ಪ್ರಕಾರ',
    'Working Capital': 'ದುಡಿಯುವ ಬಂಡವಾಳ',
    'Term Loan': 'ಅವಧಿ ಸಾಲ',
    'Promoter Equity': 'ಪ್ರವರ್ತಕರ ಇಕ್ವಿಟಿ',
  },

  ml: {
    'Overview': 'അവലോകനം',
    'Statistics': 'സ്ഥിതിവിവരക്കണക്കുകൾ',
    'About Us': 'ഞങ്ങളെക്കുറിച്ച്',
    'FAQ': 'പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ',
    'Login': 'ലോഗിൻ',
    'Sign Up': 'സൈൻ അപ്പ്',
    'Voice': 'ശബ്ദം',
    'Language': 'ഭാഷ',
    'Select Language': 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    'OFFICIAL': 'ഔദ്യോഗികം',
    'Navigation': 'നാവിഗേഷൻ',
    'Aatmanirbhar Bharat Sovereign Platform': 'ആത്മനിർഭർ ഭാരത് പരമാധികാര പ്ലാറ്റ്ഫോം',
    'Speak in your local language to automatically switch website language': 'വെബ്സൈറ്റ് ഭാഷ മാറ്റാൻ നിങ്ങളുടെ പ്രാദേശിക ഭാഷയിൽ സംസാരിക്കുക',
    'Speak in Local Language (Auto-Detect)': 'പ്രാദേശിക ഭാഷയിൽ സംസാരിക്കുക (സ്വയം തിരിച്ചറിയൽ)',
    'Speak in Local Language': 'പ്രാദേശിക ഭാഷയിൽ സംസാരിക്കുക',
    'PROTOTYPE DEPLOYED': 'പ്രോട്ടോടൈപ്പ് സജ്ജമാക്കി',
    'Indians are the new way of India': 'ഇന്ത്യക്കാരാണ് ഇന്ത്യയുടെ പുതിയ വഴി',
    'A New Way Towards Aatmanirbhar Bharat': 'ആത്മനിർഭർ ഭാരതത്തിലേക്കുള്ള പുതിയ പാത',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'സ്വനിർഭർ: ഗ്രാമീണ സംരംഭകത്വ താല്പര്യത്തെ പ്രാദേശിക വോയ്‌സ് ഇന്റലിജൻസിലൂടെ ബാങ്ക് സ്ഥിരീകരിച്ച മൂലധനമാക്കി മാറ്റുന്നു.',
    'Active Prototype Corridor:': 'സജീവ പ്രോട്ടോടൈപ്പ് ഇടനാഴി:',
    'Punjab': 'പഞ്ചാബ്',
    'Maharashtra': 'മഹാരാഷ്ട്ര',
    'West Bengal': 'പശ്ചിമ ബംഗാൾ',
    'Tamil Nadu': 'തമിഴ്‌നാട്',
    'National Administrative Scale': 'ദേശീയ ഭരണതല വ്യാപ്തി',
    'States & UTs': 'സംസ്ഥാനങ്ങളും കേന്ദ്രഭരണ പ്രദേശങ്ങളും',
    'Total Village Reach': 'ആകെ ഗ്രാമങ്ങളിലെ വ്യാപനം',
    'Lakhs': 'ലക്ഷം',
    'Grassroots Digital Infrastructure': 'ഗ്രാമീണ ഡിജിറ്റൽ അടിസ്ഥാന സൗകര്യങ്ങൾ',
    'Over 2.5 Lakh CSCs': '2.5 ലക്ഷത്തിലധികം സിഎസ്‌സികൾ',
    'Field Agent Workforce': 'ഫീൽഡ് ഏജന്റ് തൊഴിൽ സേന',
    'Lakh+ VLEs': 'ലക്ഷം+ വിഎൽഇകൾ',
    'Frequently Asked Questions': 'പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ',
    'Common Inquiries': 'സാധാരണ സംശയങ്ങൾ',
    'National Single Sign-On': 'ദേശീയ സിംഗിൾ സൈൻ-ഓൺ',
    'Log In to your SWANIRVAR account': 'നിങ്ങളുടെ സ്വനിർഭർ അക്കൗണ്ടിലേക്ക് ലോഗിൻ ചെയ്യുക',
    'Sign Up for your SWANIRVAR account': 'നിങ്ങളുടെ സ്വനിർഭർ അക്കൗണ്ടിനായി സൈൻ അപ്പ് ചെയ്യുക',
    'Back to Home': 'ഹോമിലേക്ക് മടങ്ങുക',
    'Citizen Command Center': 'പൗര കമാൻഡ് സെന്റർ',
    'Live Feasibility & Risk Engine': 'തത്സമയ സാധ്യതാ & അപകടസാധ്യതാ എഞ്ചിൻ',
    'Location Intelligence': 'ലൊക്കേഷൻ ഇന്റലിജൻസ്',
    'Mandi Price Intelligence': 'വിപണി വില വിവരങ്ങൾ',
    'Seasonal Demand Trends & Cycles': 'സീസണൽ ഡിമാൻഡ് ട്രെൻഡുകൾ',
    'Proactive Risk & Opportunity Alerts': 'സജീവ റിസ്ക് & അവസര മുന്നറിയിപ്പുകൾ',
    'Bank-Ready DPR Generator': 'ബാങ്ക്-റെഡി ഡിപിആർ ജനറേറ്റർ',
    'Digital Gullak & Cashflow Simulator': 'ഡിജിറ്റൽ ഗുല്ലക്കും പണമൊഴുക്ക് സിമുലേറ്ററും',
    'Mudra & Subsidy Eligibility Engine': 'മുദ്ര & സബ്‌സിഡി യോഗ്യതാ എഞ്ചിൻ',
    'Sovereign Helpdesk & Advisory': 'സഹായ കേന്ദ്രവും ഉപദേശക സമിതിയും',
    'Logout': 'ലോഗ് ഔട്ട്',
    'Search': 'തിരയുക',
    'Download DPR': 'ഡിപിആർ ഡൗൺലോഡ് ചെയ്യുക',
    'Download Sample (PDF)': 'സാമ്പിൾ ഡൗൺലോഡ് ചെയ്യുക (PDF)',
    'Enterprise Profile': 'സംരംഭ പ്രൊഫൈൽ',
    'Capital': 'മൂലധനം',
    'State': 'സംസ്ഥാനം',
    'District': 'ജില്ല',
    'Location': 'സ്ഥലം',
    'Business Type': 'ബിസിനസ്സ് തരം',
    'Working Capital': 'പ്രവർത്തന മൂലധനം',
    'Term Loan': 'ടേം ലോൺ',
    'Promoter Equity': 'പ്രൊമോട്ടർ ഇക്വിറ്റി',
  },

  pa: {
    'Overview': 'ਸੰਖੇਪ ਜਾਣਕਾਰੀ',
    'Statistics': 'ਅੰਕੜੇ ਅਤੇ ਜਾਣਕਾਰੀ',
    'About Us': 'ਸਾਡੇ ਬਾਰੇ',
    'FAQ': 'ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ',
    'Login': 'ਲਾਗਇਨ',
    'Sign Up': 'ਰਜਿਸਟਰ ਕਰੋ',
    'Voice': 'ਆਵਾਜ਼',
    'Language': 'ਭਾਸ਼ਾ',
    'Select Language': 'ਭਾਸ਼ਾ ਚੁਣੋ',
    'OFFICIAL': 'ਸਰਕਾਰੀ / ਅਧਿਕਾਰਤ',
    'Navigation': 'ਨੇਵੀਗੇਸ਼ਨ',
    'Aatmanirbhar Bharat Sovereign Platform': 'ਆਤਮਨਿਰਭਰ ਭਾਰਤ ਪ੍ਰਭੂਸੱਤਾ ਪਲੇਟਫਾਰਮ',
    'Speak in your local language to automatically switch website language': 'ਵੈੱਬਸਾਈਟ ਦੀ ਭਾਸ਼ਾ ਬਦਲਣ ਲਈ ਆਪਣੀ ਖੇਤਰੀ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲੋ',
    'Speak in Local Language (Auto-Detect)': 'ਸਥਾਨਕ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲੋ (ਸਵੈ-ਖੋਜ)',
    'Speak in Local Language': 'ਸਥਾਨਕ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲੋ',
    'PROTOTYPE DEPLOYED': 'ਪ੍ਰੋਟੋਟਾਈਪ ਤਾਇਨਾਤ ਕੀਤਾ ਗਿਆ',
    'Indians are the new way of India': 'ਭਾਰਤੀ ਹੀ ਭਾਰਤ ਦਾ ਨਵਾਂ ਰਾਹ ਹਨ',
    'A New Way Towards Aatmanirbhar Bharat': 'ਆਤਮਨਿਰਭਰ ਭਾਰਤ ਵੱਲ ਇੱਕ ਨਵਾਂ ਰਾਹ',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'ਸਵੈਨਿਰਭਰ: ਪੇਂਡੂ ਉੱਦਮੀਆਂ ਦੀ ਇੱਛਾ ਨੂੰ ਮਾਤ-ਭਾਸ਼ਾ ਵੌਇਸ ਇੰਟੈਲੀਜੈਂਸ ਰਾਹੀਂ ਬੈਂਕ-ਤਸਦੀਕਸ਼ੁਦਾ ਪੂੰਜੀ ਵਿੱਚ ਬਦਲਦਾ ਹੈ।',
    'Active Prototype Corridor:': 'ਸਰਗਰਮ ਪ੍ਰੋਟੋਟਾਈਪ ਕੋਰੀਡੋਰ:',
    'Punjab': 'ਪੰਜਾਬ',
    'Maharashtra': 'ਮਹਾਰਾਸ਼ਟਰ',
    'West Bengal': 'ਪੱਛਮੀ ਬੰਗਾਲ',
    'Tamil Nadu': 'ਤਾਮਿਲਨਾਡੂ',
    'National Administrative Scale': 'ਰਾਸ਼ਟਰੀ ਪ੍ਰਬੰਧਕੀ ਪੈਮਾਨਾ',
    'States & UTs': 'ਰਾਜ ਅਤੇ ਕੇਂਦਰ ਸ਼ਾਸਤ ਪ੍ਰਦੇਸ਼',
    'Total Village Reach': 'ਕੁੱਲ ਪਿੰਡ ਪਹੁੰਚ',
    'Lakhs': 'ਲੱਖ',
    'Grassroots Digital Infrastructure': 'ਜ਼ਮੀਨੀ ਡਿਜੀਟਲ ਬੁਨਿਆਦੀ ਢਾਂਚਾ',
    'Over 2.5 Lakh CSCs': '੨.੫ ਲੱਖ ਤੋਂ ਵੱਧ ਸੀਐਸਸੀ',
    'Field Agent Workforce': 'ਫੀਲਡ ਏਜੰਟ ਵਰਕਫੋਰਸ',
    'Lakh+ VLEs': 'ਲੱਖ+ ਵੀਐਲਈ',
    'Frequently Asked Questions': 'ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ',
    'Common Inquiries': 'ਆਮ ਪੁੱਛਗਿੱਛ',
    'National Single Sign-On': 'ਰਾਸ਼ਟਰੀ ਸਿੰਗਲ ਸਾਈਨ-ਆਨ',
    'Log In to your SWANIRVAR account': 'ਆਪਣੇ ਸਵੈਨਿਰਭਰ ਖਾਤੇ ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ',
    'Sign Up for your SWANIRVAR account': 'ਆਪਣੇ ਸਵੈਨਿਰਭਰ ਖਾਤੇ ਲਈ ਰਜਿਸਟਰ ਕਰੋ',
    'Back to Home': 'ਮੁੱਖ ਪੰਨੇ ਤੇ ਵਾਪਸ ਜਾਓ',
    'Citizen Command Center': 'ਨਾਗਰਿਕ ਕਮਾਂਡ ਸੈਂਟਰ',
    'Live Feasibility & Risk Engine': 'ਲਾਈਵ ਸੰਭਾਵਨਾ ਅਤੇ ਜੋਖਮ ਇੰਜਨ',
    'Location Intelligence': 'ਸਥਾਨ ਖੁਫੀਆ ਜਾਣਕਾਰੀ',
    'Mandi Price Intelligence': 'ਮੰਡੀ ਕੀਮਤ ਖੁਫੀਆ ਜਾਣਕਾਰੀ',
    'Seasonal Demand Trends & Cycles': 'ਮੌਸਮੀ ਮੰਗ ਦੇ ਰੁਝਾਨ ਅਤੇ ਚੱਕਰ',
    'Proactive Risk & Opportunity Alerts': 'ਸਰਗਰਮ ਜੋਖਮ ਅਤੇ ਮੌਕੇ ਚੇਤਾਵਨੀਆਂ',
    'Bank-Ready DPR Generator': 'ਬੈਂਕ-ਤਿਆਰ ਡੀਪੀਆਰ ਜਨਰੇਟਰ',
    'Digital Gullak & Cashflow Simulator': 'ਡਿਜੀਟਲ ਗੋਲਕ ਅਤੇ ਨਕਦ ਪ੍ਰਵਾਹ ਸਿਮੂਲੇਟਰ',
    'Mudra & Subsidy Eligibility Engine': 'ਮੁਦਰਾ ਅਤੇ ਸਬਸਿਡੀ ਯੋਗਤਾ ਇੰਜਨ',
    'Sovereign Helpdesk & Advisory': 'ਸੰਪ੍ਰਭੂ ਹੈਲਪਡੈਸਕ ਅਤੇ ਸਲਾਹਕਾਰ',
    'Logout': 'ਲੌਗ ਆਉਟ',
    'Search': 'ਖੋਜੋ',
    'Download DPR': 'ਡੀਪੀਆਰ ਡਾਊਨਲੋਡ ਕਰੋ',
    'Download Sample (PDF)': 'ਨਮੂਨਾ ਡਾਊਨਲੋਡ ਕਰੋ (PDF)',
    'Enterprise Profile': 'ਉੱਦਮ ਪ੍ਰੋਫਾਈਲ',
    'Capital': 'ਪੂੰਜੀ',
    'State': 'ਰਾਜ',
    'District': 'ਜ਼ਿਲ੍ਹਾ',
    'Location': 'ਸਥਾਨ',
    'Business Type': 'ਕਾਰੋਬਾਰ ਦੀ ਕਿਸਮ',
    'Working Capital': 'ਕਾਰਜਕਾਰੀ ਪੂੰਜੀ',
    'Term Loan': 'ਮਿਆਦੀ ਕਰਜ਼ਾ',
    'Promoter Equity': 'ਪ੍ਰਮੋਟਰ ਇਕੁਇਟੀ',
  },

  or: {
    'Overview': 'ସମୀକ୍ଷା',
    'Statistics': 'ପରିସଂଖ୍ୟାନ',
    'About Us': 'ଆମ ବିଷୟରେ',
    'FAQ': 'ବାରମ୍ବାର ପଚରାଯାଉଥିବା ପ୍ରଶ୍ନ',
    'Login': 'ଲଗ୍ ଇନ୍',
    'Sign Up': 'ପଞ୍ଜୀକରଣ',
    'Voice': 'ସ୍ୱର',
    'Language': 'ଭାଷା',
    'Select Language': 'ଭାଷା ଚୟନ କରନ୍ତୁ',
    'OFFICIAL': 'ଅଫିସିଆଲ୍',
    'Navigation': 'ନାଭିଗେସନ୍',
    'Aatmanirbhar Bharat Sovereign Platform': 'ଆତ୍ମନିର୍ଭର ଭାରତ ସାର୍ବଭୌମ ପ୍ଲାଟଫର୍ମ',
    'Speak in your local language to automatically switch website language': 'ୱେବସାଇଟ୍ ଭାଷା ପରିବର୍ତ୍ତନ ପାଇଁ ନିଜ ସ୍ଥାନୀୟ ଭାଷାରେ କୁହନ୍ତୁ',
    'Speak in Local Language (Auto-Detect)': 'ସ୍ଥାନୀୟ ଭାଷାରେ କୁହନ୍ତୁ (ସ୍ୱତଃ ଚିହ୍ନଟ)',
    'Speak in Local Language': 'ସ୍ଥାନୀୟ ଭାଷାରେ କୁହନ୍ତୁ',
    'PROTOTYPE DEPLOYED': 'ପ୍ରୋଟୋଟାଇପ୍ ସକ୍ରିୟ',
    'Indians are the new way of India': 'ଭାରତୀୟମାନେ ହିଁ ଭାରତର ନୂଆ ପଥ',
    'A New Way Towards Aatmanirbhar Bharat': 'ଆତ୍ମନିର୍ଭର ଭାରତ ଦିଗରେ ଏକ ନୂତନ ପଥ',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'ସ୍ୱନିର୍ଭର: ଗ୍ରାମୀଣ ଉଦ୍ୟୋଗୀମାନଙ୍କର ଲକ୍ଷ୍ୟକୁ ସ୍ଥାନୀୟ ଭଏସ୍ ବୁଦ୍ଧିମତା ଦ୍ୱାରା ବ୍ୟାଙ୍କ-ଯାଞ୍ଚିତ ପୁଞ୍ଜିରେ ରୂପାନ୍ତରିତ କରେ।',
    'Active Prototype Corridor:': 'ସକ୍ରିୟ ପ୍ରୋଟୋଟାଇପ୍ କରିଡର:',
    'Punjab': 'ପଞ୍ਜାବ',
    'Maharashtra': 'ମହାରାଷ୍ଟ୍ର',
    'West Bengal': 'ପଶ୍ଚିମବଙ୍ଗ',
    'Tamil Nadu': 'ତାମିଲନାଡୁ',
    'National Administrative Scale': 'ଜାତୀୟ ପ୍ରଶାସନିକ ସ୍ତର',
    'States & UTs': 'ରାଜ୍ୟ ଏବଂ କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ',
    'Total Village Reach': 'ସର୍ବମୋଟ ଗ୍ରାମ ସଂଯୋଗ',
    'Lakhs': 'ଲକ୍ଷ',
    'Grassroots Digital Infrastructure': 'ତୃଣମୂଳ ଡିଜିଟାଲ୍ ଭିତ୍ତିଭୂମି',
    'Over 2.5 Lakh CSCs': '୨.୫ ଲକ୍ଷରୁ ଅଧିକ CSC',
    'Field Agent Workforce': 'ଫିଲ୍ଡ ଏଜେଣ୍ଟ କର୍ମଚାରୀ',
    'Lakh+ VLEs': 'ଲକ୍ଷ+ VLE',
    'Frequently Asked Questions': 'ବାରମ୍ବାର ପଚରାଯାଉଥିବା ପ୍ରଶ୍ନ',
    'Common Inquiries': 'ସାଧାରଣ ପ୍ରଶ୍ନାବଳୀ',
    'National Single Sign-On': 'ଜାତୀୟ ସିଙ୍ଗଲ୍ ସାଇନ୍-ଅନ୍',
    'Log In to your SWANIRVAR account': 'ଆପଣଙ୍କ ସ୍ୱନିର୍ଭର ଆକାଉଣ୍ଟରେ ଲଗ୍ ଇନ୍ କରନ୍ତୁ',
    'Sign Up for your SWANIRVAR account': 'ଆପଣଙ୍କ ସ୍ୱନିର୍ଭର ଆକାଉଣ୍ଟ୍ ପାଇଁ ପଞ୍ଜୀକରଣ କରନ୍ତୁ',
    'Back to Home': 'ହୋମକୁ ଫେରନ୍ତୁ',
    'Citizen Command Center': 'ନାଗରିକ କମାଣ୍ଡ ସେଣ୍ଟର',
    'Live Feasibility & Risk Engine': 'ପ୍ରତ୍ୟକ୍ଷ ସମ୍ଭାବ୍ୟତା ଏବଂ ବିପଦ ଇଞ୍ଜିନ',
    'Location Intelligence': 'ସ୍ଥାନ ଗୁଇନ୍ଦା ତଥ୍ୟ',
    'Mandi Price Intelligence': 'ମଣ୍ଡି ମୂଲ୍ୟ ବୁଦ୍ଧିମତ୍ତା',
    'Seasonal Demand Trends & Cycles': 'ଋତୁକାଳୀନ ଚାହିଦା ଧାରା ଏବଂ ଚକ୍ର',
    'Proactive Risk & Opportunity Alerts': 'ସକ୍ରିୟ ବିପଦ ଏବଂ ସୁଯୋଗ ସତର୍କତା',
    'Bank-Ready DPR Generator': 'ବ୍ୟାଙ୍କ-ପ୍ରସ୍ତୁତ ଡିପିଆର ଜେନେରେଟର',
    'Digital Gullak & Cashflow Simulator': 'ଡିଜିଟାଲ ଗୁଲ୍ଲକ ଏବଂ କ୍ୟାସଫ୍ଲୋ ସିମ୍ୟୁଲେଟର',
    'Mudra & Subsidy Eligibility Engine': 'ମୁଦ୍ରା ଏବଂ ସବସିଡି ଯୋଗ୍ୟତା ଇଞ୍ଜିନ',
    'Sovereign Helpdesk & Advisory': 'ସାର୍ବଭୌମ ସହାୟତା ଡେସ୍କ ଏବଂ ପରାମର୍ଶଦାତା',
    'Logout': 'ଲଗ୍ ଆଉଟ୍',
    'Search': 'ସନ୍ଧାନ କରନ୍ତୁ',
    'Download DPR': 'ଡିପିଆର ଡାଉନଲୋଡ୍ କରନ୍ତୁ',
    'Download Sample (PDF)': 'ନମୁନା ଡାଉନଲୋଡ୍ କରନ୍ତୁ (PDF)',
    'Enterprise Profile': 'ଉଦ୍ୟୋଗ ପ୍ରୋଫାଇଲ୍',
    'Capital': 'ପୁଞ୍ଜି',
    'State': 'ରାଜ୍ୟ',
    'District': 'ଜିଲ୍ଲା',
    'Location': 'ସ୍ଥାନ',
    'Business Type': 'ବ୍ୟବସାୟ ପ୍ରକାର',
    'Working Capital': 'କାର୍ଯ୍ୟକାରୀ ପୁଞ୍ଜି',
    'Term Loan': 'ଅବଧି ଋଣ',
    'Promoter Equity': 'ପ୍ରବର୍ତ୍ତକ ଇକ୍ୱିଟି',
  },

  as: {
    'Overview': 'একনজৰত',
    'Statistics': 'পৰিসংখ্যা',
    'About Us': 'আমাৰ বিষয়ে',
    'FAQ': 'সঘনাই সোধা প্ৰশ্ন',
    'Login': 'লগ ইন',
    'Sign Up': 'পঞ্জীয়ন',
    'Voice': 'কণ্ঠস্বৰ',
    'Language': 'ভাষা',
    'Select Language': 'ভাষা বাছক',
    'OFFICIAL': 'অফিচিয়েল',
    'Navigation': 'নেভিগেচন',
    'Aatmanirbhar Bharat Sovereign Platform': 'আত্মনিৰ্ভৰ ভাৰত সাৰ্বভৌম প্লেটফৰ্ম',
    'Speak in your local language to automatically switch website language': 'ৱেবছাইটৰ ভাষা সলনি কৰিবলৈ আপোনাৰ স্থানীয় ভাষাত কওক',
    'Speak in Local Language (Auto-Detect)': 'স্থানীয় ভাষাত কওক (স্বয়ংক্ৰিয় চিনাক্তকৰণ)',
    'Speak in Local Language': 'স্থানীয় ভাষাত কওক',
    'PROTOTYPE DEPLOYED': 'প্ৰটোটাইপ সক্ৰিয়',
    'Indians are the new way of India': 'ভাৰতীয়সকলেই ভাৰতৰ নতুন পথ',
    'A New Way Towards Aatmanirbhar Bharat': 'আত্মনিৰ্ভৰ ভাৰতৰ দিশত এক নতুন পথ',
    'Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.':
      'স্বনিৰ্ভৰ: গ্ৰাম্য উদ্যোগৰ আকাংক্ষাক স্থানীয় ভইচ বুদ্ধিমত্তা আৰু নিশ্চিত নীতিৰ জৰিয়তে বেংক-প্ৰমাণিত মূলধনলৈ ৰূপান্তৰ কৰে।',
    'Active Prototype Corridor:': 'সক্ৰিয় প্ৰটোটাইপ কৰিডৰ:',
    'Punjab': 'পঞ্জাৱ',
    'Maharashtra': 'মহাৰাষ্ট্ৰ',
    'West Bengal': 'পশ্চিম বংগ',
    'Tamil Nadu': 'তামিলনাডু',
    'National Administrative Scale': 'ৰাষ্ট্ৰীয় প্ৰশাসনিক পৰিসৰ',
    'States & UTs': 'ৰাজ্য আৰু কেন্দ্ৰীয় শাসিত অঞ্চল',
    'Total Village Reach': 'মুঠ গাঁও সংযোগ',
    'Lakhs': 'লাখ',
    'Grassroots Digital Infrastructure': 'তৃণমূল ডিজিটেল আন্তঃগাঁথনি',
    'Over 2.5 Lakh CSCs': '২.৫ লাখতকৈ অধিক CSC',
    'Field Agent Workforce': 'ক্ষেত্ৰভিত্তিক কৰ্মী',
    'Lakh+ VLEs': 'লাখ+ VLE',
    'Frequently Asked Questions': 'সঘনাই সোধা প্ৰশ্ন',
    'Common Inquiries': 'সাধাৰଣ সোধ-পোছ',
    'National Single Sign-On': 'ৰাষ্ট্ৰীয় একক ছাইন-অন',
    'Log In to your SWANIRVAR account': 'আপোনাৰ স্বনিৰ্ভৰ একাউণ্টত লগ ইন কৰক',
    'Sign Up for your SWANIRVAR account': 'আপোনাৰ স্বনিৰ্ভৰ একাউণ্টৰ বাবে পঞ্জীয়ন কৰক',
    'Back to Home': 'ঘৰলৈ উভতি যাওক',
    'Citizen Command Center': 'নাগৰিক কমাণ্ড চেণ্টাৰ',
    'Live Feasibility & Risk Engine': 'লাইভ কাৰ্যক্ষমতা আৰু বিপদ ইঞ্জিন',
    'Location Intelligence': 'স্থান বুদ্ধিমত্তা',
    'Mandi Price Intelligence': 'মণ্ডী মূল্য বুদ্ধিমত্তা',
    'Seasonal Demand Trends & Cycles': 'ঋতুকালীন চাহিদাৰ ধাৰা আৰু চক্ৰ',
    'Proactive Risk & Opportunity Alerts': 'সক্ৰিয় বিপদ আৰু সুযোগ সতৰ্কবাৰ্তা',
    'Bank-Ready DPR Generator': 'বেংক-প্ৰস্তুত ডিপিআৰ জেনেৰেটৰ',
    'Digital Gullak & Cashflow Simulator': 'ডিজিটেল গুলক আৰু নগদ প্ৰবাহ চিমুলেটৰ',
    'Mudra & Subsidy Eligibility Engine': 'মুদ্ৰা আৰু ৰাজসাহায্য যোগ্যতা ইঞ্জিন',
    'Sovereign Helpdesk & Advisory': 'সাৰ্বভৌম হেল্পডেস্ক আৰু পৰামৰ্শদাতা',
    'Logout': 'লগ আউট',
    'Search': 'সন্ধান কৰক',
    'Download DPR': 'ডিপিআৰ ডাউনলোড কৰক',
    'Download Sample (PDF)': 'নমুনা ডাউনলোড কৰক (PDF)',
    'Enterprise Profile': 'উদ্যোগ প্ৰফাইল',
    'Capital': 'मूलধন',
    'State': 'ৰাজ্য',
    'District': 'জিলা',
    'Location': 'স্থান',
    'Business Type': 'ব্যৱসায়ৰ প্ৰকাৰ',
    'Working Capital': 'কাৰ্যকৰী মূলধন',
    'Term Loan': 'ম্যাদী ঋণ',
    'Promoter Equity': 'প্ৰমোটাৰ ইকুইটি',
  },
};

// Merge all specialized dashboard translations into phrase dictionaries
for (const [lang, dict] of Object.entries(DASHBOARD_TRANSLATIONS)) {
  if (!PHRASE_DICTIONARIES[lang]) {
    PHRASE_DICTIONARIES[lang] = {};
  }
  Object.assign(PHRASE_DICTIONARIES[lang], dict);
}

// Original English text node cache
const originalTextMap = new WeakMap<Node, string>();

// Global dynamic translation cache: targetLang -> text -> translatedText
export const dynamicTranslationCache: Record<string, Record<string, string>> = {};

// Queue for dynamic asynchronous translation of newly encountered DOM nodes
const pendingNodesQueue: Map<Node, { raw: string; lang: string }> = new Map();
let batchTimer: any = null;

function queueNodeForDynamicTranslation(node: Node, rawText: string, targetLang: string) {
  if (!rawText || targetLang === 'en') return;
  const trimmed = rawText.trim();
  // Skip if empty, pure number, or single punctuation character
  if (!trimmed || !isNaN(Number(trimmed)) || trimmed.length <= 1) return;

  // If already in dynamic cache, apply immediately
  if (dynamicTranslationCache[targetLang] && dynamicTranslationCache[targetLang][trimmed]) {
    const translated = dynamicTranslationCache[targetLang][trimmed];
    const currentVal = node.nodeValue || '';
    if (currentVal.includes(trimmed)) {
      node.nodeValue = currentVal.replace(trimmed, translated);
    }
    return;
  }

  // Add to batch queue
  pendingNodesQueue.set(node, { raw: trimmed, lang: targetLang });

  // Debounce batch request to server
  if (batchTimer) clearTimeout(batchTimer);
  batchTimer = setTimeout(() => {
    flushPendingTranslations(targetLang);
  }, 120);
}

async function flushPendingTranslations(targetLang: string) {
  if (pendingNodesQueue.size === 0 || targetLang === 'en') return;

  const currentBatch = new Map(pendingNodesQueue);
  pendingNodesQueue.clear();

  const textsToFetch = Array.from(new Set(Array.from(currentBatch.values()).map((v) => v.raw)));
  if (textsToFetch.length === 0) return;

  try {
    const res = await fetch('/api/translate-batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts: textsToFetch, targetLang }),
    });

    if (!res.ok) return;
    const data = await res.json();
    const newTranslations: Record<string, string> = data.translations || {};

    if (!dynamicTranslationCache[targetLang]) {
      dynamicTranslationCache[targetLang] = {};
    }

    Object.assign(dynamicTranslationCache[targetLang], newTranslations);

    // Apply translations to all pending nodes in current batch
    currentBatch.forEach(({ raw, lang }, node) => {
      if (lang === targetLang && newTranslations[raw]) {
        try {
          const currentVal = node.nodeValue || '';
          if (currentVal.includes(raw)) {
            node.nodeValue = currentVal.replace(raw, newTranslations[raw]);
          }
        } catch {
          // Node may have been unmounted during React re-renders
        }
      }
    });
  } catch (err) {
    console.debug('Dynamic translation fetch note:', err);
  }
}

// Pre-computed sorted dictionary keys cache for high-speed sub-phrase matching
const SORTED_KEYS_CACHE: Record<string, string[]> = {};

function getSortedKeys(lang: string): string[] {
  if (SORTED_KEYS_CACHE[lang]) return SORTED_KEYS_CACHE[lang];
  const dict = PHRASE_DICTIONARIES[lang] || {};
  const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
  SORTED_KEYS_CACHE[lang] = keys;
  return keys;
}

/**
 * Translates a single text string based on phrase matching & dynamic cache
 */
export function translateText(rawText: string, targetLang: string): string {
  if (!rawText || targetLang === 'en') return rawText;

  const trimmed = rawText.trim();
  if (!trimmed) return rawText;

  // Check dynamic server-translated cache
  if (dynamicTranslationCache[targetLang] && dynamicTranslationCache[targetLang][trimmed]) {
    return rawText.replace(trimmed, dynamicTranslationCache[targetLang][trimmed]);
  }

  const dictionary = PHRASE_DICTIONARIES[targetLang];
  if (!dictionary) return rawText;

  // Direct exact match
  if (dictionary[trimmed]) {
    return rawText.replace(trimmed, dictionary[trimmed]);
  }

  // Check case-insensitive exact match
  const lowerTrimmed = trimmed.toLowerCase();
  for (const [key, val] of Object.entries(dictionary)) {
    if (key.toLowerCase() === lowerTrimmed) {
      return rawText.replace(trimmed, val);
    }
  }

  // Sentence / sub-phrase replacement for compound elements
  let result = rawText;
  const sortedKeys = getSortedKeys(targetLang);

  for (const key of sortedKeys) {
    if (key.length >= 3 && result.includes(key)) {
      result = result.split(key).join(dictionary[key]);
    }
  }

  return result;
}

// Cache for original attributes and values
const originalPlaceholderMap = new WeakMap<Element, string>();
const originalTitleMap = new WeakMap<Element, string>();
const originalAriaLabelMap = new WeakMap<Element, string>();

/**
 * Recursively translates all visible text nodes and translatable attributes in a DOM subtree
 */
export function translateDOMSubtree(root: Node, targetLang: string) {
  if (!root) return;

  // Handle Element Nodes
  if (root.nodeType === Node.ELEMENT_NODE) {
    const el = root as HTMLElement;
    const tagName = el.tagName ? el.tagName.toLowerCase() : '';

    // Only skip genuinely non-translatable tags
    if (
      tagName === 'script' ||
      tagName === 'style' ||
      tagName === 'code' ||
      tagName === 'pre' ||
      tagName === 'svg' ||
      el.getAttribute('data-no-translate') === 'true' ||
      el.classList.contains('notranslate') ||
      el.classList.contains('skiptranslate') ||
      (el.closest && (el.closest('[data-no-translate="true"]') || el.closest('.notranslate')))
    ) {
      return;
    }

    // Handle Input & Textarea Placeholders
    if (tagName === 'input' || tagName === 'textarea') {
      const inputEl = el as HTMLInputElement | HTMLTextAreaElement;
      if (inputEl.placeholder) {
        if (!originalPlaceholderMap.has(inputEl)) {
          originalPlaceholderMap.set(inputEl, inputEl.placeholder);
        }
        const origPlaceholder = originalPlaceholderMap.get(inputEl) || inputEl.placeholder;
        if (targetLang === 'en') {
          inputEl.placeholder = origPlaceholder;
        } else {
          const trans = translateText(origPlaceholder, targetLang);
          inputEl.placeholder = trans;
        }
      }
      return;
    }

    // Handle Element Title attribute
    if (el.title) {
      if (!originalTitleMap.has(el)) {
        originalTitleMap.set(el, el.title);
      }
      const origTitle = originalTitleMap.get(el) || el.title;
      el.title = targetLang === 'en' ? origTitle : translateText(origTitle, targetLang);
    }

    // Handle Element Aria-Label attribute
    const ariaLabel = el.getAttribute('aria-label');
    if (ariaLabel) {
      if (!originalAriaLabelMap.has(el)) {
        originalAriaLabelMap.set(el, ariaLabel);
      }
      const origAria = originalAriaLabelMap.get(el) || ariaLabel;
      el.setAttribute('aria-label', targetLang === 'en' ? origAria : translateText(origAria, targetLang));
    }
  }

  // If text node
  if (root.nodeType === Node.TEXT_NODE) {
    const text = root.nodeValue || '';
    if (!text.trim()) return;

    if (!originalTextMap.has(root)) {
      originalTextMap.set(root, text);
    }

    const englishText = originalTextMap.get(root) || text;

    if (targetLang === 'en') {
      root.nodeValue = englishText;
    } else {
      const translated = translateText(englishText, targetLang);
      if (translated !== englishText) {
        if (translated !== root.nodeValue) {
          root.nodeValue = translated;
        }
      } else {
        // Not in static dictionary or cache: check dynamic cache or queue for batch translation
        const trimmed = englishText.trim();
        if (dynamicTranslationCache[targetLang]?.[trimmed]) {
          const cached = dynamicTranslationCache[targetLang][trimmed];
          root.nodeValue = englishText.replace(trimmed, cached);
        } else {
          queueNodeForDynamicTranslation(root, englishText, targetLang);
        }
      }
    }
    return;
  }

  // Traverse children
  const children = Array.from(root.childNodes);
  for (const child of children) {
    translateDOMSubtree(child, targetLang);
  }
}

// Clear out any legacy Google Translate cookies so external translation widgets never appear
if (typeof document !== 'undefined') {
  try {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    const hostname = window.location.hostname;
    if (hostname) {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`;
    }
  } catch {
    // ignore
  }
}

let activeObserver: MutationObserver | null = null;
let isTranslating = false;

/**
 * Sets up universal observer to automatically translate all current and future DOM nodes
 */
export function setupUniversalDOMTranslator(getCurrentLang: () => string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Clean previous observer
  if (activeObserver) {
    activeObserver.disconnect();
    activeObserver = null;
  }

  const applyTranslation = () => {
    if (isTranslating) return;
    const currentLang = getCurrentLang();
    isTranslating = true;
    try {
      translateDOMSubtree(document.body, currentLang);
    } finally {
      isTranslating = false;
    }
  };

  // Immediate translation of current DOM
  applyTranslation();

  // Watch for any future pages, route switches, modals, or newly injected components
  activeObserver = new MutationObserver((mutations) => {
    if (isTranslating) return;
    const currentLang = getCurrentLang();

    let shouldTranslate = false;
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldTranslate = true;
        break;
      }
      if (mutation.type === 'characterData') {
        shouldTranslate = true;
        break;
      }
    }

    if (shouldTranslate) {
      isTranslating = true;
      try {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              translateDOMSubtree(node, currentLang);
            });
          } else if (mutation.type === 'characterData' && mutation.target) {
            translateDOMSubtree(mutation.target, currentLang);
          }
        });
      } finally {
        isTranslating = false;
      }
    }
  });

  activeObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}
