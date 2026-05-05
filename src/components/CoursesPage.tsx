import { useState } from "react";
import { Code, Layers, BrainCircuit, Cloud, ShieldCheck, Rocket, X, ArrowRight } from "lucide-react";

const courses = [
  {
    slug: "foundation",
    title: "Foundation",
    subtitle: "Perfect for beginners",
    color: "#7C3AED",
    lightColor: "#EDE9FE",
    icon: Code,
    duration: "3 Months",
    fee: "₹15,000",
    batch: "Starting June 2026",
    seats: "20 seats left",
    syllabus: [
      { module: "Module 1", topic: "Python Programming", weeks: "2 weeks" },
      { module: "Module 2", topic: "Java Basics", weeks: "2 weeks" },
      { module: "Module 3", topic: "Data Structures & Algorithms", weeks: "4 weeks" },
      { module: "Module 4", topic: "Git & Version Control", weeks: "2 weeks" },
									 							],
    projects: ["CLI Task Manager", "Student Grade Calculator", "Mini Bank System"],
    mentor: { name: "Ravi Kumar", exp: "8 years", company: "Ex-TCS, Infosys", img: "RK" },
    outcomes: ["Strong programming foundation", "Ready for advanced tracks", "Industry certification"],
  },
  {
    slug: "full-stack",
    title: "Full Stack",
    subtitle: "End-to-end web apps",
    color: "#2563EB",
    lightColor: "#DBEAFE",
    icon: Layers,
    duration: "6 Months",
    fee: "₹35,000",
    batch: "Starting June 2026",
    seats: "12 seats left",
    syllabus: [
      { module: "Module 1", topic: "HTML, CSS & JavaScript", weeks: "4 weeks" },
      { module: "Module 2", topic: "React & Frontend Dev", weeks: "4 weeks" },
      { module: "Module 3", topic: "Node.js & Backend", weeks: "4 weeks" },
      { module: "Module 4", topic: "Database (SQL + MongoDB)", weeks: "3 weeks" },
      { module: "Module 5", topic: "Real-Time Projects", weeks: "5 weeks" },
    ],
    projects: ["E-Commerce Website", "Chat Application", "Job Portal", "Portfolio Builder"],
    mentor: { name: "Priya Sharma", exp: "10 years", company: "Ex-Amazon, Wipro", img: "PS" },
    outcomes: ["Full stack job-ready", "4 portfolio projects", "Placement support"],
  },
  {
    slug: "ai-data-science",
    title: "AI & Data Science",
    subtitle: "Future-ready skills",
    color: "#059669",
    lightColor: "#D1FAE5",
    icon: BrainCircuit,
    duration: "6 Months",
    fee: "₹35,000",
    batch: "Starting June 2026",
    seats: "15 seats left",
    syllabus: [
      { module: "Module 1", topic: "Python for Data Science", weeks: "3 weeks" },
      { module: "Module 2", topic: "Machine Learning", weeks: "5 weeks" },
      { module: "Module 3", topic: "Deep Learning & AI", weeks: "4 weeks" },
      { module: "Module 4", topic: "Data Visualization", weeks: "3 weeks" },
      { module: "Module 5", topic: "Capstone Project", weeks: "5 weeks" },
    ],
    projects: ["Sentiment Analyzer", "Stock Price Predictor", "Image Classifier", "Recommendation Engine"],
    mentor: { name: "Arjun Mehta", exp: "12 years", company: "Ex-Google, Microsoft", img: "AM" },
    outcomes: ["AI/ML engineer ready", "Kaggle competition ready", "Industry certification"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    subtitle: "Ship and scale",
    color: "#EA580C",
    lightColor: "#FFEDD5",
    icon: Cloud,
    duration: "6 Months",
    fee: "₹35,000",
    batch: "Starting July 2026",
    seats: "18 seats left",
    syllabus: [
      { module: "Module 1", topic: "Cloud Fundamentals (AWS/Azure)", weeks: "4 weeks" },
      { module: "Module 2", topic: "Linux & Networking", weeks: "3 weeks" },
      { module: "Module 3", topic: "Docker & Kubernetes", weeks: "4 weeks" },
      { module: "Module 4", topic: "CI/CD Pipelines", weeks: "4 weeks" },
      { module: "Module 5", topic: "Live Infrastructure Project", weeks: "5 weeks" },
    ],
    projects: ["Deploy a Scalable App", "Build CI/CD Pipeline", "Kubernetes Cluster Setup"],
    mentor: { name: "Suresh Babu", exp: "9 years", company: "Ex-Accenture, AWS", img: "SB" },
    outcomes: ["AWS/Azure certified", "DevOps engineer ready", "Placement support"],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    subtitle: "Defend the stack",
    color: "#DC2626",
    lightColor: "#FEE2E2",
    icon: ShieldCheck,
    duration: "6 Months",
    fee: "₹35,000",
    batch: "Starting July 2026",
    seats: "10 seats left",
    syllabus: [
      { module: "Module 1", topic: "Cyber Security Basics", weeks: "3 weeks" },
      { module: "Module 2", topic: "Ethical Hacking", weeks: "5 weeks" },
      { module: "Module 3", topic: "IAM & PAM", weeks: "3 weeks" },
      { module: "Module 4", topic: "Network Security", weeks: "4 weeks" },
      { module: "Module 5", topic: "CTF Challenges & Live Labs", weeks: "5 weeks" },
    ],
    projects: ["Penetration Testing Report", "Build a Firewall", "Vulnerability Scanner"],
    mentor: { name: "Kavya Reddy", exp: "11 years", company: "Ex-IBM, Deloitte", img: "KR" },
    outcomes: ["CEH certification ready", "Security analyst ready", "Placement support"],
  },
  {
    slug: "advanced-tech",
    title: "Advanced Tech",
    subtitle: "Stay ahead of the curve",
    color: "#4F6FA5",
    lightColor: "#DBEAFE",
    icon: Rocket,
    duration: "3 Months",
    fee: "₹20,000",
    batch: "Starting August 2026",
    seats: "25 seats left",
    syllabus: [
      { module: "Module 1", topic: "ServiceNow Development", weeks: "4 weeks" },
      { module: "Module 2", topic: "Microsoft Playwright", weeks: "4 weeks" },
      { module: "Module 3", topic: "Quantum Computing Intro", weeks: "4 weeks" },
    ],
    projects: ["ServiceNow ITSM App", "Automated Test Suite", "Quantum Algorithm Demo"],
    mentor: { name: "Vikram Nair", exp: "15 years", company: "Ex-ServiceNow, IBM", img: "VN" },
    outcomes: ["Niche tech expertise", "High-demand skills", "Industry certification"],
  },
];

export function CoursesPage() {
  const [active, setActive] = useState<string | null>(null);
  const activeCourse = courses.find((c) => c.slug === active);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-hero-gradient py-12 px-5 text-center" style={{ colorScheme: "normal" }}>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Our Courses</h1>
        <p className="mt-3 text-white/70 text-lg">Click a track to explore the full details</p>
      </div>

      {/* Columns */}
      <div className="flex h-[600px] overflow-hidden">
        {courses.map((c) => {
          const isActive = active === c.slug;
          const Icon = c.icon;
          return (
            <div
              key={c.slug}
              onClick={() => setActive(isActive ? null : c.slug)}
              className="relative cursor-pointer overflow-hidden transition-all duration-500 ease-in-out flex flex-col"
              style={{
                flex: isActive ? "5" : "1",
                backgroundColor: c.color,
                minWidth: isActive ? "0" : "48px",
              }}
            >
              {/* Collapsed label */}
              {!isActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <Icon className="h-6 w-6 text-white/90 shrink-0" />
                  <span
                    className="text-white font-bold text-xs uppercase tracking-widest whitespace-nowrap"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {c.title}
                  </span>
                </div>
              )}

              {/* Expanded content */}
              {isActive && (
                <div className="flex h-full overflow-hidden">
                  {/* Left accent */}
                  <div className="w-2 shrink-0" style={{ backgroundColor: c.color }} />

                  {/* Content */}
                  <div className="flex-1 bg-background overflow-y-auto p-6 lg:p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl grid place-items-center" style={{ backgroundColor: c.color }}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-extrabold">{c.title}</h2>
                          <p className="text-muted-foreground text-sm">{c.subtitle}</p>
                        </div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setActive(null); }} className="rounded-full p-1.5 hover:bg-muted transition">
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {[
                        { label: "Duration", value: c.duration },
                        { label: "Fee", value: c.fee },
                        { label: "Next Batch", value: c.batch },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: c.lightColor }}>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                          <div className="mt-1 font-bold text-sm text-gray-800">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-1 text-xs font-semibold text-center" style={{ color: c.color }}>
                      ⚡ {c.seats}
                    </div>

                    <div className="mt-5 grid lg:grid-cols-2 gap-6">
                      {/* Syllabus */}
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-3">Syllabus</h3>
                        <div className="space-y-2">
                          {c.syllabus.map((s) => (
                            <div key={s.module} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                              <div>
                                <span className="font-semibold">{s.module}</span>
                                <span className="text-muted-foreground"> · {s.topic}</span>
                              </div>
                              <span className="text-xs text-muted-foreground shrink-0 ml-2">{s.weeks}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-5">
                        {/* Projects */}
                        <div>
                          <h3 className="font-bold text-sm uppercase tracking-wider mb-3">Projects You'll Build</h3>
                          <div className="flex flex-wrap gap-2">
                            {c.projects.map((p) => (
                              <span key={p} className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: c.color }}>
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Mentor */}
                        <div>
                          <h3 className="font-bold text-sm uppercase tracking-wider mb-3">Your Mentor</h3>
                          <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                            <div className="h-12 w-12 rounded-full grid place-items-center font-bold text-white text-sm shrink-0" style={{ backgroundColor: c.color }}>
                              {c.mentor.img}
                            </div>
                            <div>
                              <div className="font-bold">{c.mentor.name}</div>
                              <div className="text-xs text-muted-foreground">{c.mentor.exp} experience · {c.mentor.company}</div>
                            </div>
                          </div>
                        </div>

                        {/* Outcomes */}
                        <div>
                          <h3 className="font-bold text-sm uppercase tracking-wider mb-3">What You'll Achieve</h3>
                          <ul className="space-y-1.5">
                            {c.outcomes.map((o) => (
                              <li key={o} className="flex items-center gap-2 text-sm">
                                <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: c.color }} />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href="#book"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-3 font-bold text-white transition hover:opacity-90"
                      style={{ backgroundColor: c.color }}
                    >
                      Book Free Demo for {c.title} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}