import { createFileRoute } from "@tanstack/react-router";
import { CoursesPage } from "@/components/CoursesPage";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
});