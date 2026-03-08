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
    >
      <Transition
        enter-active-class="transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        leave-active-class="transition-[transform,opacity] duration-[280ms] ease"
        enter-from-class="translate-y-5 scale-[0.97] opacity-0"
        leave-to-class="translate-y-2.5 scale-[0.97] opacity-0"
      >
        <div v-if="isOpen" class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-primary-100">Nova Transação</h2>
            <IconButton :icon="X" variant="gray" size="md" @click="closeModal" />
          </div>

          <div class="space-y-4">
            <Input
              v-model="form.description"
              label="Descrição"
              type="text"
              placeholder="Ex: Supermercado"
              :error="errors.description"
            />

            <div class="grid grid-cols-2 gap-4">
              <Input
                v-model="form.amount"
                label="Valor (R$)"
                type="text"
                placeholder="0,00"
                :error="errors.amount"
              />
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Tipo</label>
                <TypeToggle v-model="form.type" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <Select v-model="form.category" label="Categoria" :error="errors.category">
                <option value="" disabled>Selecione...</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
                <option value="Educação">Educação</option>
                <option value="Lazer">Lazer</option>
                <option value="Moradia">Moradia</option>
                <option value="Salário">Salário</option>
                <option value="Freelance">Freelance</option>
                <option value="Outros">Outros</option>
              </Select>
              <Input v-model="form.date" label="Data" type="date" :error="errors.date" />
            </div>

            <Button variant="primary" size="lg" class="w-full mt-2" @click="handleSubmit">
              Adicionar Transação
            </Button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import Input from '@/components/atoms/Input.vue'
import Select from '@/components/atoms/Select.vue'
import Button from '@/components/atoms/Button.vue'
import IconButton from '@/components/atoms/IconButton.vue'
import TypeToggle from '@/components/molecules/TypeToggle.vue'
import { transactionSchema, type TransactionInput } from '@/schemas/transaction'

const props = defineProps({
  isOpen: { type: Boolean, required: true }
})

const emit = defineEmits(['close', 'submit'])

const getToday = () => new Date().toISOString().split('T')[0]

const form = ref({
  description: '',
  amount: '',
  type: 'income' as const,
  category: '',
  date: getToday()
})

const errors = ref<Record<string, string>>({})


function validateAll(): boolean {
  const formData: TransactionInput = {
    description: form.value.description,
    amount: parseFloat(form.value.amount) || 0,
    type: form.value.type,
    category: form.value.category as TransactionInput['category'],
    date: form.value.date
  }

  const result = transactionSchema.safeParse(formData)

  if (!result.success) {
    result.error.issues.forEach(err => {
      const field = err.path[0] as keyof typeof errors.value
      if (field) {
        if (field === 'category') {
          errors.value[field] = 'Selecione uma categoria'
        } else {
          errors.value[field] = err.message
        }
      }
    })
    return false
  }

  errors.value = {}
  return true
}

function handleSubmit() {
  if (!validateAll()) return

  const data: TransactionInput = {
    description: form.value.description,
    amount: parseFloat(form.value.amount),
    type: form.value.type,
    category: form.value.category as TransactionInput['category'],
    date: form.value.date
  }

  emit('submit', data)
  closeModal()
}

function closeModal() {
  emit('close')
  resetForm()
}

function resetForm() {
  form.value = {
    description: '',
    amount: '',
    type: 'income',
    category: '',
    date: getToday()
  }
  errors.value = {}
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetForm()
  }
})

watch(form.value, (newVal, oldVal) => {
  Object.keys(newVal).forEach(key => {
    if (newVal[key as keyof typeof newVal] !== oldVal[key as keyof typeof oldVal]) {
      if (errors.value[key]) {
        delete errors.value[key]
      }
    }
  })
})
</script>