export default function PaymentSummary() {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <h4 className="font-bold">Payment Summary</h4>
      <div className="flex justify-between text-gray-600">
        <span>Service Fee</span> <span>$120.00</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Parts & Materials</span> <span>$45.00</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Tax</span> <span>$13.20</span>
      </div>
      <hr />
      <div className="flex justify-between font-bold text-lg">
        <span>Total Amount</span> <span>$178.20</span>
      </div>
      
      
    </div>
  )
}