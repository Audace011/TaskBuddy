<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../modules/auth/AuthStore'
import DarkModeToggle from './DarkModeToggle.vue'
import SettingsMenu from './SettingsMenu.vue'

import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const userInitials = computed(() => {
  if (!authStore.user?.name) return '?'
  return authStore.user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const navLinks = computed(() => [
  { label: t('dashboard'), to: '/dashboard', icon: 'M4 6h16M4 12h16M4 18h7' },
  { label: t('todo'), to: '/dashboard/todo', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: t('inprogress'), to: '/dashboard/inprogress', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: t('completed'), to: '/dashboard/done', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
])

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <aside
    class="fixed top-0 left-0 z-40 flex h-screen w-64 flex-col
           border-r border-border-subtle dark:border-slate-800
           bg-surface dark:bg-dark-surface"
  >
    <!-- Brand -->
    <div class="flex items-center gap-3 px-6 py-8">
      <div class="flex h-10 w-10 items-center justify-center rounded-custom bg-primary shadow-sm">
        <span class="text-xl text-white font-black">✔</span>
      </div>
      <span class="text-app-title tracking-tight text-text-primary dark:text-text-light">Task-Buddy</span>
    </div>

    <!-- Nav links -->
    <nav class="flex-1 px-4 space-y-1 mt-4">
      <router-link
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 rounded-custom px-4 py-2.5 text-sm font-medium
               transition-all duration-200 group"
        :class="route.path === link.to
          ? 'bg-primary text-white shadow-sm'
          : 'text-text-secondary dark:text-slate-400 hover:bg-bg-main dark:hover:bg-slate-800 hover:text-text-primary dark:hover:text-text-light'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon" />
        </svg>
        {{ link.label }}
      </router-link>
    </nav>

    <!-- Account -->
    <div class="mt-auto border-t border-border-subtle dark:border-slate-800 p-6">
      <div class="flex items-center gap-4 mb-4 bg-bg-main dark:bg-slate-800/30 p-3 rounded-custom border border-border-subtle dark:border-slate-700">
        <div class="relative">
          <div class="flex h-10 w-10 items-center justify-center rounded-custom
                      bg-primary text-sm font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900 uppercase">
            {{ userInitials }}
          </div>
          <div class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 bg-success shadow-sm"></div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-text-primary dark:text-text-light truncate">
            {{ authStore.user?.name || 'User' }}
          </p>
          <p class="text-metadata font-medium text-text-secondary uppercase tracking-wider">Pro Member</p>
        </div>
      </div>
      
      <div class="flex items-center justify-between gap-3">
        <SettingsMenu />
        <DarkModeToggle />
        <button
          @click="logout"
          class="flex-1 flex items-center justify-center gap-2 rounded-custom bg-surface dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-text-primary dark:text-slate-300
                 border border-border-subtle dark:border-slate-700 hover:bg-danger hover:text-white hover:border-danger transition-all duration-200"
        >
          Log out
        </button>
      </div>
    </div>
  </aside>
</template>
