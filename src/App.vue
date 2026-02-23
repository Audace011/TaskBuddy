<script setup>
import { watchEffect } from 'vue'
import { usePreferencesStore } from './stores/preferences'

const preferences = usePreferencesStore()

// Watch for changes in preferences and apply classes to html element
watchEffect(() => {
  const html = document.documentElement
  
  // Theme
  if (preferences.theme === 'dark') {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }

  // High Contrast
  if (preferences.highContrast) {
    html.classList.add('high-contrast')
  } else {
    html.classList.remove('high-contrast')
  }

  // Font Size
  const sizeMap = {
    small: '14px',
    normal: '16px',
    large: '18px'
  }
  html.style.fontSize = sizeMap[preferences.fontSize] || '16px'
})
</script>

<template>
  <RouterView />
</template>