import { useEffect, useState } from 'react';

const PIXEL_ID = "1648153312538580";

// Estender o tipo Window para incluir fbq e função de inicialização
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
    trackLeadQualificado?: (leadData?: any) => void;
  }
}

interface FacebookPixelHook {
  isLoaded: boolean;
  trackEvent: (eventName: string, parameters?: any) => void;
  trackCustomEvent: (eventName: string, parameters?: any) => void;
  trackLeadQualificado: (leadData?: any) => void;
}

export const useFacebookPixel = (hasConsent: boolean = false): FacebookPixelHook => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('🎯 useFacebookPixel - hasConsent:', hasConsent);
    
    if (!hasConsent) {
      console.log('🚫 Pixel não inicializado - sem consentimento');
      setIsLoaded(false);
      return;
    }

    // Verificar se fbq está disponível (carregado pelo HTML)
    if (typeof window.fbq === 'function') {
      console.log('✅ fbq disponível, inicializando pixel...');
      
      // Usar a função de inicialização do HTML
      if (typeof window.initFacebookPixel === 'function') {
        window.initFacebookPixel();
      } else {
        // Fallback: inicializar manualmente
        window.fbq('init', PIXEL_ID);
        window.fbq('track', 'PageView');
        console.log('✅ Pixel inicializado manualmente');
      }
      
      setIsLoaded(true);
    } else {
      console.warn('⚠️ fbq não está disponível');
      
      // Aguardar um pouco e tentar novamente
      const checkInterval = setInterval(() => {
        if (typeof window.fbq === 'function') {
          console.log('✅ fbq agora está disponível');
          
          if (typeof window.initFacebookPixel === 'function') {
            window.initFacebookPixel();
          } else {
            window.fbq('init', PIXEL_ID);
            window.fbq('track', 'PageView');
          }
          
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);

      // Limpar o intervalo após 5 segundos se não carregar
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!isLoaded) {
          console.error('❌ Timeout: fbq não carregou em 5 segundos');
        }
      }, 5000);
    }
  }, [hasConsent, isLoaded]);

  const trackEvent = (eventName: string, parameters?: any) => {
    if (isLoaded && window.fbq && typeof window.fbq === 'function') {
      console.log(`📊 Tracking event: ${eventName}`, parameters);
      window.fbq('track', eventName, parameters);
    } else {
      console.warn(`⚠️ Tentativa de track event '${eventName}' mas pixel não está carregado`);
    }
  };

  const trackCustomEvent = (eventName: string, parameters?: any) => {
    if (isLoaded && window.fbq && typeof window.fbq === 'function') {
      console.log(`📊 Tracking custom event: ${eventName}`, parameters);
      window.fbq('trackCustom', eventName, parameters);
    } else {
      console.warn(`⚠️ Tentativa de track custom event '${eventName}' mas pixel não está carregado`);
    }
  };

  const trackLeadQualificado = (leadData?: any) => {
    if (isLoaded && window.trackLeadQualificado && typeof window.trackLeadQualificado === 'function') {
      console.log(`📊 Tracking lead qualificado`, leadData);
      window.trackLeadQualificado(leadData);
    } else if (isLoaded && window.fbq && typeof window.fbq === 'function') {
      // Fallback direto com fbq se a função global não estiver disponível
      console.log(`📊 Tracking lead qualificado (fallback)`, leadData);
      window.fbq('trackCustom', 'leadQualificado', {
        content_name: 'Chatbot Concluído',
        content_category: 'Seguros Empresariais',
        source: 'chatbot',
        ...leadData
      });
    } else {
      console.warn(`⚠️ Tentativa de track lead qualificado mas pixel não está carregado`);
    }
  };

  return {
    isLoaded,
    trackEvent,
    trackCustomEvent,
    trackLeadQualificado
  };
};

// Hook para verificar consentimento de cookies
export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      setHasConsent(true);
    } else if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setHasConsent(true);
    setShowConsent(false);
    
    // Inicializar o pixel imediatamente após aceitar
    if (typeof window.initFacebookPixel === 'function') {
      window.initFacebookPixel();
      console.log('✅ Pixel inicializado após aceitar cookies');
    }
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowConsent(false);
  };

  return {
    hasConsent,
    showConsent,
    acceptCookies,
    rejectCookies
  };
};
