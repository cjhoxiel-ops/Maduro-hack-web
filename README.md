# SIGN-PROJECT

Web inicial para Netlify con inicio de sesión validado en funciones de servidor, panel admin, solicitudes de acceso y catálogo de productos. Datos guardados en Netlify Blobs.

## Publicar
1. Sube el contenido del ZIP a un repositorio Git o despliega el ZIP/proyecto en Netlify.
2. En Netlify, configura estas variables para el contexto de producción:
   - `ADMIN_PASSWORD`: contraseña de administrador larga, única y de al menos 12 caracteres.
   - `SESSION_SECRET`: secreto aleatorio de al menos 32 caracteres.
   - `ACCESS_REQUEST_CODE`: código que se pide al enviar solicitudes.
3. Despliega de nuevo después de añadir las variables.
4. Abre el sitio. Usa “Acceso de administrador” para entrar al panel.
5. Desde el panel, aprueba/rechaza solicitudes y crea productos.

Puedes generar un secreto con un generador criptográfico fiable o con `openssl rand -base64 48` en un equipo con terminal. No compartas estos secretos ni los incluyas en el código.

## Notas de seguridad
- La contraseña admin y el secreto de sesión solo se leen en el servidor.
- La sesión usa una cookie HttpOnly, Secure y SameSite=Strict.
- Los endpoints admin comprueban la sesión en el servidor.
- Netlify Blobs almacena las solicitudes, usuarios y productos.
- Esta es una base funcional, no una auditoría de seguridad: para uso público real conviene añadir límites de intentos, protección antiabuso y almacenamiento de contraseñas con un algoritmo dedicado como Argon2id/bcrypt. La muestra usa SHA-256 para mantener las dependencias pequeñas; cámbialo antes de producción con usuarios reales.
- El cierre de sesión invalida la cookie en el navegador; el vencimiento máximo es de 8 horas. Los enlaces externos publicados son accesibles para quien tenga el enlace, salvo que el destino también esté protegido.
- Los archivos descargables no se alojan dentro de la aplicación: los productos enlazan a una URL HTTPS que tú proporcionas.


## Interfaz actualizada
La página pública tiene diseño negro y rojo, menú lateral y secciones Principal, IPA · iOS 27, IPA · iOS 26, ESign y Archivos .3105. Los archivos que estaban disponibles se incluyen en `public/downloads`. ESign enlaza al recurso externo indicado; no se inventó un IPA de ESign porque no estaba entre los archivos recibidos.


## Actualización de interfaz (15 oct 2026)
- Pantalla inicial de contraseña solicitada: `SIGN-34963734`. La validación de esta pantalla es del lado del navegador y solo es una barrera visual; no protege los archivos contra acceso directo ni sustituye una autenticación real del servidor.
- La sección ESign usa tarjetas inspiradas en la referencia visual aprobada. No incluye un IPA de ESign.
- El botón DNS abre el archivo `.mobileconfig` enlazado desde la web de David iOS; el botón de instalación abre `https://davidios.link/` porque no se confirmó una URL directa estable del instalador.
- Transiciones ajustadas a aproximadamente 0,40 segundos.


## Actualización visual y menú (15 oct 2026)
- Fondo negro/rojo oscuro con partículas luminosas flotantes, profundidad 3D y efectos suaves de 0,40 s.
- Inicio con tres tarjetas compactas en paralelo: IPA 3105, ESign y 3105. Dentro de IPA 3105 se elige iOS 26 o iOS 27.
- El menú de las tres rayas contiene únicamente Soporte, Grupo de WhatsApp y Creador (TikTok @ios.pocopin7), sin duplicar las secciones de Inicio.
