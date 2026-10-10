import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // textes français : les apostrophes sont partout
      "react/no-unescaped-entities": "off",
    },
  },
  {
    // L'accueil animé et la page 404 ont leur propre layout racine : on y entre et on en sort par un
    // rechargement complet de page, avec de simples liens <a>, comme sur le site d'origine.
    files: ["src/home/**", "src/app/global-not-found.tsx"],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // scripts d'animation de l'accueil, repris tels quels du site d'origine
    "src/home/home-init.js",
    "legacy/**",
    "apps-script/**",
  ]),
]);

export default eslintConfig;
