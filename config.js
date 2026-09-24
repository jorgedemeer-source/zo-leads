/* ZO Leads · configuración del evento, equipo y enrutado por territorio.
   Edita este fichero para reutilizar la app en otro congreso.
   Los cambios hechos desde la pestaña "Ajustes" del móvil se guardan en el
   propio dispositivo y tienen prioridad sobre este fichero.

   Reparto provincia → territorio: tomado de "Propuesta territorios SPAIN.xlsx"
   (columnas AREA y TERRITORIY). 52 provincias, todas asignadas. */
window.LEADS_CONFIG = {
  version: 2,
  evento: { nombre: "GEDET 2026", lugar: "", fechas: "" },

  /* dirección: aparecen en "Captado por" y reciben copia de los envíos */
  equipo: [
    { nombre: "Estel Cortés",    rol: "Directora de ventas", email: "ecortes@zoskinhealth.com" },
    { nombre: "Paula Cambra",    rol: "Country manager",     email: "pcambra@zoskinhealth.com" },
    { nombre: "Marina Granados", rol: "Training manager",    email: "mgranados@zoskinhealth.com" },
    { nombre: "Jorge de Meer",   rol: "Marketing manager",   email: "jdemeer@zoskinhealth.com" }
  ],

  /* a quién se pone en copia al enviar un contacto al delegado */
  copiaA: ["ecortes@zoskinhealth.com"],
  /* a quién va el resumen de todos los contactos */
  resumenA: ["ecortes@zoskinhealth.com", "pcambra@zoskinhealth.com"],

  /* territorio → delegado responsable + provincias que enruta */
  territorios: [
    { nombre: "Atlantic Cluster", delegado: "Raúl Santana", email: "rsantana@zoskinhealth.com",
      provincias: ["La Coruña","Lugo","Orense","Pontevedra","Asturias","León","Las Palmas","Santa Cruz de Tenerife"] },
    { nombre: "North Corridor", delegado: "Nerea Iratzagorria", email: "niratzagorria@zoskinhealth.com",
      provincias: ["Vizcaya","Guipúzcoa","Álava","Navarra","La Rioja","Cantabria","Burgos","Palencia","Valladolid","Soria"] },
    { nombre: "North Mediterranean Cluster", delegado: "Chus Marques", email: "cmarquesmedina@zoskinhealth.com",
      provincias: ["Barcelona","Gerona","Lérida","Tarragona","Baleares","Zaragoza","Huesca"] },
    { nombre: "Central Hub", delegado: "Mar Zorrilla", email: "mzorrillaabad@zoskinhealth.com",
      provincias: ["Madrid","Toledo","Guadalajara","Ciudad Real","Ávila","Segovia","Salamanca","Zamora","Cáceres","Badajoz"] },
    { nombre: "East Corridor", delegado: "Inés Justamante", email: "ijustamante@zoskinhealth.com",
      provincias: ["Valencia","Alicante","Castellón","Murcia","Albacete","Cuenca","Teruel"] },
    { nombre: "South Division", delegado: "Karmen Arellano", email: "karrellano@zoskinhealth.com",
      provincias: ["Sevilla","Málaga","Cádiz","Córdoba","Granada","Jaén","Almería","Huelva","Ceuta","Melilla"] }
  ],

  /* territorio de reserva si la provincia no está en ninguna lista */
  territorioPorDefecto: "Sin territorio asignado",

  especialidades: ["Dermatología","Medicina estética","Cirugía plástica","Medicina general","Enfermería / esteticista","Farmacia","Distribuidor","Otro"],
  intereses: ["Abrir cuenta ZO","Getting Skin Ready®","Correct","Strengthen","Protect","Optimize","Formación","Peelings / protocolos en clínica","Solo información"],
  acciones: ["Visita del delegado","Enviar información","Enviar muestras","Invitar a formación","Llamada de seguimiento","Sin acción"],

  rgpd: {
    responsable: "ZO Skin Health España",
    email: "privacidad@zoskinhealth.com",
    texto: "Consiente que ZO Skin Health España trate sus datos para contactarle con información comercial, científica y de formación sobre sus productos. Puede retirar el consentimiento y ejercer sus derechos escribiendo al correo indicado."
  }
};
