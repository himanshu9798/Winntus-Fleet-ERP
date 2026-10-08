export const COMPANY_INFO = {
  name: "WINNTUS SCAFFOLDING & SHUTTERING",
  certification: "ISO 9001:2008 Certified Group",
  address: "Gat No. 2, Trimbakeshwar Road, Khambale, Nashik, Maharashtra - 422213",
  gstin: "27AAEFW3842N1ZN",
  stateCode: "27",
  branchHead: "Anil Dash - 8956704931",
  leadPerson: "Mangesh Valshete - 8956704924",
  email1: "anil.kumardash@winntus.com",
  email2: "marketing.nashik@winntus.com",
  emailOffice: "nashik@winntus.com",
  phone: "8956704931, 8956704913",
  website: "www.winntus.com",
  bankDetails: {
    accountNo: "039905010289",
    ifsc: "ICIC0000399",
    bankName: "ICICI Bank Ltd",
    branch: "Sec - 54, Vipul Orchid Plaza, Suncity, Gurgaon - 122003, Haryana"
  },
  lossChargeRatePerKg: 65,
  lossChargeGSTRate: 18,
};

export const INITIAL_PRODUCTS = [
  // Cuplock Standards (Vertical)
  { id: "std-05", name: "Cuplock Standard (Vertical) 0.5 Mtr", category: "Cuplock", size: "0.5 MTR", unitWeightKg: 2.2, rateDay: 0.35, rateMonth: 10.50, stockGodown: 1200, stockOnRent: 450, image: "/images/cuplock.jpg" },
  { id: "std-10", name: "Cuplock Standard (Vertical) 1.0 Mtr", category: "Cuplock", size: "1.0 MTR", unitWeightKg: 4.5, rateDay: 0.45, rateMonth: 13.50, stockGodown: 1800, stockOnRent: 900, image: "/images/cuplock.jpg" },
  { id: "std-15", name: "Cuplock Standard (Vertical) 1.5 Mtr", category: "Cuplock", size: "1.5 MTR", unitWeightKg: 6.8, rateDay: 0.68, rateMonth: 20.25, stockGodown: 2200, stockOnRent: 1100, image: "/images/cuplock.jpg" },
  { id: "std-20", name: "Cuplock Standard (Vertical) 2.0 Mtr", category: "Cuplock", size: "2.0 MTR", unitWeightKg: 9.0, rateDay: 0.90, rateMonth: 27.00, stockGodown: 3500, stockOnRent: 1850, image: "/images/cuplock.jpg" },
  { id: "std-25", name: "Cuplock Standard (Vertical) 2.5 Mtr", category: "Cuplock", size: "2.5 MTR", unitWeightKg: 11.2, rateDay: 1.13, rateMonth: 33.75, stockGodown: 1400, stockOnRent: 620, image: "/images/cuplock.jpg" },
  { id: "std-30", name: "Cuplock Standard (Vertical) 3.0 Mtr", category: "Cuplock", size: "3.0 MTR", unitWeightKg: 13.5, rateDay: 1.35, rateMonth: 40.50, stockGodown: 4000, stockOnRent: 2490, image: "/images/cuplock.jpg" },

  // Ledgers / Horizontals
  { id: "led-550", name: "Ledger / Horizontal 550mm", category: "Ledger", size: "550 MM", unitWeightKg: 2.2, rateDay: 0.35, rateMonth: 10.50, stockGodown: 3000, stockOnRent: 1250, image: "/images/ledger.jpg" },
  { id: "led-870", name: "Ledger / Horizontal 870mm", category: "Ledger", size: "870 MM", unitWeightKg: 3.2, rateDay: 0.45, rateMonth: 13.50, stockGodown: 2100, stockOnRent: 800, image: "/images/ledger.jpg" },
  { id: "led-950", name: "Ledger / Horizontal 950mm", category: "Ledger", size: "950 MM", unitWeightKg: 3.5, rateDay: 0.40, rateMonth: 12.00, stockGodown: 2800, stockOnRent: 1300, image: "/images/ledger.jpg" },
  { id: "led-1150", name: "Ledger / Horizontal 1150mm", category: "Ledger", size: "1150 MM", unitWeightKg: 4.0, rateDay: 0.48, rateMonth: 14.40, stockGodown: 5000, stockOnRent: 3622, image: "/images/ledger.jpg" },
  { id: "led-1450", name: "Ledger / Horizontal 1450mm", category: "Ledger", size: "1450 MM", unitWeightKg: 5.1, rateDay: 0.68, rateMonth: 20.25, stockGodown: 1900, stockOnRent: 750, image: "/images/ledger.jpg" },
  { id: "led-1750", name: "Ledger / Horizontal 1750mm", category: "Ledger", size: "1750 MM", unitWeightKg: 6.2, rateDay: 0.81, rateMonth: 24.30, stockGodown: 1600, stockOnRent: 400, image: "/images/ledger.jpg" },
  { id: "led-1950", name: "Ledger / Horizontal 1950mm", category: "Ledger", size: "1950 MM", unitWeightKg: 7.0, rateDay: 0.90, rateMonth: 27.00, stockGodown: 2400, stockOnRent: 950, image: "/images/ledger.jpg" },

  // Shuttering & Props
  { id: "shut-6090", name: "Shuttering Steel Plate 600*900mm", category: "Shuttering", size: "600 x 900 MM", unitWeightKg: 12.0, rateDay: 1.33, rateMonth: 40.00, stockGodown: 3200, stockOnRent: 2100, image: "/images/shuttering.jpg" },
  { id: "prop-2x2", name: "CT Prop Jack Set 2x2 Mtr", category: "Props", size: "2 x 2 MTR", unitWeightKg: 14.5, rateDay: 2.00, rateMonth: 60.00, stockGodown: 1500, stockOnRent: 650, image: "/images/shuttering.jpg" },
  { id: "prop-2x3", name: "CT Prop Jack Set 2x3 Mtr", category: "Props", size: "2 x 3 MTR", unitWeightKg: 17.5, rateDay: 2.17, rateMonth: 65.00, stockGodown: 2500, stockOnRent: 1750, image: "/images/shuttering.jpg" },
  { id: "prop-3x3", name: "CT Prop Jack Set 3x3 Mtr", category: "Props", size: "3 x 3 MTR", unitWeightKg: 20.0, rateDay: 2.33, rateMonth: 70.00, stockGodown: 1800, stockOnRent: 920, image: "/images/shuttering.jpg" },
  { id: "span-25", name: "Across Span 2.5x2.5 Mtr", category: "Shuttering", size: "2.5 x 2.5 MTR", unitWeightKg: 28.0, rateDay: 4.00, rateMonth: 120.00, stockGodown: 900, stockOnRent: 430, image: "/images/shuttering.jpg" },

  // Accessories & Clamps
  { id: "base-jack-600", name: "Base Jack 600mm (24'')", category: "Accessories", size: "600 MM", unitWeightKg: 3.8, rateDay: 0.45, rateMonth: 13.50, stockGodown: 1400, stockOnRent: 680, image: "/images/base_ujack.jpg" },
  { id: "u-jack-600", name: "U Jack / Stirrup Head 600mm", category: "Accessories", size: "600 MM", unitWeightKg: 4.0, rateDay: 0.45, rateMonth: 13.50, stockGodown: 1600, stockOnRent: 790, image: "/images/base_ujack.jpg" },
  { id: "joint-pin", name: "Joint Pin / Stubbed Pin 280mm", category: "Accessories", size: "280 MM", unitWeightKg: 0.9, rateDay: 0.23, rateMonth: 6.90, stockGodown: 6000, stockOnRent: 3100, image: "/images/base_ujack.jpg" },
  { id: "fixed-clamp", name: "Fixed Swivel Coupler / Clamp 40*40", category: "Accessories", size: "40 x 40", unitWeightKg: 0.8, rateDay: 0.33, rateMonth: 9.90, stockGodown: 8000, stockOnRent: 4200, image: "/images/clamp.jpg" },
  
  // Walkways
  { id: "walkway-6", name: "M.S Walkway Challi 6 Feet", category: "Walkway", size: "6 Feet", unitWeightKg: 12.5, rateDay: 2.00, rateMonth: 60.00, stockGodown: 750, stockOnRent: 380, image: "/images/walkway.jpg" },
  { id: "walkway-8", name: "M.S Walkway Challi 8 Feet", category: "Walkway", size: "8 Feet", unitWeightKg: 15.0, rateDay: 2.17, rateMonth: 65.00, stockGodown: 900, stockOnRent: 520, image: "/images/walkway.jpg" },
  { id: "galv-walkway", name: "Galvanized Walkway Board 1.5' x 9''", category: "Walkway", size: "1.5' x 9''", unitWeightKg: 11.0, rateDay: 1.90, rateMonth: 57.00, stockGodown: 650, stockOnRent: 310, image: "/images/walkway.jpg" },
  
  // Pipes
  { id: "ms-pipe-6m", name: "MS Pipe 6 MTR Heavy Duty", category: "Pipes", size: "6 MTR", unitWeightKg: 20.0, rateDay: 3.00, rateMonth: 90.00, stockGodown: 1800, stockOnRent: 1200, image: "/images/pipes.jpg" },
  { id: "ms-pipe-3m", name: "MS Pipe / SQ Pipe 3 MTR", category: "Pipes", size: "3 MTR", unitWeightKg: 10.0, rateDay: 1.50, rateMonth: 45.00, stockGodown: 2200, stockOnRent: 950, image: "/images/pipes.jpg" }
];

