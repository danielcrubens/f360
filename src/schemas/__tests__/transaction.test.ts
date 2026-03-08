import { describe, it, expect } from 'vitest'
import { transactionSchema } from '@/schemas/transaction'

describe('transactionSchema', () => {
  const validInput = {
    description: 'Salário Mensal',
    amount: 5000,
    type: 'income' as const,
    category: 'Salário' as const,
    date: '2024-01-01'
  }

  it('deve aceitar transação válida', () => {
    const result = transactionSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it('deve rejeitar descrição curta', () => {
    const result = transactionSchema.safeParse({ ...validInput, description: 'ab' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar valor zero ou negativo', () => {
    const zeroResult = transactionSchema.safeParse({ ...validInput, amount: 0 })
    const negativeResult = transactionSchema.safeParse({ ...validInput, amount: -100 })

    expect(zeroResult.success).toBe(false)
    expect(negativeResult.success).toBe(false)
  })



  it('deve rejeitar categoria ausente', () => {
    const { category, ...inputWithoutCategory } = validInput
    const result = transactionSchema.safeParse(inputWithoutCategory)

    expect(result.success).toBe(false)
  })
})
