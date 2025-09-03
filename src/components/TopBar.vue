<template>
  <header class="header-cmint glass-surface px-6 py-4 sticky top-0 z-40 shadow-theme">
    <div class="flex items-center justify-between">
      <!-- Left side -->
      <div class="flex items-center gap-6">
        <!-- Logo TPX -->
        <div class="flex items-center gap-3 interactive">
          <!-- CMINT TPX Logo -->
          <div class="w-10 h-10 gradient-cmint rounded-lg flex items-center justify-content relative cmint-glow">
            <!-- Circuit pattern background -->
            <div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent rounded-lg"></div>
            <!-- Central chip -->
            <div class="w-5 h-3.5 bg-cmint-dark rounded-sm flex items-center justify-center relative z-10">
              <span class="text-cmint-primary text-xs font-bold font-mono tracking-tighter">TPX</span>
            </div>
            <!-- Circuit traces -->
            <svg class="absolute inset-0 w-full h-full z-5" viewBox="0 0 40 40" fill="none">
              <path d="M12 4 L12 8 M20 4 L20 8 M28 4 L28 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M36 12 L32 12 M36 20 L32 20 M36 28 L32 28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M28 36 L28 32 M20 36 L20 32 M12 36 L12 32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M4 28 L8 28 M4 20 L8 20 M4 12 L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M8 8 L12 12 M32 8 L28 12 M32 32 L28 28 M8 32 L12 28" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="text-xl font-semibold text-cmint-primary">{{ appName }}</span>
        </div>
        
        <!-- Organization Display -->
        <div class="bg-cmint-primary border-cmint-primary text-cmint-dark px-3 py-1 rounded-lg text-sm flex items-center gap-2 animate-slide-in font-semibold">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>Fiscalía Hermosillo</span>
        </div>
      </div>

      <!-- Right side - COUNTDOWN TIMER -->
      <div class="flex items-center gap-4">
        <div class="relative">
          <div class="card-cmint p-4 rounded-xl shadow-theme-lg cmint-glow">
            <div class="text-center">
              <div class="text-xs font-medium text-muted mb-1">🎊 Tiempo restante 2025 🎊</div>
              <div class="text-xs text-muted/70 mb-2">Caduca: 31 Dic 2025</div>
              <div class="flex items-center gap-3">
                <!-- Days -->
                <div class="text-center">
                  <div class="text-2xl font-bold text-theme">{{ countdown.days }}</div>
                  <div class="text-xs text-muted">días</div>
                </div>
                
                <div class="text-muted text-lg font-bold">:</div>
                
                <!-- Hours -->
                <div class="text-center">
                  <div class="text-xl font-bold text-theme">{{ countdown.hours }}</div>
                  <div class="text-xs text-muted">hrs</div>
                </div>
                
                <div class="text-muted text-lg font-bold">:</div>
                
                <!-- Minutes -->
                <div class="text-center">
                  <div class="text-xl font-bold text-theme">{{ countdown.minutes }}</div>
                  <div class="text-xs text-muted">min</div>
                </div>
                
                <div class="text-white/50 text-lg font-bold">:</div>
                
                <!-- Seconds -->
                <div class="text-center">
                  <div class="text-xl font-bold text-white animate-pulse">{{ countdown.seconds }}</div>
                  <div class="text-xs text-white/70">seg</div>
                </div>
              </div>
              
              <!-- Progress bar -->
              <div class="mt-3">
                <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div 
                    class="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000 ease-out"
                    :style="{ width: `${progressPercentage}%` }"
                  ></div>
                </div>
                <div class="text-xs text-white/70 mt-1 font-medium">{{ progressPercentage.toFixed(1) }}% del año completado</div>
              </div>
            </div>
          </div>
          
          <!-- Floating particles effect -->
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
          <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
          <div class="absolute top-1 left-2 w-1 h-1 bg-pink-400 rounded-full animate-bounce" style="animation-delay: 1s;"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  appName: {
    type: String,
    default: 'Leak Intelligence'
  },
  user: {
    type: Object,
    default: () => ({
      name: 'John Doe',
      email: 'john@fiscalia-hermosillo.gob.mx'
    })
  },
  isDarkMode: {
    type: Boolean,
    default: true
  }
})

// Countdown logic
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const progressPercentage = ref(0)
let countdownInterval = null

const updateCountdown = () => {
  const now = new Date()
  const endOfYear = new Date('2025-12-31T23:59:59')
  const startOfYear = new Date('2025-01-01T00:00:00')
  
  const timeDiff = endOfYear - now
  const yearDiff = endOfYear - startOfYear
  
  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
    
    countdown.value = { days, hours, minutes, seconds }
    
    // Calculate progress percentage
    const elapsed = now - startOfYear
    progressPercentage.value = Math.min((elapsed / yearDiff) * 100, 100)
  } else {
    // Year ended
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    progressPercentage.value = 100
  }
}

onMounted(() => {
  console.log('🚀 Nuevo Topbar con countdown cargado!')
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
/* Animaciones custom */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-text {
  background: linear-gradient(45deg, #22d3ee, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
