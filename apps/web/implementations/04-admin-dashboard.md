# Admin Dashboard - Sistema de Autenticação e Gerenciamento

## Visão Geral

Dashboard administrativo para gerenciar todo o conteúdo do portfolio de forma segura e intuitiva.

---

## Segurança da Rota

### Rota Secreta

**EVITAR rotas óbvias**:
- ❌ `/admin`
- ❌ `/dashboard`
- ❌ `/administrador`
- ❌ `/painel`

**Usar rota não-óbvia**:
- ✅ `/portal-kl-2026` (exemplo)
- ✅ `/manage-content-xyz`
- ✅ `/cms-private-access`

**Implementação**:
```typescript
// apps/web/app/[locale]/(admin)/portal-kl-2026/layout.tsx
import { AuthGuard } from '@/components/auth/auth-guard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
```

### Variável de Ambiente

Para maior flexibilidade, usar variável de ambiente:

```env
# .env.local
NEXT_PUBLIC_ADMIN_ROUTE=portal-kl-2026
```

```typescript
// middleware.ts ou rota dinâmica
const ADMIN_ROUTE = process.env.NEXT_PUBLIC_ADMIN_ROUTE || 'admin';

// Proteger rota
if (pathname.includes(`/${ADMIN_ROUTE}`)) {
  // Verificar autenticação
}
```

---

## Autenticação

### JWT Strategy

**Fluxo de Autenticação**:
```
1. Admin acessa /portal-kl-2026/login
2. Insere email + senha
3. POST /api/auth/login
4. Backend valida credenciais
5. Retorna accessToken (JWT) + refreshToken
6. Frontend armazena tokens
7. Redireciona para dashboard
```

### Armazenamento de Tokens

**Access Token**: localStorage ou state (curta duração)
**Refresh Token**: httpOnly cookie (seguro)

```typescript
// lib/auth.ts
export class AuthService {
  private static ACCESS_TOKEN_KEY = 'admin_access_token';

  static setAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static clearTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
```

---

## Componentes de Autenticação

