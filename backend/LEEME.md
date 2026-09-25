# Conectar la app a una hoja de Google (5 minutos, desde un ordenador)

Con esto todos los móviles ven los mismos contactos y la hoja es el Excel del equipo.

1. Entra en https://sheets.new con la cuenta de Google que quieras que sea la dueña de los datos.
   Ponle nombre, por ejemplo **ZO Leads**.
2. Menú **Extensiones → Apps Script**. Borra lo que haya y pega el contenido de `apps-script.gs`. Guarda.
3. Arriba a la derecha, **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
   - Implementar. Acepta los permisos que pide (es tu propio script leyendo tu propia hoja).
4. Copia la **URL de la aplicación web** (termina en `/exec`) y pégala en `index.html`,
   en la línea `var SYNC_URL = "";`, entre las comillas. Sube el cambio.
5. Abre la app en el móvil: arriba a la derecha debe poner **sincronizado**.

Notas
- La hoja se llama `Contactos`, se crea sola al primer guardado y se viste con el estilo ZO
  (cabecera cobalto, filas gris perla y blanco). También crea la pestaña `Resumen` con recuentos en vivo.
- Puedes cambiar colores, anchos o añadir pestañas. Lo que NO se puede tocar en `Contactos`: el orden
  de las columnas ni su número, ni el nombre de la pestaña. La app escribe por posición.
- Para volver a aplicar el estilo: en el editor de Apps Script, elige la función `vestir` y pulsa Ejecutar.
- Un contacto eliminado en la app no se borra de la hoja: queda con `borrado = TRUE`.
- Si cambias el script, hay que volver a **Implementar → Gestionar implementaciones → editar → nueva versión**.

## Actualizar el script a una versión nueva (2 minutos)

1. En el editor de Apps Script, borra todo y pega el `apps-script.gs` nuevo. Guarda (Ctrl/Cmd+S).
2. Arriba, elige la función **vestir** y pulsa **Ejecutar**: arregla las filas antiguas (fecha guardada como número, columna Borrado vacía) y vuelve a maquetar.
3. **Implementar → Gestionar implementaciones → lápiz → Versión: Nueva versión → Implementar**. La dirección `/exec` no cambia, así que la app sigue funcionando sin tocar nada.
- Cualquiera que tenga la URL del script puede escribir en la hoja. La URL no se publica en ningún sitio, solo va dentro de la app.
