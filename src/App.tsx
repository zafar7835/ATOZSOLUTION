import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, CheckCircle, Bell, VolumeX, X, MessageSquare, ShieldCheck, Heart } from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import QuoteCalculator from "./components/QuoteCalculator";
import BrandPartners from "./components/BrandPartners";
import AboutOwner from "./components/AboutOwner";
import ContactForm from "./components/ContactForm";
import InquiryDashboard from "./components/InquiryDashboard";
import Footer from "./components/Footer";

import { Inquiry } from "./types";

const DEMO_INQUIRIES: Inquiry[] = [
  {
    id: "demo-1",
    type: "quote",
    name: "Rajesh Kumar (M/s Delhi Garments)",
    phone: "+91 9811029302",
    email: "rajesh@delhigarments.in",
    date: new Date(Date.now() - 4 * 3600000).toISOString(), // 4 hours ago
    status: "new",
    notes: "Requested weekend installation. Inquiring for standard retail shop in Malviya Nagar.",
    quoteData: {
      camerasCount: 8,
      cameraType: "dome",
      resolution: "5mp",
      storage: "2tb",
      biometricNeeded: true,
      accessControlNeeded: true,
      installationType: "commercial",
      estimatedPriceMin: 34500,
      estimatedPriceMax: 38200,
    },
  },
  {
    id: "demo-2",
    type: "contact",
    name: "Sonia Aggarwal",
    phone: "+91 9540201041",
    email: "sonia.agg.90@gmail.com",
    date: new Date(Date.now() - 26 * 3600000).toISOString(), // 26 hours ago
    status: "contacted",
    notes: "Discussed over phone. Survey scheduled this Saturday at 11 AM.",
    contactData: {
      service: "Free On-Site Security Survey",
      message: "Need secure high-definition surveillance cameras installed inside my double storey house in Jasola Vihar. Currently facing blindspots near front gate. Call me.",
    },
  },
  {
    id: "demo-3",
    type: "contact",
    name: "Dr. Amit Sharma",
    phone: "+91 9999015243",
    email: "amit.sharma@aimtech.com",
    date: new Date(Date.now() - 48 * 3600000).toISOString(), // 2 days ago
    status: "completed",
    notes: "Face-reader biometric portal installed successfully. Access lock synchronized. Client satisfied.",
    contactData: {
      service: "Biometric Attendance Machine",
      message: "Need 45 fingerprint biometric login records mapped in our backend office at Nehru Place.",
    },
  },
];

