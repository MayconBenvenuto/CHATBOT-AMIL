# ⚙️ Configuração Rápida - Replicar Facebook Pixel

## 🚀 Checklist de 5 Minutos

### 1️⃣ **Obter o Pixel ID**
```
1. Acesse: business.facebook.com/events_manager2
2. Selecione seu pixel ou crie um novo
3. Copie o ID (formato: 1234567890123456)
```

### 2️⃣ **Substituições Obrigatórias**

#### 📁 `index.html`
```javascript
// LINHA ~20: Substituir em 2 lugares
fbq('init', 'SEU_PIXEL_ID_AQUI'); // 👈 TROCAR AQUI

// LINHA ~40: E aqui também
src="https://www.facebook.com/tr?id=SEU_PIXEL_ID_AQUI&ev=PageView&noscript=1" // 👈 TROCAR AQUI
```

#### 📁 `src/hooks/useFacebookPixel.ts`
```typescript
// LINHA 4: Apenas 1 lugar
const PIXEL_ID = "SEU_PIXEL_ID_AQUI"; // 👈 TROCAR AQUI
```

### 3️⃣ **Copiar Arquivos**

#### ✅ Arquivos para Copiar Integralmente:
- `src/hooks/useFacebookPixel.ts`
- `src/components/CookieConsent.tsx` (se não tiver)

#### ✅ Arquivos para Modificar:
- `index.html` (adicionar script no head + noscript no body)
- Componentes que usam tracking

### 4️⃣ **Importações nos Componentes**

#### Em TODOS os componentes que fazem tracking:
```typescript
import { useFacebookPixel, useCookieConsent } from "../hooks/useFacebookPixel";

function MeuComponente() {
  const { hasConsent } = useCookieConsent();
  const { trackEvent, trackCustomEvent } = useFacebookPixel(hasConsent);
  
  // Use trackEvent() e trackCustomEvent()
}
```

### 5️⃣ **Testar**
```
✅ Meta Pixel Helper detecta pixel
✅ Console mostra logs de inicialização  
✅ Eventos aparecem no Meta Events Manager
```

---

## 📋 Template de Configuração

### Para Site de E-commerce:
```typescript
// Eventos típicos
trackEvent('ViewContent', { content_name: 'Produto XYZ' });
trackEvent('AddToCart', { value: 99.90, currency: 'BRL' });
trackEvent('Purchase', { value: 299.90, currency: 'BRL' });
```

### Para Site de Serviços:
```typescript
// Eventos típicos
trackEvent('Lead', { source: 'contact_form' });
trackCustomEvent('WhatsAppClick', { button_location: 'header' });
trackCustomEvent('FormSubmit', { form_type: 'contact' });
```

### Para Blog/Conteúdo:
```typescript
// Eventos típicos
trackEvent('ViewContent', { content_category: 'blog' });
trackCustomEvent('NewsletterSignup', { source: 'sidebar' });
trackCustomEvent('SocialShare', { platform: 'whatsapp' });
```

---

## 🔄 Migração de Pixel Existente

### Se já tem pixel no site:

#### 1. **Remover código antigo:**
```html
<!-- ❌ REMOVER: Scripts antigos como estes -->
<script>
  fbq('init', 'PIXEL_ANTIGO');
  fbq('track', 'PageView');
</script>
```

#### 2. **Limpar localStorage:**
```javascript
// No console do browser
localStorage.clear();
location.reload();
```

#### 3. **Implementar nova solução**
- Seguir o guia completo
- Testar com Meta Pixel Helper

---

## ⚡ Solução Expressa (Copy & Paste)

### 📁 `index.html` - Adicionar no `<head>`:
```html
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

window.initFacebookPixel = function() {
  fbq('init', 'SEU_PIXEL_ID_AQUI');
  fbq('track', 'PageView');
  console.log('✅ Facebook Pixel inicializado!');
};

document.addEventListener('DOMContentLoaded', function() {
  const consent = localStorage.getItem('cookie-consent');
  if (consent === 'accepted') {
    window.initFacebookPixel();
  }
});
</script>
```

### 📁 `index.html` - Adicionar no `<body>`:
```html
<noscript>
  <img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=SEU_PIXEL_ID_AQUI&ev=PageView&noscript=1"/>
</noscript>
```

### 📁 Usar em qualquer componente:
```typescript
import { useFacebookPixel, useCookieConsent } from "./hooks/useFacebookPixel";

function MeuComponente() {
  const { hasConsent } = useCookieConsent();
  const { trackEvent } = useFacebookPixel(hasConsent);
  
  const handleClick = () => {
    trackEvent('Purchase', { value: 99.90, currency: 'BRL' });
  };
  
  return <button onClick={handleClick}>Comprar</button>;
}
```

---

## 🎯 Resultados Esperados

### ✅ **Meta Pixel Helper:**
```
Facebook Pixel (SEU_PIXEL_ID)
├── Status: Ativo ✅
├── PageView: Detectado ✅  
├── Sem erros ✅
└── Sem conflitos ✅
```

### ✅ **Console do Browser:**
```
✅ Facebook Pixel inicializado!
🎯 useFacebookPixel - hasConsent: true
📊 Tracking event: Purchase {...}
```

### ✅ **Meta Events Manager:**
```
Eventos em Tempo Real:
├── PageView ✅
├── Purchase ✅
└── Custom Events ✅
```

---

**🎉 Pronto! Pixel configurado e funcionando perfeitamente!**
