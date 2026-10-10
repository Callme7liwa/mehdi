"use client";

import { useEffect } from "react";
import { initHome, type HomeConfig } from "./home-init";

declare global {
  interface Window {
    __otageHome?: boolean;
  }
}

/** Lance les animations de l'accueil une fois la page affichée (une seule fois par chargement). */
export default function HomeScripts({ cfg }: { cfg: HomeConfig }) {
  useEffect(() => {
    if (window.__otageHome) return;
    window.__otageHome = true;
    initHome(cfg);
  }, [cfg]);
  return null;
}
