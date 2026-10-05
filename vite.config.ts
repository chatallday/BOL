import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";

function generateIndexHtml() {
  return {
    name: "generate-index-html",
    closeBundle() {
      const manifestPath = resolve("dist/client/.vite/manifest.json");
      let entryScript = "/assets/index-Dx6L2kb4.js";
      let entryStyle = "";

      try {
        if (existsSync(manifestPath)) {
          const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
          const entryKey = Object.keys(manifest).find(key => manifest[key].isEntry === true);
          if (entryKey) {
            entryScript = `/${manifest[entryKey].file}`;
            // Also get the CSS file for this entry
            if (manifest[entryKey].css && manifest[entryKey].css.length > 0) {
              entryStyle = `<link rel="stylesheet" href="/${manifest[entryKey].css[0]}" />`;
            }
          }
        }
      } catch (e) {
        console.warn("Could not read manifest, using fallback entry script");
      }

      const schemaOrg = {
        "@context": "https://schema.org",
        "@type": "NGO",
        name: "Breath of Life PDC",
        alternateName: "Aliento de Vida",
        url: "https://breathoflifepdc.org",
        email: "BreathOfLifePDC@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Playa del Carmen",
          addressRegion: "Quintana Roo",
          addressCountry: "MX",
        },
        sameAs: [
          "https://breathoflifepdc.org/",
          "https://facebook.com/breathoflifepdc",
          "https://instagram.com/breathoflifeadv",
          "https://www.youtube.com/@BreathOfLifePDC",
        ],
      };

      const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Breath of Life PDC — Caring in Action</title>
    <meta name="description" content="Community charity helping families in Playa del Carmen, Mexico." />
    <meta name="theme-color" content="#6f187f" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    ${entryStyle}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap" />
    <script type="application/ld+json">${JSON.stringify(schemaOrg)}</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${entryScript}"></script>
    <script>
      // Error logging for debugging
      window.addEventListener('error', (e) => {
        console.error('Global error:', e.message, e.filename, e.lineno, e.colno, e.error);
      });
      window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled rejection:', e.reason);
      });
    </script>
  </body>
</html>`;
      writeFileSync(resolve("dist/client/index.html"), html);
      console.log("Generated index.html with entry:", entryScript, "and style:", entryStyle);
    },
  };
}

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      client: { entry: "client" },
    }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
    generateIndexHtml(),
  ],
  build: {
    manifest: true,
  },
});