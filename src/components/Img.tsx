import NextImage, { type ImageProps } from "next/image";

/** next/image avec la qualité du site (85) : mêmes dimensions et alt que les images d'origine. */
export default function Img(props: ImageProps) {
  return <NextImage quality={85} {...props} />;
}
