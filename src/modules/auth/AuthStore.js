import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '../../api/axios'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isAuthenticated = ref(false)

    const isLoggedIn = computed(() => !!user.value)

    async function register(email, password, name) {
        try {
            await api.post('/auth/register', { email, password, name })
            // Automatically log them in after successful registration
            await login(email, password)
        } catch (error) {
            console.error('Registration error:', error)
            throw error
        }
    }

    async function login(email, password) {
        try {
            const response = await api.post('/auth/login', { email, password })
            user.value = response.data
            isAuthenticated.value = true
            localStorage.setItem('tb-user', JSON.stringify(user.value))
        } catch (error) {
            console.error('Authentication error:', error)
            throw error
        }
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

    return { user, isAuthenticated, isLoggedIn, login, register, logout }
})
