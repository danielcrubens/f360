<template>
  <main class="min-h-screen bg-gray-50">
    <Navbar @open-modal="openModal" />

    <section class="max-w-11/12 mx-auto xl:px-6 py-6">
      <SummaryCards
        :total-income="totalIncome"
        :total-expenses="totalExpenses"
        :balance="balance"
      />
    </section>

    <section class="max-w-11/12 mx-auto xl:px-6 pb-10">
      <TransactionList
        :transactions="filteredTransactions"
        :tabs="tabs"
        :active-tab="activeTab"
        :search-query="searchQuery"
        @update:active-tab="activeTab = $event"
        @update:search="searchQuery = $event"
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
      @update:target="deleteTarget = $event"
      @confirm="confirmDelete"
    />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/components/organisms/Navbar.vue'
import SummaryCards from '@/components/organisms/SummaryCards.vue'
import TransactionList from '@/components/organisms/TransactionList.vue'
import TransactionForm from '@/components/organisms/TransactionForm.vue'
import DeleteModal from '@/components/organisms/DeleteModal.vue'

const tabs = [
  { label: 'Todos',    value: 'all' },
  { label: 'Entradas', value: 'income' },
  { label: 'Saídas',   value: 'expense' },
]
const activeTab   = ref('all')
const searchQuery = ref('')

let _id = 1
const transactions = ref([
  { id: _id++, description: 'Salário',          type: 'income', amount: 8500,   category: 'Salário',     date: '2026-03-05' },
  { id: _id++, description: 'Restaurante #2101', type: 'expense', amount: 1355.31, category: 'Transporte', date: '2025-12-30' },
  { id: _id++, description: 'Dividendos #3598',  type: 'income', amount: 4308.75, category: 'Freelance',  date: '2025-12-30' },
  { id: _id++, description: 'Dividendos #4039',  type: 'income', amount: 3242.90, category: 'Freelance',  date: '2025-12-30' },
  { id: _id++, description: 'Presente #8392',    type: 'expense', amount: 1507.06, category: 'Educação',   date: '2025-12-30' },
  { id: _id++, description: 'Celular #9708',     type: 'expense', amount: 1645.55, category: 'Educação',   date: '2025-12-30' },
  { id: _id++, description: 'Celular #9839',     type: 'expense', amount: 1254.07, category: 'Transporte', date: '2025-12-30' },
  { id: _id++, description: 'Conta de luz #11296',type: 'expense',  amount: 397.91,  category: 'Lazer',      date: '2025-12-30' },
  { id: _id++, description: 'Renda extra #5335', type: 'income', amount: 1187.74, category: 'Outros',     date: '2025-12-30' },
])

const filteredTransactions = computed(() => {
  return transactions.value.filter(tx => {
    const matchTab = activeTab.value === 'all' || tx.type === activeTab.value
    const matchSearch = tx.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchTab && matchSearch
  })
})

const totalIncome = computed(() =>
  transactions.value.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
)
const totalExpenses = computed(() =>
  transactions.value.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
)
const balance = computed(() => totalIncome.value - totalExpenses.value)

const isModalOpen = ref(false)

function openModal() { isModalOpen.value = true }
function closeModal() { isModalOpen.value = false }

function submitForm(data) {
  transactions.value.unshift({
    id: _id++,
    description: data.description,
    type: data.type,
    amount: data.amount,
    category: data.category,
    date: data.date
  })
  closeModal()
}

const deleteTarget = ref(null)

function askDelete(tx) { deleteTarget.value = tx }

function confirmDelete() {
  transactions.value = transactions.value.filter(t => t.id !== deleteTarget.value.id)
  deleteTarget.value = null
}
</script>
