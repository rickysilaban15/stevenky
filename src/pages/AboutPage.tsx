import About from "@/components/About";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <About />
      </div>
      
    </div>
  );
};

export default AboutPage;
