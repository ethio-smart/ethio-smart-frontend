import PendingReviews from "@/app/components/dashboard/client/review/PendingReviews";
import ReviewHistoryTable from "@/app/components/dashboard/client/review/ReviewHistory";


export default function Page() {
  return (
    <div className="space-y-12 px-4 py-6">
      <PendingReviews/>
      <ReviewHistoryTable />
    </div>
  )
}