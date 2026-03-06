<template>
  <div class="flex gap-2">
    <Button :variant="modelValue === 'income' ? 'success' : 'secondary'" size="md" class="flex-1"
      @click="$emit('update:modelValue', 'income')">
      Entrada
    </Button>
    <Button :variant="modelValue === 'expense' ? 'danger' : 'secondary'" size="md" class="flex-1"
      @click="$emit('update:modelValue', 'expense')">
      Saída
    </Button>
  </div>
</template>

<script setup>
import Button from '@/components/atoms/Button.vue'

defineProps({
  modelValue: {
    type: String,
    required: true,
    validator: (value) => ['income', 'expense'].includes(value)
  }
})

defineEmits(['update:modelValue'])
</script>
