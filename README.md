# Landing Page Amil Seguros PME com Chatbot

Uma landing page moderna para captação de leads da Amil Seguros PME, com chatbot interativo e página dedicada para uma experiência imersiva.

## 🚀 Funcionalidades Principais

- **Landing Page Responsiva**: Design moderno e otimizado para conversão
- **Chatbot Interativo**: Sistema de cotação guiado em múltiplas etapas
- **Página Dedicada do Chat**: Experiência imersiva similar ao WhatsApp/Telegram
- **Roteamento com React Router**: Navegação fluida entre páginas
- **Integração com Convex**: Backend robusto para gerenciamento de leads
- **Analytics e Tracking**: Integração com Facebook Pixel
- **Design Responsivo**: Funciona perfeitamente em todos os dispositivos

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Lucide React (ícones)
- **Backend**: Convex (serverless backend)
- **Roteamento**: React Router DOM
- **Notificações**: Sonner (toast notifications)
- **Build**: Vite
- **Deploy**: Vercel (configurado)

## 📱 Funcionalidade Destacada: Página Dedicada do Chatbot

A página dedicada do chatbot (`/chat`) oferece:

- ✅ Interface estilo aplicativo de mensagens
- ✅ Header com informações do assistente
- ✅ Indicador "digitando..." em tempo real
- ✅ Botões de ação (telefone, vídeo, opções)
- ✅ Badge de segurança LGPD
- ✅ Navegação fluida com botão voltar
- ✅ Layout adaptativo (modal ou página completa)

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── LandingPage.tsx          # Página inicial com seções
│   ├── Chatbot.tsx              # Componente do chatbot (modal + fullpage)
│   ├── ChatPage.tsx             # 🆕 Página dedicada do chat
│   ├── ChatbotHeader.tsx        # Header do chatbot
│   ├── ChatbotMessages.tsx      # Área de mensagens
│   ├── ChatbotInput.tsx         # Input de mensagens
│   ├── ChatbotFinalCTA.tsx      # CTA final
│   └── ... (outros componentes)
├── App.tsx                      # ✏️ Roteamento principal
└── main.tsx

convex/                          # Backend Convex
├── leads.ts                     # Gerenciamento de leads
├── email.ts                     # Envio de emails
├── schema.ts                    # Schema do banco
└── ...
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone [repo-url]
cd CHATBOT-AMIL

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas configurações

# Iniciar desenvolvimento
npm run dev
```

### Scripts Disponíveis
- `npm run dev` - Inicia frontend + backend em desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build
- `npm run dev:frontend` - Apenas frontend
- `npm run dev:backend` - Apenas backend Convex

## 🛣️ Rotas da Aplicação

- `/` - Landing page principal
- `/chat` - Página dedicada do chatbot

## ⚙️ Configuração

### Tailwind CSS
O projeto utiliza cores personalizadas:
```javascript
colors: {
  primary: "#d80032",           // Cor principal (vermelho Amil)
  "amil-blue": "#004a80",       // Azul Amil
  "amil-light-blue": "#00adef", // Azul claro Amil
  "unimed-green": "#009639",    // Verde (compatibilidade)
}
```

### Convex Backend
Configure suas variáveis no `.env.local`:
```env
CONVEX_DEPLOYMENT=your-deployment
VITE_CONVEX_URL=your-convex-url
```

## 📊 Analytics e Tracking

O projeto inclui integração com:
- **Facebook Pixel**: Tracking de conversões e leads
- **Geolocalização**: Detecção automática de localização
- **Eventos customizados**: Monitoramento de interações

## 🔄 Fluxo do Chatbot

1. **Nome**: Coleta nome do usuário
2. **WhatsApp**: Número para contato
3. **Plano Atual**: Situação atual do plano de saúde
4. **Detalhes do Plano**: Nome e valor (se aplicável)
5. **Dificuldades**: Principais problemas enfrentados
6. **Beneficiários**: Idades dos dependentes
7. **CNPJ**: Dados da empresa
8. **Finalização**: CTA para contato

## 🎨 Personalização

### Alterar Informações do Assistente
Em `src/components/ChatPage.tsx`:
```tsx
// Linha ~45
<h1 className="text-lg font-semibold text-white truncate">
  Seu Nome Aqui
</h1>

// Linha ~40 - Foto do assistente
<img src="URL_DA_SUA_FOTO" alt="Assistente" />
```

### Cores e Branding
Edite `tailwind.config.js` para ajustar as cores da marca.

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Build
npm run build

# Deploy
vercel --prod
```

O arquivo `vercel.json` já está configurado para React Router.

## 📋 Checklist Pós-Implementação

- [x] ✅ React Router instalado e configurado
- [x] ✅ Componente ChatPage criado
- [x] ✅ Modificações no Chatbot para modo fullPage
- [x] ✅ App.tsx atualizado com roteamento
- [x] ✅ Navegação funcionando entre páginas
- [x] ✅ Design responsivo implementado
- [x] ✅ Header estilo WhatsApp/Telegram
- [x] ✅ Indicadores de status em tempo real
- [x] ✅ Integração com tracking/analytics

## 📱 Testes

Para testar a funcionalidade:

1. Acesse `http://localhost:5173`
2. Clique em "Solicitar Cotação" na landing page
3. Verifique se navega para `/chat`
4. Teste o botão voltar
5. Interaja com o chatbot em modo fullPage

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para Amil Seguros PME**
