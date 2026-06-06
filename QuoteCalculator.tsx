import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Sparkles, AlertCircle, ShoppingBag, Send, Phone, ClipboardCheck } from "lucide-react";
import { QuoteCalculation, Inquiry } from "../types";

interface QuoteCalculatorProps {
  onQuoteSubmit: (inquiry: Omit<Inquiry, "id" | "date" | "status">) => void;
  preselectedService?: string;
}

export default function QuoteCalculator({ onQuoteSubmit, preselectedService }: QuoteCalculatorProps) {
  // Config state
  const [camerasCount, setCamerasCount] = useState<number>(4);
  const [cameraType, setCameraType] = useState<string>("mixed"); // dome, bullet, mixed
  const [resolution, setResolution] = useState<string>("5mp"); // 2mp, 5mp, 8mp
  const [storage, setStorage] = useState<string>("1tb"); // 500gb, 1tb, 2tb, 4tb
  const [biometricNeeded, setBiometricNeeded] = useState<boolean>(false);
  const [accessControlNeeded, setAccessControlNeeded] = useState<boolean>(false);
  const [installationType, setInstallationType] = useState<string>("commercial"); // residential, commercial, industrial

  // Lead Info State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  // Results
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const calculateEstimate = () => {
    let basePrice = 0;
    
    // Cameras cost based on type and resolution
    let perCameraCost = 1500; // default for 2mp dome
    
    if (resolution === "5mp") {
      perCameraCost = 2400;
    } else if (resolution === "8mp") {
      perCameraCost = 4200;
    }

    if (cameraType === "bullet") {
      perCameraCost += 400; // Bullet is weather proof
    } else if (cameraType === "mixed") {
      perCameraCost += 200;
    }

    basePrice += camerasCount * perCameraCost;

    // DVR / NVR Recorders
    let dvrCost = 3000;
    if (camerasCount > 4) dvrCost = 5500;
    if (camerasCount > 8) dvrCost = 9500;
    basePrice += dvrCost;

    // Storage cost (Surveillance WD / Seagate Skyhawk)
    if (storage === "500gb") basePrice += 2600;
    if (storage === "1tb") basePrice += 3800;
    if (storage === "2tb") basePrice += 5400;
    if (storage === "4tb") basePrice += 8900;

    // Biometric machine
    if (biometricNeeded) {
      basePrice += 6500; // intermediate eSSL with attendance package
    }

    // EM Lock & Access controls
    if (accessControlNeeded) {
      basePrice += 4200; // heavy lock with push triggers & power
    }

    // Cabling & Power supplies accessories flat estimate
    const accessoriesAndInstall = (camerasCount * 850) + 1800;
    basePrice += accessoriesAndInstall;

    // Adjust markup based on installation complexity
    if (installationType === "industrial") {
      basePrice *= 1.15; // standard factory cabling index
    } else if (installationType === "commercial") {
      basePrice *= 1.05;
    }

    // Output range
    const minimum = Math.round(basePrice * 0.95);
    const maximum = Math.round(basePrice * 1.08);
    setMinPrice(minimum);
    setMaxPrice(maximum);
  };

  useEffect(() => {
    calculateEstimate();
  }, [camerasCount, cameraType, resolution, storage, biometricNeeded, accessControlNeeded, installationType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name");
      return;
    }
    if (!phone.replace(/\D/g, "") || phone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit Indian phone number");
      return;
    }

    const calcDetails: QuoteCalculation = {
      camerasCount,
      cameraType,
      resolution,
      storage,
      biometricNeeded,
      accessControlNeeded,
      installationType,
      estimatedPriceMin: minPrice,
      estimatedPriceMax: maxPrice,
    };

    onQuoteSubmit({
      type: "quote",
      name,
      phone,
      email: email || "No Email Provided",
      quoteData: calcDetails,
    });

    setIsSubmitted(true);
    // Reset lead info
    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <section id="calculator" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative cyber grid backdrop */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs bg-red-600/20 text-red-400 font-bold px-3.5 py-1.5 rounded-full border border-red-500/30 uppercase tracking-widest font-mono inline-block">
            Smart Configurator
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Calculate Your Security System Quote
          </h2>
          <p className="text-slate-400 text-sm">
            Configure CCTV cameras, high write hard drives, and biometrics. Get instant estimates based on current Nehru Place market rates (₹).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Configurator Controls Area */}
          <div className="lg:col-span-8 bg-slate-800/80 border border-slate-750 p-6 sm:p-8 rounded-3xl space-y-6">
            
            {/* 1. Camera Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold tracking-wide text-slate-300">
                  1. Number of Security Cameras
                </label>
                <span className="text-lg font-bold text-red-500 font-mono">
                  {camerasCount} {camerasCount === 1 ? "Camera" : "Cameras"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                step="1"
                value={camerasCount}
                onChange={(e) => setCamerasCount(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer h-2 bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>0 (Only custom locks)</span>
                <span>4 (Standard Shop/Home)</span>
                <span>8 (Medium Office)</span>
                <span>16 (Big Warehouse)</span>
                <span>32 (Factory/Mall)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              
              {/* 2. Camera Type Choice */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Camera Body Style
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: "dome", label: "Dome (Indoor)" },
                    { value: "bullet", label: "Bullet (Outdoor)" },
                    { value: "mixed", label: "Both / Mixed" },
                  ].map((style) => (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => setCameraType(style.value)}
                      className={`p-3 text-left rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        cameraType === style.value
                          ? "bg-red-600/10 border-red-500 text-red-400 font-bold"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Resolution Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Lense Resolution Quality
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: "2mp", label: "2 Megapixel (Full HD)" },
                    { value: "5mp", label: "5 Megapixel (UHD Plus)" },
                    { value: "8mp", label: "8 Megapixel (4K Pro)" },
                  ].map((res) => (
                    <button
                      key={res.value}
                      type="button"
                      onClick={() => setResolution(res.value)}
                      className={`p-3 text-left rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        resolution === res.value
                          ? "bg-red-600/10 border-red-500 text-red-400 font-bold"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {res.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Storage Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Surveillance HDD Storage
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: "500gb", label: "500 GB (Short)" },
                    { value: "1tb", label: "1 TB Drive (Recommended)" },
                    { value: "2tb", label: "2 TB HD Drive" },
                    { value: "4tb", label: "4 TB Pro Storage" },
                  ].map((stg) => (
                    <button
                      key={stg.value}
                      type="button"
                      onClick={() => setStorage(stg.value)}
                      className={`p-3 text-left rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        storage === stg.value
                          ? "bg-red-600/10 border-red-500 text-red-400 font-bold"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {stg.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* 5. Biometrics & Access Toggles */}
            <div className="bg-slate-900 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 border border-slate-750">
              <div className="flex justify-between items-center p-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Biometric Attendance Portal</h4>
                  <p className="text-[10px] text-slate-500">Includes eSSL/Realtime scanner + software sync</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBiometricNeeded(!biometricNeeded)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                    biometricNeeded ? "bg-red-600" : "bg-slate-700"
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-250 ease-in-out ${
                    biometricNeeded ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
              </div>

              <div className="flex justify-between items-center p-2 border-t sm:border-t-0 sm:border-l border-slate-800">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Electromagnetic (EM) Door Lock</h4>
                  <p className="text-[10px] text-slate-500">Heavy magnetic brackets with exit buttons</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAccessControlNeeded(!accessControlNeeded)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                    accessControlNeeded ? "bg-red-600" : "bg-slate-700"
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-250 ease-in-out ${
                    accessControlNeeded ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
              </div>
            </div>

            {/* 6. Installation Location Area */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Installation Environment Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "residential", label: "Residential (Home/Villa)" },
                  { value: "commercial", label: "Commercial (Office/Store)" },
                  { value: "industrial", label: "Industrial (Factory/Cell)" },
                ].map((inst) => (
                  <button
                    key={inst.value}
                    type="button"
                    onClick={() => setInstallationType(inst.value)}
                    className={`p-3 text-center rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      installationType === inst.value
                        ? "bg-red-600 text-white border-red-500 font-bold"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {inst.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing Result & Contact Lead generation form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-red-600/30 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
              
              {/* Heading */}
              <div className="text-center pb-5 border-b border-slate-800">
                <div className="inline-flex p-3 rounded-2xl bg-red-600/20 text-red-500 mb-3 border border-red-500/20">
                  <Calculator className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-display font-bold text-lg">Instant Estimated Price</h3>
                <p className="text-[11px] text-slate-400">Estimated cost range for complete hardware, cabling and installation</p>
              </div>

              {/* Numbers */}
              <div className="text-center py-6">
                <span className="text-sm font-mono text-slate-400 font-medium">ESTIMATED TOTAL BUDGET</span>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-red-500 tracking-tight mt-1 leading-none font-mono">
                  ₹{minPrice.toLocaleString("en-IN")} - ₹{maxPrice.toLocaleString("en-IN")}*
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-mono leading-relaxed">
                  *GST and long distance cable extensions extra. Includes 1 Year service warranty.
                </p>
              </div>

              {/* Configured parameters breakdown list */}
              <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Camera System:</span>
                  <span className="font-medium text-slate-200">{camerasCount}x ({resolution.toUpperCase()})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">HDD Storage:</span>
                  <span className="font-medium text-slate-200">{storage.toUpperCase()} Drive</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Biometrics Reader:</span>
                  <span className="font-medium text-slate-200">{biometricNeeded ? "Added" : "None"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">EM Guard Lock:</span>
                  <span className="font-medium text-slate-200">{accessControlNeeded ? "Added" : "None"}</span>
                </div>
              </div>

              {/* Form Submission state */}
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block font-mono">
                      ✉ Book this Estimate
                    </span>
                    
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs px-4 py-3 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none transition-all"
                        required
                      />

                      <input
                        type="tel"
                        placeholder="10-Digit Phone (WhatsApp)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs px-4 py-3 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none transition-all"
                        required
                      />

                      <input
                        type="email"
                        placeholder="Your Email (Optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs px-4 py-3 rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none transition-all"
                      />
                    </div>

                    {errorMessage && (
                      <div className="flex items-center gap-1.5 text-[11px] text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-900/30">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/10"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit to Omveer Kumar
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 p-5 rounded-2xl text-center space-y-4"
                  >
                    <ClipboardCheck className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                    <div>
                      <h4 className="font-bold text-sm">Quote Saved Successfully!</h4>
                      <p className="text-xs text-emerald-400/80 mt-1">
                        Your custom calculation code has been saved. Omveer Kumar will contact you shortly on <b>{phone}</b>.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[10px] font-bold text-white bg-emerald-600/40 hover:bg-emerald-600 px-4 py-2 rounded-lg transition-all"
                    >
                      Configure New Quote
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Quick trust bullet */}
            <div className="bg-slate-800 p-4 rounded-2xl text-xs text-slate-400 border border-slate-750 flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>
                Our prices include deployment matching of original high density wires, clips, connectors, and full system configuration on your mobiles.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
