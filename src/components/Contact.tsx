import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Send, 
  Calendar, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Zap, 
  Users, 
  ExternalLink,
  Phone,
  CheckCircle,
  AlertCircle,
  Star,
  Sparkles,
  Globe,
  Briefcase,
  Award,
  Rocket,
  Target,
  TrendingUp,
  Shield,
  Headphones,
  FileText,
  ArrowRight
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import useAutoScrollToTop from '@/hooks/useAutoScrollToTop';

const Contact = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const { t } = useTranslation();
   useAutoScrollToTop();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: ""
  });

  const sendEmail = async (formData: any) => {
    // In a real implementation, you would use an email service like EmailJS, SendGrid, or a backend API
    // For this example, we'll simulate sending an email to rickysilaban384@gmail.com
    
    const emailData = {
      to: "rickysilaban384@gmail.com",
      from: formData.email,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">You've received a new message from your website</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #667eea; margin-top: 0;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Project Type:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.projectType}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 10px; vertical-align: top;">${formData.message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; text-align: center;">
              <p style="color: #666; font-size: 14px;">This message was sent from your website contact form.</p>
            </div>
          </div>
        </div>
      `
    };
    
    // Simulate API call to send email
    console.log("Sending email to rickysilaban384@gmail.com:", emailData);
    
    // In a real implementation, you would make an API call here
    // Example with EmailJS:
    // await emailjs.send('service_id', 'template_id', {
    //   to_email: 'rickysilaban384@gmail.com',
    //   from_name: formData.name,
    //   from_email: formData.email,
    //   message: formData.message,
    //   // other parameters
    // });
    
    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendEmail(formData);
      
      toast({
        title: t('contact.toast.success.title', "Pesan Terkirim!"),
        description: t('contact.toast.success.description', "Terima kasih sudah menghubungi saya. Saya akan membalas dalam 24 jam."),
      });
      
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: t('contact.toast.error.title', "Gagal Mengirim Pesan"),
        description: t('contact.toast.error.description', "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi."),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className={`section-padding -mt-16 md:-mt-20 transition-colors duration-700 ${theme === "light" ? "bg-white" : "bg-black"}`}>
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mr-3">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h2 className={`mb-0 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                {t('contact.title')}
              </h2>
            </div>
            <p className={`text-lg md:text-xl ${theme === "light" ? "text-gray-700" : "text-gray-300"} max-w-2xl mx-auto px-4`}>
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Magic Bento Grid - FIXED RESPONSIVE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
            
            {/* Main Contact Form - Span 2 columns on medium+ screens */}
            <div className={`sm:col-span-2 lg:col-span-2 rounded-2xl md:rounded-3xl ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-900 border-gray-700"} border p-6 md:p-8 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] group relative overflow-hidden`}>
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                    <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {t('contact.form_title')}
                  </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <Input
                        name="name"
                        placeholder={t('contact.name_placeholder')}
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"} text-sm md:text-base`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        name="email"
                        type="email"
                        placeholder={t('contact.email_placeholder')}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"} text-sm md:text-base`}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      name="company"
                      placeholder={t('contact.company_placeholder')}
                      value={formData.company}
                      onChange={handleChange}
                      className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"} text-sm md:text-base`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      name="projectType"
                      placeholder={t('contact.project_type_placeholder')}
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className={`h-12 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"} text-sm md:text-base`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea
                      name="message"
                      placeholder={t('contact.message_placeholder')}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={`min-h-[100px] md:min-h-[120px] resize-none ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500" : "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"} text-sm md:text-base`}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-glow hover:shadow-glow transition-all duration-300 h-12 text-sm md:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.send_button')}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Email Direct - Enhanced */}
            <div className={`rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-4 md:p-6 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] group min-h-[200px] md:min-h-0 relative overflow-hidden`}>
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full -mr-10 -mt-10"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="p-2 rounded-xl bg-blue-500 text-white shadow-lg">
                      <Mail className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <h3 className={`text-base md:text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('contact.email_direct_title', "Email Langsung")}
                    </h3>
                  </div>
                  <p className={`text-xs md:text-sm mb-3 md:mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                    {t('contact.email_direct_desc', "Untuk inquiry formal atau pertanyaan spesifik")}
                  </p>
                </div>
                <div>
                  <a
                    href="mailto:rickysilaban384@gmail.com"
                    className="text-blue-400 font-medium hover:text-blue-300 transition-colors text-sm md:text-lg block mb-1 md:mb-2 break-all"
                  >
                    rickysilaban384@gmail.com
                  </a>
                  <div className={`flex items-center gap-2 text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                    <Clock className="h-3 w-3" />
                    <span>{t('contact.response_time', "Response: 24 jam")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct - New */}
            <div className={`rounded-2xl md:rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-4 md:p-6 hover:border-green-500/50 transition-all duration-500 hover:scale-[1.02] group min-h-[200px] md:min-h-0 relative overflow-hidden`}>
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full -mr-10 -mt-10"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="p-2 rounded-xl bg-green-500 text-white shadow-lg">
                      <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <h3 className={`text-base md:text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('contact.whatsapp_direct_title', "WhatsApp Langsung")}
                    </h3>
                  </div>
                  <p className={`text-xs md:text-sm mb-3 md:mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                    {t('contact.whatsapp_direct_desc', "Untuk konsultasi cepat atau pertanyaan mendesak")}
                  </p>
                </div>
                <div>
                  <a
                    href="https://wa.me/6287818894504"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 font-medium hover:text-green-300 transition-colors text-sm md:text-lg block mb-1 md:mb-2"
                  >
                    +62 878-1889-4504
                  </a>
                  <div className={`flex items-center gap-2 text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                    <Zap className="h-3 w-3" />
                    <span>{t('contact.instant_response', "Response: Instan")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Meeting - Enhanced */}
            <div className={`rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-4 md:p-6 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] group min-h-[200px] md:min-h-0 relative overflow-hidden`}>
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full -mr-10 -mt-10"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="p-2 rounded-xl bg-purple-500 text-white shadow-lg">
                      <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <h3 className={`text-base md:text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('contact.discovery_call_title', "Discovery Call")}
                    </h3>
                  </div>
                  <p className={`text-xs md:text-sm mb-3 md:mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                    {t('contact.discovery_call_desc', "30 menit call gratis untuk diskusi project")}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className={`w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 text-sm md:text-base h-10`}
                  onClick={() => window.open('https://calendly.com/yourusername', '_blank')}
                >
                  {t('contact.schedule_button', "Pilih Jadwal")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Location & Timezone - Enhanced */}
            <div className={`rounded-2xl md:rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-4 md:p-6 hover:border-green-500/50 transition-all duration-500 hover:scale-[1.02] group min-h-[200px] md:min-h-0 relative overflow-hidden`}>
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full -mr-10 -mt-10"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="p-2 rounded-xl bg-green-500 text-white shadow-lg">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <h3 className={`text-base md:text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('contact.location_title', "Lokasi")}
                    </h3>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className={`text-xs md:text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                      {t('contact.location_address', "Jakarta, Indonesia")}
                    </p>
                    <p className={`text-xs md:text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                      {t('contact.timezone', "GMT+7 (WIB)")}
                    </p>
                  </div>
                </div>
                <div className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                  {t('contact.remote_collaboration', "Remote collaboration available")}
                </div>
              </div>
            </div>

            {/* Availability Status - Enhanced */}
            <div className={`rounded-2xl md:rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 p-4 md:p-6 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] group min-h-[200px] md:min-h-0 relative overflow-hidden`}>
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full -mr-10 -mt-10"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="p-2 rounded-xl bg-orange-500 text-white shadow-lg">
                      <Zap className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <h3 className={`text-base md:text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('contact.status_title', "Status")}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 font-medium text-xs md:text-sm">
                      {t('contact.available', "Available")}
                    </span>
                  </div>
                  <p className={`text-xs md:text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                    {t('contact.availability_desc', "Membuka slot untuk 2-3 project baru")}
                  </p>
                </div>
                <div className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                  {t('contact.fast_response', "Fast response guaranteed")}
                </div>
              </div>
            </div>

            {/* Response Time - Enhanced */}
            <div className={`rounded-2xl md:rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-4 md:p-6 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] group min-h-[200px] md:min-h-0 relative overflow-hidden`}>
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full -mr-10 -mt-10"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="p-2 rounded-xl bg-cyan-500 text-white shadow-lg">
                      <Clock className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <h3 className={`text-base md:text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('contact.response_time_title', "Response Time")}
                    </h3>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
                        {t('contact.email_label', "Email")}:
                      </span>
                      <span className="text-cyan-400">≤ 24 {t('contact.hours', "jam")}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
                        {t('contact.project_inquiry', "Project Inquiry")}:
                      </span>
                      <span className="text-cyan-400">≤ 12 {t('contact.hours', "jam")}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
                        {t('contact.urgent', "Urgent")}:
                      </span>
                      <span className="text-cyan-400">≤ 6 {t('contact.hours', "jam")}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                  {t('contact.average_response', "Average response time")}
                </div>
              </div>
            </div>

            {/* Google Maps Card - Span 3 columns on all screens - Enhanced */}
            <div className={`col-span-1 sm:col-span-2 lg:col-span-3 rounded-2xl md:rounded-3xl ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-900 border-gray-700"} border overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] group relative`}>
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10 p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <h3 className={`text-lg md:text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('contact.my_location', "Lokasi Saya")}
                    </h3>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Kost+Bu+Nurul,Jakarta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-sm ${theme === "light" ? "text-blue-600 hover:text-blue-700" : "text-blue-400 hover:text-blue-300"} transition-colors`}
                  >
                    {t('contact.open_in_maps', "Buka di Maps")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                
                {/* Map Container - Menggunakan iframe yang Anda berikan */}
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7808446650574!2d106.866237772414!3d-6.292508076051113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f2874a6d66db%3A0x66310acb50a197d2!2sKost%20Bu%20Nurul!5e0!3m2!1sid!2sid!4v1761207575804!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Kost Bu Nurul"
                    className="rounded-lg"
                  />
                </div>
                
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <p className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {t('contact.location_full', "Kost Bu Nurul, Jakarta")}
                    </p>
                    <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      {t('contact.timezone_full', "GMT+7 (WIB)")}
                    </p>
                  </div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                    {t('contact.remote_collaboration', "Remote collaboration available")}
                  </p>
                </div>
              </div>
            </div>

            {/* Collaboration Stats - Enhanced */}
            <div className={`sm:col-span-2 lg:col-span-3 rounded-2xl md:rounded-3xl ${theme === "light" ? "bg-gray-100 border-gray-200" : "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"} border p-4 md:p-6 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] group relative overflow-hidden`}>
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
                    <Users className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {t('contact.collaboration_stats', "Kolaborasi Stats")}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                  {[
                    { number: "15+", label: t('contact.stats.projects', "Projects"), icon: <Briefcase className="h-4 w-4" /> },
                    { number: "10+", label: t('contact.stats.happy_clients', "Happy Clients"), icon: <Users className="h-4 w-4" /> },
                    { number: "100%", label: t('contact.stats.success_rate', "Success Rate"), icon: <Target className="h-4 w-4" /> },
                    { number: "24/7", label: t('contact.stats.support', "Support"), icon: <Headphones className="h-4 w-4" /> }
                  ].map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className={`p-2 rounded-lg ${theme === "light" ? "bg-blue-100 text-blue-600" : "bg-blue-900/30 text-blue-400"}`}>
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                        {stat.number}
                      </div>
                      <div className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials - Fixed */}
            <div className={`sm:col-span-2 lg:col-span-3 rounded-2xl md:rounded-3xl ${theme === "light" ? "bg-gray-100 border-gray-200" : "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"} border p-4 md:p-6 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] group relative overflow-hidden`}>
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/10 to-red-500/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg">
                    <Star className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {t('contact.testimonials')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {t('contact.testimonial_data', { returnObjects: true }).map((testimonial: any, index: number) => (
                    <div key={index} className={`p-4 rounded-xl ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"} border`}>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className={`text-sm mb-3 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                        "{testimonial.message}"
                      </p>
                      <div>
                        <p className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                          {testimonial.name}
                        </p>
                        <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Additional Info - Enhanced */}
          <div className="text-center mt-8 md:mt-12 px-4">
            <div className={`inline-flex items-center gap-2 p-3 rounded-full ${theme === "light" ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-800"} border`}>
              <Sparkles className="h-4 w-4 text-blue-500" />
              <p className={`text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                {t('contact.additional_info', "Semua inquiry akan direspons secara personal. Tidak ada automated responses.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;