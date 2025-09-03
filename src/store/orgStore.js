import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrgStore = defineStore('org', () => {
  const currentOrgId = ref('fiscalia-hermosillo')
  
  const orgs = ref([
    {
      id: 'fiscalia-hermosillo',
      name: 'Fiscalía Hermosillo',
      domain: 'hermosillo.gob.mx',
      logo: '/logos/hermosillo.png'
    },
    {
      id: 'fiscalia-ags',
      name: 'Fiscalía Aguascalientes', 
      domain: 'aguascalientes.gob.mx',
      logo: '/logos/aguascalientes.png'
    }
  ])

  const getCurrentOrg = computed(() => {
    return orgs.value.find(org => org.id === currentOrgId.value)
  })

  const setOrg = (orgId) => {
    if (orgs.value.find(org => org.id === orgId)) {
      currentOrgId.value = orgId
      // Persistir en localStorage
      localStorage.setItem('selectedOrgId', orgId)
    }
  }

  // Inicializar desde localStorage
  const savedOrgId = localStorage.getItem('selectedOrgId')
  if (savedOrgId && orgs.value.find(org => org.id === savedOrgId)) {
    currentOrgId.value = savedOrgId
  }

  return {
    currentOrgId,
    orgs,
    getCurrentOrg,
    setOrg
  }
})
