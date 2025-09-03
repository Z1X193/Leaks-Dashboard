<template>
  <div class="min-h-screen bg-dashboard text-theme transition-theme">
    <!-- Header -->
    <header style="background: linear-gradient(135deg, #0d0d0d, #0d0d0d); border-bottom: 1px solid #333; padding: 1rem 1.5rem; position: sticky; top: 0; z-index: 40; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <!-- Left side -->
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <!-- Logo CMINT TPX -->
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <!-- CMINT TPX Logo -->
            <div style="width: 2.5rem; height: 2.5rem; background: linear-gradient(135deg, #f9bc0b, #ff8c42); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; position: relative; box-shadow: 0 4px 8px rgba(249, 188, 11, 0.3);">
              <!-- Circuit pattern background -->
              <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(13, 13, 13, 0.1) 0%, transparent 50%); border-radius: 0.5rem;"></div>
              <!-- Central chip -->
              <div style="width: 1.25rem; height: 0.875rem; background: #0d0d0d; border-radius: 0.125rem; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2;">
                <span style="color: #f9bc0b; font-size: 0.5rem; font-weight: 800; font-family: 'Courier New', monospace; letter-spacing: -0.05em;">TPX</span>
              </div>
              <!-- Circuit traces -->
              <svg style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1;" viewBox="0 0 40 40" fill="none">
                <!-- Top traces -->
                <path d="M12 4 L12 8 M20 4 L20 8 M28 4 L28 8" stroke="#0d0d0d" stroke-width="1.5" stroke-linecap="round"/>
                <!-- Right traces -->
                <path d="M36 12 L32 12 M36 20 L32 20 M36 28 L32 28" stroke="#0d0d0d" stroke-width="1.5" stroke-linecap="round"/>
                <!-- Bottom traces -->
                <path d="M28 36 L28 32 M20 36 L20 32 M12 36 L12 32" stroke="#0d0d0d" stroke-width="1.5" stroke-linecap="round"/>
                <!-- Left traces -->
                <path d="M4 28 L8 28 M4 20 L8 20 M4 12 L8 12" stroke="#0d0d0d" stroke-width="1.5" stroke-linecap="round"/>
                <!-- Corner connections -->
                <path d="M8 8 L12 12 M32 8 L28 12 M32 32 L28 28 M8 32 L12 28" stroke="#0d0d0d" stroke-width="1" stroke-linecap="round"/>
              </svg>
            </div>
            <span style="font-size: 1.125rem; font-weight: 600; color: #f9bc0b;">Centro de Monitoreo e Inteligencia</span>
          </div>
          
          <!-- Organizacion Display -->
          <div style="background: linear-gradient(45deg, #f9bc0b, #ff8c42); color: #0d0d0d; padding: 0.375rem 0.75rem; border-radius: 0.375rem; font-size: 0.75rem; display: flex; align-items: center; gap: 0.375rem; font-weight: 600;">
            <span>🏛️</span>
            <span>Gobierno Hermosillo</span>
          </div>

          <!-- License Info -->
          <div style="background: linear-gradient(45deg, #10B981, #059669); color: white; padding: 0.375rem 0.75rem; border-radius: 0.375rem; font-size: 0.625rem; display: flex; align-items: center; gap: 0.375rem; font-weight: 500;">
            <span>🔐</span>
            <span>Licencia: 0x2025/HMO/08/20</span>
          </div>
        </div>

        <!-- Right side - COMPACT COUNTDOWN TIMER -->
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="background: linear-gradient(45deg, #f9bc0b, #DC2626); padding: 0.75rem 1rem; border-radius: 0.75rem; box-shadow: 0 4px 12px rgba(249, 188, 11, 0.3); border: 1px solid #333;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="display: flex; flex-direction: column; align-items: flex-start;">
                <div style="font-size: 0.625rem; color: rgba(255,255,255,0.9); font-weight: 500;">⏳ Acceso sistema</div>
                <div style="font-size: 0.5rem; color: rgba(255,255,255,0.7); margin-top: 1px;">Caduca: 31 Dic 2025</div>
              </div>
              
              <!-- Compact countdown -->
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="text-align: center;">
                  <div style="font-size: 0.875rem; font-weight: 700; color: white; line-height: 1;">{{ countdown.days }}</div>
                  <div style="font-size: 0.5rem; color: rgba(255,255,255,0.8);">días</div>
                </div>
                <div style="color: rgba(255,255,255,0.6);">:</div>
                <div style="text-align: center;">
                  <div style="font-size: 0.875rem; font-weight: 700; color: white; line-height: 1;">{{ countdown.hours.toString().padStart(2, '0') }}</div>
                  <div style="font-size: 0.5rem; color: rgba(255,255,255,0.8);">hrs</div>
                </div>
                <div style="color: rgba(255,255,255,0.6);">:</div>
                <div style="text-align: center;">
                  <div style="font-size: 0.875rem; font-weight: 700; color: white; line-height: 1;">{{ countdown.minutes.toString().padStart(2, '0') }}</div>
                  <div style="font-size: 0.5rem; color: rgba(255,255,255,0.8);">min</div>
                </div>
                <div style="color: rgba(255,255,255,0.6);">:</div>
                <div style="text-align: center;">
                  <div style="font-size: 0.875rem; font-weight: 700; color: white; line-height: 1;">{{ countdown.seconds.toString().padStart(2, '0') }}</div>
                  <div style="font-size: 0.5rem; color: rgba(255,255,255,0.8);">seg</div>
                </div>
              </div>
              
              <!-- Mini progress indicator -->
              <div style="width: 3px; height: 32px; background: rgba(255,255,255,0.3); border-radius: 9999px; overflow: hidden; margin-left: 0.5rem;">
                <div style="width: 100%; background: linear-gradient(to top, #fff, rgba(255,255,255,0.5)); border-radius: 9999px; transition: height 1s ease;" :style="{ height: (countdown.seconds / 59 * 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- System Description Banner -->
    <div class="px-6 pt-4">
      <div class="card-cmint rounded-lg p-4 mb-4 shadow-theme-lg">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h2 class="text-lg font-semibold mb-2 text-cmint-primary">🛡️ Protección Proactiva del Ecosistema Digital</h2>
            <p class="text-sm leading-relaxed text-muted">
              Proteger de manera proactiva el ecosistema digital del Catastro Municipal de Hermosillo, mediante una licencia especializada que habilita la detección temprana de amenazas cibernéticas, el monitoreo continuo en la dark web y la identificación de posibles fugas de información.
            </p>
          </div>
          <div class="ml-6 text-right">
            <div class="bg-cmint-dark border border-cmint-primary rounded-lg p-3 shadow-theme">
              <div style="color: #f9bc0b; font-size: 0.75rem; font-weight: 600;">CONTRATO</div>
              <div style="color: #ff8c42; font-size: 0.875rem; font-weight: 700;">CAAS/EXT/45/2025/PSP-442</div>
              <div style="color: #d1d5db; font-size: 0.625rem; margin-top: 0.25rem;">Licencia caduca: 31 Dic 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-6">
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300">
          <div class="text-sm text-gray-400 mb-2">Total Leaks</div>
          <div class="text-3xl font-bold" style="color: #f9bc0b;">{{ totalLeaks.toLocaleString() }}</div>
        </div>
        
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300">
          <div class="text-sm text-gray-400 mb-2">Unique Credentials</div>
          <div class="text-3xl font-bold" style="color: #8B5CF6;">{{ uniqueCredentials.toLocaleString() }}</div>
        </div>
        
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300">
          <div class="text-sm text-gray-400 mb-2">Reuse Detected</div>
          <div class="text-3xl font-bold" style="color: #ff8c42;">{{ highRisk.toLocaleString() }}</div>
        </div>
        
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300">
          <div class="text-sm text-gray-400 mb-2">Active Sources</div>
          <div class="text-3xl font-bold" style="color: #10B981;">{{ activeSources }}</div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300">
          <div class="text-sm text-gray-400 mb-2">Last Sync</div>
          <div class="text-lg font-mono" style="color: #d1d5db;">2024-01-15 14:32:15</div>
        </div>
      </div>

      <!-- Export Button -->
      <div class="flex justify-center mb-8">
        <button 
          @click="handleExportCSV"
          class="px-8 py-3 rounded-full font-semibold flex items-center gap-3 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg"
          style="background: linear-gradient(45deg, #f9bc0b, #ff8c42); color: #0d0d0d;"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export Data to CSV
          <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </button>
      </div>

      <!-- Leak Table -->
      <LeaksTable
        :leaks="allLeaks || []"
        @selectLeak="openLeakDetails"
        @menuAction="handleMenuAction"
      />

      <!-- Separación entre tabla y gráficas -->
      <div class="my-8 border-t border-subtle"></div>

      <!-- Analytics Charts Component -->
      <AnalyticsCharts :leaks="allLeaks || []" />
    </div>

    <!-- Leak Details Panel -->
    <div 
      v-if="showLeakDetails" 
      class="fixed inset-y-0 right-0 w-96 bg-gray-800 border-l-2 border-yellow-400 z-50 overflow-y-auto"
    >
      <div class="p-6 border-b border-gray-700 flex items-center justify-between">
        <h2 class="text-xl font-semibold" style="color: #f9bc0b;">Leak Detalles</h2>
        <button @click="closeLeakDetails" class="text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div v-if="selectedLeak" class="p-6 space-y-6">
        <!-- Organization -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">🏛️ Organización</label>
          <div class="text-white bg-gray-700 p-3 rounded-lg">{{ getOrganizationFromDomain(selectedLeak.domain) }}</div>
        </div>
        
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">📧 Email</label>
          <div class="text-blue-400 bg-gray-700 p-3 rounded-lg font-mono">{{ selectedLeak.email }}</div>
        </div>
        
        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">🔒 Contraseña</label>
          <div class="flex items-center gap-2">
            <div class="flex-1 text-white bg-gray-700 p-3 rounded-lg font-mono">
              {{ showPassword ? selectedLeak.password : '•'.repeat(selectedLeak.password.length) }}
            </div>
            <button 
              @click="togglePasswordVisibility"
              class="px-3 py-3 text-sm bg-gray-600 hover:bg-gray-500 rounded-lg"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
            <button 
              @click="copyPassword(selectedLeak.password)"
              class="px-3 py-3 text-sm bg-gray-600 hover:bg-gray-500 rounded-lg"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Domain -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">🌐 Dominio</label>
          <div class="text-blue-400 bg-gray-700 p-3 rounded-lg">{{ selectedLeak.domain }}</div>
        </div>
        
        <!-- Risk Level -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">⭐ Nivel de Riesgo</label>
          <span class="px-3 py-1 rounded-full text-sm" :class="getRiskBadge(selectedLeak.risk)">
            {{ selectedLeak.risk }}
          </span>
        </div>
        
        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">✅ Estado</label>
          <span class="px-3 py-1 rounded-full text-sm" :class="getStatusBadge(selectedLeak.status)">
            {{ selectedLeak.status }}
          </span>
        </div>

        <!-- Database -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">💾 Database</label>
          <div class="text-white bg-gray-700 p-3 rounded-lg">{{ selectedLeak.source }}</div>
        </div>
        
        <!-- Data Types -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">📄 Tipos de Datos</label>
          <div class="flex flex-wrap gap-2">
            <span v-for="type in selectedLeak.dataTypes" :key="type" class="px-2 py-1 text-xs rounded" :class="getDataTypeBadge(type)">
              {{ type }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3 pt-4">
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Assign Analyst
          </button>
          
          <button class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Mark as Resolved
          </button>
          
          <button class="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            View Related Leaks in Sector Educativo
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div 
      v-if="showLeakDetails" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40" 
      @click="closeLeakDetails"
    ></div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useLeaksStore } from '../store/leaksStore'
