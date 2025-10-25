import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Filter, X, ZoomIn, Code, Database, Globe, Server, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import useAutoScrollToTop from '@/hooks/useAutoScrollToTop';

const PortfolioPage = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  useAutoScrollToTop();
  // State untuk expanded descriptions
  const [expandedDescriptions, setExpandedDescriptions] = useState<{[key: number]: boolean}>({});
  
  // --- Kategori Filter Berdasarkan Bahasa Pemrograman ---
  const categories = [
    t('portfolio.filter_all'),
    t('portfolio.filter_typescript'),
    t('portfolio.filter_python'),
    t('portfolio.filter_php'),
    t('portfolio.filter_html')
  ];
  
  const [activeCategory, setActiveCategory] = useState(t('portfolio.filter_all'));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Reset activeCategory ketika bahasa berubah
  useEffect(() => {
    setActiveCategory(t('portfolio.filter_all'));
  }, [i18n.language, t]);

  // --- Data Proyek ---
  // Pastikan semua link dan gambar sudah benar
  const projects = [
    {
      id: 1,
      title: t('portfolio.projects.toko_sepatu_title'),
      category: "PHP",
      description: t('portfolio.projects.toko_sepatu_desc'),
      image: "/img/verscon.png",
      tags: ["php-native", "Bootstrap", "MySQL"],
      metrics: t('portfolio.projects.metrics.conversion'),
      link: "http://sneakers.my.id/" 
    },
    {
      id: 2,
      title: t('portfolio.projects.company_profile_title'),
      category: "TypeScript",
      description: t('portfolio.projects.company_profile_desc'),
      image: "/img/harrasih.png",
      tags: ["Typescript", "React", "TailwindCSS"],
      metrics: t('portfolio.projects.metrics.engagement'),
      link: "https://harrasih.vercel.app/" 
    },
    {
      id: 3,
      title: t('portfolio.projects.coffe_shop_title'),
      category: "PHP",
      description: t('portfolio.projects.coffe_shop_desc'),
      image: "/img/silabancoffe.png",
      tags: ["Php CI5", "MySql", "Bootstrap"],
      metrics: t('portfolio.projects.metrics.inquiries'),
      link: "https://silabancoffee.gt.tc/" 
    },
    {
      id: 4,
      title: t('portfolio.projects.toko_grosir_title'),
      category: "TypeScript",
      description: t('portfolio.projects.toko_grosir_desc'),
      image: "/img/belidisini.png",
      tags: ["React", "Node.js", "Supabase"],
      metrics: t('portfolio.projects.metrics.efficiency'),
      link: "https://belidisini.netlify.app/" 
    },
    {
      id: 5,
      title: t('portfolio.projects.desa_wisata_title'),
      category: "TypeScript",
      description: t('portfolio.projects.desa_wisata_desc'),
      image: "/img/tarutung.png",
      tags: ["Typescript", "React", "TailwindCSS"],
      metrics: t('portfolio.projects.metrics.rating'),
      link: "https://wisata-tarutung.vercel.app/" 
    },
    {
      id: 6,
      title: t('portfolio.projects.portfolio_personal_title'),
      category: "Typescript",
      description: t('portfolio.projects.portfolio_personal_desc'),
      image: "/img/porto.png",
      tags: ["Express", "TailwindCSS", "vite"],
      metrics: t('portfolio.projects.metrics.organic_traffic'),
      link: "https://example.com/corporate-website" 
    },
    {
      id: 7, 
      title: t('portfolio.projects.analisis_data_title'),
      category: "Python",
      description: t('portfolio.projects.analisis_data_desc'),
      image: "/img/analisis.png", 
      tags: ["Python", "Pandas", "Plotly", "Anaconda"],
      metrics: t('portfolio.projects.metrics.real_time_data'),
      link: "https://clustering-datamining-ri.streamlit.app/" 
    },
    {
      id: 8, 
      title: t('portfolio.projects.system_antrian_title'),
      category: "TypeScript",
      description: t('portfolio.projects.system_antrian_desc'),
      image: "/img/antrian.png", 
      tags: ["typescript", "TailwindCSS", "React", "Vite"],
      metrics: t('portfolio.projects.metrics.rating'),
      link: "http://bankmsk.created.app/" 
    },
     {
      id: 9, 
      title: t('portfolio.projects.resto_silaban_title'),
      category: "PHP",
      description: t('portfolio.projects.resto_silaban_desc'),
      image: "/img/cafee.png", 
      tags: ["Php Ci5", "BootStrap", "MySql",],
      metrics: t('portfolio.projects.metrics.rating'),
      link: "https://rickysilaban15.github.io/my-resto/"
    },
     {
      id: 10, 
      title: t('portfolio.projects.coffe_shop_clone_title'),
      category: "HTML",
      description: t('portfolio.projects.coffe_shop_clone_desc'),
      image: "/img/coffe.png", 
      tags: ["HTML", "CSS", "Javascript", "Php"],
      metrics: t('portfolio.projects.metrics.rating'),
      link: "https://rickysilaban15.github.io/clone-ngopi/" 
    },
     {
      id: 11, 
      title: t('portfolio.projects.dashboard_resto_title'),
      category: "Python",
      description: t('portfolio.projects.dashboard_resto_desc'),
      image: "/img/resto-desktop.png", 
      tags: ["Python", "Tkinter", "Plotly", "Sqlite"],
      metrics: t('portfolio.projects.metrics.real_time_data'),
      link: "https://example.com/python-dashboard" 
    },
     {
      id: 12, 
      title: t('portfolio.projects.system_perpus_title'),
      category: "PHP",
      description: t('portfolio.projects.system_perpus_desc'),
      image: "/img/perpustakaan.png", 
      tags: ["Php", "BootStrap", "HTML", "MySql"],
      metrics: t('portfolio.projects.metrics.rating'),
      link: "https://ricky-perpustakaan.kesug.com"
    },
     {
      id: 13, 
      title: t('portfolio.projects.topup_game_title'),
      category: "TypeScript",
      description: t('portfolio.projects.topup_game_desc'),
      image: "/img/topsky.png", 
      tags: ["Typescript", "Tailwind", "NodeJS", "Express"],
      metrics: t('portfolio.projects.metrics.real_time_data'),
      link: "https://topsky.vercel.app" 
    },
     {
      id: 14, 
      title: t('portfolio.projects.absensi_desktop_title'),
      category: "Python",
      description: t('portfolio.projects.absensi_desktop_desc'),
      image: "/img/absen.png",
      tags: ["Python", "Pandas", "SqLite", "TkkBootStrap"],
      metrics: t('portfolio.projects.metrics.real_time_data'),
      link: "https://example.com/python-dashboard" 
    },
     {
      id: 15, 
      title: t('portfolio.projects.keuangan_title'),
      category: "TypeScript",
      description: t('portfolio.projects.keuangan_desc'),
      image: "/img/tabunganku.png", 
      tags: ["Typescript", "TailwindCSS", "Supabase"],
      metrics: t('portfolio.projects.metrics.real_time_data'),
      link: "https://tabunganku-beta.vercel.app/" 
    }
  ];

  // Filter projects berdasarkan kategori
  const filteredProjects = activeCategory === t('portfolio.filter_all') 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const openImageModal = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Fungsi untuk toggle expanded description
  const toggleDescription = (projectId: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // --- Fungsi untuk mendapatkan ikon berdasarkan kategori ---
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "TypeScript": return <Code className="h-4 w-4" />;
      case "Python": return <Database className="h-4 w-4" />;
      case "PHP": return <Server className="h-4 w-4" />;
      case "HTML": return <Globe className="h-4 w-4" />;
      default: return <Filter className="h-4 w-4" />;
    }
  };

  // Fungsi untuk membuka WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = "+6287818894504";
    const message = "Halo, saya tertarik dengan layanan Anda. Bisa kita diskusikan projectnya?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme === "light" ? "bg-white" : "bg-black"}`}>
      <Navbar />
      <section className="section-padding pt-20">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className={`mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              {t('portfolio.title')}
            </h2>
            <p className={`text-xl ${theme === "light" ? "text-gray-700" : "text-gray-300"} max-w-2xl mx-auto`}>
              {t('portfolio.subtitle')}
            </p>
          </div>

          {/* --- KETERANGAN TAMBAHAN --- */}
          <div className="text-center mb-12 max-w-4xl mx-auto" data-aos="fade-up">
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400`}>
              {t('portfolio.approach_title')}
            </h3>
            <p className={`text-lg ${theme === "light" ? "text-gray-600" : "text-gray-400"} leading-relaxed`}>
              {t('portfolio.approach_description')}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-slow">
            <div className={`flex items-center gap-2 text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              <Filter className="h-4 w-4" />
              <span>{t('common.filter')}:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={`transition-smooth flex items-center gap-2 ${
                  activeCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : theme === "light"
                      ? 'border-gray-400 text-gray-700 hover:bg-gray-100'
                      : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {getCategoryIcon(category)}
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className={`group relative rounded-2xl overflow-hidden ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-900 border-gray-700"} border hover:border-blue-500/50 transition-smooth hover-lift`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Project Image */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-800 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500 cursor-pointer"
                    loading="lazy"
                    onClick={() => openImageModal(project.image)}
                  />
                  {/* Zoom Icon Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  {/* Category Badge */}
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </span>

                  {/* Title & Description */}
                  <div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-blue-400 transition-smooth ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {project.title}
                    </h3>
                    <div className="relative">
                      <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} ${
                        expandedDescriptions[project.id] ? '' : 'line-clamp-2'
                      }`}>
                        {project.description}
                      </p>
                      
                      {/* Tombol Lihat Selengkapnya */}
                      {project.description.length > 100 && (
                        <button
                          onClick={() => toggleDescription(project.id)}
                          className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                            theme === "light" 
                              ? "text-blue-600 hover:text-blue-700" 
                              : "text-blue-400 hover:text-blue-300"
                          } transition-colors`}
                        >
                          {expandedDescriptions[project.id] ? (
                            <>
                              {t('common.read_less')}
                              <ChevronUp className="h-3 w-3" />
                            </>
                          ) : (
                            <>
                              {t('common.read_more')}
                              <ChevronDown className="h-3 w-3" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded ${theme === "light" ? "bg-gray-200 text-gray-700 border-gray-300" : "bg-gray-800 text-gray-300 border-gray-600"} border`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics & CTA */}
                  <div className={`flex items-center justify-between pt-4 border-t ${theme === "light" ? "border-gray-200" : "border-gray-600"}`}>
                    <span className="text-sm font-semibold text-blue-400">
                      {project.metrics}
                    </span>
                    <div className="flex gap-2">
                      {/* Tombol Live Demo */}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 text-sm font-medium ${theme === "light" ? "text-gray-700 hover:text-blue-500" : "text-gray-300 hover:text-blue-400"} transition-smooth group/btn`}
                      >
                        {t('portfolio.live_demo')}
                        <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                      {/* Tombol Lihat Gambar */}
                      <button
                        onClick={() => openImageModal(project.image)}
                        className={`p-1 rounded ${theme === "light" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-800 text-gray-300 hover:bg-gray-700"} transition-colors`}
                        aria-label={t('portfolio.view_image_alt')}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 animate-fade-in-slow">
            <p className={`${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-6`}>
              {t('portfolio.cta_description')}
            </p>
            <Button 
              onClick={openWhatsApp}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              {t('about.contact_me')}
            </Button>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={t('common.close')}
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage}
                alt={t('portfolio.image_preview_alt')}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-fade-in"
              />
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-white/70 text-sm">
                {t('portfolio.modal_hint')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage; 