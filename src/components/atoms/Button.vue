<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <component
      v-if="icon && iconPosition === 'left'"
      :is="icon"
      class="w-4 h-4"
    />
    <slot />
    <component
      v-if="icon && iconPosition === 'right'"
      :is="icon"
      class="w-4 h-4"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import type {
  ButtonType,
  ButtonVariant,
  ButtonSize,
  IconPosition,
} from "@/types/components";

const props = defineProps({
  variant: {
    type: String as PropType<ButtonVariant>,
    default: "primary",
    validator: (value: ButtonVariant) =>
      ["primary", "secondary", "danger", "success"].includes(value),
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: "md",
    validator: (value: ButtonSize) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<ButtonType>,
    default: "button",
    validator: (value: ButtonType) =>
      ["button", "submit", "reset"].includes(value),
  },
  icon: {
    type: [Object, Function],
    default: null,
  },
  iconPosition: {
    type: String as PropType<IconPosition>,
    default: "left",
    validator: (value: IconPosition) => ["left", "right"].includes(value),
  },
});

const buttonClasses = computed(() => {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-150 cursor-pointer";

  const variants = {
    primary:
      "bg-primary hover:bg-primary-hover active:scale-[0.98] text-white shadow-sm hover:shadow",
    secondary:
      "bg-gray-100 hover:bg-gray-200 active:scale-[0.98] text-gray-700",
    danger: "bg-alert  active:scale-[0.98] text-white shadow-sm hover:shadow",
    success:
      "bg-success hover:bg-success-hover active:scale-[0.98] text-white shadow-sm hover:shadow",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledClasses = props.disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return [
    base,
    variants[props.variant],
    sizes[props.size],
    disabledClasses,
  ].join(" ");
});
</script>
