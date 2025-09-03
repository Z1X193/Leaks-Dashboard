<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="interactive flex items-center gap-3 bg-cmint-primary text-cmint-dark px-4 py-2 rounded-lg font-semibold shadow-theme transition-theme"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span>{{ selectedOrg.name }}</span>
      <svg 
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    </button>

    <!-- Dropdown -->
    <div 
      v-if="isOpen"
      class="absolute top-full left-0 mt-2 w-64 glass-card border border-theme rounded-lg shadow-theme-lg z-50 animate-slide-in"
    >
      <div class="p-2">
        <div 
          v-for="org in organizations" 
          :key="org.id"
          @click="selectOrg(org)"
          class="interactive flex items-center gap-3 p-3 rounded-lg hover:bg-hover-surface transition-theme cursor-pointer"
          :class="{ 'bg-cmint-primary-bg border-cmint-primary': selectedOrg.id === org.id }"
        >
          <div class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" :style="{ backgroundColor: org.color }">
            {{ org.initials }}
          </div>
          <div class="flex-1">
            <div class="font-medium text-theme">{{ org.name }}</div>
            <div class="text-xs text-muted">{{ org.type }}</div>
          </div>
          <div v-if="selectedOrg.id === org.id" class="text-cmint-primary">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isOpen = ref(false)

const organizations = reactive([
  {
    id: 'hermosillo',
    name: 'Gobierno Hermosillo',
    type: 'Gobierno Municipal',
    initials: 'GH',
    color: '#f9bc0b'
  },
  {
    id: 'sonora',
    name: 'Gobierno Sonora',
    type: 'Gobierno Estatal',
    initials: 'GS',
    color: '#ff8c42'
  },
  {
    id: 'fiscalia',
    name: 'Fiscalía Hermosillo',
    type: 'Institución Judicial',
    initials: 'FH',
    color: '#4ade80'
  }
])

const selectedOrg = ref(organizations[0])

const selectOrg = (org) => {
  selectedOrg.value = org
  isOpen.value = false
}
</script>
