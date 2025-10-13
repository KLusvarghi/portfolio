---
id: 2025-10-13-implement-react-loading-skeleton
titulo: Implementar react-loading-skeleton e refatorar sistema de loading
tipo: refactor
---

### 1. Contexto e Objetivo

Atualmente, o projeto utiliza skeleton screens criados manualmente com o componente `Skeleton` do shadcn/ui. Isso resulta em:
- Duplicação significativa de código entre os arquivos `loading.tsx`
- Dificuldade de manutenção quando é necessário ajustar estilos de loading
- Retrabalho ao criar novos skeletons para novas páginas
- Falta de padrão consistente entre os diferentes loading states

**Objetivo**: Implementar a biblioteca `react-loading-skeleton` para reduzir duplicação de código, melhorar a consistência visual e facilitar a manutenção do sistema de loading, mantendo a experiência atual de skeleton screens.

**Resultado Esperado**:
- Sistema de loading mais consistente e fácil de manter
- Redução de ~60% do código nos arquivos `loading.tsx`
- Componentes de skeleton reutilizáveis e componentizados
- Melhor suporte a tema dark/light com configuração centralizada

---

### 2. Plano de Execução

#### Fase 1: Instalação e Configuração Base
- [ ] **Passo 1.1**: Instalar a dependência `react-loading-skeleton` usando pnpm
  ```bash
  pnpm add react-loading-skeleton
  ```

- [ ] **Passo 1.2**: Criar arquivo de configuração global do skeleton em `components/ui/skeleton-config.tsx`
  - Exportar um componente `SkeletonTheme` configurado com as cores do projeto
  - Configurar `baseColor` e `highlightColor` baseados nas cores do Tailwind (zinc-800 para dark mode)
  - Garantir compatibilidade com `next-themes`

#### Fase 2: Criar Componentes de Skeleton Reutilizáveis
- [ ] **Passo 2.1**: Criar `components/loading/ProjectCardSkeleton.tsx`
  - Usar `Skeleton` do react-loading-skeleton
  - Replicar a estrutura visual do Card de projeto
  - Incluir: imagem (aspect-video), título, descrição (3 linhas), tags (3 items), botões (2)

- [ ] **Passo 2.2**: Criar `components/loading/BlogCardSkeleton.tsx`
  - Replicar estrutura do Card de blog
  - Incluir: imagem (aspect-video), data/tempo leitura, título, excerpt (3 linhas), tags (3 items), botão

- [ ] **Passo 2.3**: Criar `components/loading/VideoCardSkeleton.tsx`
  - Replicar estrutura do Card de vídeo do YouTube
  - Incluir: thumbnail (aspect-video), título (2 linhas), metadados (views, data)

- [ ] **Passo 2.4**: Criar `components/loading/HeroSkeleton.tsx`
  - Skeleton da seção hero da home
  - Incluir: badge, título, subtítulo, botões de ação

- [ ] **Passo 2.5**: Criar componentes auxiliares em `components/loading/index.tsx`
  - `FilterBarSkeleton`: skeleton da barra de filtros
  - `SearchBarSkeleton`: skeleton do input de busca
  - `SectionHeaderSkeleton`: skeleton de cabeçalhos de seção

#### Fase 3: Refatorar Arquivos de Loading Existentes
- [ ] **Passo 3.1**: Refatorar `app/loading.tsx`
  - Importar `HeroSkeleton`, `ProjectCardSkeleton`, `VideoCardSkeleton`
  - Substituir todos os `<Skeleton>` manuais pelos componentes criados
  - Manter a estrutura de layout (grid, spacing) existente

- [ ] **Passo 3.2**: Refatorar `app/projects/loading.tsx`
  - Importar `FilterBarSkeleton`, `SearchBarSkeleton`, `ProjectCardSkeleton`
  - Substituir skeletons manuais
  - Usar loop com `ProjectCardSkeleton` para gerar os 6 cards

- [ ] **Passo 3.3**: Refatorar `app/projects/[slug]/loading.tsx`
  - Verificar se é idêntico ao `app/projects/loading.tsx`
  - Se for, deletar o arquivo e deixar o Next.js usar o loading pai
  - Se não for, refatorar usando os componentes criados

- [ ] **Passo 3.4**: Refatorar `app/blog/loading.tsx`
  - Importar `FilterBarSkeleton`, `SearchBarSkeleton`, `BlogCardSkeleton`
  - Substituir skeletons manuais

