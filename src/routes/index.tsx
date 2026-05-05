import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Courses } from "@/components/Courses";
import { Pricing } from "@/components/Pricing";
import { BookingSection } from "@/components/BookingSection";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kridha — Become a Tech Expert in 6 Months" },
      { name: "description", content: "Practical training in AI, Full Stack, Cloud, Data Science. 100% projects, placement support and industry certification. Admissions open for the 2026 batch." },
      { property: "og:title", content: "Kridha — Become a Tech Expert in 6 Months" },
      { property: "og:description", content: "AI · Full Stack · Cloud · Data Science. Mentor-led, project-first, outcome-driven." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Courses />
        <Pricing />
        <BookingSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
