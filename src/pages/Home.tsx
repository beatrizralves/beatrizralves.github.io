import { StarBackground } from "../components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { Navbar } from "../components/Navbar";
// import { useScrollSpyFromDOM } from "../hooks/useScrollSpyDOM";

export const Home = () => {
  //   useScrollSpyFromDOM();
  return (
    <div className="container-custom">
      <StarBackground></StarBackground>
      <Navbar></Navbar>
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
    </div>
  );
};
