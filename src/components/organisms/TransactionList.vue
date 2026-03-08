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
      <ViewToggle v-model="showChart" />
    </div>

    <Transition
      enter-active-class="transition-all duration-500"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-500"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 -translate-y-2"
      mode="out-in"
    >
      <template v-if="!showChart">
        <div>
          <div class="px-5 py-4 border-b border-gray-100">
            <p class="text-sm text-primary-100">
              <span class="font-semibold text-primary-100">{{ transactions.length.toLocaleString('pt-BR') }}</span> transações
            </p>
          </div>

          <div v-if="transactions.length === 0" class="h-[600px] flex flex-col items-center justify-center gap-4">
            <SearchAlert class="w-12 h-12 text-primary-100" />
            <h2 class="lg:text-lg xl:text-xl font-semibold text-primary-100">Nenhuma transação encontrada</h2>
          </div>

          <template v-else>
            <div v-bind="containerProps" class="h-[600px] overflow-auto">
              <ul v-bind="wrapperProps" class="relative m-0 p-0 list-none">
                <TransactionItem
                  v-for="{ data: tx, index } in list"
                  :key="tx.id"
                  :transaction="tx"
                  @delete="$emit('delete', tx)"
                />
              </ul>
            </div>
          </template>
        </div>
      </template>

      <TransactionChart
        v-else
        :transactions="transactions"
        :filter-type="activeTab"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { SearchAlert } from 'lucide-vue-next'
import FilterTabs from '@/components/molecules/FilterTabs.vue'
import SearchBar from '@/components/molecules/SearchBar.vue'
import ViewToggle from '@/components/molecules/ViewToggle.vue'
import TransactionItem from '@/components/molecules/TransactionItem.vue'
import TransactionChart from '@/components/organisms/TransactionChart.vue'

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

const showChart = ref(false) 

const { list, containerProps, wrapperProps } = useVirtualList(
  computed(() => props.transactions),
  {
    itemHeight: 80,  
    overscan: 5      
  }
)
</script>

