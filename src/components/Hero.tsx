import { site } from "@/lib/site";
import { Sparkles, Megaphone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient" style={{ colorScheme: "normal" }}>
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-red/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            <Megaphone className="h-3.5 w-3.5" /> Admissions Open · {site.batch} Batch
          </span>
          <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold leading-[1.05] text-white">
            Become a <span className="text-brand-yellow">Tech Expert</span> in 6 months
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl">
            Hands-on training in AI, Full Stack, Cloud and Data Science — built for absolute beginners and career switchers.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            {["AI", "FULL STACK", "CLOUD", "DATA SCIENCE"].map((t) => (
              <span key={t} className="rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-white">{t}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#book" className="inline-flex items-center gap-2 rounded-full bg-brand-yellow text-foreground px-6 py-3 font-bold shadow-glow hover:scale-[1.02] transition">
              <Sparkles className="h-4 w-4" /> Book Free Demo
            </a>
            <a href="#courses" className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10 transition">
              Explore Courses
            </a>
          </div>
        </div>
        <div className="relative animate-fade-up">
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-[2rem] bg-yellow-gradient blur-3xl opacity-30 animate-float" />
            <div className="relative h-full w-full rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur p-6 flex flex-col justify-between shadow-glow">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-white/60">Course Fee</div>
                <span className="rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold text-white">ONLY</span>
              </div>
              <div>
                <div className="text-7xl font-extrabold text-brand-yellow">₹{site.feeINR.toLocaleString("en-IN")}</div>
                <div className="mt-1 text-sm text-white/70">Easy EMI options available</div>
              </div>
              <ul className="space-y-2 text-sm text-white">
                {["100% Practical Training", "Real-Time Projects", "Placement Support", "Industry Certification"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}