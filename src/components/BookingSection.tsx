import { useState } from "react";
import { site, waLink, mailLink } from "@/lib/site";
import { Calendar, Send, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/lib/auth-context";

const COURSES = [
  "Foundation", "Full Stack Developer", "AI & Data Science",
  "Cloud & DevOps", "Cyber Security", "Advanced Tech",
];

type Booking = {
  id: string; name: string; phone: string; email: string;
  course: string; preferredTime: string; message: string; createdAt: string;
};

async function saveBooking(b: Booking, uid: string | null) {
  // Always keep a local copy as a fallback.
  const key = "kridha_bookings";
  const list = JSON.parse(localStorage.getItem(key) || "[]") as Booking[];
  list.push(b);
  localStorage.setItem(key, JSON.stringify(list));
  // Save to Firestore.
  try {
    await addDoc(collection(db, "bookings"), {
      ...b,
      uid,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Firestore save failed (kept local copy):", err);
  }
}

export function BookingSection() {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", course: COURSES[1], preferredTime: "", message: "",
  });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const booking: Booking = {
      id: crypto.randomUUID(), ...form, createdAt: new Date().toISOString(),
    };
    await saveBooking(booking, user?.uid ?? null);
    const text = `Hi ${site.name}! I'd like to book a free demo class.
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Course: ${form.course}
Preferred time: ${form.preferredTime}
Notes: ${form.message}`;
    window.open(waLink(text), "_blank");
    setSent(true);
  }

  return (
    <section id="book" className="relative bg-hero-gradient text-primary-foreground py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow text-foreground px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider">
            <Calendar className="h-3.5 w-3.5" /> Book Your Free Demo Class
          </span>
          <h2 className="mt-5 text-4xl lg:text-5xl font-extrabold leading-tight">
            Try a class. <span className="text-brand-yellow">Then decide.</span>
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md">
            No commitment. Sit through a real session, talk to the mentor, and see how we teach. We'll confirm your slot on WhatsApp.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {["Free 1-hour live demo", "1:1 career counselling", "EMI options explained"].map((x) => (
              <li key={x} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-yellow" /> {x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-card text-card-foreground p-6 lg:p-8 shadow-glow">
          {sent ? (
            <div className="text-center py-10">
              <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 grid place-items-center text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">You're in!</h3>
              <p className="mt-2 text-muted-foreground">We've opened WhatsApp to confirm your slot. If it didn't open, message us directly.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href={waLink("Hi, I just booked a demo class.")} target="_blank" rel="noreferrer" className="rounded-full bg-brand-red text-destructive-foreground px-5 py-2 font-semibold">Open WhatsApp</a>
                <button onClick={() => setSent(false)} className="rounded-full border border-border px-5 py-2 font-semibold">Book another</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold">Reserve your seat</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name"><input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input" /></Field>
                <Field label="Phone"><input required value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" inputMode="tel" /></Field>
              </div>
              <Field label="Email"><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" /></Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Course">
                  <select value={form.course} onChange={(e) => update("course", e.target.value)} className="input">
                    {COURSES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Preferred time"><input value={form.preferredTime} onChange={(e) => update("preferredTime", e.target.value)} className="input" placeholder="e.g. Sat 11am" /></Field>
              </div>
              <Field label="Anything we should know? (optional)">
                <textarea value={form.message} onChange={(e) => update("message", e.target.value)} className="input min-h-[80px]" />
              </Field>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-red text-destructive-foreground py-3 font-bold hover:opacity-90 transition">
                <Send className="h-4 w-4" /> Confirm via WhatsApp
              </button>
              <button type="button" onClick={() => window.open(mailLink("Demo class booking", `Name: ${form.name}\nPhone: ${form.phone}\nCourse: ${form.course}`))} className="w-full text-sm text-muted-foreground hover:text-foreground">
                or email us instead
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 0.65rem 0.85rem;
          font-size: 0.9rem;
          color: var(--foreground);
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus { border-color: var(--ring); box-shadow: 0 0 0 3px oklch(0.55 0.15 260 / 0.15); }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
