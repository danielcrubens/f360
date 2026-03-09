# Gerenciador de Transações Financeiras

Aplicação para visualizar, adicionar, excluir e filtrar transações financeiras (receitas e despesas) com dados mockados


## Tecnologias Utilizadas

- **Vue 3** (Composition API) - Framework
- **TypeScript** - Tipagem
- **Pinia** - Gerenciamento de estado
- **Zod** - Validação de schemas
- **Tailwind CSS** - Estilização
- **Vitest** - Testes unitários
- **Highcharts** - Gráficos
- **VueUse** - Composables utilitários
- **Vue Toastification** - Notificações toast

---
## Decisões Técnicas

### 1. Performance para 30.000 Transações

**Problema**: Renderizar 30k itens no DOM causaria travamentos e consumo excessivo de memória

**Solução**: **Virtual Scroll** via `@vueuse/core`

Apenas os itens visíveis + `overscan` são renderizados no DOM. Ao fazer scroll, itens invisíveis são removidos e novos são adicionados, mantendo o consumo de memória constante

**Resultado**: Lista fluida mesmo com 30k+ itens

---

### 2. Gerenciamento de Estado com Pinia

**Problema**: Compartilhar estado (transações, filtros, busca) entre componentes de forma centralizada

**Solução**: **Pinia** com Composition API

Estado centralizado com propriedades computadas para filtros e totais. Os valores derivados são cacheados automaticamente e atualizados de forma reativa quando os dados mudam

**Benefícios**: Estado centralizado, tipagem segura, ferramentas de debug e valores cacheados automaticamente

---

### 3. Estratégia de Validação

**Problema**: Validar formulários com feedback claro e garantia de tipagem segura

**Solução**: **Zod** com validação integrada ao componente

Schema Zod centralizado define as regras de validação. O componente valida o formulário ao submeter e exibe erros específicos por campo. Erros somem automaticamente quando o usuário corrige o campo

**Vantagens**: Inferência de tipos automática, mensagens padronizadas, schema reutilizável para testes

---

### 4. Resumo Financeiro Reativo

**Problema**: Manter totais (entradas, saídas, saldo) atualizados automaticamente ao adicionar/remover transações

**Solução**: **Propriedades computadas** na store Pinia

Vue rastreia as dependências dos valores automaticamente. Quando a lista de transações muda, os totais são recalculados e os valores formatados são atualizados nos componentes

**Como funciona**: Cache inteligente + recálculo apenas quando as dependências mudam

---

### 5. Tipagem TypeScript

**Problema**: Garantir tipagem segura em toda a aplicação

**Solução**: **Interfaces centralizadas** + inferência de tipos do Zod

Interfaces TypeScript definem o contrato dos dados. O tipo `TransactionInput` é inferido automaticamente do schema Zod, garantindo consistência entre validação e tipagem

**Benefícios**: Auto-completar em editores de código, erros em tempo de compilação, refactoring seguro

---

## Por que Atomic Design?

Organização dos componentes em **átomos → moléculas → organismos** para maximizar reusabilidade e escalabilidade

### Hierarquia

```
src/components/
├── atoms/          # Componentes elementares
├── molecules/      # Combinações simples
└── organisms/      # Estruturas complexas
```

### Exemplos

| Nível | Componentes | Exemplo |
|-------|-------------|---------|
| **Átomos** | Button, Input, Select, IconButton, IconBadge | Componentes mínimos reutilizáveis |
| **Moléculas** | FilterTabs, SearchBar, SummaryCard, TransactionItem, ConfirmDialog, TypeToggle, ViewToggle | Combina 2+ átomos com funcionalidade própria |
| **Organismos** | TransactionList, TransactionForm, Navbar, TransactionChart, SummaryCards, DeleteModal | Estruturas completas que combinam moléculas e átomos |

### Benefícios

- **Reusabilidade**: Button e Input são reutilizados em múltiplos contextos
- **Testabilidade**: Cada nível pode ser testado isoladamente
- **Escalabilidade**: Novas features combinam componentes existentes
- **Manutenibilidade**: Mudanças em um átomo se propagam para todos os usos

---

## Estrutura de Pastas

```
gerenciador/
├── src/
│   ├── components/
│   │   ├── atoms/           # Button, IconBadge, IconButton, Input, Select
│   │   ├── molecules/       # ConfirmDialog, FilterTabs, SearchBar, SummaryCard, TransactionItem, TypeToggle, ViewToggle
│   │   └── organisms/       # DeleteModal, Navbar, SummaryCards, TransactionChart, TransactionForm, TransactionList
│   ├── mocks/               # Dados mockados (generateTransactions.ts)
│   ├── schemas/             # Schemas Zod de validação
│   │   └── __tests__/       # Testes dos schemas
│   ├── stores/              # Stores Pinia (transactionStore.ts)
│   │   └── __tests__/       # Testes das stores
│   ├── types/               # Interfaces TypeScript
│   ├── assets/              # main.css (CSS global)
│   ├── App.vue              # Componente raiz
│   └── main.ts              # Entry point
├── public/                  # Arquivos públicos
├── index.html              # HTML template
├── package.json            # Dependências e scripts
├── vite.config.ts          # Configuração Vite
└── tsconfig.json           # Configuração TypeScript
```

### Justificativa

- **`components/`**: Separação por níveis de complexidade (Atomic Design)
- **`stores/`**: Lógica de estado centralizada e testável
- **`schemas/`**: Validação isolada da lógica de componentes (single responsibility)
- **`types/`**: Tipos reutilizáveis em toda a aplicação
- **`__tests__/`**: Testes ao lado do código testado

---

## Como Rodar

### Pré-requisitos

- **Node.js** 20.19.0+ ou 22.12.0+
- **npm** (ou yarn/pnpm)

### Instalação

Instale todas as dependências do projeto


```
npm install
```

### Rode a aplicação


```
npm run dev
```

### Testes

```
npm run test:unit   
```








