---
id: 2025-10-06-implement-next-intl
titulo: Migrar sistema de i18n personalizado para Next-Intl
tipo: refactor
---

### 1. Contexto e Objetivo

O projeto atualmente utiliza um sistema de internacionaliza��o personalizado baseado em React Context (`lib/i18n/i18n-context.tsx`) que n�o oferece suporte a Server-Side Rendering (SSR), pluraliza��o avan�ada e formata��o de dados. A migra��o para Next-Intl visa melhorar a performance, SEO e funcionalidades de internacionaliza��o, fornecendo uma solu��o mais robusta e otimizada.

**Objetivo:** Implementar Next-Intl mantendo a funcionalidade atual (EN/PT) e aproveitando recursos avan�ados como SSR, formata��o de datas/n�meros e melhor estrutura de arquivos de tradu��o.

### 2. Plano de Execu��o

#### **Fase 1: Instala��o e Configura��o Base**
- [ ] Instalar depend�ncia `next-intl`
- [ ] Configurar `next.config.mjs` com configura��es de localiza��o
- [ ] Criar estrutura de arquivos de mensagens em `messages/`
- [ ] Configurar middleware para detec��o autom�tica de idioma
- [ ] Configurar layouts e providers do Next-Intl

#### **Fase 2: Migra��o das Tradu��es**
- [ ] Converter `lib/i18n/translations.ts` para formato JSON do Next-Intl
- [ ] Criar arquivos `messages/en.json` e `messages/pt.json`
- [ ] Migrar todas as chaves de tradu��o existentes
- [ ] Adicionar tradu��es faltantes (aria-labels, metadata)

#### **Fase 3: Refatora��o dos Componentes**
- [ ] Substituir `useI18n()` por `useTranslations()` nos componentes cliente
- [ ] Atualizar componentes server-side para usar `getTranslations()`
- [ ] Migrar sistema de mudan�a de idioma para Next-Intl
- [ ] Atualizar detec��o autom�tica de idioma

#### **Fase 4: Otimiza��es e Melhorias**
- [ ] Implementar formata��o de datas com Next-Intl
- [ ] Configurar metadata din�mica por idioma
- [ ] Implementar redirects autom�ticos por localiza��o
- [ ] Otimizar bundle splitting por idioma

#### **Fase 5: Limpeza e Valida��o**
- [ ] Remover sistema i18n antigo (`lib/i18n/`)
- [ ] Atualizar imports em todos os arquivos
- [ ] Testar funcionalidade completa (mudan�a de idioma, SSR, navega��o)
- [ ] Validar SEO e performance

### 3. Arquivos-Alvo

#### **Novos Arquivos (Next-Intl)**
- `messages/en.json`
- `messages/pt.json`
- `middleware.ts`
- `i18n/request.ts`
- `app/[locale]/layout.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/about/page.tsx`
- `app/[locale]/projects/page.tsx`
- `app/[locale]/contact/page.tsx`
- `app/[locale]/blog/page.tsx`
- `app/[locale]/blog/[slug]/page.tsx`

#### **Arquivos Modificados**
- `next.config.mjs`
- `package.json`
- `app/layout.tsx` � `app/[locale]/layout.tsx`
- `app/ClientLayout.tsx`
- `components/footer.tsx`
- `components/sidebar-nav.tsx`
- `components/bottom-nav.tsx`
- `components/hero-section.tsx`
- `components/server-hero-section.tsx`
- `components/featured-projects.tsx`
- `components/youtube-videos.tsx`
- `components/theme-toggle.tsx`
- `components/mode-toggle.tsx`
- `components/header-client.tsx`
- Todos os arquivos de p�gina (`app/**/*.tsx`)

#### **Arquivos Removidos**
- `lib/i18n/i18n-context.tsx`
- `lib/i18n/translations.ts`
- `lib/i18n/detect-language.ts`
- `components/language-detector.tsx`

