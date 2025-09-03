import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import router from './router'
import App from './App.vue'

// Estilos
import './styles/theme.css'
// Force reload - 2025-09-01
import 'primeicons/primeicons.css'

const app = createApp(App)
const pinia = createPinia()

// Configurar PrimeVue
app.use(PrimeVue, {
  theme: 'none' // Usamos nuestros estilos custom
})
app.use(ToastService)
app.use(DialogService)

// Configurar Pinia y Router
app.use(pinia)
app.use(router)

app.mount('#app')
