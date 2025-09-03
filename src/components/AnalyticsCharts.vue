<template>
  <div class="analytics-section">
    <!-- Analytics Section Header -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-theme mb-2">Análisis de Datos</h2>
      <p class="text-muted text-sm">Estadísticas y tendencias de filtraciones detectadas</p>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Domain Chart -->
      <div class="bg-card border border-subtle rounded-xl p-6 hover:border-cmint-primary transition-all duration-300 shadow-lg hover:shadow-xl">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-bold text-theme">Dominios Más Afectados</h3>
            <p class="text-sm text-muted">Gobierno Hermosillo</p>
          </div>
          <div class="p-2 bg-cmint-primary-bg rounded-lg">
            <svg class="w-5 h-5 text-cmint-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
          </div>
        </div>
        <div class="relative h-80">
          <svg width="100%" height="100%" viewBox="0 0 600 320" class="overflow-visible">
            <!-- Background grid -->
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-subtle)" stroke-width="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            <!-- Chart bars -->
            <g v-for="(item, index) in domainChartData" :key="item.domain">
              <rect
                :x="100 + index * 90"
                :y="280 - (item.heightPercent * 2.2)"
                width="60"
                :height="item.heightPercent * 2.2"
                :fill="item.color"
                class="chart-bar cursor-pointer transition-all duration-300 hover:opacity-80"
                rx="8"
                @mouseenter="(e) => showDomainTooltip(e, item.domain, item.count)"
                @mouseleave="hideDomainTooltip"
              />
              <!-- Value labels on top of bars -->
              <text 
                :x="130 + index * 90" 
                :y="270 - (item.heightPercent * 2.2)" 
                text-anchor="middle" 
                class="text-sm font-bold fill-white"
                style="paint-order: stroke; stroke: var(--background); stroke-width: 3px; stroke-linejoin: round;"
              >
                {{ item.count }}
              </text>
              <!-- Domain labels -->
              <text 
                :x="130 + index * 90" 
                y="300" 
                text-anchor="middle" 
                class="text-sm font-semibold fill-white"
                style="paint-order: stroke; stroke: var(--background); stroke-width: 2px; stroke-linejoin: round;"
              >
                {{ item.domain.split('.')[0] }}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Trends Chart -->
      <div class="bg-card border border-subtle rounded-xl p-6 hover:border-cmint-primary transition-all duration-300 shadow-lg hover:shadow-xl">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-bold text-theme">Tendencias Mensuales</h3>
            <p class="text-sm text-muted">Evolución de filtraciones</p>
          </div>
          <div class="p-2 bg-cmint-primary-bg rounded-lg">
            <svg class="w-5 h-5 text-cmint-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
            </svg>
          </div>
        </div>
        <div class="relative h-80">
          <svg width="100%" height="100%" viewBox="0 0 600 320" class="overflow-visible">
            <!-- Background grid -->
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:var(--cmint-primary);stop-opacity:0.1" />
                <stop offset="100%" style="stop-color:var(--orange);stop-opacity:0.1" />
              </linearGradient>
            </defs>
            
            <!-- Grid lines -->
            <g stroke="var(--border-subtle)" stroke-width="1" opacity="0.3">
              <line x1="100" y1="40" x2="100" y2="280"/>
              <line x1="100" y1="280" x2="500" y2="280"/>
              <!-- Horizontal grid lines -->
              <line x1="100" y1="100" x2="500" y2="100"/>
              <line x1="100" y1="160" x2="500" y2="160"/>
              <line x1="100" y1="220" x2="500" y2="220"/>
            </g>
            
            <!-- Area under curve -->
            <path
              :d="generateTrendAreaPath(monthlyTrendData)"
              fill="url(#lineGradient)"
              opacity="0.3"
            />
            
            <!-- Trend line -->
            <path
              :d="generateTrendPath(monthlyTrendData)"
              stroke="var(--cmint-primary)"
              stroke-width="4"
              fill="none"
              class="chart-line"
              style="filter: drop-shadow(0 2px 4px rgba(249, 188, 11, 0.3))"
            />
            
            <!-- Data points -->
            <g v-for="(point, index) in monthlyTrendData" :key="point.month">
              <circle
                :cx="point.x"
                :cy="point.y"
                r="8"
                :fill="point.isCurrentMonth ? 'var(--orange)' : 'var(--cmint-primary)'"
                :stroke="point.isCurrentMonth ? 'var(--orange)' : 'var(--cmint-primary)'"
                stroke-width="3"
                class="chart-point cursor-pointer transition-all duration-300 hover:r-10"
                style="filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))"
                @mouseenter="(e) => showTrendTooltip(e, point.month, point.count)"
                @mouseleave="hideTrendTooltip"
              />
              <!-- Value labels -->
              <text 
                :x="point.x" 
                :y="point.y - 20" 
                text-anchor="middle" 
                class="text-sm font-bold fill-white"
                style="paint-order: stroke; stroke: var(--background); stroke-width: 3px; stroke-linejoin: round;"
              >
                {{ point.count }}
              </text>
              <!-- Month labels -->
              <text 
                :x="point.x" 
                y="305" 
                text-anchor="middle" 
                class="text-sm font-semibold fill-white"
                style="paint-order: stroke; stroke: var(--background); stroke-width: 2px; stroke-linejoin: round;"
              >
                {{ point.month }}
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <!-- Chart Tooltips -->
    <div 
      v-if="domainTooltip.show" 
      class="fixed z-50 pointer-events-none bg-card-solid border border-theme rounded-xl px-4 py-3 shadow-theme-lg backdrop-blur-sm"
      :style="{ 
        left: domainTooltip.x + 'px', 
        top: domainTooltip.y + 'px',
        transform: 'translate(-50%, -100%)'
      }"
    >
      <div class="text-xs font-medium text-muted uppercase tracking-wide mb-1">{{ domainTooltip.domain }}</div>
      <div class="text-xl font-bold text-cmint-primary flex items-center gap-2">
        {{ domainTooltip.count }} 
        <span class="text-sm font-normal text-muted">leaks</span>
      </div>
      <!-- Arrow -->
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-card-solid border-r border-b border-theme rotate-45"></div>
    </div>

    <div 
      v-if="trendTooltip.show" 
      class="fixed z-50 pointer-events-none bg-card-solid border border-theme rounded-xl px-4 py-3 shadow-theme-lg backdrop-blur-sm"
      :style="{ 
        left: trendTooltip.x + 'px', 
        top: trendTooltip.y + 'px',
        transform: 'translate(-50%, -100%)'
      }"
    >
      <div class="text-xs font-medium text-muted uppercase tracking-wide mb-1">{{ trendTooltip.month }} 2025</div>
      <div class="text-xl font-bold text-cmint-primary flex items-center gap-2">
        {{ trendTooltip.count }} 
        <span class="text-sm font-normal text-muted">leaks</span>
      </div>
      <!-- Arrow -->
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-card-solid border-r border-b border-theme rotate-45"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useLeaksStore } from '../store/leaksStore'

