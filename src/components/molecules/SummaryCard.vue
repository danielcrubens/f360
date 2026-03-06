<template>
  <div class="bg-white rounded-md border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <IconBadge
      :icon="icon"
      :label="label"
      :value="value"
      :color-scheme="colorScheme"
    />
  </div>
</template>

<script setup>
import IconBadge from '@/components/atoms/IconBadge.vue'

defineProps({
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
</script>
