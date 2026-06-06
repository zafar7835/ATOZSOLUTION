import React from "react";
import { motion } from "motion/react";
import { Shield, Eye, Camera, CheckCircle, ArrowRight, MapPin, Users, Heart } from "lucide-react";

interface HeroProps {
  onNavClick: (section: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const stats = [
    { label: "Leading Brands Authorized", value: "16+", color: "text-red-500" },
    { label: "CCTV & Security Expert", value: "100%", color: "text-blue-500" },
    { label: "New Delhi Locations Served", value: "500+", color: "text-emerald-500" },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Dynamic glow backdrops */}
      <div className="absolute top-1/4 right-1/10 w-96 h-96 rounded-full bg-red-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-96 h-96 rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content Area */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-red-100"
            >
              <Shield className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>Complete Security & Biometric Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-slate-900 tracking-tight leading-none"
            >
              Secure Your Territory with <br />
              <span className="text-red-600 relative inline-block">
                A TO Z SOLUTIONS
                <span className="absolute left-0 bottom-1 w-full h-1 bg-red-500/30 rounded" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed max-w-xl"
            >
              We design, install and maintain high-fidelity CCTV camera surveillance, biometric attendance machine, access control, and complete smart home solutions in Nehru Place and across New Delhi.
            </motion.p>

            {/* Quick value props list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {[
                "HD/IP CCTV Surveillance (Hikvision & CP Plus)",
                "Biometric Attendance & Fingerprint Locks",
                "Certified High-speed Enterprise Storage (WD, Seagate)",
                "Nehru Place's Trusted Security Partner",
              ].map((prop, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{prop}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => onNavClick("calculator")}
                className="bg-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/35 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Estimate Installation Quote
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavClick("contact")}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold px-8 py-4 rounded-xl transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Book CCTV Survey
              </button>
            </motion.div>

            {/* Verification of Nehru Place location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-xs text-slate-500 font-mono"
            >
              <MapPin className="w-4 h-4 text-red-500" />
              <span>G-12 D, Ground Floor, Deepali Building-92, Nehru Place, New Delhi</span>
            </motion.div>
          </div>

          {/* High-Fidelity Hero Image Section of CCTV Camera Installation */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-full max-w-sm sm:max-w-md relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 ring-8 ring-slate-100/50 dark:ring-slate-900/40 bg-slate-100 dark:bg-slate-900 aspect-[3/4]"
            >
              {/* Premium image representing realistic installation */}
              <img
                src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&h=1000&q=80"
                alt="Expert CCTV camera installation on building exterior by A to Z Solutions"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Absolute glassmorphic overlays for professional visual rhythm */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent pointer-events-none" />

              {/* Top premium trust banner */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <div className="bg-red-600/95 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 animate-pulse" />
                  <span>On-Site Installation</span>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md text-slate-100 text-[10px] font-mono px-2.5 py-1 rounded-lg border border-slate-700/50">
                  DELHI NCR
                </div>
              </div>

              {/* Bottom interactive floating trust badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 shadow-xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-white text-xs font-bold leading-none uppercase tracking-wide">Authorized Installer</span>
                </div>
                <p className="text-slate-300 text-xs font-medium leading-relaxed">
                  Fast, neat installation of modern standard dome & bullet surveillance systems across Delhi with direct on-site calibration from <strong>Omveer Kumar</strong>.
                </p>
                <div className="flex gap-2 pt-1 border-t border-slate-800 text-[10px] text-slate-400 font-semibold font-mono">
                  <span>HIKVISION</span>
                  <span className="text-slate-600">•</span>
                  <span>CP PLUS</span>
                  <span className="text-slate-600">•</span>
                  <span>DAHUA</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Dynamic visual stats grid at bottom */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center space-x-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className={`text-3xl font-display font-extrabold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
