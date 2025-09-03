import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLeaksStore = defineStore('leaks', () => {
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)

  // Datos reales de leaks de Hermosillo
  const generateRealLeaks = () => {
    // Datos del CSV Consumer_hermosillo.gob.mx.csv
    const consumerLeaks = [
      { type: 'combolist', url: 'http://tramites.hermosillo.gob.mx:82/tramites/register.aspx', username: 'ozg.luoszr@gmbol.cem', password: 'PEDRojeRR', log_date: '2025-08-02' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: '444', password: 'reyna.corral@gmail.com', log_date: '2025-08-02' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444', username: 'Opera', password: 'LINDAVELIAAGUILAR@GMAIL.COM', log_date: '2025-08-02' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx', username: 'analiliagastelum', password: 'gastelum60', log_date: '2025-08-02' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'GORJ670819JV5', password: '131097Eduardo', log_date: '2025-08-02' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx', username: '444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspxBARM8505234B1', password: 'Sye170723', log_date: '2025-08-02' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444', username: 'Chrome', password: 'polfraktura@gmail.com', log_date: '2025-08-02' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'guidojch@gmail.com', password: 'Guido1988', log_date: '2025-08-02' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'CAHG8808043N2', password: 'Guido1988', log_date: '2025-08-02' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'SOPORTE', password: '@63ND4ACC', log_date: '2025-08-02' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/servicios/', username: 'luaresoj781@gmail.com', password: 'pepe7812', log_date: '2025-08-03' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'CKN140929897', password: 'cfva1938', log_date: '2025-08-04' },
      { type: 'combolist', url: 'http://et.hermosillo.gob.mx', username: '2345', password: '37855420', log_date: '2025-08-06' },
      { type: 'combolist', url: 'http://infracciones.hermosillo.gob.mx/', username: 'JCAZAREZ', password: 'InfraccionesHmo21', log_date: '2025-08-09' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'ebarraza23@gmail.com', password: 'Sye170723*', log_date: '2025-08-09' },
      { type: 'combolist', url: 'http://declaranet.hermosillo.gob.mx:82/', username: 'Muic770615', password: 'calle1234', log_date: '2025-08-12' },
      { type: 'combolist', url: 'https://presupuestocreces.hermosillo.gob.mx/Account/Register', username: 'anaelizabethromero28@gmail.com', password: 'Ana.Romero.28', log_date: '2025-08-13' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/controltramites/login.aspx', username: 'tucasahmo25', password: 'VPHNA7qFBUA95Dr', log_date: '2025-08-13' },
      { type: 'combolist', url: 'http://ventanilladigital.hermosillo.gob.mx/portalciudadano/', username: 'MLA240110CW4', password: 'Pekenojuan12#', log_date: '2025-08-16' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/controltramites/login.aspx', username: 'Diegofm', password: '-@b-s&^FKPg77u_', log_date: '2025-08-16' },
      { type: 'stealer', url: 'https://hbus.hermosillo.gob.mx/Hbus/login.php', username: 'recj040718msryrna7', password: 'Madoka18', log_date: '2025-08-01', hostname: 'AQ2Y-D8VE-ARQX-', ipAddress: '177.228.75.13', osInfo: 'Windows 10 22H2 build 19045 (64 Bit)', countryCode: 'MX' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'anaelizabethromero@hotmail.com', password: '4263', log_date: '2025-08-04', hostname: 'AQ2Y-D8VE-ARQX-', ipAddress: '177.228.75.13', osInfo: 'Windows 10 22H2 build 19045 (64 Bit)', countryCode: 'MX' },
      { type: 'stealer', url: 'https://correo.hermosillo.gob.mx/owa/auth/logon.aspx', username: 'asoqui', password: 'As0qui22', log_date: '2025-08-06', hostname: 'DESKTOP-QSRJD7H', ipAddress: '189.173.51.84', osInfo: 'Windows 10 22H2 build 19045 (64 Bit)', countryCode: 'MX' },
      { type: 'stealer', url: 'http://infracciones.hermosillo.gob.mx/', username: 'jcazarez', password: 'InfraccionesHmo21', log_date: '2025-08-06', hostname: 'DESKTOP-QSRJD7H', ipAddress: '189.173.51.84', osInfo: 'Windows 10 22H2 build 19045 (64 Bit)', countryCode: 'MX' },
      { type: 'stealer', url: 'https://declaranet.hermosillo.gob.mx/', username: 'soma931103tw4', password: 'hamburguesa5', log_date: '2025-08-06', hostname: 'DESKTOP-QSRJD7H', ipAddress: '189.173.51.84', osInfo: 'Windows 10 22H2 build 19045 (64 Bit)', countryCode: 'MX' }
    ]

    // Datos del CSV Corporativo_hermosillo.gob.mx.csv
    const corporateLeaks = [
      { type: 'combolist', url: 'http://plataformadetransparencia.org.mx/web/guest/inicio', username: 'utm.gabinete@hermosillo.gob.mx', password: 'Cocreacion30', log_date: '2025-08-15' }
    ]

    const allRawLeaks = [...consumerLeaks, ...corporateLeaks]
    
    const leaks = allRawLeaks.map((leak, index) => {
      // Extraer dominio de la URL
      let domain = 'hermosillo.gob.mx'
      try {
        const url = new URL(leak.url.startsWith('http') ? leak.url : `http://${leak.url}`)
        domain = url.hostname
      } catch (e) {
        // Si falla, intentar extraer manualmente
        const match = leak.url.match(/(?:https?:\/\/)?(?:www\.)?([^\/\:]+)/i)
        if (match) domain = match[1]
      }

      // Determinar email
      let email = leak.username
      if (!email.includes('@')) {
        // Si no es email, crear uno basado en el username y dominio
        email = `${leak.username.toLowerCase()}@${domain}`
      }

      // Determinar nivel de riesgo basado en el tipo y datos disponibles
      let risk = 'Medium'
      if (leak.type === 'stealer') {
        risk = 'Critical'
      } else if (leak.password && leak.password.length > 8) {
        risk = 'High'
      } else if (leak.password && leak.password.length <= 4) {
        risk = 'Low'
      }

      // Determinar tipos de datos
      let dataTypes = ['username', 'password']
      if (email.includes('@')) dataTypes.push('email')
      if (leak.ipAddress) dataTypes.push('ip_address')
      if (leak.hostname) dataTypes.push('hostname')
      if (leak.osInfo) dataTypes.push('system_info')

      // Determinar fuente basada en el tipo
      let source = 'Unknown'
      switch (leak.type) {
        case 'combolist':
          source = 'Combo-Lists'
          break
        case 'stealer':
          source = 'Stealer-Logs'
          break
        default:
          source = 'Data-Breach'
      }

      return {
        id: index + 1,
        email: email,
        password: leak.password || 'N/A',
        hashType: 'Plain', // Los datos parecen ser en texto plano
        domain: domain,
        source: source,
        dateFound: leak.log_date,
        dataTypes: dataTypes,
        risk: risk,
        status: 'New', // Todos los nuevos datos como "New"
        // Datos adicionales para stealer logs
        ...(leak.type === 'stealer' && {
          hostname: leak.hostname,
          ipAddress: leak.ipAddress,
          osInfo: leak.osInfo,
          countryCode: leak.countryCode
        }),
        originalUrl: leak.url
      }
    })

    return leaks.sort((a, b) => new Date(b.dateFound) - new Date(a.dateFound))
  }

  const allLeaks = ref(generateRealLeaks())

  // Computed para paginación
  const paginatedLeaks = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return allLeaks.value.slice(start, end)
  })

  const totalPages = computed(() => Math.ceil(allLeaks.value.length / pageSize.value))

  // Computed para KPIs
  const kpis = computed(() => {
    const totalLeaks = allLeaks.value.length
    const uniqueCredentials = new Set(allLeaks.value.map(leak => leak.email)).size
    const reuseDetected = totalLeaks - uniqueCredentials
    const activeSources = new Set(allLeaks.value.map(leak => leak.source)).size
    const lastSync = allLeaks.value.length > 0 ? allLeaks.value[0].dateFound : ''

    return {
      totalLeaks: totalLeaks.toLocaleString(),
      uniqueCredentials: uniqueCredentials.toLocaleString(),
      reuseDetected: reuseDetected.toLocaleString(),
      activeSources: activeSources.toString(),
      lastSync: lastSync
    }
  })

  // Computed para analytics
  const analytics = computed(() => {
    // Most Affected Domains
    const domainCounts = {}
    allLeaks.value.forEach(leak => {
      domainCounts[leak.domain] = (domainCounts[leak.domain] || 0) + 1
    })
    const mostAffectedDomains = Object.entries(domainCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([domain, count]) => ({ domain, count }))

    // Top Domains for charts (top 3)
    const topDomains = Object.entries(domainCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([domain, count]) => ({ domain, count }))

    // Monthly Trends - Dinámico basado en datos reales
    const monthlyTrends = (() => {
      const monthCounts = {}
      const monthNames = {
        0: 'Ene', 1: 'Feb', 2: 'Mar', 3: 'Abr', 4: 'May', 5: 'Jun',
        6: 'Jul', 7: 'Ago', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dic'
      }

      // Contar leaks por mes
      allLeaks.value.forEach(leak => {
        const date = new Date(leak.dateFound)
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`
        const monthLabel = monthNames[date.getMonth()]
        
        if (!monthCounts[monthKey]) {
          monthCounts[monthKey] = {
            month: monthLabel,
            year: date.getFullYear(),
            count: 0,
            fullDate: date
          }
        }
        monthCounts[monthKey].count++
      })

      // Ordenar por fecha y retornar solo los últimos 5 meses
      return Object.values(monthCounts)
        .sort((a, b) => a.fullDate - b.fullDate)
        .slice(-5)
        .map(({ month, count }) => ({ month, count }))
    })()

    // Weekly Leak Trends (últimas 5 semanas)
    const weeklyTrends = []
    for (let i = 4; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - (i * 7))
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)

      const weekLeaks = allLeaks.value.filter(leak => {
        const leakDate = new Date(leak.dateFound)
        return leakDate >= weekStart && leakDate <= weekEnd
      }).length

      weeklyTrends.push({
        week: `W${5-i}`,
        count: weekLeaks
      })
    }

    // Data Type Distribution
    const dataTypeCounts = {}
    allLeaks.value.forEach(leak => {
      leak.dataTypes.forEach(type => {
        dataTypeCounts[type] = (dataTypeCounts[type] || 0) + 1
      })
    })

    const dataTypeDistribution = Object.entries(dataTypeCounts)
      .map(([type, count]) => ({ 
        type, 
        count, 
        percentage: ((count / allLeaks.value.length) * 100).toFixed(1)
      }))

    return {
      mostAffectedDomains,
      topDomains,
      monthlyTrends,
      weeklyTrends,
      dataTypeDistribution
    }
  })

  // Funciones de paginación
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  // Función para buscar leak por ID
  const getLeakById = (leakId) => {
    return allLeaks.value.find(leak => leak.id === parseInt(leakId))
  }

  // Función para cargar leaks (simula una carga async)
  const loadLeaks = async () => {
    loading.value = true
    try {
      // Simular delay de carga
      await new Promise(resolve => setTimeout(resolve, 100))
      allLeaks.value = generateRealLeaks()
    } catch (error) {
      console.error('Error loading leaks:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    // Estado
    loading,
    currentPage,
    pageSize,
    allLeaks,
    
    // Computed
    paginatedLeaks,
    totalPages,
    kpis,
    analytics,
    
    // Funciones
    goToPage,
    nextPage,
    previousPage,
    getLeakById,
    loadLeaks
  }
})
