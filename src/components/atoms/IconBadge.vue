<template>
  <div class="flex items-center gap-1.5 xl:gap-4">
    <div :class="iconClasses">
      <component :is="icon" class="w-5 h-5" />
    </div>
    <div>
      <p class="text-base text-primary-100 font-medium mb-0.5">{{ label }}</p>
      <p :class="valueClasses">
        {{ formattedValue }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: [Object, Function],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  colorScheme: {
    type: String,
    default: 'primary',
    validator: (value) => ['green', 'red', 'primary'].includes(value)
  }
})

const iconClasses = computed(() => {
  const base = 'w-11 h-11 rounded-md flex items-center justify-center shrink-0'

  const schemes = {
    green: 'bg-success-bg',
    red: 'bg-alert-bg',
    primary: 'bg-primary-bg'
  }

  const iconColors = {
    green: 'text-success',
    red: 'text-alert',
    primary: 'text-primary'
  }

  return `${base} ${schemes[props.colorScheme]} ${iconColors[props.colorScheme]}`
})

const valueClasses = computed(() => {
  const base = 'text-lg xl:text-xl font-bold tracking-tight '

  const colors = {
    green: 'text-success',
    red: 'text-alert',
    primary: 'text-primary'
  }

  return `${base} ${colors[props.colorScheme]}`
})

// Format currency internally
const formattedValue = computed(() => {
  if (typeof props.value === 'string') return props.value
  return props.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
})
</script>
