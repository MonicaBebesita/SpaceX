import NavigationBar from '../components/common/NavigationBar';
import Header from '../components/common/Header'; // Aunque la lógica del logo y menú principal irá en NavigationBar
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import BenefitsSection from '../components/home/BenefitsSection';
import CTASection from '../components/home/CTASection';
import NewsletterSection from '../components/common/NewsletterSection';
import FAQSection from '../components/home/FAQSection';
import DragonCarousel from '../components/home/DragonCarousel';
import Footer from '../components/common/Footer';

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans w-full">
      <NavigationBar />
      {/* La sección principal destacada se fusiona con el HeroSection para una estética más moderna */}
      <HeroSection /> 
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
      <NewsletterSection />
      <FAQSection />
      <DragonCarousel />
      <Footer />
    </div>
  );
};

export default HomePage;