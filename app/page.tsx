import HeroSection from "@/components/sections/HeroSection";
import AboutMe from "@/components/sections/AboutMe";
import LifeGallery from "@/components/sections/LifeGallery";
import Finale from "@/components/sections/Finale";
export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <HeroSection></HeroSection>
      <AboutMe></AboutMe>
      <LifeGallery></LifeGallery>
      <Finale></Finale>
    </main>
  );
}
