import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, ShieldAlert, Sparkles } from "lucide-react";
import { ContactFormInput, Inquiry } from "../types";

interface ContactFormProps {
  onContactSubmit: (inquiry: Omit<Inquiry, "id" | "date" | "status">) => void;
  preferredService: string;
}

export default function ContactForm({ onContactSubmit, preferredService }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("CCTV Camera Surveillance");
  const [message, setMessage] = useState("");

  const [isSent, setIsSent] = useState(false);
  const [errorText, setErrorText] = useState("");

  // Update chosen service if parent updates it (e.g., clicked "Request Call" in services segment!)
  useEffect(() => {
    if (preferredService) {
      setService(preferredService);
    }
  }, [preferredService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!name.trim()) {
      setErrorText("Kindly provide your Name");
      return;
    }
    
    // Strict Indian mobile phone formatting check
    const rawDigits = phone.replace(/\D/g, "");
    if (rawDigits.length < 10) {
      setErrorText("Kindly enter your valid 10-Digit Mobile / WhatsApp Number");
      return;
    }

    onContactSubmit({
      type: "contact",
      name,
      phone,
      email: email || "No Email Provided",
      contactData: {
        service,
        message: message || "Requested instant call validation for secure plan.",
      },
    });

    setIsSent(true);
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
  };

  // Preformed WhatsApp API link
  const whatsappUrl = `https://wa.me/919654901064?text=Hello%20A%20to%20Z%20Solutions,%20I%20visited%20your%20website%20and%20want%2520to%20inquire%20about%20CCTV%20/Biometric%20attendance%20installation%20in%20Delhi.%20Please%20contact%20me.`;

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-red-600 tracking-widest uppercase font-mono bg-red-50 px-3.5 py-1.5 rounded-full inline-block">
            Support Desk
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Initiate Your Security Request
          </h2>
          <p className="text-slate-600 text-sm">
            Leave a message or click to directly contact <b>Omveer Kumar</b>. We serve Nehru Place and all parts of NCR with high-priority service calls.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact Details & Map Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-display font-bold text-lg text-slate-900">Direct Contact Details</h3>
              <p className="text-xs text-slate-500">Call, email, or visit our office at Nehru Place directly. We respond instantly during business hours.</p>

              <div className="space-y-4">
                
                {/* 1. Phone number 1 */}
                <a
                  href="tel:+919654901064"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-300 transition-all cursor-pointer group"
                >
                  <div className="bg-red-50 p-2.5 rounded-xl group-hover:bg-red-100 transition-colors">
                    <Phone className="w-5 h-5 text-red-600 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">OMVEER KUMAR (PROPRIETOR)</span>
                    <span className="text-sm font-bold text-slate-800">+91 9654901064</span>
                  </div>
                </a>

                {/* 2. Phone number 2 */}
                <a
                  href="tel:+917533001307"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-300 transition-all cursor-pointer group"
                >
                  <div className="bg-red-50 p-2.5 rounded-xl group-hover:bg-red-100 transition-colors">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">SUPPORT / ALTERNATIVE</span>
                    <span className="text-sm font-bold text-slate-800">+91 7533001307</span>
                  </div>
                </a>

                {/* 3. Email */}
                <a
                  href="mailto:atozsolutions14u@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-300 transition-all cursor-pointer group"
                >
                  <div className="bg-red-50 p-2.5 rounded-xl group-hover:bg-red-100 transition-colors">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">EMAIL ADDRESS</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 break-all">atozsolutions14u@gmail.com</span>
                  </div>
                </a>

                {/* 4. Address */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="bg-red-50 p-2.5 rounded-xl">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">OFFICE LOCATION</span>
                    <p className="text-xs font-semibold text-slate-700 leading-snug">
                      G-12 D, Ground Floor, Deepali Building-92, Nehru Place, New Delhi, India -110019
                    </p>
                  </div>
                </div>

              </div>

              {/* Instant WhatsApp Quick Link */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/10"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.184-4.839l.341.202c1.611.954 3.473 1.458 5.378 1.459 5.617 0 10.188-4.57 10.191-10.188.002-2.722-1.056-5.28-2.977-7.202C17.262 1.51 14.71 1.453 12.012 1.453c-5.623 0-10.194 4.571-10.197 10.19-.001 1.848.48 3.655 1.393 5.253l.223.39L2.45 21.571l4.135-.86c1.558.849 3.29 1.297 5.056 1.298zM18.06 14.88c-.33-.165-1.956-.966-2.259-1.077-.302-.11-.522-.165-.742.165-.219.329-.851 1.077-1.042 1.298-.192.22-.384.248-.713.082-.33-.165-1.394-.514-2.656-1.64-1.011-.902-1.694-2.016-1.892-2.346-.198-.33-.021-.508.143-.672.148-.148.33-.385.495-.578.165-.192.219-.329.329-.55.11-.22.055-.412-.028-.577-.082-.165-.741-1.787-1.015-2.447-.267-.643-.539-.556-.741-.567-.192-.01-.412-.011-.631-.011-.22 0-.577.082-.88.412-.302.33-1.154 1.127-1.154 2.747 0 1.62 1.181 3.187 1.346 3.407.165.22 2.325 3.551 5.626 4.978.786.34 1.4.542 1.879.694.79.25 1.509.215 2.079.13.635-.096 1.956-.8 2.233-1.573.277-.773.277-1.436.192-1.574-.082-.137-.302-.22-.631-.385z" />
                  </svg>
                  Chat with Omveer on WhatsApp
                </a>
              </div>

            </div>

            {/* Quick trust tag */}
            <div className="bg-slate-900 text-slate-400 p-5 rounded-3xl border border-slate-800 text-xs flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
              <span>
                Your privacy is safe with us. Contact details are stored securely in local state logs and used only for direct pricing.
              </span>
            </div>

          </div>

          {/* Core Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!isSent ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="pb-2">
                    <h3 className="font-display font-extrabold text-lg text-slate-900">Message Transmission Portal</h3>
                    <p className="text-xs text-slate-500">Provide details and we'll calculate customized solutions.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 block">Your Full Name*</label>
                      <input
                        type="text"
                        placeholder="Omveer Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-red-500 focus:outline-none transition-all text-slate-850"
                        required
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 block">10-Digit Mobile / WhatsApp*</label>
                      <input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-red-500 focus:outline-none transition-all text-slate-850"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 block">Email Address (Optional)</label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-red-500 focus:outline-none transition-all text-slate-850"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 block">Service of Interest</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-red-500 focus:outline-none transition-all text-slate-850 cursor-pointer"
                      >
                        <option value="CCTV Camera Surveillance">CCTV Camera Installation</option>
                        <option value="Biometric Attendance Machine">Biometric Attendance Machine</option>
                        <option value="EM Access Lock Smart System">EM Smart Door Lock</option>
                        <option value="Smart Video Door Phone">Video Door Intercom</option>
                        <option value="Server Storage Hardware AMC">System AMC / Diagnostic Repair</option>
                        <option value="Free On-Site Security Survey">Free On-site Space Survey</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Briefly Describe Your Requirements</label>
                    <textarea
                      rows={4}
                      placeholder="Enter details like building type, number of doors, or CCTV camera count..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-red-500 focus:outline-none transition-all text-slate-850"
                    />
                  </div>

                  {errorText && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorText}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-slate-900 text-white font-bold py-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-600/10"
                  >
                    <Send className="w-4 h-4" />
                    Transmit Security Booking
                  </button>

                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center p-8 space-y-6"
                >
                  <div className="inline-flex p-4 rounded-full bg-red-50 text-red-600 border border-red-100">
                    <CheckCircle className="w-12 h-12 text-red-600 animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-xl text-slate-900">Inquiry Received!</h3>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                      Thank you for submitting your security request. Operator <b>Omveer Kumar</b> has registered details in local system records.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 inline-flex items-center gap-2 text-xs font-semibold text-slate-700 font-mono">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>Response window: Within 2 Hours (Delhi)</span>
                  </div>

                  <div>
                    <button
                      onClick={() => setIsSent(false)}
                      className="text-xs bg-slate-800 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-900 transition-all cursor-pointer"
                    >
                      Transmit Another Form Enquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