import { storeToRefs } from 'pinia'
import { exportToCSV } from '../services/csv'
import LeaksTable from './LeaksTable.vue'
import AnalyticsCharts from './AnalyticsCharts.vue'

export default {
  name: 'MainDashboard',
  components: {
    LeaksTable,
    AnalyticsCharts
  },
  setup() {
    const leaksStore = useLeaksStore()
    const { allLeaks, loading } = storeToRefs(leaksStore)
    
    // Reactive data for sidebar
    const showLeakDetails = ref(false)
    const selectedLeak = ref(null)
    const showPassword = ref(false)

    // Countdown timer
    const countdown = ref({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    })

    // Chart tooltips
    const domainTooltip = reactive({
      show: false,
      x: 0,
      y: 0,
      domain: '',
      count: 0
    })

    const trendTooltip = reactive({
      show: false,
      x: 0,
      y: 0,
      month: '',
      count: 0
    })

    // Computed properties for KPIs - usando storeToRefs
    const totalLeaks = computed(() => {
      try {
        return allLeaks.value?.length || 0
      } catch (error) {
        console.error('Error accessing totalLeaks:', error)
        return 0
      }
    })
    
    const uniqueCredentials = computed(() => {
      try {
        if (!allLeaks.value?.length) return 0
        return new Set(allLeaks.value?.map(leak => leak.email)).size
      } catch (error) {
        console.error('Error accessing uniqueCredentials:', error)
        return 0
      }
    })
    
    const highRisk = computed(() => {
      try {
        if (!allLeaks.value?.length) return 0
        return allLeaks.value?.filter(leak => leak.risk === 'High' || leak.risk === 'Critical').length
      } catch (error) {
        console.error('Error accessing highRisk:', error)
        return 0
      }
    })
    
    const activeSources = computed(() => {
      try {
        if (!allLeaks.value?.length) return 0
        return new Set(allLeaks.value?.map(leak => leak.source)).size
      } catch (error) {
        console.error('Error accessing activeSources:', error)
        return 0
      }
    })

    // Chart data
    const domainChartData = computed(() => {
      try {
        if (!allLeaks.value?.length) return []
        
        const domainCounts = {}
        allLeaks.value?.forEach(leak => {
          domainCounts[leak.domain] = (domainCounts[leak.domain] || 0) + 1
        })

        const sortedDomains = Object.entries(domainCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)

        const maxCount = Math.max(...sortedDomains.map(([,count]) => count))
        const colors = [
          'var(--cmint-primary)',    // #f9bc0b
          'var(--orange)',           // #ff8c42
          'var(--purple)',           // #a78bfa
          'var(--green)',            // #4ade80
          'var(--red)'               // #f87171
        ]

        return sortedDomains.map(([domain, count], index) => ({
          domain,
          count,
          heightPercent: (count / maxCount) * 100,
          color: colors[index % colors.length]
        }))
      } catch (error) {
        console.error('Error accessing domainChartData:', error)
        return []
      }
    })

    const monthlyTrendData = computed(() => {
      const months = ['Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      const currentMonth = new Date().getMonth()
      
      const trendData = months.map((month, index) => {
        // Simulate trend data - in real app this would come from API
        const baseCount = 150
        const variation = Math.sin(index * 0.5) * 50 + Math.random() * 30
        const count = Math.floor(baseCount + variation)
        
        return {
          month,
          count,
          x: 80 + (index * 50),
          y: 180 - (count / 250 * 120),
          isCurrentMonth: index === 1 // Sep is current
        }
      })

      return trendData
    })

    // Methods
    const updateCountdown = () => {
      const targetDate = new Date('2025-12-31T23:59:59')
      const now = new Date()
      const timeDiff = targetDate - now

      if (timeDiff > 0) {
        countdown.value.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        countdown.value.hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        countdown.value.minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        countdown.value.seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
      }
    }

    const openLeakDetails = (leak) => {
      selectedLeak.value = leak
      showLeakDetails.value = true
      showPassword.value = false
    }

    const closeLeakDetails = () => {
      showLeakDetails.value = false
      selectedLeak.value = null
      showPassword.value = false
    }

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value
    }

    const handleExportCSV = () => {
      if (!allLeaks.value?.length) {
        console.warn('No hay datos para exportar')
        return
      }
      exportToCSV(allLeaks.value || [], 'gobierno-hermosillo-leaks-export.csv')
    }

    const copyPassword = async (password) => {
      try {
        await navigator.clipboard.writeText(password)
      } catch (err) {
        console.error('Error copying password:', err)
      }
    }

    const handleMenuAction = (eventData) => {
      const { action, leak } = eventData
      if (action === 'view') {
        openLeakDetails(leak)
      } else if (action === 'export') {
        exportToCSV([leak], `leak-${leak.id}-export.csv`)
      }
    }

    const getOrganizationFromDomain = (domain) => {
      if (domain.includes('hermosillo.gob.mx')) {
        return 'Gobierno Municipal de Hermosillo'
      } else if (domain.includes('unison.mx')) {
        return 'Universidad de Sonora'
      } else if (domain.includes('fiscalia-son.mx')) {
        return 'Fiscalía General del Estado de Sonora'
      }
      return 'Sector Educativo'
    }

    // Chart methods
    const generateTrendPath = (data) => {
      if (!data.length) return ''
      
      let path = `M ${data[0].x} ${data[0].y}`
      
      for (let i = 1; i < data.length; i++) {
        const prev = data[i - 1]
        const curr = data[i]
        const cp1x = prev.x + (curr.x - prev.x) / 3
        const cp1y = prev.y
        const cp2x = curr.x - (curr.x - prev.x) / 3
        const cp2y = curr.y
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
      }
      
      return path
    }

    const generateTrendAreaPath = (data) => {
      if (!data.length) return ''
      
      let path = `M ${data[0].x} 280`  // Start from bottom
      path += ` L ${data[0].x} ${data[0].y}`  // Line to first point
      
      // Create smooth curve through points
      for (let i = 1; i < data.length; i++) {
        const prev = data[i - 1]
        const curr = data[i]
        const cp1x = prev.x + (curr.x - prev.x) / 3
        const cp1y = prev.y
        const cp2x = curr.x - (curr.x - prev.x) / 3
        const cp2y = curr.y
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
      }
      
      // Close the area by going back to bottom
      path += ` L ${data[data.length - 1].x} 280`
      path += ` Z`
      
      return path
    }

    const showDomainTooltip = (event, domain, count) => {
      domainTooltip.show = true
      domainTooltip.x = event.clientX
      domainTooltip.y = event.clientY
      domainTooltip.domain = domain
      domainTooltip.count = count
    }

    const hideDomainTooltip = () => {
      domainTooltip.show = false
    }

    const showTrendTooltip = (event, month, count) => {
      trendTooltip.show = true
      trendTooltip.x = event.clientX
      trendTooltip.y = event.clientY
      trendTooltip.month = month
      trendTooltip.count = count
    }

    const hideTrendTooltip = () => {
      trendTooltip.show = false
    }

    // Lifecycle
    let countdownInterval

    onMounted(async () => {
      try {
        await leaksStore.loadLeaks()
        
        // Start countdown timer
        updateCountdown()
        countdownInterval = setInterval(updateCountdown, 1000)
      } catch (error) {
        console.error('Error initializing dashboard:', error)
      }
    })

    onUnmounted(() => {
      if (countdownInterval) {
        clearInterval(countdownInterval)
      }
    })

    return {
      // Store data
      allLeaks,
      loading,
      
      // Data
      showLeakDetails,
      selectedLeak,
      showPassword,
      countdown,

      // Computed
      totalLeaks,
      uniqueCredentials,
      highRisk,
      activeSources,

      // Methods
      openLeakDetails,
      closeLeakDetails,
      togglePasswordVisibility,
      handleExportCSV,
      copyPassword,
      getOrganizationFromDomain,
      handleMenuAction
    }
  }
}
</script>

