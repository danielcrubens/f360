import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Transaction, TransactionInput } from '@/types/transaction'
import { getTransactions } from '@/mocks/generateTransactions'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<Transaction[]>([])
  const searchQuery = ref('')
  const filterType = ref<'all' | 'income' | 'expense'>('all')

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  const filteredTransactions = computed(() => {
    let result = transactions.value

    if (filterType.value !== 'all') {
      result = result.filter(t => t.type === filterType.value)
    }

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      result = result.filter(t =>
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      )
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })

  const totalIncome = computed(() =>
    transactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  )

  const totalExpense = computed(() =>
    transactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  )

  const balance = computed(() => totalIncome.value - totalExpense.value)

  const formattedIncome = computed(() => currencyFormatter.format(totalIncome.value))
  const formattedExpense = computed(() => currencyFormatter.format(totalExpense.value))
  const formattedBalance = computed(() => currencyFormatter.format(balance.value))
  const balanceIsPositive = computed(() => balance.value >= 0)

  function initStore() {
    if (transactions.value.length === 0) {
      transactions.value = getTransactions(30000)
    }
  }

  function addTransaction(payload: TransactionInput) {
    const newTransaction: Transaction = {
      ...payload,
      id: crypto.randomUUID()
    }
    transactions.value = [newTransaction, ...transactions.value]
  }

  function deleteTransaction(id: string) {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }

  function setFilter(type: 'all' | 'income' | 'expense') {
    filterType.value = type
  }

  function setSearch(query: string) {
    searchQuery.value = query
  }

  return {
    transactions,
    searchQuery,
    filterType,

    filteredTransactions,
    totalIncome,
    totalExpense,
    balance,
    formattedIncome,
    formattedExpense,
    formattedBalance,
    balanceIsPositive,

    initStore,
    addTransaction,
    deleteTransaction,
    setFilter,
    setSearch
  }
})
