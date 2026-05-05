import { Code, Layers, BrainCircuit, Cloud, ShieldCheck, Rocket } from "lucide-react";

type Course = {
  n: number;
  title: string;
  subtitle: string;
  items: string[];
  outcome: string;
  accent: "navy" | "blue" | "green" | "orange" | "red" | "violet";
  icon: React.ElementType;
  recommended?: boolean;
};

const courses: Course[] = [
  { n: 1, title: "Foundation", subtitle: "Perfect for beginners", icon: Code, accent: "violet",
    items: ["Python Programming", "Java Basics", "Data Structures", "Git & Version Control"],
    outcome: "Build Strong Programming Basics" },
  { n: 2, title: "Full Stack Developer", subtitle: "End-to-end web apps", icon: Layers, accent: "blue", recommended: true,
    items: ["Frontend (HTML, CSS, JS, React)", "Backend (Node.js / Java / Python)", "Database (SQL, MongoDB)", "Real-Time Projects"],
    outcome: "Become a Complete Developer" },
  { n: 3, title: "AI & Data Science", subtitle: "Future-ready skills", icon: BrainCircuit, accent: "green", recommended: true,
    items: ["AI Fundamentals", "Machine Learning", "Data Science", "Data Visualization"],
    outcome: "Enter the Future of Technology" },
  { n: 4, title: "Cloud & DevOps", subtitle: "Ship and scale", icon: Cloud, accent: "orange",
    items: ["Cloud (AWS / Azure Basics)", "DevOps Tools", "CI/CD Pipelines", "Docker & Kubernetes"],
    outcome: "Deploy & Scale Applications" },
  { n: 5, title: "Cyber Security", subtitle: "Defend the stack", icon: ShieldCheck, accent: "red",
    items: ["Cyber Security Basics", "Ethical Hacking", "IAM & PAM", "Network Security"],
    outcome: "Secure the Digital World" },
  { n: 6, title: "Advanced Tech", subtitle: "Stay ahead of the curve", icon: Rocket, accent: "navy",
    items: ["ServiceNow", "Microsoft Playwright", "Quantum Computing (Intro)"],
    outcome: "Stay Ahead in Technology" },
];

const accentMap: Record<Course["accent"], { chip: string; outcome: string; icon: string }> = {
  navy:   { chip: "bg-brand-navy text-primary-foreground", outcome: "bg-brand-navy text-primary-foreground", icon: "bg-brand-navy text-primary-foreground" },
  blue:   { chip: "bg-blue-600 text-white",       outcome: "bg-blue-600 text-white",       icon: "bg-blue-600 text-white" },
  green:  { chip: "bg-emerald-600 text-white",    outcome: "bg-emerald-600 text-white",    icon: "bg-emerald-600 text-white" },
  orange: { chip: "bg-orange-500 text-white",     outcome: "bg-orange-500 text-white",     icon: "bg-orange-500 text-white" },
  red:    { chip: "bg-brand-red text-destructive-foreground", outcome: "bg-brand-red text-destructive-foreground", icon: "bg-brand-red text-destructive-foreground" },
  violet: { chip: "bg-violet-600 text-white",     outcome: "bg-violet-600 text-white",     icon: "bg-violet-600 text-white" },
};

export function Courses() {
  return (
    <section id="courses" className="bg-secondary/40 border-y border-border py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">★ Our Course Packages ★</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold">Choose your career path — not just a course</h2>
          <p className="mt-4 text-muted-foreground">Six focused tracks. Mentor-led. Project-first. Outcome-driven.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => {
            const a = accentMap[c.accent];
            const Icon = c.icon;
            return (
              <div key={c.n} className="relative rounded-2xl bg-card border border-border shadow-soft overflow-hidden flex flex-col hover:-translate-y-1 transition">
                {c.recommended && (
                  <div className="absolute top-4 -right-10 rotate-45 bg-brand-yellow text-foreground text-[10px] font-extrabold px-12 py-1 shadow">
                    RECOMMENDED
                  </div>
                )}
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`h-8 w-8 grid place-items-center rounded-full font-bold text-sm ${a.chip}`}>{c.n}</span>
                    <div>
                      <h3 className="font-extrabold text-xl uppercase tracking-tight">{c.title}</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.subtitle}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-4">
                    <div className={`h-14 w-14 shrink-0 grid place-items-center rounded-xl ${a.icon}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <ul className="space-y-1.5 text-sm">
                      {c.items.map((i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-brand-red font-bold">✓</span>
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`px-6 py-3 text-center font-bold ${a.outcome}`}>
                  {c.outcome}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
