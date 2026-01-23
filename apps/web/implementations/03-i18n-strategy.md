# Estratégia de Internacionalização (i18n)

## Problema Atual

Atualmente, os dados do portfolio (experiências, educação, projetos) estão hardcoded em arquivos TypeScript (`data/resume-data.pt.ts` e `data/resume-data.en.ts`). Com a migração para API, precisamos de uma nova estratégia de i18n.

---

## Solução Proposta

### Abordagem Híbrida

1. **Dados Dinâmicos (API)**: Armazenados no banco de dados com campo `locale`
2. **Traduções de UI**: Mantidas em arquivos JSON com `next-intl`

---

## Arquitetura de i18n

### 1. Dados no Banco de Dados

Cada entidade terá um campo `locale` para identificar o idioma:

```prisma
model Experience {
  id          String   @id @default(uuid())
  title       String
  company     String
  locale      String   @default("pt") // 'pt' ou 'en'
  // ... outros campos

  @@index([locale])
}
```

**Estratégias de Armazenamento**:

#### Opção A: Registros Separados (Recomendado)
Cada tradução é um registro separado no banco.

**Vantagens**:
- Simples de implementar
- Queries rápidas
- Fácil adicionar novos idiomas
- Sem complexidade de JSON

**Desvantagens**:
- Duplicação de dados
- Precisa sincronizar IDs relacionados

**Exemplo**:
```typescript
// Português
{
  id: 'exp-1-pt',
  title: 'Desenvolvedor Full Stack',
  company: 'Tech Corp',
  locale: 'pt'
}

// Inglês
{
  id: 'exp-1-en',
  title: 'Full Stack Developer',
  company: 'Tech Corp',
  locale: 'en'
}
```

#### Opção B: Tabelas de Tradução
Tabela principal + tabela de traduções.

**Schema**:
```prisma
model Experience {
  id           String   @id @default(uuid())
  company      String   // Dados invariantes
  period       String
  type         String
  translations ExperienceTranslation[]
}

model ExperienceTranslation {
  id           String   @id @default(uuid())
  experienceId String
  locale       String
  title        String
  description  String?
  experience   Experience @relation(fields: [experienceId], references: [id])

  @@unique([experienceId, locale])
}
```

**Vantagens**:
- Separação clara entre dados invariantes e traduções
- Não duplica dados comuns
- Melhor para muitos idiomas

**Desvantagens**:
- Queries mais complexas (JOINs)
- Mais tabelas no banco

---

### 2. API Endpoints com Locale

**Estratégia 1: Query Parameter (Recomendado)**
```typescript
GET /api/experience?locale=pt
GET /api/experience?locale=en
```

**Implementação**:
```typescript
async list(request: FastifyRequest, reply: FastifyReply) {
  const { locale = 'pt' } = request.query as { locale?: string };

  const experiences = await prisma.experience.findMany({
    where: { locale },
    orderBy: { order: 'asc' }
  });

  return reply.send(experiences);
}
```

**Estratégia 2: Header Accept-Language**
```typescript
async list(request: FastifyRequest, reply: FastifyReply) {
  const locale = request.headers['accept-language']?.startsWith('en') ? 'en' : 'pt';

  const experiences = await prisma.experience.findMany({
    where: { locale },
    orderBy: { order: 'asc' }
  });

  return reply.send(experiences);
}
```

**Estratégia 3: Path Parameter**
```typescript
GET /api/pt/experience
GET /api/en/experience
```

---

### 3. Frontend: next-intl

**Manter para traduções de UI**:

```json
// messages/pt.json
{
  "nav": {
    "home": "Início",
    "about": "Sobre",
    "projects": "Projetos"
  },
  "about": {
    "title": "Sobre Mim",
    "career": "Carreira"
  }
}
```

**Nova estrutura de chamadas**:

```typescript
// hooks/usePortfolioData.ts
export function usePortfolioData() {
  const locale = useLocale();

  const { data: profile } = useSWR(
    `/api/profile?locale=${locale}`,
    fetcher
  );

  const { data: experiences } = useSWR(
    `/api/experience?locale=${locale}`,
    fetcher
  );

  return { profile, experiences };
}
```

---

## Migração de Dados

### Seed do Banco de Dados

Criar script para popular banco com dados atuais:

