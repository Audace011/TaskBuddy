import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const usePreferencesStore = defineStore('preferences', () => {
    const language = ref(localStorage.getItem('tb-language') || 'en')
    const fontSize = ref(localStorage.getItem('tb-font-size') || 'normal')
    const highContrast = ref(localStorage.getItem('tb-high-contrast') === 'true')

    // Watch for changes and persist to localStorage
    watch(language, (newVal) => localStorage.setItem('tb-language', newVal))
    watch(fontSize, (newVal) => {
        localStorage.setItem('tb-font-size', newVal)
        applyFontSize(newVal)
    })
    watch(highContrast, (newVal) => {
        localStorage.setItem('tb-high-contrast', newVal.toString())
        applyHighContrast(newVal)
    })

    function applyFontSize(size) {
        const root = document.documentElement
        if (size === 'small') root.style.fontSize = '14px'
        else if (size === 'normal') root.style.fontSize = '16px'
        else if (size === 'large') root.style.fontSize = '18px'
    }

    function applyHighContrast(enabled) {
        if (enabled) document.documentElement.classList.add('high-contrast')
        else document.documentElement.classList.remove('high-contrast')
    }

    // Initial apply
    applyFontSize(fontSize.value)
    applyHighContrast(highContrast.value)

    return { language, fontSize, highContrast }
})
