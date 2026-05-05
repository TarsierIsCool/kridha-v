import { Target, Code2, Briefcase, BadgeCheck } from "lucide-react";

const items = [
  { icon: Target, title: "100% Practical Training", desc: "Project-driven curriculum, no passive lectures." },
  { icon: Code2, title: "Real-Time Projects", desc: "Build production-grade apps you can ship." },
  { icon: Briefcase, title: "Placement Support", desc: "Resume reviews, mock interviews, referrals." },
  { icon: BadgeCheck, title: "Industry Certification", desc: "Get certified and job-ready in 6 months." },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover:-translate-y-1 hover:shadow-glow transition">
            <div className="h-12 w-12 rounded-xl bg-yellow-gradient grid place-items-center text-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-bold text-lg">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
