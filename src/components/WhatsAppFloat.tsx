import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Clock, Check, CheckCheck, Mic, Paperclip, Smile } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChat, setActiveChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{text: string, time: string, isUser: boolean, status: 'sent' | 'delivered' | 'read'}>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample initial messages
  useEffect(() => {
    if (isExpanded && activeChat) {
      setMessages([
        {
          text: "Halo! Saya tertarik dengan layanan Anda. Bisa diskusi project?",
          time: "10:00",
          isUser: true,
          status: 'read'
        },
        {
          text: "Halo! Tentu saja 😊 Senang sekali Anda menghubungi saya. Project seperti apa yang ingin Anda buat?",
          time: "10:01", 
          isUser: false,
          status: 'sent'
        }
      ]);
    }
  }, [isExpanded, activeChat]);

  const openWhatsApp = () => {
    const phoneNumber = "+6287818894504";
    const defaultMessage = "Halo, saya tertarik dengan layanan Anda. Bisa kita diskusikan projectnya?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const quickMessages = [
    {
      text: "💰 Tanya harga website",
      message: "Halo, bisa info harga pembuatan website company profile?"
    },
    {
      text: "🚀 Konsultasi project",
      message: "Halo, saya ingin konsultasi tentang project website yang ingin saya buat."
    },
    {
      text: "⏰ Project urgent",
      message: "Halo, saya butuh website ASAP. Bisa dibantu berapa lama pengerjaannya?"
    },
    {
      text: "📱 Butuh web & mobile app",
      message: "Halo, saya butuh website dan aplikasi mobile. Bisa handle keduanya?"
    }
  ];

  const sendQuickMessage = (text: string) => {
    const phoneNumber = "+6287818894504";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        isUser: true,
        status: 'sent' as const
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      
      // Auto reply simulation
      setTimeout(() => {
        const replies = [
          "Halo! Terima kasih sudah menghubungi saya. Saya Ricky, Full-Stack Developer.",
          "Senang sekali Anda tertarik dengan layanan saya. Project seperti apa yang ingin Anda buat?",
          "Saya bisa membantu membuat website modern dan responsive sesuai kebutuhan bisnis Anda.",
          "Bisa ceritakan lebih detail tentang project yang Anda rencanakan?",
          "Saya biasa bekerja dengan React, Next.js, TypeScript, dan teknologi modern lainnya."
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        setMessages(prev => [...prev, {
          text: randomReply,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          isUser: false,
          status: 'sent'
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const StatusIcon = ({ status }: { status: 'sent' | 'delivered' | 'read' }) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-green-500" />;
      default:
        return <Check className="h-3 w-3 text-gray-400" />;
    }
  };

  return (
    <>
      {/* Main WhatsApp Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setIsExpanded(false);
            setActiveChat(false);
          }
        }}
        className={`fixed left-6 bottom-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group ${
          theme === "dark" 
            ? "bg-[#00E676] hover:bg-[#00C853]" 
            : "bg-[#25D366] hover:bg-[#128C7E]"
        } text-white`}
        aria-label="Chat via WhatsApp"
      >
        {/* WhatsApp Logo Style */}
        <div className="relative">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.444"/>
          </svg>
        </div>
        
        {/* Online Indicator */}
        <span className="absolute -top-1 -right-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white border-2 border-green-500"></span>
          </span>
        </span>

        {/* Tooltip */}
        <div className={`absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
          theme === "dark" 
            ? "bg-gray-800 text-white" 
            : "bg-white text-gray-800 shadow-lg"
        }`}>
          Chat via WhatsApp
          <div className={`absolute left-full top-1/2 transform -translate-y-1/2 border-8 border-transparent ${
            theme === "dark" 
              ? "border-l-gray-800" 
              : "border-l-white"
          }`}></div>
        </div>
      </button>

      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <div className={`fixed left-6 bottom-20 z-50 transition-all duration-300 ${
          isExpanded ? "w-80 h-96" : "w-80 h-96"
        }`}>
          {/* Chat Header - WhatsApp Green */}
          <div className={`rounded-t-2xl shadow-2xl ${
            theme === "dark" ? "bg-[#1F2C34]" : "bg-[#00A884]"
          }`}>
            {/* Header Info */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Profile Picture */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                      RS
                    </div>
                    {/* Online Status */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                  </div>
                  
                  <div>
                    <h3 className={`font-bold text-lg ${theme === "dark" ? "text-white" : "text-white"}`}>
                      Ricky Steven
                    </h3>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        theme === "dark" ? "bg-green-400" : "bg-white"
                      }`}></div>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-white/90"}`}>
                        Online • Respons cepat
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Video Call Icon */}
                  <button className={`p-2 rounded-full ${
                    theme === "dark" ? "hover:bg-white/10 text-white" : "hover:bg-white/20 text-white"
                  }`}>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                    </svg>
                  </button>
                  
                  {/* Voice Call Icon */}
                  <button className={`p-2 rounded-full ${
                    theme === "dark" ? "hover:bg-white/10 text-white" : "hover:bg-white/20 text-white"
                  }`}>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
                    </svg>
                  </button>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-full ${
                      theme === "dark" ? "hover:bg-white/10 text-white" : "hover:bg-white/20 text-white"
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            {!activeChat && (
              <div className={`px-4 pb-4 ${theme === "dark" ? "bg-[#1F2C34]" : "bg-[#00A884]"}`}>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {quickMessages.map((quickMsg, index) => (
                    <button
                      key={index}
                      onClick={() => sendQuickMessage(quickMsg.message)}
                      className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        theme === "dark"
                          ? "bg-white/10 text-white hover:bg-white/20"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      {quickMsg.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat Messages Area */}
          <div className={`h-64 overflow-y-auto ${
            theme === "dark" ? "bg-[#0B141A]" : "bg-[#E5E5E5]"
          }`}>
            {activeChat ? (
              <div className="p-4 space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.isUser
                        ? theme === "dark"
                          ? "bg-[#005C4B] text-white rounded-br-md"
                          : "bg-[#D9FDD3] text-gray-800 rounded-br-md"
                        : theme === "dark"
                          ? "bg-[#202C33] text-white rounded-bl-md"
                          : "bg-white text-gray-800 rounded-bl-md shadow-sm"
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        msg.isUser ? "text-xs text-white/70" : "text-xs text-gray-500"
                      }`}>
                        <span>{msg.time}</span>
                        {msg.isUser && <StatusIcon status={msg.status} />}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              /* Welcome Screen */
              <div className="p-8 text-center">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  theme === "dark" ? "bg-[#005C4B]" : "bg-[#25D366]"
                }`}>
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}>
                  Ricky Steven
                </h3>
                <p className={`text-sm mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Full-Stack Developer & Web Designer
                </p>
                <button
                  onClick={() => setActiveChat(true)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-[#00A884] hover:bg-[#008F74] text-white"
                      : "bg-[#25D366] hover:bg-[#128C7E] text-white"
                  }`}
                >
                  Mulai Chat
                </button>
              </div>
            )}
          </div>

          {/* Message Input Area */}
          {activeChat && (
            <div className={`p-3 border-t ${
              theme === "dark" 
                ? "bg-[#1F2C34] border-gray-700" 
                : "bg-white border-gray-200"
            }`}>
              <div className="flex items-center gap-2">
                {/* Emoji Button */}
                <button className={`p-2 rounded-full ${
                  theme === "dark" 
                    ? "text-gray-400 hover:bg-white/10" 
                    : "text-gray-500 hover:bg-gray-100"
                }`}>
                  <Smile className="h-5 w-5" />
                </button>
                
                {/* Attachment Button */}
                <button className={`p-2 rounded-full ${
                  theme === "dark" 
                    ? "text-gray-400 hover:bg-white/10" 
                    : "text-gray-500 hover:bg-gray-100"
                }`}>
                  <Paperclip className="h-5 w-5" />
                </button>
                
                {/* Message Input */}
                <div className={`flex-1 rounded-3xl px-4 py-2 ${
                  theme === "dark" 
                    ? "bg-[#2A3942] text-white" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan..."
                    className={`w-full bg-transparent outline-none text-sm ${
                      theme === "dark" 
                        ? "placeholder-gray-400" 
                        : "placeholder-gray-500"
                    }`}
                  />
                </div>
                
                {/* Send/Voice Button */}
                {message.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className={`p-2 rounded-full ${
                      theme === "dark" 
                        ? "bg-[#00A884] hover:bg-[#008F74] text-white" 
                        : "bg-[#25D366] hover:bg-[#128C7E] text-white"
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                ) : (
                  <button className={`p-2 rounded-full ${
                    theme === "dark" 
                      ? "text-gray-400 hover:bg-white/10" 
                      : "text-gray-500 hover:bg-gray-100"
                  }`}>
                    <Mic className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default WhatsAppFloat;