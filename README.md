# ZO Leads

Web instalable para captar contactos de profesionales en congresos y repartirlos por account manager.
ZO Skin Health España.

- **URL de la app:** https://zoskinhealth-es.github.io/zo-leads/
  (requiere GitHub Pages activado: Settings → Pages → Branch `main` / root).
- **Instalar en el iPhone:** abrir la URL en Safari → Compartir → Añadir a pantalla de inicio.
- **Datos compartidos:** ver `backend/LEEME.md`. Sin conectar la hoja, cada móvil guarda solo lo suyo.
- **Quién capta:** al abrir la app por primera vez pide el email de ZO y, con él, identifica el móvil.
  Los emails del equipo están en el bloque CONFIGURACIÓN de `index.html`.
- **Cambios de equipo:** se edita el nombre y el email del territorio en CONFIGURACIÓN. Los contactos
  antiguos pasan a mostrar al account manager actual del territorio; "Captado por" no cambia nunca.
- **Otro congreso:** editar el bloque CONFIGURACIÓN al principio del script de `index.html`.

| Fichero | Qué es |
|---|---|
| `index.html` | La app entera (formulario, contactos, filtros, Excel) |
| `manifest.webmanifest`, `img/icon-*.png` | Instalación como app, icono ZO |
| `sw.js` | Abrir sin conexión |
| `fonts/`, `img/` | ZO Skin Sans, Geist Mono, wordmark, firma y fotos (Box ZO_BIBLIOTECA) |
| `backend/` | Script de Google Sheets e instrucciones |
