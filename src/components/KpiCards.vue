<template>
  <div class="grid grid-cols-5 gap-6 mb-6">
    <div 
      v-for="(kpi, index) in kpiData" 
      :key="kpi.id"
      class="glass-card border border-theme rounded-lg p-6 interactive animate-slide-in shadow-theme transition-theme"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <div class="text-muted text-sm mb-2">{{ kpi.label }}</div>
      <div 
        class="text-3xl font-bold"
        :class="kpi.colorClass"
      >
        {{ kpi.value }}
      </div>
      <div 
        v-if="kpi.trend"
        class="flex items-center gap-1 mt-2 text-xs"
        :class="kpi.trend.type === 'up' ? 'text-green' : 'text-red'"
      >
        <svg 
          class="w-3 h-3" 
          :class="kpi.trend.type === 'down' ? 'rotate-180' : ''"
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M7 14l5-5 5 5z"/>
        </svg>
        <span>{{ kpi.trend.value }}% desde ayer</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLeaksStore } from '@/store/leaksStore'

const props = defineProps({
  orgData: {
    type: Object,
    default: () => ({})
  }
})

const leaksStore = useLeaksStore()

const kpiData = computed(() => [
  {
    id: 'total-leaks',
    label: 'Total Leaks',
    value: leaksStore.kpis.totalLeaks?.toLocaleString() || '0',
    colorClass: 'text-cmint-primary',
    trend: { type: 'up', value: 12 }
  },
  {
    id: 'unique-credentials',
    label: 'Unique Credentials',
    value: leaksStore.kpis.uniqueCredentials?.toLocaleString() || '0',
    colorClass: 'text-blue',
    trend: { type: 'up', value: 8 }
  },
  {
    id: 'reuse-detected',
    label: 'Reuse Detected',
    value: leaksStore.kpis.reuseDetected?.toLocaleString() || '0',
    colorClass: 'text-orange',
    trend: { type: 'down', value: 5 }
  },
  {
    id: 'active-sources',
    label: 'Active Sources',
    value: leaksStore.kpis.activeSources?.toString() || '0',
    colorClass: 'text-green',
    trend: { type: 'up', value: 3 }
  },
  {
    id: 'last-sync',
    label: 'Last Sync',
    value: leaksStore.kpis.lastSync || '2024-01-15 14:32:15',
    colorClass: 'text-medium-contrast'
  }
])
</script>

<style scoped>
/* Animación de entrada secuencial */
.animate-slide-in {
  opacity: 0;
  transform: translateY(20px);
  animation: slideInFade 0.6s ease-out forwards;
}

@keyframes slideInFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
