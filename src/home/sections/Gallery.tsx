
export default function Gallery() {
  return (
    <section className="ogs" id="ingredients" aria-labelledby="ogs-title">
      <div className="ogs-in">
        <h2 id="ogs-title">Ce qui fait la différence.</h2>
        <div className="og" aria-label="Le produit en photos">
              <div className="og-track" tabIndex={0}></div>
              <div className="og-dots" aria-hidden="true"></div>
            </div>
      </div>
    </section>
  );
}
