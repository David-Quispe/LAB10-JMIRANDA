import { readFileSync } from 'node:fs';
const report=JSON.parse(readFileSync(new URL('../evidencias/resultados-pruebas.json',import.meta.url),'utf8'));
console.log('\nBODEGA ATELIER | RESULTADO GUARDADO DE npm test\n');
console.log(`Fecha: ${new Date(report.stats.startTime).toLocaleString('es-PE',{timeZone:'America/Lima'})}`);
console.log(`Aprobadas: ${report.stats.expected} | Fallidas: ${report.stats.unexpected} | Omitidas: ${report.stats.skipped}`);
console.log(`Duracion: ${(report.stats.duration/1000).toFixed(1)} segundos\n`);
for(const suite of report.suites) {
 let passed=0,failed=0;
 const walk=s=>{for(const spec of s.specs??[]) for(const t of spec.tests??[]) { if(t.status==='expected')passed++;else failed++; }for(const child of s.suites??[])walk(child);};
 walk(suite);console.log(`${suite.title}: ${passed} aprobadas, ${failed} fallidas`);
}
console.log('\nFuente: evidencias/resultados-pruebas.json');
console.log('Repetir las pruebas: npm test');
if(report.stats.unexpected)process.exitCode=1;

