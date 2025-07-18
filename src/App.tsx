import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "./components/LandingPage";
import Chatbot from "./components/Chatbot";
import ChatPage from "./components/ChatPage";
import { useFacebookPixel, useCookieConsent } from "./hooks/useFacebookPixel";

declare global {
  interface Window {
    fbq: {
      (...args: any[]): void;
      q?: any[];
      l?: number;
      loaded?: boolean;
      version?: string;
      queue?: any[];
      callMethod?: (...args: any[]) => void;
    };
    _fbq?: any;
    initFacebookPixel?: () => void;
  }
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPageRoute />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

function HomePage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const navigate = useNavigate();
  const { hasConsent } = useCookieConsent();
  const { trackCustomEvent } = useFacebookPixel(hasConsent);

  // Detectar localização do usuário quando o componente carrega
  useEffect(() => {
    if (navigator.geolocation && hasConsent) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          trackCustomEvent('FindLocation', {
            content_name: 'User Location Found',
            content_category: 'geolocation',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            source: 'automatic_detection'
          });
        },
        (error) => {
          trackCustomEvent('FindLocation', {
            content_name: 'Location Permission Denied',
            content_category: 'geolocation',
            error: error.message,
            source: 'automatic_detection'
          });
        },
        {
          timeout: 10000,
          enableHighAccuracy: false
        }
      );
    }
  }, [hasConsent, trackCustomEvent]);

  const handleOpenChatbot = () => {
    // Disparar evento Lead quando o chatbot é aberto
    trackCustomEvent('Lead', {
      value: 10,
      currency: 'BRL',
      content_name: 'Chatbot Open',
      content_category: 'interaction',
      source: 'landing_page_button'
    });
    
    // Navegar para a página de chat
    void navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingPage onOpenChatbot={handleOpenChatbot} />
      {isChatbotOpen && (
        <Chatbot onClose={() => setIsChatbotOpen(false)} />
      )}
    </div>
  );
}

function ChatPageRoute() {
  const navigate = useNavigate();

  const handleBack = () => {
    void navigate('/');
  };

  return <ChatPage onBack={handleBack} />;
}
