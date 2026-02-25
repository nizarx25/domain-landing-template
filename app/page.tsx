import data from "../data/domain.json";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-5xl font-bold text-primary mb-4">
        {data.content.hero_title}
      </h1>
      
      <p className="text-xl text-secondary mb-8 max-w-2xl">
        {data.content.hero_subtitle}
      </p>
      
      <div className="bg-white/5 p-8 rounded-2xl shadow-2xl border border-accent">
        <h2 className="text-4xl font-extrabold text-white mb-2" dir="ltr">
          {data.domainName}
        </h2>
        <p className="text-3xl text-primary font-semibold mb-6">
          السعر: {data.suggested_price} $
        </p>
        
        <button className="bg-accent text-white font-bold px-10 py-4 rounded-full hover:opacity-80 transition-all">
          {data.content.final_cta}
        </button>
      </div>
    </main>
  );
}