export const INITIAL_CLIENTS = [
  {
    id: "cli-01",
    companyName: "Shreeram Constructions",
    contactPerson: "Mr. Anup Roy",
    mobile: "9823456789",
    email: "anup.roy@shreeramconstructions.com",
    address: "Flat No N-1504, Parksyde Homes, Opp Rasbihari School, Panchavati Ozar, Nashik, Maharashtra 422003",
    siteLocation: "Near Jatra Hotel Shreeram Nagar, Mumbai Agra Road, Nashik 422001",
    gstin: "27AFEFS6800H1ZY",
    pan: "AFEFS6800H",
    stateCode: "27",
    activeSite: "Nashik Highway Complex Tower A & B",
    currentMonthlyRent: 81532,
    depositHeld: 62764,
    securityChequesReceived: 5,
    kycStatus: "Verified",
    kycDocs: {
      gstCert: true,
      panCard: true,
      workOrder: true,
      aadharCard: true
    },
    itemsOnSiteCount: 3260,
    totalWeightMT: 18.4
  },
  {
    id: "cli-02",
    companyName: "Kalyani Infrastructure Pvt Ltd",
    contactPerson: "Suresh Sharma",
    mobile: "9890123456",
    email: "suresh@kalyaniinfra.com",
    address: "Plot 45, MIDC Ambad, Nashik 422010",
    siteLocation: "Kalyani Metro Hub, Gangapur Road, Nashik",
    gstin: "27AAECK1234F1Z8",
    pan: "AAECK1234F",
    stateCode: "27",
    activeSite: "Commercial Plaza Project",
    currentMonthlyRent: 145000,
    depositHeld: 120000,
    securityChequesReceived: 5,
    kycStatus: "Verified",
    kycDocs: { gstCert: true, panCard: true, workOrder: true, aadharCard: true },
    itemsOnSiteCount: 5400,
    totalWeightMT: 32.5
  },
  {
    id: "cli-03",
    companyName: "Shapoorji Realcon LLP",
    contactPerson: "Rajesh Kadam",
    mobile: "9765432100",
    email: "rajesh.k@shapoorjirealcon.in",
    address: "C-12, Business Bay, Trimbak Road, Nashik",
    siteLocation: "Skyline Heights, Indira Nagar, Nashik",
    gstin: "27AABCS9876Q1Z2",
    pan: "AABCS9876Q",
    stateCode: "27",
    activeSite: "High-Rise Tower C",
    currentMonthlyRent: 210000,
    depositHeld: 180000,
    securityChequesReceived: 5,
    kycStatus: "Pending Audit",
    kycDocs: { gstCert: true, panCard: true, workOrder: false, aadharCard: true },
    itemsOnSiteCount: 7800,
    totalWeightMT: 46.2
  }
];

