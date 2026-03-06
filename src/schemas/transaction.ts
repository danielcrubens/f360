import { z } from 'zod'

export const transactionSchema = z.object({
  description: z
    .string()
    .min(3, 'Descrição deve ter pelo menos 3 caracteres')
    .max(100, 'Descrição deve ter no máximo 100 caracteres'),

  amount: z
    .number({
      required_error: 'Valor é obrigatório',
      invalid_type_error: 'Valor deve ser um número'
    })
    .positive('Valor deve ser maior que 0')
    .refine((val) => val > 0, 'Valor deve ser maior que 0'),

  type: z.enum(['income', 'expense'], {
    required_error: 'Tipo é obrigatório',
    errorMap: () => ({ message: 'Tipo deve ser receita ou despesa' })
  }),

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
  ], {
    required_error: 'Selecione uma categoria',
    invalid_type_error: 'Selecione uma categoria'
  }),

  date: z
    .string({
      required_error: 'Data é obrigatória'
    })
    .min(1, 'Data é obrigatória')
    .refine((dateStr) => {
      const selectedDate = new Date(dateStr)
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      return selectedDate <= today
    }, 'Data não pode ser no futuro')
})

export type TransactionInput = z.infer<typeof transactionSchema>


export function validateTransaction(data: unknown) {
  return transactionSchema.parse(data)
}

export function safeValidateTransaction(data: unknown) {
  return transactionSchema.safeParse(data)
}
