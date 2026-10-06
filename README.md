# Portfolio de Juan Cruz Bocadi

Portfolio personal construido como una interfaz de escritorio inspirada en Steam. Cada apartado ocupa una vista propia: Tienda, Biblioteca, Comunidad, Perfil, Actividad y Contacto. En la Biblioteca se selecciona un proyecto desde el panel lateral; su ficha muestra descripción, tecnologías y un botón «Jugar» que abre el repositorio en GitHub.

**Sitio publicado:** https://juanbocadi.github.io/portfolio-steam/

## Stack

- HTML5 semántico
- CSS3 (Grid, Flexbox y media queries)
- JavaScript nativo
- SVG originales para las portadas
- API pública de GitHub para la actividad reciente

No hay dependencias ni paso de compilación.

## Correr localmente

```bash
node server.mjs
```

Abrí `http://localhost:4173`. La actividad necesita conexión a Internet; si la API pública no responde, se muestran los repositorios recientes o un enlace directo al perfil.

## Navegación

- **Tienda:** presentación y proyectos destacados.
- **Biblioteca:** tres proyectos con fichas y enlaces a sus repositorios.
- **Comunidad:** proyectos y perfiles públicos.
- **Perfil:** biografía, estudios y habilidades agrupadas.
- **Actividad:** eventos públicos recientes de GitHub.
- **Contacto:** correo, GitHub y LinkedIn.

Las rutas usan fragmentos (`#library/autosys`, por ejemplo), por lo que funcionan en GitHub Pages sin configuración adicional. El sitio responde a 360, 768 y 1280 px, tiene navegación por teclado y respeta `prefers-reduced-motion`.

## Publicación

GitHub Pages sirve la raíz de la rama `main` de este repositorio. Cada `push` actualiza la web pública. También se puede publicar en Netlify o Vercel como sitio estático, sin comando de build.

## Contenido

La información profesional proviene del CV de Juan Cruz Bocadi y los proyectos enlazan a repositorios públicos de [JuanBocadi](https://github.com/JuanBocadi). La biografía es un borrador para que Juan revise su redacción antes de la entrega.
