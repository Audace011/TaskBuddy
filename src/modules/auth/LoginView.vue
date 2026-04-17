<script setup>
import { ref } from 'vue'
import { useAuthStore } from './AuthStore'
import { useRouter } from 'vue-router'
import { useI18n } from '../../composables/useI18n'
import DarkModeToggle from '../../components/ui/DarkModeToggle.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const isRegistering = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const errorMsg = ref('')

async function handleSubmit() {
  errorMsg.value = ''
  if (!email.value || !password.value) return

  try {
    if (isRegistering.value) {
      if (!name.value) {
        errorMsg.value = 'Full name is required to create an account.'
        return
      }
      await authStore.register(email.value, password.value, name.value)
    } else {
      await authStore.login(email.value, password.value)
    }
    router.push('/dashboard')
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      errorMsg.value = error.response.data.error;
    } else if (error.message === 'Network Error') {
      errorMsg.value = 'Failed to connect to the backend server. Is it running?';
    } else {
      errorMsg.value = isRegistering.value 
        ? 'Registration failed. Please try again.' 
        : 'Authentication failed. Please check your credentials.';
    }
  }
}

function toggleMode() {
  isRegistering.value = !isRegistering.value
  errorMsg.value = ''
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
        <h2 class="text-app-title text-text-primary dark:text-text-light">
          {{ isRegistering ? 'Create your account' : t('goodToSeeYou') }}
        </h2>
        <p class="mt-2 text-sm text-text-secondary dark:text-slate-400">
          {{ isRegistering ? 'Sign up to get started with TaskBuddy.' : t('signInHero') }}
        </p>
        <p v-if="errorMsg" class="mt-3 text-sm font-semibold text-danger bg-danger/10 px-3 py-2 rounded-custom">
          {{ errorMsg }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <!-- Name Input (Only visible when registering) -->
        <div v-if="isRegistering">
          <label for="name" class="mb-2 block text-metadata font-semibold uppercase tracking-wider text-text-secondary">
            {{ t('fullName') }}
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
            {{ t('emailAddress') }}
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
              {{ t('password') }}
            </label>
            <a v-if="!isRegistering" href="#" class="text-metadata font-bold text-primary hover:underline">{{ t('forgot') }}</a>
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
          {{ isRegistering ? 'Sign Up' : t('signIn') }}
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-10 pt-8 border-t border-border-subtle dark:border-slate-800">
        <p class="text-center text-xs font-medium text-text-secondary dark:text-slate-400">
          {{ isRegistering ? 'Already have an account?' : t('newHere') }} 
          <a href="#" @click.prevent="toggleMode" class="font-bold text-primary hover:underline ml-1">
            {{ isRegistering ? 'Sign in instead' : t('createAnAccount') }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
