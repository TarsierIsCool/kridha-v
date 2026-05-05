import { site } from "@/lib/site";
import { Gift, Wallet } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
      <div className="rounded-3xl bg-yellow-gradient p-8 lg:p-12 grid lg:grid-cols-3 gap-8 items-center shadow-soft">
        <div className="lg:col-span-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <Gift className="h-3.5 w-3.5" /> Limited seats · {site.batch} Batch
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-extrabold text-foreground">
            One fee. <span className="underline decoration-brand-red decoration-4 underline-offset-4">Every track unlocked.</span>
          </h2>
          <p className="mt-3 text-foreground/80 max-w-xl">
            Pay once, choose your career path, and get full mentorship + placement support throughout the 6-month program.
          </p>
        </div>
        <div className="rounded-2xl bg-card p-6 text-center shadow-glow">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Course Fee</div>
          <div className="mt-1 text-5xl font-extrabold text-brand-red">₹{site.feeINR.toLocaleString("en-IN")}</div>
          <div className="text-xs text-muted-foreground mt-1">only · all-inclusive</div>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <Wallet className="h-4 w-4 text-brand-red" /> Easy EMI options available
          </div>
          <a href="#book" className="mt-5 inline-flex w-full justify-center rounded-full bg-brand-red text-destructive-foreground px-5 py-3 font-bold">
            Enroll Now →
          </a>
        </div>
      </div>
    </section>
  );
}
