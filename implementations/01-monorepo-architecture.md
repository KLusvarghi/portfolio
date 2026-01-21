# Arquitetura do Monorepo - Portfolio + API

## Visão Geral

Transformar o projeto atual em um monorepo que contenha:
- **apps/web**: Frontend Next.js (código atual)
- **apps/api**: Backend Fastify
- **packages/shared**: Código compartilhado (tipos, validadores, utils)
- **packages/config**: Configurações compartilhadas (ESLint, TypeScript, etc)

---

## Estrutura Proposta

```
portfolio/
├── apps/
│   ├── web/                    # Next.js Frontend
│   │   ├── app/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── messages/           # Apenas UI translations
│   │   ├── public/
│   │   └── package.json
│   │
│   └── api/                    # Fastify Backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   │   ├── auth.controller.ts
│       │   │   │   ├── auth.service.ts
│       │   │   │   └── auth.routes.ts
│       │   │   ├── profile/
│       │   │   │   ├── profile.controller.ts
│       │   │   │   ├── profile.service.ts
│       │   │   │   ├── profile.routes.ts
│       │   │   │   └── profile.repository.ts
│       │   │   ├── experience/
│       │   │   ├── education/
│       │   │   ├── projects/
│       │   │   └── skills/
│       │   ├── infra/
│       │   │   ├── database/
│       │   │   │   ├── prisma/
│       │   │   │   └── migrations/
│       │   │   ├── http/
│       │   │   └── plugins/
│       │   ├── shared/
│       │   │   ├── middleware/
│       │   │   ├── guards/
│       │   │   └── decorators/
│       │   └── server.ts
│       ├── test/
│       ├── .env.example
│       └── package.json
│
├── packages/
│   ├── shared/                 # Código compartilhado
│   │   ├── src/
│   │   │   ├── types/         # DTOs, Interfaces, Types
│   │   │   │   ├── profile.types.ts
│   │   │   │   ├── experience.types.ts
│   │   │   │   ├── education.types.ts
│   │   │   │   └── auth.types.ts
│   │   │   ├── schemas/       # Zod schemas para validação
│   │   │   │   ├── profile.schema.ts
│   │   │   │   ├── experience.schema.ts
│   │   │   │   └── auth.schema.ts
│   │   │   ├── constants/
│   │   │   └── utils/
│   │   └── package.json
│   │
│   ├── config/                 # Configs compartilhadas
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── package.json
│   │
│   └── ui/                     # (Futuro) Componentes compartilhados
│
├── package.json                # Root package.json
├── pnpm-workspace.yaml
├── turbo.json                  # Turborepo config
└── README.md
```

---

## Benefícios da Arquitetura

### 1. Separação de Responsabilidades
- Frontend focado em UI/UX
- Backend focado em lógica de negócio e dados
- Código compartilhado em pacotes reutilizáveis

### 2. Type Safety End-to-End
- Tipos compartilhados entre frontend e backend
- Validação consistente com Zod em ambos os lados
- Menos bugs e melhor DX (Developer Experience)

### 3. Escalabilidade
- Fácil adicionar novos apps (mobile, admin panel, etc)
- Packages podem ser publicados como bibliotecas NPM
- Cada app pode ter suas próprias dependências

### 4. Performance de Build
- Turborepo para builds incrementais
- Cache de dependências compartilhado
- Builds paralelos

---

## Ferramentas a Utilizar

### Gerenciamento de Monorepo
- **pnpm workspaces**: Gerenciamento de dependências
- **Turborepo**: Build system e caching

### Backend (API)
- **Fastify**: Framework web (alta performance)
- **Prisma**: ORM para banco de dados
- **Zod**: Validação de schemas
- **JWT**: Autenticação
- **Bcrypt**: Hash de senhas

### Banco de Dados
- **PostgreSQL**: Banco principal (recomendado para produção)
- **SQLite**: Alternativa para desenvolvimento local

### Testes
- **Vitest**: Testes unitários e integração
- **Supertest**: Testes de API

### Qualidade de Código
- **ESLint**: Linting compartilhado
- **Prettier**: Formatação de código
- **TypeScript**: Type checking em todo monorepo

---

## Passos de Migração

### Fase 1: Preparação
1. Criar estrutura de pastas do monorepo
2. Configurar pnpm workspaces
3. Configurar Turborepo
4. Mover código atual do Next.js para `apps/web`

### Fase 2: Packages Compartilhados
1. Criar `packages/shared`
2. Extrair tipos do `data/types.ts` para `packages/shared/types`
3. Criar schemas Zod para validação
4. Criar `packages/config` com configs compartilhadas

### Fase 3: API
1. Criar estrutura base do Fastify em `apps/api`
2. Configurar Prisma
3. Criar módulos para cada entidade (profile, experience, etc)
4. Implementar autenticação JWT

### Fase 4: Integração
1. Conectar frontend com API
2. Migrar dados estáticos para banco
3. Implementar chamadas API no frontend
4. Ajustar contextos e hooks

### Fase 5: Admin Dashboard
1. Criar rota secreta para admin
2. Implementar autenticação
3. Criar formulários de CRUD
4. Implementar upload de imagens

---

## Próximos Passos

1. Revisar e aprovar arquitetura
2. Criar estrutura de pastas
3. Configurar ferramentas (pnpm, turbo, etc)
4. Começar migração gradual

---

## Observações Importantes

- **Manter funcionalidade atual**: Durante a migração, o site deve continuar funcionando
- **Migração gradual**: Não fazer tudo de uma vez
- **Testes**: Testar cada módulo conforme implementado
- **Documentação**: Manter docs atualizadas durante o processo
