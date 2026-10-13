/* Outils communs aux îlots de l'accueil.
   TXT : textes de l'interface dans la langue de la page (src/home/text-js.ts).
   RTL : page en arabe, lecture de droite à gauche. D vaut -1 en RTL : il inverse les déplacements horizontaux. */
export const shared = (cfg) => {
  const RTL = cfg.rtl;
  const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
  /* distance entre le début de la piste (gauche en LTR, droite en RTL) et le début d'un élément */
  const startGap = (track, item) => {
    const cs = getComputedStyle(track), tr = track.getBoundingClientRect(), ir = item.getBoundingClientRect();
    return RTL ? (tr.right - parseFloat(cs.paddingRight)) - ir.right : ir.left - (tr.left + parseFloat(cs.paddingLeft));
  };
  return { TXT: cfg.t, RTL, D: RTL ? -1 : 1, fill, startGap };
};
