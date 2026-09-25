/* ZO Leads · backend en Google Sheets (Apps Script).
   La hoja es la base de datos compartida y, a la vez, el Excel del equipo.
   Instalación: ver LEEME.md en esta carpeta. */
var HOJA = 'Contactos';
var COLS = ['id','ts','editado','borrado','evento','nombre','clinica','especialidad','ciudad','provincia','territorio','delegado','delegadoEmail','telefono','email','estado','motivo','colaboracion','notas','captador'];

var TITULOS = ['ID','Fecha','Editado','Borrado','Congreso','Nombre','Clínica','Especialidad','Ciudad','Provincia','Territorio','Account manager','Email account manager','Teléfono','Email','Estado','Interesado en','Colaboración: en qué','Información relevante','Captado por'];
var TERRITORIOS = [['Atlantic Cluster','Raúl Santana'],['North Corridor','Nerea Iratzagorria'],['North Mediterranean Cluster','Chus Marques'],['Central Hub','Mar Zorrilla'],['East Corridor','Inés Justamante'],['South Division','Karmen Arellano']];
var COBALTO = '#002C8E', PERLA = '#E3E3E3', BLANCO = '#FFFFFF', NEGRO = '#151515';

function hoja_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(HOJA) || ss.insertSheet(HOJA);
  if (sh.getLastRow() === 0) { sh.appendRow(COLS); vestir_(ss, sh); }
  return sh;
}

/* Maquetación ZO: se aplica sola la primera vez. Se puede volver a lanzar desde el editor: Ejecutar → vestir. */
function vestir() { var ss = SpreadsheetApp.getActiveSpreadsheet(); vestir_(ss, hoja_()); }
function vestir_(ss, sh) {
  var n = COLS.length;
  sh.getRange(1, 1, 1, n).setValues([TITULOS]);
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, n).setBackground(COBALTO).setFontColor(BLANCO).setFontFamily('Inter').setFontSize(10).setFontWeight('bold').setVerticalAlignment('middle');
  sh.setRowHeight(1, 34);
  sh.getRange(2, 1, 2000, n).setFontFamily('Inter').setFontSize(10).setFontColor(NEGRO).setVerticalAlignment('middle');
  var anchos = [90, 140, 90, 70, 110, 220, 220, 150, 130, 130, 200, 170, 220, 120, 220, 110, 160, 220, 320, 170];
  for (var i = 0; i < n; i++) sh.setColumnWidth(i + 1, anchos[i] || 120);
  sh.hideColumns(1); sh.hideColumns(3);                     // ID y Editado son técnicas
  var banding = sh.getRange(1, 1, 2000, n).getBandings();
  if (!banding.length) sh.getRange(1, 1, 2000, n).applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false).setHeaderRowColor(COBALTO).setFirstRowColor(BLANCO).setSecondRowColor(PERLA);
  sh.getRange(2, 2, 2000, 1).setNumberFormat('dd/mm/yyyy hh:mm');
  sh.getRange('A1').activate(); sh.getRange(1, 1, 1, n).createFilter && (sh.getFilter() || sh.getRange(1, 1, 2000, n).createFilter());
  resumen_(ss);
}

/* Pestaña Resumen: contactos por account manager y por congreso, con fórmulas en vivo */
function resumen_(ss) {
  var r = ss.getSheetByName('Resumen') || ss.insertSheet('Resumen');
  r.clear();
  r.getRange('A1').setValue('ZO Leads · Resumen').setFontFamily('Inter').setFontSize(18).setFontColor(COBALTO);
  r.getRange('A2').setValue('Se actualiza solo con lo que entra por la app.').setFontFamily('Inter').setFontSize(10).setFontColor('#6B6B6B');
  r.getRange('A4:C4').setValues([['Territorio','Account manager','Contactos']]).setBackground(COBALTO).setFontColor(BLANCO).setFontFamily('Inter').setFontWeight('bold');
  var filas = TERRITORIOS.map(function (t) { return [t[0], t[1], '=COUNTIFS(Contactos!K:K;"' + t[0] + '";Contactos!D:D;FALSE)']; });
  filas.push(['Total', '', '=COUNTIFS(Contactos!K:K;"<>";Contactos!D:D;FALSE)']);
  r.getRange(5, 1, filas.length, 3).setValues(filas).setFontFamily('Inter').setFontSize(11);
  r.getRange(5 + filas.length - 1, 1, 1, 3).setFontWeight('bold').setFontColor(COBALTO);
  r.getRange('E4:F4').setValues([['Congreso','Contactos']]).setBackground(COBALTO).setFontColor(BLANCO).setFontFamily('Inter').setFontWeight('bold');
  r.getRange('E5').setFormula('=IFERROR(SORT(UNIQUE(FILTER(Contactos!E2:E;Contactos!E2:E<>"";Contactos!D2:D=FALSE)));"")');
  r.getRange('F5').setFormula('=ARRAYFORMULA(IF(E5:E20="";"";COUNTIFS(Contactos!E:E;E5:E20;Contactos!D:D;FALSE)))');
  r.setColumnWidth(1, 240); r.setColumnWidth(2, 200); r.setColumnWidth(3, 110); r.setColumnWidth(4, 30); r.setColumnWidth(5, 200); r.setColumnWidth(6, 110);
  r.setHiddenGridlines(true);
}
function leer_() {
  var sh = hoja_(); var n = sh.getLastRow(); if (n < 2) return [];
  var vals = sh.getRange(2, 1, n - 1, COLS.length).getValues();
  return vals.map(function (r) { var o = {}; COLS.forEach(function (k, i) { o[k] = r[i]; }); o.ts = Number(o.ts) || 0; o.editado = Number(o.editado) || 0; o.borrado = (o.borrado === true || o.borrado === 'TRUE' || o.borrado === 'true'); return o; }).filter(function (o) { return o.id; });
}
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify(leer_())).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var body = JSON.parse(e.postData.contents || '{}');
    if (body.action === 'upsert' && body.lead && body.lead.id) {
      var sh = hoja_(); var l = body.lead; var n = sh.getLastRow();
      var ids = n >= 2 ? sh.getRange(2, 1, n - 1, 1).getValues().map(function (r) { return String(r[0]); }) : [];
      var row = COLS.map(function (k) { var v = l[k]; return v === undefined || v === null ? '' : v; });
      var i = ids.indexOf(String(l.id));
      if (i >= 0) {
        var prev = Number(sh.getRange(i + 2, 3).getValue()) || 0;   // columna editado
        if ((Number(l.editado) || 0) >= prev) sh.getRange(i + 2, 1, 1, COLS.length).setValues([row]);
      } else { sh.appendRow(row); }
    }
    return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
  } finally { lock.releaseLock(); }
}
