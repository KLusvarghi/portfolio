# Design da API - Portfolio Backend

## Visão Geral

API RESTful construída com Fastify para gerenciar dados do portfolio.

---

## Stack Tecnológica

### Core
- **Fastify**: Framework web de alta performance
- **Prisma**: ORM moderno para TypeScript
- **PostgreSQL**: Banco de dados relacional
- **Zod**: Validação de schemas
- **TypeScript**: Type safety

### Autenticação & Segurança
- **@fastify/jwt**: JWT tokens
- **bcrypt**: Hash de senhas
- **@fastify/helmet**: Security headers
- **@fastify/cors**: CORS configuration
- **@fastify/rate-limit**: Rate limiting

### Utilidades
- **@fastify/multipart**: Upload de arquivos
- **@fastify/env**: Variáveis de ambiente
- **pino**: Logging (built-in Fastify)

### Desenvolvimento
- **tsx**: TypeScript executor
- **vitest**: Testes
- **prisma-erd-generator**: Diagrama do banco

---

## Estrutura de Módulos

### 1. Auth Module
**Responsabilidade**: Autenticação e autorização

**Endpoints**:
```
POST   /api/auth/login      # Login do admin
POST   /api/auth/refresh    # Refresh token
POST   /api/auth/logout     # Logout (invalidar token)
GET    /api/auth/me         # Verificar sessão atual
```

**Schemas**:
```typescript
// LoginSchema
{
  email: string;
  password: string;
}

// AuthResponse
{
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}
```

---

### 2. Profile Module
**Responsabilidade**: Informações pessoais

**Endpoints**:
```
GET    /api/profile                # Buscar perfil (público)
PUT    /api/profile                # Atualizar perfil (protegido)
POST   /api/profile/photo          # Upload de foto (protegido)
```

**Schema Prisma**:
```prisma
model Profile {
  id              String   @id @default(uuid())
  name            String
  title           String
  extendedTitle   String?
  email           String
  location        String
  linkedin        String?
  github          String?
  instagram       String?
  cv              String?
  phone           String?
  photo           String?
  yearsOfExperience String?
  teamLeadExperience String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

### 3. Summary Module
**Responsabilidade**: Resumo/Bio do portfolio

**Endpoints**:
```
GET    /api/summary               # Buscar resumo (público)
PUT    /api/summary/:id           # Atualizar resumo (protegido)
```

**Schema Prisma**:
```prisma
model Summary {
  id        String   @id @default(uuid())
  content   String   @db.Text
  locale    String   @default("pt") // pt, en
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

### 4. Experience Module
**Responsabilidade**: Experiências profissionais

**Endpoints**:
```
GET    /api/experience            # Listar experiências (público)
GET    /api/experience/:id        # Buscar uma experiência (público)
POST   /api/experience            # Criar experiência (protegido)
PUT    /api/experience/:id        # Atualizar experiência (protegido)
DELETE /api/experience/:id        # Deletar experiência (protegido)
```

**Schema Prisma**:
```prisma
model Experience {
  id              String   @id @default(uuid())
  title           String
  company         String
  location        String
  period          String
  description     String?  @db.Text
  responsibilities String[] // Array de strings
  achievements    String[] // Array de strings
  technologies    String[] // Array de strings
  type            String   // full-time, part-time, freelance, etc
  locale          String   @default("pt")
  order           Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([locale])
  @@index([order])
}
```

---

### 5. Education Module
**Responsabilidade**: Formação acadêmica

**Endpoints**:
```
GET    /api/education             # Listar formações (público)
GET    /api/education/:id         # Buscar uma formação (público)
POST   /api/education             # Criar formação (protegido)
PUT    /api/education/:id         # Atualizar formação (protegido)
DELETE /api/education/:id         # Deletar formação (protegido)
```

**Schema Prisma**:
```prisma
model Education {
  id          String   @id @default(uuid())
  institution String
  degree      String
  period      String
  mode        String   // Online, Presencial, Híbrido
  grade       String?
  locale      String   @default("pt")
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([locale])
  @@index([order])
}
```

---

### 6. Skills Module
**Responsabilidade**: Habilidades técnicas

**Endpoints**:
```
GET    /api/skills                # Buscar todas skills (público)
PUT    /api/skills                # Atualizar skills (protegido)
```

**Schema Prisma**:
```prisma
model Skills {
  id           String   @id @default(uuid())
  languages    String[] // TypeScript, JavaScript, etc
  cloud        String[] // AWS, Docker, etc
  data         String[] // PostgreSQL, Redis, etc
  quality      String[] // Jest, Vitest, etc
  architecture String[] // Clean Code, SOLID, etc
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

### 7. Projects Module
**Responsabilidade**: Projetos do portfolio

**Endpoints**:
```
GET    /api/projects              # Listar projetos (público)
GET    /api/projects/:id          # Buscar projeto (público)
POST   /api/projects              # Criar projeto (protegido)
PUT    /api/projects/:id          # Atualizar projeto (protegido)
DELETE /api/projects/:id          # Deletar projeto (protegido)
POST   /api/projects/:id/images   # Upload de imagens (protegido)
```

**Schema Prisma**:
```prisma
model Project {
  id          String   @id @default(uuid())
  title       String
  description String   @db.Text
  longDescription String? @db.Text
  technologies String[]
  category    String
  demoUrl     String?
  githubUrl   String?
  imageUrl    String?
  images      String[] // Múltiplas imagens
  featured    Boolean  @default(false)
  order       Int      @default(0)
  locale      String   @default("pt")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([locale])
  @@index([featured])
  @@index([category])
}
```

---

## Autenticação & Autorização

### JWT Strategy

**Access Token**:
- Duração: 15 minutos
- Usado para requisições autenticadas
- Payload: `{ userId, email, role }`

**Refresh Token**:
- Duração: 7 dias
- Armazenado em httpOnly cookie
- Usado para gerar novos access tokens

### Middleware de Autenticação

```typescript
// Decorator customizado
export const Authenticated = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
        return originalMethod.apply(this, [request, reply]);
      } catch (error) {
        reply.code(401).send({ error: 'Unauthorized' });
      }
    };

    return descriptor;
  };
};
```

---

## Tratamento de Erros

### Error Handler Global

```typescript
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  // Validation Error (Zod)
  if (error instanceof ZodError) {
    return reply.code(400).send({
      error: 'Validation Error',
      details: error.errors
    });
  }

  // JWT Error
  if (error.name === 'UnauthorizedError') {
    return reply.code(401).send({
      error: 'Unauthorized'
    });
  }

  // Database Error (Prisma)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002: Unique constraint violation
    if (error.code === 'P2002') {
      return reply.code(409).send({
        error: 'Resource already exists'
      });
    }
  }

  // Default Error
  reply.code(500).send({
    error: 'Internal Server Error'
  });
});
```

---

## Validação com Zod

### Exemplo de Schema

```typescript
import { z } from 'zod';

