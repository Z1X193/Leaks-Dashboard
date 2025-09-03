import { RISK_LEVELS, LEAK_STATUSES, DATA_TYPES, HASH_TYPES } from '@/types/leaks'

// Datos mock para Fiscalía Hermosillo
const hermosilloPosts = [
  {
    id: '1',
    orgId: 'fiscalia-hermosillo',
    emailOrUser: 'john.doe@techcorp.com',
    password: { 
      masked: 'P@ssw0rd123!', 
      plain: 'P@ssw0rd123!', 
      hashType: HASH_TYPES.PLAIN 
    },
    domain: 'hermosillo.gob.mx',
    source: 'DataBreach2024',
    dateFound: '2024-01-15T00:00:00Z',
    dataTypes: [DATA_TYPES.EMAIL, DATA_TYPES.PASSWORD, DATA_TYPES.PHONE],
    risk: RISK_LEVELS.HIGH,
    status: LEAK_STATUSES.NEW
  },
  {
    id: '2',
    orgId: 'fiscalia-hermosillo',
    emailOrUser: 'sarah.wilson@techcorp.com',
    password: { 
      masked: '••••••••••', 
      plain: 'sha256password', 
      hashType: HASH_TYPES.SHA256 
    },
    domain: 'sistemas.hermosillo.gob.mx',
    source: 'DarkWebLeak',
    dateFound: '2024-01-14T00:00:00Z',
    dataTypes: [DATA_TYPES.EMAIL, DATA_TYPES.PASSWORD],
    risk: RISK_LEVELS.MEDIUM,
    status: LEAK_STATUSES.VALIDATED
  },
  {
    id: '3',
    orgId: 'fiscalia-hermosillo',
    emailOrUser: 'admin@hermosillo.gob.mx',
    password: { 
      masked: '••••••••••', 
      plain: 'admin123', 
      hashType: HASH_TYPES.PLAIN 
    },
    domain: 'hermosillo.gob.mx',
    source: 'DataBreach2024',
    dateFound: '2024-01-13T00:00:00Z',
    dataTypes: [DATA_TYPES.EMAIL, DATA_TYPES.PASSWORD, DATA_TYPES.ADDRESS],
    risk: RISK_LEVELS.CRITICAL,
    status: LEAK_STATUSES.NEW
  }
]

// Datos mock para Fiscalía Aguascalientes
const aguascalientesLeaks = [
  {
    id: '4',
    orgId: 'fiscalia-ags',
    emailOrUser: 'director@aguascalientes.gob.mx',
    password: { 
      masked: '••••••••••', 
      plain: 'director2024', 
      hashType: HASH_TYPES.BCRYPT 
    },
    domain: 'aguascalientes.gob.mx',
    source: 'SecurityIncident2024',
    dateFound: '2024-01-12T00:00:00Z',
    dataTypes: [DATA_TYPES.EMAIL, DATA_TYPES.PASSWORD],
    risk: RISK_LEVELS.HIGH,
    status: LEAK_STATUSES.NEW
  },
  {
    id: '5',
    orgId: 'fiscalia-ags',
    emailOrUser: 'legal@fiscalia.aguascalientes.gob.mx',
    password: { 
      masked: '••••••••••', 
      plain: 'legalpass', 
      hashType: HASH_TYPES.PLAIN 
    },
    domain: 'fiscalia.aguascalientes.gob.mx',
    source: 'DataBreach2024',
    dateFound: '2024-01-11T00:00:00Z',
    dataTypes: [DATA_TYPES.EMAIL, DATA_TYPES.PASSWORD, DATA_TYPES.PHONE],
    risk: RISK_LEVELS.MEDIUM,
    status: LEAK_STATUSES.VALIDATED
  }
]

const allLeaks = {
  'fiscalia-hermosillo': hermosilloPosts,
  'fiscalia-ags': aguascalientesLeaks
}

export const getKpis = async (orgId, filters = {}) => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const leaks = allLeaks[orgId] || []
  
  return {
    totalLeaks: leaks.length,
    uniqueCreds: leaks.length, // Simplificado
    reuseDetected: Math.floor(leaks.length * 0.3),
    activeSources: new Set(leaks.map(leak => leak.source)).size
  }
}

export const getLeaks = async (orgId, pagination = { page: 1, size: 10 }, sort = {}, filters = {}, search = '') => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  let leaks = allLeaks[orgId] || []
  
  // Aplicar búsqueda
  if (search) {
    leaks = leaks.filter(leak => 
      leak.emailOrUser.toLowerCase().includes(search.toLowerCase()) ||
      leak.domain.toLowerCase().includes(search.toLowerCase()) ||
      leak.source.toLowerCase().includes(search.toLowerCase())
    )
  }
  
  // Aplicar filtros
  if (filters.risk) {
    leaks = leaks.filter(leak => leak.risk === filters.risk)
  }
  if (filters.status) {
    leaks = leaks.filter(leak => leak.status === filters.status)
  }
  if (filters.domain) {
    leaks = leaks.filter(leak => leak.domain.includes(filters.domain))
  }
  
  // Paginación
  const start = (pagination.page - 1) * pagination.size
  const end = start + pagination.size
  const paginatedLeaks = leaks.slice(start, end)
  
  return {
    data: paginatedLeaks,
    total: leaks.length,
    page: pagination.page,
    size: pagination.size
  }
}

export const getAnalytics = async (orgId, filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 350))
  
  const leaks = allLeaks[orgId] || []
  
  // Most Affected Domains
  const domainCounts = {}
  leaks.forEach(leak => {
    domainCounts[leak.domain] = (domainCounts[leak.domain] || 0) + 1
  })
  
  const sortedDomains = Object.entries(domainCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
  
  // Weekly Trends (datos reales basados en los leaks existentes)
  const weeklyTrend = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
    values: orgId === 'fiscalia-hermosillo' 
      ? [1, 1, 2, 1, 0, 1] // Datos reales basados en los 3 leaks de Hermosillo
      : [1, 1, 0, 1, 0, 0]  // Datos reales basados en los 2 leaks de Aguascalientes
  }
  
  // Data Type Distribution - contar todos los tipos de datos
  const dataTypeCounts = {}
  leaks.forEach(leak => {
    leak.dataTypes.forEach(type => {
      dataTypeCounts[type] = (dataTypeCounts[type] || 0) + 1
    })
  })
  
  return {
    domainsBar: {
      labels: sortedDomains.map(([domain]) => domain),
      values: sortedDomains.map(([, count]) => count)
    },
    weeklyTrend,
    dataTypeDonut: {
      labels: Object.keys(dataTypeCounts),
      values: Object.values(dataTypeCounts)
    }
  }
}

export const getLastSync = async (orgId) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  return '2024-01-15 14:32:15'
}

export const getLeakById = async (orgId, leakId) => {
  await new Promise(resolve => setTimeout(resolve, 250))
  
  const leaks = allLeaks[orgId] || []
  return leaks.find(leak => leak.id === leakId) || null
}
