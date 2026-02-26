"use client";

import { useState } from "react";
import data from "../data/domain.json";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleOfferSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const offerData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      offerAmount: formData.get("offerAmount"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/submit-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerData),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[var(--color-primary)] selection:text-white flex flex-col">
      {/* Ambient Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[var(--color-primary)] opacity-[0.15] blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[var(--color-accent)] opacity-[0.15] blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Navbar */}
        <nav className="flex flex-col sm:flex-row justify-between items-center py-8 border-b border-white/5 gap-4">
          <div className="text-2xl font-bold tracking-tighter text-white">
            {data.domainName.split('.')[0]}<span className="text-[var(--color-primary)]">.{data.domainName.split('.')[1]}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Premium & Available
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex flex-col items-center text-center pt-24 pb-16" dir="ltr">
          <div className="inline-block mb-6 px-5 py-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 backdrop-blur-md">
            <span className="text-[var(--color-primary)] font-semibold text-sm tracking-wide uppercase">
              {data.content.hero_title}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-8 tracking-tighter leading-tight drop-shadow-2xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
              {data.domainName}
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-14 font-light leading-relaxed">
            {data.content.hero_subtitle}
          </p>

          {/* Pricing & Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl w-full max-w-4xl">
            <div className="px-8 py-4 text-center md:text-left md:border-r border-white/10 flex-grow">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Estimated Value</p>
              <p className="text-4xl font-bold text-white tracking-tight">
                {data.suggested_price}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto px-4">
              {data.buyNowLink && data.buyNowLink !== "" && (
                <a href={data.buyNowLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-10 py-5 bg-white text-black hover:bg-gray-200 font-bold text-lg rounded-xl transition-all duration-300 hover:-translate-y-1">
                  Buy It Now
                </a>
              )}
              <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] hover:opacity-90 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(var(--color-primary),0.4)] hover:-translate-y-1">
                {data.content.final_cta}
              </button>
            </div>
          </div>
        </main>

        {/* Features & Value Grid */}
        <div className="grid md:grid-cols-2 gap-12 py-16" dir="ltr">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8">Why this domain?</h2>
            {data.content.features?.map((feature: {title: string, desc: string}, idx: number) => (
              <div key={idx} className="flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold text-xl">✓</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8">Strategic Value</h2>
            {data.content.valueProposition?.map((prop: {title: string, desc: string}, idx: number) => (
              <div key={idx} className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[var(--color-accent)]/50 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-accent)]/10 rounded-full blur-3xl group-hover:bg-[var(--color-accent)]/20 transition-all"></div>
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3 relative z-10">{prop.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm relative z-10">{prop.desc}</p>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-10 mt-10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center gap-4">
          <div className="text-xl font-bold text-white opacity-50">{data.domainName}</div>
          <p className="text-gray-500 text-sm max-w-md">
            {data.content.footer_text || "Secure transaction. Ownership transfers immediately via official registrar escrow."}
          </p>
          <p className="text-gray-600 text-xs mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>

      {/* Make an Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" dir="ltr">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl w-full max-w-lg relative shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-all">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl transition-colors">&times;</button>
            <h3 className="text-3xl font-bold text-white mb-2">Make an Offer</h3>
            <p className="text-gray-400 text-sm mb-8">Submit your offer for <span className="text-[var(--color-primary)] font-semibold">{data.domainName}</span></p>
            
            {status === "success" ? (
              <div className="text-green-400 text-center py-12">
                <div className="text-6xl mb-4">✓</div>
                <p className="text-2xl font-bold text-white mb-2">Offer Sent Successfully!</p>
                <p className="text-gray-400">We will review your offer and get back to you shortly.</p>
                <button onClick={() => setIsModalOpen(false)} className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">Close</button>
              </div>
            ) : (
              <form onSubmit={handleOfferSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-5">
                  <input name="firstName" required placeholder="First Name" className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                  <input name="lastName" required placeholder="Last Name" className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                </div>
                <input name="email" type="email" required placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-500 font-bold">$</span>
                  <input name="offerAmount" type="number" required placeholder="Offer Amount (USD)" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-8 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                </div>
                <textarea name="message" rows={3} placeholder="Additional Message / Terms (Optional)" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] transition-colors"></textarea>
                <button type="submit" disabled={status === "submitting"} className="w-full bg-[var(--color-primary)] hover:bg-opacity-80 text-white font-bold py-4 rounded-xl mt-2 transition-all disabled:opacity-50 text-lg">
                  {status === "submitting" ? "Sending Securely..." : "Submit Secure Offer"}
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">By submitting this offer, you agree to our terms of negotiation.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
