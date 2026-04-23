/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchPaymentHistory } from "@/app/store/slices/paymentSlice"
import { DataTable } from "@/components/ui/data-table/DataTable"



const columns = [
  
  {
    id: "tasker",
    header: "Tasker",
    cell: ({ row }: any) => {
      const tasker = row.original.booking?.tasker
      return (
        <span>
          {/* {tasker ? : "—"} */}
        </span>
      )
    },
  },

  {
    id: "method",
    header: "Payment Method",
    cell: () => (
      <span className="text-sm text-muted-foreground">
        Chapa
      </span>
    ),
  },

  {
    id: "amount",
    header: "Amount",
    cell: ({ row }: any) => (
      <span className="font-semibold">
        ETB {row.original.amount}
      </span>
    ),
  },

  {
    id: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status: string = row.original.status

      const statusStyles: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-700",
        PAID: "bg-blue-100 text-blue-700",
        HELD: "bg-orange-100 text-orange-700",
        RELEASED: "bg-green-100 text-green-700",
        REFUNDED: "bg-red-100 text-red-700",
        FAILED: "bg-gray-100 text-gray-600",
      }

      return (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            statusStyles[status] || "bg-muted text-muted-foreground"
          }`}
        >
          {status}
        </span>
      )
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }: any) => {
      const payment = row.original

      return (
        <button
          className="text-primary hover:underline text-sm"
          onClick={() => console.log(payment)}
        >
          Details
        </button>
      )
    },
  },
]

export default function PaymentHistory() {
  const dispatch = useAppDispatch()

  const { paymentHistory, loading } = useAppSelector(
    (state) => state.payment
  )
  console.log('payment history',paymentHistory)

  useEffect(() => {
    dispatch(fetchPaymentHistory())
  }, [dispatch])

  if (loading.paymentHistory) {
    return <div className="p-6">Loading payments...</div>
  }

  if (!paymentHistory || paymentHistory.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No payment history found
      </div>
    )
  }

  return (
    <div className="border rounded-lg bg-white p-4">
      <DataTable columns={columns} data={paymentHistory} />
    </div>
  )
}