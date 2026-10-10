/** Bloc de données structurées schema.org, écrit dans le HTML servi (sans les caractères d'isolement des textes arabes). */
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/[\u2066\u2069]/g, "").replace(/</g, "\\u003c") }} />;
}
