import React, { useState } from "react";
import { motion } from "motion/react";
import { Phone, CheckCircle, Clock, Trash2, Mail, ExternalLink, Download, UserCheck, AlertCircle, FileSpreadsheet, RefreshCw } from "lucide-react";
import { Inquiry } from "../types";

interface InquiryDashboardProps {
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, status: "new" | "contacted" | "completed") => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onDeleteInquiry: (id: string) => void;
  onResetInquiries: () => void;
}

export default function InquiryDashboard({
  inquiries,
  onUpdateStatus,
  onUpdateNotes,
  onDeleteInquiry,
  onResetInquiries,
}: InquiryDashboardProps) {
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "completed">("all");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesTempText, setNotesTempText] = useState("");

  const filteredInquiries = inquiries.filter((inq) => {
    if (filter === "all") return true;
    return inq.status === filter;
  });

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inquiries, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `AtoZ_Inquiries_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusBadge = (status: "new" | "contacted" | "completed") => {
    switch (status) {
      case "new":
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-[10px] font-bold rounded-full animate-pulse border border-red-200">● NEW INQUIRY</span>;
      case "contacted":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full border border-blue-200">☎ CONTACTED</span>;
      default:
        return <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">✔ COMPLETED</span>;
    }
  };

  return (
    <section id="admin-portal" className="py-24 bg-slate-950 text-white min-h-screen border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-800 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest">Administrative Panel</span>
            </div>
            <h2 className="text-3xl font-display font-extrabold text-white tracking-tight">
              A to Z Solutions Customer Lead Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              An offline records storage manager using secure local cookies. Omveer Kumar can track quotations, click-to-dial clients on mobile, and write operational notes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={exportToJson}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export Records (JSON)
            </button>
            <button
              onClick={onResetInquiries}
              className="bg-red-950/40 hover:bg-red-900/40 text-red-400 text-xs font-bold px-4 py-2.5 rounded-xl border border-red-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Restores the sample demonstration inquiries for testing"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Leads
            </button>
          </div>
        </div>

        {/* Filters and Counters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-6">
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: "all", label: `All Systems (${inquiries.length})` },
              { id: "new", label: `Pending New (${inquiries.filter((i) => i.status === "new").length})` },
              { id: "contacted", label: `Contacted (${inquiries.filter((i) => i.status === "contacted").length})` },
              { id: "completed", label: `Closed Projects (${inquiries.filter((i) => i.status === "completed").length})` },
            ].map((bt) => (
              <button
                key={bt.id}
                onClick={() => setFilter(bt.id as any)}
                className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                  filter === bt.id
                    ? "bg-red-600 text-white"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {bt.label}
              </button>
            ))}
          </div>
          
          <div className="text-[11px] font-mono text-slate-400">
            Session storage capacity: <span className="text-emerald-400 font-bold">100% stable</span>
          </div>
        </div>

        {/* Inquiries list */}
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800 space-y-4">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto" />
            <div>
              <h3 className="font-bold text-lg text-slate-300">No Inquiries Found</h3>
              <p className="text-xs text-slate-500 mt-1">There are no client inquiries matching the selected filter status in local records.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredInquiries.map((inq) => {
              const formattedDate = new Date(inq.date).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              // Raw whatsapp chat link
              const clientWaLink = `https://wa.me/${inq.phone.replace(/\D/g, "")}`;

              return (
                <div key={inq.id} className="bg-slate-900 rounded-2.5xl border border-slate-800 p-5 sm:p-6 space-y-4 relative overflow-hidden">
                  
                  {/* Top Bar inside card */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 border-b border-slate-800/80 pb-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display font-black text-lg text-white">{inq.name}</h3>
                        <span className={`text-[10px] font-mono leading-none py-1 px-2.5 rounded font-bold uppercase ${
                          inq.type === "quote"
                            ? "bg-slate-800 text-slate-300 border border-slate-700"
                            : "bg-red-950/40 text-red-400 border border-red-900/30"
                        }`}>
                          {inq.type === "quote" ? "📋 Price Calc Config" : "✉ Feedback Form"}
                        </span>
                        {getStatusBadge(inq.status)}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-xs font-mono font-normal">
                        <span>Submitted: <b>{formattedDate}</b></span>
                        {inq.email && inq.email !== "No Email Provided" && (
                          <a href={`mailto:${inq.email}`} className="text-slate-300 hover:text-red-400 underline flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {inq.email}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 self-stretch sm:self-center">
                      <a
                        href={`tel:${inq.phone}`}
                        className="flex-1 sm:flex-none text-center bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                        title="Click to dial on phone/mobile"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                        Dial {inq.phone}
                      </a>
                      
                      <a
                        href={clientWaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-900/30 text-emerald-400 hover:bg-emerald-800 hover:text-white transition-all"
                        title="Message instantly on WhatsApp"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => onDeleteInquiry(inq.id)}
                        className="bg-transparent text-slate-500 hover:text-red-500 hover:bg-red-950/20 p-2.5 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-900/30"
                        title="Delete client inquiry logs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Body Content depending on Type */}
                  <div className="text-sm">
                    {inq.type === "contact" && inq.contactData && (
                      <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                          Requested service: <span className="text-red-400">{inq.contactData.service}</span>
                        </div>
                        <p className="text-slate-300 italic text-xs leading-relaxed">
                          &ldquo;{inq.contactData.message}&rdquo;
                        </p>
                      </div>
                    )}

                    {inq.type === "quote" && inq.quoteData && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                        <div className="flex justify-between items-center text-xs font-mono font-normal">
                          <span className="text-slate-400">QUOTATION MATH ESTIMATE:</span>
                          <span className="text-red-500 font-bold bg-red-950/40 border border-red-900/30 px-2 py-0.5 rounded">
                            ₹{inq.quoteData.estimatedPriceMin.toLocaleString("en-IN")} - ₹{inq.quoteData.estimatedPriceMax.toLocaleString("en-IN")}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1 border-t border-slate-850/60 font-mono">
                          <div>
                            <span className="text-slate-500 block text-[10px]">CCTV CAMERAS:</span>
                            <span className="text-slate-200 uppercase">{inq.quoteData.camerasCount}x ({inq.quoteData.resolution})</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">CCTV STYLE:</span>
                            <span className="text-slate-200 uppercase">{inq.quoteData.cameraType}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">SURVEILLANCE HDD:</span>
                            <span className="text-slate-200 uppercase">{inq.quoteData.storage}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">ENVIRONMENT:</span>
                            <span className="text-slate-200 uppercase">{inq.quoteData.installationType}</span>
                          </div>
                        </div>

                        <div className="text-[10px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1 bg-slate-900 p-2 rounded border border-slate-800">
                          <span>Biometrics Sync: <b>{inq.quoteData.biometricNeeded ? "YES (eSSL/Realtime)" : "NO"}</b></span>
                          <span>EM Magnet Lock: <b>{inq.quoteData.accessControlNeeded ? "YES" : "NO"}</b></span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notes & Status Toggle Area */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/50 p-3 rounded-xl border border-slate-850/60">
                    
                    {/* Status radio style select */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500 font-mono font-medium">SET OPERATIONAL STATUS:</span>
                      <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-slate-805">
                        {(["new", "contacted", "completed"] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => onUpdateStatus(inq.id, st)}
                            className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase transition-all whitespace-nowrap cursor-pointer ${
                              inq.status === st
                                ? "bg-slate-800 text-white"
                                : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Operational Notes field editing */}
                    <div className="flex-1 w-full text-xs font-mono">
                      {editingNotesId === inq.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={notesTempText}
                            onChange={(e) => setNotesTempText(e.target.value)}
                            placeholder="Write customer notes..."
                            className="bg-slate-900 text-white px-3 py-1.5 rounded-lg border border-slate-700 w-full focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => {
                              onUpdateNotes(inq.id, notesTempText);
                              setEditingNotesId(null);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-850">
                          <span className="text-slate-400 text-xs tracking-tight line-clamp-1">
                            Notes: <b className="text-slate-200 font-normal">{inq.notes || "None. Keep track of customer requirements."}</b>
                          </span>
                          <button
                            onClick={() => {
                              setEditingNotesId(inq.id);
                              setNotesTempText(inq.notes || "");
                            }}
                            className="text-[10px] font-bold text-red-400 hover:text-red-300 px-2 cursor-pointer whitespace-nowrap"
                          >
                            [Edit Notes]
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
