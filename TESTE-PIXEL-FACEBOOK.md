# 🧪 Como Testar o Facebook Pixel com Meta Pixel Helper

## 📋 Checklist de Validação

### 1. 🔧 **Preparação da Extensão**
- ✅ Instale a extensão "Meta Pixel Helper" no Chrome/Edge
- ✅ Abra as ferramentas do desenvolvedor (F12)
- ✅ Vá para a aba "Console" para ver os logs

### 2. 🌐 **Teste no Ambiente Local**
```bash
# 1. Inicie o servidor de desenvolvimento
npm run dev

# 2. Acesse: http://localhost:5173/
```

### 3. 🔍 **Verificações Passo a Passo**

#### **Passo 1: Verificar Carregamento do Script**
1. Abra o site no navegador
2. **Console deve mostrar**:
   ```
   ✅ Facebook Pixel inicializado com sucesso!
   🎯 useFacebookPixel - hasConsent: false
   🚫 Pixel não inicializado - sem consentimento
   ```

#### **Passo 2: Aceitar Cookies**
1. Quando aparecer o banner de cookies, clique em **"Aceitar"**
2. **Console deve mostrar**:
   ```
   ✅ Pixel inicializado após aceitar cookies
   🎯 useFacebookPixel - hasConsent: true
   ✅ fbq disponível, inicializando pixel...
   ✅ Facebook Pixel inicializado com sucesso!
   📊 Tracking event: PageView
   ```

#### **Passo 3: Meta Pixel Helper**
1. Clique no ícone da extensão Meta Pixel Helper
2. **Deve mostrar**:
   - ✅ Pixel ID: `1648153312538580`
   - ✅ Status: Ativo
   - ✅ Eventos: PageView

### 4. 🧭 **Teste de Navegação**

#### **Teste 1: Página Chat**
```
1. Clique em "Iniciar Conversa"
2. Acesse: /chat
3. Verificar Meta Pixel Helper:
   - ✅ Pixel ainda ativo
   - ✅ Novo PageView detectado
```

#### **Teste 2: Botão WhatsApp**
```
1. Na landing page, clique no botão WhatsApp
2. Console deve mostrar:
   📊 Tracking event: ButtonClick
3. Meta Pixel Helper deve detectar o evento
```

### 5. 🐛 **Resolução de Problemas**

#### **Problema: Meta Pixel Helper não detecta nada**
**Soluções:**
1. Recarregue a página (Ctrl+F5)
2. Limpe o cache do navegador
3. Verifique se JavaScript está habilitado
4. Abra em aba anônima/privada

#### **Problema: Pixel carrega mas eventos não aparecem**
**Verifique:**
1. Console deve mostrar logs de tracking
2. Aceite os cookies primeiro
3. Aguarde alguns segundos após aceitar

#### **Problema: Múltiplos pixels detectados**
**Solução:**
1. Recarregue a página
2. Limpe localStorage:
   ```javascript
   localStorage.clear();
   location.reload();
   ```

### 6. 📊 **Eventos Esperados**

| Ação | Evento | Parâmetros |
|------|--------|-----------|
| Carregar página | PageView | - |
| Aceitar cookies | PageView | (após consentimento) |
| Clicar WhatsApp | ButtonClick | buttonId, buttonName |
| Abrir chatbot | Lead | value, currency, source |
| Detectar localização | FindLocation | city, region |

### 7. 🔧 **Comandos de Debug**

#### **Verificar Estado do Pixel no Console:**
```javascript
// Verificar se fbq existe
console.log('fbq disponível:', typeof window.fbq);

// Verificar consentimento
console.log('Consentimento:', localStorage.getItem('cookie-consent'));

// Testar evento manual
if (window.fbq) {
  window.fbq('track', 'TestEvent');
  console.log('Evento de teste enviado');
}
```

### 8. ✅ **Resultado Esperado**

**Meta Pixel Helper deve mostrar:**
```
✅ Facebook Pixel (1648153312538580)
   Status: Ativo
   Eventos detectados:
   - PageView ✓
   - ButtonClick ✓ (se clicar WhatsApp)
   - Lead ✓ (se abrir chatbot)
   - FindLocation ✓ (se permitir localização)
```

**Console deve estar limpo, sem erros como:**
❌ `Multiple pixels with conflicting versions`
❌ `fbq is not defined`
❌ Erros de CORS ou bloqueio

### 9. 🚀 **Teste Final em Produção**

1. Faça deploy das mudanças
2. Teste em: `consultoriaamilsaude.com.br`
3. Repita todos os passos acima
4. Valide no Meta Events Manager

---

## 📝 **Relatório de Teste**

**Data:** _______________
**Testador:** _______________

**Checklist:**
- [ ] Meta Pixel Helper detecta o pixel
- [ ] PageView é disparado automaticamente
- [ ] Eventos de interação funcionam
- [ ] Não há conflitos ou erros no console
- [ ] LGPD compliance (só carrega com consentimento)

**Observações:**
_________________________________
_________________________________