### 4. Crit�rios de Aceite

#### **Funcionalidade**
- [ ] A troca de idioma funciona corretamente (EN � PT)
- [ ] Todas as p�ginas s�o renderizadas no idioma correto
- [ ] URLs incluem prefixo de localiza��o (`/en/`, `/pt/`)
- [ ] Detec��o autom�tica de idioma funciona (browser + geolocaliza��o)
- [ ] Metadata (title, description) � traduzida corretamente
- [ ] Aria-labels e textos de acessibilidade s�o traduzidos

#### **Performance e SEO**
- [ ] SSR funciona corretamente para ambos os idiomas
- [ ] Bundle splitting por idioma est� ativo
- [ ] Sitemap inclui URLs localizadas
- [ ] Meta tags Open Graph s�o localizadas
- [ ] Redirects autom�ticos funcionam (`/` � `/pt/` ou `/en/`)

#### **Qualidade do C�digo**
- [ ] Todos os testes passam (`npm run test` se existir)
- [ ] Build � bem-sucedido (`npm run build`)
- [ ] Linting passa (`npm run lint`)
- [ ] TypeScript compila sem erros
- [ ] N�o h� console.errors relacionados a i18n

#### **Compatibilidade**
- [ ] Navega��o entre p�ginas preserva o idioma
- [ ] Mudan�a de idioma redireciona para a p�gina equivalente
- [ ] Links compartilhados mant�m o idioma correto
- [ ] Funciona em dispositivos m�veis e desktop

### 5. Diretrizes & Regras

#### **Estrutura de Arquivos**
- Seguir conven��es do Next.js 14 App Router com rotas localizadas
- Organizar mensagens em estrutura hier�rquica clara
- Manter separa��o entre componentes client/server
- Usar TypeScript para type-safety das tradu��es

#### **Padr�es de C�digo**
- **PROIBIDO** usar o tipo `any` - o ESLint configurado falhar�
- Utilizar hooks apropriados (`useTranslations` para client, `getTranslations` para server)
- Manter consist�ncia na nomenclatura das chaves de tradu��o
- Implementar fallbacks apropriados para tradu��es faltantes

#### **Performance**
- Implementar lazy loading das mensagens por rota
- Configurar cache apropriado para arquivos de tradu��o
- Minimizar re-renders desnecess�rios durante mudan�a de idioma
- Otimizar bundle size excluindo idiomas n�o utilizados

#### **SEO e Acessibilidade**
- Configurar `lang` attribute corretamente no HTML
- Implementar hreflang tags para SEO multil�ngue
- Garantir que aria-labels sejam traduzidos
- Manter URLs SEO-friendly com slugs localizados

### 6. Riscos & Plano de Rollback

#### **Riscos Identificados**
- **Alto**: Quebra de URLs existentes durante migra��o
- **M�dio**: Perda de estado do idioma selecionado pelo usu�rio
- **M�dio**: Impacto no SEO durante transi��o de URLs
- **Baixo**: Problemas de performance com SSR

#### **Estrat�gia de Mitiga��o**
- Implementar redirects para URLs antigas
- Manter sistema de detec��o de idioma robusto
- Fazer deploy incremental testando uma p�gina por vez
- Monitorar Core Web Vitals durante rollout

#### **Plano de Rollback**
1. **Situa��o**: Build falha ou erros cr�ticos
   **A��o**: Reverter commits da migra��o, restaurar sistema anterior
2. **Situa��o**: Performance degradada
   **A��o**: Ajustar configura��es de cache e lazy loading
3. **Situa��o**: SEO impactado
   **A��o**: Implementar redirects 301 emergenciais

#### **Pontos de Checkpoint**
- Ap�s Fase 1: Verificar se build n�o quebrou
- Ap�s Fase 3: Testar navega��o b�sica entre idiomas
- Ap�s Fase 5: Valida��o completa em staging antes de produ��o