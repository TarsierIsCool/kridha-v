import { Link } from "@tanstack/react-router";
import { site } from "@/lib/site";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "#courses", label: "Courses" },
  { href: "#features", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
  { href: "#book", label: "Book Demo" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-hero-gradient grid place-items-center text-primary-foreground font-bold">K</div>
          <div className="leading-tight">
            <div className="font-display font-bold text-foreground">{site.name}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{site.tagline}</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition">
              {l.label}
            </a>
          ))}
          <a href="#book" className="inline-flex items-center rounded-full bg-brand-red text-destructive-foreground px-5 py-2 text-sm font-semibold shadow-soft hover:opacity-90 transition">
            Enroll Now
          </a>
          {user ? (
            <button onClick={signOut} className="text-sm text-muted-foreground hover:text-foreground" title={user.email ?? ""}>
              Sign out
            </button>
          ) : (
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
          )}
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-5 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-foreground">
                {l.label}
              </a>
            ))}
            <a href="#book" onClick={() => setOpen(false)} className="inline-flex justify-center rounded-full bg-brand-red text-destructive-foreground px-5 py-2 text-sm font-semibold">
              Enroll Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
