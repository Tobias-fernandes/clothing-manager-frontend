# Clothing Manager — Sistema de Gestão para Lojas de Vestuário

> Projeto Final — PEX0162 Engenharia de Software | UFERSA — Campus Pau dos Ferros

---

## Sumário

1. [Objetivo do Sistema](#objetivo-do-sistema)
2. [Descrição do Problema](#descrição-do-problema)
3. [Principais Funcionalidades](#principais-funcionalidades)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Arquitetura Mínima](#arquitetura-mínima)
6. [Estrutura do Projeto](#estrutura-do-projeto)
7. [Instruções de Execução](#instruções-de-execução)
8. [Integrantes da Equipe](#integrantes-da-equipe)
9. [Status Atual do Desenvolvimento](#status-atual-do-desenvolvimento)

---

## Objetivo do Sistema

O **Clothing Manager** é uma plataforma web de gestão empresarial voltada para lojas de vestuário de pequeno e médio porte. O sistema centraliza o controle de estoque, registro de vendas, acompanhamento financeiro e gerenciamento de usuários em uma única interface, permitindo que gestores e funcionários operem o negócio de forma organizada e eficiente.

---

## Descrição do Problema

Lojas de vestuário de pequeno porte frequentemente dependem de planilhas, cadernos ou sistemas genéricos para controlar suas operações. Esse cenário fragmentado gera dificuldades como:

- Falta de visibilidade em tempo real sobre o estoque e os produtos com baixa quantidade;
- Ausência de rastreabilidade nas vendas realizadas por cada funcionário;
- Dificuldade em acompanhar o fluxo financeiro (entradas e saídas) ao longo do mês;
- Gestão manual e propensa a erros de usuários e permissões de acesso.

O **Clothing Manager** resolve esses problemas oferecendo um sistema web com controle de acesso por perfil (gerente/funcionário), dashboards com indicadores em tempo real, e registros auditados de todas as operações.

---

## Principais Funcionalidades

### Para todos os usuários

| Funcionalidade | Descrição |
|---|---|
| Autenticação | Login seguro com controle de sessão via token |
| Dashboard | Painel com KPIs de vendas, estoque e finanças atualizados a cada 60 segundos |
| Produtos | Listagem com busca por nome ou código, destaque de produtos com estoque crítico |
| Vendas | Registro de novas vendas com carrinho, busca de produtos e seleção de forma de pagamento |
| Estoque | Visualização do histórico de movimentações por produto |
| Perfil | Edição de nome e senha da própria conta |

### Exclusivo para Gerentes

| Funcionalidade | Descrição |
|---|---|
| Cadastro de Produtos | Criação, edição e desativação de produtos com preço de custo e venda |
| Financeiro | Registro e visualização de receitas e despesas por categoria e período |
| Usuários | Criação, listagem e desativação de usuários com atribuição de perfil |
| Movimentação de Estoque | Registro de entradas, saídas, ajustes, perdas e devoluções |

### Formas de pagamento suportadas

PIX · Débito · Crédito à vista · Crédito parcelado · Dinheiro

---

## Tecnologias Utilizadas

### Frontend

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Next.js | 16.2.6 | Framework React com App Router (SSR/SSG) |
| React | 19.2.4 | Biblioteca de UI |
| TypeScript | 5 | Tipagem estática |
| TailwindCSS | 4 | Estilização utilitária |
| shadcn/ui + Radix UI | 1.4.3 | Componentes de interface acessíveis |
| TanStack React Query | 5.100.10 | Gerenciamento de estado do servidor e cache |
| Zustand | 5.0.13 | Gerenciamento de estado global (autenticação) |
| Axios | 1.16.1 | Cliente HTTP |
| React Hook Form + Zod | 7.75 / 3.25 | Formulários com validação de esquema |
| Motion | 12.38.0 | Animações de interface |
| next-themes | 1.0.0-beta | Suporte a tema claro/escuro |
| Lucide React | 1.14.0 | Ícones |
| Sonner | 2.0.7 | Notificações toast |

### Backend (API separada)

A aplicação consome uma API REST externa rodando em `http://localhost:3001/api/v1`. Todas as requisições são roteadas via proxy Next.js (`/api/proxy/[...path]`) para preservar credenciais e centralizar o tratamento de autenticação.

---

## Arquitetura Mínima

### Fluxo Básico de Funcionamento

```
Usuário → Navegador (Next.js App Router)
              │
              ├── Rotas públicas: /, /sign-in, /sign-up, /terms-of-use, /privacy-policy
              │
              └── Rotas privadas (auth obrigatória):
                    │
                    ├── Guardian (componente de proteção)
                    │     ├── Verifica token no Zustand Store
                    │     └── Verifica perfil (manager/employee)
                    │
                    └── Página solicitada
                          │
                          └── Resource Hook (React Query)
                                │
                                └── Axios → /api/proxy/[...path] (Next.js Route Handler)
                                                │
                                                └── API REST Backend (:3001/api/v1)
```

### Responsabilidades dos Principais Componentes

| Componente/Módulo | Responsabilidade |
|---|---|
| `app/(auth)/` | Páginas de login e cadastro com formulários validados por Zod |
| `app/(public)/` | Landing page, termos de uso e política de privacidade |
| `app/(private)/` | Todas as páginas protegidas do sistema (dashboard, produtos, vendas, etc.) |
| `app/api/proxy/` | Proxy server-side que adiciona headers de autenticação e repassa requisições ao backend |
| `components/ui/` | Biblioteca de componentes reutilizáveis baseada em shadcn/ui |
| `resources/` | Hooks React Query encapsulando todas as chamadas à API (queries e mutations) |
| `hooks/` | Hooks customizados: autenticação, debounce, logout, controle de permissão por perfil |
| `store/` | Store Zustand persistido no localStorage com estado do usuário autenticado |
| `lib/validations/` | Schemas Zod compartilhados para validação de formulários |
| `lib/helpers.ts` | Funções utilitárias de formatação (moeda, data, hora) |
| `Guardian` | Componente que protege rotas verificando autenticação e papel do usuário |
| `Sidebar` | Navegação principal com itens filtrados por perfil (gerente vê mais opções) |
| `MetricCard` | Card reutilizável de KPIs do dashboard |

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── (auth)/                         # Rotas de autenticação
│   │   ├── sign-in/                    # Página de login
│   │   └── sign-up/                    # Página de cadastro
│   ├── (public)/                       # Rotas públicas
│   │   ├── page.tsx                    # Landing page
│   │   ├── terms-of-use/
│   │   └── privacy-policy/
│   ├── (private)/                      # Rotas protegidas
│   │   ├── _components/                # Componentes compartilhados (Sidebar, Guardian, etc.)
│   │   ├── dashboard/                  # Painel principal com KPIs
│   │   ├── products/                   # Catálogo de produtos (+ /novo, /[id]/editar)
│   │   ├── sales/                      # Registro e listagem de vendas
│   │   ├── stock/                      # Movimentações de estoque
│   │   ├── finance/                    # Controle financeiro
│   │   ├── users/                      # Gerenciamento de usuários
│   │   └── profile/                    # Perfil do usuário logado
│   ├── api/
│   │   ├── auth/                       # Endpoints de sessão (login/logout)
│   │   └── proxy/[...path]/            # Proxy transparente para o backend
│   └── layout.tsx                      # Layout raiz com providers (Query, Theme, Auth)
├── components/
│   └── ui/                             # Componentes shadcn/ui reutilizáveis
├── hooks/                              # Hooks customizados
│   ├── useAuthHydrated.ts
│   ├── useDebounce.ts
│   ├── useLogout.ts
│   └── useRequireRole.ts
├── resources/                          # Hooks React Query por domínio
│   ├── dashboard.resource.ts
│   ├── products.resource.ts
│   ├── sales.resource.ts
│   ├── stock.resource.ts
│   ├── finance.resource.ts
│   ├── users.resources.ts
│   └── profile.resource.ts
├── services/                           # Configuração do cliente Axios
├── store/                              # Zustand store de autenticação
└── lib/
    ├── config/                         # Configuração de rotas
    ├── validations/                    # Schemas de validação Zod
    ├── helpers.ts                      # Formatadores (moeda, data)
    └── utils.ts                        # Funções utilitárias gerais
```

---

## Instruções de Execução

### Pré-requisitos

- Node.js 18+
- npm, yarn, pnpm ou bun
- API backend rodando em `http://localhost:3001`

### 1. Clonar o repositório

```bash
git clone <url-do-repositório>
cd "clothing manager front/app"
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
API_URL=http://localhost:3001/api/v1
```

### 4. Iniciar em modo de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### 5. Build de produção (opcional)

```bash
npm run build
npm run start
```

### Usuários padrão para teste

| Perfil | E-mail | Acesso |
|---|---|---|
| Gerente | Cadastrar via `/sign-up` e definir role no banco | Acesso total |
| Funcionário | Criado pelo gerente na tela de Usuários | Acesso restrito |

---

## Integrantes da Equipe

| Nome |
|---|
| Tobias Fernandes Figueiredo |
| Mateus Gomes Pinheiro |
| Éverson Alisson de Queiroz |

---

## Status Atual do Desenvolvimento

### Funcionalidades Implementadas ✅

- [x] Autenticação (login, cadastro, logout, proteção de rotas)
- [x] Controle de acesso por perfil (gerente / funcionário)
- [x] Dashboard com KPIs em tempo real (vendas, estoque, finanças)
- [x] Cadastro, edição e desativação de produtos
- [x] Registro de vendas com carrinho e múltiplas formas de pagamento
- [x] Histórico de movimentações de estoque com alertas de estoque baixo
- [x] Módulo financeiro com resumo por período e categorias
- [x] Gerenciamento de usuários (criação, listagem, desativação)
- [x] Perfil do usuário (edição de nome e senha)
- [x] Layout responsivo com suporte a dispositivos móveis
- [x] Modo escuro / claro
- [x] Landing page com seções de funcionalidades, planos e acesso

### Parcialmente Implementado 🔄

- [ ] Relatórios exportáveis (PDF/CSV) — estrutura de dados pronta, tela não implementada
- [ ] Filtros avançados em produtos (por categoria, cor, tamanho)

### Não Implementado ❌

- [ ] Integração com pagamento online
- [ ] Notificações push para estoque crítico
- [ ] Aplicativo mobile

---

> Projeto desenvolvido para a disciplina PEX0162 — Engenharia de Software  
> Universidade Federal Rural do Semi-Árido (UFERSA) — Centro Multidisciplinar Pau dos Ferros  
> Profa. Huliane Medeiros da Silva — 2026.1
