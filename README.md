# Portfolio de Juan Cruz Bocadi

Portfolio personal inspirado en la navegación de Steam: Tienda, Biblioteca, Comunidad y un menú de perfil con Sobre mí, Actividad y Contacto. La Biblioteca permite seleccionar y buscar proyectos; la sección Actividad consulta eventos públicos recientes de GitHub.

**Sitio publicado:** https://juanbocadi.github.io/portfolio-steam/

## Stack

- HTML5 semántico
- CSS3 (Grid, Flexbox y media queries)
- JavaScript nativo, sin dependencias de ejecución
- API pública de GitHub para el feed de actividad

## Correr localmente

No requiere instalación de dependencias. Para probarlo con el servidor local incluido:

```bash
node server.mjs
```

Después abrí `http://localhost:4173`. También se puede abrir `index.html` directamente, aunque el feed de GitHub depende de la conexión a internet.

El feed de actividad necesita conexión a internet y puede estar limitado por la cuota pública de la API. El resto del sitio funciona sin esa consulta.

## Publicación

Es un sitio estático. Se puede desplegar en GitHub Pages, Netlify o Vercel apuntando a la raíz del repositorio, sin comando de build. Para GitHub Pages: **Settings → Pages → Deploy from a branch → main / root**.

## Contenido

Perfil y tecnologías tomados del CV de Juan Cruz Bocadi. Los enlaces de proyectos apuntan a repositorios públicos de [JuanBocadi](https://github.com/JuanBocadi). La biografía es un borrador para revisar y personalizar antes de la entrega.

## Accesibilidad

El sitio incluye navegación por teclado, enlace para saltar al contenido, foco visible, estructura semántica, un solo `h1` y soporte para `prefers-reduced-motion`.
