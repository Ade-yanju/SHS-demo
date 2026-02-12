import HeroSection from "./home/HeroSection";
import PopularTrades from "./home/PopularTrades";
import HowItWorks from "./home/HowItWorks";
import TrustSection from "./home/TrustSection";
import CTASection from "./home/CTASection";
import Footer from "./home/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularTrades />
      <HowItWorks />
      <TrustSection />
      <CTASection />
      <Footer />
    </>
  );
}
