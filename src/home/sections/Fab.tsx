import type { HomeText } from "../text";
import { gamme } from "@/data/products";

export default function Fab({ t }: { t: HomeText }) {
  return (
    <div className="fab" aria-hidden="true">
      <span className="fab-pics" aria-hidden="true"></span>
      <span className="fab-txt"><b>{t.fabLaRoutineAntiTaches}</b><span>{t.fabObjections}</span></span>
      <a href="#offres" className="o-btn o-primary o-md fab-go" data-order="" tabIndex={-1}><span className="o-lbl">{t.fabCommander}{gamme.formats.petit.price}{t.fabDh}</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></a>
    </div>
  );
}
