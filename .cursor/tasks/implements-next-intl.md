---
id: 2025-10-06-implement-next-intl-improved
titulo: Migrar sistema de i18n personalizado para Next-Intl (Versao Melhorada)
tipo: refactor
---

### 1. Contexto e Objetivo

O projeto atualmente utiliza um sistema de internacionalizacao personalizado baseado em React Context (`lib/i18n/i18n-context.tsx`) que nao oferece suporte a Server-Side Rendering (SSR), pluralizacao avancada e formatacao de dados. A migracao para Next-Intl visa melhorar a performance, SEO e funcionalidades de internacionalizacao, fornecendo uma solucao mais robusta e otimizada.

**Objetivo:** Implementar Next-Intl mantendo a funcionalidade atual (EN/PT) e aproveitando recursos avancados como SSR, formatacao de datas/numeros e melhor estrutura de arquivos de traducao, **preservando a arquitetura atual de rotas** para evitar quebras de SEO.

### 2. Plano de Execucao

#### **Fase 0: Analise e Auditoria**
- [ ] Auditar todo o codebase em busca de textos hardcodados, incluindo aria-labels, titles de icones e outros atributos de acessibilidade
- [ ] Mapear todos os componentes com aria-labels nao traduzidos (`theme-toggle.tsx`, `footer.tsx`, `header-client.tsx`, etc.)
- [ ] Identificar metadata hardcodada em `app/layout.tsx` e paginas especificas
- [ ] Analisar dados estaticos em `data/resume-data.ts` que precisam de localizacao
- [ ] Verificar scripts de build/lint disponiveis no `package.json`

#### **Fase 1: Instalacao e Configuracao Base**
- [ ] Instalar dependencia `next-intl`
- [ ] Configurar `next.config.mjs` com configuracoes de localizacao (SEM reestruturacao de rotas)
- [ ] Criar estrutura de arquivos de mensagens em `messages/`
- [ ] Configurar middleware para deteccao automatica de idioma (sem prefixos de URL)
- [ ] Manter arquitetura atual `app/layout.tsx` + `ClientLayout.tsx`

#### **Fase 2: Migracao das Traducoes**
- [ ] Converter `lib/i18n/translations.ts` para formato JSON do Next-Intl
- [ ] Criar arquivos `messages/en.json` e `messages/pt.json`
- [ ] Migrar todas as chaves de traducao existentes
- [ ] Adicionar traducoes faltantes (aria-labels, metadata, acessibilidade)
- [ ] Criar `data/resume-data.pt.ts` e `data/resume-data.en.ts` para localizacao de dados pessoais
- [ ] Adicionar secao "Metadata" aos arquivos JSON para titulos e descricoes

#### **Fase 3: Refatoracao dos Componentes**
- [ ] Substituir `useI18n()` por `useTranslations()` nos componentes cliente
- [ ] Atualizar componentes server-side para usar `getTranslations()`
- [ ] Migrar sistema de mudanca de idioma para Next-Intl
- [ ] Implementar `generateMetadata()` com `getTranslations()` em `app/layout.tsx`
- [ ] Configurar `lang` attribute dinamico em `ClientLayout.tsx`
- [ ] Implementar carregamento dinamico de `resume-data` por locale

#### **Fase 4: Otimizacoes e Melhorias**
- [ ] Implementar formatacao de datas com Next-Intl
- [ ] Configurar deteccao automatica de idioma sem mudanca de URLs
- [ ] Otimizar bundle splitting por idioma
- [ ] Implementar hreflang tags para SEO multilingue
- [ ] Configurar cache apropriado para arquivos de traducao

#### **Fase 5: Limpeza e Validacao**
- [ ] Remover sistema i18n antigo (`lib/i18n/`)
- [ ] Atualizar imports em todos os arquivos
- [ ] Testar funcionalidade completa (mudanca de idioma, SSR, navegacao)
- [ ] Validar SEO e performance

### 3. Arquivos-Alvo

#### **Novos Arquivos (Next-Intl)**
- `messages/en.json`
- `messages/pt.json`
- `middleware.ts`
- `i18n/request.ts`
- `data/resume-data.en.ts`
- `data/resume-data.pt.ts`

#### **Arquivos Modificados**
- `next.config.mjs`
- `package.json`
- `app/layout.tsx` (adicionar generateMetadata dinamica)
- `app/ClientLayout.tsx` (lang attribute dinamico)
- `components/footer.tsx` (aria-labels traduzidos)
- `components/sidebar-nav.tsx`
- `components/bottom-nav.tsx`
- `components/hero-section.tsx`
- `components/server-hero-section.tsx`
- `components/featured-projects.tsx`
- `components/youtube-videos.tsx`
- `components/theme-toggle.tsx` (aria-label traduzido)
- `components/mode-toggle.tsx` (aria-label traduzido)
- `components/header-client.tsx` (aria-label traduzido)
- Todos os arquivos de pagina (`app/**/*.tsx`)
- Componentes que usam `data/resume-data.ts`

#### **Arquivos Removidos**
- `lib/i18n/i18n-context.tsx`
- `lib/i18n/translations.ts`
- `lib/i18n/detect-language.ts`
- `components/language-detector.tsx`

