<script setup>
import { ref } from 'vue'
import { useAuthStore } from './AuthStore'
import { useRouter } from 'vue-router'
import DarkModeToggle from '../../components/ui/DarkModeToggle.vue'

const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

function handleLogin() {
  if (email.value && password.value) {
    authStore.login(email.value, password.value, name.value)
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-main dark:bg-dark-bg px-4 transition-colors duration-200">
    <!-- Card -->
    <div class="relative w-full max-w-md overflow-hidden rounded-custom border border-border-subtle dark:border-slate-800
                bg-surface dark:bg-dark-surface p-10 shadow-sm">
      
      <!-- Top Bar -->
      <div class="mb-10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-custom bg-primary shadow-sm">
            <span class="text-xl text-white font-black">✔</span>
          </div>
          <span class="text-app-title tracking-tight text-text-primary dark:text-text-light">Task-Buddy</span>
        </div>
        <DarkModeToggle />
      </div>

      <!-- Hero Text -->
      <div class="mb-10">
        <h2 class="text-app-title text-text-primary dark:text-text-light">Good to see you.</h2>
        <p class="mt-2 text-sm text-text-secondary dark:text-slate-400">
          Sign in to pick up where you left off.
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="name" class="mb-2 block text-metadata font-semibold uppercase tracking-wider text-text-secondary">
            Full Name
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="John Doe"
            class="w-full rounded-custom border border-border-subtle bg-bg-main dark:bg-slate-800
                   px-4 py-3 text-sm font-medium text-text-primary dark:text-text-light
                   focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          />
        </div>

        <div>
          <label for="email" class="mb-2 block text-metadata font-semibold uppercase tracking-wider text-text-secondary">
            Email Address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="your@email.com"
            class="w-full rounded-custom border border-border-subtle bg-bg-main dark:bg-slate-800
                   px-4 py-3 text-sm font-medium text-text-primary dark:text-text-light
                   focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          />
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label for="password" class="block text-metadata font-semibold uppercase tracking-wider text-text-secondary">
              Password
            </label>
            <a href="#" class="text-metadata font-bold text-primary hover:underline">Forgot?</a>
          </div>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full rounded-custom border border-border-subtle bg-bg-main dark:bg-slate-800
                   px-4 py-3 text-sm font-medium text-text-primary dark:text-text-light
                   focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          />
        </div>

        <button
          type="submit"
          class="w-full rounded-custom bg-primary px-6 py-3.5 text-sm font-semibold text-white
                 shadow-sm hover:bg-primary-hover transition-all active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-10 pt-8 border-t border-border-subtle dark:border-slate-800">
        <p class="text-center text-xs font-medium text-text-secondary dark:text-slate-400">
          New here? 
          <a href="#" class="font-bold text-primary hover:underline">Create an account</a>
        </p>
      </div>
    </div>
  </div>
</template>
