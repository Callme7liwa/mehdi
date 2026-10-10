import { notFound } from "next/navigation";
import { problemsAr } from "@/data/problems.ar";
import ProblemPage, { problemMetadata } from "@/templates/ProblemPage";

// Pages conseils peau en arabe. Textes « À relire par un natif » (src/data/problems.ar.ts).
export const dynamicParams = false;
export const generateStaticParams = () => problemsAr.map((p) => ({ problem: p.slug }));

export async function generateMetadata({ params }: PageProps<"/ar/[problem]">) {
  const { problem } = await params;
  const p = problemsAr.find((x) => x.slug === problem);
  return p ? problemMetadata(p, "ar") : {};
}

export default async function Page({ params }: PageProps<"/ar/[problem]">) {
  const { problem } = await params;
  const p = problemsAr.find((x) => x.slug === problem);
  if (!p) notFound();
  return <ProblemPage p={p} locale="ar" />;
}
