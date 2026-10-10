import { problemPages, trustPages } from "@/data/pages";
import { products } from "@/data/products";
import { formatDate, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="foot" aria-labelledby="foot-title">
      <div className="foot-sky" aria-hidden="true"><span className="foot-sun"></span></div>
      <div className="foot-in">
        <div className="foot-cta">
          <h2 id="foot-title">Ta routine du soir t'attend.</h2>
          <p>Livraison offerte partout au Maroc, paiement à la livraison.</p>
          <a href="#offres" className="o-btn o-primary o-lg" data-order=""><span className="o-lbl">Commander la gamme</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></a>
        </div>

        <nav className="foot-cols" aria-label="Pied de page">
          <div>
            <p className="fc-t">Le site</p>
            <ul>
              <li><a href="#routine" data-go-routine="">La routine en 4 étapes</a></li>
              <li><a href="#campagne" data-glide="">Les affiches</a></li>
              <li><a href="#avis" data-hz-link="">Les avis</a></li>
              <li><a href="#diagnostic" data-glide="">Trouver mon soin</a></li>
              <li><a href="#offres" data-glide="">Les offres</a></li>
              <li><a href="#questions" data-glide="">Vos questions</a></li>
            </ul>
          </div>
          <div>
            <p className="fc-t">Les soins</p>
            <ul>
              {products.map((p) => <li key={p.slug}><a href={`/soins/${p.slug}`}>{p.name.fr}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="fc-t">Conseils peau</p>
            <ul>
              {problemPages.map((p) => <li key={p.slug}><a href={`/${p.slug}`}>{p.label}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="fc-t">OTAGE</p>
            <ul>
              {trustPages.map((p) => <li key={p.path}><a href={p.path}>{p.label}</a></li>)}
              <li><a href="/ar" lang="ar" dir="rtl">العربية</a></li>
            </ul>
          </div>
          <div>
            <p className="fc-t">Nous suivre</p>
            <ul>
              <li><a href={site.instagram.url} target="_blank" rel="noopener" className="fc-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" /></svg><span>{site.instagram.handle}</span></a></li>
              <li><a href="#" target="_blank" rel="noopener" className="fc-ic foot-wa" hidden><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" /></svg><span>WhatsApp</span></a></li>
            </ul>
          </div>
          <div>
            <p className="fc-t">Nos engagements</p>
            <ul className="fc-plain">
              <li>Fabriqué au Maroc</li>
              <li>Livraison offerte</li>
              <li>Paiement à la livraison</li>
            </ul>
          </div>
        </nav>
      </div>
      <p className="foot-about">OTAGE est une marque marocaine de cosmétique naturelle. Sa gamme anti-taches réunit 4 soins fabriqués au Maroc : un gel nettoyant, un sérum anti-taches, une crème anti-taches et un écran solaire SPF 50, pour atténuer les taches pigmentaires et l'hyperpigmentation, puis éviter qu'elles reviennent. OTAGE propose aussi un sérum contour des yeux pour les cernes. Livraison offerte partout au Maroc, paiement à la livraison.</p>
      <div className="foot-word" aria-hidden="true"></div>
      <p className="foot-legal">© <span data-year="" suppressHydrationWarning>{new Date().getFullYear()}</span> OTAGE. Des soins honnêtes, fabriqués au Maroc. <span className="foot-upd">Mis à jour le <time dateTime={site.updated}>{formatDate(site.updated, "fr")}</time>.</span></p>
    </footer>
  );
}
