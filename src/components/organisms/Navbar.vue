<template>
<header class="sticky top-0 z-50 bg-white border-b border-gray-200 px-0 py-4">
    <div class="w-11/12 mx-auto flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 bg-primary rounded-md flex items-center justify-center">
          <BarChart2 class="w-5 h-5 text-white" />
        </div>
        <span class="text-lg font-semibold text-primary-100 tracking-tight">Controle Financeiro</span>
      </div>
      <Button
        :icon="Plus"
        variant="primary"
        size="md"
        @click="$emit('open-modal')"
      >
        Nova Transação
      </Button>
    </div>
  </header>
</template>

<script setup>
import { BarChart2, Plus } from 'lucide-vue-next'
import Button from '@/components/atoms/Button.vue'

defineEmits(['open-modal'])
</script>
