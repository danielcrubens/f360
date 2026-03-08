<template>
  <div class="flex gap-2">
    <Button
      :variant="modelValue === 'income' ? 'success' : 'secondary'"
      size="md"
      class="flex-1"
      @click="$emit('update:modelValue', 'income')"
    >
      Entrada
    </Button>
    <Button
      :variant="modelValue === 'expense' ? 'danger' : 'secondary'"
      size="md"
      class="flex-1"
      @click="$emit('update:modelValue', 'expense')"
    >
      Saída
    </Button>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import Button from "@/components/atoms/Button.vue";
import type { TransactionType } from "@/types/components";

defineProps({
  modelValue: {
    type: String as PropType<TransactionType>,
    required: true,
    validator: (value: TransactionType) =>
      ["income", "expense"].includes(value),
  },
});

defineEmits(["update:modelValue"]);
</script>
