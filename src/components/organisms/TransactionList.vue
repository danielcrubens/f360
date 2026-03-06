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

    <!-- VIRTUAL LIST: Renderiza apenas ~15 itens visíveis -->
    <div v-bind="containerProps" class="h-[600px] overflow-auto">
      <div v-bind="wrapperProps" class="relative">
        <TransactionItem
          v-for="{ data: tx, index } in list"
          :key="tx.id"
          :transaction="tx"
          @delete="$emit('delete', tx)"
        />
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="transactions.length === 0" class="px-5 py-12 text-center text-sm text-gray-400">
      Nenhuma transação encontrada.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useVirtualList } from '@vueuse/core'
import FilterTabs from '@/components/molecules/FilterTabs.vue'
import SearchBar from '@/components/molecules/SearchBar.vue'
import TransactionItem from '@/components/molecules/TransactionItem.vue'

const props = defineProps({
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

// VIRTUAL LIST: Renderiza apenas ~15 itens visíveis (de 30.000)
const { list, containerProps, wrapperProps } = useVirtualList(
  computed(() => props.transactions),
  {
    itemHeight: 80,  // Altura de cada TransactionItem (py-4 + conteúdo)
    overscan: 5      // 5 itens extras acima/abaixo (evita flicker)
  }
)
</script>

