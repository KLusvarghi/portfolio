---
id: 2025-10-13-implement-react-loading-skeleton
titulo: Implementar react-loading-skeleton e refatorar sistema de loading
tipo: refactor
---

### 1. Contexto e Objetivo

Atualmente, o projeto utiliza skeleton screens criados manualmente com o componente `Skeleton` do shadcn/ui. Isso resulta em:
- Duplica��o significativa de c�digo entre os arquivos `loading.tsx`
- Dificuldade de manuten��o quando � necess�rio ajustar estilos de loading
- Retrabalho ao criar novos skeletons para novas p�ginas
- Falta de padr�o consistente entre os diferentes loading states

**Objetivo**: Implementar a biblioteca `react-loading-skeleton` para reduzir duplica��o de c�digo, melhorar a consist�ncia visual e facilitar a manuten��o do sistema de loading, mantendo a experi�ncia atual de skeleton screens.

**Resultado Esperado**:
- Sistema de loading mais consistente e f�cil de manter
- Redu��o de ~60% do c�digo nos arquivos `loading.tsx`
- Componentes de skeleton reutiliz�veis e componentizados
- Melhor suporte a tema dark/light com configura��o centralizada

---

### 2. Plano de Execu��o

#### Fase 1: Instala��o e Configura��o Base
- [ ] **Passo 1.1**: Instalar a depend�ncia `react-loading-skeleton` usando pnpm
  ```bash
  pnpm add react-loading-skeleton
  ```

- [ ] **Passo 1.2**: Criar arquivo de configura��o global do skeleton em `components/ui/skeleton-config.tsx`
  - Exportar um componente `SkeletonTheme` configurado com as cores do projeto
  - Configurar `baseColor` e `highlightColor` baseados nas cores do Tailwind (zinc-800 para dark mode)
  - Garantir compatibilidade com `next-themes`

#### Fase 2: Criar Componentes de Skeleton Reutiliz�veis
- [ ] **Passo 2.1**: Criar `components/loading/ProjectCardSkeleton.tsx`
  - Usar `Skeleton` do react-loading-skeleton
  - Replicar a estrutura visual do Card de projeto
  - Incluir: imagem (aspect-video), t�tulo, descri��o (3 linhas), tags (3 items), bot�es (2)

- [ ] **Passo 2.2**: Criar `components/loading/BlogCardSkeleton.tsx`
  - Replicar estrutura do Card de blog
  - Incluir: imagem (aspect-video), data/tempo leitura, t�tulo, excerpt (3 linhas), tags (3 items), bot�o

- [ ] **Passo 2.3**: Criar `components/loading/VideoCardSkeleton.tsx`
  - Replicar estrutura do Card de v�deo do YouTube
  - Incluir: thumbnail (aspect-video), t�tulo (2 linhas), metadados (views, data)

- [ ] **Passo 2.4**: Criar `components/loading/HeroSkeleton.tsx`
  - Skeleton da se��o hero da home
  - Incluir: badge, t�tulo, subt�tulo, bot�es de a��o

- [ ] **Passo 2.5**: Criar componentes auxiliares em `components/loading/index.tsx`
  - `FilterBarSkeleton`: skeleton da barra de filtros
  - `SearchBarSkeleton`: skeleton do input de busca
  - `SectionHeaderSkeleton`: skeleton de cabe�alhos de se��o

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
  - Verificar se � id�ntico ao `app/projects/loading.tsx`
  - Se for, deletar o arquivo e deixar o Next.js usar o loading pai
  - Se n�o for, refatorar usando os componentes criados

- [ ] **Passo 3.4**: Refatorar `app/blog/loading.tsx`
  - Importar `FilterBarSkeleton`, `SearchBarSkeleton`, `BlogCardSkeleton`
  - Substituir skeletons manuais

- [ ] **Passo 3.5**: Refatorar `app/about/loading.tsx`
  - Criar componentes espec�ficos se necess�rio: `CareerCardSkeleton`, `EducationCardSkeleton`, `SkillCardSkeleton`
  - Refatorar usando componentes reutiliz�veis

#### Fase 4: Configura��o de Tema e Integra��o
- [ ] **Passo 4.1**: Integrar `SkeletonTheme` no layout raiz
  - Editar `app/layout.tsx` para envolver o conte�do com `SkeletonTheme`
  - Configurar cores dinamicamente baseadas no tema atual (dark/light)

