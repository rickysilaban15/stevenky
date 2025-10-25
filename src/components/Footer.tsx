import { Github, Linkedin, Mail, Instagram, Facebook } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { TbBrandTiktok } from "react-icons/tb";

// Custom TikTok Icon karena Lucide tidak punya icon TikTok
const TiktokIcon = () => (
  <svg 
    className="h-5 w-5" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-3.77-1.105l-.001-.001z"/>
  </svg>
);

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/rickysilaban15",
      label: "GitHub",
      color: "hover:bg-gray-900 hover:border-gray-900",
      iconColor: "text-gray-700 dark:text-gray-300"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/ricky-steven-44a8a0292",
      label: "LinkedIn",
      color: "hover:bg-[#0077B5] hover:border-[#0077B5]",
      iconColor: "text-[#0077B5]"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/stev_ky_silaban/?__pwa=1",
      label: "Instagram",
      color: "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#C13584] hover:to-[#E1306C] hover:border-transparent",
      iconColor: "text-[#E1306C]"
    },
    {
      icon: <TiktokIcon />,
      href: "https://www.tiktok.com/@ricky_stev26",
      label: "TikTok",
      color: "hover:bg-black hover:border-black",
      iconColor: "text-gray-700 dark:text-gray-300"
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://www.facebook.com/ricki.silaban.1",
      label: "Facebook",
      color: "hover:bg-[#1877F2] hover:border-[#1877F2]",
      iconColor: "text-[#1877F2]"
    }
  ];

  return (
    <footer className={`border-t transition-colors duration-700 ${theme === "light" ? "border-gray-200 bg-white" : "border-gray-800 bg-black"}`}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img 
                src="/img/logo.png" 
                alt="Portfolio Logo" 
                className="h-14 w-auto" 
              />
            </div>
            <p className={`text-sm leading-relaxed max-w-md ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              {t('footer.description', "Full-Stack Developer & Web Designer yang passionate dalam menciptakan solusi digital yang bermakna untuk bisnis Anda.")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              {t('footer.quick_links', "Quick Links")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className={`${theme === "light" ? "text-gray-600 hover:text-blue-500" : "text-gray-400 hover:text-blue-400"} transition-smooth`}>
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="/portfolio" className={`${theme === "light" ? "text-gray-600 hover:text-blue-500" : "text-gray-400 hover:text-blue-400"} transition-smooth`}>
                  {t('nav.portfolio')}
                </a>
              </li>
              <li>
                <a href="/consultation" className={`${theme === "light" ? "text-gray-600 hover:text-blue-500" : "text-gray-400 hover:text-blue-400"} transition-smooth`}>
                  {t('nav.consultation')}
                </a>
              </li>
              <li>
                <a href="/contact" className={`${theme === "light" ? "text-gray-600 hover:text-blue-500" : "text-gray-400 hover:text-blue-400"} transition-smooth`}>
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className={`font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              {t('footer.connect', "Connect")}
            </h4>
            <div className="grid grid-cols-5 gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={`
                    p-3 rounded-xl border-2 transition-all duration-300 transform 
                    hover:scale-110 hover:shadow-lg group relative
                    flex items-center justify-center
                    ${theme === "light" 
                      ? "border-gray-200 bg-gray-50 hover:shadow-xl" 
                      : "border-gray-700 bg-gray-900/50 hover:shadow-2xl"
                    }
                    ${social.color}
                  `}
                  aria-label={social.label}
                >
                  {/* Background on hover */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${social.color.split(' ')[0]} ${social.color.split(' ')[1]}`} />
                  
                  {/* Icon */}
                  <div className={`relative z-10 transition-colors duration-300 ${social.iconColor} group-hover:text-white`}>
                    {social.icon}
                  </div>

                  {/* Tooltip */}
                  <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap ${
                    theme === "light" 
                      ? "bg-gray-800 text-white" 
                      : "bg-white text-gray-800"
                  }`}>
                    {social.label}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${
          theme === "light" 
            ? "border-gray-200 text-gray-500" 
            : "border-gray-800 text-gray-500"
        }`}>
          <p>© {currentYear} {t('hero.name')}. {t('footer.rights')}</p>
          <p className="font-light">{t('footer.signature', "PROGRAMER")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  