# carolinadecanada

Sitio de recetas y tradiciones culinarias canadienses, bilingüe (inglés/español).
Producción: https://carolinadecanada.com

## Stack

- **Gatsby 5** (no es Next.js). Sitio estático: el build genera HTML en `public/`.
- **Contentful** como CMS, vía `gatsby-source-contentful`.
- **Tailwind** (con PostCSS) + **styled-components** conviven en el proyecto.
- **i18n** con `gatsby-plugin-react-i18next`.
- **Firebase Hosting** para el deploy, con GitHub Actions.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run develop` | Servidor de desarrollo (alias: `npm start`) |
| `npm run build` | Build de producción a `public/` |
| `npm run serve` | Sirve localmente el build ya generado |
| `npm run clean` | Borra `.cache/` y `public/` |

No hay tests ni linter configurados.

## Contentful: el contenido se lee en tiempo de BUILD

Este es el punto que más confusión genera. `gatsby-source-contentful` consulta
Contentful mientras corre `gatsby build`; el resultado queda congelado en el HTML
estático. **Publicar en Contentful no cambia producción por sí solo** — hace falta
un build nuevo.

Eso lo resuelve un webhook (ver *Deploy*), pero implica que los cambios de contenido
tardan ~4 minutos en aparecer, no son instantáneos.

`gatsby-config.js` solo registra el plugin de Contentful si `CONTENTFUL_SPACE_ID` y
`CONTENTFUL_ACCESS_TOKEN` existen y no valen `placeholder` (ver `hasContentfulConfig()`).
Es deliberado, para que el build no reviente sin credenciales — pero **falla en
silencio**: sin esas variables el sitio compila igual, solo que sin nada de contenido.
Si ves el sitio vacío de recetas, revisa las variables antes que el código.

## Variables de entorno

Local: copia `.env.example` a `.env`. En CI: son secrets del repo en GitHub.

- `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` — token de la Content Delivery API.
- `GATSBY_FIREBASE_*` — config del cliente de Firebase (`src/firebase.js`). El prefijo
  `GATSBY_` es obligatorio para que Gatsby las exponga al navegador.

## Deploy

`.github/workflows/firebase-hosting-merge.yml` construye y despliega a Firebase Hosting
(proyecto `carolina-de-canada`, canal `live`). Se dispara por tres vías:

1. **`push` a `master`**.
2. **`repository_dispatch`** de tipo `contentful-publish` — lo emite un webhook de
   Contentful al publicar/despublicar/borrar una entrada o asset. Reemplaza al antiguo
   build hook de Netlify.
3. **`workflow_dispatch`** — botón manual en la pestaña Actions.

Los PRs generan un canal de preview (`firebase-hosting-pull-request.yml`).

El webhook de Contentful necesita, además del token, un header `User-Agent`: la API de
GitHub devuelve 403 sin él. El PAT que usa **caduca**; cuando eso pase, el webhook
empezará a dar 401 y el sitio dejará de actualizarse sin ningún aviso visible.

## Estructura

```
src/
  pages/       Rutas del sitio (index, about, recipes, resources, 404)
  templates/   Plantillas para páginas generadas desde Contentful
  components/
  context/
  hooks/
  locales/     en/translation.json, es/translation.json
  styles/
  firebase.js  Cliente de Firebase para el navegador
static/        Se copia tal cual a la raíz del sitio
```

## Notas

- `netlify.toml` sigue en el repo por historia. El hosting es Firebase; si Netlify
  todavía está conectado al repo, cada push genera un deploy duplicado.
- `gatsby-node.js` fuerza la transpilación de `framer-motion` y compañía por problemas
  de resolución ESM con Webpack 5. No lo quites sin probar el build.
- `public/` está en `.gitignore`; es salida de build. La copia local puede estar obsoleta.
