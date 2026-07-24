# Expected PWA icon assets

`app/manifest.ts` and `app/layout.tsx` already reference the files below by
these exact paths. No image files exist here yet — this directory is a
placeholder. Drop in real, branded assets (based on the mark in
`components/branding/logo.tsx`: an indigo `#4f46e5` rounded square containing
a white open-book glyph) using these exact filenames and nothing else needs
to change.

| File | Size | Format | Purpose |
|---|---|---|---|
| `icon-192.png` | 192×192 | PNG | Standard manifest icon (Android home screen, install prompt) |
| `icon-512.png` | 512×512 | PNG | Standard manifest icon (splash screen, larger displays) |
| `maskable-icon-512.png` | 512×512 | PNG | Manifest icon with `purpose: "maskable"` — must be designed with the mark centered inside a ~40% safe-area margin so Android's adaptive-icon mask (circle/squircle/rounded-square) doesn't clip it. This must be a distinct file from `icon-512.png`, not a reused copy — a non-maskable icon fails Android's maskable-icon check if reused as-is. |
| `apple-touch-icon.png` | 180×180 | PNG, no transparency | iOS Safari home-screen icon. iOS does not read the Web App Manifest's `icons` array at all — this file, referenced via `<link rel="apple-touch-icon">` in `app/layout.tsx`, is the only way iOS gets an icon. Should have a solid (non-transparent) background since iOS does not composite transparency. |

Until these four files exist, the app's existing `favicon.ico` remains the
only icon that actually resolves — installability checks (Chrome's "Add to
Home Screen" banner, Lighthouse PWA audit) will flag missing icons until
they're added.
