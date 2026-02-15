import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import GallerySection from '@/components/GallerySection';
import QuotesSection from '@/components/QuotesSection';
import ContactSection from '@/components/ContactSection';
import ScrollProgress from '@/components/ScrollProgress';
import FilmGrain from '@/components/FilmGrain';
import ThreeDCarousel from '@/components/UpdateSection';

const Index = () => {
  return (
    <div className="relative">
      <FilmGrain />
      <ScrollProgress />

      <main>
        <HeroSection />
        <AboutSection />
        <ThreeDCarousel />
        <ProjectsSection />
        {/* <SkillsSection /> */}
        <GallerySection />
        <QuotesSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
