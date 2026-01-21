# Roadmap de Implementação - Portfolio Monorepo

## Visão Geral

Este documento apresenta um plano passo a passo para transformar o portfolio em um monorepo completo com API, autenticação e internacionalização.

---

## Fases de Implementação

### Fase 1: Setup do Monorepo (1-2 dias)

**Objetivo**: Configurar estrutura base do monorepo

#### Tasks:

1. **Criar estrutura de pastas**
   ```bash
   mkdir -p apps/web apps/api packages/shared packages/config
   ```

2. **Configurar pnpm workspaces**
   ```yaml
   # pnpm-workspace.yaml
   packages:
     - 'apps/*'
     - 'packages/*'
   ```

3. **Configurar Turborepo**
   ```bash
   pnpm add turbo -w -D
   ```

   ```json
   // turbo.json
   {
     "$schema": "https://turbo.build/schema.json",
     "pipeline": {
       "build": {
         "dependsOn": ["^build"],
         "outputs": [".next/**", "dist/**"]
       },
       "dev": {
         "cache": false
       },
       "lint": {
         "outputs": []
       }
     }
   }
   ```

4. **Mover código atual para apps/web**
   ```bash
   # Mover tudo exceto node_modules, .git
   rsync -av --exclude='node_modules' --exclude='.git' ./ apps/web/
   ```

5. **Atualizar package.json raiz**
   ```json
   {
     "name": "portfolio-monorepo",
     "private": true,
     "scripts": {
       "dev": "turbo run dev",
       "build": "turbo run build",
       "lint": "turbo run lint"
     },
     "devDependencies": {
       "turbo": "latest"
     },
     "packageManager": "pnpm@8.0.0"
   }
   ```

**Resultado esperado**: Monorepo funcionando com Next.js em `apps/web`

---

### Fase 2: Packages Compartilhados (1 dia)

**Objetivo**: Criar pacotes para código compartilhado

#### 2.1 Criar `packages/shared`

```bash
cd packages/shared
pnpm init
```

```json
// packages/shared/package.json
{
  "name": "@portfolio/shared",
  "version": "0.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

#### 2.2 Extrair tipos

```bash
# Mover tipos existentes
cp apps/web/data/types.ts packages/shared/src/types/
```

```typescript
// packages/shared/src/types/index.ts
export * from './profile.types';
export * from './experience.types';
export * from './education.types';
export * from './projects.types';
export * from './skills.types';
```

#### 2.3 Criar schemas Zod

```typescript
// packages/shared/src/schemas/experience.schema.ts
import { z } from 'zod';

export const experienceSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  period: z.string().min(1).max(50),
  description: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  type: z.enum(['full-time', 'part-time', 'freelance', 'contract']),
  locale: z.enum(['pt', 'en']).default('pt'),
  order: z.number().default(0),
});

