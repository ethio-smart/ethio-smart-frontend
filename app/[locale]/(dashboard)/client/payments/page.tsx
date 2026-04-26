import PaymentHistory from "@/app/components/dashboard/client/payment/PaymentHistory";


export default function PaymentsPage() {
  return (
    <div className="space-y-6 p-6">

      <div>
        <h1 className="text-2xl font-bold">
          Payment History & Spending Trends
        </h1>
        <p className="text-muted-foreground text-sm">
          Monitor your service expenditures and manage escrow payments securely.
        </p>
      </div>

     
      <PaymentHistory />

    </div>
  )
}