import BlogCertificationSection from "./components/BlogCertificationSection";
import ExperienceSection from "./components/ExperienceSection";
import HeroSection from "./components/HeroSection";
import LifeJourneySection from "./components/LifeJourneySection";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ExperienceSection />
      <BlogCertificationSection />
      <ProjectsSection />
      <LifeJourneySection />
    </div>
  );
}