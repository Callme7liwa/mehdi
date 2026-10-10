import { notFound } from "next/navigation";
import { problemBySlug, problems } from "@/data/problems";
import ProblemPage, { problemMetadata } from "@/templates/ProblemPage";

// /taches-pigmentaires, /cernes, /taches-acne, /melasma-grossesse
export const dynamicParams = false;
export const generateStaticParams = () => problems.map((p) => ({ problem: p.slug }));

export async function generateMetadata({ params }: PageProps<"/[problem]">) {
  const p = problemBySlug((await params).problem);
  return p ? problemMetadata(p, "fr") : {};
}

export default async function Page({ params }: PageProps<"/[problem]">) {
  const p = problemBySlug((await params).problem);
  if (!p) notFound();
  return <ProblemPage p={p} locale="fr" />;
}
