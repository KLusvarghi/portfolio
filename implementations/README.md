# Documentação de Implementação - Portfolio Monorepo

Este diretório contém toda a documentação técnica e planejamento para transformar o portfolio em um monorepo completo com API, autenticação e internacionalização.

---

## 📚 Documentos

### [01. Arquitetura do Monorepo](./01-monorepo-architecture.md)
Descreve a estrutura completa do monorepo, organização de pastas, ferramentas utilizadas e benefícios da arquitetura proposta.

**Tópicos principais**:
- Estrutura de diretórios (apps/web, apps/api, packages/shared)
- Ferramentas (pnpm workspaces, Turborepo)
- Benefícios da arquitetura
- Passos de migração

---

### [02. Design da API](./02-api-design.md)
Especificação completa da API REST construída com Fastify, incluindo todos os endpoints, schemas, autenticação e segurança.

**Tópicos principais**:
- Stack tecnológica (Fastify, Prisma, PostgreSQL, Zod)
- Estrutura de módulos (auth, profile, experience, education, etc)
- Schemas do banco de dados (Prisma)
- Autenticação JWT
- Validação com Zod
- Upload de arquivos
- Tratamento de erros
- Rate limiting

---

### [03. Estratégia de Internacionalização](./03-i18n-strategy.md)
Abordagem para lidar com dados multilíngues após migração para API, mantendo compatibilidade com next-intl.

**Tópicos principais**:
- Problema atual vs solução proposta
- Dados dinâmicos no banco (campo locale)
- Traduções de UI com next-intl
- Estratégias de armazenamento (registros separados vs tabelas de tradução)
- API endpoints com locale
- Gerenciamento de traduções no admin
- Cache e performance
- Fallback de idiomas

---

### [04. Admin Dashboard](./04-admin-dashboard.md)
Sistema completo de autenticação e dashboard administrativo para gerenciar conteúdo do portfolio.

**Tópicos principais**:
- Rota secreta do admin
- Autenticação JWT
- Componentes (AuthGuard, Login, Sidebar)
- Layout do dashboard
- Interfaces CRUD
- Upload de imagens
- Dashboard overview
- Segurança (rate limiting, CSRF, logs de auditoria)

---

### [05. Roadmap de Implementação](./05-implementation-roadmap.md)
Plano detalhado passo a passo com todas as fases de implementação, timeline estimado e checklist completo.

**Tópicos principais**:
- 10 fases de implementação (Setup → Testes)
- Tasks detalhadas para cada fase
- Código de exemplo
- Timeline estimado (3-4 semanas)
- Próximos passos imediatos
- Sugestões de melhorias futuras

---

## 🎯 Objetivos do Projeto

1. **Monorepo**: Organizar código em apps/packages
2. **API REST**: Fastify + Prisma + PostgreSQL
3. **Autenticação**: JWT para admin dashboard
4. **Admin Dashboard**: Interface para gerenciar conteúdo
5. **Internacionalização**: Suporte a pt/en via API
6. **Type Safety**: TypeScript end-to-end com Zod

---

## 🛠️ Stack Tecnológica

### Frontend
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Shadcn UI
- next-intl
- SWR (data fetching)

### Backend
- Fastify
- Prisma ORM
- PostgreSQL
- Zod (validação)
- JWT (autenticação)
- Bcrypt (hash de senhas)

### Monorepo
- pnpm workspaces
- Turborepo
- Shared packages

### DevOps
- Docker (PostgreSQL)
- Vitest (testes)
- ESLint + Prettier

---

## 📋 Checklist de Implementação

### Fase 1: Setup do Monorepo
- [ ] Criar estrutura de pastas
- [ ] Configurar pnpm workspaces
- [ ] Configurar Turborepo
- [ ] Mover código atual para apps/web
- [ ] Testar build do monorepo

### Fase 2: Packages
- [ ] Criar packages/shared
- [ ] Extrair tipos para shared
- [ ] Criar schemas Zod
- [ ] Criar packages/config