export type Experience = z.infer<typeof experienceSchema>;
export type CreateExperienceDTO = Omit<Experience, 'id'>;
export type UpdateExperienceDTO = Partial<CreateExperienceDTO>;
```

#### 2.4 Criar `packages/config`

```bash
cd packages/config
mkdir -p eslint typescript
```

```json
// packages/config/eslint/package.json
{
  "name": "@portfolio/eslint-config",
  "version": "0.0.0",
  "main": "index.js"
}
```

**Resultado esperado**: Tipos e validações compartilhados entre apps

---

### Fase 3: Setup da API (2-3 dias)

**Objetivo**: Criar API base com Fastify + Prisma

#### 3.1 Inicializar projeto

```bash
cd apps/api
pnpm init
```

```json
// apps/api/package.json
{
  "name": "@portfolio/api",
  "version": "0.0.0",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsup src",
    "start": "node dist/server.js",
    "db:migrate": "prisma migrate dev",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@fastify/cors": "^9.0.0",
    "@fastify/helmet": "^11.0.0",
    "@fastify/jwt": "^8.0.0",
    "@fastify/multipart": "^8.0.0",
    "@portfolio/shared": "workspace:*",
    "fastify": "^4.25.0",
    "prisma": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "bcrypt": "^5.1.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/node": "^20.0.0",
    "tsup": "^8.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### 3.2 Configurar Prisma

```bash
pnpm prisma init
```

```prisma
// apps/api/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id                String   @id @default(uuid())
  name              String
  title             String
  extendedTitle     String?
  email             String
  location          String
  linkedin          String?
  github            String?
  instagram         String?
  cv                String?
  phone             String?
  photo             String?
  yearsOfExperience String?
  teamLeadExperience String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Summary {
  id        String   @id @default(uuid())
  content   String   @db.Text
  locale    String   @default("pt")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([locale])
}

model Experience {
  id              String   @id @default(uuid())
  title           String
  company         String
  location        String
  period          String
  description     String?  @db.Text
  responsibilities String[]
  achievements    String[]
  technologies    String[]
  type            String
  locale          String   @default("pt")
  order           Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([locale])
  @@index([order])
}

model Education {
  id          String   @id @default(uuid())
  institution String
  degree      String
  period      String
  mode        String
  grade       String?
  locale      String   @default("pt")
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([locale])
  @@index([order])
}

model Skills {
  id           String   @id @default(uuid())
  languages    String[]
  cloud        String[]
  data         String[]
  quality      String[]
  architecture String[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Project {
  id              String   @id @default(uuid())
  title           String
  description     String   @db.Text
  longDescription String?  @db.Text
  technologies    String[]
  category        String
  demoUrl         String?
  githubUrl       String?
  imageUrl        String?
  images          String[]
  featured        Boolean  @default(false)
  order           Int      @default(0)
  locale          String   @default("pt")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([locale])
  @@index([featured])
  @@index([category])
}
```

```bash
pnpm db:migrate
pnpm db:generate
```

#### 3.3 Criar servidor Fastify

```typescript
// apps/api/src/server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
});

// Plugins
fastify.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
});

fastify.register(helmet);

fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'supersecret',
});

// Health check
fastify.get('/health', async () => {
  return { status: 'ok' };
});

// Routes
// TODO: Register routes

const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 3001,
      host: process.env.HOST || '0.0.0.0',
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```env
# apps/api/.env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
JWT_SECRET="your-super-secret-key-change-in-production"
PORT=3001
HOST=0.0.0.0
CORS_ORIGIN="http://localhost:3000"
```

```bash
# Testar servidor
pnpm dev
```

**Resultado esperado**: API rodando em `http://localhost:3001`

---

### Fase 4: Módulo de Autenticação (1 dia)

**Objetivo**: Implementar login JWT

#### 4.1 Criar hash da senha admin

```typescript
// apps/api/scripts/hash-password.ts
import bcrypt from 'bcrypt';

const password = process.argv[2];
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
```

```bash
tsx scripts/hash-password.ts "sua-senha-aqui"
# Copiar hash gerado
```

#### 4.2 Seed do usuário admin

```typescript
// apps/api/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'kauaolusvarghi@proton.me' },
    update: {},
    create: {
      email: 'kauaolusvarghi@proton.me',
      name: 'Kauã Lusvarghi',
      password: '$2b$10$...', // Hash da senha
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

```bash
tsx prisma/seed.ts
```

#### 4.3 Implementar rotas de autenticação

```typescript
// apps/api/src/modules/auth/auth.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return reply.code(401).send({ error: 'Invalid credentials' });
  }

  const token = request.server.jwt.sign(
    { userId: user.id, email: user.email },
    { expiresIn: '7d' }
  );

  return reply.send({
    accessToken: token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}

export async function me(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
    return reply.send({ user: request.user });
  } catch (error) {
    return reply.code(401).send({ error: 'Unauthorized' });
  }
}
```

```typescript
// apps/api/src/modules/auth/auth.routes.ts
import { FastifyInstance } from 'fastify';
import { login, me } from './auth.controller';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', login);
  fastify.get('/me', me);
}
```

```typescript
// apps/api/src/server.ts (adicionar)
import { authRoutes } from './modules/auth/auth.routes';

fastify.register(authRoutes, { prefix: '/api/auth' });
```

**Resultado esperado**: Login funcionando em `POST /api/auth/login`

---

### Fase 5: Módulos CRUD (3-4 dias)

**Objetivo**: Implementar CRUD para todas entidades

#### Implementar para cada módulo:
- Experience
- Education
- Projects
- Skills
- Profile

**Exemplo (Experience)**:

```typescript
// apps/api/src/modules/experience/experience.service.ts
import { PrismaClient } from '@prisma/client';
import { CreateExperienceDTO, UpdateExperienceDTO } from '@portfolio/shared';

