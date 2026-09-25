export interface GramPanchayatInfo {
  name: string;
  pinCode: string;
  population: number;
  femaleRatio: number; // per 1000 males
  literacyRate: number; // %
  scStPercentage: number; // %
  mainOccupation: string;
  lat: number;
  lng: number;
  distanceToBlockKm: number;
}

export interface BlockInfo {
  name: string;
  headquarters: string;
  gramPanchayats: GramPanchayatInfo[];
}

export interface DistrictInfo {
  name: string;
  code: string;
  blocks: BlockInfo[];
}

export interface StateHierarchyInfo {
  name: string;
  code: string;
  districts: DistrictInfo[];
}

export const LGD_INDIAN_HIERARCHY: StateHierarchyInfo[] = [
  {
    name: 'West Bengal',
    code: 'WB',
    districts: [
      {
        name: 'Jalpaiguri',
        code: 'WB-JPG',
        blocks: [
          {
            name: 'Dhupguri Block',
            headquarters: 'Dhupguri',
            gramPanchayats: [
              {
                name: 'Gairkata Gram Panchayat',
                pinCode: '735212',
                population: 34280,
                femaleRatio: 968,
                literacyRate: 74.2,
                scStPercentage: 48.6,
                mainOccupation: 'Smallholder Tea Growing & Agrarian Processing',
                lat: 26.5894,
                lng: 89.0070,
                distanceToBlockKm: 8.5,
              },
              {
                name: 'Banarhat Gram Panchayat',
                pinCode: '735202',
                population: 29450,
                femaleRatio: 972,
                literacyRate: 71.8,
                scStPercentage: 54.2,
                mainOccupation: 'Tea Plantation & Forest Agro-Produce',
                lat: 26.7972,
                lng: 89.0345,
                distanceToBlockKm: 14.2,
              },
              {
                name: 'Binnaguri Gram Panchayat',
                pinCode: '735203',
                population: 31200,
                femaleRatio: 955,
                literacyRate: 76.5,
                scStPercentage: 42.1,
                mainOccupation: 'Cantonment Agro-Supply, Dairy & Trade',
                lat: 26.7460,
                lng: 89.0558,
                distanceToBlockKm: 11.0,
              },
              {
                name: 'Magurmari-I Gram Panchayat',
                pinCode: '735210',
                population: 24800,
                femaleRatio: 960,
                literacyRate: 69.4,
                scStPercentage: 58.0,
                mainOccupation: 'Jute, Mustard Oil & Paddy Farming',
                lat: 26.6200,
                lng: 88.9800,
                distanceToBlockKm: 6.0,
              },
            ],
          },
          {
            name: 'Malbazar Block',
            headquarters: 'Mal',
            gramPanchayats: [
              {
                name: 'Odlabari Gram Panchayat',
                pinCode: '735222',
                population: 27800,
                femaleRatio: 962,
                literacyRate: 75.1,
                scStPercentage: 46.3,
                mainOccupation: 'Eco-Tourism Crafts & CTC Blending',
                lat: 26.8500,
                lng: 88.6200,
                distanceToBlockKm: 9.2,
              },
              {
                name: 'Damdim Gram Panchayat',
                pinCode: '735209',
                population: 21600,
                femaleRatio: 958,
                literacyRate: 72.0,
                scStPercentage: 51.5,
                mainOccupation: 'Sericulture & Handloom Weaving',
                lat: 26.8800,
                lng: 88.7000,
                distanceToBlockKm: 7.8,
              },
            ],
          },
          {
            name: 'Maynaguri Block',
            headquarters: 'Maynaguri',
            gramPanchayats: [
              {
                name: 'Domohani-I Gram Panchayat',
                pinCode: '735305',
                population: 26400,
                femaleRatio: 950,
                literacyRate: 78.4,
                scStPercentage: 44.0,
                mainOccupation: 'Cold-Pressed Mustard Oil & Vegetables',
                lat: 26.5600,
                lng: 88.7700,
                distanceToBlockKm: 5.4,
              },
              {
                name: 'Khagrabari-I Gram Panchayat',
                pinCode: '735224',
                population: 22900,
                femaleRatio: 954,
                literacyRate: 73.6,
                scStPercentage: 50.8,
                mainOccupation: 'Bamboo Crafts & Riverbed Agro-Products',
                lat: 26.5300,
                lng: 88.8200,
                distanceToBlockKm: 8.1,
              },
            ],
          },
        ],
      },
      {
        name: 'Bankura',
        code: 'WB-BNK',
        blocks: [
          {
            name: 'Bishnupur Block',
            headquarters: 'Bishnupur',
            gramPanchayats: [
              {
                name: 'Joypur Gram Panchayat',
                pinCode: '722138',
                population: 28500,
                femaleRatio: 965,
                literacyRate: 72.8,
                scStPercentage: 38.5,
                mainOccupation: 'Terracotta Pottery & Baluchari Silk Weaving',
                lat: 23.0500,
                lng: 87.4500,
                distanceToBlockKm: 7.2,
              },
              {
                name: 'Radhanagar Gram Panchayat',
                pinCode: '722157',
                population: 23100,
                femaleRatio: 958,
                literacyRate: 70.4,
                scStPercentage: 42.1,
                mainOccupation: 'Brass & Bell Metal Utensils (Dokra)',
                lat: 23.1100,
                lng: 87.3800,
                distanceToBlockKm: 11.5,
              },
            ],
          },
        ],
      },
      {
        name: 'Purulia',
        code: 'WB-PUR',
        blocks: [
          {
            name: 'Baghmundi Block',
            headquarters: 'Baghmundi',
            gramPanchayats: [
              {
                name: 'Charida Gram Panchayat',
                pinCode: '723152',
                population: 19800,
                femaleRatio: 970,
                literacyRate: 64.5,
                scStPercentage: 62.4,
                mainOccupation: 'Chhau Mask Crafting & Lac Cultivation',
                lat: 23.2000,
                lng: 86.0500,
                distanceToBlockKm: 6.4,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    districts: [
      {
        name: 'Madurai',
        code: 'TN-MDU',
        blocks: [
          {
            name: 'Madurai East Block',
            headquarters: 'Othakadai',
            gramPanchayats: [
              {
                name: 'Othakadai Gram Panchayat',
                pinCode: '625107',
                population: 36500,
                femaleRatio: 988,
                literacyRate: 82.4,
                scStPercentage: 31.2,
                mainOccupation: 'Jasmine Flower Processing & Handloom Cotton',
                lat: 9.9600,
                lng: 78.1800,
                distanceToBlockKm: 0.0,
              },
              {
                name: 'Thiruppalai Gram Panchayat',
                pinCode: '625014',
                population: 29800,
                femaleRatio: 982,
                literacyRate: 85.1,
                scStPercentage: 26.4,
                mainOccupation: 'Sungudi Saree Dyeing & Agro Food Units',
                lat: 9.9750,
                lng: 78.1350,
                distanceToBlockKm: 5.2,
              },
            ],
          },
        ],
      },
      {
        name: 'Thanjavur',
        code: 'TN-TNJ',
        blocks: [
          {
            name: 'Thanjavur Block',
            headquarters: 'Thanjavur',
            gramPanchayats: [
              {
                name: 'Vallam Gram Panchayat',
                pinCode: '613403',
                population: 32400,
                femaleRatio: 994,
                literacyRate: 86.2,
                scStPercentage: 24.8,
                mainOccupation: 'Tanjore Gold Foil Painting & Bronze Casting',
                lat: 10.7200,
                lng: 79.0500,
                distanceToBlockKm: 9.0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    districts: [
      {
        name: 'Nashik',
        code: 'MH-NSK',
        blocks: [
          {
            name: 'Niphad Block',
            headquarters: 'Niphad',
            gramPanchayats: [
              {
                name: 'Pimpalgaon Baswant Gram Panchayat',
                pinCode: '422209',
                population: 41200,
                femaleRatio: 948,
                literacyRate: 81.6,
                scStPercentage: 29.5,
                mainOccupation: 'Grape Raisin Processing, Onion Storage & Tomato Trading',
                lat: 20.1700,
                lng: 73.9800,
                distanceToBlockKm: 12.0,
              },
              {
                name: 'Lasalgaon Gram Panchayat',
                pinCode: '422306',
                population: 38900,
                femaleRatio: 942,
                literacyRate: 83.0,
                scStPercentage: 27.1,
                mainOccupation: 'Asia’s Largest Onion Mandi Trade & Cold Storage',
                lat: 20.1400,
                lng: 74.2300,
                distanceToBlockKm: 18.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Bihar',
    code: 'BR',
    districts: [
      {
        name: 'Madhubani',
        code: 'BR-MDB',
        blocks: [
          {
            name: 'Rajnagar Block',
            headquarters: 'Rajnagar',
            gramPanchayats: [
              {
                name: 'Ranti Gram Panchayat',
                pinCode: '847235',
                population: 31500,
                femaleRatio: 938,
                literacyRate: 66.8,
                scStPercentage: 35.4,
                mainOccupation: 'Mithila / Madhubani Painting & Makhana Roasting',
                lat: 26.3900,
                lng: 86.1300,
                distanceToBlockKm: 4.8,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Karnataka',
    code: 'KA',
    districts: [
      {
        name: 'Tumkur',
        code: 'KA-TMK',
        blocks: [
          {
            name: 'Tiptur Block',
            headquarters: 'Tiptur',
            gramPanchayats: [
              {
                name: 'Honnavalli Gram Panchayat',
                pinCode: '572217',
                population: 26800,
                femaleRatio: 978,
                literacyRate: 79.5,
                scStPercentage: 28.2,
                mainOccupation: 'Copra / Coconut Desiccated Powder & Millets',
                lat: 13.3400,
                lng: 76.5400,
                distanceToBlockKm: 14.0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    districts: [
      {
        name: 'Varanasi',
        code: 'UP-VNS',
        blocks: [
          {
            name: 'Sevapuri Block',
            headquarters: 'Sevapuri',
            gramPanchayats: [
              {
                name: 'Kallipur Gram Panchayat',
                pinCode: '221403',
                population: 25400,
                femaleRatio: 932,
                literacyRate: 74.0,
                scStPercentage: 39.1,
                mainOccupation: 'Banarasi Silk Weaving & Wooden Toy Crafting',
                lat: 25.2900,
                lng: 82.8500,
                distanceToBlockKm: 3.5,
              },
            ],
          },
        ],
      },
    ],
  },
];
