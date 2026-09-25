export interface ScaAgencyOffice {
  agencyName: string;
  agencyAbbr: string;
  categoryFocus: string;
  nodalAddress: string;
  districtOffice: string;
  nodalOfficerTitle: string;
  contactNumber: string;
  email: string;
  portalUrl: string;
  leadBankName: string;
  leadBankBranch: string;
  dicOfficeAddress: string;
  requiredDocuments: Array<{ name: string; description: string; mandatory: boolean }>;
}

export const SCA_STATE_DIRECTORY: Record<string, ScaAgencyOffice> = {
  'West Bengal': {
    agencyName: 'West Bengal SC, ST & OBC Development and Finance Corporation',
    agencyAbbr: 'WBSCSTDFCL / WBMDFC',
    categoryFocus: 'Scheduled Castes, Scheduled Tribes, Minorities & Backward Classes Micro-Credit',
    nodalAddress: 'CF-217/A1, Sector-I, Salt Lake City, Kolkata - 700064',
    districtOffice: 'District Manager Office, WBSCSTDFC, Administrative Building, Jalpaiguri - 735101',
    nodalOfficerTitle: 'District Manager / General Manager DIC',
    contactNumber: '+91 3561 222340 / Toll-Free 1800-345-5678',
    email: 'dm-jalpaiguri@wbscstdfc.gov.in',
    portalUrl: 'https://wbscstdfc.gov.in',
    leadBankName: 'Central Bank of India / State Bank of India',
    leadBankBranch: 'Lead District Manager (LDM) Office, DBC Road, Jalpaiguri Main Branch',
    dicOfficeAddress: 'District Industries Centre (DIC), Siliguri Road, Jalpaiguri - 735101',
    requiredDocuments: [
      { name: 'Aadhaar Card (UIDAI)', description: 'Biometrically verified identity & address proof', mandatory: true },
      { name: 'PAN Card', description: 'Mandatory for bank loan disbursement and IT compliance', mandatory: true },
      { name: '10% Margin Bank Passbook / Statement', description: 'Proof of 10% own equity contribution funds in savings bank', mandatory: true },
      { name: 'Gram Panchayat / Municipality NOC', description: 'Trade & business site permission from local local body', mandatory: true },
      { name: 'Machinery / CapEx Quotation', description: 'Proforma Invoice from GST-registered equipment supplier', mandatory: true },
      { name: 'Caste / Community Certificate', description: 'Required for concessional SCA subsidy entitlement (SC/ST/OBC/Minority)', mandatory: false },
      { name: 'Land / Workplace Title or Rent Agreement', description: 'Proof of operational premise on ₹50 stamp paper', mandatory: true },
      { name: 'Bank-Ready DPR Project Feasibility Report', description: 'Complete SWANIRVAR 40-page financial & feasibility report', mandatory: true },
    ],
  },
  'Tamil Nadu': {
    agencyName: 'Tamil Nadu Adi Dravidar Housing and Development Corporation (TAHDCO) / TABCEDCO',
    agencyAbbr: 'TAHDCO / TABCEDCO',
    categoryFocus: 'Adi Dravidar, Tribal, Backward Classes and Minority Entrepreneurs',
    nodalAddress: 'No. 31, Cenotaph Road, Teynampet, Chennai - 600018',
    districtOffice: 'District Manager Office, TAHDCO, Collectorate Complex, Madurai - 625020',
    nodalOfficerTitle: 'District Manager, TAHDCO & General Manager DIC Madurai',
    contactNumber: '+91 452 2531230 / 1800-425-4444',
    email: 'dm-madurai@tahdco.tn.gov.in',
    portalUrl: 'https://tahdco.tn.gov.in',
    leadBankName: 'Canara Bank (Lead District Bank)',
    leadBankBranch: 'Lead District Manager Office, Canara Bank Circle Office, Madurai',
    dicOfficeAddress: 'District Industries Centre, K.Pudur, Madurai - 625007',
    requiredDocuments: [
      { name: 'Aadhaar Card', description: 'Identity & residence proof', mandatory: true },
      { name: 'PAN Card', description: 'Taxpayer identifier', mandatory: true },
      { name: '10% Margin Bank Proof', description: 'Updated bank statement showing 10% capital balance', mandatory: true },
      { name: 'Panchayat Trade License', description: 'Local body operational clearance', mandatory: true },
      { name: 'Equipment Quotation with GST', description: 'Formal quote for machineries and tools', mandatory: true },
      { name: 'Community Certificate', description: 'Required for TAHDCO/TABCEDCO concessional credit', mandatory: false },
      { name: 'Bank-Ready DPR', description: 'SWANIRVAR Comprehensive Project Feasibility Study', mandatory: true },
    ],
  },
  'Maharashtra': {
    agencyName: 'Mahatma Phule Backward Class Development Corporation (MPBCDC) / MSOBCFDC',
    agencyAbbr: 'MPBCDC / MSOBCFDC',
    categoryFocus: 'Scheduled Caste, Nav-Buddha, OBC and Rural Artisans',
    nodalAddress: 'Juhu Supreme Shopping Centre, Gulmohar Cross Road, Mumbai - 400049',
    districtOffice: 'District Manager Office, MPBCDC, Administrative Complex, Nashik - 422002',
    nodalOfficerTitle: 'District Manager MPBCDC & General Manager DIC Nashik',
    contactNumber: '+91 253 2578912',
    email: 'dm-nashik@mpbcdc.gov.in',
    portalUrl: 'https://mpbcdc.maharashtra.gov.in',
    leadBankName: 'Bank of Maharashtra (Lead District Bank)',
    leadBankBranch: 'LDM Office, Bank of Maharashtra, Old Agra Road, Nashik',
    dicOfficeAddress: 'District Industries Centre, Trimbak Road, MIDC Satpur, Nashik - 422007',
    requiredDocuments: [
      { name: 'Aadhaar Card & PAN Card', description: 'Identity and KYC credentials', mandatory: true },
      { name: '10% Margin Bank Statement', description: 'Proof of borrower equity deposit', mandatory: true },
      { name: 'Gram Panchayat Domicile & NOC', description: 'Village enterprise clearance', mandatory: true },
      { name: 'Machinery Proforma Invoice', description: 'Valid GST seller quotation', mandatory: true },
      { name: 'Caste Certificate (if applicable)', description: 'Government verified community certificate', mandatory: false },
      { name: 'SWANIRVAR Bank-Ready DPR', description: 'Complete financial structuring and seasonal repayment DPR', mandatory: true },
    ],
  },
  'Bihar': {
    agencyName: 'Bihar State SC, ST & Backward Classes Finance and Development Corporation',
    agencyAbbr: 'BSBCFDC / SCSTDC',
    categoryFocus: 'Marginalized artisans, weavers, and agro-processing entrepreneurs',
    nodalAddress: 'Vikas Bhawan, Bailey Road, Patna - 800015',
    districtOffice: 'District Manager Office, Collectorate Compound, Madhubani - 847211',
    nodalOfficerTitle: 'District Welfare Officer / General Manager DIC',
    contactNumber: '+91 6276 222145',
    email: 'dwo-madhubani@bihar.gov.in',
    portalUrl: 'https://state.bihar.gov.in',
    leadBankName: 'Punjab National Bank (Lead District Bank)',
    leadBankBranch: 'LDM Office, PNB Circle Complex, Madhubani Main Branch',
    dicOfficeAddress: 'District Industries Centre, Industrial Estate, Madhubani - 847211',
    requiredDocuments: [
      { name: 'Aadhaar & PAN Card', description: 'Identity verification', mandatory: true },
      { name: 'Bank Passbook Proof (10% Margin)', description: 'Proof of margin equity in bank account', mandatory: true },
      { name: 'Gram Panchayat Business Certificate', description: 'Local enterprise verification certificate', mandatory: true },
      { name: 'Supplier Quotation', description: 'CapEx machinery invoice', mandatory: true },
      { name: 'SWANIRVAR Project Report (DPR)', description: 'Full 40-page feasibility and quarterly EMI schedule', mandatory: true },
    ],
  },
  'Karnataka': {
    agencyName: 'Dr. B.R. Ambedkar Development Corporation / KMDC',
    agencyAbbr: 'BRADC / KMDC',
    categoryFocus: 'Scheduled Castes, Scheduled Tribes & Rural Micro Enterprises',
    nodalAddress: '9th Floor, Vishveshwaraiah Main Tower, Dr. B.R. Ambedkar Veedhi, Bengaluru - 560001',
    districtOffice: 'District Manager Office, Mini Vidhana Soudha, Tumkur - 572101',
    nodalOfficerTitle: 'District Manager, BRADC Tumkur',
    contactNumber: '+91 816 2278450',
    email: 'dm-tumkur@karnataka.gov.in',
    portalUrl: 'https://adcl.karnataka.gov.in',
    leadBankName: 'Canara Bank (Lead District Bank)',
    leadBankBranch: 'LDM Office, Canara Bank Regional Office, Tumkur',
    dicOfficeAddress: 'District Industries Centre, Gandhi Nagar, Tumkur - 572102',
    requiredDocuments: [
      { name: 'Aadhaar Card & PAN Card', description: 'Primary identity & tax ID', mandatory: true },
      { name: '10% Margin Equity Deposit Proof', description: 'Active bank passbook statement', mandatory: true },
      { name: 'Gram Panchayat Trade NOC', description: 'Village administrative permission', mandatory: true },
      { name: 'Equipment Quotation', description: 'Authorized supplier bill', mandatory: true },
      { name: 'SWANIRVAR Bank-Ready DPR', description: 'Complete feasibility report', mandatory: true },
    ],
  },
  'Uttar Pradesh': {
    agencyName: 'UP Scheduled Castes Finance & Development Corporation (UPSCFDC) / UPBCFDC',
    agencyAbbr: 'UPSCFDC / UPBCFDC',
    categoryFocus: 'Scheduled Castes, Backward Classes, Weavers & Rural Artisans',
    nodalAddress: 'B-2, B-Block, PICUP Bhawan, Vibhuti Khand, Gomti Nagar, Lucknow - 226010',
    districtOffice: 'District Manager Office, Vikas Bhawan, Kachehari, Varanasi - 221002',
    nodalOfficerTitle: 'District Manager UPSCFDC & Joint Commissioner DIC Varanasi',
    contactNumber: '+91 542 2508920',
    email: 'dm-varanasi@upscfdc.gov.in',
    portalUrl: 'https://upscfdc.up.gov.in',
    leadBankName: 'Union Bank of India (Lead District Bank)',
    leadBankBranch: 'LDM Office, Union Bank Regional Office, Varanasi',
    dicOfficeAddress: 'District Industries Centre, Chandpur Industrial Estate, Varanasi - 221106',
    requiredDocuments: [
      { name: 'Aadhaar & PAN Card', description: 'Identity verification', mandatory: true },
      { name: '10% Margin Bank Statement', description: 'Proof of borrower equity deposit', mandatory: true },
      { name: 'Panchayat Enterprise NOC', description: 'Gram Pradhan / Panchayat certification', mandatory: true },
      { name: 'Machinery Proforma Invoice', description: 'Supplier estimate', mandatory: true },
      { name: 'SWANIRVAR Project Report (DPR)', description: 'Complete bank appraisal dossier', mandatory: true },
    ],
  },
};

