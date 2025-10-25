// src/components/ConsultationForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Check, 
  Star, 
  Clock, 
  Users,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import useAutoScrollToTop from '@/hooks/useAutoScrollToTop';


const ConsultationForm = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const { t } = useTranslation();
    useAutoScrollToTop();
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    package: "",
    budget: "",
    timeline: "",
    fullName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    projectType: "",
    projectDescription: "",
    targetAudience: "",
    competitors: "",
    specialRequirements: ""
  });

  const packages = [
    {
      id: "basic",
      name: t('consultation.packages.basic.name', "Paket Basic"),
      price: t('consultation.packages.basic.price', "Rp 8.000.000"),
      description: t('consultation.packages.basic.description', "Cocok untuk bisnis kecil yang membutuhkan website company profile sederhana"),
      features: [
        t('consultation.packages.basic.features.0', "Website 5-7 halaman"),
        t('consultation.packages.basic.features.1', "Design responsive"),
        t('consultation.packages.basic.features.2', "CMS dasar"),
        t('consultation.packages.basic.features.3', "Optimasi SEO dasar"),
        t('consultation.packages.basic.features.4', "Domain & hosting 1 tahun"),
        t('consultation.packages.basic.features.5', "Support 3 bulan")
      ],
      timeline: t('consultation.packages.basic.timeline', "2-3 minggu"),
      bestFor: t('consultation.packages.basic.bestFor', "Startup & UKM"),
      popular: false
    },
    {
      id: "medium",
      name: t('consultation.packages.medium.name', "Paket Professional"),
      price: t('consultation.packages.medium.price', "Rp 15.000.000"),
      description: t('consultation.packages.medium.description', "Solusi lengkap untuk bisnis growing dengan fitur e-commerce atau sistem custom"),
      features: [
        t('consultation.packages.medium.features.0', "Website hingga 15 halaman"),
        t('consultation.packages.medium.features.1', "Design custom premium"),
        t('consultation.packages.medium.features.2', "CMS advanced"),
        t('consultation.packages.medium.features.3', "E-commerce basic"),
        t('consultation.packages.medium.features.4', "Integrasi payment gateway"),
        t('consultation.packages.medium.features.5', "Optimasi SEO lengkap"),
        t('consultation.packages.medium.features.6', "Domain & hosting 1 tahun"),
        t('consultation.packages.medium.features.7', "Support 6 bulan"),
        t('consultation.packages.medium.features.8', "Analytics setup")
      ],
      timeline: t('consultation.packages.medium.timeline', "4-6 minggu"),
      bestFor: t('consultation.packages.medium.bestFor', "Perusahaan Menengah"),
      popular: true
    },
    {
      id: "custom",
      name: t('consultation.packages.custom.name', "Paket Enterprise"),
      price: t('consultation.packages.custom.price', "Custom"),
      description: t('consultation.packages.custom.description', "Solusi enterprise dengan fitur custom, skalabilitas tinggi, dan integrasi kompleks"),
      features: [
        t('consultation.packages.custom.features.0', "Website/app custom"),
        t('consultation.packages.custom.features.1', "UI/UX design khusus"),
        t('consultation.packages.custom.features.2', "Advanced e-commerce"),
        t('consultation.packages.custom.features.3', "Multi-payment gateway"),
        t('consultation.packages.custom.features.4', "API integration"),
        t('consultation.packages.custom.features.5', "Mobile responsive"),
        t('consultation.packages.custom.features.6', "Advanced security"),
        t('consultation.packages.custom.features.7', "Performance optimization"),
        t('consultation.packages.custom.features.8', "Dedicated support 1 tahun"),
        t('consultation.packages.custom.features.9', "Training tim")
      ],
      timeline: t('consultation.packages.custom.timeline', "8-12+ minggu"),
      bestFor: t('consultation.packages.custom.bestFor', "Perusahaan Besar"),
      popular: false
    }
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setFormData(prev => ({
      ...prev,
      package: packageId,
      budget: packages.find(p => p.id === packageId)?.price || "",
      timeline: packages.find(p => p.id === packageId)?.timeline || ""
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedPackage) {
      toast({
        title: t('consultation.toast.select_package.title', "Pilih Paket"),
        description: t('consultation.toast.select_package.description', "Silakan pilih salah satu paket yang tersedia"),
        variant: "destructive"
      });
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: t('consultation.toast.success.title', "Permintaan Konsultasi Terkirim!"),
        description: t('consultation.toast.success.description', "Kami akan menghubungi Anda dalam 1x24 jam untuk diskusi lebih lanjut."),
      });
      
      // Reset form
      setStep(1);
      setSelectedPackage(null);
      setFormData({
        package: "",
        budget: "",
        timeline: "",
        fullName: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        projectType: "",
        projectDescription: "",
        targetAudience: "",
        competitors: "",
        specialRequirements: ""
      });
      
    } catch (error) {
      toast({
        title: t('consultation.toast.error.title', "Terjadi Kesalahan"),
        description: t('consultation.toast.error.description', "Silakan coba lagi beberapa saat"),
        variant: "destructive"
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme === "light" ? "bg-white" : "bg-black"}`}>
      <Navbar />
      
      <section className={`section-padding pt-20 transition-colors duration-700 ${theme === "light" ? "bg-white" : "bg-black"}`}>
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div 
              className="text-center mb-16"
              data-aos="fade-up"
            >
              <h2 className={`mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                {t('consultation.title')}
              </h2>
              <p className={`text-xl ${theme === "light" ? "text-gray-700" : "text-gray-300"} max-w-2xl mx-auto`}>
                {t('consultation.subtitle')}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-2xl mx-auto mb-12">
              {/* Progress Bar */}
              <div className={`w-full rounded-full h-2 mb-4 ${theme === "light" ? "bg-gray-200" : "bg-gray-800"}`}>
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' 
                  }}
                />
              </div>
              
              {/* Steps */}
              <div className="flex justify-between px-2 sm:px-4">
                {[
                  { number: 1, label: t('consultation.steps.step1'), short: t('consultation.steps.step1_short') },
                  { number: 2, label: t('consultation.steps.step2'), short: t('consultation.steps.step2_short') },
                  { number: 3, label: t('consultation.steps.step3'), short: t('consultation.steps.step3_short') }
                ].map((stepItem) => (
                  <div key={stepItem.number} className="flex flex-col items-center">
                    <div className={`flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      step >= stepItem.number
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent text-white shadow-glow'
                        : theme === "light"
                          ? 'bg-white border-gray-400 text-gray-600'
                          : 'bg-gray-900 border-gray-700 text-gray-400'
                    } w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base font-semibold`}>
                      {step > stepItem.number ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : stepItem.number}
                    </div>
                    <span className={`text-xs mt-2 text-center transition-all duration-300 ${
                      step >= stepItem.number ? 'text-blue-400 font-medium' : theme === "light" ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      <span className="hidden sm:inline">{stepItem.label}</span>
                      <span className="sm:hidden">{stepItem.short}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Package Selection */}
            {step === 1 && (
              <div data-aos="fade-up">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`group relative rounded-2xl border-2 p-6 transition-all duration-300 hover:scale-105 cursor-pointer ${
                        selectedPackage === pkg.id
                          ? 'border-blue-500 bg-blue-500/10 shadow-glow'
                          : theme === "light"
                            ? 'border-gray-300 bg-white hover:border-blue-400'
                            : 'border-gray-700 bg-gray-900 hover:border-blue-500/50'
                      } ${pkg.popular ? 'ring-2 ring-blue-500/20' : ''}`}
                      onClick={() => handlePackageSelect(pkg.id)}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                            {t('consultation.most_popular')}
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center mb-6">
                        <h3 className={`text-xl font-bold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>{pkg.name}</h3>
                        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                          {pkg.price}
                        </div>
                        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                          {pkg.description}
                        </p>
                      </div>

                      <div className="space-y-3 mb-6">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
                            <span className={`text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`space-y-2 text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{t('consultation.timeline')}: {pkg.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{t('consultation.best_for')}: {pkg.bestFor}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Button 
                    size="lg" 
                    onClick={handleNextStep}
                    disabled={!selectedPackage}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-glow hover:shadow-glow transition-all duration-300 font-semibold px-8"
                  >
                    {t('consultation.next_to_personal')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {step === 2 && (
              <div data-aos="fade-up">
                <div className="max-w-2xl mx-auto">
                  <div className={`rounded-2xl p-8 ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-900 border-gray-700"} border`}>
                    <h3 className={`text-2xl font-bold mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('consultation.personal_info_title')}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="fullName" className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                          {t('consultation.name_label')} *
                        </label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder={t('consultation.name_placeholder')}
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                          {t('consultation.email_label')} *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t('consultation.email_placeholder')}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                          {t('consultation.phone_label')} *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder={t('consultation.phone_placeholder')}
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="company" className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                          {t('consultation.company_label')}
                        </label>
                        <Input
                          id="company"
                          name="company"
                          placeholder={t('consultation.company_placeholder')}
                          value={formData.company}
                          onChange={handleInputChange}
                          className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"}`}
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-2">
                        <label htmlFor="position" className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                          {t('consultation.position_label')}
                        </label>
                        <Input
                          id="position"
                          name="position"
                          placeholder={t('consultation.position_placeholder')}
                          value={formData.position}
                          onChange={handleInputChange}
                          className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"}`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
                      <Button 
                        variant="outline" 
                        onClick={handlePrevStep}
                        className={`flex items-center gap-2 ${theme === "light" ? "border-gray-400 text-gray-700 hover:bg-gray-100" : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"}`}
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {t('common.previous')}
                      </Button>
                      <Button 
                        onClick={handleNextStep}
                        disabled={!formData.fullName || !formData.email || !formData.phone}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 font-semibold"
                      >
                        {t('consultation.next_to_project')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Project Details */}
            {step === 3 && (
              <div data-aos="fade-up">
                <div className="max-w-4xl mx-auto">
                  <div className={`rounded-2xl p-8 ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-900 border-gray-700"} border`}>
                    <h3 className={`text-2xl font-bold mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('consultation.project_details_title')}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="projectType" className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                            {t('consultation.project_type_label')} *
                          </label>
                          <Input
                            id="projectType"
                            name="projectType"
                            placeholder={t('consultation.project_type_placeholder')}
                            value={formData.projectType}
                            onChange={handleInputChange}
                            required
                            className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"}`}
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="targetAudience" className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                            {t('consultation.target_audience_label')}
                          </label>
                          <Input
                            id="targetAudience"
                            name="targetAudience"
                            placeholder={t('consultation.target_audience_placeholder')}
                            value={formData.targetAudience}
                            onChange={handleInputChange}
                            className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"}`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="projectDescription" className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                          {t('consultation.message_label')} *
                        </label>
                        <Textarea
                          id="projectDescription"
                          name="projectDescription"
                          placeholder={t('consultation.message_placeholder')}
                          value={formData.projectDescription}
                          onChange={handleInputChange}
                          required
                          className={`min-h-[120px] resize-none ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="competitors" className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                          {t('consultation.competitors_label')}
                        </label>
                        <Textarea
                          id="competitors"
                          name="competitors"
                          placeholder={t('consultation.competitors_placeholder')}
                          value={formData.competitors}
                          onChange={handleInputChange}
                          className={`min-h-[80px] resize-none ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="specialRequirements" className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                          {t('consultation.special_requirements_label')}
                        </label>
                        <Textarea
                          id="specialRequirements"
                          name="specialRequirements"
                          placeholder={t('consultation.special_requirements_placeholder')}
                          value={formData.specialRequirements}
                          onChange={handleInputChange}
                          className={`min-h-[80px] resize-none ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"}`}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevStep}
                          className={`flex items-center gap-2 ${theme === "light" ? "border-gray-400 text-gray-700 hover:bg-gray-100" : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"}`}
                        >
                          <ArrowLeft className="h-4 w-4" />
                          {t('common.previous')}
                        </Button>
                        <Button 
                          type="submit"
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-glow hover:shadow-glow transition-all duration-300 font-semibold px-8"
                        >
                          {t('consultation.submit_button')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* Selected Package Summary */}
                  <div className={`mt-8 rounded-2xl p-6 ${theme === "light" ? "bg-gray-100 border-gray-200" : "bg-gray-900/50 border-gray-700"} border`}>
                    <h3 className={`font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('consultation.selected_package_summary')}
                    </h3>
                    {selectedPackage && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <div className="font-semibold text-blue-400">
                            {packages.find(p => p.id === selectedPackage)?.name}
                          </div>
                          <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                            {t('consultation.budget')}: {formData.budget} • {t('consultation.timeline')}: {formData.timeline}
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setStep(1)}
                          className={`${theme === "light" ? "border-gray-400 text-gray-700 hover:bg-gray-100" : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"}`}
                        >
                          {t('consultation.change_package')}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultationForm;