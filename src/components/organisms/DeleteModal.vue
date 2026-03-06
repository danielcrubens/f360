<template>
  <ConfirmDialog :is-open="!!target" title="Confirmar exclusão"
    message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita." confirm-text="Excluir"
    @close="$emit('update:target', null)" @confirm="handleConfirm" />
</template>

<script setup>
import ConfirmDialog from '@/components/molecules/ConfirmDialog.vue'

defineProps({
  target: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:target', 'confirm'])

function handleConfirm() {
  emit('confirm')
  emit('update:target', null)
}
</script>
