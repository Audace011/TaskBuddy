<script setup>
import { ref } from 'vue'
import { useTasksStore } from './TasksStore'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()
const emit = defineEmits(['close'])
const tasksStore = useTasksStore()

const title = ref('')
const description = ref('')
const priority = ref('medium')
const dueDate = ref('')
const dateError = ref('')

function validateDate() {
  if (!dueDate.value) {
    dateError.value = ''
    return true
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (new Date(dueDate.value) < today) {
    dateError.value = t('dateError')
    return false
  }
  dateError.value = ''
  return true
}

function handleCreate() {
  if (!title.value.trim()) return
  if (!validateDate()) return

  tasksStore.addTask({
    title: title.value.trim(),
    description: description.value.trim(),
    priority: priority.value,
    dueDate: dueDate.value,
  })

  emit('close')
}

function handleCancel() {
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" @click.self="handleCancel">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-900/60"></div>
      
      <!-- Modal card -->
      <div class="relative w-full max-w-xl overflow-hidden rounded-custom border border-border-subtle dark:border-slate-800
                  bg-surface dark:bg-dark-surface shadow-sm px-8 py-10">
        
        <!-- Header -->
        <div class="mb-8">
          <h2 class="text-app-title text-text-primary dark:text-text-light">{{ t('createNewTask') }}</h2>
          <p class="mt-1 text-sm text-text-secondary dark:text-slate-400">{{ t('addTaskToList') }}</p>
        </div>

        <form @submit.prevent="handleCreate" class="space-y-6">
          <!-- Title -->
          <div>
            <label class="mb-2 block text-metadata font-semibold uppercase tracking-wider text-text-secondary">{{ t('title') }}</label>
            <input
              v-model="title"
              type="text"
              :placeholder="t('placeholderTitle')"
              class="w-full rounded-custom border border-border-subtle bg-bg-main dark:bg-slate-800
                     px-4 py-3 text-sm font-medium text-text-primary dark:text-text-light
                     focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              required
            />
          </div>

          <!-- Description -->
          <div>
            <label class="mb-2 block text-metadata font-semibold uppercase tracking-wider text-text-secondary">{{ t('description') }}</label>
            <textarea
              v-model="description"
              rows="4"
              :placeholder="t('placeholderDesc')"
              class="w-full rounded-custom border border-border-subtle bg-bg-main dark:bg-slate-800
                     px-4 py-3 text-sm font-medium text-text-primary dark:text-text-light
                     focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Priority -->
            <div>
              <label class="mb-2 block text-metadata font-semibold uppercase tracking-wider text-text-secondary">{{ t('priority') }}</label>
              <div class="relative">
                <select
                  v-model="priority"
                  class="w-full appearance-none rounded-custom border border-border-subtle bg-bg-main dark:bg-slate-800
                         px-4 py-3 text-sm font-semibold text-text-primary dark:text-text-light
                         focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer"
                >
                  <option value="low">{{ t('low') }}</option>
                  <option value="medium">{{ t('medium') }}</option>
                  <option value="high">{{ t('high') }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Due Date -->
            <div>
              <label class="mb-2 block text-metadata font-semibold uppercase tracking-wider text-text-secondary">{{ t('dueDate') }}</label>
              <input
                v-model="dueDate"
                type="date"
                @change="validateDate"
                class="w-full rounded-custom border border-border-subtle bg-bg-main dark:bg-slate-800
                       px-4 py-3 text-sm font-semibold text-text-primary dark:text-text-light
                       focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              />
              <p v-if="dateError" class="mt-2 text-xs font-semibold text-danger">{{ dateError }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-6 flex flex-col-reverse sm:flex-row justify-end gap-4">
              <button
                type="button"
                @click="handleCancel"
                class="flex-1 sm:flex-none rounded-custom bg-bg-main dark:bg-slate-800
                       px-8 py-3.5 text-sm font-semibold text-text-primary dark:text-slate-300
                       border border-border-subtle dark:border-slate-700 hover:bg-slate-100 transition-all"
              >
                {{ t('cancel') }}
              </button>
              <button
                type="submit"
                class="flex-1 sm:flex-none rounded-custom bg-primary
                       px-8 py-3.5 text-sm font-semibold text-white
                       shadow-sm hover:bg-primary-hover transition-all active:scale-95"
              >
                {{ t('createTask') }}
              </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
