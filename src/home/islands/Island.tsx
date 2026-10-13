"use client";

/* Un îlot : le script d'une section de l'accueil (src/home/islands/<nom>.js).
   Le HTML de la section est rendu par le serveur ; l'îlot le rend seulement interactif. Il n'affiche rien lui-même. */
import { useEffect } from "react";
import { start, type IslandName } from "./loader";

export default function Island({ name }: { name: IslandName }) {
  useEffect(() => start(name), [name]);
  return null;
}