### Fase 3: Setup da API
- [ ] Inicializar projeto API
- [ ] Configurar Prisma
- [ ] Criar schemas do banco
- [ ] Configurar Fastify
- [ ] Testar servidor básico

### Fase 4: Autenticação
- [ ] Criar hash da senha admin
- [ ] Seed do usuário admin
- [ ] Implementar POST /api/auth/login
- [ ] Implementar GET /api/auth/me
- [ ] Testar login

### Fase 5: Módulos CRUD
- [ ] Implementar Experience CRUD
- [ ] Implementar Education CRUD
- [ ] Implementar Projects CRUD
- [ ] Implementar Skills CRUD
- [ ] Implementar Profile endpoints
- [ ] Adicionar validações Zod

### Fase 6: Seed de Dados
- [ ] Criar script de seed completo
- [ ] Popular dados PT
- [ ] Popular dados EN
- [ ] Verificar dados no Prisma Studio

### Fase 7: Integração Frontend
- [ ] Criar hooks customizados (useExperiences, etc)
- [ ] Atualizar AboutPage
- [ ] Atualizar ProjectsPage
- [ ] Substituir imports estáticos por API
- [ ] Testar internacionalização

### Fase 8: Admin Dashboard
- [ ] Criar rota secreta
- [ ] Implementar página de login
- [ ] Criar AuthGuard
- [ ] Criar layout com sidebar
- [ ] Implementar CRUD de experiências
- [ ] Implementar CRUD de educação
- [ ] Implementar CRUD de projetos
- [ ] Implementar edição de perfil
- [ ] Criar dashboard overview

### Fase 9: Upload
- [ ] Configurar multipart no backend
- [ ] Criar endpoint de upload
- [ ] Criar componente ImageUpload
- [ ] Testar upload de imagens

### Fase 10: Testes & Refinamentos
- [ ] Testar autenticação
- [ ] Testar todos os CRUDs
- [ ] Testar i18n
- [ ] Adicionar rate limiting
- [ ] Implementar logs de auditoria
- [ ] Otimizar performance
- [ ] Criar documentação final

---

## 🚀 Como Começar

1. **Ler documentação completa**
   - Comece por `01-monorepo-architecture.md`
   - Leia todos os documentos na ordem

2. **Preparar ambiente**
   ```bash
   # Instalar PostgreSQL (Docker)
   docker run --name portfolio-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

   # Instalar pnpm se necessário
   npm install -g pnpm
   ```

3. **Seguir roadmap**
   - Abrir `05-implementation-roadmap.md`
   - Começar pela Fase 1
   - Completar checklist

4. **Fazer backups**
   ```bash
   # Backup dos dados atuais
   cp -r data/ data-backup/
   git add .
   git commit -m "backup: save current data before migration"
   ```

---

## 📝 Convenções

### Commits
```
feat: add experience CRUD endpoints
fix: resolve authentication bug
docs: update API documentation
refactor: improve error handling
test: add tests for auth module
chore: update dependencies
```

### Branches
```
main              # Produção
develop           # Desenvolvimento
feature/api-crud  # Features
fix/auth-bug      # Correções
```

---

## 🔗 Recursos Úteis

- [Fastify Documentation](https://www.fastify.io/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Turborepo Documentation](https://turbo.build/repo)
- [Zod Documentation](https://zod.dev/)

---

## 💡 Sugestões & Feedback

Se tiver dúvidas ou sugestões durante a implementação:

1. Documentar dúvidas em issues
2. Atualizar esta documentação conforme necessário
3. Manter changelog de decisões técnicas

---

## 📊 Status Atual

- ✅ Documentação completa criada
- ⬜ Aguardando aprovação para iniciar implementação
- ⬜ Setup do monorepo
- ⬜ API funcionando
- ⬜ Dashboard admin
- ⬜ Projeto finalizado

---

**Última atualização**: 2026-01-20
**Versão**: 1.0.0
**Autor**: Claude (com supervisão de Kauã Lusvarghi)
