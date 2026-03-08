<template>
  <div>
    <label
      v-if="label"
      class="block text-base font-medium text-primary-100 mb-1.5"
    >
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
      :class="inputClasses"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      v-bind="$attrs"
    />
    <p v-if="error" class="text-xs text-alert mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import type { InputType } from "@/types/components";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String as PropType<InputType>,
    default: "text",
    validator: (value: InputType) => ["text", "number", "date"].includes(value),
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  min: {
    type: [String, Number],
    default: undefined,
  },
  max: {
    type: [String, Number],
    default: undefined,
  },
  step: {
    type: [String, Number],
    default: undefined,
  },
});

defineEmits(["update:modelValue"]);

const inputClasses = computed(() => {
  const base =
    "w-full rounded-md px-4 py-3 text-sm outline-none transition-all duration-150 border";

  const stateClasses = props.error
    ? "border-red-300 focus:ring-alert focus:border-red-500"
    : "bg-gray-100 border-transparent focus:ring-1 focus:ring-primary focus:bg-white";

  const textClasses = "text-gray-700 placeholder-gray-400";
  const bgClasses = props.error ? "" : "bg-gray-100";

  return [base, stateClasses, textClasses, bgClasses].join(" ");
});
</script>
