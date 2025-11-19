import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLeaksStore = defineStore('leaks', () => {
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)

  // Función para convertir fecha DD/MM/YYYY a YYYY-MM-DD (para fechas manuales)
  const convertDate = (dateStr) => {
    if (!dateStr) return new Date().toISOString().split('T')[0]
    // Si ya está en formato YYYY-MM-DD, devolverla como está
    if (dateStr.includes('-') && dateStr.length === 10) return dateStr
    // Si está en formato DD/MM/YYYY, convertir
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  // Datos reales completos de leaks de Hermosillo
  const generateRealLeaks = () => {
    // Dataset COMPLETO - Datos originales Consumer + nuevos Catastro
    const allLeaksData = [
      // ======= NUEVOS DATOS catastro.gob.mx__Consumer.csv (MARZO-SEPTIEMBRE 2025) =======
      { type: 'combolist', url: 'https://catastro.gob.mx', username: 'usuario', password: 'juezprimerocivil', log_date: '2025-03-07' },
      { type: 'combolist', url: 'http://www.catastro.gob.mx/', username: 'Iaiduma', password: 'sergio8908', log_date: '2025-03-27' },
      { type: 'combolist', url: 'http://catastro.gob.mx', username: 'Usuario', password: 'Contrasena', log_date: '2025-04-07' },
      { type: 'combolist', url: 'https://catastro.gob.mx/index.asp', username: 'Usuario', password: 'juezprimerocivil', log_date: '2025-05-05' },
      { type: 'combolist', url: 'http://www.catastro.gob.mx/', username: 'Usuario', password: 'ContraseГ±a', log_date: '2025-07-24' },
      { type: 'combolist', url: 'http://catastro.gob.mx', username: 'admin', password: 'Altadore2019', log_date: '2025-07-27' },
      { type: 'combolist', url: 'http://www.catastro.gob.mx', username: 'Usuario', password: 'Contraseña', log_date: '2025-09-20' },
      
      // ======= DATOS ORIGINALES Consumer_hermosillo.gob.mx.csv (AGOSTO 1-15) =======
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
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:888/ServicioTemporal/Proyectos8008/servicios/Inicio.aspx', username: 'remj880888az8', password: 'Exodo*8008', log_date: '2025-08-02' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/servicios/', username: 'luaresoj781@gmail.com', password: 'pepe7812', log_date: '2025-08-03' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:555/ServicioTemporal/Proyectos2228/servicios/Inicio.aspx', username: 'froilanramirez75@gmail.com', password: 'Coatza2727+', log_date: '2025-08-03' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'CKN140929897', password: 'cfva1938', log_date: '2025-08-04' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'HAdjitikso7', password: 'HEROICGAMER2', log_date: '2025-08-04' },
      { type: 'combolist', url: 'http://et.hermosillo.gob.mx', username: '2345', password: '37855420', log_date: '2025-08-06' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'Focm540814T9A', password: 'Alex1974', log_date: '2025-08-06' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:888/Serviciotemporal/Proyectos8008/servicios/Inicio.aspx', username: 'lrf.rufl@gmail.com', password: 'Soporte80888988', log_date: '2025-08-07' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'GOFC751029MVA', password: 'CESAR', log_date: '2025-08-07' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'eucr780828iua', password: 'Agustin78', log_date: '2025-08-07' },
      { type: 'combolist', url: 'http://infracciones.hermosillo.gob.mx/', username: 'JCAZAREZ', password: 'InfraccionesHmo21', log_date: '2025-08-09' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'ebarraza23@gmail.com', password: 'Sye170723*', log_date: '2025-08-09' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'sergiosmg812410@gmail.com', password: 'Flema130', log_date: '2025-08-09' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'Zahidmtz01@gmail.com', password: 'reuza01', log_date: '2025-08-09' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'world_i51xeunn', password: 'jpc4k73b', log_date: '2025-08-09' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'GOGE971013@GMAIL.COM', password: '131097Eduardo', log_date: '2025-08-10' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: '6621567807', password: 'TOITA08', log_date: '2025-08-11' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/serviciotemporal/proyectos2008/cuentaunica/registrocuentaunica.aspx', username: 'gladisgdl43@gmail.com', password: 'david2608.', log_date: '2025-08-11' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos4008/servicios/Inicio.aspx', username: 'fernandamarcials48', password: 'ferpa4404', log_date: '2025-08-11' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'gladisgdl43@gmail.com', password: 'David2608.', log_date: '2025-08-12' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'raro.algusto@gmail.com', password: 'hector1978', log_date: '2025-08-12' },
      { type: 'combolist', url: 'http://declaranet.hermosillo.gob.mx:82/', username: 'Muic770615', password: 'calle1234', log_date: '2025-08-12' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'RORA720728IJ4', password: '4263', log_date: '2025-08-13' },
      { type: 'combolist', url: 'https://presupuestocreces.hermosillo.gob.mx/Account/Register', username: 'anaelizabethromero28@gmail.com', password: 'Ana.Romero.28', log_date: '2025-08-13' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/controltramites/login.aspx', username: 'tucasahmo25', password: 'VPHNA7qFBUA95Dr', log_date: '2025-08-13' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'Rosacristinal', password: 'respaldofotos68', log_date: '2025-08-14' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'SEBL860102SYA', password: '3u_Z[5Nyj)6JV4g&m+22', log_date: '2025-08-15' },
      { type: 'combolist', url: 'http://plataformadetransparencia.org.mx/web/guest/inicio', username: 'utm.gabinete@hermosillo.gob.mx', password: 'Cocreacion30', log_date: '2025-08-15' },
      
      // ======= NUEVOS DATOS export_catastro.hermosillo.gob.mx_consumer.csv =======
      // Agosto 2025 (16-31)
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'MOAR870215E64', password: 'soloporego1', log_date: convertDate('16/08/2025') },
      { type: 'combolist', url: 'http://ventanilladigital.hermosillo.gob.mx/portalciudadano/', username: 'MLA240110CW4', password: 'Pekenojuan12#', log_date: convertDate('16/08/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/controltramites/login.aspx', username: 'Diegofm', password: '-@b-s&^FKPg77u_', log_date: convertDate('16/08/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'carlosjaviermzbrr222@gmail.com', password: 'pechodelamina', log_date: convertDate('16/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'goha703083l8', password: 'reyayanami', log_date: convertDate('17/08/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'anaelizabethromero@hotmail.com', password: '42634263', log_date: convertDate('21/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'dinahburrola@hotmail.com', password: 'abr-19', log_date: convertDate('22/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx/entidades/', username: 'dobers@live.com.mx', password: 'iVan007', log_date: convertDate('22/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'hectorhtgm@gmail.com', password: 'ellider1', log_date: convertDate('22/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'UbeeD18F-5G', password: '5BADF6D18F', log_date: convertDate('23/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/servicios/Inicio.aspx', username: 'EURB8406186S7', password: 'humberto3', log_date: convertDate('23/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/serviciotemporal/proyectos2008/servicios/inicio.aspx', username: 'aicj8607132j0', password: 'joelito2013', log_date: convertDate('23/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'froilanramirez75@gmail.com', password: 'Coatza0709+', log_date: convertDate('23/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx/entidades/', username: 'ejemplo', password: '123456', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:333/Serviciotemporal/Proyectos1997/servicios/Inicio.aspx', username: 'COSE7292151N6', password: 'IMCA1919', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:8082/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'ROVV810807Q27', password: 'admin', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'gosy890207496', password: 'goyzueta', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx/entidades/', username: '571263', password: '123456', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'gogj851003uh1', password: '241014jr', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'aucl360606qt2', password: 'adolfo2102@', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:888/Serviciotemporal/Proyectos8008/servicios/Inicio.aspx', username: 'PAAJ880888Q98', password: 'ferpa8808', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'arlenemora8511', password: 'Deam0721.', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://declaranet.hermosillo.gob.mx', username: 'iama670528mia', password: 'SSWTJTGA', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/serviciotemporal/proyectos2008/servicios/inicio.aspx', username: 'altares', password: 'd3nisse', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'Jccs_06@hotmail.com', password: 'jose6237', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: '8082', password: 'BARM8505234B1', log_date: convertDate('25/08/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:555/ServicioTemporal/Proyectos2228/servicios/Inicio.aspx', username: 'froilan.ramirez@rosolutions.com.mx', password: 'Coatza2727+', log_date: convertDate('26/08/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444', username: 'DIGL470806E37', password: 'J#d1i2A3Z', log_date: convertDate('27/08/2025') },
      { type: 'combolist', url: 'http://tramites.hermosillo.gob.mx/tramites/login.aspx', username: 'adriank34@hotmail.com', password: 'fronteras190', log_date: convertDate('28/08/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/servicios/Inicio.aspx', username: 'BUMR590414FBA', password: '3u_Z[5Nyj)6JV4g&m+22', log_date: convertDate('28/08/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PIDJ510319BR1', password: '160352', log_date: convertDate('29/08/2025') },
      { type: 'combolist', url: 'http://presupuestocreces.hermosillo.gob.mx/Account/Login', username: 'ROBLESMARDO@OUTLOOK.ES', password: 'Robles52MN', log_date: convertDate('29/08/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'Sota8503263l9', password: 'warala', log_date: convertDate('29/08/2025') },
      { type: 'combolist', url: 'http://presupuestocreces.hermosillo.gob.mx/Account/Register', username: 'anaelizabethromero28@gmail.com', password: '42634263', log_date: convertDate('29/08/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/controltramites/login.aspx', username: 'MarthaS', password: '69u5t68cEHZQQY', log_date: convertDate('29/08/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'COGF890104AA3', password: 'FABEL', log_date: convertDate('31/08/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'Charly_karacas@hotmail.com', password: 'charly2708', log_date: convertDate('31/08/2025') },
      
      // Septiembre 2025
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'RORA720728IJ4', password: 'Ytodoapulmon38', log_date: convertDate('01/09/2025') },
      { type: 'combolist', url: 'https://presupuestocreces.hermosillo.gob.mx/Account/Register', username: 'anaelizabethromero28@gmail.com', password: 'AnaRomero.28', log_date: convertDate('01/09/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'anaelizabethromero@hotmail.com', password: 'oscarguapo79', log_date: convertDate('01/09/2025') },
      { type: 'combolist', url: 'http://hbus.hermosillo.gob.mx/Hbus/login.php', username: 'themoonmaker@outlook.com', password: 'MiuMikuDesu12334', log_date: convertDate('01/09/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'anaelizabethromero@hotmail.com', password: '4263', log_date: convertDate('01/09/2025') },
      { type: 'combolist', url: 'http://net.hermosillo.gob.mx:82/', username: 'COSE830326', password: 'OMK1L5H5', log_date: convertDate('01/09/2025') },
      { type: 'combolist', url: 'http://declaranet.hermosillo.gob.mx/', username: '2345', password: '37855420', log_date: convertDate('01/09/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/servicios/', username: 'luaresoj78@hotmail.com', password: 'ruDC@i!9', log_date: convertDate('01/09/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'SAAO361224LS2', password: 'Pokemons11@', log_date: convertDate('02/09/2025') },
      { type: 'combolist', url: 'http://presupuestocreces.hermosillo.gob.mx/Account/Login', username: 'guspimdom@hotmail.com', password: 'lokote45', log_date: convertDate('04/09/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'rosa_icela_burruel@hotmail.com', password: '3u_Z[5yj)6JV4g&m+22', log_date: convertDate('05/09/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'ramoncitomorales1', password: 'soloporego1', log_date: convertDate('05/09/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/controltramites/login.aspx', username: 'jl_galan', password: 'Santiago*16', log_date: convertDate('05/09/2025') },
      { type: 'combolist', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'a25313088@uthermosillo.edu.mx', password: 'DIEGOLOCO321', log_date: convertDate('06/09/2025') },
      { type: 'combolist', url: 'https://presupuestocreces.hermosillo.gob.mx/Account/Register', username: 'alex_sierras@hotmail.com', password: 'abc123456', log_date: convertDate('06/09/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'carolina.galc@gmail.com', password: 'Azules5826', log_date: convertDate('08/09/2025') },
      { type: 'combolist', url: 'http://correo.hermosillo.gob.mx/owa/auth/logon.aspx', username: 'mesasupervision', password: 'Cpu2021*1', log_date: convertDate('13/09/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/servicios/Inicio.aspx', username: 'LOMR831207UQ1', password: 'Ti@nAyen51', log_date: convertDate('13/09/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx/controltramites/login.aspx', username: 'imartinez@sinergiaambiental.com', password: 'Sinergia24@', log_date: convertDate('16/09/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/serviciotemporal/proyectos2008/servicios/inicio.aspx', username: 'd.cardenas95', password: 'dIEGOFER89', log_date: convertDate('16/09/2025') },
      { type: 'combolist', url: 'http://declaranet.hermosillo.gob.mx:82/', username: 'cobos.emmanuel@gmail.com', password: '8675309', log_date: convertDate('18/09/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:8082/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'raymundo.urbano@dhmining.com.mx', password: '381257', log_date: convertDate('20/09/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/LCH/Login.aspx', username: 'OPERACIONESGDL', password: 'GREEN2020', log_date: convertDate('23/09/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'SAAO361224LS2', password: 'Pokemons11@', log_date: convertDate('23/09/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'IMC20202', password: '8SKyP939R9', log_date: convertDate('24/09/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'paramedicosuthermosillo@hotmail.com', password: 'paramedicos123', log_date: convertDate('26/09/2025') },
      { type: 'combolist', url: 'https://presupuestocreces.hermosillo.gob.mx/Account/Register', username: 'anaelizabethromero28@gmail.com', password: 'An4r0m3r0.28', log_date: convertDate('26/09/2025') },
      { type: 'combolist', url: 'https://declaranet.hermosillo.gob.mx/', username: 'soma931103tw4', password: 'a930311s', log_date: convertDate('26/09/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'RORA720728IJ4', password: 'Ytodoapulmon38', log_date: convertDate('28/09/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'polo_luisito@hotmail.com', password: 'Santiago_16', log_date: convertDate('30/09/2025') },
      { type: 'combolist', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'ramyfelix39@gmail.com', password: '19972010Lion', log_date: convertDate('30/09/2025') },
      
      // Octubre 2025
      { type: 'combolist', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'RamiroFelix39', password: '19972010Lion', log_date: convertDate('02/10/2025') },
      { type: 'combolist', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'nacho8012', password: '1234567890', log_date: convertDate('02/10/2025') },
      { type: 'combolist', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'KRAIDOU98K9', password: 'guadalupe', log_date: convertDate('02/10/2025') },
      { type: 'combolist', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: '211790418-1@conalepsonora.edu.mx', password: 's.ricardofelix', log_date: convertDate('02/10/2025') },
      { type: 'combolist', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'C20330162', password: '1195', log_date: convertDate('02/10/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/entidades/', username: 'ejemplo', password: '123456', log_date: convertDate('06/10/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx/comunicacion/login.aspx', username: 'admin', password: 'Sector404@', log_date: convertDate('07/10/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'SAHS890220FG4', password: 'chinossh12345', log_date: convertDate('09/10/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'CAMA8907156U4', password: 'hinata7053', log_date: convertDate('09/10/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'CAMA890715', password: 'hinata7053', log_date: convertDate('09/10/2025') },
      { type: 'combolist', url: 'http://declaranet.hermosillo.gob.mx:82/', username: 'CORA971003', password: '22E6BICQ', log_date: convertDate('10/10/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:8082/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'orlando_coronel95@hotmail.com', password: 'rubenzorro95', log_date: convertDate('12/10/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/LCH/Login.aspx', username: 'PAME979971', password: 'pame979971', log_date: convertDate('13/10/2025') },
      { type: 'combolist', url: 'https://hermosillo.gob.mx:8082/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'lefn95@gmail.com', password: '123QWE123', log_date: convertDate('13/10/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'SAHS890220FG4', password: 'chinossh12345', log_date: convertDate('13/10/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx/', username: 'josemanov@gmail.com', password: 'J1H8sZ!L', log_date: convertDate('14/10/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'previales', password: 'hinata7053', log_date: convertDate('14/10/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'SAAO361224LS2', password: 'Olgamaria', log_date: convertDate('16/10/2025') },
      { type: 'combolist', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'kraidou98km', password: 'rica.com122', log_date: convertDate('16/10/2025') },
      { type: 'combolist', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'l20330162@hermosillo.tecnm.mx', password: '19972010Lion', log_date: convertDate('16/10/2025') },
      { type: 'combolist', url: 'https://hermosillo.gob.mx', username: 'oscarcortezleo@gmail.com', password: 'M7XY4WKSQi4gJbT', log_date: convertDate('17/10/2025') },
      { type: 'combolist', url: 'https://infracciones.hermosillo.gob.mx', username: 'JCAZAREZ', password: 'As0qui22', log_date: convertDate('17/10/2025') },
      { type: 'combolist', url: 'https://declaranet.hermosillo.gob.mx', username: 'SOMA931103', password: 'Hamburguesa5', log_date: convertDate('18/10/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx', username: 'acaudillo@selus.mx', password: 'Andrea30', log_date: convertDate('18/10/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'laindilan@gmail.com', password: '2014octubre', log_date: convertDate('18/10/2025') },
      { type: 'combolist', url: 'https://declaranet.hermosillo.gob.mx/index.php', username: 'CORA9710038Z6', password: 'Sanmarino29', log_date: convertDate('19/10/2025') },
      { type: 'combolist', url: 'https://declaranet.hermosillo.gob.mx/index.php', username: 'TAAA841021FG2', password: 'Sanmarino29', log_date: convertDate('19/10/2025') },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'anaelizabethromero@hotmail.com', password: 'oscarguapo79', log_date: convertDate('20/10/2025') },
      { type: 'combolist', url: 'https://hermosillo.gob.mx', username: 'GAGN8204123W1', password: 'WEVAS21', log_date: convertDate('20/10/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: 'fyamariel', log_date: convertDate('21/10/2025') },
      { type: 'combolist', url: 'https://sareh.hermosillo.gob.mx/Tramite', username: 'CONTABILIDADCENTROVISUAL@GMAIL.COM', password: 'Dia270962', log_date: convertDate('21/10/2025') },
      { type: 'combolist', url: 'https://sareh.hermosillo.gob.mx/login', username: 'JEMD960927IH4', password: 'Dia270962', log_date: convertDate('21/10/2025') },
      { type: 'combolist', url: 'https://ventanilladigital.hermosillo.gob.mx/portalciudadano/', username: 'JEMD960927IH4', password: 'Dia270962', log_date: convertDate('21/10/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: '248150Fy', log_date: convertDate('24/10/2025') },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'brittamariel@hotmail.com', password: '248150Fy@', log_date: convertDate('24/10/2025') },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: convertDate('25/10/2025') },
      
      // Stealer logs con datos detallados del sistema
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'pidj510319br1', password: '160352', log_date: convertDate('23/08/2025'), hostname: 'DESKTOP-SFDBQ6H', ipAddress: '177.228.72.214', osInfo: 'Windows 10 Pro (10.0.18363) x64', malwarePath: 'C:\\Users\\martha\\AppData\\Local\\Temp\\69732\\Vt.pif' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx/LCH/Login.aspx', username: 'operacionesgdl', password: 'GREEN2020', log_date: convertDate('30/08/2025'), hostname: 'DESKTOP-L14ADUD', ipAddress: '189.163.24.229', osInfo: 'Windows 11 24H2 build 26100 (64 Bit)', countryCode: 'MX' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'cama8907156u4', password: 'hinata7053', log_date: convertDate('10/09/2025'), hostname: 'CHP', ipAddress: '38.94.68.14', osInfo: 'Windows 10 Home Single Language (10.0.19045) x64', malwarePath: 'C:\\WINDOWS\\SysWOW64\\explorer.exe' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'previales', password: 'hinata7053', log_date: convertDate('10/09/2025'), hostname: 'CHP', ipAddress: '38.94.68.14', osInfo: 'Windows 10 Home Single Language (10.0.19045) x64', malwarePath: 'C:\\WINDOWS\\SysWOW64\\explorer.exe' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'cama890715', password: 'hinata7053', log_date: convertDate('10/09/2025'), hostname: 'CHP', ipAddress: '38.94.68.14', osInfo: 'Windows 10 Home Single Language (10.0.19045) x64', malwarePath: 'C:\\WINDOWS\\SysWOW64\\explorer.exe' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'rora720728ij4', password: '4263', log_date: convertDate('30/09/2025'), hostname: 'AQ2Y-D8VE-ARQX-', ipAddress: '177.228.73.85', osInfo: 'Windows 10', malwarePath: 'C:\\Users\\Ana Gabriel\\AppData\\Local\\Temp\\Rar$EXb17308.32215.rartemp\\Mod Menu V5.80\\Loader.exe', countryCode: 'MX' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx/controltramites/login.aspx', username: 'rohegi58', password: 'veneno58', log_date: convertDate('18/10/2025'), hostname: 'DESKTOP-PJ1QIDO', ipAddress: '187.188.34.162', osInfo: 'Windows 11', antivirus: 'Disabled', malwarePath: 'C:\\Users\\Roberto Hernandez\\AppData\\Local\\BioSecure Dynamics\\BioScan.bat', countryCode: 'MX' },
      { type: 'stealer', url: 'https://ventanilladigital.hermosillo.gob.mx/portalciudadano/', username: 'jemd960927ih4', password: 'Dia270962', log_date: convertDate('21/10/2025'), ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/login', username: 'jemd960927ih4', password: 'Dia270962', log_date: convertDate('21/10/2025'), ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'ramyfelix39@gmail.com', password: '19972010Lion', log_date: convertDate('28/09/2025'), hostname: 'LAPTOP-KR2RRA1I', ipAddress: '177.240.58.90', osInfo: 'Windows 10 22H2 build 19045 (64 Bit)', countryCode: 'MX' },
      { type: 'stealer', url: 'https://presupuestocreces.hermosillo.gob.mx/Account/Register', username: 'anaelizabethromero28@gmail.com', password: 'Ana.Romero.28', log_date: convertDate('30/09/2025'), hostname: 'AQ2Y-D8VE-ARQX-', ipAddress: '177.228.73.85', osInfo: 'Windows 10', malwarePath: 'C:\\Users\\Ana Gabriel\\AppData\\Local\\Temp\\Rar$EXb17308.32215.rartemp\\Mod Menu V5.80\\Loader.exe', countryCode: 'MX' },
      { type: 'stealer', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'ramyfelix39@gmail.com', password: '19972010Lion', log_date: convertDate('01/10/2025'), hostname: 'LAPTOP-KR2RRA1I', ipAddress: '177.240.58.90', osInfo: 'Windows 10 22H2 build 19045 (64 Bit)', countryCode: 'MX' },
      { type: 'stealer', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'ramyfelix39@gmail.com', password: '19972010Lion', log_date: convertDate('02/10/2025'), hostname: 'LAPTOP-KR2RRA1I', ipAddress: '177.240.58.90', osInfo: 'Windows 10 22H2 build 19045 (64 Bit)', countryCode: 'MX' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/Tramite', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: convertDate('21/10/2025'), ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: convertDate('21/10/2025'), ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://presupuestocreces.hermosillo.gob.mx/Account/Login', username: 'guspimdom@hotmail.com', password: 'lokote45', log_date: convertDate('23/08/2025'), hostname: 'DESKTOP-SFDBQ6H', ipAddress: '177.228.72.214', osInfo: 'Windows 10 Pro (10.0.18363) x64', malwarePath: 'C:\\Users\\martha\\AppData\\Local\\Temp\\69732\\Vt.pif' },
      { type: 'stealer', url: 'https://presupuestocreces.hermosillo.gob.mx/Account/Register', username: 'alex_sierras@hotmail.com', password: 'abc123456', log_date: convertDate('23/08/2025'), hostname: 'DESKTOP-SFDBQ6H', ipAddress: '177.228.72.214', osInfo: 'Windows 10 Pro (10.0.18363) x64', malwarePath: 'C:\\Users\\martha\\AppData\\Local\\Temp\\69732\\Vt.pif' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'acaudillo@selus.mx', password: 'Andrea30', log_date: convertDate('18/10/2025'), hostname: 'CONTADOR', ipAddress: '187.251.110.236', osInfo: 'Microsoft Windows 11 Home Single Language' },
      { type: 'stealer', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'a25313088@uthermosillo.edu.mx', password: 'DIEGOLOCO321', log_date: convertDate('02/09/2025') },
      { type: 'stealer', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'a25313088@uthermosillo.edu.mx', password: 'DIEGOLOCO321', log_date: convertDate('07/09/2025') }
    ]

    // Datos del CSV Corporativo adicional
    const corporateLeaks = [
      { type: 'combolist', url: 'http://tramites.hermosillo.gob.mx:82/tramites/register.aspx', username: 'corporativo.test1@hermosillo.gob.mx', password: 'Corp2024!', log_date: '2025-11-15' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx/sistemas/', username: 'admin.sistemas@hermosillo.gob.mx', password: 'SisAdmin2025', log_date: '2025-11-16' }
    ]

    // ======= NUEVOS DATOS catastro.hermosillo.gob.mx__Consumer.csv (OCTUBRE-NOVIEMBRE 2025) =======
    const newHermosilloLeaks = [
      // Octubre 2025
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-10-25' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx', username: '444/ServicioTemporal/Proyectos2008/servicios/Inicio.aspxLOMR831207UQ1', password: 'Ti@nAyen51', log_date: '2025-10-25' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'CAMA8907156U4', password: 'hinata7053', log_date: '2025-10-28' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: '24815', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos200', username: 'PEFB811229QF8', password: '248150Fy@', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229Q', password: '248150Fy@', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB81', password: '248150Fy@', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB', password: '248150Fy@', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'brittama', password: '248150Fy@', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: 'fyam', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF', password: '248150Fy@', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'brittamariel@hotmail.com', password: '248150', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: '248', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: 'fyamarie', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: '24', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'b', password: '248150Fy@', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'britta', password: '248150Fy@', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'brittam', password: '248150Fy@', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://correo.hermosillo.gob.mx', username: 'asoqui', password: '137913', log_date: '2025-10-29' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/serviciotemporal/proyectos2008/cuentaunica/registrocuentaunica.aspx', username: 'contabilidadcentrovisual@gmail.com', password: 'Aplazo@123', log_date: '2025-10-30' },
      { type: 'combolist', url: 'http://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'rochamail13@gmail.com', password: 'mpLC/Fer1', log_date: '2025-10-31' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/controltramites/login.aspx', username: 'Rohegi58', password: 'veneno58', log_date: '2025-10-31' },
      
      // Noviembre 2025
      { type: 'combolist', url: 'https://hermosillo.gob.mx', username: '444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', password: 'HSJ040622G70|', log_date: '2025-11-01' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'MAEA6303138A8', password: 'alel6303', log_date: '2025-11-01' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'FIGJ760206NLA', password: 'anadaniela', log_date: '2025-11-04' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx/portaltransparencia/gabinete.aspx', username: 'ramonhernandezalmada@hotmail.com', password: '3h_tzfO1', log_date: '2025-11-05' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'P', password: 'fyamariel', log_date: '2025-11-05' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB8', password: '248150Fy@', log_date: '2025-11-05' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229', password: '248150Fy@', log_date: '2025-11-06' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB8', password: 'fyamariel', log_date: '2025-11-06' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'brittamariel@hotmail.com', password: '24', log_date: '2025-11-06' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: '248150', log_date: '2025-11-06' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEF', password: 'fyamariel', log_date: '2025-11-06' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'brittamariel@hotmail.com', password: '2481', log_date: '2025-11-07' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: '2', log_date: '2025-11-07' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'dobers.mx', password: 'iVan007', log_date: '2025-11-09' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'brittamariel@hotmail.com', password: '24815', log_date: '2025-11-09' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PE', password: 'fyamariel', log_date: '2025-11-09' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: '248150F', log_date: '2025-11-09' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx', username: 'BUMR590414FBA', password: '3u_Z[5yj)6JV4g&m+22', log_date: '2025-11-12' },
      
      // Stealer logs recientes - Octubre/Noviembre 2025
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/servicios/Inicio.aspx', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-10-29', ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://ventanilladigital.hermosillo.gob.mx/portalciudadano/', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-10-29', ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/login', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-10-29', ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/Tramite', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-10-29', ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-10-29', ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/servicios/Inicio.aspx', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-10-31', ipAddress: '189.173.52.78', antivirus: 'Windows Defender, Avast Antivirus' },
      { type: 'stealer', url: 'https://ventanilladigital.hermosillo.gob.mx/portalciudadano/', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-10-31', ipAddress: '189.173.52.78', antivirus: 'Windows Defender, Avast Antivirus' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/login', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-10-31', ipAddress: '189.173.52.78', antivirus: 'Windows Defender, Avast Antivirus' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/Tramite', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-10-31', ipAddress: '189.173.52.78', antivirus: 'Windows Defender, Avast Antivirus' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-10-31', ipAddress: '189.173.52.78', antivirus: 'Windows Defender, Avast Antivirus' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/servicios/Inicio.aspx', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-11-02', ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://ventanilladigital.hermosillo.gob.mx/portalciudadano/', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-11-02', ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/login', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-11-02', ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/Tramite', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-11-02', ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-11-02', ipAddress: '189.173.19.23', antivirus: 'Avast Antivirus, Windows Defender' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx/controltramites/login.aspx', username: 'rohegi58', password: 'veneno58', log_date: '2025-11-05', hostname: 'DESKTOP-PJ1QIDO', ipAddress: '187.188.34.162', osInfo: 'Windows 11', antivirus: 'Disabled', malwarePath: 'C:\\Users\\Roberto Hernandez\\AppData\\Local\\BioSecure Dynamics\\BioScan.bat', countryCode: 'MX' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/servicios/Inicio.aspx', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-11-08', ipAddress: '189.173.52.78', antivirus: 'Windows Defender, Avast Antivirus' },
      { type: 'stealer', url: 'https://ventanilladigital.hermosillo.gob.mx/portalciudadano/', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-11-08', ipAddress: '189.173.52.78', antivirus: 'Windows Defender, Avast Antivirus' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/login', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-11-08', ipAddress: '189.173.52.78', antivirus: 'Windows Defender, Avast Antivirus' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/Tramite', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-11-08', ipAddress: '189.173.52.78', antivirus: 'Windows Defender, Avast Antivirus' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-11-08', ipAddress: '189.173.52.78', antivirus: 'Windows Defender, Avast Antivirus' },
      { type: 'stealer', url: 'https://hbus.hermosillo.gob.mx/Hbus/PreRegistro/PreRegistro1.php', username: 'rochamail13@gmail.com', password: 'mpLC/Fer1', log_date: '2025-11-08', hostname: 'COMPUROCHA', ipAddress: '187.188.46.27', osInfo: 'Windows 11 24H2 build 26100 (64 Bit)', countryCode: 'MX' },
      
      // ======= NUEVOS DATOS export_https___catastro.hermosillo.gob.mx__1763510393967.csv (13-17 NOVIEMBRE 2025) =======
      // Noviembre 2025 (13-17) - Datos más recientes
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/servicios/Inicio.aspx', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-11-13', hostname: 'DESKTOP-UTIL3JV', ipAddress: '191.99.53.109', osInfo: 'Microsoft Windows 11 Pro (x64)' },
      { type: 'stealer', url: 'https://ventanilladigital.hermosillo.gob.mx/portalciudadano/', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-11-13', hostname: 'DESKTOP-UTIL3JV', ipAddress: '191.99.53.109', osInfo: 'Microsoft Windows 11 Pro (x64)' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/login', username: 'jemd960927ih4', password: 'Dia270962', log_date: '2025-11-13', hostname: 'DESKTOP-UTIL3JV', ipAddress: '191.99.53.109', osInfo: 'Microsoft Windows 11 Pro (x64)' },
      { type: 'stealer', url: 'https://sareh.hermosillo.gob.mx/Tramite', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-11-13', hostname: 'DESKTOP-UTIL3JV', ipAddress: '191.99.53.109', osInfo: 'Microsoft Windows 11 Pro (x64)' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: 'contabilidadcentrovisual@gmail.com', password: 'Dia270962', log_date: '2025-11-13', hostname: 'DESKTOP-UTIL3JV', ipAddress: '191.99.53.109', osInfo: 'Microsoft Windows 11 Pro (x64)' },
      { type: 'combolist', url: 'http://www.hermosillo.gob.mx:444/', username: 'RENEELIUDHDZ8A@GMAIL.COM', password: 'LUNANOE2113', log_date: '2025-11-15' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:8082/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'emt001@gmail.com', password: '---------------------------------------------------------------------', log_date: '2025-11-16' },
      { type: 'stealer', url: 'https://www.hermosillo.gob.mx:8082/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: '5256781834495199', password: '---------------------------------------------------------------------', log_date: '2025-11-16' },
      { type: 'combolist', url: 'https://www.hermosillo.gob.mx:444/serviciotemporal/proyectos2008/servicios/inicio.aspx', username: 'cafs711114uj1', password: 'Samy2371', log_date: '2025-11-16' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'MOAR870215E64', password: 'soloporego1', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'PEFB811229QF8', password: 'fyamariel', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: '444/ServicioTemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspxcontabilidadcentrovisual@gmai', password: 'Dia270962', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Bancomer.aspx', username: '5256782867156591', password: '546', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'carlosjaviermzbrr222@gmail.com', password: 'pechodelamina', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/CuentaUnica/RegistroCuentaUnica.aspx', username: '6621567807', password: 'TO?ITA08', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: '444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx5256783308109694', password: '579', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: '444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspxVILF780309BB5', password: 'Fakik0mand0', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx/comunicacion/login.aspx', username: 'admin', password: 'Admin11', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: '444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx5579100156112300', password: '577', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Pro', username: 'brittamariel@hotmail.com', password: '248150Fy@', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'OMARAGUIRRE', password: 'Petosomar3010', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: '444/ServicioTemporal/Proyectos2008/servicios/Inicio.aspx', password: 'bogc490919tf5', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: '444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx5188999106293836', password: '498', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio', username: 'PEFB811229QF8', password: '248150Fy@', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Bancomer.aspx', username: '4915666417926452', password: '633', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx:444/Serviciotemporal/Proyectos2008/servicios/Inicio.aspx', username: 'RORA720728IJ4', password: '4263', log_date: '2025-11-17' },
      { type: 'combolist', url: 'http://hermosillo.gob.mx', username: 'sergiosmg812410@gmail.com', password: 'Flema130', log_date: '2025-11-17' }
    ]

    const allRawLeaks = [...allLeaksData, ...corporateLeaks, ...newHermosilloLeaks]
    
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

      // Determinar estado basado en la antigüedad del leak
      const leakDate = new Date(leak.log_date)
      const currentDate = new Date()
      const daysDiff = Math.floor((currentDate - leakDate) / (1000 * 60 * 60 * 24))
      
      let status = 'New'
      if (daysDiff > 45) {
        status = 'Reviewed'  // Más de 45 días = Revisado
      } else if (daysDiff > 15) {
        status = 'Validated' // Entre 15-45 días = Validado
      } else {
        status = 'New'       // Menos de 15 días = Nuevo
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
        status: status,
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
      totalLeaks: totalLeaks,
      uniqueCredentials: uniqueCredentials,
      reuseDetected: reuseDetected,
      activeSources: activeSources,
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
