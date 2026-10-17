/* Schémas des guides conseils : SVG inline, légers, accessibles (role="img", titre et description), aux couleurs du site.
   Des dessins, jamais des photos de lésions. Chaque schéma reprend une source déjà citée dans la page (légende).
   Deux variantes par schéma, choisies en CSS (site.css, .guide-fig) :
   - large (640 unités de large), à partir de 720 px d'écran, où elle s'affiche à sa taille réelle : textes de 12,5 px et plus ;
   - simplifiée (360 unités), sous 720 px : moins de libellés, textes de 16 unités au moins, soit 12,8 px et plus dès
     320 px d'écran ; sa légende porte ce que le dessin ne dit plus.
   La variante masquée (display: none) n'est ni affichée ni lue par les lecteurs d'écran.
   Utilisés par le bloc { figure } de src/data/problems.ts. */

export type FigureKey = "abcde" | "taches" | "ecran";

const INK = "#4a0d16", RED = "#d42235", SKIN = "#f1dccb", SPOT = "#7b4a2c", SPOT_DARK = "#3a1d12";
const label = { fill: INK, fontSize: 15, fontWeight: 700, textAnchor: "middle" as const };
const small = { fill: INK, fontSize: 12.5, textAnchor: "middle" as const, opacity: 0.8 };
/** Variante simplifiée : jamais moins de 16 unités. */
const labelM = { fill: INK, fontSize: 18, fontWeight: 700 };
const smallM = { fill: INK, fontSize: 16, opacity: 0.85 };

/* ------------------------------------------------------------------ règle ABCDE (AAD) */

/** Les cinq taches de la règle ABCDE, aux coordonnées de la variante large (colonnes de 128 unités, centres en y = 92). */
function AbcdeSpots() {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={64 + i * 128} cy={92} r={50} fill={SKIN} />)}
      {/* A : asymétrique */}
      <path d="M44 88 C40 66 62 60 74 72 C90 86 96 108 74 116 C60 121 46 108 44 88 Z" fill={SPOT} />
      {/* B : bords irréguliers */}
      <path d="M192 70 L200 76 L210 68 L214 80 L226 82 L218 92 L228 102 L214 104 L212 116 L200 108 L190 116 L188 104 L174 100 L184 92 L174 80 L188 80 Z" fill={SPOT} />
      {/* C : plusieurs couleurs */}
      <circle cx={320} cy={92} r={26} fill={SPOT} />
      <circle cx={310} cy={84} r={11} fill={SPOT_DARK} />
      <circle cx={331} cy={101} r={9} fill="#b0533c" />
      <circle cx={327} cy={80} r={5} fill="#e9d2c0" />
      {/* D : plus grand qu'une gomme de crayon */}
      <circle cx={440} cy={92} r={30} fill={SPOT} />
      <circle cx={485} cy={128} r={7} fill="none" stroke={INK} strokeDasharray="3 2" />
      {/* E : évolution */}
      <circle cx={556} cy={96} r={9} fill={SPOT} />
      <path d="M570 96 h12 m-5 -5 l5 5 l-5 5" stroke={INK} strokeWidth={2} fill="none" />
      <circle cx={600} cy={96} r={16} fill={SPOT} />
    </>
  );
}
const ABCDE = [
  { l: "A", t: "Asymétrie", s: "2 moitiés différentes" },
  { l: "B", t: "Bords", s: "irréguliers, flous" },
  { l: "C", t: "Couleur", s: "plusieurs teintes" },
  { l: "D", t: "Diamètre", s: "plus grand qu'une gomme" },
  { l: "E", t: "Évolution", s: "elle change" },
];
const abcdeDesc = "Cinq dessins de taches, chacun montrant un signe d'alerte : A, une tache asymétrique ; B, une tache aux bords irréguliers ; C, une tache de plusieurs couleurs ; D, une tache plus grande qu'une gomme de crayon ; E, une tache qui grandit avec le temps.";

function Abcde() {
  return (
    <svg className="fig-d" viewBox="0 0 640 210" role="img" aria-labelledby="fig-abcde-t fig-abcde-d">
      <title id="fig-abcde-t">La règle ABCDE</title>
      <desc id="fig-abcde-d">{abcdeDesc}</desc>
      <AbcdeSpots />
      {ABCDE.map((c, i) => (
        <g key={c.l}>
          <text x={64 + i * 128} y={26} {...label} fill={RED} fontSize={22}>{c.l}</text>
          <text x={64 + i * 128} y={170} {...label}>{c.t}</text>
          <text x={64 + i * 128} y={190} {...small}>{c.s}</text>
        </g>
      ))}
    </svg>
  );
}
/** Variante simplifiée : les dessins et les lettres ; la légende donne le sens de chaque lettre. */
function AbcdeM() {
  return (
    <svg className="fig-m" viewBox="0 0 360 96" role="img" aria-labelledby="fig-abcde-m-t fig-abcde-m-d">
      <title id="fig-abcde-m-t">La règle ABCDE</title>
      <desc id="fig-abcde-m-d">{abcdeDesc}</desc>
      <g transform="translate(0 8) scale(0.5625)"><AbcdeSpots /></g>
      {ABCDE.map((c, i) => <text key={c.l} x={36 + i * 72} y={22} {...labelM} fill={RED} fontSize={20} textAnchor="middle">{c.l}</text>)}
    </svg>
  );
}