// Store
const leaksStore = useLeaksStore()

// Reactive state for tooltips
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

// Chart data
const domainChartData = computed(() => {
  try {
    const topDomains = leaksStore.analytics.topDomains
    if (!topDomains || topDomains.length === 0) return []

    const maxCount = Math.max(...topDomains.map(item => item.count))
    const colors = [
      'var(--cmint-primary)',    // #f9bc0b
      'var(--orange)',           // #ff8c42
      'var(--purple)',           // #a78bfa
      'var(--green)',            // #4ade80
      'var(--red)'               // #f87171
    ]

    return topDomains.map((item, index) => ({
      domain: item.domain,
      count: item.count,
      heightPercent: maxCount > 0 ? (item.count / maxCount) * 100 : 0,
      color: colors[index % colors.length]
    }))
  } catch (error) {
    console.error('Error accessing domainChartData:', error)
    return []
  }
})

const monthlyTrendData = computed(() => {
  try {
    const trendData = leaksStore.analytics.monthlyTrends
    if (!trendData || trendData.length === 0) return []
    
    const currentMonth = new Date().getMonth()
    
    // Encontrar el valor máximo para normalizar la escala
    const maxCount = Math.max(...trendData.map(item => item.count))
    
    return trendData.map((item, index) => {
      const x = 150 + index * 90
      const normalizedValue = maxCount > 0 ? (item.count / maxCount) : 0
      const y = 260 - (normalizedValue * 160)
      
      return {
        month: item.month,
        count: item.count,
        x,
        y,
        isCurrentMonth: index === (currentMonth - 7) % 12
      }
    })
  } catch (error) {
    console.error('Error accessing monthlyTrendData:', error)
    return []
  }
})

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

/* Responsive charts */
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
    min-width: 45px;
  }
  
  .chart-point {
    r: 6;
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
