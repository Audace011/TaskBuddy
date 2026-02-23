<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['status-change', 'share', 'delete'])

const priorityConfig = {
  low: {
    label: 'Low',
    classes: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    accent: 'bg-emerald-500'
  },
  medium: {
    label: 'Medium',
    classes: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
    accent: 'bg-amber-500'
  },
  high: {
    label: 'High',
    classes: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20',
    accent: 'bg-rose-500'
  },
}

const isOverdue = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(props.task.dueDate) < today && props.task.status !== 'done'
})

function onStatusChange(event) {
  emit('status-change', { id: props.task.id, status: event.target.value })
}
</script>

<template>
  <div
    @dblclick="emit('share')"
    class="group relative overflow-hidden rounded-custom border border-border-subtle dark:border-slate-800 transition-all duration-200
           hover:shadow-md cursor-pointer bg-surface dark:bg-dark-surface"
  >
    <!-- Left Accent Line -->
    <div class="absolute inset-y-0 left-0 w-1" :class="priorityConfig[task.priority].accent"></div>
    
    <div class="relative p-5">
      <!-- Top Row: Priority & Actions -->
      <div class="flex items-center justify-between mb-3">
        <span
          class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-widest transition-colors"
          :class="priorityConfig[task.priority].classes"
        >
          {{ task.priority }}
        </span>

        <button
          @click.stop="emit('delete', task.id)"
          class="opacity-0 group-hover:opacity-100 p-1.5 rounded text-text-secondary hover:text-danger hover:bg-danger/5 transition-all duration-200"
          title="Delete Task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <!-- Title -->
      <h3 class="text-task-title font-semibold text-text-primary dark:text-text-light leading-tight group-hover:text-primary transition-colors">
        {{ task.title }}
      </h3>

      <!-- Description -->
      <p class="mt-2 text-body text-text-secondary dark:text-slate-400 line-clamp-2">
        {{ task.description }}
      </p>

      <!-- Divider -->
      <div class="my-4 h-px bg-border-subtle dark:bg-slate-800"></div>

      <!-- Footer: Date & Status -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5 text-metadata"
          :class="isOverdue
            ? 'text-danger font-semibold'
            : 'text-text-secondary'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ task.dueDate }}</span>
        </div>

        <select
          :value="task.status"
          @change="onStatusChange"
          @click.stop
          class="appearance-none rounded border border-border-subtle dark:border-slate-800
                 bg-bg-main dark:bg-slate-800
                 px-3 py-1 text-[11px] font-medium text-text-primary dark:text-text-light
                 focus:border-primary focus:ring-1 focus:ring-primary/20
                 outline-none transition cursor-pointer"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  </div>
</template>
