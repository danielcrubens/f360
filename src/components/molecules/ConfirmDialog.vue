<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease"
    leave-active-class="transition-opacity duration-300 ease"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      aria-hidden="true"
    >
      <Transition
        enter-active-class="transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        leave-active-class="transition-[transform,opacity] duration-[280ms] ease"
        enter-from-class="translate-y-5 scale-[0.97] opacity-0"
        leave-to-class="translate-y-2.5 scale-[0.97] opacity-0"
      >
        <div
          v-if="isOpen"
          class="bg-white rounded-md shadow-lg w-full max-w-sm p-6"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="dialogTitleId"
        >
          <h2 :id="dialogTitleId" class="text-lg font-semibold text-primary-100 mb-2">{{ title }}</h2>
          <p class="text-sm text-gray-500 mb-6 leading-relaxed">{{ message }}</p>
          <div class="flex gap-3 justify-end">
            <Button variant="secondary" size="md" @click="$emit('close')">Cancelar</Button>
            <Button variant="danger" size="md" @click="$emit('confirm')">{{ confirmText }}</Button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import Button from '@/components/atoms/Button.vue'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  title: { type: String, default: 'Confirmar ação' },
  message: { type: String, required: true },
  confirmText: { type: String, default: 'Confirmar' }
})

defineEmits(['close', 'confirm'])

// Generate a unique ID for the dialog title
const dialogTitleId = computed(() => `dialog-title-${Math.random().toString(36).substr(2, 9)}`)
</script>
