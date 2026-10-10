import ReviewsPage, { reviewsMetadata } from "@/templates/ReviewsPage";

export const metadata = reviewsMetadata("fr");

export default function Page() {
  return <ReviewsPage locale="fr" />;
}
