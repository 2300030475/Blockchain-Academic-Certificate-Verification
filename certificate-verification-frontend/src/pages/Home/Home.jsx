import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import AboutSection from "../../components/AboutSection/AboutSection";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";


function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <AboutSection />

      <HowItWorks />

      <Contact />

      <Footer />

      <ScrollToTop />
    </>
  );
}

export default Home;