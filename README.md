# chrysolysis

This repository now contains a React + Vite personal website skeleton with a modern dark/tech look (deep navy, neon green, cyan, and white).

Quick start (Node.js required)
1. Install dependencies:

```powershell
npm install
```

2. Run the development server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
npm run preview
```

Files & structure (new)
- `index.html` — Vite entry
- `package.json`, `vite.config.js` — project manifest and config
- `src/main.jsx`, `src/App.jsx` — React entry and components
- `src/styles.css` — global styles (fonts, colors, animations)
- `src/assets/` — images and icons

Notes
- Replace placeholder content in `src/App.jsx` with your real name, bio, projects, links, and profile photo (swap `src/assets/profile.svg` or the `.avatar-placeholder`).
- Configure your social links by editing the `SOCIAL_LINKS` object at the top of `src/App.jsx` (replace the placeholder URLs with your real profiles). External links open in a new tab.

Available keys you can configure: `github`, `linkedin`, `spotify`, `discord`, `instagram`, `twitter`, `mail`, `resume`.
- The site uses a dark blue / neon green / cyan / white palette and includes subtle entrance animations and neon accents. Icons are inline SVGs (no external dependencies).

If you'd like, I can:
- Wire in dynamic project data (JSON) and render cards
- Add GitHub Actions to auto-deploy to `gh-pages`
- Replace the inline SVG icons with an icon font or react-icons package

Tell me which of those you'd like next and I'll implement it.

