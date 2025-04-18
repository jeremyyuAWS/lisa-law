import { LegalAidProvider, LegalCategory } from '../types';

export const legalCategories: LegalCategory[] = [
  {
    id: '1',
    name: 'Immigration Law',
    description: 'Legal issues related to immigration, visas, asylum, and citizenship'
  },
  {
    id: '2',
    name: 'Family Law',
    description: 'Legal issues related to divorce, custody, child support, and domestic relations'
  },
  {
    id: '3',
    name: 'Housing/Tenant Rights',
    description: 'Legal issues related to housing, evictions, tenant rights, and landlord disputes'
  },
  {
    id: '4',
    name: 'Employment Law',
    description: 'Legal issues related to workplace discrimination, wrongful termination, and labor rights'
  },
  {
    id: '5',
    name: 'Criminal Defense',
    description: 'Legal issues related to criminal charges, arrests, and defense representation'
  },
  {
    id: '6',
    name: 'Civil Rights',
    description: 'Legal issues related to discrimination, constitutional rights, and civil liberties'
  },
  {
    id: '7',
    name: 'Public Benefits',
    description: 'Legal issues related to government assistance, welfare, and public benefits'
  },
  {
    id: '8',
    name: 'Legal Document Services',
    description: 'Services for document preparation, filing, and legal paperwork assistance'
  }
];

