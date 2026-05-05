import { useState } from "react";
import { MessageCircle, X, Send, Mail } from "lucide-react";
import { site, waLink, mailLink } from "@/lib/site";

const QUICK = [
  "What courses do you offer?",
  "What's the fee and EMI plan?",
  "When is the next batch?",
  "Can I book a free demo?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  function send(via: "wa" | "email", message?: string) {
    const m = (message || text || "Hi! I have a question.").trim();
    if (via === "wa") window.open(waLink(m), "_blank");
    else window.open(mailLink("Question from website", m));
    setText("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[340px] max-w-[calc(100vw-2.5rem)] rounded-2xl bg-card border border-border shadow-glow overflow-hidden animate-fade-up">
          <div className="bg-hero-gradient text-primary-foreground p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-yellow grid place-items-center text-foreground font-bold">K</div>
            <div className="flex-1">
              <div className="font-bold">{site.name} Support</div>
              <div className="text-xs text-primary-foreground/70">Replies on WhatsApp · usually within 10 min</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="opacity-80 hover:opacity-100"><X className="h-5 w-5" /></button>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-auto">
            <div className="text-sm bg-secondary rounded-2xl rounded-tl-sm px-3 py-2 inline-block">
              👋 Hi! Pick a question or type your own — we'll continue on WhatsApp.
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button key={q} onClick={() => send("wa", q)} className="text-xs rounded-full border border-border px-3 py-1.5 hover:bg-secondary transition">
                  {q}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send("wa"); }} className="border-t border-border p-3 flex items-center gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm outline-none focus:border-ring"
            />
            <button type="button" onClick={() => send("email")} aria-label="Email" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:bg-secondary">
              <Mail className="h-4 w-4" />
            </button>
            <button type="submit" aria-label="Send" className="h-9 w-9 grid place-items-center rounded-full bg-brand-red text-destructive-foreground">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full bg-brand-red text-destructive-foreground grid place-items-center shadow-glow hover:scale-105 transition"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
