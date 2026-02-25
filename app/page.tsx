import data from "../data/domain.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text font-sans relative overflow-hidden">
      {/* تأثيرات الإضاءة الخلفية */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary opacity-20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent opacity-20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      {/* الشريط العلوي */}
      <nav className="relative z-10 flex justify-between items-center p-6 md:px-12 border-b border-white/5 bg-white/5 backdrop-blur-md">
        <div className="text-2xl font-black tracking-widest text-primary uppercase">
          Premium<span className="text-text">Domains</span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          متاح للبيع الفوري
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        
        <h2 className="text-accent font-bold tracking-widest uppercase mb-6 drop-shadow-lg">
          {data.content.hero_title}
        </h2>

        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter" dir="ltr">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
            {data.domainName}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-secondary max-w-3xl mb-16 leading-relaxed font-light">
          {data.content.hero_subtitle}
        </p>

        {/* صندوق السعر والزر */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
          <div className="px-8 py-4 text-left">
            <p className="text-sm text-secondary mb-1 uppercase tracking-wider font-semibold">السعر المقدر</p>
            <p className="text-4xl font-bold text-white">
              {data.suggested_price} <span className="text-primary text-3xl">$</span>
            </p>
          </div>
          
          <button className="w-full md:w-auto px-12 py-6 bg-gradient-to-r from-primary to-accent text-white font-black text-xl rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(var(--color-primary),0.4)]">
            {data.content.final_cta}
          </button>
        </div>

        {/* مميزات النطاق */}
        {data.content.features && (
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-right">
            {data.content.features.map((feature: { title: string, desc: string }, index: number) => (
              <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 text-xl">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