/* ------------------------------------------------------------------ tache solaire, mélasma, grain de beauté (DermNet, AAD) */

/** Les trois panneaux, aux coordonnées de la variante large (x = 20, 230 et 440 ; 180 × 140). */
function SolarPanel() {
  return (
    <>
      <rect x={20} y={20} width={180} height={140} rx={18} fill={SKIN} />
      <circle cx={110} cy={90} r={14} fill={SPOT} />
    </>
  );
}
function MelasmaPanel({ gradient }: { gradient: string }) {
  const blur = `url(#${gradient})`;
  return (
    <>
      <rect x={230} y={20} width={180} height={140} rx={18} fill={SKIN} />
      <ellipse cx={320} cy={90} rx={46} ry={58} fill="#f7e6d6" stroke={INK} strokeOpacity={0.35} />
      <ellipse cx={320} cy={50} rx={26} ry={9} fill={blur} />
      <ellipse cx={296} cy={98} rx={17} ry={13} fill={blur} />
      <ellipse cx={344} cy={98} rx={17} ry={13} fill={blur} />
      <ellipse cx={320} cy={122} rx={12} ry={5} fill={blur} />
    </>
  );
}
function MolePanel() {
  return (
    <>
      <rect x={440} y={20} width={180} height={140} rx={18} fill={SKIN} />
      <circle cx={530} cy={90} r={13} fill={SPOT_DARK} />
    </>
  );
}
function Blur({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={id}>
        <stop offset="0" stopColor={SPOT} stopOpacity={0.7} />
        <stop offset="1" stopColor={SPOT} stopOpacity={0} />
      </radialGradient>
    </defs>
  );
}
const tachesDesc = "Trois dessins. Une tache solaire : une petite tache ronde, de couleur uniforme, aux bords nets. Un visage avec un mélasma : des plaques aux contours flous, de façon symétrique sur les deux joues et le front. Un grain de beauté : une tache ronde et foncée, à surveiller selon la règle ABCDE.";