- [ ] **Passo 4.2**: Ajustar configura��es de anima��o
  - Garantir que a anima��o de pulse seja consistente
  - Testar performance com m�ltiplos skeletons na tela

#### Fase 5: Limpeza e Documenta��o
- [ ] **Passo 5.1**: Avaliar necessidade do componente `components/ui/skeleton.tsx`
  - Se n�o estiver sendo mais usado, remover o arquivo
  - Se ainda houver casos de uso espec�ficos, manter e documentar

- [ ] **Passo 5.2**: Criar arquivo de documenta��o `components/loading/README.md`
  - Documentar como usar cada componente de skeleton
  - Adicionar exemplos de uso
  - Explicar quando criar novos componentes vs usar inline

- [ ] **Passo 5.3**: Atualizar `package.json` com coment�rio sobre a lib
  - Adicionar coment�rio explicando o prop�sito da depend�ncia

---

### 3. Arquivos-Alvo

#### Novos Arquivos (Criar)
- `components/ui/skeleton-config.tsx` - Configura��o global do tema skeleton
- `components/loading/ProjectCardSkeleton.tsx` - Skeleton de card de projeto
- `components/loading/BlogCardSkeleton.tsx` - Skeleton de card de blog
- `components/loading/VideoCardSkeleton.tsx` - Skeleton de card de v�deo
- `components/loading/HeroSkeleton.tsx` - Skeleton da se��o hero
- `components/loading/index.tsx` - Exports e componentes auxiliares
- `components/loading/README.md` - Documenta��o dos componentes

#### Arquivos a Modificar
- `package.json` - Adicionar depend�ncia react-loading-skeleton
- `app/layout.tsx` - Integrar SkeletonTheme provider
- `app/loading.tsx` - Refatorar usando novos componentes
- `app/projects/loading.tsx` - Refatorar usando novos componentes
- `app/projects/[slug]/loading.tsx` - Refatorar ou remover
- `app/blog/loading.tsx` - Refatorar usando novos componentes
- `app/about/loading.tsx` - Refatorar usando novos componentes

#### Arquivos a Avaliar (Poss�vel Remo��o)
- `components/ui/skeleton.tsx` - Avaliar se ainda � necess�rio

---

### 4. Crit�rios de Aceite

#### Funcionalidade
- [ ] Todas as p�ginas exibem skeleton screens ao carregar
- [ ] Os skeletons replicam fielmente o layout dos componentes reais
- [ ] A transi��o de skeleton para conte�do real � suave
- [ ] O tema (dark/light) � aplicado corretamente aos skeletons

#### C�digo
- [ ] N�o h� duplica��o de c�digo skeleton entre arquivos `loading.tsx`
- [ ] Todos os componentes de skeleton s�o reutiliz�veis e exportados corretamente
- [ ] O c�digo est� tipado corretamente com TypeScript (sem uso de `any`)
- [ ] As importa��es seguem o padr�o do projeto (`@/components/...`)

#### Qualidade
- [ ] O build do projeto executa sem erros (`pnpm build`)
- [ ] O linter n�o reporta erros (`pnpm lint`)
- [ ] A aplica��o funciona corretamente em modo desenvolvimento (`pnpm dev`)
- [ ] N�o h� erros de console no navegador

#### Performance
- [ ] O tempo de carregamento inicial n�o aumentou
- [ ] A anima��o dos skeletons � fluida (60fps)
- [ ] O bundle size n�o aumentou significativamente (verificar com `pnpm build`)

#### Documenta��o
- [ ] README.md criado em `components/loading/` com instru��es claras
- [ ] Coment�rios no c�digo explicando decis�es n�o-�bvias
- [ ] Exemplos de uso documentados

---

### 5. Diretrizes & Regras

#### Estrutura do Projeto
- **Stack**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Componentes UI**: shadcn/ui (Radix UI + Tailwind)
- **Gerenciador de Pacotes**: pnpm
- **Tema**: next-themes para dark/light mode

