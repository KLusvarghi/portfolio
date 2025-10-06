---
id: 2025-10-06-implement-next-intl
titulo: Migrar sistema de i18n personalizado para Next-Intl
tipo: refactor
---

### 1. Contexto e Objetivo

O projeto atualmente utiliza um sistema de internacionalização personalizado baseado em React Context (`lib/i18n/i18n-context.tsx`) que não oferece suporte a Server-Side Rendering (SSR), pluralização avançada e formatação de dados. A migração para Next-Intl visa melhorar a performance, SEO e funcionalidades de internacionalização, fornecendo uma solução mais robusta e otimizada.

**Objetivo:** Implementar Next-Intl mantendo a funcionalidade atual (EN/PT) e aproveitando recursos avançados como SSR, formatação de datas/números e melhor estrutura de arquivos de tradução.

### 2. Plano de Execução

#### **Fase 1: Instalação e Configuração Base**
- [ ] Instalar dependência `next-intl`
- [ ] Configurar `next.config.mjs` com configurações de localização
- [ ] Criar estrutura de arquivos de mensagens em `messages/`
- [ ] Configurar middleware para detecção automática de idioma
- [ ] Configurar layouts e providers do Next-Intl

#### **Fase 2: Migração das Traduções**
- [ ] Converter `lib/i18n/translations.ts` para formato JSON do Next-Intl
- [ ] Criar arquivos `messages/en.json` e `messages/pt.json`
- [ ] Migrar todas as chaves de tradução existentes
- [ ] Adicionar traduções faltantes (aria-labels, metadata)

#### **Fase 3: Refatoração dos Componentes**
- [ ] Substituir `useI18n()` por `useTranslations()` nos componentes cliente
- [ ] Atualizar componentes server-side para usar `getTranslations()`
- [ ] Migrar sistema de mudança de idioma para Next-Intl
- [ ] Atualizar detecção automática de idioma

#### **Fase 4: Otimizações e Melhorias**
- [ ] Implementar formatação de datas com Next-Intl
- [ ] Configurar metadata dinâmica por idioma
- [ ] Implementar redirects automáticos por localização
- [ ] Otimizar bundle splitting por idioma

#### **Fase 5: Limpeza e Validação**
- [ ] Remover sistema i18n antigo (`lib/i18n/`)
- [ ] Atualizar imports em todos os arquivos
- [ ] Testar funcionalidade completa (mudança de idioma, SSR, navegação)
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
- `app/layout.tsx` ’ `app/[locale]/layout.tsx`
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
- Todos os arquivos de página (`app/**/*.tsx`)

#### **Arquivos Removidos**
- `lib/i18n/i18n-context.tsx`
- `lib/i18n/translations.ts`
- `lib/i18n/detect-language.ts`
- `components/language-detector.tsx`

### 4. Critérios de Aceite

#### **Funcionalidade**
- [ ] A troca de idioma funciona corretamente (EN ” PT)
- [ ] Todas as páginas são renderizadas no idioma correto
- [ ] URLs incluem prefixo de localização (`/en/`, `/pt/`)
- [ ] Detecção automática de idioma funciona (browser + geolocalização)
- [ ] Metadata (title, description) é traduzida corretamente
- [ ] Aria-labels e textos de acessibilidade são traduzidos

#### **Performance e SEO**
- [ ] SSR funciona corretamente para ambos os idiomas
- [ ] Bundle splitting por idioma está ativo
- [ ] Sitemap inclui URLs localizadas
- [ ] Meta tags Open Graph são localizadas
- [ ] Redirects automáticos funcionam (`/` ’ `/pt/` ou `/en/`)

#### **Qualidade do Código**
- [ ] Todos os testes passam (`npm run test` se existir)
- [ ] Build é bem-sucedido (`npm run build`)
- [ ] Linting passa (`npm run lint`)
- [ ] TypeScript compila sem erros
- [ ] Não há console.errors relacionados a i18n

#### **Compatibilidade**
- [ ] Navegação entre páginas preserva o idioma
- [ ] Mudança de idioma redireciona para a página equivalente
- [ ] Links compartilhados mantêm o idioma correto
- [ ] Funciona em dispositivos móveis e desktop

### 5. Diretrizes & Regras

#### **Estrutura de Arquivos**
- Seguir convenções do Next.js 14 App Router com rotas localizadas
- Organizar mensagens em estrutura hierárquica clara
- Manter separação entre componentes client/server
- Usar TypeScript para type-safety das traduções

#### **Padrões de Código**
- **PROIBIDO** usar o tipo `any` - o ESLint configurado falhará
- Utilizar hooks apropriados (`useTranslations` para client, `getTranslations` para server)
- Manter consistência na nomenclatura das chaves de tradução
- Implementar fallbacks apropriados para traduções faltantes

#### **Performance**
- Implementar lazy loading das mensagens por rota
- Configurar cache apropriado para arquivos de tradução
- Minimizar re-renders desnecessários durante mudança de idioma
- Otimizar bundle size excluindo idiomas não utilizados

#### **SEO e Acessibilidade**
- Configurar `lang` attribute corretamente no HTML
- Implementar hreflang tags para SEO multilíngue
- Garantir que aria-labels sejam traduzidos
- Manter URLs SEO-friendly com slugs localizados

### 6. Riscos & Plano de Rollback

#### **Riscos Identificados**
- **Alto**: Quebra de URLs existentes durante migração
- **Médio**: Perda de estado do idioma selecionado pelo usuário
- **Médio**: Impacto no SEO durante transição de URLs
- **Baixo**: Problemas de performance com SSR

#### **Estratégia de Mitigação**
- Implementar redirects para URLs antigas
- Manter sistema de detecção de idioma robusto
- Fazer deploy incremental testando uma página por vez
- Monitorar Core Web Vitals durante rollout

#### **Plano de Rollback**
1. **Situação**: Build falha ou erros críticos
   **Ação**: Reverter commits da migração, restaurar sistema anterior
2. **Situação**: Performance degradada
   **Ação**: Ajustar configurações de cache e lazy loading
3. **Situação**: SEO impactado
   **Ação**: Implementar redirects 301 emergenciais

#### **Pontos de Checkpoint**
- Após Fase 1: Verificar se build não quebrou
- Após Fase 3: Testar navegação básica entre idiomas
- Após Fase 5: Validação completa em staging antes de produção