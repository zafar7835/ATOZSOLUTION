import React from "react";
import { Phone, Mail, MapPin, Heart, ChevronUp, Bell, HardDrive } from "lucide-react";
import CCTVLogo from "./CCTVLogo";

interface FooterProps {
  onNavClick: (section: string) => void;
  onAdminToggle: () => void;
}

export default function Footer({ onNavClick, onAdminToggle }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Branding and Location */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 p-2 rounded text-white pulse-border flex items-center justify-center">
                <CCTVLogo className="w-5 h-5" />
              </div>
              <span className="font-display font-medium text-lg tracking-tight text-white">
                A TO Z SOLUTIONS
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your trusted partner for specialized multi-brand CCTV cameras, biometrics access recorders, electromagnetic locks, and workspace automation based in New Delhi.
            </p>

            <div className="flex items-center gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-slate-300 font-bold uppercase tracking-wider font-mono">Service active 24/7</span>
            </div>
          </div>

          {/* Col 2: Services Quick Map */}
          <div className="space-y-3">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wide">Key Offerings</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavClick("services")} className="hover:text-red-500 transition-colors cursor-pointer text-left">
                  HD Dome & Bullet Cameras
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("services")} className="hover:text-red-500 transition-colors cursor-pointer text-left">
                  eSSL Fingerprint Access
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("services")} className="hover:text-red-500 transition-colors cursor-pointer text-left">
                  Realtime Attendance Sync
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("services")} className="hover:text-red-500 transition-colors cursor-pointer text-left">
                  Panasonic Door Intercom
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("services")} className="hover:text-red-500 transition-colors cursor-pointer text-left">
                  WD Purple Surveillance hard disk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Sitemap */}
          <div className="space-y-3">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wide">Business Sitemap</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavClick("hero")} className="hover:text-red-500 transition-colors cursor-pointer">
                  Back to Hub Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("services")} className="hover:text-red-500 transition-colors cursor-pointer">
                  Services Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("calculator")} className="hover:text-red-500 transition-colors cursor-pointer">
                  Cost Estimator Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("brands")} className="hover:text-red-500 transition-colors cursor-pointer">
                  Authorizations
                </button>
              </li>
              <li>
                <button onClick={() => onAdminToggle()} className="hover:text-red-500 font-semibold text-slate-300 transition-colors cursor-pointer">
                  Admin Inquiries portal [★]
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Rapid support details */}
          <div className="space-y-3">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wide">Physical Address</h4>
            <p className="text-xs text-slate-300 leading-snug font-medium font-mono">
              G-12 D, Ground Floor,<br />
              Deepali Building-92, Nehru Place,<br />
              New Delhi, Delhi - 110019
            </p>
            
            <div className="pt-2 space-y-1.5 text-xs">
              <a href="tel:+919654901064" className="flex items-center gap-2 hover:text-red-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>+91 9654901064</span>
              </a>
              <a href="mailto:atozsolutions14u@gmail.com" className="flex items-center gap-2 hover:text-red-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <span className="break-all">atozsolutions14u@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Separator and fine details */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
          <div className="text-center sm:text-left space-y-1 text-[11px] text-slate-500">
            <p>© 2026 A TO Z Solutions. All Rights Reserved.</p>
            <p>Designed for Omveer Kumar. Engineered with High Fidelity Component Integrity.</p>
            <p>
              CCTV Logos, Hikvision, CP Plus, Dahua, eSSL, and Seagate are the registered trademarks of their respective makers.
            </p>
          </div>

          {/* Floating actions */}
          <div className="flex gap-3">
            <button
              onClick={handleScrollToTop}
              className="p-3 rounded-xl bg-slate-800 hover:bg-red-600 text-white transition-all cursor-pointer border border-slate-700"
              title="Scroll back to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
