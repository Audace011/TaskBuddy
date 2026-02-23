import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isAuthenticated = ref(false)

    const isLoggedIn = computed(() => !!user.value)

    function login(email, password, name) {
        // Mock login — in a real app this would call an API
        user.value = { email, name: name || email.split('@')[0] }
        isAuthenticated.value = true
        localStorage.setItem('tb-user', JSON.stringify(user.value))
    }

    function logout() {
        user.value = null
        isAuthenticated.value = false
        localStorage.removeItem('tb-user')
    }

    // Initial load from storage
    const savedUser = localStorage.getItem('tb-user')
    if (savedUser) {
        user.value = JSON.parse(savedUser)
        isAuthenticated.value = true
    }

    return { user, isAuthenticated, isLoggedIn, login, logout }
})
