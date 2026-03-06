<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <SummaryCard
      :icon="TrendingUp"
      label="Entradas"
      :value="totalIncome"
      color-scheme="green"
    />
    <SummaryCard
      :icon="TrendingDown"
      label="Saídas"
      :value="totalExpenses"
      color-scheme="red"
    />
    <SummaryCard
      :icon="Wallet"
      label="Saldo"
      :value="balance"
      color-scheme="primary"
    />
  </div>
</template>

<script setup>
import { TrendingUp, TrendingDown, Wallet } from 'lucide-vue-next'
import SummaryCard from '@/components/molecules/SummaryCard.vue'

defineProps({
  totalIncome: {
    type: Number,
    required: true
  },
  totalExpenses: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})
</script>
