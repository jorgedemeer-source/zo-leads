/* ZO Leads · backend en Google Sheets (Apps Script).
   La hoja es la base de datos compartida y, a la vez, el Excel del equipo.
   Instalación: ver LEEME.md en esta carpeta. */
var HOJA = 'Contactos';
var COLS = ['id','ts','editado','borrado','evento','nombre','clinica','especialidad','ciudad','provincia','territorio','delegado','delegadoEmail','telefono','email','motivo','notas','captador'];

function hoja_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(HOJA) || ss.insertSheet(HOJA);
  if (sh.getLastRow() === 0) { sh.appendRow(COLS); sh.setFrozenRows(1); }
  return sh;
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
