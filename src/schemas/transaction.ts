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

})

export type TransactionInput = z.infer<typeof transactionSchema>
