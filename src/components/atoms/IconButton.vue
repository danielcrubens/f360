<template>
  <button :class="buttonClasses" :aria-label="label" v-bind="$attrs">
    <component :is="icon" class="w-4 h-4" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import type { IconButtonVariant, IconButtonSize } from "@/types/components";

const props = defineProps({
  icon: {
    type: [Object, Function],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String as PropType<IconButtonVariant>,
    default: "gray",
    validator: (value: IconButtonVariant) => ["danger", "gray"].includes(value),
  },
  size: {
    type: String as PropType<IconButtonSize>,
    default: "md",
    validator: (value: IconButtonSize) => ["sm", "md", "lg"].includes(value),
  },
});

const buttonClasses = computed(() => {
  const base =
    "inline-flex items-center justify-center rounded-md transition-all duration-150 cursor-pointer";

  const variants = {
    danger: "text-gray-400 hover:text-alert hover:bg-alert/10",
    gray: "text-gray-500 hover:text-gray-700 hover:bg-gray-200",
  };

  const sizes = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
  };

  return [base, variants[props.variant], sizes[props.size]].join(" ");
});
</script>