export const INITIAL_QUOTATIONS = [
  {
    id: "WIN/NSK/SEP/40",
    date: "24-09-2026",
    preparedBy: "SANDHYA",
    leadPerson: "MANGESH VALSHETE",
    branchHead: "ANIL DASH - 8956704931",
    client: {
      companyName: "SHREERAM CONSTRUCTION",
      contactPerson: "MR. ANUP ROY",
      mobile: "9823456789",
      siteLocation: "NASHIK ROAD",
      duration: "3 MONTH",
      gstin: "27AFEFS6800H1ZY"
    },
    items: [
      { name: "Standrad 0.5 Mtr", rateDay: 0.35, rateMonth: 10.50, quantity: 50, orderWeightKg: 110.00, rentMonth: 525 },
      { name: "Ledger 1150mm", rateDay: 0.48, rateMonth: 14.40, quantity: 250, orderWeightKg: 1000.00, rentMonth: 3600 },
      { name: "Ledger 950mm", rateDay: 0.40, rateMonth: 12.00, quantity: 300, orderWeightKg: 1050.00, rentMonth: 3600 },
      { name: "Ledger 550mm", rateDay: 0.35, rateMonth: 10.50, quantity: 250, orderWeightKg: 550.00, rentMonth: 2625 },
      { name: "Movable Clmap", rateDay: 0.33, rateMonth: 9.90, quantity: 200, orderWeightKg: 160.00, rentMonth: 1980 },
      { name: "MS Pipe 6 MTR", rateDay: 3.00, rateMonth: 90.00, quantity: 60, orderWeightKg: 1200.00, rentMonth: 5400 }
    ],
    totalQuantity: 1110,
    totalWeightKg: 4070.00,
    totalWeightMT: 4.070,
    subtotalMonthlyRent: 17730,
    monthlyRentWithGST: 20921,
    depositMobilisationAdvance: 62764,
    securityChequeValue: 325600,
    status: "Approved"
  }
];

