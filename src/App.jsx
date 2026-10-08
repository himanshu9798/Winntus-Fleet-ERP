import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AmazonFlipkartStore from './components/AmazonFlipkartStore';
import HireCartDrawer from './components/HireCartDrawer';
import AdminDashboard from './components/AdminDashboard';
import QuotationGenerator from './components/QuotationGenerator';
import InvoiceBillingEngine from './components/InvoiceBillingEngine';
import EWayBillManager from './components/EWayBillManager';
import InventoryManager from './components/InventoryManager';
import KYCManager from './components/KYCManager';
import ClientPortal from './components/ClientPortal';
import PublicStorefront from './components/PublicStorefront';
import PrintModal from './components/PrintModal';
import LoginPage from './components/LoginPage';
import UserManualModal from './components/UserManualModal';
import Footer from './components/Footer';

import { 
  INITIAL_PRODUCTS, 
  INITIAL_CLIENTS, 
  INITIAL_QUOTATIONS, 
  INITIAL_INVOICES, 
  INITIAL_DISPATCHES 
} from './data/mockData';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isManualOpen, setIsManualOpen] = useState(false);
  
  // Authenticated User State
  const [currentUser, setCurrentUser] = useState({
    role: 'admin', // 'admin' or 'user'
    name: 'Anil Dash (Branch Head)',
    company: 'WINNTUS SCAFFOLDING & SHUTTERING',
    gstin: '27AAEFW3842N1ZN'
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Filters & Search State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Cart / Hire Basket State (Only used by Contractor User)
  const [cartItems, setCartItems] = useState([
    { id: "std-05", name: "Cuplock Standard (Vertical) 0.5 Mtr", category: "Cuplock", size: "0.5 MTR", unitWeightKg: 2.2, rateDay: 0.35, rateMonth: 10.50, quantity: 50, image: "/images/cuplock.jpg" },
    { id: "led-1150", name: "Ledger / Horizontal 1150mm", category: "Ledger", size: "1150 MM", unitWeightKg: 4.0, rateDay: 0.48, rateMonth: 14.40, quantity: 250, image: "/images/ledger.jpg" },
    { id: "led-950", name: "Ledger / Horizontal 950mm", category: "Ledger", size: "950 MM", unitWeightKg: 3.5, rateDay: 0.40, rateMonth: 12.00, quantity: 300, image: "/images/ledger.jpg" },
    { id: "shut-6090", name: "Shuttering Steel Plate 600*900mm", category: "Shuttering", size: "600 x 900 MM", unitWeightKg: 12.0, rateDay: 1.33, rateMonth: 40.00, quantity: 150, image: "/images/shuttering.jpg" },
    { id: "prop-2x3", name: "CT Prop Jack Set 2x3 Mtr", category: "Props", size: "2 x 3 MTR", unitWeightKg: 17.5, rateDay: 2.17, rateMonth: 65.00, quantity: 100, image: "/images/shuttering.jpg" },
    { id: "fixed-clamp", name: "Fixed Swivel Coupler / Clamp 40*40", category: "Accessories", size: "40 x 40", unitWeightKg: 0.8, rateDay: 0.33, rateMonth: 9.90, quantity: 200, image: "/images/clamp.jpg" },
    { id: "walkway-6", name: "M.S Walkway Challi 6 Feet", category: "Walkway", size: "6 Feet", unitWeightKg: 12.5, rateDay: 2.00, rateMonth: 60.00, quantity: 50, image: "/images/walkway.jpg" }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Core Data Stores
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [quotations, setQuotations] = useState(INITIAL_QUOTATIONS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [dispatches, setDispatches] = useState(INITIAL_DISPATCHES);

  // Print & PDF Modal State
  const [printModal, setPrintModal] = useState({
    isOpen: false,
    docType: 'quotation',
    data: null
  });

  const handleOpenPrint = (docType, data) => {
    setPrintModal({
      isOpen: true,
      docType,
      data
    });
  };

  const handleClosePrint = () => {
    setPrintModal(prev => ({ ...prev, isOpen: false }));
  };

  // Cart Operations
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 50 } : item);
      }
      return [...prev, { ...product, quantity: 100 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (itemId, newQty) => {
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleProceedToQuotation = (quoteData) => {
    const newQuote = {
      id: `WIN/NSK/OCT/${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
      preparedBy: "SANDHYA",
      leadPerson: "MANGESH VALSHETE",
      branchHead: "ANIL DASH - 8956704931",
      client: {
        companyName: currentUser.company.toUpperCase(),
        contactPerson: currentUser.name.toUpperCase(),
        mobile: "9823456789",
        siteLocation: "NASHIK ROAD",
        duration: "3 MONTH",
        gstin: currentUser.gstin
      },
      ...quoteData,
      status: "Approved"
    };

    setQuotations([newQuote, ...quotations]);
    setActiveTab('quotations');
  };

  const handleProceedToDispatch = (dispatchData) => {
    const newDispatch = {
      ewayBillNo: `2622 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      generatedDate: new Date().toLocaleString(),
      validUpto: 'Tomorrow',
      mode: 'Road',
      approxDistance: '23 km',
      type: 'Outward - Others (SHUTTERING ON HIRE)',
      documentDetails: `Challan - IH${Math.floor(100 + Math.random() * 900)} - Today`,
      transactionType: 'Bill To - Ship To',
      portal: '1',
      from: {
        gstin: "27AAEFW3842N1ZN",
        name: "WINNTUS SCAFFOLDING AND SHUTTERING",
        state: "MAHARASHTRA",
        dispatchFrom: "Gat No. 2, Trimbakeshwar Road, Khambale, Nashik"
      },
      to: {
        gstin: currentUser.gstin,
        name: currentUser.company.toUpperCase(),
        state: "MAHARASHTRA",
        shipTo: "NEAR JATRA HOTEL SHREERAM NAGAR MUMBAI AGRA ROAD NASHIK"
      },
      hsnCode: "730890",
      productDesc: "SCAFFOLDING AND SHUTTERING & SCAFFOLDING AND SHUTTERING",
      quantity: dispatchData.quantity,
      unit: "PCS",
      taxableAmount: dispatchData.taxableAmount,
      taxRate: "0.000+0.000+NE+0.000+0.00",
      totalInvAmt: dispatchData.taxableAmount,
      transporterName: "NASHIK GOODS LOGISTICS",
      transporterDocDate: "Today",
      vehicleNo: "MH15JW1118",
      vehicleFrom: "Nashik",
      vehicleEnteredDate: "Today",
      status: "Delivered & Signed"
    };

    setDispatches([newDispatch, ...dispatches]);
    setActiveTab('eway-bills');
  };

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    setIsAuthenticated(true);
    if (userObj.role === 'admin') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('marketplace');
    }
  };

  // If user opens the website, ask for Login first (Admin or User)
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage 
          isOpen={true} 
          isModal={false} 
          onLoginSuccess={handleLoginSuccess}
          onOpenManual={() => setIsManualOpen(true)}
        />
        <UserManualModal 
          isOpen={isManualOpen}
          onClose={() => setIsManualOpen(false)}
          onOpenPrint={handleOpenPrint}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900 flex flex-col font-sans selection:bg-purple-500 selection:text-white w-full">
      {/* Full-width Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={() => setIsAuthenticated(false)}
        onOpenManual={() => setIsManualOpen(true)}
        cartItemsCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Main Content Area - Full Screen Width with mobile bottom nav spacing */}
      <main className="flex-1 w-full max-w-full px-2 sm:px-6 lg:px-8 py-3 sm:py-4 pb-20 md:pb-6 overflow-x-hidden">
        {activeTab === 'marketplace' && (
          <AmazonFlipkartStore
            products={products}
            currentUser={currentUser}
            onUpdateProducts={setProducts}
            onAddToCart={handleAddToCart}
            onQuickQuote={(product) => {
              handleAddToCart(product);
            }}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
          />
        )}

        {activeTab === 'dashboard' && (
          <AdminDashboard 
            products={products}
            onUpdateProducts={setProducts}
            clients={clients}
            invoices={invoices}
            quotations={quotations}
            dispatches={dispatches}
            onNavigate={(tab) => setActiveTab(tab)} 
            onOpenPrint={handleOpenPrint} 
          />
        )}

        {activeTab === 'quotations' && (
          <QuotationGenerator
            quotations={quotations}
            onSaveQuotation={(q) => setQuotations([q, ...quotations])}
            onOpenPrint={handleOpenPrint}
          />
        )}

        {activeTab === 'invoices' && (
          <InvoiceBillingEngine
            invoices={invoices}
            onSaveInvoice={(inv) => setInvoices([inv, ...invoices])}
            onOpenPrint={handleOpenPrint}
          />
        )}

        {activeTab === 'eway-bills' && (
          <EWayBillManager
            dispatches={dispatches}
            onSaveDispatch={(d) => setDispatches([d, ...dispatches])}
            onOpenPrint={handleOpenPrint}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryManager
            products={products}
            onUpdateProducts={setProducts}
          />
        )}

        {activeTab === 'clients' && (
          <KYCManager
            clients={clients}
            onUpdateClients={setClients}
          />
        )}

        {activeTab === 'client-portal' && (
          <ClientPortal
            onOpenPrint={handleOpenPrint}
          />
        )}

        {activeTab === 'storefront' && (
          <PublicStorefront
            onNavigateToApp={(tab) => {
              setCurrentUser({
                role: 'admin',
                name: 'Anil Dash (Branch Head)',
                company: 'WINNTUS SCAFFOLDING & SHUTTERING',
                gstin: '27AAEFW3842N1ZN'
              });
              setActiveTab(tab);
            }}
          />
        )}
      </main>

      {/* Full-width Flipkart/Amazon B2B Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} onOpenManual={() => setIsManualOpen(true)} />

      {/* Hire Basket Cart Drawer */}
      <HireCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToQuotation={handleProceedToQuotation}
        onProceedToDispatch={handleProceedToDispatch}
      />

      {/* Role-Based Login Modal */}
      <LoginPage
        isOpen={isLoginOpen}
        isModal={true}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenManual={() => setIsManualOpen(true)}
      />

      {/* Universal Print & PDF Export Modal */}
      <PrintModal
        isOpen={printModal.isOpen}
        onClose={handleClosePrint}
        docType={printModal.docType}
        data={printModal.data}
      />

      {/* User Manual & Software Guide Modal */}
      <UserManualModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
        onOpenPrint={handleOpenPrint}
      />
    </div>
  );
}
