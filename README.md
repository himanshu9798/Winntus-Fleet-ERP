# 🏗️ Winntus ScaffFlow — B2B Scaffolding & Shuttering Fleet ERP SaaS

[![Live Demo](https://img.shields.io/badge/Live_Demo-winntus--erp.netlify.app-8b5cf6?style=for-the-badge&logo=netlify&logoColor=white)](https://winntus-erp.netlify.app/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> **Enterprise-grade Heavy Construction Equipment Rental & Yard Inventory SaaS** designed for scaffolding manufacturers, depot suppliers, and infrastructure contractors across India. Grounded in real-world industrial rental agreements (Annexure-A, 9-Clause Contracts, Gate Passes, and 18% GST Invoicing).

🔗 **Live Production Application:** [https://winntus-erp.netlify.app/](https://winntus-erp.netlify.app/)

---

## 📌 Table of Contents
- [✨ Core Architecture & Highlights](#-core-architecture--highlights)
- [👥 Role-Based Portals (Admin vs Contractor)](#-role-based-portals-admin-vs-contractor)
- [🚀 Key Modules & Capabilities](#-key-modules--capabilities)
- [📑 Inbuilt 5 Official Industrial PDFs](#-inbuilt-5-official-industrial-pdfs)
- [💻 Tech Stack & Design System](#-tech-stack--design-system)
- [🛠️ Getting Started Locally](#️-getting-started-locally)
- [👨‍💻 Author & Credits](#-author--credits)

---

## ✨ Core Architecture & Highlights

Unlike generic e-commerce applications, **Winntus ScaffFlow ERP** is purpose-built for the **B2B Heavy Construction Equipment Rental & Supply Chain** ecosystem:

1. **📦 Godown Stock & Fleet Controller**: Real-time tracking of yard stock availability (Godown Stock MT/Pcs vs On-Site Rented Components).
2. **📈 Live Tariff & Rental Pricing**: Instant daily (`₹/day`) and monthly (`₹/month`) hire rate adjustments with immediate synchronization across client stores.
3. **🚛 4-Step Construction Site Logistics**: Tonnage weight calculations, truck dispatch selection (10-Wheeler / Eicher Tempo), Site Delivery Address, and Security Cheque / NEFT settlement.
4. **📄 Automated Legal & Tax Engine**: Automatic 9-Clause Rental Agreements, Gate Passes / E-Way Bills, and 18% GST Invoices with Damaged/Loss Component Penalties (Clause 7).
5. **🎨 Royal Violet Light Theme**: High-contrast, clean industrial aesthetics with glassmorphism, responsive navigation, and micro-interactions.

---

## 👥 Role-Based Portals (Admin vs Contractor)

| Feature / Action | 👑 Admin (Depot Master / Yard Owner) | 👷 Contractor (Construction Client) |
| :--- | :--- | :--- |
| **Primary Goal** | Manage inventory, set tariffs & approve dispatches | Rent materials for site & track invoices |
| **Inventory Action** | `+ / -` Live Stock Stepper & Godown Audit | View real-time availability in Yard |
| **Tariff Control** | Increase/Decrease Daily & Monthly hire rates | View live competitive hire tariffs |
| **Hire Basket / Cart** | ❌ *Disabled (Admin manages supply)* | ✅ *Select items, tonnage, truck & site* |
| **Site Logistics** | Generate Gate Pass (Annexure-A) & E-Way Bills | Enter Site Delivery Address & receive truck |
| **Tax & Invoicing** | Issue 18% GST Invoices with Damage Penalties | Download GST Invoices & Payment Receipts |

---

## 🚀 Key Modules & Capabilities

### 1. 📊 Executive Yard Dashboard & Stock Overview
- Live telemetry of total yard stock (MT), active rented fleet, and monthly billing revenue.
- Contractor account portfolios with itemized on-site components and overdue hire rents.
- Quick inline tariff updater and godown stock replenisher.

### 2. 🏗️ Contractor Equipment Hire Store
- Catalog spanning **Cuplock Standards (Verticals), Ledgers (Horizontals), CT Prop Jacks, Shuttering Steel Plates, MS Walkway Challi, Fixed Clamps & Couplers**.
- Weight tonnage estimator per unit (e.g., Prop 2x3 = 17.5 kg, Walkway = 12.5 kg).
- Live daily vs monthly rate comparison.

### 3. 🛒 4-Step B2B Checkout Drawer
1. **Basket & Tonnage**: Live weight tally (e.g., 4.2 MT) to prevent vehicle overloading.
2. **Site Delivery Address**: Specific landmark, project engineer mobile, and delivery date.
3. **Transport Vehicle**: Choose between 10-Wheeler Truck (16-20 MT) or Eicher Tempo (4-6 MT).
4. **B2B Payment Mode**: NEFT/RTGS, UPI QR Code, 30-Day Credit, or Security Cheque.

### 4. 📄 Quotation Maker & 9-Clause Agreement
- Formal quotes generated with company letterhead, client GSTIN, contact person, and duration.
- Embedded statutory 9-Clause hire conditions (Clause 1 to 9).

### 5. 📑 18% GST Billing Engine & Damage Penalty
- Itemized Monthly Hire Rent calculation + 18% GST (CGST 9% + SGST 9% / IGST 18%).
- **Clause 7 Damage / Missing Items Adjuster**: Automatically deduct damaged plates or missing clamps at standard replacement valuation.

### 6. 🚚 E-Way Bill & Gate Pass Delivery Challan
- Government E-Way bill format with Part-A & Part-B transporter vehicle entries.
- Printable delivery challans for yard security clearance.

---

## 📑 Inbuilt 5 Official Industrial PDFs

The ERP includes an integrated multi-tab PDF viewer loaded with 5 authentic industrial documents:
- 📘 `WINNTUS_ERP_User_Manual.pdf` — Complete bilingual visual handbook & guide.
- 📄 `1_Winntus_Quotation_Challan.pdf` — Official Winntus quotation and delivery format.
- 📜 `2_Winntus_Agreement_9_Clauses.pdf` — Legal 9-clause hiring terms & conditions.
- 📐 `3_Winntus_Product_Specs_Rates.pdf` — Full dimensional specifications & weight charts.
- 🧾 `4_Winntus_Tax_Invoice_Ledger.pdf` — Standard GST tax invoice and account ledger.

---

## 💻 Tech Stack & Design System

- **Frontend Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS + Custom Royal Violet & Crisp Lavender Design System
- **Icons**: Lucide React Icons
- **PDF Engine**: Native PDF viewer + jsPDF printable generator
- **State Management**: React State Hooks with Live Sync between Admin & Contractor
- **Deployment**: Netlify Continuous Delivery

---

## 🛠️ Getting Started Locally

Clone the repository and run the project locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/himanshu9798/Winntus-Fleet-ERP.git

# 2. Navigate to project directory
cd Winntus-Fleet-ERP

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
