<template>
  <div class="flex items-center bg-gray-100 rounded-md p-1 gap-1">
    <button
      :class="[
        'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer inline-flex items-center gap-2',
        !modelValue
          ? 'bg-primary text-white shadow-sm'
          : 'text-primary-100 hover:bg-gray-200'
      ]"
      aria-label="Ver lista"
      @click="$emit('update:modelValue', false)"
      title="Ver lista"
    >
      <List :size="16" />
      <span class="hidden sm:inline">Lista</span>
    </button>

    <button
      :class="[
        'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer inline-flex items-center gap-2',
        modelValue
          ? 'bg-primary text-white shadow-sm'
          : 'text-primary-100 hover:bg-gray-200'
      ]"
      aria-label="Ver gráfico"
      @click="$emit('update:modelValue', true)"
      title="Ver gráfico"
    >
      <BarChart3 :size="16" />
      <span class="hidden sm:inline">Gráfico</span>
    </button>
  </div>
</template>

<script setup>
import { List, BarChart3 } from 'lucide-vue-next'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>
