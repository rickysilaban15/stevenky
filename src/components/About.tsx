import { Award, Code, Palette, Zap, GraduationCap, Calendar, Briefcase, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import PlaylistMusicPlayer from '../components/PlaylistMusicPlayer';
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiTailwindcss, SiLaravel, SiPython, SiMysql, SiGit } from "react-icons/si";
import { useEffect, useRef } from 'react';
import useAutoScrollToTop from '@/hooks/useAutoScrollToTop';

const About = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  useAutoScrollToTop(); 
  // Ref untuk scroll containers
  const educationScrollRef = useRef<HTMLDivElement>(null);
  const experienceScrollRef = useRef<HTMLDivElement>(null);
  
  // --- DATA PENDIDIKAN DARI TRANSLATION ---
  const educationHistory = [
    {
      level: t('about.education.university'),
      name: t('about.education.university_name'),
      degree: t('about.education.university_degree'),
      period: t('about.education.university_period'),
      description: t('about.education.university_description'),
      icon: <GraduationCap className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      level: t('about.education.high_school'),
      name: t('about.education.high_school_name'),
      degree: t('about.education.high_school_major'),
      period: t('about.education.high_school_period'),
      description: t('about.education.high_school_description'),
      icon: <GraduationCap className="w-4 h-4" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      level: t('about.education.junior_high'),
      name: t('about.education.junior_high_name'),
      degree: "",
      period: t('about.education.junior_high_period'),
      description: t('about.education.junior_high_description'),
      icon: <GraduationCap className="w-4 h-4" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      level: t('about.education.elementary'),
      name: t('about.education.elementary_name'),
      degree: "",
      period: t('about.education.elementary_period'),
      description: t('about.education.elementary_description'),
      icon: <GraduationCap className="w-4 h-4" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  // --- DATA PENGALAMAN KERJA DARI TRANSLATION ---
  const workExperience = [
    {
      position: t('about.experience.freelance_position'),
      company: t('about.experience.freelance_company'),
      period: t('about.experience.freelance_period'),
      description: t('about.experience.freelance_description'),
      icon: <Code className="w-4 h-4" />,
      color: "from-blue-500 to-purple-500",
      type: t('about.experience.freelance')
    },
    {
      position: t('about.experience.internship_position'),
      company: t('about.experience.internship_company'),
      period: t('about.experience.internship_period'),
      description: t('about.experience.internship_description'),
      icon: <Briefcase className="w-4 h-4" />,
      color: "from-green-500 to-teal-500",
      type: t('about.experience.internship')
    },
    {
      position: t('about.experience.construction_position'),
      company: t('about.experience.construction_company'),
      period: t('about.experience.construction_period'),
      description: t('about.experience.construction_description'),
      icon: <Briefcase className="w-4 h-4" />,
      color: "from-orange-500 to-amber-500",
      type: t('about.experience.construction')
    }
  ];

  // Tech Stack dengan Logo
  const techStack = [
    { name: "React", icon: <SiReact className="w-5 h-5" />, color: "text-[#61DAFB]" },
    { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5" />, color: "text-white dark:text-gray-900" },
    { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" />, color: "text-[#3178C6]" },
    { name: "Node.js", icon: <SiNodedotjs className="w-5 h-5" />, color: "text-[#339933]" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" />, color: "text-[#06B6D4]" },
    { name: "Laravel", icon: <SiLaravel className="w-5 h-5" />, color: "text-[#FF2D20]" },
    { name: "Python", icon: <SiPython className="w-5 h-5" />, color: "text-[#3776AB]" },
    { name: "SQL", icon: <SiMysql className="w-5 h-5" />, color: "text-[#4479A1]" },
    { name: "Git", icon: <SiGit className="w-5 h-5" />, color: "text-[#F05032]" },
    { name: "SEO", icon: <Search className="w-5 h-5" />, color: "text-[#0F9D58]" }
  ];

  // Smooth Scroll Component seperti LogoLoop
  const SmoothScrollLoop = ({ 
    items, 
    direction = 'left', 
    speed = 40,
    className = '' 
  }: { 
    items: any[]; 
    direction: 'left' | 'right'; 
    speed: number;
    className?: string;
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    
    // Duplikasi items untuk seamless loop
    const duplicatedItems = [...items, ...items, ...items];
    
    // Speed berdasarkan device - lebih cepat di mobile
    const getAdjustedSpeed = () => {
      const isMobile = window.innerWidth < 768;
      return isMobile ? speed * 0.6 : speed; // 40% lebih cepat di mobile
    };

    useEffect(() => {
      const element = scrollRef.current;
      if (!element) return;

      let animationId: number;
      let startTime: number | null = null;
      const duration = getAdjustedSpeed() * 1000; // Convert to milliseconds
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        
        // Reset animation when it completes
        if (progress >= 1) {
          startTime = timestamp;
          element.style.transform = 'translateX(0)';
        } else {
          const translateX = direction === 'left' 
            ? -progress * 100 
            : progress * 100;
          element.style.transform = `translateX(${translateX}%)`;
        }
        
        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationId);
      };
    }, [direction, speed]);

    return (
      <div className={`relative w-full overflow-hidden py-4 ${className}`}>
        <div 
          ref={scrollRef}
          className="flex"
          style={{ 
            width: `${(items.length * 3) * 25}%` // 3x duplication for seamless loop
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 mx-3 p-4 rounded-lg border min-w-[180px] ${
                theme === 'dark' 
                  ? 'bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:border-blue-400' 
                  : 'bg-white/80 backdrop-blur-sm border-gray-300 hover:border-blue-500 shadow-sm'
              } transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-sm mb-3 mx-auto`}>
                {item.icon}
              </div>
              <div className="text-center">
                <span className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {item.level || item.type}
                </span>
                <h3 className={`text-sm font-semibold mt-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.name || item.position}
                </h3>
                <h4 className={`text-xs ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                } mt-1`}>
                  {item.degree || item.company}
                </h4>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                } flex items-center justify-center gap-1 mt-1`}>
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                } mt-2 line-clamp-2 leading-tight`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Alternative: CSS-based animation (lebih smooth)
  const CSSScrollLoop = ({ 
    items, 
    direction = 'left',
    speed = 40 
  }: { 
    items: any[]; 
    direction: 'left' | 'right';
    speed: number;
  }) => {
    const duplicatedItems = [...items, ...items, ...items];
    const animationName = direction === 'left' ? 'smooth-scroll-left' : 'smooth-scroll-right';
    
    // Inject CSS untuk smooth animation
    useEffect(() => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes smooth-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-66.666%); }
        }
        @keyframes smooth-scroll-right {
          0% { transform: translateX(-66.666%); }
          100% { transform: translateX(0); }
        }
        .smooth-scroll-container {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `;
      document.head.appendChild(style);
      return () => { document.head.removeChild(style); };
    }, []);

    return (
      <div className="relative w-full overflow-hidden py-4">
        <div 
          className={`flex smooth-scroll-container`}
          style={{ 
            animationName: animationName,
            animationDuration: `${speed}s`,
            width: `${(items.length * 3) * 25}%`
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 mx-3 p-4 rounded-lg border min-w-[180px] ${
                theme === 'dark' 
                  ? 'bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:border-blue-400' 
                  : 'bg-white/80 backdrop-blur-sm border-gray-300 hover:border-blue-500 shadow-sm'
              } transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-sm mb-3 mx-auto`}>
                {item.icon}
              </div>
              <div className="text-center">
                <span className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {item.level || item.type}
                </span>
                <h3 className={`text-sm font-semibold mt-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.name || item.position}
                </h3>
                <h4 className={`text-xs ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                } mt-1`}>
                  {item.degree || item.company}
                </h4>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                } flex items-center justify-center gap-1 mt-1`}>
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                } mt-2 line-clamp-2 leading-tight`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const skills = [
    {
      category: t('about.skills.web_design'),
      items: [
        t('about.skills.uiux_design'),
        t('about.skills.visual_design'),
        t('about.skills.prototyping'),
        t('about.skills.design_systems')
      ],
      icon: Palette,
      color: "from-purple-500 to-pink-500"
    },
    {
      category: t('about.skills.frontend'),
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS"
      ],
      icon: Code,
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: t('about.skills.backend'),
      items: [
        "Node.js",
        "Laravel",
        "Python",
        "SQL Database"
      ],
      icon: Zap,
      color: "from-green-500 to-emerald-500"
    },
    {
      category: t('about.skills.soft_skills'),
      items: [
        t('about.skills.client_communication'),
        t('about.skills.project_management'),
        t('about.skills.problem_solving'),
        t('about.skills.team_collaboration')
      ],
      icon: Award,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      <Navbar />
      <section id="about" className={`section-padding -mt-16 md:-mt-20 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}>
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className={`mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{t('about.title')}</h2>
              <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('about.subtitle')}
              </p>
            </div>

            {/* Profile Card & Bio Section */}
            <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start" data-aos="fade-up">
              {/* Profile Photo Card */}
              <div className="lg:col-span-1">
                <div className={`group relative rounded-xl overflow-hidden border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-700 hover:border-blue-500/50' 
                    : 'bg-white border-gray-200 hover:border-blue-500/50 shadow-lg'
                }`}>
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <img src="/img/kikuk.jpg" alt="Profile Photo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{t('hero.name')}</h3>
                    <p className="text-blue-500 font-medium mb-2 text-sm">{t('hero.title')}</p>
                    <p className={`text-xs mb-3 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{t('about.tagline')}</p>
                    <div className={`grid grid-cols-3 gap-3 py-3 border-t ${
                      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div className="text-center">
                        <div className={`text-base font-bold transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>15+</div>
                        <div className={`text-xs transition-colors duration-300 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>{t('about.projects_completed')}</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-base font-bold transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>2+</div>
                        <div className={`text-xs transition-colors duration-300 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>{t('about.years_experience')}</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-base font-bold transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>10+</div>
                        <div className={`text-xs transition-colors duration-300 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>{t('about.happy_clients')}</div>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white mt-3 text-sm">
                      <Link to="/contact">{t('about.contact_me')}</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className="lg:col-span-2 space-y-4">
                <div className={`p-6 rounded-xl border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-700' 
                    : 'bg-white border-gray-200 shadow-lg'
                }`} data-aos="fade-up" data-aos-delay="100">
                  <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{t('about.journey_title')}</h3>
                  <div className={`space-y-3 leading-relaxed transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <p className="text-base">{t('about.description_1')}</p>
                    <p className="text-base">{t('about.description_2')}</p>
                    <p className="text-base">{t('about.description_3')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3" data-aos="fade-up" data-aos-delay="200">
                  {techStack.map((tech, index) => (
                    <div key={tech.name} className={`p-3 rounded-lg border text-center transition-colors duration-300 hover:scale-105 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600 hover:border-blue-400' 
                        : 'bg-gray-50 border-gray-300 hover:border-blue-500 shadow-sm hover:shadow-md'
                    }`}>
                      <div className={`${tech.color} mb-2 flex justify-center`}>{tech.icon}</div>
                      <div className={`text-xs font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{tech.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- SECTION PENDIDIKAN & PENGALAMAN DENGAN SMOOTH SCROLL --- */}
            <div className="mb-12">
              <div className="text-center mb-12" data-aos="fade-up">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 ${
                  theme === 'dark' ? '' : 'drop-shadow-lg'
                }`}>
                  {t('about.journey_section')}
                </h2>
                <p className={`text-base md:text-lg max-w-3xl mx-auto ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {t('about.journey_description')}
                </p>
              </div>

              {/* Pendidikan - Scroll ke KIRI dengan kecepatan 25s */}
              <div className="mb-10" data-aos="fade-up" data-aos-delay="100">
                <div className="text-center mb-6">
                  <h3 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400`}>
                    {t('about.education_section')}
                  </h3>
                  <div className="h-1 w-20 mx-auto bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2"></div>
                </div>
                <CSSScrollLoop items={educationHistory} direction="left" speed={25} />
              </div>

              {/* Pengalaman - Scroll ke KANAN dengan kecepatan 25s */}
              <div data-aos="fade-up" data-aos-delay="150">
                <div className="text-center mb-6">
                  <h3 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400`}>
                    {t('about.experience_section')}
                  </h3>
                  <div className="h-1 w-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2"></div>
                </div>
                <CSSScrollLoop items={workExperience} direction="right" speed={25} />
              </div>
            </div>

            {/* Skills Grid */}
            <div className="mb-12" data-aos="fade-up">
              <h3 className={`text-xl font-bold text-center mb-6 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{t('about.skills_title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skillGroup, index) => {
                  const Icon = skillGroup.icon;
                  return (
                    <div
                      key={skillGroup.category}
                      className={`group p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 hover:border-blue-500/50'
                          : 'bg-white border-gray-200 hover:border-blue-500/50 shadow-lg hover:shadow-xl'
                      }`}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${skillGroup.color} text-white shadow-md`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className={`text-base font-bold mb-1 transition-colors duration-300 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{skillGroup.category}</h3>
                          <p className={`text-xs transition-colors duration-300 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {skillGroup.items.slice(0, 2).join(", ")}...
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className={`px-2 py-1 rounded-full text-xs font-medium border transition-all duration-300 group-hover:bg-blue-500/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-500/30 ${
                              theme === 'dark'
                                ? 'bg-gray-800 text-gray-300 border-gray-600'
                                : 'bg-gray-100 text-gray-700 border-gray-300'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats Section */}
            <div className="mb-12" data-aos="fade-up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { number: "15+", label: t('about.projects_completed'), description: t('about.projects_description') },
                  { number: "10+", label: t('about.happy_clients'), description: t('about.clients_description') },
                  { number: "2+", label: t('about.years_experience'), description: t('about.experience_description') },
                  { number: "100%", label: t('about.quality_commitment'), description: t('about.quality_description') }
                ].map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className={`text-center p-3 rounded-xl border transition-all duration-300 group ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 hover:border-blue-500/30'
                        : 'bg-white border-gray-200 hover:border-blue-500/30 shadow-lg hover:shadow-xl'
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 mb-1 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className={`text-sm font-semibold mb-1 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{stat.label}</div>
                    <div className={`text-xs transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className={`text-center p-5 rounded-xl border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 to-black border-gray-700'
                : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-xl'
            }`} data-aos="fade-up">
              <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{t('about.cta_title')}</h3>
              <p className={`mb-3 max-w-2xl mx-auto text-xs transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('about.cta_description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm">
                  <Link to="/consultation">{t('hero.discuss_project')}</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className={`border transition-colors duration-300 text-sm ${
                  theme === 'dark'
                    ? 'border-gray-600 text-white hover:bg-gray-800 hover:border-gray-400'
                    : 'border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500'
                }`}>
                  <Link to="/portfolio">{t('hero.view_portfolio')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