### 4. Criterios de Aceite

#### **Funcionalidade**
- [ ] A troca de idioma funciona corretamente (EN ↔ PT)
- [ ] Todas as paginas sao renderizadas no idioma correto
- [ ] URLs mantem estrutura atual (sem prefixos de localizacao)
- [ ] Deteccao automatica de idioma funciona (browser + geolocalizacao)
- [ ] Metadata (title, description) e traduzida corretamente
- [ ] Aria-labels e textos de acessibilidade sao traduzidos
- [ ] Dados pessoais em `resume-data` sao localizados corretamente
- [ ] Attribute `lang` do HTML reflete o idioma selecionado

#### **Performance e SEO**
- [ ] SSR funciona corretamente para ambos os idiomas
- [ ] Bundle splitting por idioma esta ativo
- [ ] Meta tags Open Graph sao localizadas
- [ ] Hreflang tags implementadas para SEO multilingue
- [ ] Cache de traducoes configurado adequadamente

#### **Qualidade do Codigo**
- [ ] Build e bem-sucedido (`npm run build`)
- [ ] Linting passa (`npm run lint`)
- [ ] TypeScript compila sem erros
- [ ] Nao ha console.errors relacionados a i18n
- [ ] Type-safety das traducoes esta funcionando

#### **Compatibilidade**
- [ ] Navegacao entre paginas preserva o idioma
- [ ] Mudanca de idioma mantem a pagina atual (sem redirects)
- [ ] Estado do idioma e persistido no localStorage
- [ ] Funciona em dispositivos moveis e desktop
- [ ] Compatibilidade com sistema de deteccao automatica

### 5. Diretrizes & Regras

#### **Estrutura de Arquivos**
- Manter arquitetura atual do Next.js 14 App Router SEM rotas localizadas
- Organizar mensagens em estrutura hierarquica clara
- Manter separacao entre componentes client/server
- Usar TypeScript para type-safety das traducoes
- Implementar carregamento dinamico para dados localizados

#### **Padroes de Codigo**
- **PROIBIDO** usar o tipo `any` - o ESLint configurado falhara
- Utilizar hooks apropriados (`useTranslations` para client, `getTranslations` para server)
- Manter consistencia na nomenclatura das chaves de traducao
- Implementar fallbacks apropriados para traducoes faltantes

#### **Performance**
- Implementar lazy loading das mensagens por rota
- Configurar cache apropriado para arquivos de traducao
- Minimizar re-renders desnecessarios durante mudanca de idioma
- Otimizar bundle size excluindo idiomas nao utilizados

#### **SEO e Acessibilidade**
- Configurar `lang` attribute dinamico corretamente no HTML
- Implementar hreflang tags para SEO multilingue
- Garantir que TODOS aria-labels sejam traduzidos
- Manter URLs atuais (sem mudancas para preservar SEO)
- Traduzir metadata de todas as paginas

### 6. Riscos & Plano de Rollback

#### **Riscos Identificados**
- **Medio**: Perda de estado do idioma selecionado pelo usuario
- **Medio**: Dados pessoais em resume-data nao traduzidos
- **Baixo**: Problemas de performance com SSR
- **Baixo**: Aria-labels nao traduzidos impactando acessibilidade

#### **Estrategia de Mitigacao**
- Manter URLs atuais para preservar SEO
- Implementar sistema robusto de deteccao e persistencia de idioma
- Fazer deploy incremental testando uma pagina por vez
- Validar todos os aria-labels antes da migracao
- Monitorar Core Web Vitals durante rollout

#### **Plano de Rollback**
1. **Situacao**: Build falha ou erros criticos
   **Acao**: Reverter commits da migracao, restaurar sistema anterior
2. **Situacao**: Performance degradada
   **Acao**: Ajustar configuracoes de cache e lazy loading
3. **Situacao**: Dados nao localizados corretamente
   **Acao**: Fallback para `resume-data.ts` original

#### **Pontos de Checkpoint**
- Apos Fase 0: Inventario completo de textos a traduzir
- Apos Fase 1: Verificar se build nao quebrou
- Apos Fase 3: Testar navegacao basica entre idiomas e localizacao de dados
- Apos Fase 5: Validacao completa de acessibilidade e SEO antes de producao

### 7. Exemplos de Implementacao

#### **Carregamento Dinamico de Resume Data**
```typescript
// Em componentes que usam resume-data
import { getLocale } from 'next-intl/server';

export default async function AboutPage() {
  const locale = await getLocale();
  const resumeData = (await import(`@/data/resume-data.${locale}.ts`)).default;

  return <ResumeComponent data={resumeData} />;
}
```

#### **Metadata Dinamica**
```typescript
// app/layout.tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: {
      default: t('defaultTitle'),
      template: t('template'),
    },
    description: t('description'),
  };
}
```

#### **Aria-labels Traduzidos**
```typescript
// Exemplo para theme-toggle.tsx
const t = useTranslations('Common');

<button aria-label={t('toggleTheme')}>
  {/* content */}
</button>
```