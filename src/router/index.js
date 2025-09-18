import { createRouter, createWebHistory } from 'vue-router'
import { useOrgStore } from '@/store/orgStore'
import MainDashboard from '@/components/MainDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: MainDashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const orgStore = useOrgStore()
  
  // Si no hay org en la query, redirigir a catastro
  if (!to.query.org) {
    next({ 
      path: to.path, 
      query: { ...to.query, org: 'catastro' } 
    })
    return
  }
  
  // Sincronizar orgStore con query
  if (to.query.org !== orgStore.currentOrgId) {
    orgStore.setOrg(to.query.org)
  }
  
  next()
})

export default router