export const INITIAL_INVOICES = [
  {
    billNo: "WSSN1303",
    date: "02/10/2026",
    periodFrom: "26/Aug/2026",
    periodTo: "25/Sept/2026",
    client: {
      name: "Shreeram Constructions",
      address: "Flat No N-1504, Parksyde Homes, Opp Rasbihari School, Panchavati Ozar, Nashik, Maharashtra, 422003",
      site: "Near Jatra Hotel Shreeram Nagar Mumbai Agra Road Nashik",
      gstin: "27AFEFS6800H1ZY",
      pan: "AFEFS6800H",
      stateCode: "27"
    },
    items: [
      {
        description: "Ledger 1150Mm",
        quantity: 1622,
        period: "26/08 - 25/09",
        days: 31,
        numberProduct: 50282,
        rate: 0.480,
        amount: 24135.36
      },
      {
        description: "Ledger 850Mm",
        quantity: 533,
        period: "26/08 - 25/09",
        days: 31,
        numberProduct: 16523,
        rate: 0.400,
        amount: 6609.20
      },
      {
        description: "Prop Set 2X3Mtr (Active Period)",
        subDetails: "250 qty (26/08 - 23/09 @ 29 days = 7250) + 23 qty left (24/09 - 25/09 @ 2 days = 46)",
        quantity: 250,
        period: "26/08 - 25/09",
        days: 31,
        numberProduct: 7296,
        rate: 2.000,
        amount: 14592.00
      },
      {
        description: "Standard 1.5Mtr",
        quantity: 164,
        period: "26/08 - 25/09",
        days: 31,
        numberProduct: 5084,
        rate: 0.600,
        amount: 3050.40
      },
      {
        description: "Standard 1Mtr",
        quantity: 200,
        period: "26/08 - 25/09",
        days: 31,
        numberProduct: 6200,
        rate: 0.400,
        amount: 2480.00
      },
      {
        description: "Standard 3Mtr",
        quantity: 490,
        period: "26/08 - 25/09",
        days: 31,
        numberProduct: 15190,
        rate: 1.200,
        amount: 18228.00
      }
    ],
    taxableTotal: 69094.96,
    cgstPct: 9,
    cgstAmount: 6218.55,
    sgstPct: 9,
    sgstAmount: 6218.55,
    roundOff: -0.06,
    grandTotal: 81532.00,
    amountInWords: "Rupees Eighty One Thousand Five Hundred Thirty Two only",
    paymentStatus: "Paid"
  }
];

export const INITIAL_DISPATCHES = [
  {
    ewayBillNo: "2622 9533 6390",
    generatedDate: "26/09/2026 11:46 AM",
    validUpto: "27/09/2026",
    mode: "Road",
    approxDistance: "23 km",
    type: "Outward - Others (SHUTTERING ON HIRE)",
    documentDetails: "Challan - IH835 - 26/09/2026",
    transactionType: "Bill To - Ship To",
    portal: "1",
    from: {
      gstin: "27AAEFW3842N1ZN",
      name: "WINNTUS SCAFFOLDING AND SHUTTERING",
      state: "MAHARASHTRA",
      dispatchFrom: "Gat No. 2, Trimbakeshwar Road, Khambale, Nashik, MAHARASHTRA-422213"
    },
    to: {
      gstin: "27AFEFS6800H1ZY",
      name: "SHREERAM CONSTRUCTIONS",
      state: "MAHARASHTRA",
      shipTo: "NEAR JATRA HOTEL SHREERAM NAGAR MUMBAI AGRA ROAD NASHIK, MAHARASHTRA-422001"
    },
    hsnCode: "730890",
    productDesc: "SCAFFOLDING AND SHUTTERING & SCAFFOLDING AND SHUTTERING",
    quantity: 1480.00,
    unit: "PCS",
    taxableAmount: 422825.00,
    taxRate: "0.000+0.000+NE+0.000+0.00",
    totalInvAmt: 422825.00,
    transporterName: "NASHIK GOODS LOGISTICS",
    transporterDocDate: "26/09/2026",
    vehicleNo: "MH15JW1118",
    vehicleFrom: "Nashik",
    vehicleEnteredDate: "26/09/2026 11:46 AM",
    status: "Delivered & Signed"
  }
];