const prisma = new PrismaClient();

export class ExperienceService {
  async findAll(locale: string = 'pt') {
    return prisma.experience.findMany({
      where: { locale },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string) {
    return prisma.experience.findUnique({ where: { id } });
  }

  async create(data: CreateExperienceDTO) {
    return prisma.experience.create({ data });
  }

  async update(id: string, data: UpdateExperienceDTO) {
    return prisma.experience.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.experience.delete({ where: { id } });
  }
}
```

```typescript
// apps/api/src/modules/experience/experience.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { ExperienceService } from './experience.service';
import { experienceSchema } from '@portfolio/shared';

const service = new ExperienceService();

export async function listExperiences(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { locale = 'pt' } = request.query as { locale?: string };
  const experiences = await service.findAll(locale);
  return reply.send(experiences);
}

export async function createExperience(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
    const data = experienceSchema.parse(request.body);
    const experience = await service.create(data);
    return reply.code(201).send(experience);
  } catch (error) {
    return reply.code(400).send({ error });
  }
}

// ... outros métodos
```

**Repetir para todos os módulos**

**Resultado esperado**: Todas CRUDs funcionando

---

### Fase 6: Seed de Dados (1 dia)

**Objetivo**: Popular banco com dados atuais

```typescript
// apps/api/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import resumeDataPt from '../../web/data/resume-data.pt';
import resumeDataEn from '../../web/data/resume-data.en';

const prisma = new PrismaClient();

async function main() {
  // User admin
  await prisma.user.upsert({
    where: { email: 'kauaolusvarghi@proton.me' },
    update: {},
    create: {
      email: 'kauaolusvarghi@proton.me',
      name: 'Kauã Lusvarghi',
      password: '$2b$10$...', // Hash da senha
    },
  });

  // Profile PT
  await prisma.profile.create({
    data: {
      ...resumeDataPt.personalInfo,
    },
  });

  // Experiences PT
  for (const [index, exp] of resumeDataPt.experience.entries()) {
    await prisma.experience.create({
      data: {
        ...exp,
        locale: 'pt',
        order: index,
        responsibilities: exp.responsibilities || [],
        achievements: exp.achievements || [],
        technologies: exp.technologies || [],
      },
    });
  }

  // Experiences EN
  for (const [index, exp] of resumeDataEn.experience.entries()) {
    await prisma.experience.create({
      data: {
        ...exp,
        locale: 'en',
        order: index,
        responsibilities: exp.responsibilities || [],
        achievements: exp.achievements || [],
        technologies: exp.technologies || [],
      },
    });
  }

  // ... repetir para education, projects, etc
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

```bash
pnpm db:seed
```

**Resultado esperado**: Banco populado com dados

---

### Fase 7: Integração Frontend-API (2-3 dias)

**Objetivo**: Conectar Next.js com API

#### 7.1 Criar hooks customizados

```typescript
// apps/web/hooks/use-portfolio-data.ts
import useSWR from 'swr';
import { useLocale } from 'next-intl';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useExperiences() {
  const locale = useLocale();
  const { data, error, mutate } = useSWR(
    `http://localhost:3001/api/experience?locale=${locale}`,
    fetcher
  );

