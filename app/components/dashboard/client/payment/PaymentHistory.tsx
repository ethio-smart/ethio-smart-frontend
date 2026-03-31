"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const payments = [
  {
    id: 1,
    service: "House Cleaning",
    date: "June 24, 2024",
    tasker: "Selamawit T.",
    method: "Chapa Pay",
    amount: "ETB 1,800",
    status: "Escrow",
  },
  {
    id: 2,
    service: "Plumbing Repair",
    date: "June 20, 2024",
    tasker: "Abebe B.",
    method: "Bank Transfer",
    amount: "ETB 4,500",
    status: "Released",
  },
  {
    id: 3,
    service: "Electrical Wiring",
    date: "June 15, 2024",
    tasker: "Kaleb H.",
    method: "CBE Birr",
    amount: "ETB 12,000",
    status: "Pending",
  },
]

const statusStyles: Record<string, string> = {
  escrow: "bg-yellow-100 text-yellow-700",
  released: "bg-green-100 text-green-700",
  pending: "bg-orange-100 text-orange-700",
  refunded: "bg-red-100 text-red-700",
}

export default function PaymentHistory() {
  return (
    <div className="border rounded-lg bg-white">

      <Table>

        <TableHeader className="p-10">
          <TableRow className="p-10 font-semibold">
            <TableHead>Service</TableHead>
            <TableHead>tasker</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {payments.map((payment) => {

            const statusClass =
              statusStyles[payment.status.toLowerCase()] ??
              "bg-muted text-muted-foreground"

            return (
              <TableRow key={payment.id} >

                <TableCell className="px-4 py-2">
                  <div>
                    <p className="font-medium">{payment.service}</p>
                    <p className="text-xs text-muted-foreground">
                      {payment.date}
                    </p>
                  </div>
                </TableCell>

                <TableCell>{payment.tasker}</TableCell>

                <TableCell>{payment.method}</TableCell>

                <TableCell className="font-semibold">
                  {payment.amount}
                </TableCell>

                <TableCell>
                  <span
                    className={`text-xs px-2 py-1 rounded-md font-medium ${statusClass}`}
                  >
                    {payment.status}
                  </span>
                </TableCell>

                <TableCell className="text-green-600 cursor-pointer hover:underline">
                  Details
                </TableCell>

              </TableRow>
            )
          })}

        </TableBody>

      </Table>

    </div>
  )
}