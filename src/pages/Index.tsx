import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Ingredients from "@/components/Ingredients";
import Testimonials from "@/components/Testimonials";
// import BeforeAfter from "@/components/BeforeAfter"; // Removed — re-enable if needed
// import InstagramFeed from "@/components/InstagramFeed"; // Commented out — re-enable when Instagram is ready
import FAQSection from "@/components/FAQSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="overflow-x-hidden">
    <Navbar />
    <Hero />
    <About />
    <Benefits />
    <Ingredients />
    <Testimonials />
    {/* <BeforeAfter /> */}{/* Removed — re-enable if needed */}
    {/* <InstagramFeed /> */}{/* Commented out — re-enable when Instagram (@theessentialcure) is ready */}
    <FAQSection />
    <Contact />
    <Footer />
  </div>
);

export default Index;
