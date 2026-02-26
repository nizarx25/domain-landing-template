import data from "../data/domain.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[var(--color-primary)] selection:text-white pb-20">
      {/* Ambient Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[var(--color-primary)] opacity-[0.15] blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[var(--color-accent)] opacity-[0.15] blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
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

          {/* Pricing & CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
            <div className="px-10 py-4 text-center sm:text-left border-b sm:border-b-0 sm:border-r border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Estimated Value</p>
              <p className="text-4xl font-bold text-white tracking-tight">
                {data.suggested_price}
              </p>
            </div>
            <button className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] hover:opacity-90 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(var(--color-primary),0.5)] hover:-translate-y-1">
              {data.content.final_cta}
            </button>
          </div>
        </main>

        {/* Ideal Use Cases (Pills) */}
        {data.content.useCases && (
          <section className="py-16 border-t border-white/5" dir="ltr">
            <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">Perfect For</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {data.content.useCases.map((useCase: string, idx: number) => (
                <span key={idx} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium hover:border-[var(--color-primary)]/50 hover:text-white transition-all cursor-default hover:bg-white/10">
                  {useCase}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Grid: Features & Value Proposition */}
        <div className="grid md:grid-cols-2 gap-12 py-16" dir="ltr">
          
          {/* Why this domain? */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8">Why this domain?</h2>
            {data.content.features?.map((feature: { title: string, desc: string }, idx: number) => (
              <div key={idx} className="flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold text-xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Strategic Value / Utilization */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8">Strategic Value</h2>
            {data.content.valueProposition?.map((prop: { title: string, desc: string }, idx: number) => (
              <div key={idx} className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[var(--color-accent)]/50 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-accent)]/10 rounded-full blur-3xl group-hover:bg-[var(--color-accent)]/20 transition-all"></div>
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3 relative z-10">{prop.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm relative z-10">{prop.desc}</p>
              </div>
            ))}
          </section>

        </div>
      </div>
    </div>
  );
}
