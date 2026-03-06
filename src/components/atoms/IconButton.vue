<template>
  <button :class="buttonClasses" v-bind="$attrs">
    <component :is="icon" class="w-4 h-4" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: [Object, Function],
    required: true
  },
  variant: {
    type: String,
    default: 'ghost',
    validator: (value) => ['ghost', 'danger', 'gray'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-md transition-all duration-150 cursor-pointer'

  const variants = {
    ghost: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
    danger: 'text-gray-400 hover:text-alert hover:bg-alert/10',
    gray: 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
  }

  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  }

  return [base, variants[props.variant], sizes[props.size]].join(' ')
})
</script>
