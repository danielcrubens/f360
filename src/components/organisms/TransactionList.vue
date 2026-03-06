<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div class="flex items-center gap-3 p-4 flex-wrap border-b border-gray-100">
      <FilterTabs
        :tabs="tabs"
        :model-value="activeTab"
        @update:model-value="$emit('update:activeTab', $event)"
      />
      <SearchBar
        :model-value="searchQuery"
        @update:model-value="$emit('update:search', $event)"
        placeholder="Buscar por descrição..."
      />
    </div>

    <div class="px-5 py-4 border-b border-gray-100">
      <p class="text-sm text-primary-100">
        <span class="font-semibold text-primary-100">{{ transactions.length.toLocaleString('pt-BR') }}</span> transações
      </p>
    </div>

    <ul class="divide-y divide-gray-100">
      <TransitionGroup
        name="list"
        tag="div"
      >
        <TransactionItem
          v-for="tx in transactions"
          :key="tx.id"
          :transaction="tx"
          @delete="$emit('delete', $event)"
        />
      </TransitionGroup>

      <li v-if="transactions.length === 0" class="px-5 py-12 text-center text-sm text-gray-400">
        Nenhuma transação encontrada.
      </li>
    </ul>
  </div>
</template>

<script setup>
import FilterTabs from '@/components/molecules/FilterTabs.vue'
import SearchBar from '@/components/molecules/SearchBar.vue'
import TransactionItem from '@/components/molecules/TransactionItem.vue'

defineProps({
  transactions: {
    type: Array,
    required: true
  },
  tabs: {
    type: Array,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  }
})

defineEmits(['update:activeTab', 'update:search', 'delete'])
</script>

<!-- <style scoped>
.list-enter-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-7rem);
}
</style> -->
