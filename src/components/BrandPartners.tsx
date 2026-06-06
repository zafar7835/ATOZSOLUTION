import React, { useState } from "react";
import { motion } from "motion/react";
import { Shield, Hammer, HardDrive, DoorClosed, Award, CheckCircle } from "lucide-react";
import { PartnerBrand } from "../types";

export default function BrandPartners() {
  const [filter, setFilter] = useState<"all" | "cctv" | "biometric" | "hardware">("all");

  const partners = [
    { name: "CP PLUS", category: "cctv", tagline: "Smart Security Surveillance", accentColor: "border-red-500 text-red-600" },
    { name: "HIKVISION", category: "cctv", tagline: "See Far, Go Further", accentColor: "border-orange-500 text-orange-600" },
    { name: "DAHUA", category: "cctv", tagline: "Technology & AI Solutions", accentColor: "border-blue-500 text-blue-600" },
    { name: "EZVIZ", category: "cctv", tagline: "Smart Home Security Made Easy", accentColor: "border-emerald-500 text-emerald-600" },
    { name: "eSSL", category: "biometric", tagline: "Security at Fingertips", accentColor: "border-indigo-500 text-indigo-600" },
    { name: "GODREJ", category: "hardware", tagline: "Smart Locks & Security Safes", accentColor: "border-slate-500 text-slate-800" },
    { name: "PRAMA", category: "cctv", tagline: "Made for India, Made by India", accentColor: "border-cyan-500 text-cyan-600" },
    { name: "HAWK VISION", category: "cctv", tagline: "Ultimate Wide Surveillance", accentColor: "border-slate-600 text-slate-700" },
    { name: "WESTERN DIGITAL", category: "hardware", tagline: "WD Purple Surveillance Drive", accentColor: "border-violet-500 text-violet-600" },
    { name: "SECUREYE", category: "biometric", tagline: "An Eye Beyond Your Eyes", accentColor: "border-red-400 text-red-500" },
    { name: "PANASONIC", category: "hardware", tagline: "Quality Security Automation", accentColor: "border-blue-700 text-blue-800" },
    { name: "MANTRA", category: "biometric", tagline: "Innovation That Counts", accentColor: "border-sky-500 text-sky-600" },
    { name: "IMPACT", category: "hardware", tagline: "By Honeywell - Safe & Smart", accentColor: "border-yellow-600 text-yellow-700" },
    { name: "REALTIME", category: "biometric", tagline: "Power of Surveillance Logs", accentColor: "border-teal-500 text-teal-600" },
    { name: "SEAGATE", category: "hardware", tagline: "SkyHawk Surveillance Optimizer", accentColor: "border-emerald-600 text-emerald-700" },
    { name: "SPARSH", category: "cctv", tagline: "Indian CCTV Excellence", accentColor: "border-amber-600 text-amber-700" }
  ];

  const filteredPartners = filter === "all" ? partners : partners.filter(p => p.category === filter);

  return (
    <section id="brands" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-red-600 tracking-widest uppercase font-mono bg-red-50 px-3.5 py-1.5 rounded-full inline-block">
            Authorized Integration Partner
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
            16+ Leading Brands Supported Originally
          </h2>
          <p className="text-slate-600 text-sm">
            We supply, wire, integrate and configure systems from top national & multinational security manufacturers. No low-grade replicas, only 100% original systems.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: "all", label: "All Brands (16)", icon: <Award className="w-3.5 h-3.5" /> },
            { id: "cctv", label: "CCTV Camera (7)", icon: <Shield className="w-3.5 h-3.5" /> },
            { id: "biometric", label: "Biometric & Log (4)", icon: <CheckCircle className="w-3.5 h-3.5" /> },
            { id: "hardware", label: "Storage & Safe (5)", icon: <HardDrive className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                filter === tab.id
                  ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/10"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPartners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 hover:scale-[1.02] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Brand Logo Banner placeholder styled */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {partner.category}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                </div>

                <h3 className={`text-xl sm:text-2xl font-display font-black tracking-tighter ${partner.accentColor}`}>
                  {partner.name}
                </h3>
              </div>

              <div className="border-t border-slate-100 pt-3 mt-4 text-[10px] sm:text-xs text-slate-500 font-medium">
                {partner.tagline}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra brand trust block */}
        <div className="mt-14 p-6 bg-slate-900 text-slate-300 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-white font-bold text-sm">✓ Genuine Products Only</h4>
            <p className="text-xs text-slate-400">All cameras and biometric machines carry formal Indian hologram and full brand warranty.</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-x border-slate-800 md:px-6 py-4 md:py-0">
            <h4 className="text-white font-bold text-sm">✓ Original HDD Only</h4>
            <p className="text-xs text-slate-400 font-mono text-red-400">Never using refurbished desktop hard disks. We only pack WD Purple & Seagate SkyHawk drives.</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-white font-bold text-sm">✓ Software Integration</h4>
            <p className="text-xs text-slate-400">Remote viewers setups on iOS/Android and full attendance log reports configured directly on your laptops.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
