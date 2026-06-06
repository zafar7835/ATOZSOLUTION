import React from "react";
import { motion } from "motion/react";
import { ShieldAlert, Award, Compass, Heart, Phone, Mail, MapPin, CheckCircle, Clock } from "lucide-react";

export default function AboutOwner() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* visual badge or text on left */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 space-y-6">
              
              <div className="bg-red-50 text-red-700 font-bold p-3 rounded-2xl inline-block text-xs uppercase tracking-wider font-mono border border-red-150">
                ★ LEADER IN NEHRU PLACE
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                Crafted Security Excellence under Omveer Kumar
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Operating out of <b>Nehru Place</b>, Asia&apos;s primary technology and electronic retail enclave, <b>A TO Z SOLUTIONS</b> has established itself as New Delhi&apos;s premier bespoke security integrator. Guided by proprietor <b>Omveer Kumar</b>, we prioritize technical precision, genuine brand partnerships, and uncompromising post-purchase maintenance.
              </p>

              {/* Owner Direct Touch Box */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center font-bold font-display text-white">
                    OK
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Omveer Kumar</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Managing Director, Security Specialist</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
                  <a href="tel:+919654901064" className="flex items-center gap-2.5 text-slate-300 hover:text-red-400 transition-all">
                    <Phone className="w-4 h-4 text-red-500 shrink-0" />
                    <span>+91 9654901064 (Primary)</span>
                  </a>
                  <a href="tel:+917533001307" className="flex items-center gap-2.5 text-slate-300 hover:text-red-400 transition-all">
                    <Phone className="w-4 h-4 text-red-500 shrink-0" />
                    <span>+91 7533001307 (Alternate Support)</span>
                  </a>
                  <a href="mailto:atozsolutions14u@gmail.com" className="flex items-center gap-2.5 text-slate-300 hover:text-red-400 transition-all">
                    <Mail className="w-4 h-4 text-red-500 shrink-0" />
                    <span>atozsolutions14u@gmail.com</span>
                  </a>
                  <div className="flex items-start gap-2.5 text-slate-300">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">G-12 D, Ground Floor, Deepali Building-92, Nehru Place, New Delhi - 110019</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Back glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] z-0" />
          </div>

          {/* Core values cards group list on right */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-800 uppercase tracking-wider mb-2">
              Why New Delhi Businesses and Homes Choose Us?
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Direct Nehru Place Access",
                  description: "Based in G-12 D, Deepali Building. We fetch genuine components directly from authorized distributers instantly. Zero transit delay for parts.",
                  icon: <Compass className="w-5 h-5 text-red-600" />
                },
                {
                  title: "Cables Neatness Mandate",
                  description: "We hate loose hanging wires! Our site technicians use premium pipes, casings, and concealed lines. Your office wall aesthetics remain clean.",
                  icon: <Award className="w-5 h-5 text-red-600" />
                },
                {
                  title: "2-Hour Service Response",
                  description: "If your camera view drops or Biometric logs freeze, we aim to troubleshoot remotely or on-site within 2 business hours in New Delhi.",
                  icon: <Clock className="w-5 h-5 text-red-600" />
                },
                {
                  title: "Transparent GST Invoicing",
                  description: "All products are billed transparently. We declare raw material counts honestly. No shock additions on the installation day.",
                  icon: <CheckCircle className="w-5 h-5 text-red-600" />
                }
              ].map((value, vIdx) => (
                <div key={vIdx} className="bg-slate-50 border border-slate-150 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col gap-3">
                  <div className="bg-red-50 p-2.5 rounded-xl border border-red-100 w-fit">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-800 mb-1">{value.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote of proprietorship style */}
            <div className="border-l-4 border-red-600 pl-4 py-2 bg-red-50/50 rounded-r-xl">
              <p className="text-xs italic text-slate-600 leading-relaxed">
                &ldquo;A TO Z Solutions isn&apos;t just about cameras or thumb readers. It&apos;s about ensuring family peace of mind when you aren&apos;t home, and securing robust business audits when you are sleeping. We deliver our absolute best, every single time.&rdquo;
              </p>
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest font-mono block mt-1.5">— Omveer Kumar, Proprietor</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
