/* Couleurs et polices des e-mails : celles du site, avec des polices de secours présentes dans toutes les messageries. */
export const C = {
  bordeaux: "#4a0d16",
  red: "#d42235",
  cream: "#f7efe6",
  paper: "#fffcf8",
  ink: "#2b2223",
  soft: "#6b5558",
  line: "#eadfd3",
  green: "#1a7f45",
};
export const FONT = {
  sans: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  serif: "'Bodoni Moda', Didot, 'Bodoni 72', Georgia, 'Times New Roman', serif",
  arabic: "'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif",
};

/** Styles du <head> : polices du site (pour les messageries qui les chargent), mise en page mobile, mode sombre.
    Tout le reste est en styles en ligne. */
export const headCss = (site: string) => `
@font-face { font-family: 'DM Sans'; font-style: normal; font-weight: 100 1000; font-display: swap; src: url(${site}/fonts/dm-sans-latin-v1.woff2) format('woff2'); }
@font-face { font-family: 'Bodoni Moda'; font-style: normal; font-weight: 400 900; font-display: swap; src: url(${site}/fonts/bodoni-moda-chiffres-v1.woff2) format('woff2'); }
@font-face { font-family: 'IBM Plex Sans Arabic'; font-style: normal; font-weight: 400; font-display: swap; src: url(${site}/fonts/ibm-plex-sans-arabic-400-ar-v1.woff2) format('woff2'); }
@font-face { font-family: 'IBM Plex Sans Arabic'; font-style: normal; font-weight: 600; font-display: swap; src: url(${site}/fonts/ibm-plex-sans-arabic-600-ar-v1.woff2) format('woff2'); }
:root { color-scheme: light dark; supported-color-schemes: light dark; }
body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
table { border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; }
a { color: ${C.bordeaux}; }
@media only screen and (max-width: 480px) {
  .pad { padding-left: 18px !important; padding-right: 18px !important; }
  .h1 { font-size: 24px !important; line-height: 31px !important; }
  .total-amount { font-size: 28px !important; }
  .stack { display: block !important; width: auto !important; border-radius: 0 !important; }
  .stack.total-amount { padding-top: 0 !important; border-radius: 0 0 14px 14px !important; }
  .stack.total-label { padding-bottom: 4px !important; border-radius: 14px 14px 0 0 !important; }
}
@media (prefers-color-scheme: dark) {
  .page { background-color: #171011 !important; }
  .card { background-color: #231a1b !important; }
  .panel { background-color: #2e2224 !important; }
  .ink, .ink a { color: #f7efe6 !important; }
  .soft { color: #cbbab4 !important; }
  .accent { color: #ff8a93 !important; }
  .rule { border-color: #3d2e30 !important; }
  .foot, .foot a { color: #b8a7a2 !important; }
  .lnk { color: #ffb3ba !important; }
}
/* Outlook.com et l'application Outlook (mode sombre) */
[data-ogsc] .ink, [data-ogsc] .ink a { color: #f7efe6 !important; }
[data-ogsc] .soft { color: #cbbab4 !important; }
[data-ogsc] .accent { color: #ff8a93 !important; }
[data-ogsc] .lnk { color: #ffb3ba !important; }
[data-ogsb] .page { background-color: #171011 !important; }
[data-ogsb] .card { background-color: #231a1b !important; }
[data-ogsb] .panel { background-color: #2e2224 !important; }
`;
