import type { Transaction,  } from '@/types/transaction'
import { TransactionCategory } from '@/types/transaction'

type TransactionType = Transaction['type']

type ExpenseCategory = Exclude<TransactionCategory, TransactionCategory.Salário | TransactionCategory.Freelance>

const incomeDescriptions: readonly string[] = [
  'Salário Mensal',
  'Salário',
  '13º Salário',
  'Bônus Mensal',
  'Comissão',
  'Adicional de Produtividade',
  'Freelance',
  'Vendas',
  'Prêmio',
  'Participação nos Lucros'
] as const

const expenseDescriptions: Record<ExpenseCategory, readonly string[]> = {
  [TransactionCategory.Alimentação]: [
    'Supermercado Semanal',
    'Restaurante no Almoço',
    'Lanche da Tarde',
    'Mercado do Mês',
    'Pizza no Sábado',
    'Café da Manhã',
    'Jantar Especial',
    'Compras Online'
  ],
  [TransactionCategory.Saúde]: [
    'Farmácia',
    'Consulta Médica',
    'Exames Laboratoriais',
    'Dentista',
    'Farmácia Medicamentos',
    'Plano de Saúde',
    'Fisioterapia'
  ],
  [TransactionCategory.Lazer]: [
    'Cinema',
    'Streaming',
    'Viagem Final de Semana',
    'Jogos',
    'Ingressos Show',
    'Academia',
    'Livros',
    'Hobbies'
  ],
  [TransactionCategory.Transporte]: [
    'Uber',
    'Combustível',
    'Manutenção Carro',
    'Pedágio',
    'Estacionamento',
    'Transporte Público',
    'IPVA'
  ],
  [TransactionCategory.Educação]: [
    'Curso Online',
    'Livros',
    'Mensalidade Faculdade',
    'Workshop',
    'Material Didático',
    'Idiomas'
  ],
  [TransactionCategory.Moradia]: [
    'Aluguel',
    'Conta de Luz',
    'Conta de Água',
    'Internet',
    'Gás',
    'Condomínio',
    'IPTU',
    'Reforma'
  ],
  [TransactionCategory.Outros]: [
    'Compras Gerais',
    'Presente',
    'Doação',
    'Serviços',
    'Assinatura',
    'Manutenção',
    'Outros'
  ]
} as const

const expenseCategories: readonly ExpenseCategory[] = [
  TransactionCategory.Alimentação,
  TransactionCategory.Saúde,
  TransactionCategory.Lazer,
  TransactionCategory.Transporte,
  TransactionCategory.Educação,
  TransactionCategory.Moradia,
  TransactionCategory.Outros
] as const

function getRandomElement<T>(array: readonly T[]): T {
  if (array.length === 0) {
    throw new Error('Cannot get random element from empty array')
  }
  const index = Math.floor(Math.random() * array.length)
  return array[index]!
}

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function generateRandomDate(): string {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 12)

  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
  const date = new Date(randomTime)
  return date.toISOString().split('T')[0]
}

export function generateTransactions(count: number = 30000): Transaction[] {
  return Array.from({ length: count }, (): Transaction => {
    const type: TransactionType = Math.random() < 0.75 ? 'expense' : 'income'

    let category: TransactionCategory
    let description: string
    let amount: number

    if (type === 'income') {
      category = TransactionCategory.Salário
      description = getRandomElement(incomeDescriptions)
      amount = getRandomFloat(500, 15000)
    } else {
      category = getRandomElement(expenseCategories)
      const descriptions = expenseDescriptions[category]
      description = getRandomElement(descriptions)
      amount = getRandomFloat(10, 3000)
    }

    return {
      id: crypto.randomUUID(),
      description,
      amount: Math.round(amount * 100) / 100, 
      type,
      category,
      date: generateRandomDate()
    }
  })
}

let cachedTransactions: Transaction[] | null = null

export function getTransactions(count: number = 30000): Transaction[] {
  if (!cachedTransactions) {
    cachedTransactions = generateTransactions(count)
  }
  return cachedTransactions
}

export function resetTransactionCache(): void {
  cachedTransactions = null
}
