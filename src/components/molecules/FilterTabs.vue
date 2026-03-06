<template>
  <div class="flex items-center bg-gray-100 rounded-md p-1 gap-1">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      @click="$emit('update:modelValue', tab.value)"
      :class="[
        'px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer inline-flex items-center gap-2',
        modelValue === tab.value
          ? 'bg-primary text-white shadow-sm'
          : 'text-primary-100  hover:bg-gray-200'
      ]"
    >
      <component
        :is="getTabIcon(tab.value)"
        v-if="modelValue === tab.value"
        class="w-4 h-4"
      />
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
import { List, TrendingUp, TrendingDown } from 'lucide-vue-next'

defineProps({
  tabs: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])

function getTabIcon(value) {
  const icons = {
    todos: List,
    income: TrendingUp,
    expense: TrendingDown
  }
  return icons[value] || null
}
</script>