#### Padr�es de C�digo TypeScript
- **NEVER** usar o tipo `any` - o ESLint est� configurado para falhar se encontrar
- **ALWAYS** tipar corretamente props de componentes com interfaces ou types
- **PREFER** usar `type` para props de componentes React
- **ALWAYS** usar import aliases (`@/components`, `@/lib`, etc.)

#### Padr�es React/Next.js
- **ALWAYS** criar componentes funcionais com arrow functions
- **ALWAYS** usar `"use client"` apenas quando necess�rio (interatividade)
- **PREFER** Server Components quando poss�vel
- **ALWAYS** exportar componentes como `export default` em p�ginas
- **PREFER** named exports em componentes reutiliz�veis

#### Padr�es de Estilo (Tailwind CSS)
- **ALWAYS** usar classes do Tailwind ao inv�s de CSS customizado
- **PREFER** usar as cores definidas no tema (zinc, primary, muted, etc.)
- **ALWAYS** manter consist�ncia com o design system existente
- **PREFER** usar `cn()` helper para combinar classes condicionalmente

#### Componentiza��o de Skeleton
- **ALWAYS** criar componentes de skeleton para estruturas reutilizadas mais de 2 vezes
- **PREFER** componentes pequenos e focados a componentes grandes e complexos
- **ALWAYS** manter a propor��o e layout id�nticos ao componente real
- **NEVER** adicionar l�gica de neg�cio em componentes de skeleton

#### react-loading-skeleton - Boas Pr�ticas
- **ALWAYS** usar `<Skeleton count={n}>` para m�ltiplas linhas ao inv�s de m�ltiplos `<Skeleton>`
- **PREFER** props `width` e `height` com unidades CSS (px, %, rem) ao inv�s de n�meros
- **ALWAYS** envolver com `SkeletonTheme` para configura��o de cores global
- **PREFER** usar `containerClassName` e `className` para espa�amento ao inv�s de wrappers

#### Organiza��o de Arquivos
- Componentes de loading devem ficar em `components/loading/`
- Cada componente de skeleton em seu pr�prio arquivo
- Usar `index.tsx` para re-exports e componentes menores
- Seguir nomenclatura: `*Skeleton.tsx` para componentes de skeleton

---

### 6. Refer�ncias

#### Documenta��o Oficial
- [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) - Documenta��o oficial da biblioteca
- [Next.js Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) - Padr�o de loading.tsx
- [shadcn/ui Skeleton](https://ui.shadcn.com/docs/components/skeleton) - Componente atual

#### Arquivos de Refer�ncia no Projeto
- `components/ui/skeleton.tsx` - Implementa��o atual do skeleton
- `app/loading.tsx` - Exemplo de loading complexo (home page)
- `components/ui/card.tsx` - Estrutura dos cards que ser�o replicados

#### Exemplos de C�digo Existentes
- Cards de projeto: `app/projects/page.tsx`
- Cards de blog: `app/blog/page.tsx`
- Se��o hero: `app/page.tsx`

---

### 7. Notas Adicionais

#### Por que react-loading-skeleton?
- **Bundle pequeno**: ~2KB gzipped
- **Zero configura��o**: Funciona out-of-the-box
- **Acess�vel**: Automaticamente adiciona atributos ARIA
- **Flex�vel**: Suporta qualquer tamanho/formato
- **Tema aware**: Integra bem com next-themes

#### Alternativas Consideradas (e Rejeitadas)
- **@tanstack/react-query**: Overkill para o problema, focado em cache de dados
- **Manter implementa��o atual**: Muito c�digo duplicado, dif�cil de manter
- **react-content-loader**: Mais pesado e complexo que o necess�rio

#### Riscos e Mitiga��es
- **Risco**: Aumentar bundle size
  - **Mitiga��o**: A lib � pequena (~2KB), compensado pela redu��o de c�digo duplicado
- **Risco**: Breaking changes visuais
  - **Mitiga��o**: Replicar exatamente o layout atual antes de fazer melhorias
- **Risco**: Problemas com SSR
  - **Mitiga��o**: react-loading-skeleton � compat�vel com SSR do Next.js

---

### 8. Checklist de Execu��o R�pida

Para a IA que vai executar esta task:

```bash
# 1. Instalar depend�ncia
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
**Complexidade**: M�dia
**Prioridade**: Alta (reduz d�bito t�cnico significativo)
