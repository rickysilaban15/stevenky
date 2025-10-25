import { useTranslation } from "react-i18next";
import { useState } from "react";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "id", name: "Indonesia" },
    { code: "gb", name: "English" },
  ];

  const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    // ✅ HAPUS WRAPPER DIV, langsung return button
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-2 bg-transparent px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
    >
      <span className={`fi fi-${currentLang.code} w-6 h-6 rounded-sm`} />
      
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
            >
              <span className={`fi fi-${lang.code} w-5 h-5 rounded-sm`} />
              <span className="text-sm text-gray-700 dark:text-gray-200">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </button>
  );
};

export default LanguageSwitcher;