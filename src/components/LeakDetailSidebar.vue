<template>
  <!-- Overlay Background -->
  <div 
    v-if="isOpen && selectedLeak" 
    class="fixed inset-0 z-50 flex justify-end"
    @click.self="$emit('close')"
  >
    <!-- Glass Background -->
    <div class="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>
    
    <!-- Sidebar -->
    <div 
      class="relative w-96 h-full bg-surface/80 backdrop-blur-xl border-l border-subtle/30 shadow-2xl transform transition-transform duration-500 ease-out"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-cmint-primary/10 to-blue/10 backdrop-blur-sm border-b border-subtle/30 p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-cmint-primary to-blue rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-theme">Detalles del Leak</h2>
              <p class="text-sm text-muted">Análisis completo de seguridad</p>
            </div>
          </div>
          <button 
            @click="$emit('close')"
            class="text-muted hover:text-theme transition-all duration-200 p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="h-full overflow-y-auto p-6 space-y-6" style="height: calc(100vh - 120px);">
        
        <!-- Risk Status Card -->
        <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-theme">Estado del Riesgo</h3>
              <p class="text-sm text-muted">Evaluación de impacto</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="text-xs text-muted mb-2">Nivel de Riesgo</div>
              <div :class="getRiskColor(selectedLeak.risk)" class="text-lg font-bold">
                {{ selectedLeak.risk }}
              </div>
            </div>
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="text-xs text-muted mb-2">Estado</div>
              <div :class="getStatusColor(selectedLeak.status)" class="text-lg font-bold">
                {{ selectedLeak.status }}
              </div>
            </div>
          </div>
        </div>

        <!-- User Information Card -->
        <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-theme">Información del Usuario</h3>
              <p class="text-sm text-muted">Datos de cuenta comprometida</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="text-xs text-muted mb-2">Email</div>
              <div class="text-theme font-mono text-sm break-all">{{ selectedLeak.email }}</div>
            </div>
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="text-xs text-muted mb-2">Dominio</div>
              <div class="text-blue-400 font-semibold">{{ selectedLeak.domain }}</div>
            </div>
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="flex items-center justify-between mb-2">
                <div class="text-xs text-muted">Contraseña</div>
                <button 
                  @click="togglePassword"
                  class="text-muted hover:text-theme transition-colors p-1 rounded-lg hover:bg-white/10"
                >
                  <svg v-if="!showPassword" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                  </svg>
                </button>
              </div>
              <div class="text-theme font-mono text-sm">
                {{ showPassword ? selectedLeak.password : '••••••••••••••••' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Data Types Card -->
        <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-theme">Datos Expuestos</h3>
              <p class="text-sm text-muted">Información comprometida</p>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <span 
              v-for="type in selectedLeak.dataTypes" 
              :key="type"
              :class="getDataTypeColor(type)"
              class="px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20"
            >
              {{ type }}
            </span>
          </div>
        </div>

        <!-- Source Information Card -->
        <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-theme">Origen de la Brecha</h3>
              <p class="text-sm text-muted">Información de la fuente</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="text-xs text-muted mb-2">Fuente</div>
              <div class="text-theme font-semibold">{{ selectedLeak.source }}</div>
            </div>
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="text-xs text-muted mb-2">Fecha Encontrada</div>
              <div class="text-theme font-semibold">{{ selectedLeak.dateFound }}</div>
            </div>
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="text-xs text-muted mb-2">Tipo de Hash</div>
              <div class="text-theme font-semibold">{{ selectedLeak.hashType || 'Texto Plano' }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  selectedLeak: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  // Si la fecha está en formato YYYY-MM-DD, agregarle hora para evitar problemas de zona horaria
  const dateToFormat = date.includes('-') && date.length === 10 ? `${date}T12:00:00` : date
  return new Date(dateToFormat).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getRiskColor = (risk) => {
  const colors = {
    'Critical': 'text-red-500',
    'High': 'text-orange-500',
    'Medium': 'text-yellow-500',
    'Low': 'text-green-500'
  }
  return colors[risk] || 'text-gray-500'
}

const getStatusColor = (status) => {
  const colors = {
    'Validated': 'text-green-500',
    'Pending': 'text-yellow-500',
    'Investigating': 'text-blue-500',
    'Resolved': 'text-purple-500'
  }
  return colors[status] || 'text-gray-500'
}

const getDataTypeColor = (type) => {
  const colors = {
    'email': 'text-blue-400',
    'password': 'text-red-400',
    'phone': 'text-green-400'
  }
  return colors[type] || 'text-purple-400'
}
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>