function Taches() {
  return (
    <svg className="fig-d" viewBox="0 0 640 230" role="img" aria-labelledby="fig-taches-t fig-taches-d">
      <title id="fig-taches-t">Tache solaire, mélasma ou grain de beauté</title>
      <desc id="fig-taches-d">{tachesDesc}</desc>
      <Blur id="fig-taches-flou" />
      <SolarPanel />
      <MelasmaPanel gradient="fig-taches-flou" />
      <MolePanel />
      <text x={110} y={190} {...label}>Tache solaire</text>
      <text x={110} y={210} {...small}>petite, ronde, bords nets</text>
      <text x={320} y={190} {...label}>Mélasma</text>
      <text x={320} y={210} {...small}>plaques floues, souvent symétriques</text>
      <text x={530} y={190} {...label}>Grain de beauté</text>
      <text x={530} y={210} {...small}>à surveiller : règle ABCDE</text>
    </svg>
  );
}
/** Variante simplifiée : les trois panneaux l'un sous l'autre, le nom et une ligne à droite de chacun. */
function TachesM() {
  const rows = [
    { y: 0, panel: <SolarPanel />, x: -10, t: "Tache solaire", s: "petite, ronde, bords nets" },
    { y: 96, panel: <MelasmaPanel gradient="fig-taches-m-flou" />, x: -115, t: "Mélasma", s: "plaques floues, symétriques" },
    { y: 192, panel: <MolePanel />, x: -220, t: "Grain de beauté", s: "à surveiller (ABCDE)" },
  ];
  return (
    <svg className="fig-m" viewBox="0 0 360 280" role="img" aria-labelledby="fig-taches-m-t fig-taches-m-d">
      <title id="fig-taches-m-t">Tache solaire, mélasma ou grain de beauté</title>
      <desc id="fig-taches-m-d">{tachesDesc}</desc>
      <Blur id="fig-taches-m-flou" />
      {rows.map((r) => (
        <g key={r.t}>
          <g transform={`translate(${r.x} ${r.y - 2}) scale(0.5)`}>{r.panel}</g>
          <text x={108} y={r.y + 34} {...labelM}>{r.t}</text>
          <text x={108} y={r.y + 58} {...smallM}>{r.s}</text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ quantité d'écran solaire pour le visage (AAD) */

/** Le visage et ses cinq points d'écran, aux coordonnées de la variante large (centre x = 170, y = 110). */
function Face() {
  return (
    <>
      <ellipse cx={170} cy={110} rx={70} ry={88} fill={SKIN} stroke={INK} strokeOpacity={0.35} />
      <ellipse cx={98} cy={112} rx={8} ry={16} fill={SKIN} stroke={INK} strokeOpacity={0.35} />
      <ellipse cx={242} cy={112} rx={8} ry={16} fill={SKIN} stroke={INK} strokeOpacity={0.35} />
      {[[170, 52], [128, 112], [212, 112], [170, 110], [170, 168]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={8} fill="#fff" stroke={INK} strokeWidth={1.5} />)}
    </>
  );
}
const ecranDesc = "Un visage avec cinq points d'écran solaire : front, deux joues, nez et menton, avec un rappel pour le cou et les oreilles. Deux doigts, l'index et le majeur, recouverts d'une ligne d'écran sur toute leur longueur : c'est à peu près une cuillère à café, la quantité minimale conseillée pour le visage.";

function Ecran() {
  return (
    <svg className="fig-d" viewBox="0 0 640 240" role="img" aria-labelledby="fig-ecran-t fig-ecran-d">
      <title id="fig-ecran-t">Quelle quantité d'écran solaire pour le visage</title>
      <desc id="fig-ecran-d">{ecranDesc}</desc>
      <Face />
      <text x={170} y={226} {...small}>+ cou et oreilles</text>
      {/* deux doigts et la ligne d'écran */}
      <g transform="translate(360 40)">
        <rect x={0} y={0} width={34} height={150} rx={17} fill={SKIN} stroke={INK} strokeOpacity={0.35} />
        <rect x={42} y={10} width={34} height={140} rx={17} fill={SKIN} stroke={INK} strokeOpacity={0.35} />
        <rect x={10} y={10} width={14} height={130} rx={7} fill="#fff" stroke={INK} strokeWidth={1.5} />
        <rect x={52} y={20} width={14} height={120} rx={7} fill="#fff" stroke={INK} strokeWidth={1.5} />
      </g>
      <text x={530} y={92} {...label} fill={RED}>Au moins</text>
      <text x={530} y={114} {...label} fill={RED}>1 cuillère à café</text>
      <text x={530} y={140} {...small}>≈ la longueur</text>
      <text x={530} y={158} {...small}>de l'index et du majeur</text>
    </svg>
  );
}
/** Variante simplifiée : le visage et la quantité ; les doigts sont dans la légende. */
function EcranM() {
  return (
    <svg className="fig-m" viewBox="0 0 360 200" role="img" aria-labelledby="fig-ecran-m-t fig-ecran-m-d">
      <title id="fig-ecran-m-t">Quelle quantité d'écran solaire pour le visage</title>
      <desc id="fig-ecran-m-d">{ecranDesc}</desc>
      <g transform="translate(-55 6.5) scale(0.85)"><Face /></g>
      <text x={262} y={62} {...labelM} fill={RED} textAnchor="middle">Au moins</text>
      <text x={262} y={86} {...labelM} fill={RED} textAnchor="middle">1 cuillère</text>
      <text x={262} y={110} {...labelM} fill={RED} textAnchor="middle">à café</text>
      <text x={262} y={148} {...smallM} textAnchor="middle">+ cou</text>
      <text x={262} y={168} {...smallM} textAnchor="middle">et oreilles</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */

const FIGURES: Record<FigureKey, { svg: () => React.JSX.Element; mobile: () => React.JSX.Element; caption: string; captionMobile: string }> = {
  abcde: {
    svg: Abcde, mobile: AbcdeM,
    caption: "La règle ABCDE : un seul de ces signes suffit pour montrer la tache à un dermatologue. D'après l'Académie américaine de dermatologie.",
    captionMobile: "La règle ABCDE : A, asymétrie ; B, bords irréguliers ; C, plusieurs couleurs ; D, plus grande qu'une gomme de crayon ; E, une tache qui change. Un seul de ces signes suffit pour montrer la tache à un dermatologue. D'après l'Académie américaine de dermatologie.",
  },
  taches: {
    svg: Taches, mobile: TachesM,
    caption: "Trois taches différentes : seul un dermatologue peut confirmer de laquelle il s'agit. D'après DermNet et l'Académie américaine de dermatologie.",
    captionMobile: "Trois taches différentes : seul un dermatologue peut confirmer de laquelle il s'agit. Le mélasma est souvent symétrique ; un grain de beauté se surveille avec la règle ABCDE. D'après DermNet et l'Académie américaine de dermatologie.",
  },
  ecran: {
    svg: Ecran, mobile: EcranM,
    caption: "Pour le visage : au moins une cuillère à café d'écran solaire, soit à peu près la longueur de l'index et du majeur. D'après l'Académie américaine de dermatologie.",
    captionMobile: "Pour le visage : au moins une cuillère à café d'écran solaire, soit à peu près la longueur de l'index et du majeur, posée en points sur le front, les joues, le nez et le menton, sans oublier le cou et les oreilles. D'après l'Académie américaine de dermatologie.",
  },
};

export default function GuideFigure({ name }: { name: FigureKey }) {
  const f = FIGURES[name];
  const Svg = f.svg, Mobile = f.mobile;
  return (
    <figure className="guide-fig">
      <Svg />
      <Mobile />
      <figcaption>
        <span className="fig-d">{f.caption}</span>
        <span className="fig-m">{f.captionMobile}</span>
      </figcaption>
    </figure>
  );
}
