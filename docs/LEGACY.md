# Removed legacy code

The original "Spirit of the Fire" site was replaced by the Street design in
the production release. Everything below was removed after confirming nothing
imported it and none of it appeared in the build. It remains in Git history:
the last commit containing all of it is tagged `checkpoint/phase2-complete`.

## Removed

| What | Notes |
| --- | --- |
| `src/components/*` | Old homepage, navbar, hero, story, menu, journal, newsletter, footer, article reader |
| `src/data/articles.js` | Journal articles. Their URLs (`/article/*`) now answer 410 Gone |
| `src/index.css`, `tailwind.config.js` | Tailwind build. Its base reset is kept verbatim in `src/site/global.css` |
| `src/previews/editorial/*`, `src/App.jsx` | The Editorial design concept and the router that served it |
| `react-router-dom`, `react-icons`, `tailwindcss` | Only used by the code above |
| `eslint` and plugins, `npm run lint` | There was never an ESLint config, so lint could not run |

The previous homepage had one uncommitted local change (a trailing blank line
in `src/components/Home.jsx`). It was saved with `git stash` before removal.

## Kept

All original photographs and renders are in `assets/originals/`, unchanged and
outside the build. They are the sources for `npm run images` (dish renders,
hero `3.jpg`, BkkBoost logo `112.png`) and `npm run brand-assets` (`3.jpg`).