export const createExperienceSchema = z.object({
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
});

export type CreateExperienceDTO = z.infer<typeof createExperienceSchema>;
```

### Uso no Controller

```typescript
async create(request: FastifyRequest, reply: FastifyReply) {
  const data = createExperienceSchema.parse(request.body);
  const experience = await this.experienceService.create(data);
  return reply.code(201).send(experience);
}
```

---

## Upload de Arquivos

### Configuração Multipart

```typescript
import multipart from '@fastify/multipart';

fastify.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  }
});
```

### Exemplo de Upload

```typescript
async uploadPhoto(request: FastifyRequest, reply: FastifyReply) {
  const data = await request.file();

  if (!data) {
    return reply.code(400).send({ error: 'No file uploaded' });
  }

  // Validar tipo de arquivo
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(data.mimetype)) {
    return reply.code(400).send({ error: 'Invalid file type' });
  }

  // Salvar arquivo (pode ser S3, Cloudinary, filesystem, etc)
  const filename = `${uuid()}.${data.mimetype.split('/')[1]}`;
  const filePath = path.join(__dirname, '../../uploads', filename);

  await pump(data.file, fs.createWriteStream(filePath));

  return reply.send({
    url: `/uploads/${filename}`
  });
}
```

---

## Logging

### Configuração Pino

```typescript
const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV === 'development'
      ? { target: 'pino-pretty' }
      : undefined
  }
});
```

### Uso

```typescript
fastify.log.info({ user: userId }, 'User logged in');
fastify.log.error({ error }, 'Failed to fetch profile');
```

---

## Rate Limiting

```typescript
import rateLimit from '@fastify/rate-limit';

fastify.register(rateLimit, {
  max: 100, // 100 requests
  timeWindow: '15 minutes'
});

// Rate limit específico para login
fastify.register(rateLimit, {
  max: 5,
  timeWindow: '15 minutes'
}, (fastify) => {
  fastify.post('/api/auth/login', loginHandler);
});
```

---

## Variáveis de Ambiente

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"

# JWT
JWT_SECRET="your-super-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"

# Server
PORT=3001
HOST=0.0.0.0
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"

# Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=5242880 # 5MB

# Admin
ADMIN_EMAIL="kauaolusvarghi@proton.me"
ADMIN_PASSWORD_HASH="$2b$10$..." # gerado com bcrypt
```

---

## Testes

### Estrutura de Testes

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { build } from './helper';

describe('Experience Routes', () => {
  let app: FastifyInstance;
  let authToken: string;

  beforeAll(async () => {
    app = await build();

    // Login para obter token
    const response = await app.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: {
        email: 'admin@example.com',
        password: 'password123'
      }
    });

    authToken = response.json().accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should list all experiences', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/experience'
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('should create experience (authenticated)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/experience',
      headers: {
        authorization: `Bearer ${authToken}`
      },
      payload: {
        title: 'Senior Developer',
        company: 'Tech Corp',
        location: 'Remote',
        period: '2020 - Present',
        type: 'full-time'
      }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toHaveProperty('id');
  });
});
```

---

## Scripts Package.json

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsup src",
    "start": "node dist/server.js",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "db:migrate": "prisma migrate dev",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

---

## Próximos Passos

1. Criar estrutura base do Fastify
2. Configurar Prisma com PostgreSQL
3. Implementar módulo de autenticação
4. Criar módulos de dados (profile, experience, etc)
5. Adicionar validações com Zod
6. Implementar upload de arquivos
7. Criar testes para cada módulo
8. Documentar API com Swagger/OpenAPI
