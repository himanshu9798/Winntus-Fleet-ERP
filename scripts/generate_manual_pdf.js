import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

try {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper function to add background header
  const addHeader = (title, sub) => {
    doc.setFillColor(26, 86, 204); // #1a56cc
    doc.rect(0, 0, pageWidth, 24, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('WINNTUS SCAFFOLDING & SHUTTERING ERP', 14, 11);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 230, 0); // #ffe600
    doc.text(title.toUpperCase(), 14, 18);

    doc.setFontSize(8);
    doc.setTextColor(200, 220, 255);
    doc.text('ISO 9001:2008 Certified SaaS', pageWidth - 14, 18, { align: 'right' });

    // Header bottom line
    doc.setDrawColor(255, 230, 0);
    doc.setLineWidth(0.8);
    doc.line(0, 24, pageWidth, 24);
  };

  const addFooter = (pageNum, total) => {
    doc.setDrawColor(220, 225, 235);
    doc.setLineWidth(0.4);
    doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 130, 150);
    doc.text('WINNTUS CLOUD ERP - OFFICIAL SYSTEM MANUAL 2026', 14, pageHeight - 9);
    doc.text(`Page ${pageNum} of ${total}`, pageWidth - 14, pageHeight - 9, { align: 'right' });
  };

  // ---------------- PAGE 1: COVER & EXECUTIVE SUMMARY ----------------
  addHeader('Executive Summary & System Overview', 'Page 1');

  // Title box
  doc.setFillColor(245, 248, 255);
  doc.setDrawColor(200, 220, 250);
  doc.roundedRect(14, 30, pageWidth - 28, 38, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.text('SCAFFOLDING & SHUTTERING ENTERPRISE ERP', 20, 42);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 116, 240);
  doc.text('Commercial B2B Rental Marketplace & Depot Stock Control System', 20, 49);

  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Modeled on 4 Real Industry Documents (Quotation, 9-Clause Agreement, Specs, GST Invoices)', 20, 56);
  doc.text('Version 2.4 | Corporate Release 2026', 20, 62);

  // Section 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('1. What is this ERP Software? (सॉफ्टवेयर परिचय)', 14, 78);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const p1Text = [
    'This ERP is a dedicated cloud platform built specifically for Scaffolding & Shuttering rental businesses',
    '(such as Winntus Scaffolding Pvt Ltd and Shreeram Construction). It bridges the gap between site contractors',
    'and central stock yards with real-time tariff calculation, automated quotation generation, and warehouse control.',
    '',
    'Key Highlights:',
    '• Dual Role Access: Role-gated portal for Contractors/Buyers and Admin/Depot Managers.',
    '• Daily & Monthly Rental Engine: Real-time tariff formula (Quantity x Daily Rate x Duration).',
    '• Legal Compliance: Pre-configured 9-clause commercial contract rules and safety standards.',
    '• Instant Document Output: Auto-generated GST Quotations, Delivery Challans (Annexure-A), and Tax Invoices.'
  ];
  let yPos = 85;
  p1Text.forEach(line => {
    doc.text(line, 14, yPos);
    yPos += 5.2;
  });

  // Section 2: 3 Core Pillars Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 135, pageWidth - 28, 55, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Core Modules at a Glance:', 20, 144);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(26, 86, 204);
  doc.text('A. Contractor & Buyer Store:', 20, 153);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text('Browse 15+ heavy items, calculate live rental duration, check depot stock, and checkout.', 24, 159);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text('B. Admin & Yard Depot Master:', 20, 168);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text('Adjust live stock (+/-), dynamically edit daily rental rates (reflects instantly in store), and audit returns.', 24, 174);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(5, 150, 105);
  doc.text('C. Automated Quotation & Challan Engine:', 20, 183);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text('Generates PDF quotations with weight matrices, 18% GST calculation, and legal rental terms.', 24, 189);

  // Quick Demo Credentials Box
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(14, 200, pageWidth - 28, 26, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(146, 64, 14);
  doc.text('1-Click Demo Logins for Quick Testing:', 20, 208);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 53, 15);
  doc.text('• Admin Portal: User: admin  |  Password: admin123  (Full stock & tariff control)', 20, 215);
  doc.text('• Contractor Portal: User: contractor  |  Password: user123  (Browse store & place orders)', 20, 221);

  addFooter(1, 4);

  // ---------------- PAGE 2: CONTRACTOR / BUYER GUIDE ----------------
  doc.addPage();
  addHeader('Contractor & Buyer Step-by-Step Guide', 'Page 2');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('2. How Contractors Order & Rent Scaffolding (ऑर्डरिंग गाइड)', 14, 34);

  const steps = [
    {
      num: 'Step 1',
      title: 'Browse Available Depot Products & Check Stock',
      desc: 'Log in and view the Catalog of 15+ items (Cuplock Standards, Ledgers, Props, Base Jacks, Walkway Planks, Clamps). Each item displays live depot stock, weight in Kg, and hire rate per day.'
    },
    {
      num: 'Step 2',
      title: 'Select Rental Period & Add Items to Hire Cart',
      desc: 'Choose Hire Mode (Rent) or Direct Buy. Set the project rental duration (e.g. 15, 30, 60 days). The system computes the precise daily rent: (Quantity x Daily Rate x Days) + 20% Refundable Security Deposit.'
    },
    {
      num: 'Step 3',
      title: 'Review Cart & Generate Instant Formal Quotation',
      desc: 'Open the Hire Cart Drawer to review total tonnage/weight (MT), delivery charges, GST 18%, and total payable amount. Click "Generate Quotation" to produce a client-ready quotation matching Winntus format.'
    },
    {
      num: 'Step 4',
      title: 'Provide Site Delivery Address & Submit Order',
      desc: 'Enter Project Name, Site Location, Contact Person, and select preferred Transport Vehicle (Tata Ace Tempo, 10-Wheeler Heavy Truck). Submit order to send dispatch request to the yard depot.'
    }
  ];

  let sY = 43;
  steps.forEach((st) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, sY, pageWidth - 28, 24, 2, 2, 'FD');

    doc.setFillColor(40, 116, 240);
    doc.roundedRect(18, sY + 4, 16, 6, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(st.num, 26, sY + 8.5, { align: 'center' });

    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(st.title, 38, sY + 8.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(st.desc, pageWidth - 46);
    doc.text(splitDesc, 18, sY + 15);

    sY += 28;
  });

  // Table of Standard Rental Tariffs
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Standard Scaffolding Rates & Weight Matrix:', 14, sY + 6);

  // Table header
  sY += 11;
  doc.setFillColor(26, 86, 204);
  doc.rect(14, sY, pageWidth - 28, 7, 'F');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('Item Description', 18, sY + 5);
  doc.text('Unit Weight', 85, sY + 5);
  doc.text('Daily Hire (Rs)', 125, sY + 5);
  doc.text('Monthly Rent (Rs)', 160, sY + 5);

  const tableData = [
    ['Cuplock Standard (Vertical) 2.5m / 3.0m', '12.20 Kg', 'Rs 1.80 / day', 'Rs 54.00 / month'],
    ['Cuplock Ledger (Horizontal) 1.0m / 2.0m', '5.10 Kg', 'Rs 0.95 / day', 'Rs 28.50 / month'],
    ['Adjustable Shuttering Props (Acrow Jacks)', '18.50 Kg', 'Rs 2.50 / day', 'Rs 75.00 / month'],
    ['Adjustable Base Jack / U-Head Jack', '3.80 Kg', 'Rs 0.60 / day', 'Rs 18.00 / month'],
    ['Right Angle Couplers / Clamps', '1.15 Kg', 'Rs 0.35 / day', 'Rs 10.50 / month'],
    ['Perforated Steel Walkway Planks (Challi)', '14.50 Kg', 'Rs 4.20 / day', 'Rs 126.00 / month']
  ];

  sY += 7;
  tableData.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 255 : 245, i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 255);
    doc.rect(14, sY, pageWidth - 28, 6.5, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(14, sY + 6.5, pageWidth - 14, sY + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.text(row[0], 18, sY + 4.5);
    doc.text(row[1], 85, sY + 4.5);
    doc.text(row[2], 125, sY + 4.5);
    doc.text(row[3], 160, sY + 4.5);
    sY += 6.5;
  });

  addFooter(2, 4);

  // ---------------- PAGE 3: ADMIN & DEPOT YARD GUIDE ----------------
  doc.addPage();
  addHeader('Admin & Depot Manager Operational Guide', 'Page 3');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Admin Master Controls: Inventory & Tariff Management (एडमिन गाइड)', 14, 34);

  const adminCards = [
    {
      title: 'A. Real-Time Stock Increment / Decrement',
      desc: 'The Admin Dashboard provides instantaneous stock adjustment. Click [+] to receive new manufacturing stock or [-] to adjust for yard dispatches. Changes propagate immediately to all contractor viewports.'
    },
    {
      title: 'B. Dynamic Daily & Monthly Tariff Editor',
      desc: 'Admin can adjust the Daily Hire Rate (Rs/day) and Purchase Price for any item. When rates change, new customer quotations and cart calculations automatically use the updated price.'
    },
    {
      title: 'C. Order Approval, Delivery Challan (Annexure-A) & E-Way Bill',
      desc: 'Review incoming customer orders. Assign loading trucks, add driver phone number, generate computer weight slips, and issue Delivery Challan (Annexure-A) with itemized serial numbers.'
    },
    {
      title: 'D. Material Return Audit & Shortage/Damage Reconciliation',
      desc: 'When rental contracts conclude, verify physical returned items against original dispatch challans. The system calculates damaged/missing items and auto-deducts repair penalties from security deposit.'
    }
  ];

  let aY = 43;
  adminCards.forEach((c) => {
    doc.setFillColor(250, 250, 252);
    doc.setDrawColor(218, 225, 235);
    doc.roundedRect(14, aY, pageWidth - 28, 24, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(c.title, 20, aY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(c.desc, pageWidth - 40);
    doc.text(splitDesc, 20, aY + 13);

    aY += 28;
  });

  // 9 Legal Clauses Box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(252, 165, 165);
  doc.roundedRect(14, aY + 5, pageWidth - 28, 70, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(153, 27, 27);
  doc.text('Key Legal Clauses Integrated into the ERP (Document #2 Compliance):', 20, aY + 14);

  const clauses = [
    'Clause 1: 20% Security Deposit payable in advance prior to loading vehicle at depot yard.',
    'Clause 2: Minimum Rental Period is 30 Days. Full month rent applies even if returned earlier.',
    'Clause 3: Freight, Loading at Yard & Unloading at Site are exclusively payable by Hirer.',
    'Clause 4: Material remains sole property of Winntus / Lessor throughout the hire duration.',
    'Clause 5: Missing or Damaged items billed at replacement cost from security deposit.',
    'Clause 6: Applicable GST (18%) extra on rental tariffs and transport handling.'
  ];

  let cY = aY + 22;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(69, 10, 10);
  clauses.forEach(cl => {
    doc.text('• ' + cl, 20, cY);
    cY += 7.5;
  });

  addFooter(3, 4);

  // ---------------- PAGE 4: BREAKDOWN OF 4 ORIGINAL DOCUMENTS ----------------
  doc.addPage();
  addHeader('4 Original PDF Documents Breakdown & Verification', 'Page 4');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('4. Full Breakdown of 4 Real Documents (दस्तावेज विवरण)', 14, 34);

  const docsInfo = [
    {
      name: 'Document 1: Winntus Quotation & Delivery Challan',
      file: '1_Winntus_Quotation_Challan.pdf',
      purpose: 'Formal B2B quotation submitted to contractor before dispatch. Contains client details, project duration, itemized rate cards, and Annexure-A dispatch delivery challan.'
    },
    {
      name: 'Document 2: Commercial Rental Agreement & 9 Legal Clauses',
      file: '2_Winntus_Agreement_9_Clauses.pdf',
      purpose: 'Legal contract governing hire terms, security deposit, demurrage, damaged goods penalty, and jurisdiction in case of disputes.'
    },
    {
      name: 'Document 3: Technical Product Specifications & Rate Matrix',
      file: '3_Winntus_Product_Specs_Rates.pdf',
      purpose: 'Comprehensive catalog detailing Cuplock, Props, Spigots, Clamps, and Planks with weight matrices (Kg/Pc) and monthly rental tariffs.'
    },
    {
      name: 'Document 4: Final GST Tax Invoice & Yard Ledger Statement',
      file: '4_Winntus_Tax_Invoice_Ledger.pdf',
      purpose: 'Official monthly GST tax invoice (18% GST), freight billing, advance security adjustment, and final return reconciliation statement.'
    }
  ];

  let dY = 43;
  docsInfo.forEach((d, idx) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, dY, pageWidth - 28, 30, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(26, 86, 204);
    doc.text(d.name, 20, dY + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`File Link: /docs/${d.file}`, 20, dY + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const splitP = doc.splitTextToSize(d.purpose, pageWidth - 40);
    doc.text(splitP, 20, dY + 19);

    dY += 34;
  });

  // Official Authorization & Stamp box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.8);
  doc.roundedRect(14, dY + 8, pageWidth - 28, 40, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('WINNTUS SCAFFOLDING & SHUTTERING PVT. LTD.', 20, dY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Registered Office: Plot No. 45, Industrial Area, Phase-2, New Delhi - 110020', 20, dY + 24);
  doc.text('GSTIN: 07AAACW9281H1Z5 | Corporate Reg: U29299DL2008PTC176542', 20, dY + 29);
  doc.text('Helpline: +91 98112 34567 | Email: support@winntus.com', 20, dY + 34);

  doc.setDrawColor(148, 163, 184);
  doc.rect(pageWidth - 60, dY + 14, 42, 28);
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('[ OFFICIAL SEAL ]', pageWidth - 39, dY + 25, { align: 'center' });
  doc.text('Authorized Signatory', pageWidth - 39, dY + 37, { align: 'center' });

  addFooter(4, 4);

  // Write output to public/docs/WINNTUS_ERP_User_Manual.pdf and public/manual.pdf
  const pdfBytes = doc.output('arraybuffer');
  const buffer = Buffer.from(pdfBytes);

  fs.writeFileSync(path.resolve('public/docs/WINNTUS_ERP_User_Manual.pdf'), buffer);
  fs.writeFileSync(path.resolve('public/manual.pdf'), buffer);

  console.log('SUCCESS: Real PDF generated at public/docs/WINNTUS_ERP_User_Manual.pdf and public/manual.pdf');
} catch (err) {
  console.error('ERROR generating PDF:', err);
}
