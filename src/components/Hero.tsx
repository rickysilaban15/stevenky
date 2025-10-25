import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowRight, ZoomIn, Trophy, Clock, Users, Star, X, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Orb from "./Orb";
import { useEffect, useRef, useState } from "react";
import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiPostgresql, SiGit, SiDocker, SiFigma } from "react-icons/si";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from 'react-i18next';
import PlaylistMusicPlayer from '../components/PlaylistMusicPlayer';
import useAutoScrollToTop from '@/hooks/useAutoScrollToTop';

const Hero: React.FC = () => {
  const [countedStats, setCountedStats] = useState({ projects: 0, experience: 0, clients: 0, quality: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const statsRef = useRef(null);
  const hasAnimated = useRef(false);
  const { theme } = useTheme();
  const { t } = useTranslation();
  useAutoScrollToTop();
  // Tech logos for LogoLoop
  const techLogos = [
    { node: <SiReact className="w-12 h-12 text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="w-12 h-12 text-white" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="w-12 h-12 text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss className="w-12 h-12 text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs className="w-12 h-12 text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiMongodb className="w-12 h-12 text-[#47A248]" />, title: "MongoDB", href: "https://mongodb.com" },
    { node: <SiPostgresql className="w-12 h-12 text-[#336791]" />, title: "PostgreSQL", href: "https://postgresql.org" },
    { node: <SiGit className="w-12 h-12 text-[#F05032]" />, title: "Git", href: "https://git-scm.com" },
    { node: <SiDocker className="w-12 h-12 text-[#2496ED]" />, title: "Docker", href: "https://docker.com" },
    { node: <SiFigma className="w-12 h-12 text-[#F24E1E]" />, title: "Figma", href: "https://figma.com" },
  ];

  // Updated featured projects to match PortfolioPage data
  const featuredProjects = [
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
      id: 4,
      title: t('portfolio.projects.toko_grosir_title'),
      category: "TypeScript",
      description: t('portfolio.projects.toko_grosir_desc'),
      image: "/img/belidisini.png",
      tags: ["React", "Node.js", "Supabase"],
      metrics: t('portfolio.projects.metrics.efficiency'),
      link: "https://belidisini.netlify.app/"
    }
  ];

  const services = [
    {
      icon: <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">WD</div>,
      title: t('hero.web_design_title'),
      description: t('hero.web_design_desc'),
      features: ["UI/UX Design", "Responsive Design", "Prototyping", "Design Systems"]
    },
    {
      icon: <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">FS</div>,
      title: t('hero.fullstack_title'),
      description: t('hero.fullstack_desc'),
      features: ["React/Next.js", "Node.js", "Database", "API Integration"]
    },
    {
      icon: <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">CE</div>,
      title: t('hero.consulting_title'),
      description: t('hero.consulting_desc'),
      features: ["Tech Audit", "Digital Strategy", "Performance Optimization", "SEO"]
    }
  ];

  const openImageModal = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };
  
  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Animated Counter Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const animateValue = (start: number, end: number, duration: number, setter: (value: number) => void) => {
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              setter(Math.floor(progress * (end - start) + start));
              if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
          };

          animateValue(0, 15, 2000, (v) => setCountedStats(prev => ({...prev, projects: v})));
          animateValue(0, 2, 2000, (v) => setCountedStats(prev => ({...prev, experience: v})));
          animateValue(0, 10, 2000, (v) => setCountedStats(prev => ({...prev, clients: v})));
          animateValue(0, 100, 2000, (v) => setCountedStats(prev => ({...prev, quality: v})));
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Main Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          <Orb
            hoverIntensity={0.4}
            rotateOnHover={true}
            hue={200}
            forceHoverState={false}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
        
        <div className="container-custom relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900/70 backdrop-blur-sm text-sm"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-gray-300">{t('hero.available')}</span>
            </div>

            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight leading-tight"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                {t('hero.title')}
              </span>
            </h1>

            <p
              className="text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                     max-w-3xl mx-auto leading-snug font-extralight tracking-widest drop-shadow-lg
                     text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {t('hero.name')}
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                <a 
                  href="/cv/CV_RICKY_STEVEN.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  download="Ricky-Steven-CV.pdf"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('hero.download_cv')}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-6 sm:px-8 border-2 border-gray-600 bg-transparent text-white hover:bg-gray-800 hover:border-gray-400"
              >
                <Link to="/consultation">{t('hero.discuss_project')}</Link>
              </Button>
            </div>

            <div 
              className="flex gap-3 sm:gap-4 justify-center pt-6 sm:pt-8"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <a
                href="https://github.com/rickysilaban15"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 transition-smooth group bg-gray-900/50 backdrop-blur-sm"
                aria-label="Github"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/ricky-steven-44a8a0292"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 transition-smooth group bg-gray-900/50 backdrop-blur-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform text-white" />
              </a>
              <a
                href="mailto:rickysilaban384@gmail.com"
                className="p-2 sm:p-3 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 transition-smooth group bg-gray-900/50 backdrop-blur-sm"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured-projects" className={`section-padding relative z-10 transition-colors duration-700 ${theme === "light" ? "bg-white" : "bg-black"}`}>
        <div className="container-custom">
          <div 
            className="text-center mb-12 sm:mb-16"
            data-aos="fade-up"
          >
            <h2 className={`mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              {t('hero.featured_projects_title')}
            </h2>
            <p className={`text-lg sm:text-xl ${theme === "light" ? "text-gray-700" : "text-gray-300"} max-w-2xl mx-auto`}>
              {t('hero.featured_projects_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative rounded-2xl overflow-hidden ${theme === "light" ? "bg-gray-100 border-gray-300" : "bg-gray-900 border-gray-700"} border hover:border-blue-500/50 transition-smooth hover-lift`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-800 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500 cursor-pointer"
                    onClick={() => openImageModal(project.image)}
                  />
                  {/* Zoom Icon Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <span className="inline-block px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
                    {project.category}
                  </span>
                  <h3 className={`text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-400 transition-smooth ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-3 sm:mb-4 line-clamp-2`}>
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded ${theme === "light" ? "bg-gray-200 text-gray-700" : "bg-gray-800 text-gray-300"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-400">
                      {project.metrics}
                    </span>
                    <div className="flex gap-2">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1 rounded ${theme === "light" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-800 text-gray-300 hover:bg-gray-700"} transition-colors`}
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => openImageModal(project.image)}
                        className={`p-1 rounded ${theme === "light" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-800 text-gray-300 hover:bg-gray-700"} transition-colors`}
                        aria-label="View Image"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div 
            className="text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className={`border-2 ${theme === "light" ? "border-gray-600 bg-transparent text-gray-800 hover:bg-gray-100 hover:border-gray-500" : "border-gray-400 bg-transparent text-white hover:bg-gray-800 hover:border-gray-300"} font-medium`}
            >
              <Link to="/portfolio" className="flex items-center gap-2">
                {t('hero.view_all_projects')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`section-padding relative z-10 transition-colors duration-700 ${theme === "light" ? "bg-gray-50" : "bg-black"}`}>
        <div className="container-custom">
          <div 
            className="text-center mb-12 sm:mb-16"
            data-aos="fade-up"
          >
            <h2 className={`mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              {t('hero.services_title')}
            </h2>
            <p className={`text-lg sm:text-xl ${theme === "light" ? "text-gray-700" : "text-gray-300"} max-w-2xl mx-auto`}>
              {t('hero.services_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group p-6 sm:p-8 rounded-2xl ${theme === "light" ? "bg-white border-gray-300" : "bg-gray-900 border-gray-700"} border hover:border-blue-500/50 transition-smooth hover-lift`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start gap-4 mb-4 sm:mb-6">
                  {service.icon}
                  <h3 className={`text-xl sm:text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>{service.title}</h3>
                </div>
                <p className={`${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base`}>
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      <span className={theme === "light" ? "text-gray-700" : "text-gray-300"}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Logos */}
      <section className={`py-16 relative z-10 border-t border-b transition-colors duration-700 ${theme === "light" ? "bg-gray-100 border-gray-300" : "bg-black border-gray-800"}`}>
        <div className="container-custom">
          <div 
            className="text-center mb-12"
            data-aos="fade-up"
          >
            <h3 className={`text-xl font-semibold ${theme === "light" ? "text-gray-800" : "text-gray-300"} mb-4`}>
              {t('technologies')}
            </h3>
          </div>
          <div 
            className="relative h-24 overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={48}
              gap={60}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor={theme === "light" ? "#f3f4f6" : "#000000"}
              ariaLabel="Technology stack"
            />
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <section ref={statsRef} className={`section-padding relative z-10 transition-colors duration-700 ${theme === "light" ? "bg-white" : "bg-black"}`}>
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { 
                icon: <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />, 
                number: `${countedStats.projects}+`, 
                label: t('stats.projects')
              },
              { 
                icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6" />, 
                number: `${countedStats.experience}+`, 
                label: t('stats.experience')
              },
              { 
                icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />, 
                number: `${countedStats.clients}+`, 
                label: t('stats.clients')
              },
              { 
                icon: <Star className="h-5 w-5 sm:h-6 sm:w-6" />, 
                number: `${countedStats.quality}%`, 
                label: t('stats.quality')
              }
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className={`text-center p-4 sm:p-6 rounded-2xl ${theme === "light" ? "bg-gray-100 border-gray-300" : "bg-gray-900 border-gray-700"} border hover:border-blue-500/30 transition-smooth group`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center mb-3 sm:mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className={`text-xs sm:text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-medium`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={`section-padding relative z-10 transition-colors duration-700 ${theme === "light" ? "bg-gray-50" : "bg-black"}`}>
        <div className="container-custom">
          <div 
            className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8"
            data-aos="fade-up"
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              {t('hero.cta_title')}
            </h2>
            <p className={`text-lg sm:text-xl ${theme === "light" ? "text-gray-700" : "text-gray-300"} max-w-2xl mx-auto`}>
              {t('hero.cta_desc')}
            </p>
            
            <div className={`border-t ${theme === "light" ? "border-gray-300" : "border-gray-700"} pt-6 mb-4`}></div>
            
            <div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Button asChild size="lg" className="text-base px-6 sm:px-8 shadow-glow bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold">
                <Link to="/consultation">{t('hero.start_conversation')}</Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className={`text-base px-6 sm:px-8 border-2 ${theme === "light" ? "border-gray-600 bg-transparent text-gray-800 hover:bg-gray-100 hover:border-gray-500" : "border-gray-400 bg-transparent text-white hover:bg-gray-800 hover:border-gray-300"} font-medium`}
              >
                <Link to="/portfolio">{t('hero.view_portfolio')}</Link>
              </Button>
            </div>
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
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Project preview"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-fade-in"
              />
            </div>
            
            {/* Image Info */}
            <div className="mt-4 text-center">
              <p className="text-white/70 text-sm">
                {t('hero.modal_hint')}
              </p>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Hero;