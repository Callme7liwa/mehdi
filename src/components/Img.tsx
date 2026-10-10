import NextImage, { type ImageProps } from "next/image";
import blur from "@/data/blur.json";

/** next/image avec la qualité du site (85) : mêmes dimensions et alt que les images d'origine.
    Les grandes photos affichent un aperçu flou pendant leur chargement (src/data/blur.json, généré par `npm run blur`). */
export default function Img(props: ImageProps) {
  const preview = typeof props.src === "string" ? (blur as Record<string, string>)[props.src] : undefined;
  return <NextImage quality={85} {...(preview ? { placeholder: "blur" as const, blurDataURL: preview } : {})} {...props} />;
}
