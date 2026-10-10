import ReviewsPage, { reviewsMetadata } from "@/templates/ReviewsPage";

export const metadata = reviewsMetadata("ar");

export default function Page() {
  return <ReviewsPage locale="ar" />;
}
