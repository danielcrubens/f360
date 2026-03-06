export enum TransactionCategory {
  Alimentação = 'Alimentação',
  Transporte = 'Transporte',
  Saúde = 'Saúde',
  Educação = 'Educação',
  Lazer = 'Lazer',
  Moradia = 'Moradia',
  Salário = 'Salário',
  Freelance = 'Freelance',
  Outros = 'Outros'
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: TransactionCategory
  date: string // ISO 8601 format (YYYY-MM-DD)
}

// Type for form input (without id)
export type TransactionInput = Omit<Transaction, 'id'>
