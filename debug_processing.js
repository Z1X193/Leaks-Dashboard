// Debug script para verificar la lógica de procesamiento de leaks
import fs from 'fs';

// Función para convertir fechas (copiada del store)
const convertDate = (dateStr) => {
  if (!dateStr) return dateStr;
  if (dateStr.includes('-') && dateStr.length === 10) return dateStr;
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Simulación de la función generateRealLeaks
console.log('=== DEBUGGING LEAK PROCESSING ===');

// Leer el archivo del store
const storeContent = fs.readFileSync('./src/store/leaksStore.js', 'utf8');

// Extraer los arrays manualmente para simular el procesamiento
console.log('1. Verificando arrays...');

// Contar registros por regex similar a como lo hace el store
const allMatches = storeContent.match(/{\s*type:\s*['"](?:combolist|stealer)['"][^}]+}/g) || [];
console.log(`2. Total registros encontrados por regex: ${allMatches.length}`);

// Verificar si hay registros con problemas de formato
let problemRecords = 0;
allMatches.forEach((match, index) => {
  try {
    // Verificar si el registro tiene estructura básica válida
    if (!match.includes('username') || !match.includes('password') || !match.includes('log_date')) {
      console.log(`Registro problemático #${index + 1}: ${match.substring(0, 100)}...`);
      problemRecords++;
    }
  } catch (error) {
    console.log(`Error procesando registro #${index + 1}: ${error.message}`);
    problemRecords++;
  }
});

console.log(`3. Registros con problemas: ${problemRecords}`);
console.log(`4. Registros válidos esperados: ${allMatches.length - problemRecords}`);

// Verificar si hay convertDate() calls problemáticos
const convertDateCalls = (storeContent.match(/convertDate\([^)]+\)/g) || []).length;
console.log(`5. Llamadas a convertDate(): ${convertDateCalls}`);

console.log('=== FIN DEBUG ===');