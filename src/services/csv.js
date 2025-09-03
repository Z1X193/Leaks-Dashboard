import { useOrgStore } from '@/store/orgStore'
import dayjs from 'dayjs'

export const exportLeaksToCSV = (orgId, rows) => {
  const orgStore = useOrgStore()
  const org = orgStore.orgs.find(o => o.id === orgId)
  
  if (!rows || rows.length === 0) {
    console.warn('No data to export')
    return
  }

  // Headers del CSV
  const headers = [
    'Organization',
    'Email/User',
    'Password',
    'Hash Type',
    'Domain',
    'Source',
    'Date Found',
    'Data Types',
    'Risk Level',
    'Status'
  ]

  // Convertir datos a filas CSV
  const csvRows = rows.map(leak => [
    org?.name || 'Unknown',
    leak.emailOrUser,
    leak.password.masked,
    leak.password.hashType,
    leak.domain,
    leak.source,
    dayjs(leak.dateFound).format('YYYY-MM-DD HH:mm:ss'),
    leak.dataTypes.join('; '),
    leak.risk,
    leak.status
  ])

  // Crear contenido CSV
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n')

  // Crear y descargar archivo
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `leak-intelligence-${orgId}-${dayjs().format('YYYY-MM-DD')}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Función simplificada para el nuevo componente
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    console.warn('No data to export')
    return
  }

  // Headers del CSV
  const headers = [
    'Email/User',
    'Password',
    'Hash Type',
    'Domain',
    'Source',
    'Date Found',
    'Data Types',
    'Risk',
    'Status'
  ]

  // Convertir datos a filas CSV
  const csvRows = [
    headers.join(','),
    ...data.map(leak => [
      `"${leak.email}"`,
      `"${leak.password}"`,
      `"${leak.hashType}"`,
      `"${leak.domain}"`,
      `"${leak.source}"`,
      `"${leak.dateFound}"`,
      `"${leak.dataTypes ? leak.dataTypes.join('; ') : ''}"`,
      `"${leak.risk}"`,
      `"${leak.status}"`
    ].join(','))
  ]

  // Crear y descargar archivo
  const csvContent = csvRows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