export function getScaOfficeForState(stateName: string, districtName: string): ScaAgencyOffice {
  if (SCA_STATE_DIRECTORY[stateName]) {
    return SCA_STATE_DIRECTORY[stateName];
  }
  // Universal National / Generic State Agency Fallback
  return {
    agencyName: `State Channelizing Agency (${stateName}) & District Industries Centre`,
    agencyAbbr: 'SCA / DIC / KVIC',
    categoryFocus: 'Rural & Semi-Urban Concessional Micro-Finance and Term Loan Schemes',
    nodalAddress: `State Channelizing Agency Headquarters, Capital Complex, ${stateName}`,
    districtOffice: `District Manager Office, State Channelizing Agency / DIC, Collectorate, ${districtName}`,
    nodalOfficerTitle: `District Manager / General Manager DIC (${districtName})`,
    contactNumber: 'National SCA Helpdesk: 1800-11-2005 / Lead Bank Desk',
    email: `dic-${districtName.toLowerCase().replace(/[^a-z0-9]/g, '')}@gov.in`,
    portalUrl: 'https://nbcfdc.gov.in',
    leadBankName: 'Lead District Bank (LDM Office)',
    leadBankBranch: `Lead District Manager Office, Main District Branch, ${districtName}`,
    dicOfficeAddress: `District Industries Centre (DIC), Collectorate Road, ${districtName}`,
    requiredDocuments: [
      { name: 'Aadhaar Card (UIDAI)', description: 'Biometrically verified identity & address proof', mandatory: true },
      { name: 'PAN Card', description: 'Mandatory for institutional loan sanction', mandatory: true },
      { name: '10% Margin Bank Proof', description: 'Passbook statement showing 10% own equity funds', mandatory: true },
      { name: 'Gram Panchayat / Urban Local Body NOC', description: 'Permission from local self-government', mandatory: true },
      { name: 'Machinery / CapEx Supplier Quotation', description: 'Valid GST estimate for capital goods', mandatory: true },
      { name: 'Community / Caste Certificate (if applicable)', description: 'For Special Category concessional subsidy claims', mandatory: false },
      { name: 'SWANIRVAR 40-Page Bank-Ready DPR', description: 'Complete project feasibility and seasonal EQI schedule', mandatory: true },
    ],
  };
}