### AuthGuard Component

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!AuthService.isAuthenticated()) {
        const adminRoute = process.env.NEXT_PUBLIC_ADMIN_ROUTE || 'admin';
        router.push(`/${adminRoute}/login`);
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
```

### Login Page

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthService } from '@/lib/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Para receber cookies
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const { accessToken } = await response.json();
      AuthService.setAccessToken(accessToken);

      toast.success('Login realizado com sucesso!');

      const adminRoute = process.env.NEXT_PUBLIC_ADMIN_ROUTE || 'admin';
      router.push(`/${adminRoute}/dashboard`);
    } catch (error) {
      toast.error('Email ou senha incorretos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-2xl dark:bg-slate-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Acesse o painel administrativo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
```

---

## Layout do Dashboard

### Estrutura de Rotas

```
/portal-kl-2026/
├── login                    # Página de login
└── dashboard/              # Dashboard principal
    ├── page.tsx            # Overview
    ├── profile/            # Editar perfil
    ├── experience/         # Gerenciar experiências
    │   ├── page.tsx        # Lista
    │   ├── new/           # Criar nova
    │   └── [id]/          # Editar existente
    ├── education/          # Gerenciar educação
    ├── projects/           # Gerenciar projetos
    ├── skills/             # Gerenciar skills
    └── settings/           # Configurações
```

### Sidebar Component

```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Settings,
  LogOut,
  Code,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthService } from '@/lib/auth';
import { Button } from '@/components/ui/button';

const ADMIN_ROUTE = process.env.NEXT_PUBLIC_ADMIN_ROUTE || 'admin';

const navigation = [
  {
    name: 'Dashboard',
    href: `/${ADMIN_ROUTE}/dashboard`,
    icon: LayoutDashboard,
  },
  {
    name: 'Perfil',
    href: `/${ADMIN_ROUTE}/dashboard/profile`,
    icon: User,
  },
  {
    name: 'Experiências',
    href: `/${ADMIN_ROUTE}/dashboard/experience`,
    icon: Briefcase,
  },
  {
    name: 'Educação',
    href: `/${ADMIN_ROUTE}/dashboard/education`,
    icon: GraduationCap,
  },
  {
    name: 'Projetos',
    href: `/${ADMIN_ROUTE}/dashboard/projects`,
    icon: FolderGit2,
  },
  {
    name: 'Skills',
    href: `/${ADMIN_ROUTE}/dashboard/skills`,
    icon: Code,
  },
  {
    name: 'Configurações',
    href: `/${ADMIN_ROUTE}/dashboard/settings`,
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    AuthService.clearTokens();
    window.location.href = `/${ADMIN_ROUTE}/login`;
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-slate-50 dark:bg-slate-900">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Portal</h2>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
      </div>
    </div>
  );
}
```

### Dashboard Layout

```typescript
import { Sidebar } from '@/components/admin/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
```

---

## CRUD Interfaces

### Lista de Experiências

```typescript
'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const ADMIN_ROUTE = process.env.NEXT_PUBLIC_ADMIN_ROUTE || 'admin';

export default function ExperiencePage() {
  const [locale, setLocale] = useState<'pt' | 'en'>('pt');

  const { data: experiences, mutate } = useSWR(
    `/api/experience?locale=${locale}`,
    fetcher
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir?')) return;

    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      });

      if (response.ok) {
        toast.success('Experiência excluída com sucesso!');
        mutate();
      }
    } catch (error) {
      toast.error('Erro ao excluir experiência');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experiências</h1>
          <p className="text-muted-foreground">
            Gerenciar experiências profissionais
          </p>
        </div>

        <Link href={`/${ADMIN_ROUTE}/dashboard/experience/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Experiência
          </Button>
        </Link>
      </div>

      {/* Tabs de idioma */}
      <div className="flex gap-2">
        <Button
          variant={locale === 'pt' ? 'default' : 'outline'}
          onClick={() => setLocale('pt')}
        >
          🇧🇷 Português
        </Button>
        <Button
          variant={locale === 'en' ? 'default' : 'outline'}
          onClick={() => setLocale('en')}
        >
          🇺🇸 English
        </Button>
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {experiences?.map((exp) => (
          <Card key={exp.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <p className="text-muted-foreground">
                  {exp.company} • {exp.period}
                </p>
              </div>

              <div className="flex gap-2">
                <Link href={`/${ADMIN_ROUTE}/dashboard/experience/${exp.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

### Formulário de Edição

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const experienceSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  company: z.string().min(1, 'Empresa é obrigatória'),
  location: z.string().min(1, 'Localização é obrigatória'),
  period: z.string().min(1, 'Período é obrigatório'),
  description: z.string().optional(),
  responsibilities: z.string().optional(), // Será convertido para array
  achievements: z.string().optional(), // Será convertido para array
  technologies: z.string().optional(), // Será convertido para array
  type: z.enum(['full-time', 'part-time', 'freelance', 'contract']),
  locale: z.enum(['pt', 'en']),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

export function ExperienceForm({
  experienceId,
  locale,
}: {
  experienceId?: string;
  locale: 'pt' | 'en';
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      locale,
      type: 'full-time',
    },
  });

  const onSubmit = async (data: ExperienceFormData) => {
    try {
      // Converter strings separadas por vírgula em arrays
      const payload = {
        ...data,
        responsibilities: data.responsibilities?.split(',').map((s) => s.trim()),
        achievements: data.achievements?.split(',').map((s) => s.trim()),
        technologies: data.technologies?.split(',').map((s) => s.trim()),
      };

      const url = experienceId
        ? `/api/experience/${experienceId}`
        : '/api/experience';

      const response = await fetch(url, {
        method: experienceId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Experiência salva com sucesso!');
        router.back();
      }
    } catch (error) {
      toast.error('Erro ao salvar experiência');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input id="title" {...register('title')} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Empresa *</Label>
          <Input id="company" {...register('company')} />
          {errors.company && (
            <p className="text-sm text-red-500">{errors.company.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Localização *</Label>
          <Input id="location" {...register('location')} />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="period">Período *</Label>
          <Input
            id="period"
            placeholder="Jan 2020 - Presente"
            {...register('period')}
          />
          {errors.period && (
            <p className="text-sm text-red-500">{errors.period.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo *</Label>
          <select
            id="type"
            {...register('type')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="freelance">Freelance</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="locale">Idioma *</Label>
          <select
            id="locale"
            {...register('locale')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
            disabled
          >
            <option value="pt">🇧🇷 Português</option>
            <option value="en">🇺🇸 English</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          rows={4}
          {...register('description')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="responsibilities">
          Responsabilidades (separadas por vírgula)
        </Label>
        <Textarea
          id="responsibilities"
          placeholder="Desenvolver features, Code review, Mentoria"
          rows={3}
          {...register('responsibilities')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="achievements">
          Conquistas (separadas por vírgula)
        </Label>
        <Textarea
          id="achievements"
          placeholder="Aumentou performance em 50%, Reduziu bugs"
          rows={3}
          {...register('achievements')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="technologies">
          Tecnologias (separadas por vírgula)
        </Label>
        <Input
          id="technologies"
          placeholder="React, Node.js, TypeScript"
          {...register('technologies')}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
```

---

## Upload de Imagens

### Component de Upload

```typescript
'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/lib/auth';
import { toast } from 'sonner';
import Image from 'next/image';

export function ImageUpload({
  currentImage,
  onUploadSuccess,
}: {
  currentImage?: string;
  onUploadSuccess: (url: string) => void;
}) {
  const [preview, setPreview] = useState(currentImage);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      toast.error('Apenas imagens são permitidas');
      return;
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Imagem muito grande (máx 5MB)');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        setPreview(url);
        onUploadSuccess(url);
        toast.success('Imagem enviada com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao enviar imagem');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    onUploadSuccess('');
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative">
          <Image
            src={preview}
            alt="Preview"
            width={300}
            height={300}
            className="rounded-lg object-cover"
          />
          <Button
            size="icon"
            variant="destructive"
            className="absolute -right-2 -top-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="flex h-64 w-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Clique para enviar
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}
```

---

## Dashboard Overview

### Estatísticas Rápidas

```typescript
'use client';

import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, GraduationCap, FolderGit2, Code } from 'lucide-react';

export default function DashboardPage() {
  const { data: stats } = useSWR('/api/stats');

  const cards = [
    {
      title: 'Experiências',
      value: stats?.experiences || 0,
      icon: Briefcase,
      color: 'text-blue-500',
    },
    {
      title: 'Educação',
      value: stats?.education || 0,
      icon: GraduationCap,
      color: 'text-green-500',
    },
    {
      title: 'Projetos',
      value: stats?.projects || 0,
      icon: FolderGit2,
      color: 'text-purple-500',
    },
    {
      title: 'Skills',
      value: stats?.skills || 0,
      icon: Code,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do conteúdo do portfolio
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Últimas atualizações */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Atualizações</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Lista de últimas modificações */}
          <p className="text-sm text-muted-foreground">
            Implementar lista de auditoria
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Segurança Adicional

### Rate Limiting no Login

```typescript
// Backend: limite de tentativas de login
let loginAttempts = new Map<string, number>();

fastify.post('/api/auth/login', {
  preHandler: async (request, reply) => {
    const ip = request.ip;
    const attempts = loginAttempts.get(ip) || 0;

    if (attempts >= 5) {
      return reply.code(429).send({
        error: 'Muitas tentativas. Tente novamente em 15 minutos',
      });
    }
  },
}, loginHandler);
```

### CSRF Protection

```typescript
import csrf from '@fastify/csrf-protection';

fastify.register(csrf);
```

### Logs de Auditoria

```prisma
model AuditLog {
  id        String   @id @default(uuid())
  userId    String
  action    String   // create, update, delete
  resource  String   // experience, education, etc
  resourceId String?
  changes   Json?
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([createdAt])
}
```

---

## Checklist de Implementação

- [ ] Definir rota secreta do admin
- [ ] Criar página de login
- [ ] Implementar AuthGuard component
- [ ] Criar layout do dashboard com sidebar
- [ ] Implementar CRUD de experiências
- [ ] Implementar CRUD de educação
- [ ] Implementar CRUD de projetos
- [ ] Implementar edição de perfil
- [ ] Implementar edição de skills
- [ ] Criar componente de upload de imagens
- [ ] Adicionar suporte multilíngue nos formulários
- [ ] Implementar dashboard overview com estatísticas
- [ ] Adicionar validações com Zod
- [ ] Implementar rate limiting
- [ ] Adicionar logs de auditoria
- [ ] Testar fluxo completo de autenticação

---

## Próximos Passos

1. Implementar backend de autenticação (JWT)
2. Criar estrutura de rotas do admin
3. Desenvolver componentes de CRUD
4. Adicionar sistema de upload
5. Implementar dashboard overview
6. Adicionar segurança e auditoria