```typescript
// apps/api/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import resumeDataPt from '../../web/data/resume-data.pt';
import resumeDataEn from '../../web/data/resume-data.en';

const prisma = new PrismaClient();

async function seed() {
  // Profile PT
  await prisma.profile.upsert({
    where: { id: 'profile-pt' },
    update: {},
    create: {
      ...resumeDataPt.personalInfo,
      locale: 'pt'
    }
  });

  // Profile EN
  await prisma.profile.upsert({
    where: { id: 'profile-en' },
    update: {},
    create: {
      ...resumeDataEn.personalInfo,
      locale: 'en'
    }
  });

  // Experiences PT
  for (const [index, exp] of resumeDataPt.experience.entries()) {
    await prisma.experience.create({
      data: {
        ...exp,
        locale: 'pt',
        order: index
      }
    });
  }

  // Experiences EN
  for (const [index, exp] of resumeDataEn.experience.entries()) {
    await prisma.experience.create({
      data: {
        ...exp,
        locale: 'en',
        order: index
      }
    });
  }

  // ... repetir para education, projects, etc
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

**Executar**:
```bash
pnpm --filter api db:seed
```

---

## Gerenciamento de Traduções no Admin

### Interface de Edição

O dashboard admin deve permitir editar em múltiplos idiomas:

```typescript
// Componente de edição
function ExperienceForm({ experienceId }: { experienceId?: string }) {
  const [activeLocale, setActiveLocale] = useState<'pt' | 'en'>('pt');

  // Buscar dados para ambos os idiomas
  const { data: dataPt } = useSWR(
    experienceId ? `/api/experience/${experienceId}?locale=pt` : null
  );

  const { data: dataEn } = useSWR(
    experienceId ? `/api/experience/${experienceId}?locale=en` : null
  );

  const handleSubmit = async (formData: ExperienceFormData) => {
    // Salvar para o locale ativo
    await fetch(`/api/experience`, {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        locale: activeLocale
      })
    });
  };

  return (
    <div>
      {/* Tabs para alternar entre idiomas */}
      <Tabs value={activeLocale} onValueChange={setActiveLocale}>
        <TabsList>
          <TabsTrigger value="pt">🇧🇷 Português</TabsTrigger>
          <TabsTrigger value="en">🇺🇸 English</TabsTrigger>
        </TabsList>

        <TabsContent value="pt">
          <ExperienceFormFields defaultValues={dataPt} />
        </TabsContent>

        <TabsContent value="en">
          <ExperienceFormFields defaultValues={dataEn} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## Cache & Performance

### Cache no Frontend (SWR)

```typescript
import useSWR from 'swr';

export function useExperiences(locale: string) {
  const { data, error, mutate } = useSWR(
    `/api/experience?locale=${locale}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minuto
    }
  );

  return {
    experiences: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}
```

### Cache no Backend (Redis)

```typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function getExperiences(locale: string) {
  // Tentar cache primeiro
  const cached = await redis.get(`experiences:${locale}`);
  if (cached) {
    return JSON.parse(cached);
  }

  // Buscar do banco
  const experiences = await prisma.experience.findMany({
    where: { locale },
    orderBy: { order: 'asc' }
  });

  // Cachear por 5 minutos
  await redis.setex(
    `experiences:${locale}`,
    300,
    JSON.stringify(experiences)
  );

  return experiences;
}
```

---

## Fallback de Idiomas

### Estratégia de Fallback

Se uma tradução não existir, usar fallback:

```typescript
async function getExperience(id: string, locale: string) {
  let experience = await prisma.experience.findFirst({
    where: { id, locale }
  });

  // Fallback para português se não existir tradução
  if (!experience && locale !== 'pt') {
    experience = await prisma.experience.findFirst({
      where: { id, locale: 'pt' }
    });
  }

  return experience;
}
```

---

## Recomendações

### Para Este Projeto

**Usar Opção A (Registros Separados)**:
- Projeto pequeno/médio
- Apenas 2 idiomas (pt, en)
- Simplicidade > Otimização prematura
- Fácil de entender e manter

### Estrutura Final

```
Frontend (next-intl):
  - Traduções de UI em /messages/*.json
  - useLocale() para pegar idioma atual
  - Passar locale para API via query param

Backend (Prisma):
  - Campo locale em cada entidade
  - Registros separados por idioma
  - Endpoint aceita ?locale=pt ou ?locale=en

Admin Dashboard:
  - Tabs para alternar entre idiomas
  - Formulários separados para cada tradução
  - Indicador visual de traduções faltantes
```

---

## Checklist de Implementação

- [ ] Adicionar campo `locale` em todos os schemas Prisma
- [ ] Criar seed script para popular banco com dados atuais
- [ ] Atualizar endpoints da API para aceitar `?locale=`
- [ ] Criar hooks customizados no frontend (useExperiences, useProfile, etc)
- [ ] Substituir imports estáticos por chamadas à API
- [ ] Criar interface de edição multilíngue no admin
- [ ] Implementar fallback de idiomas
- [ ] (Opcional) Adicionar cache com Redis
- [ ] Testar todos os fluxos em ambos os idiomas
- [ ] Remover arquivos estáticos de dados após confirmar funcionamento

---

## Exemplo Completo de Fluxo

### 1. Usuário visita site em português
```
1. Frontend detecta locale 'pt' (cookie/next-intl)
2. Usa hook: useExperiences('pt')
3. Faz request: GET /api/experience?locale=pt
4. Backend filtra por locale: WHERE locale = 'pt'
5. Retorna experiências em português
6. Frontend renderiza dados
```

### 2. Admin edita experiência
```
1. Admin abre formulário de edição
2. Vê tabs: [PT] [EN]
3. Edita versão PT, salva
4. POST /api/experience { ...data, locale: 'pt' }
5. Muda para tab EN
6. Edita versão EN, salva
7. POST /api/experience { ...data, locale: 'en' }
8. Ambas versões salvas no banco separadamente
```

---

## Recursos Adicionais

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Prisma i18n Patterns](https://www.prisma.io/docs/guides/database/advanced-database-tasks/data-localization)
- [SWR Documentation](https://swr.vercel.app/)
