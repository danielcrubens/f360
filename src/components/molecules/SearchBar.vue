<template>
  <div class="relative flex-1 min-w-48">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      :aria-label="placeholder || 'Buscar'"
      class="w-full bg-white border border-gray-200 rounded-md pl-9 pr-4 py-2 text-sm text-primary-100 placeholder-gray-400 outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-150"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Buscar...'
  }
})

defineEmits(['update:modelValue'])
</script>
