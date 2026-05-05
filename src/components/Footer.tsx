import { site } from "@/lib/site";
import { GraduationCap, Rocket, Star } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-navy-deep" style={{ colorScheme: "normal" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-brand-yellow text-foreground grid place-items-center font-bold">K</div>
              <div>
                <div className="font-display font-bold text-base text-white">{site.name}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/60">{site.tagline}</div>
              </div>
            </div>
            <p className="mt-4 text-white/70">Practical tech education that gets you hired. Mentors who ship. Projects that count.</p>
          </div>
          <div>
            <div className="font-bold text-white">Contact</div>
            <ul className="mt-3 space-y-1.5 text-white/70">
              <li>{site.phoneDisplay}</li>
              <li>{site.email}</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white">Our Promise</div>
            <ul className="mt-3 space-y-2 text-white/80">
              <li className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-brand-yellow" /> Learn Today</li>
              <li className="flex items-center gap-2"><Rocket className="h-4 w-4 text-brand-yellow" /> Implement Tomorrow</li>
              <li className="flex items-center gap-2"><Star className="h-4 w-4 text-brand-yellow" /> Lead the Future</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/60 flex justify-between flex-wrap gap-2">
          <div>© {new Date().getFullYear()} {site.name} — All rights reserved.</div>
          <div>Made with care for future tech experts.</div>
        </div>
      </div>
    </footer>
  );
}