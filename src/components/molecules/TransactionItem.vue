<template>
  <li class="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors duration-150 group">
    <span :class="[
      'w-1 h-10 rounded-full shrink-0',
      transaction.type === 'income' ? 'bg-success' : 'bg-alert'
    ]" />

    <div class="flex-1 min-w-0">
      <p class="text-base font-semibold text-primary-100 truncate">{{ transaction.description }}</p>
      <p class="text-sm text-gray-400 mt-0.5">{{ transaction.category }}</p>
    </div>

    <div class="flex items-center gap-4 shrink-0">
      <div class="text-right">
        <p :class="[
          'text-sm font-bold',
          transaction.type === 'income' ? 'text-success' : 'text-alert'
        ]">
          {{ transaction.type === 'income' ? '+' : '-' }} {{ formattedValue }}
        </p>
        <p class="text-sm text-gray-400 mt-0.5">{{ formattedDate }}</p>
      </div>

      <IconButton :icon="Trash2" variant="danger" size="md"
        class="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-150" @click="$emit('delete', transaction)" />
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import IconButton from '@/components/atoms/IconButton.vue'

const props = defineProps({
  transaction: {
    type: Object,
    required: true
  }
})

defineEmits(['delete'])

const formattedValue = computed(() =>
  props.transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
)

const formattedDate = computed(() => {
  const [year, month, day] = props.transaction.date.split('-')
  return `${day}/${month}/${year}`
})
</script>
