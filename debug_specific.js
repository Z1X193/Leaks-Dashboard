// Debug específico para detectar dónde se pierden los registros
import fs from 'fs';

console.log('=== DEBUG ESPECÍFICO DE PROCESAMIENTO ===');

// Leer el archivo del store
const storeContent = fs.readFileSync('./src/store/leaksStore.js', 'utf8');

// Extraer cada sección manualmente
console.log('1. Extrayendo secciones...');

// Función convertDate simulada
const convertDate = (dateStr) => {
  if (!dateStr) return dateStr;
  if (dateStr.includes('-') && dateStr.length === 10) return dateStr;
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Simular la estructura del store
const allLeaksDataPattern = /const allLeaksData = \[([\s\S]*?)\]\s*(?:\/\/|const)/;
const corporateLeaksPattern = /const corporateLeaks = \[([\s\S]*?)\]\s*(?:\/\/|const)/;
const newHermosilloLeaksPattern = /const newHermosilloLeaks = \[([\s\S]*?)\]\s*const allRawLeaks/;

const allLeaksMatch = storeContent.match(allLeaksDataPattern);
const corporateMatch = storeContent.match(corporateLeaksPattern);
const newHermosilloMatch = storeContent.match(newHermosilloLeaksPattern);

if (allLeaksMatch && corporateMatch && newHermosilloMatch) {
  // Contar registros por sección
  const allLeaksCount = (allLeaksMatch[1].match(/{\s*type:/g) || []).length;
  const corporateCount = (corporateMatch[1].match(/{\s*type:/g) || []).length;
  const newHermosilloCount = (newHermosilloMatch[1].match(/{\s*type:/g) || []).length;
  
  console.log(`2. allLeaksData: ${allLeaksCount} registros`);
  console.log(`3. corporateLeaks: ${corporateCount} registros`);
  console.log(`4. newHermosilloLeaks: ${newHermosilloCount} registros`);
  console.log(`5. Total combinado: ${allLeaksCount + corporateCount + newHermosilloCount}`);
  
  // Verificar si hay registros problemáticos en el procesamiento
  console.log('\n6. Verificando registros problemáticos...');
  
  // Buscar registros con datos faltantes o problemáticos
  const problematicRecords = [];
  
  // Todos los registros combinados
  const allRegistros = [allLeaksMatch[1], corporateMatch[1], newHermosilloMatch[1]].join('');
  const registroMatches = allRegistros.match(/{\s*type:[^}]+}/g) || [];
  
  registroMatches.forEach((registro, index) => {
    // Verificar si faltan campos críticos
    if (!registro.includes('username') || !registro.includes('password') || !registro.includes('log_date')) {
      problematicRecords.push({
        index: index + 1,
        issue: 'Campos faltantes',
        registro: registro.substring(0, 100)
      });
    }
    
    // Verificar usernames/passwords vacíos o nulos
    if (registro.includes("username: ''") || registro.includes('username: ""') || 
        registro.includes("password: ''") || registro.includes('password: ""')) {
      problematicRecords.push({
        index: index + 1,
        issue: 'Datos vacíos',
        registro: registro.substring(0, 100)
      });
    }
    
    // Verificar URLs problemáticas
    if (!registro.includes('url:') || registro.includes("url: ''") || registro.includes('url: ""')) {
      problematicRecords.push({
        index: index + 1,
        issue: 'URL faltante',
        registro: registro.substring(0, 100)
      });
    }
  });
  
  console.log(`7. Registros problemáticos encontrados: ${problematicRecords.length}`);
  
  if (problematicRecords.length > 0) {
    console.log('\n=== REGISTROS PROBLEMÁTICOS ===');
    problematicRecords.forEach(record => {
      console.log(`Registro #${record.index} - ${record.issue}:`);
      console.log(`  ${record.registro}...`);
    });
  }
  
  console.log(`\n8. Registros válidos esperados: ${registroMatches.length - problematicRecords.length}`);
  
} else {
  console.error('No se pudieron extraer todas las secciones del store');
  console.log('allLeaks:', !!allLeaksMatch);
  console.log('corporate:', !!corporateMatch);
  console.log('newHermosillo:', !!newHermosilloMatch);
}