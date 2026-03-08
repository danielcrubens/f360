<template>
  <main class="min-h-screen bg-gray-50">
    <Navbar @open-modal="openModal" />

    <section class="max-w-11/12 mx-auto xl:px-6 py-6">
      <SummaryCards
        :total-income="store.totalIncome"
        :total-expenses="store.totalExpense"
        :balance="store.balance"
      />
    </section>

    <section class="max-w-11/12 mx-auto xl:px-6 pb-10">
      <TransactionList
        :transactions="store.filteredTransactions"
        :tabs="tabs"
        :active-tab="store.filterType"
        :search-query="searchInput"
        @update:active-tab="store.setFilter"
        @update:search="searchInput = $event"
        @delete="askDelete"
      />
    </section>

    <TransactionForm
      :is-open="isModalOpen"
      @close="closeModal"
      @submit="submitForm"
    />

    <DeleteModal
      :target="deleteTarget"
      @update:target="deleteTarget = null"
      @confirm="confirmDelete"
    />
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import Navbar from '@/components/organisms/Navbar.vue'
import SummaryCards from '@/components/organisms/SummaryCards.vue'
import TransactionList from '@/components/organisms/TransactionList.vue'
import TransactionForm from '@/components/organisms/TransactionForm.vue'
import DeleteModal from '@/components/organisms/DeleteModal.vue'

import { useTransactionStore } from '@/stores/transactionStore'

const toast = useToast()
const store = useTransactionStore()

onMounted(() => {
  store.initStore()
})

const searchInput = ref('')
let debounceTimer
watch(searchInput, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => store.setSearch(val), 300)
})

const deleteTarget = ref(null)
function askDelete(tx) { deleteTarget.value = tx }
function confirmDelete() {
  const txDescription = deleteTarget.value.description
  const txType = deleteTarget.value.type

  store.deleteTransaction(deleteTarget.value.id)
  deleteTarget.value = null

  toast.success(
    `${txType === 'income' ? 'Entrada' : 'Saída'} excluída: ${txDescription}`
  )
}

const form = ref({
  description: '',
  amount: '',
  type: 'income',
  category: '',
  date: new Date().toISOString().split('T')[0]
})

const isModalOpen = ref(false)

function openModal() { isModalOpen.value = true }
function closeModal() {
  isModalOpen.value = false
  form.value = {
    description: '',
    amount: '',
    type: 'income',
    category: '',
    date: new Date().toISOString().split('T')[0]
  }
}

function submitForm(data) {
  store.addTransaction({
    description: data.description,
    amount: parseFloat(data.amount),
    type: data.type,
    category: data.category,
    date: data.date
  })

  toast.success(
    `${data.type === 'income' ? 'Entrada' : 'Saída'} adicionada: ${data.description}`
  )

  closeModal()
}

const tabs = [
  { label: 'Todos',    value: 'all' },
  { label: 'Entradas', value: 'income' },
  { label: 'Saídas',   value: 'expense' },
]
</script>