<style scoped>
@keyframes barGrow {
  from { 
    transform: scaleY(0); 
    opacity: 0; 
  }
  to { 
    transform: scaleY(1); 
    opacity: 1; 
  }
}

@keyframes pathDraw {
  from { 
    stroke-dasharray: 1000; 
    stroke-dashoffset: 1000; 
  }
  to { 
    stroke-dasharray: 1000; 
    stroke-dashoffset: 0; 
  }
}

@keyframes slideIn {
  from { 
    opacity: 0; 
    transform: translateY(10px) scale(0.8); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Chart Elements */
.chart-bar {
  animation: barGrow 0.8s ease-out forwards;
  transform-origin: bottom;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  filter: brightness(1.1);
  transform: scaleY(1.05);
}

.chart-line {
  stroke-dasharray: 1000;
  animation: pathDraw 2s ease-out forwards;
  transition: all 0.3s ease;
}

.chart-point {
  animation: slideIn 0.6s ease-out forwards;
  opacity: 0;
  transition: all 0.3s ease;
}

.chart-point:hover {
  filter: brightness(1.2);
  transform: scale(1.2);
}

.chart-point:nth-child(1) { animation-delay: 0.1s; }
.chart-point:nth-child(2) { animation-delay: 0.2s; }
.chart-point:nth-child(3) { animation-delay: 0.3s; }
.chart-point:nth-child(4) { animation-delay: 0.4s; }
.chart-point:nth-child(5) { animation-delay: 0.5s; }

/* Responsive chart containers */
@media (max-width: 1024px) {
  .grid-cols-1.lg\\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .h-80 svg {
    height: 250px;
  }
  
  .chart-bar {
    min-width: 35px;
  }
  
  .chart-point {
    r: 5;
  }
}

/* Modern card effects */
.bg-card:hover {
  transform: translateY(-2px);
}

/* Tooltip improvements */
.fixed.z-50 {
  animation: fadeIn 0.2s ease-out;
}
</style>
