/** Précharge la police du texte principal de la page (celle du titre et du premier paragraphe), et elle seule.
    Les autres polices (prix, ticket, autre alphabet) sont téléchargées quand la page en a besoin : voir src/app/fonts.css. */
const FILES = {
  fr: ["dm-sans-latin-v1"],
  ar: ["ibm-plex-sans-arabic-400-ar-v1", "ibm-plex-sans-arabic-600-ar-v1"],
};

export default function FontPreload({ locale }: { locale: "fr" | "ar" }) {
  return FILES[locale].map((f) => <link key={f} rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={`/fonts/${f}.woff2`} />);
}
