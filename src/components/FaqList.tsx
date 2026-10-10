import type { Faq } from "@/data/faq";

/** FAQ en <details>/<summary> : lisible sans JavaScript, même texte que le JSON-LD FAQPage. */
export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq-list">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <div className="a">{f.a.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}</div>
        </details>
      ))}
    </div>
  );
}
