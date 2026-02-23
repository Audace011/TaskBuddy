<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTasksStore } from '../tasks/TasksStore'
import { useAuthStore } from '../auth/AuthStore'
import { useI18n } from '../../composables/useI18n'
import TaskCard from '../tasks/TaskCard.vue'
import CreateTaskModal from '../tasks/CreateTaskModal.vue'
import Sidebar from '../../components/ui/Sidebar.vue'

const { t } = useI18n()

const tasksStore = useTasksStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const showModal = ref(false)
const searchQuery = ref('')

// ─── Stats ───────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10)
const todaysTasks = computed(() => tasksStore.tasks.filter((t) => t.dueDate === today).length)
const upcomingTasks = computed(() => tasksStore.tasks.filter((t) => t.dueDate > today).length)
const overdueTasks = computed(() =>
  tasksStore.tasks.filter((t) => t.dueDate < today && t.status !== 'done').length
)
const completionPercent = computed(() => {
  if (tasksStore.tasks.length === 0) return 0
  return Math.round((tasksStore.tasks.filter((t) => t.status === 'done').length / tasksStore.tasks.length) * 100)
})

// ─── Filtering ───────────────────────────────────────
const filteredTasks = computed(() => {
  let tasks = tasksStore.tasks.filter((t) => t.status === 'inprogress')
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    tasks = tasks.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query)
    )
  }
  return tasks
})

// ─── Nav links ───────────────────────────────────────
const navLinks = [
  { label: 'Dashboard', to: '/dashboard', icon: 'M4 6h16M4 12h16M4 18h7' },
  { label: 'To Do', to: '/dashboard/todo', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'In Progress', to: '/dashboard/inprogress', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: 'Completed', to: '/dashboard/done', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
]

function handleStatusChange({ id, status }) { tasksStore.updateStatus(id, status) }
function handleDelete(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasksStore.deleteTask(id)
  }
}
function handleShare() { alert('Share link copied to clipboard!') }
function logout() { authStore.logout(); router.push('/login') }
</script>

<template>
  <div class="flex min-h-screen bg-bg-main dark:bg-dark-bg transition-colors duration-200">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main -->
    <main class="ml-64 flex-1 px-8 py-10 lg:px-12">
      <!-- Search & Action Bar -->
      <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="relative flex-1 max-w-xl">
          <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('searchTasks')"
            class="w-full rounded-custom border border-border-subtle bg-surface dark:bg-dark-surface pl-11 pr-4 py-2.5 text-sm
                   shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none dark:border-slate-800 dark:text-text-light"
          />
        </div>
        <button
          @click="showModal = true"
          class="flex items-center justify-center gap-2 rounded-custom bg-primary px-6 py-2.5 text-sm font-semibold text-white
                 hover:bg-primary-hover shadow-sm transition-all active:scale-95 whitespace-nowrap"
        >
          + {{ t('createTask') }}
        </button>
      </div>

      <!-- Stats -->
      <section class="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div class="flex items-center gap-4 rounded-custom bg-surface dark:bg-dark-surface p-6 shadow-sm border border-border-subtle dark:border-slate-800">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div><p class="text-metadata font-semibold text-text-secondary uppercase tracking-wider">{{ t('today') }}</p><p class="text-section-heading text-text-primary dark:text-text-light">{{ todaysTasks }}</p></div>
        </div>
        <div class="flex items-center gap-4 rounded-custom bg-surface dark:bg-dark-surface p-6 shadow-sm border border-border-subtle dark:border-slate-800">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div><p class="text-metadata font-semibold text-text-secondary uppercase tracking-wider">{{ t('later') }}</p><p class="text-section-heading text-text-primary dark:text-text-light">{{ upcomingTasks }}</p></div>
        </div>
        <div class="flex items-center gap-4 rounded-custom bg-surface dark:bg-dark-surface p-6 shadow-sm border border-border-subtle dark:border-slate-800">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-danger/10 text-danger">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div><p class="text-metadata font-semibold text-text-secondary uppercase tracking-wider">{{ t('late') }}</p><p class="text-section-heading" :class="overdueTasks > 0 ? 'text-danger' : 'text-text-primary dark:text-text-light'">{{ overdueTasks }}</p></div>
        </div>
        <div class="flex items-center gap-4 rounded-custom bg-surface dark:bg-dark-surface p-6 shadow-sm border border-border-subtle dark:border-slate-800">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 text-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <div><p class="text-metadata font-semibold text-text-secondary uppercase tracking-wider">{{ t('status') }}</p><p class="text-section-heading text-success">{{ completionPercent }}%</p></div>
        </div>
      </section>

      <!-- Header -->
      <div class="mb-8 flex items-baseline justify-between transition-all">
        <div>
          <h1 class="text-app-title text-text-primary dark:text-text-light">{{ t('inprogress') }}</h1>
          <p class="mt-1 text-sm text-text-secondary dark:text-slate-400">
            {{ t('inprogressSub', { count: filteredTasks.length }).replace('{count}', filteredTasks.length) }}
          </p>
        </div>
      </div>

      <!-- Grid -->
      <section v-if="filteredTasks.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @status-change="handleStatusChange"
          @delete="handleDelete"
          @share="handleShare"
        />
      </section>
      
      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div class="h-20 w-20 rounded-custom bg-bg-main dark:bg-slate-800 flex items-center justify-center mb-6 text-2xl border border-border-subtle dark:border-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-text-secondary opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-task-title text-text-primary dark:text-text-light mb-2">{{ t('noTasksInprogress') }}</h3>
        <p class="text-body text-text-secondary dark:text-slate-400 max-w-sm">{{ t('moveTasks') }}</p>
      </div>

      <p class="mt-12 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">💡 {{ t('doubleClick') }}</p>
    </main>

    <CreateTaskModal v-if="showModal" @close="showModal = false" />
  </div>
</template>
