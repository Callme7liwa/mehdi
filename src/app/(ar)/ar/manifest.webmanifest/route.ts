/* Manifeste en arabe, déclaré par les layouts des pages /ar. */
export const dynamic = "force-static";

export function GET() {
  const manifest = {
    name: "أوتاج للعناية بالبشرة (OTAGE)، عناية ضد البقع مصنوعة في المغرب",
    short_name: "OTAGE",
    lang: "ar-MA",
    dir: "rtl",
    start_url: "/ar",
    display: "browser",
    background_color: "#f7efe6",
    theme_color: "#4a0d16",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
  return new Response(JSON.stringify(manifest), { headers: { "Content-Type": "application/manifest+json; charset=utf-8" } });
}
