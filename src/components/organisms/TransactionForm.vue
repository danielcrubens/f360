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
            <h2 class="text-xl font-bold text-primary-100">Nova Transação</h2>
            <IconButton :icon="X" variant="gray" size="md" @click="closeModal" />
          </div>

          <div class="space-y-4">
            <Input v-model="form.description" label="Descrição" type="text" placeholder="Ex: Supermercado" />

            <div class="grid grid-cols-2 gap-4">
              <Input v-model="form.amount" label="Valor (R$)" type="number" placeholder="0,00" min="0" step="0.01" />
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Tipo</label>
                <TypeToggle v-model="form.type" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <Select v-model="form.category" label="Categoria">
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
              <Input v-model="form.date" label="Data" type="date" />
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

<script setup>
import { reactive, watch } from 'vue'
import { X } from 'lucide-vue-next'
import Input from '@/components/atoms/Input.vue'
import Select from '@/components/atoms/Select.vue'
import Button from '@/components/atoms/Button.vue'
import IconButton from '@/components/atoms/IconButton.vue'
import TypeToggle from '@/components/molecules/TypeToggle.vue'

const props = defineProps({
  isOpen: { type: Boolean, required: true }
})

const emit = defineEmits(['close', 'submit'])

const getToday = () => new Date().toISOString().split('T')[0]

const form = reactive({
  description: '',
  amount: '',
  type: 'income',
  category: '',
  date: getToday()
})

function handleSubmit() {
  if (!form.description || !form.amount || !form.category) return

  emit('submit', {
    description: form.description,
    amount: parseFloat(form.amount),
    type: form.type,
    category: form.category,
    date: form.date
  })

  Object.assign(form, { description: '', amount: '', type: 'income', category: '', date: getToday() })
}

function closeModal() {
  emit('close')
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    Object.assign(form, { description: '', amount: '', type: 'income', category: '', date: getToday() })
  }
})
</script>