# 🎃 Mapa de Halloween de Daganzo (Nueva Versión)

Plataforma web interactiva, moderna y temática para el evento de Halloween de **Daganzo de Arriba**, diseñada bajo el enfoque **Mobile-First**, con alto rendimiento y cero costes de mantenimiento.

---

## 🌟 Funcionalidades Principales Implementadas

1. **🗺️ Mapa Interactivo Nocturno (Leaflet.js + CartoDB Dark Matter):**
   * Centrado en las calles de Daganzo de Arriba (`40.5447, -3.4575`).
   * Marcadores SVG temáticos personalizados con efectos de pulso, iconos de categoría y distinción de casas visitadas.
   * Drawer inferior deslizante (*bottom sheet*) con información detallada, foto, horarios, votaciones y descripción.

2. **🎃 "Halloween Pass" (Pasaporte del Terror Vecinal y Gamificación):**
   * Sistema de check-in para marcar las casas visitadas en la ruta.
   * Barra de progreso en tiempo real y contador en la barra de navegación.
   * Desbloqueo de insignias por mérito (*Novato Valiente*, *Rey del Dulce*, *Leyenda Espectral*).
   * **Generador de Diploma Digital Oficial en Canvas (1200x800)** con el alias del vecino, sellos de Daganzo y botón de descarga directa en PNG.

3. **⭐ Sistema de Votación Popular en Tiempo Real & Podio:**
   * Los vecinos pueden votar por sus decoraciones favoritas directamente desde la ficha de cada casa.
   * Sección **Salón de la Fama / Podio** con el ranking en directo de las casas más votadas.

4. **🔊 Modo Inmersivo de Audio (Web Audio API):**
   * Sintetizador ambiental terrorífico con aullidos de viento espectral, campanas de medianoche y latidos siniestros.
   * Sin archivos MP3 pesados externos ni problemas de CORS.
   * Botón flotante para activar/desactivar con un toque.

5. **🦇 Efectos Visuales y Ambientación:**
   * Pantalla de bienvenida (*Splash Screen*) con niebla animada y botón de entrada.
   * Murciélagos animados cruzando sutilmente la pantalla.
   * Paleta de colores oficial: *Pumpkin Orange*, *Spectral Purple*, *Midnight Black* y *Toxic Green*.

6. **➕ Registro Vecinal ("Apunta tu Casa"):**
   * Formulario guiado con selección de temática, horarios, categorías y descripción.
   * **Selector interactivo en el mapa**: haz clic en cualquier calle de Daganzo para colocar el pin de tu casa con precisión GPS.
   * Guardado inmediato en `LocalStorage` (visible al instante en el mapa).

7. **🎯 Filtros Rápidos y Buscador en Vivo:**
   * Búsqueda por nombre o calle en tiempo real.
   * Filtros temáticos: *🍬 Caramelos / Truco o Trato*, *👻 Pasajes del Terror*, *👶 Para Peques (Sin sustos)* y *🏆 En Concurso*.

---

## 🚀 Cómo probar la aplicación en local

Al estar construida con tecnologías web estándar (HTML5, CSS3, JS Vanilla y Leaflet), no requiere instalación de dependencias pesadas:

### Opción 1: Abrir directamente
Haz doble clic sobre el archivo [index.html](file:///f:/Apps/Mapa%20Halloween/index.html) en tu navegador preferido (Chrome, Edge, Safari, Firefox).

### Opción 2: Con un servidor local ligero
Si deseas probar la geolocalización o simular el entorno móvil:
```bash
npx serve .
# O bien con cualquier extensión como Live Server en VS Code / Antigravity
```

---

## 🌐 Publicación en GitHub Pages (Cero costes)

Para sustituir la versión anterior (`https://byztor84.github.io/halloweendaganzo`):
1. Sube estos archivos a la rama principal (`main` o `gh-pages`) de tu repositorio de GitHub:
   * `index.html`
   * `styles.css`
   * `app.js`
   * `sound.js`
2. En GitHub ve a **Settings > Pages** y selecciona la rama para el despliegue.
3. ¡Estará publicado al instante con HTTPS gratuito!