export const mockLegalAidProviders: LegalAidProvider[] = [
  {
    id: '1',
    name: 'California Immigrant Legal Assistance',
    description: 'Non-profit organization providing free legal services to immigrants in California.',
    address: '123 Legal Ave, San Francisco, CA 94110',
    phone: '(415) 555-1234',
    website: 'https://www.californiaimmigranthelporg.org',
    services: ['Asylum applications', 'DACA renewals', 'Family petitions', 'Deportation defense'],
    state: 'CA',
    categories: ['Immigration Law'],
    rating: 4.8,
    reviewCount: 342,
    languages: ['English', 'Spanish', 'Mandarin', 'Vietnamese'],
    availability: 'Same-day consultations available',
    fundingSources: ['Government grants', 'Private donations', 'Pro bono network']
  },
  {
    id: '2',
    name: 'Bay Area Legal Aid - Immigration Unit',
    description: 'Free legal services for low-income immigrants in the San Francisco Bay Area.',
    address: '456 Justice St, Oakland, CA 94612',
    phone: '(510) 555-6789',
    website: 'https://www.bayarealegalaid.org',
    services: ['Green card applications', 'Citizenship applications', 'Immigration court representation'],
    state: 'CA',
    categories: ['Immigration Law', 'Public Benefits'],
    rating: 4.5,
    reviewCount: 189,
    languages: ['English', 'Spanish', 'Cantonese'],
    availability: 'Wait time: 2-3 days',
    fundingSources: ['Legal Services Corporation', 'Bar Association', 'State funding']
  },
  {
    id: '3',
    name: 'East Bay Sanctuary Covenant',
    description: 'Non-profit supporting immigrants, refugees and marginalized communities seeking legal status.',
    address: '789 Sanctuary Rd, Berkeley, CA 94704',
    phone: '(510) 555-9876',
    website: 'https://www.eastbaysanctuary.org',
    services: ['Asylum support', 'VAWA petitions', 'U-visas', 'Community education'],
    state: 'CA',
    categories: ['Immigration Law', 'Civil Rights'],
    rating: 4.7,
    reviewCount: 215,
    languages: ['English', 'Spanish', 'Arabic', 'French'],
    availability: 'Virtual consultations available',
    fundingSources: ['Foundation grants', 'Individual donors', 'Religious organizations']
  },
  {
    id: '4',
    name: 'Texas Immigrant Rights Project',
    description: 'Free and low-cost immigration legal services across Texas.',
    address: '123 Freedom St, Houston, TX 77002',
    phone: '(713) 555-1234',
    website: 'https://www.texasimmigrantrights.org',
    services: ['Family-based petitions', 'Asylum', 'Deportation defense', 'Know your rights trainings'],
    state: 'TX',
    categories: ['Immigration Law'],
    rating: 4.9,
    reviewCount: 276,
    languages: ['English', 'Spanish', 'French'],
    availability: 'Emergency consultations available',
    fundingSources: ['IOLTA', 'Community foundation grants', 'Private donations']
  },
  {
    id: '5',
    name: 'RAICES Texas',
    description: 'Non-profit providing legal services to underserved immigrant children, families and refugees.',
    address: '456 Liberty Ave, San Antonio, TX 78205',
    phone: '(210) 555-6789',
    website: 'https://www.raicestexas.org',
    services: ['Asylum', 'Unaccompanied minors representation', 'Community outreach', 'Bond assistance'],
    state: 'TX',
    categories: ['Immigration Law', 'Civil Rights'],
    rating: 4.8,
    reviewCount: 453,
    languages: ['English', 'Spanish', 'Portuguese'],
    availability: '24/7 crisis hotline available',
    fundingSources: ['National foundations', 'Crowdfunding', 'Corporate sponsors']
  },
  {
    id: '6',
    name: 'New York Immigration Coalition',
    description: 'Advocacy organization providing legal support to immigrants throughout New York.',
    address: '123 Freedom Plaza, New York, NY 10001',
    phone: '(212) 555-1234',
    website: 'https://www.nyimmigrationcoalition.org',
    services: ['Immigration consultation', 'Referrals', 'Policy advocacy', 'Community support'],
    state: 'NY',
    categories: ['Immigration Law', 'Civil Rights'],
    rating: 4.6,
    reviewCount: 312,
    languages: ['English', 'Spanish', 'Mandarin', 'Russian', 'French', 'Bengali'],
    availability: 'Walk-ins welcome Mondays and Wednesdays',
    fundingSources: ['City funding', 'Foundation grants', 'Member organizations']
  },
  {
    id: '7',
    name: 'Florida Immigrant Justice Center',
    description: 'Non-profit legal service provider for immigrants in Florida.',
    address: '789 Justice Blvd, Miami, FL 33130',
    phone: '(305) 555-6789',
    website: 'https://www.floridaimmigrantjustice.org',
    services: ['Deportation defense', 'Asylum applications', 'TPS applications', 'Family reunification'],
    state: 'FL',
    categories: ['Immigration Law'],
    rating: 4.7,
    reviewCount: 189,
    languages: ['English', 'Spanish', 'Haitian Creole', 'Portuguese'],
    availability: 'Evening appointments available',
    fundingSources: ['Bar Foundation', 'Pro bono attorneys', 'Community partners']
  },
  {
    id: '8',
    name: 'Housing Rights Center of California',
    description: 'Non-profit dedicated to securing and promoting fair housing.',
    address: '456 Fair Housing Way, Los Angeles, CA 90017',
    phone: '(213) 555-1234',
    website: 'https://www.housingrightsca.org',
    services: ['Tenant counseling', 'Discrimination complaints', 'Eviction prevention', 'Education workshops'],
    state: 'CA',
    categories: ['Housing/Tenant Rights'],
    rating: 4.5,
    reviewCount: 231,
    languages: ['English', 'Spanish', 'Korean', 'Armenian'],
    availability: 'Same-day emergency advice for eviction notices',
    fundingSources: ['HUD grants', 'City funding', 'Legal settlements']
  },
  {
    id: '9',
    name: 'California Family Justice Center',
    description: 'Comprehensive support for families facing legal challenges.',
    address: '789 Family Court, San Diego, CA 92101',
    phone: '(619) 555-6789',
    website: 'https://www.cafamilyjustice.org',
    services: ['Divorce proceedings', 'Child custody', 'Domestic violence restraining orders', 'Child support'],
    state: 'CA',
    categories: ['Family Law'],
    rating: 4.6,
    reviewCount: 175,
    languages: ['English', 'Spanish', 'Tagalog'],
    availability: 'Drop-in hours Tuesday-Thursday',
    fundingSources: ['Victim services grants', 'County funding', 'Private foundations']
  },
  {
    id: '10',
    name: 'Arizona Immigration Law Center',
    description: 'Non-profit providing immigration legal services to low-income residents of Arizona.',
    address: '123 Desert Blvd, Phoenix, AZ 85004',
    phone: '(602) 555-1234',
    website: 'https://www.azimmigrationlaw.org',
    services: ['Asylum applications', 'Green card renewals', 'Citizenship preparation', 'DACA assistance'],
    state: 'AZ',
    categories: ['Immigration Law'],
    rating: 4.4,
    reviewCount: 142,
    languages: ['English', 'Spanish', 'Arabic'],
    availability: 'Mobile clinics in rural communities',
    fundingSources: ['IOLTA funding', 'Private donations', 'Religious organization support']
  },
  {
    id: '11',
    name: 'Border Rights Coalition',
    description: 'Advocacy and legal support for immigrants at the US-Mexico border.',
    address: '456 Border Ave, Tucson, AZ 85701',
    phone: '(520) 555-6789',
    website: 'https://www.borderrights.org',
    services: ['Asylum representation', 'Know your rights', 'Family separation cases', 'Community education'],
    state: 'AZ',
    categories: ['Immigration Law', 'Civil Rights'],
    rating: 4.9,
    reviewCount: 208,
    languages: ['English', 'Spanish', 'Indigenous languages'],
    availability: 'Emergency detention response team',
    fundingSources: ['National foundations', 'Individual donors', 'Legal networks']
  },
  {
    id: '12',
    name: 'Northwest Immigrant Rights Project',
    description: 'Legal services and advocacy for immigrants in Washington state.',
    address: '123 Rights Way, Seattle, WA 98104',
    phone: '(206) 555-1234',
    website: 'https://www.nwirp.org',
    services: ['Deportation defense', 'Asylum', 'Naturalization', 'Family visas'],
    state: 'WA',
    categories: ['Immigration Law'],
    rating: 4.8,
    reviewCount: 267,
    languages: ['English', 'Spanish', 'Somali', 'Russian', 'Vietnamese'],
    availability: 'Sliding scale fees based on income',
    fundingSources: ['Legal foundation grants', 'Private donors', 'Pro bono network']
  },
  {
    id: '13',
    name: 'Illinois Legal Aid for Immigrants',
    description: 'Comprehensive legal services for immigrants throughout Illinois.',
    address: '456 Prairie St, Chicago, IL 60607',
    phone: '(312) 555-6789',
    website: 'https://www.illinoisimmigrantaid.org',
    services: ['VAWA petitions', 'U-visas', 'T-visas', 'Asylum', 'Family petitions'],
    state: 'IL',
    categories: ['Immigration Law'],
    rating: 4.7,
    reviewCount: 193,
    languages: ['English', 'Spanish', 'Polish', 'Ukrainian', 'Arabic'],
    availability: 'Weekend appointments available',
    fundingSources: ['State legal aid funding', 'Bar foundation', 'Community partners']
  },
  {
    id: '14',
    name: 'New Jersey Tenant Rights Center',
    description: 'Legal assistance for tenants facing housing issues in New Jersey.',
    address: '789 Tenant Way, Newark, NJ 07102',
    phone: '(973) 555-1234',
    website: 'https://www.njtrc.org',
    services: ['Eviction defense', 'Housing discrimination', 'Repairs issues', 'Tenant organizations'],
    state: 'NJ',
    categories: ['Housing/Tenant Rights'],
    rating: 4.5,
    reviewCount: 167,
    languages: ['English', 'Spanish', 'Portuguese', 'Haitian Creole'],
    availability: 'Emergency same-day appointments for eviction notices',
    fundingSources: ['State housing grants', 'Legal services funding', 'Private donations']
  },
  {
    id: '15',
    name: 'Georgia Family Law Project',
    description: 'Free and low-cost family law services for Georgia residents.',
    address: '123 Family Circle, Atlanta, GA 30303',
    phone: '(404) 555-6789',
    website: 'https://www.gafamilylaw.org',
    services: ['Divorce', 'Child custody', 'Support modification', 'Paternity'],
    state: 'GA',
    categories: ['Family Law'],
    rating: 4.4,
    reviewCount: 142,
    languages: ['English', 'Spanish'],
    availability: 'Virtual consultations available',
    fundingSources: ['Legal aid funding', 'Pro bono attorneys', 'Faith-based partners']
  },
  {
    id: '16',
    name: 'Pennsylvania Workers Rights Center',
    description: 'Advocacy and legal support for employment issues in Pennsylvania.',
    address: '456 Labor Rd, Philadelphia, PA 19107',
    phone: '(215) 555-1234',
    website: 'https://www.paworkersrights.org',
    services: ['Wage theft', 'Workplace discrimination', 'Worker safety', 'Wrongful termination'],
    state: 'PA',
    categories: ['Employment Law'],
    rating: 4.6,
    reviewCount: 178,
    languages: ['English', 'Spanish', 'Chinese', 'Vietnamese'],
    availability: 'Evening clinics twice weekly',
    fundingSources: ['Labor unions', 'Foundation grants', 'Community sponsorship']
  }
];