- [ ] **Passo 3.5**: Refatorar `app/about/loading.tsx`
  - Criar componentes específicos se necessário: `CareerCardSkeleton`, `EducationCardSkeleton`, `SkillCardSkeleton`
  - Refatorar usando componentes reutilizáveis

#### Fase 4: Configuração de Tema e Integração
- [ ] **Passo 4.1**: Integrar `SkeletonTheme` no layout raiz
  - Editar `app/layout.tsx` para envolver o conteúdo com `SkeletonTheme`
  - Configurar cores dinamicamente baseadas no tema atual (dark/light)

- [ ] **Passo 4.2**: Ajustar configurações de animação
  - Garantir que a animação de pulse seja consistente
  - Testar performance com múltiplos skeletons na tela

#### Fase 5: Limpeza e Documentação
- [ ] **Passo 5.1**: Avaliar necessidade do componente `components/ui/skeleton.tsx`
  - Se não estiver sendo mais usado, remover o arquivo
  - Se ainda houver casos de uso específicos, manter e documentar

- [ ] **Passo 5.2**: Criar arquivo de documentação `components/loading/README.md`
  - Documentar como usar cada componente de skeleton
  - Adicionar exemplos de uso
  - Explicar quando criar novos componentes vs usar inline

- [ ] **Passo 5.3**: Atualizar `package.json` com comentário sobre a lib
  - Adicionar comentário explicando o propósito da dependência

---

### 3. Arquivos-Alvo

#### Novos Arquivos (Criar)
- `components/ui/skeleton-config.tsx` - Configuração global do tema skeleton
- `components/loading/ProjectCardSkeleton.tsx` - Skeleton de card de projeto
- `components/loading/BlogCardSkeleton.tsx` - Skeleton de card de blog
- `components/loading/VideoCardSkeleton.tsx` - Skeleton de card de vídeo
- `components/loading/HeroSkeleton.tsx` - Skeleton da seção hero
- `components/loading/index.tsx` - Exports e componentes auxiliares
- `components/loading/README.md` - Documentação dos componentes

#### Arquivos a Modificar
- `package.json` - Adicionar dependência react-loading-skeleton
- `app/layout.tsx` - Integrar SkeletonTheme provider
- `app/loading.tsx` - Refatorar usando novos componentes
- `app/projects/loading.tsx` - Refatorar usando novos componentes
- `app/projects/[slug]/loading.tsx` - Refatorar ou remover
- `app/blog/loading.tsx` - Refatorar usando novos componentes
- `app/about/loading.tsx` - Refatorar usando novos componentes

#### Arquivos a Avaliar (Possível Remoção)
- `components/ui/skeleton.tsx` - Avaliar se ainda é necessário

---

### 4. Critérios de Aceite

#### Funcionalidade
- [ ] Todas as páginas exibem skeleton screens ao carregar
- [ ] Os skeletons replicam fielmente o layout dos componentes reais
- [ ] A transição de skeleton para conteúdo real é suave
- [ ] O tema (dark/light) é aplicado corretamente aos skeletons

#### Código
- [ ] Não há duplicação de código skeleton entre arquivos `loading.tsx`
- [ ] Todos os componentes de skeleton são reutilizáveis e exportados corretamente
- [ ] O código está tipado corretamente com TypeScript (sem uso de `any`)
- [ ] As importações seguem o padrão do projeto (`@/components/...`)

#### Qualidade
- [ ] O build do projeto executa sem erros (`pnpm build`)
- [ ] O linter não reporta erros (`pnpm lint`)
- [ ] A aplicação funciona corretamente em modo desenvolvimento (`pnpm dev`)
- [ ] Não há erros de console no navegador

#### Performance
- [ ] O tempo de carregamento inicial não aumentou
- [ ] A animação dos skeletons é fluida (60fps)
- [ ] O bundle size não aumentou significativamente (verificar com `pnpm build`)

#### Documentação
- [ ] README.md criado em `components/loading/` com instruções claras
- [ ] Comentários no código explicando decisões não-óbvias
- [ ] Exemplos de uso documentados

---

### 5. Diretrizes & Regras

#### Estrutura do Projeto
- **Stack**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Componentes UI**: shadcn/ui (Radix UI + Tailwind)
- **Gerenciador de Pacotes**: pnpm
- **Tema**: next-themes para dark/light mode

#### Padrões de Código TypeScript
- **NEVER** usar o tipo `any` - o ESLint está configurado para falhar se encontrar
- **ALWAYS** tipar corretamente props de componentes com interfaces ou types
- **PREFER** usar `type` para props de componentes React
- **ALWAYS** usar import aliases (`@/components`, `@/lib`, etc.)

