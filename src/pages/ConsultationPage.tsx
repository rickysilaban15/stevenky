// src/pages/ConsultationPage.tsx
import ConsultationForm from "@/components/ConsultationForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ConsultationPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ConsultationForm />
    </div>
  );
};

export default ConsultationPage;