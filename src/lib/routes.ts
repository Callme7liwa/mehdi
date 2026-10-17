/* Toutes les pages du site, avec leurs images : utilisé par le sitemap et llms.txt. */
import { isIndexed, problems } from "@/data/problems";
import { hasArProblem } from "@/data/problems.ar";
import { gamme, products } from "@/data/products";
import { trustPages } from "@/data/pages";
import { abs, site } from "@/data/site";
import { OG_IMAGE } from "./seo";

export type Route = { path: string; images: string[]; priority: number; hasAr: boolean; indexed: boolean };

const img = (src: string) => abs(src);
const legalReady = Boolean(site.legal.raisonSociale && site.legal.formeJuridique && site.legal.ice && site.legal.rc && site.legal.adresse && site.legal.cndp);

export const routes: Route[] = [
  { path: "/", priority: 1, hasAr: true, indexed: true, images: [OG_IMAGE.src, ...gamme.photos.map((p) => p.src), ...products.map((p) => p.pack.src)].map(img) },
  { path: "/soins", priority: 0.8, hasAr: true, indexed: true, images: products.map((p) => img(p.pack.src)) },
  ...products.map((p) => ({ path: `/soins/${p.slug}`, priority: 0.9, hasAr: true, indexed: true, images: [p.hd ?? p.pack, ...p.photos].map((i) => img(i.src)) })),
  // pages conseils : indexées si approuvées (reviewed) ou publiées par l'équipe (editorial), voir pageStatus
  ...problems.map((p) => ({ path: `/${p.slug}`, priority: 0.7, hasAr: hasArProblem(p.slug), indexed: isIndexed(p), images: [img(p.image.src)] })),
  ...trustPages.map((p) => ({
    path: p.path as string,
    priority: 0.4,
    hasAr: true,
    // mentions légales et CGV : hors index tant que les informations juridiques manquent (voir site.legal, site.returns)
    indexed: p.path === "/mentions-legales" ? legalReady : p.path === "/cgv" ? legalReady && Boolean(site.legal.tribunal) : true,
    images: [],
  })),
];
