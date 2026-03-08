<template>
  <div class="app-select">
    <label v-if="label" :for="selectId" class="block text-sm font-medium text-gray-700 mb-1.5">
      {{ label }}
    </label>
    <select
      :id="selectId"
      :value="modelValue"
      :class="selectClasses"
      :aria-label="label || undefined"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      v-bind="$attrs"
    >
      <slot />
    </select>
    <p v-if="error" class="text-xs text-alert mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);

// Generate a unique ID for the select to associate with the label
const selectId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`);

const selectClasses = computed(() => {
  const base =
    "w-full rounded-md px-4 py-3 text-sm outline-none transition-all duration-150 appearance-none cursor-pointer";

  const stateClasses = props.error
    ? "border border-red-300 focus:ring-1 focus:ring-alert"
    : "bg-gray-100 border border-transparent focus:ring-1 focus:ring-primary focus:bg-white";

  const textClasses = "text-gray-700";
  const bgClasses = props.error ? "" : "bg-gray-100";

  return [base, stateClasses, textClasses, bgClasses].join(" ");
});
</script>
