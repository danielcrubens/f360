import { z } from 'zod'

export const transactionSchema = z.object({
  description: z
    .string()
    .min(3, 'Descrição deve ter pelo menos 3 caracteres')
    .max(100, 'Descrição deve ter no máximo 100 caracteres'),

  amount: z
    .number()
    .positive('Valor deve ser maior que 0'),

  type: z.enum(['income', 'expense']),

  category: z.enum([
    'Alimentação',
    'Transporte',
    'Saúde',
    'Educação',
    'Lazer',
    'Moradia',
    'Salário',
    'Freelance',
    'Outros'
  ]),
})

export type TransactionInput = z.infer<typeof transactionSchema>

// Tipo completo com data para o formulário
export type TransactionFormData = TransactionInput & {
  date: string
}
