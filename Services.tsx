import React from "react";
import { motion } from "motion/react";
import { Camera, Users, ShieldAlert, Cpu, HardDrive, DoorOpen, BadgePercent, ArrowUpRight } from "lucide-react";
import { ServiceItem } from "../types";

interface ServicesProps {
  onServiceSelect: (serviceName: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const services: ServiceItem[] = [
    {
      id: "cctv",
      title: "HD & IP CCTV Camera Installation",
      description: "Complete design and deployment of Dome, Bullet, PTZ and modular network IP cameras. Set up remote online watch pipelines.",
      icon: "Camera",
      badge: "Best Seller",
      details: [
        "High definition Dome / Bullet cameras",
        "PTZ (Pan-Tilt-Zoom) advanced cameras",
        "Mobile App configuration for 24/7 remote watch",
        "Brands: CP Plus, Hikvision, Dahua, Ezviz, Prama, Sparsh",
      ],
      features: ["Full Color Night Vision", "AI Human Detection", "Weatherproof IP67 Rating"],
    },
    {
      id: "biometric",
      title: "Biometric Attendance & Access Control",
      description: "Manage workforce entry and security with finger, card, or facial scanning authentication machines.",
      icon: "Users",
      badge: "Industry Standard",
      details: [
        "Optical fingerprint and cards recognition machine",
        "AI multi-spectrum face recognition panel",
        "Automatic payroll & log software integration",
        "Brands: eSSL, Mantra, Realtime, Secureye",
      ],
      features: ["Instant Log Analytics", "0.2 Second ID Match", "Anti-Passback System"],
    },
    {
      id: "access-locks",
      title: "Security EM Locks & Smart Hardware",
      description: "Grade-A electromagnetic locks for glass gates, wooden partitions, and security fire doors.",
      icon: "DoorOpen",
      details: [
        "600 lbs Heavy Duty EM locks",
        "Glass door U-brackets and glass clips installation",
        "Integration with fingerprint / swipe readers",
        "Manual override emergency power release triggers",
      ],
      features: ["Strong Holding Force", "Low Power Draw", "Integration Safe"],
    },
    {
      id: "storage",
      title: "Surveillance Storage & Hard Drives",
      description: "High-integrity write-intensive hard drives and solid slate memories to prevent frames drops.",
      icon: "HardDrive",
      details: [
        "24/7 write-configured surveillance storage drives",
        "Capacities from 1TB, 2TB up to 12TB",
        "Brands: Western Digital (Purple Drives) & Seagate (Skyhawk)",
        "Premium storage enclosures with continuous power",
      ],
      features: ["AllFrame Technology", "Rescue Data Recovery Ready", "High Write Workload Rate"],
    },
    {
      id: "automation",
      title: "Smart Intercom & Video Door Phone",
      description: "Two-way sound intercom and high-resolution video panels for houses, villas, and reception screens.",
      icon: "Cpu",
      details: [
        "Multi-apartment intercom distribution hubs",
        "Wireless video door bells to mobile apps",
        "Brands: Panasonic, Godrej, Impact (by Honeywell)",
        "Secure sound/video filter for family protection",
      ],
      features: ["Two-Way Communication", "Tamper Sensor Alarms", "In-built Picture Memory"],
    },
    {
      id: "maintenance",
      title: "System AMC & Diagnostic Repair",
      description: "Professional Annual Maintenance Contracts (AMC) and emergency breakdown checkups in Nehru Place.",
      icon: "ShieldAlert",
      details: [
        "Quarterly physical camera cleaning and refocusing",
        "Hard drive status diagnostics and backup checks",
        "Fast response on wire cuts / video loss checks",
        "Flexible hourly callouts and customized AMC packages",
      ],
      features: ["Super Fast On-site Service", "Original Brand Spares", "Backup Standby Equipment"],
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Camera":
        return <Camera className="w-6 h-6 text-red-600" />;
      case "Users":
        return <Users className="w-6 h-6 text-red-600" />;
      case "DoorOpen":
        return <DoorOpen className="w-6 h-6 text-red-600" />;
      case "HardDrive":
        return <HardDrive className="w-6 h-6 text-red-600" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-red-600" />;
      default:
        return <ShieldAlert className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section with badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-red-600 tracking-widest uppercase font-mono bg-red-50 px-3.5 py-1.5 rounded-full inline-block">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
            High Grade Security & Automation Services
          </h2>
          <p className="text-slate-600 text-base">
            From single-door systems to complex enterprise surveillance grids, we install original branded systems in Nehru Place and New Delhi. See our key offerings:
          </p>
        </div>

        {/* Services Bento-Style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, index) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 border border-slate-150 rounded-3xl p-6 hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* top area */}
                <div className="flex justify-between items-start mb-5">
                  <div className="bg-red-50 p-3.5 rounded-2xl border border-red-100">
                    {getIcon(srv.icon)}
                  </div>
                  {srv.badge && (
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-1 rounded-full uppercase tracking-wider font-mono">
                      {srv.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-display font-bold text-slate-800 mb-2">
                  {srv.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {srv.description}
                </p>

                {/* bullets list */}
                <ul className="space-y-1.5 mb-6">
                  {srv.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-xs text-slate-500 flex items-start gap-1.5">
                      <span className="text-red-500 mt-1 font-bold shrink-0">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* bottom chips and direct CTA */}
              <div className="border-t border-slate-200/60 pt-4 mt-auto">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {srv.features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="text-[9px] font-semibold text-slate-600 bg-slate-200/50 px-2.5 py-0.5 rounded-full"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onServiceSelect(srv.title)}
                  className="w-full bg-slate-800 hover:bg-red-600 text-white font-bold p-3.5 rounded-xl transition-all duration-300 text-xs flex items-center justify-center gap-1.5 cursor-pointer group"
                >
                  Request Call for {srv.title.split(" ")[0]}
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* bottom helper container */}
        <div className="mt-16 bg-red-50 border border-red-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
              <BadgePercent className="w-5 h-5 text-red-600" />
              Special Offer: Free On-Site Security Survey
            </h4>
            <p className="text-sm text-slate-600">
              For commercial buildings and factories in New Delhi, our engineer will inspect layouts completely free.
            </p>
          </div>
          <button
            onClick={() => onServiceSelect("Free On-Site Security Survey")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-xs shrink-0 cursor-pointer"
          >
            Claim Free Survey
          </button>
        </div>

      </div>
    </section>
  );
}
