<template>
  <div style="padding: 2rem; color: white; background: #0d0d0d; min-height: 100vh;">
    <h1 style="color: #f9bc0b; font-size: 2rem; margin-bottom: 1rem;">🚀 Test Dashboard</h1>
    <p>Si ves esto, el componente está funcionando!</p>
    <div style="margin-top: 2rem;">
      <h2 style="color: #ff8c42;">Test Store:</h2>
      <p>Total Leaks: {{ leaksStore.allLeaks.length }}</p>
      <p>Loading: {{ leaksStore.loading ? 'Sí' : 'No' }}</p>
    </div>
  </div>
</template>

<script>
import { useLeaksStore } from '../store/leaksStore'

export default {
  name: 'TestDashboard',
  setup() {
    const leaksStore = useLeaksStore()
    
    return {
      leaksStore
    }
  }
}
</script>