export default function App() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeSection, setActiveSection] = useState("hero");
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [preferredService, setPreferredService] = useState("CCTV Camera Surveillance");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Initialize and load list of inquiries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("atoz_leads");
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved leads", e);
        // Fallback to demo
        setInquiries(DEMO_INQUIRIES);
        localStorage.setItem("atoz_leads", JSON.stringify(DEMO_INQUIRIES));
      }
    } else {
      setInquiries(DEMO_INQUIRIES);
      localStorage.setItem("atoz_leads", JSON.stringify(DEMO_INQUIRIES));
    }
  }, []);

  // Update localStorage when inquiries state changes
  const saveInquiries = (updatedList: Inquiry[]) => {
    setInquiries(updatedList);
    localStorage.setItem("atoz_leads", JSON.stringify(updatedList));
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setShowAdminPortal(false); // Close Admin Panel if normal section clicked

    const target = document.getElementById(sectionId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleServiceSelect = (serviceName: string) => {
    setPreferredService(serviceName);
    handleScrollToSection("contact");
    showToast(`Pre-filled "${serviceName}" in Contact Form!`, "info");
  };

  const handleAdminToggle = () => {
    setShowAdminPortal((prev) => !prev);
    if (!showAdminPortal) {
      showToast("Accessing Administrator Customer Portal", "info");
      // Scroll to admin portal slightly delayed
      setTimeout(() => {
        const target = document.getElementById("admin-portal");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleAddInquiry = (inqData: Omit<Inquiry, "id" | "date" | "status">) => {
    const newInq: Inquiry = {
      ...inqData,
      id: "inq-" + Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: "new",
      notes: "Auto-logged from website portal.",
    };

    const updated = [newInq, ...inquiries];
    saveInquiries(updated);

    showToast(
      `Form Transmitted! Thank you ${inqData.name}. Omveer Kumar will call you shortly!`,
      "success"
    );
  };

  const handleUpdateStatus = (id: string, status: "new" | "contacted" | "completed") => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    saveInquiries(updated);
    showToast(`Lead status updated to ${status.toUpperCase()}`, "info");
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, notes } : inq));
    saveInquiries(updated);
    showToast("Notes saved successfully", "info");
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this inquiry record?")) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      saveInquiries(updated);
      showToast("Inquiry deleted from records", "info");
    }
  };

  const handleResetDemoInquiries = () => {
    if (window.confirm("Restore sample inquiries for demonstration purposes? This will merge them with existing records.")) {
      // Clear duplicate IDs
      const filteredExisting = inquiries.filter((i) => !i.id.startsWith("demo-"));
      const restored = [...DEMO_INQUIRIES, ...filteredExisting];
      saveInquiries(restored);
      showToast("Demonstration leads successfully reset!", "success");
    }
  };

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
  };

  // Auto clear toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Dynamic Toast Feedback Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border w-[90%] max-w-md ${
              toast.type === "success"
                ? "bg-emerald-950 border-emerald-500/30 text-emerald-300"
                : "bg-slate-900 border-slate-700 text-slate-200"
            }`}
          >
            {toast.type === "success" ? (
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <Bell className="w-5 h-5 text-red-500 shrink-0 animate-bounce" />
            )}
            
            <p className="text-xs font-semibold leading-relaxed flex-1">
              {toast.message}
            </p>

            <button
              onClick={() => setToast(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation section */}
      <Navbar
        onNavClick={handleScrollToSection}
        activeSection={activeSection}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        
        {/* If Admin Portal Toggle is strictly enabled, present it prominently at the top */}
        <AnimatePresence mode="wait">
          {showAdminPortal ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <InquiryDashboard
                inquiries={inquiries}
                onUpdateStatus={handleUpdateStatus}
                onUpdateNotes={handleUpdateNotes}
                onDeleteInquiry={handleDeleteInquiry}
                onResetInquiries={handleResetDemoInquiries}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Regular Landing Sections */}
        <Hero onNavClick={handleScrollToSection} />
        
        <Services onServiceSelect={handleServiceSelect} />
        
        <QuoteCalculator
          onQuoteSubmit={handleAddInquiry}
          preselectedService={preferredService}
        />
        
        <BrandPartners />
        
        <AboutOwner />
        
        <ContactForm
          onContactSubmit={handleAddInquiry}
          preferredService={preferredService}
        />

      </main>

      {/* Footer copyright */}
      <Footer onNavClick={handleScrollToSection} onAdminToggle={handleAdminToggle} />

      {/* Floating WhatsApp contact button to improve lead conversion */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <motion.a
          href="https://wa.me/919654901064?text=Hello%20A%20to%20Z%20Solutions,%20I%20visited%20your%20website%20and%20want%20to%20inquire%20about%20your%20CCTV%20surveillance%20and%20Biometric%20attendance%20installation%20systems%20in%20Delhi.%20Please%20contact%20me."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-colors pulse-border-green cursor-pointer"
          title="Direct WhatsApp with Omveer Kumar"
          id="whatsapp-floating-btn"
        >
          {/* Badge Alert Notification Dot */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black font-mono animate-bounce text-white">
            1
          </span>

          {/* Elegant Tooltip Popover */}
          <span className="absolute right-full mr-4 bg-slate-900 border border-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 pointer-events-none shadow-xl flex items-center gap-1.5 translate-x-3 group-hover:translate-x-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Chat with Omveer Kumar (Live)
          </span>

          {/* Clean high fidelity WhatsApp vector paths */}
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.184-4.839l.341.202c1.611.954 3.473 1.458 5.378 1.459 5.617 0 10.188-4.57 10.191-10.188.002-2.722-1.056-5.28-2.977-7.202C17.262 1.51 14.71 1.453 12.012 1.453c-5.623 0-10.194 4.571-10.197 10.19-.001 1.848.48 3.655 1.393 5.253l.223.39L2.45 21.571l4.135-.86c1.558.849 3.29 1.297 5.056 1.298zM18.06 14.88c-.33-.165-1.956-.966-2.259-1.077-.302-.11-.522-.165-.742.165-.219.329-.851 1.077-1.042 1.298-.192.22-.384.248-.713.082-.33-.165-1.394-.514-2.656-1.64-1.011-.902-1.694-2.016-1.892-2.346-.198-.33-.021-.508.143-.672.148-.148.33-.385.495-.578.165-.192.219-.329.329-.55.11-.22.055-.412-.028-.577-.082-.165-.741-1.787-1.015-2.447-.267-.643-.539-.556-.741-.567-.192-.01-.412-.011-.631-.011-.22 0-.577.082-.88.412-.302.33-1.154 1.127-1.154 2.747 0 1.62 1.181 3.187 1.346 3.407.165.22 2.325 3.551 5.626 4.978.786.34 1.4.542 1.879.694.79.25 1.509.215 2.079.13.635-.096 1.956-.8 2.233-1.573.277-.773.277-1.436.192-1.574-.082-.137-.302-.22-.631-.385z" />
          </svg>
        </motion.a>
      </div>

    </div>
  );
}
