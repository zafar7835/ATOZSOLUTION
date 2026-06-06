import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Menu, X } from "lucide-react";
import CCTVLogo from "./CCTVLogo";

interface NavbarProps {
  onNavClick: (section: string) => void;
  activeSection: string;
}

export default function Navbar({
  onNavClick,
  activeSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "services", label: "Services" },
    { id: "calculator", label: "Interactive Quote" },
    { id: "brands", label: "Partners" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Form" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand Area */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavClick("hero")}
          >
            <div className="bg-red-600 p-2 rounded-lg text-white pulse-border relative flex items-center justify-center">
              <CCTVLogo className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white animate-ping" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-white" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
                A TO Z SOLUTIONS
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-800 animate-pulse">
                  ● LIVE SECURE
                </span>
              </span>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#dc2626] font-semibold -mt-1">
                Security & Surveillance
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick(item.id);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "bg-red-50 text-red-600 font-semibold"
                    : "text-slate-600 hover:text-red-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Urgent Hotline Area */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="tel:+919654901064"
              className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>Call +91 9654901064</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavClick(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-red-50 text-red-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                <a
                  href="tel:+919654901064"
                  className="w-full text-center bg-red-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-red-700 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: +91 9654901064</span>
                </a>
                <a
                  href="tel:+917533001307"
                  className="w-full text-center bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: +91 7533001307</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