  return {
    experiences: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useProfile() {
  const locale = useLocale();
  const { data, error } = useSWR(
    `http://localhost:3001/api/profile?locale=${locale}`,
    fetcher
  );

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
  };
}

// ... outros hooks
```

#### 7.2 Atualizar páginas

```typescript
// apps/web/app/[locale]/about/page.tsx
'use client';

import { useExperiences, useEducation, useProfile } from '@/hooks/use-portfolio-data';

export default function AboutPage() {
  const { profile, isLoading: profileLoading } = useProfile();
  const { experiences, isLoading: expLoading } = useExperiences();
  const { education, isLoading: eduLoading } = useEducation();

  if (profileLoading || expLoading || eduLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Renderizar dados da API */}
    </div>
  );
}
```

**Resultado esperado**: Frontend consumindo dados da API

---

### Fase 8: Admin Dashboard (3-4 dias)

**Objetivo**: Criar dashboard administrativo

#### 8.1 Criar estrutura de rotas

```bash
cd apps/web/app
mkdir -p [locale]/portal-kl-2026/{login,dashboard}
```

#### 8.2 Implementar autenticação

- Criar página de login
- Implementar AuthGuard
- Criar sidebar e layout

#### 8.3 Criar CRUD interfaces

- Lista de experiências
- Formulário de edição
- Upload de imagens
- Repetir para todas entidades

**Ver detalhes em**: `04-admin-dashboard.md`

**Resultado esperado**: Dashboard funcionando

---

### Fase 9: Upload de Arquivos (1 dia)

**Objetivo**: Implementar upload de imagens

#### 9.1 Backend

```typescript
import multipart from '@fastify/multipart';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';

fastify.register(multipart);

fastify.post('/api/upload', async (request, reply) => {
  const data = await request.file();
  // ... validações
  // ... salvar arquivo
  return reply.send({ url: `/uploads/${filename}` });
});
```

#### 9.2 Frontend

```typescript
// Component de upload
<ImageUpload onUploadSuccess={(url) => setValue('photo', url)} />
```

**Resultado esperado**: Upload funcionando

---

### Fase 10: Testes & Refinamentos (2-3 dias)

**Objetivo**: Testar e refinar todo sistema

#### Tasks:

- [ ] Testar fluxo completo de autenticação
- [ ] Testar CRUD de todas entidades
- [ ] Testar upload de imagens
- [ ] Testar internacionalização
- [ ] Verificar segurança (JWT, rate limiting, etc)
- [ ] Otimizar performance
- [ ] Adicionar tratamento de erros
- [ ] Melhorar UX do admin
- [ ] Documentar código
- [ ] Criar README atualizado

**Resultado esperado**: Sistema completo e testado

---

## Timeline Estimado

| Fase | Tempo Estimado | Acumulado |
|------|----------------|-----------|
| 1. Setup Monorepo | 1-2 dias | 2 dias |
| 2. Packages | 1 dia | 3 dias |
| 3. Setup API | 2-3 dias | 6 dias |
| 4. Autenticação | 1 dia | 7 dias |
| 5. CRUDs | 3-4 dias | 11 dias |
| 6. Seed | 1 dia | 12 dias |
| 7. Integração | 2-3 dias | 15 dias |
| 8. Admin Dashboard | 3-4 dias | 19 dias |
| 9. Upload | 1 dia | 20 dias |
| 10. Testes | 2-3 dias | 23 dias |

**Total estimado**: 3-4 semanas (trabalhando diariamente)

---

## Próximos Passos Imediatos

1. ✅ Revisar documentação criada
2. ⬜ Aprovar arquitetura e roadmap
3. ⬜ Começar Fase 1: Setup do Monorepo
4. ⬜ Commit frequentes para não perder progresso
5. ⬜ Testar cada fase antes de avançar

---

## Observações Importantes

- **Não pular etapas**: Cada fase depende da anterior
- **Testar constantemente**: Evita debugging complexo depois
- **Commits frequentes**: Facilita reverter mudanças se necessário
- **Backup dos dados**: Antes de migrar, fazer backup dos arquivos atuais
- **Manter site funcionando**: Durante migração, site deve continuar acessível

---

## Sugestões Adicionais

### Melhorias Futuras (Pós-MVP)

1. **Cache com Redis**
   - Cache de respostas da API
   - Melhor performance

2. **CDN para imagens**
   - Cloudinary ou S3
   - Otimização automática

3. **CI/CD**
   - GitHub Actions
   - Deploy automático

4. **Testes automatizados**
   - Vitest para API
   - Playwright para E2E

5. **Logs centralizados**
   - Sentry para erros
   - Analytics de uso

6. **Backup automático**
   - Backup diário do banco
   - S3 para armazenamento

7. **Versionamento de API**
   - `/api/v1/...`
   - Suporte a múltiplas versões

8. **Webhooks**
   - Notificar mudanças
   - Integração com outros serviços
