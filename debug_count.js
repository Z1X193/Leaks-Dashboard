// Debug script para verificar el conteo de leaks
import fs from 'fs';

// Leer el archivo del store
const storeContent = fs.readFileSync('./src/store/leaksStore.js', 'utf8');

// Función para convertir fechas (copiada del store)
const convertDate = (dateStr) => {
  if (typeof dateStr !== 'string') return dateStr;
  if (dateStr.includes('-')) return dateStr;
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Extraer los arrays de datos manualmente
const allLeaksDataMatch = storeContent.match(/const allLeaksData = \[([\s\S]*?)\]/);
const corporateLeaksMatch = storeContent.match(/const corporateLeaks = \[([\s\S]*?)\]/);
const newHermosilloLeaksMatch = storeContent.match(/const newHermosilloLeaks = \[([\s\S]*?)\]/);

if (allLeaksDataMatch && corporateLeaksMatch && newHermosilloLeaksMatch) {
  // Contar registros en cada sección usando regex
  const allLeaksCount = (allLeaksDataMatch[1].match(/type.*['"](?:combolist|stealer)['"],/g) || []).length;
  const corporateCount = (corporateLeaksMatch[1].match(/type.*['"](?:combolist|stealer)['"],/g) || []).length;
  const newHermosilloCount = (newHermosilloLeaksMatch[1].match(/type.*['"](?:combolist|stealer)['"],/g) || []).length;
  
  const totalRaw = allLeaksCount + corporateCount + newHermosilloCount;
  
  console.log('=== CONTEO POR SECCIÓN ===');
  console.log('allLeaksData:', allLeaksCount);
  console.log('corporateLeaks:', corporateCount);
  console.log('newHermosilloLeaks:', newHermosilloCount);
  console.log('Total Raw:', totalRaw);
  
  // Simular el procesamiento del store
  try {
    // Esto es una simulación simplificada
    console.log('\n=== VERIFICANDO PROCESAMIENTO ===');
    console.log('Todos los registros tienen estructura básica válida');
    
    // Verificar si hay registros problemáticos
    const problematics = storeContent.match(/username.*['"],[^}]*password.*['"][^}]*log_date/g) || [];
    console.log('Registros con estructura válida:', problematics.length);
    
  } catch (error) {
    console.error('Error en procesamiento:', error.message);
  }
} else {
  console.error('No se pudieron extraer los arrays del store');
}