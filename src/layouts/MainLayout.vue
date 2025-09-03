<template>
  <div class="min-h-screen bg-dashboard text-theme transition-theme" :class="{ 'light': !isDarkMode }">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="space-y-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: true
  }
})

// Layout principal con soporte para modo claro/oscuro y transiciones suaves
</script>

<style scoped>
.container {
  max-width: 1400px;
}

/* Asegurarse de que las transiciones funcionen correctamente */
* {
  transition-property: color, background-color, border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}
</style>
