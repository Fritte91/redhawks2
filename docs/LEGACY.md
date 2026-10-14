# Legacy code and assets

The original "Spirit of the Fire" homepage and journal are no longer routed or
bundled. Nothing outside `src/components/` imports them (checked with
`grep -rnE "from ['\"][./]*(components/|data/articles|index\.css)" src`), and
none of their code or strings appear in `dist/assets`. They are kept in the
repository until removal is approved.

## Source (unused, safe to delete together)

| Path | Was |
| --- | --- |
| `src/components/Home.jsx` | Old homepage composition |
| `src/components/Navbar.jsx`, `Hero.jsx`, `Story.jsx`, `Menu.jsx`, `Journal.jsx`, `Newsletter.jsx`, `Footer.jsx` | Old homepage sections |
| `src/components/ArticleReader.jsx`, `src/data/articles.js` | Journal article pages (`/article/:id`, now 410) |
| `src/index.css`, `tailwind.config.js` | Tailwind build used only by the above |

`src/components/Home.jsx` also has an uncommitted one-line change (a trailing
blank line) that predates this work; it was left untouched.

## Dependencies only the legacy code uses

| Package | Notes |
| --- | --- |
| `react-icons` | Imported only by `src/components/*`. Remove with them. |
| `tailwindcss` | Only `src/index.css` used it. Also remove the `tailwindcss` entry from `postcss.config.js` (keep `autoprefixer`). |

`eslint` and its plugins are listed, but the repository has never had an
ESLint config, so `npm run lint` does not run. Either add a config or remove
the script and packages.

## Assets

Moved out of `public/` (so they no longer ship in the build) into
`assets/originals/`, unchanged:

| File | Was used by |
| --- | --- |
| `3.jpg` | Source of the optimised hero images (`npm run images`) and the OG image |
| `1.jpg`, `2.jpg`, `5.jpg` | Old hero / story photos, plus an unused one |
| `2.png`, `3.png`, `11.png` | Unused BkkBoost logo variants |
| `art1.png`–`art6.png` | Journal article images |
| `korv.png` | Unused dish render |

Still in `public/`, needed only by the Editorial preview (about 27 MB of the
30 MB build):

- the 18 dish PNGs referenced by `src/data/menuItems.js` (also the sources for
  `npm run images`)
- `4.jpg` (Editorial "About" photo)
- `112.png` (BkkBoost logo in the Editorial credit band)

If the Editorial preview is retired, move these to `assets/originals/` as well
and update `menuItems.js` image paths if needed; the build drops to about 3 MB.