#### Padrões React/Next.js
- **ALWAYS** criar componentes funcionais com arrow functions
- **ALWAYS** usar `"use client"` apenas quando necessário (interatividade)
- **PREFER** Server Components quando possível
- **ALWAYS** exportar componentes como `export default` em páginas
- **PREFER** named exports em componentes reutilizáveis

#### Padrões de Estilo (Tailwind CSS)
- **ALWAYS** usar classes do Tailwind ao invés de CSS customizado
- **PREFER** usar as cores definidas no tema (zinc, primary, muted, etc.)
- **ALWAYS** manter consistência com o design system existente
- **PREFER** usar `cn()` helper para combinar classes condicionalmente

#### Componentização de Skeleton
- **ALWAYS** criar componentes de skeleton para estruturas reutilizadas mais de 2 vezes
- **PREFER** componentes pequenos e focados a componentes grandes e complexos
- **ALWAYS** manter a proporção e layout idênticos ao componente real
- **NEVER** adicionar lógica de negócio em componentes de skeleton

#### react-loading-skeleton - Boas Práticas
- **ALWAYS** usar `<Skeleton count={n}>` para múltiplas linhas ao invés de múltiplos `<Skeleton>`
- **PREFER** props `width` e `height` com unidades CSS (px, %, rem) ao invés de números
- **ALWAYS** envolver com `SkeletonTheme` para configuração de cores global
- **PREFER** usar `containerClassName` e `className` para espaçamento ao invés de wrappers

#### Organização de Arquivos
- Componentes de loading devem ficar em `components/loading/`
- Cada componente de skeleton em seu próprio arquivo
- Usar `index.tsx` para re-exports e componentes menores
- Seguir nomenclatura: `*Skeleton.tsx` para componentes de skeleton

---

### 6. Referências

#### Documentação Oficial
- [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) - Documentação oficial da biblioteca
- [Next.js Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) - Padrão de loading.tsx
- [shadcn/ui Skeleton](https://ui.shadcn.com/docs/components/skeleton) - Componente atual

#### Arquivos de Referência no Projeto
- `components/ui/skeleton.tsx` - Implementação atual do skeleton
- `app/loading.tsx` - Exemplo de loading complexo (home page)
- `components/ui/card.tsx` - Estrutura dos cards que serão replicados

#### Exemplos de Código Existentes
- Cards de projeto: `app/projects/page.tsx`
- Cards de blog: `app/blog/page.tsx`
- Seção hero: `app/page.tsx`

---

### 7. Notas Adicionais

#### Por que react-loading-skeleton?
- **Bundle pequeno**: ~2KB gzipped
- **Zero configuração**: Funciona out-of-the-box
- **Acessível**: Automaticamente adiciona atributos ARIA
- **Flexível**: Suporta qualquer tamanho/formato
- **Tema aware**: Integra bem com next-themes

#### Alternativas Consideradas (e Rejeitadas)
- **@tanstack/react-query**: Overkill para o problema, focado em cache de dados
- **Manter implementação atual**: Muito código duplicado, difícil de manter
- **react-content-loader**: Mais pesado e complexo que o necessário

#### Riscos e Mitigações
- **Risco**: Aumentar bundle size
  - **Mitigação**: A lib é pequena (~2KB), compensado pela redução de código duplicado
- **Risco**: Breaking changes visuais
  - **Mitigação**: Replicar exatamente o layout atual antes de fazer melhorias
- **Risco**: Problemas com SSR
  - **Mitigação**: react-loading-skeleton é compatível com SSR do Next.js

---

### 8. Checklist de Execução Rápida

Para a IA que vai executar esta task:

```bash
# 1. Instalar dependência
pnpm add react-loading-skeleton

# 2. Criar estrutura de pastas
mkdir -p components/loading

# 3. Criar componentes base (na ordem)
# - components/ui/skeleton-config.tsx
# - components/loading/ProjectCardSkeleton.tsx
# - components/loading/BlogCardSkeleton.tsx
# - components/loading/VideoCardSkeleton.tsx
# - components/loading/HeroSkeleton.tsx
# - components/loading/index.tsx

# 4. Refatorar loading files (na ordem)
# - app/loading.tsx
# - app/projects/loading.tsx
# - app/blog/loading.tsx
# - app/about/loading.tsx

# 5. Integrar tema
# - app/layout.tsx

# 6. Testar
pnpm build
pnpm dev

# 7. Validar
pnpm lint
```

---

**Estimativa de Tempo**: 2-3 horas
**Complexidade**: Média
**Prioridade**: Alta (reduz débito técnico significativo)
