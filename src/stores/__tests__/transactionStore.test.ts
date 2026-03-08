import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useTransactionStore } from '@/stores/transactionStore'

describe('transactionStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('deve adicionar e deletar transação', () => {
    const store = useTransactionStore()
    store.transactions = []

    store.addTransaction({
      description: 'Teste',
      amount: 100,
      type: 'income',
      category: 'Salário',
      date: '2024-01-01'
    })

    expect(store.transactions).toHaveLength(1)

    const id = store.transactions[0].id
    store.deleteTransaction(id)

    expect(store.transactions).toHaveLength(0)
  })

  it('deve calcular totais e balance', () => {
    const store = useTransactionStore()
    store.transactions = [
      { id: '1', description: 'Salário', amount: 5000, type: 'income', category: 'Salário', date: '2024-01-01' },
      { id: '2', description: 'Aluguel', amount: 2000, type: 'expense', category: 'Moradia', date: '2024-01-02' }
    ]

    expect(store.totalIncome).toBe(5000)
    expect(store.totalExpense).toBe(2000)
    expect(store.balance).toBe(3000)
    expect(store.balanceIsPositive).toBe(true)
  })

  it('deve filtrar por tipo e buscar por texto', () => {
    const store = useTransactionStore()
    store.transactions = [
      { id: '1', description: 'Salário Mensal', amount: 5000, type: 'income', category: 'Salário', date: '2024-01-01' },
      { id: '2', description: 'Alimentação', amount: 100, type: 'expense', category: 'Alimentação', date: '2024-01-02' },
      { id: '3', description: 'Freelance', amount: 2000, type: 'income', category: 'Freelance', date: '2024-01-03' }
    ]

    store.setFilter('income')
    expect(store.filteredTransactions).toHaveLength(2)

    store.setSearch('salário')
    expect(store.filteredTransactions).toHaveLength(1)
  })
})
