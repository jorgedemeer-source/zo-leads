# ZO Leads

Web instalable para captar contactos de profesionales en congresos y repartirlos por account manager.
ZO Skin Health España.

- **URL de la app:** https://jorgedemeer-source.github.io/zo-leads/
  (requiere GitHub Pages activado: Settings → Pages → Branch `main` / root).
- **Instalar en el iPhone:** abrir la URL en Safari → Compartir → Añadir a pantalla de inicio.
- **Datos compartidos:** ver `backend/LEEME.md`. Sin conectar la hoja, cada móvil guarda solo lo suyo.
- **Quién capta:** cada persona abre una vez su enlace personal y el móvil queda identificado.
  Si entra por el enlace general, la app pregunta el nombre una sola vez.

| Persona | Enlace personal |
|---|---|
| Estel Cortés | https://jorgedemeer-source.github.io/zo-leads/?yo=estel |
| Paula Cambra | https://jorgedemeer-source.github.io/zo-leads/?yo=paula |
| Marina Granados | https://jorgedemeer-source.github.io/zo-leads/?yo=marina |
| Jorge de Meer | https://jorgedemeer-source.github.io/zo-leads/?yo=jorge |
| Raúl Santana | https://jorgedemeer-source.github.io/zo-leads/?yo=raul |
| Nerea Iratzagorria | https://jorgedemeer-source.github.io/zo-leads/?yo=nerea |
| Chus Marques | https://jorgedemeer-source.github.io/zo-leads/?yo=chus |
| Mar Zorrilla | https://jorgedemeer-source.github.io/zo-leads/?yo=mar |
| Inés Justamante | https://jorgedemeer-source.github.io/zo-leads/?yo=ines |
| Karmen Arellano | https://jorgedemeer-source.github.io/zo-leads/?yo=karmen |

- **Otro congreso:** editar el bloque CONFIGURACIÓN al principio del script de `index.html`.

| Fichero | Qué es |
|---|---|
| `index.html` | La app entera (formulario, contactos, filtros, Excel) |
| `manifest.webmanifest`, `img/icon-*.png` | Instalación como app, icono ZO |
| `sw.js` | Abrir sin conexión |
| `fonts/`, `img/` | ZO Skin Sans, Geist Mono, wordmark, firma y fotos (Box ZO_BIBLIOTECA) |
| `backend/` | Script de Google Sheets e instrucciones |
