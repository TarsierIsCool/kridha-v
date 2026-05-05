import { useState } from "react";
import { site } from "@/lib/site";
import { Calendar, Send, CheckCircle2, AlertTriangle } from "lucide-react";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/lib/auth-context";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_qizgg5a";
const EMAILJS_TEMPLATE_ID = "template_hwby1n4";
const EMAILJS_PUBLIC_KEY = "Zapj2_VnHxpPdKmsB";

const COURSES = [
  "Foundation", "Full Stack Developer", "AI & Data Science",
  "Cloud & DevOps", "Cyber Security", "Advanced Tech",
];

type Booking = {
  id: string; name: string; phone: string; email: string;
  course: string; message: string; createdAt: string;
};

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^(\+91|91|0)?[6-9]\d{9}$/.test(cleaned);
}

async function checkDuplicate(phone: string, email: string): Promise<boolean> {
  try {
    const byPhone = await getDocs(query(collection(db, "bookings"), where("phone", "==", phone)));
    if (!byPhone.empty) return true;
    const byEmail = await getDocs(query(collection(db, "bookings"), where("email", "==", email)));
    if (!byEmail.empty) return true;
    return false;
  } catch {
    return false; // If check fails, allow booking
  }
}

async function saveBooking(b: Booking, uid: string | null) {
  const key = "kridha_bookings";
  const list = JSON.parse(localStorage.getItem(key) || "[]") as Booking[];
  list.push(b);
  localStorage.setItem(key, JSON.stringify(list));
  try {
    await addDoc(collection(db, "bookings"), {
      ...b, uid, createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Firestore save failed (kept local copy):", err);
  }
}

export function BookingSection() {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [duplicate, setDuplicate] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", course: COURSES[1], message: "",
  });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    if (k === "phone") {
      if (v && !isValidPhone(v)) setPhoneError("Please enter a valid 10-digit mobile number");
      else setPhoneError(null);
    }
    setDuplicate(false);
  }

  async function handleSubmit(e: React.FormEvent, force = false) {
    e.preventDefault();
    if (!isValidPhone(form.phone)) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setError(null);

    // Check for duplicate
    if (!force) {
      const isDuplicate = await checkDuplicate(form.phone, form.email);
      if (isDuplicate) {
        setDuplicate(true);
        setLoading(false);
        return;
      }
    }

    const booking: Booking = {
      id: crypto.randomUUID(), ...form, createdAt: new Date().toISOString(),
    };

    await saveBooking(booking, user?.uid ?? null);

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        course: form.course,
        message: form.message || "No additional notes.",
      }, EMAILJS_PUBLIC_KEY);
      setSent(true);
    } catch (err) {
      console.error("Email failed:", err);
      setError("Booking saved but email notification failed. We'll still be in touch!");
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="book" className="relative bg-hero-gradient py-20" style={{ colorScheme: "normal" }}>
      <div className="mx-auto max-w-6xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow text-foreground px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider">
            <Calendar className="h-3.5 w-3.5" /> Book Your Free Demo Class
          </span>
          <h2 className="mt-5 text-4xl lg:text-5xl font-extrabold leading-tight">
            Try a class. <span className="text-brand-yellow">Then decide.</span>
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md">
            No commitment. Sit through a real session, talk to the mentor, and see how we teach. We'll confirm your slot shortly.
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
              <p className="mt-2 text-muted-foreground">
                Your booking has been received. We'll reach out to confirm your demo slot soon!
              </p>
              {error && <p className="mt-2 text-xs text-amber-500">{error}</p>}
              <button
                onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", course: COURSES[1], message: "" }); }}
                className="mt-5 rounded-full border border-border px-5 py-2 font-semibold"
              >
                Book another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold">Reserve your seat</h3>

              {/* Duplicate warning */}
              {duplicate && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Looks like you've already booked!</p>
                    <p className="text-xs text-amber-700 mt-0.5">We already have your details and will be in touch soon. Want to book again anyway?</p>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); handleSubmit(e as any, true); }}
                      className="mt-2 text-xs font-bold text-amber-800 underline"
                    >
                      Yes, submit again
                    </button>
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name">
                  <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input" />
                </Field>
                <Field label="Phone">
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={`input ${phoneError ? "input-error" : ""}`}
                    inputMode="tel"
                    placeholder="e.g. 9876543210"
                  />
                  {phoneError && <p className="mt-1 text-xs text-red-500">{phoneError}</p>}
                </Field>
              </div>
              <Field label="Email">
                <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" />
              </Field>
              <Field label="Course">
                <select value={form.course} onChange={(e) => update("course", e.target.value)} className="input">
                  {COURSES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Anything we should know? (optional)">
                <textarea value={form.message} onChange={(e) => update("message", e.target.value)} className="input min-h-[80px]" />
              </Field>
              <button
                type="submit"
                disabled={loading || !!phoneError}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-red text-destructive-foreground py-3 font-bold hover:opacity-90 transition disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {loading ? "Checking..." : "Book My Free Demo"}
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
        .input-error { border-color: #ef4444 !important; }
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