import type { HomeText } from "../text";

export default function Gallery({ t }: { t: HomeText }) {
  return (
    <section className="ogs" id="ingredients" aria-labelledby="ogs-title">
      <div className="ogs-in">
        <h2 id="ogs-title">{t.galleryCeQuiFaitLa}</h2>
        <div className="og" aria-label={t.galleryLeProduitEnPhotos}>
              <div className="og-track" tabIndex={0}></div>
              <div className="og-dots" aria-hidden="true"></div>
            </div>
      </div>
    </section>
  );
}
