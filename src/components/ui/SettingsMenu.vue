<script setup>
import { ref } from 'vue'
import { usePreferencesStore } from '../../stores/preferences'

const preferences = usePreferencesStore()
const isOpen = ref(false)

const fontSizes = [
  { id: 'small', label: 'A-', title: 'Small' },
  { id: 'normal', label: 'A', title: 'Normal' },
  { id: 'large', label: 'A+', title: 'Large' }
]

const languages = [
  { id: 'en', label: 'English' },
  { id: 'rw', label: 'Kinyarwanda' }
]
</script>

<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex h-10 w-10 items-center justify-center rounded-custom bg-surface dark:bg-slate-800
             border border-border-subtle dark:border-slate-700 text-text-secondary dark:text-slate-400
             hover:bg-primary/5 hover:text-primary transition-all duration-200"
      title="Accessibility & Language"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute bottom-full left-0 mb-2 w-64 rounded-custom bg-surface dark:bg-dark-surface p-4
             shadow-xl border border-border-subtle dark:border-slate-800 z-50 animate-in fade-in slide-in-from-bottom-2"
    >
      <h3 class="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Settings</h3>

      <!-- Font Size -->
      <div class="mb-6">
        <label class="text-xs font-semibold text-text-primary dark:text-text-light mb-2 block">Font Size</label>
        <div class="flex gap-2">
          <button
            v-for="size in fontSizes"
            :key="size.id"
            @click="preferences.fontSize = size.id"
            class="flex-1 py-1.5 rounded-md text-sm font-medium border transition-all"
            :class="preferences.fontSize === size.id
              ? 'bg-primary border-primary text-white'
              : 'border-border-subtle dark:border-slate-700 text-text-secondary'"
            :title="size.title"
          >
            {{ size.label }}
          </button>
        </div>
      </div>

      <!-- Language -->
      <div class="mb-6">
        <label class="text-xs font-semibold text-text-primary dark:text-text-light mb-2 block">Language</label>
        <div class="grid grid-cols-1 gap-2">
          <button
            v-for="lang in languages"
            :key="lang.id"
            @click="preferences.language = lang.id"
            class="px-3 py-2 rounded-md text-sm font-medium border text-left transition-all flex items-center justify-between"
            :class="preferences.language === lang.id
              ? 'bg-primary/10 border-primary text-primary'
              : 'border-border-subtle dark:border-slate-700 text-text-secondary'"
          >
            {{ lang.label }}
            <span v-if="preferences.language === lang.id" class="text-xs">✔</span>
          </button>
        </div>
      </div>

      <!-- High Contrast -->
      <div class="flex items-center justify-between">
        <label class="text-xs font-semibold text-text-primary dark:text-text-light">High Contrast</label>
        <button
          @click="preferences.highContrast = !preferences.highContrast"
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
          :class="preferences.highContrast ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'"
        >
          <span
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            :class="preferences.highContrast ? 'translate-x-6' : 'translate-x-1'"
          />
        </button>
      </div>

      <button
        @click="isOpen = false"
        class="mt-6 w-full py-2 text-xs font-bold text-primary hover:text-primary-hover uppercase tracking-widest border-t border-border-subtle dark:border-slate-800 pt-4"
      >
        Close
      </button>
    </div>
  </div>
</template>
