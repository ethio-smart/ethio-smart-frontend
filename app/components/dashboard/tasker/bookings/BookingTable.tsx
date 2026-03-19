'use client';

import * as React from "react";
import { DataTable, DataTableColumnDef } from "@/components/ui/data-table/DataTable";
import { Eye } from "lucide-react";
import { StatusBadge, BookingStatus } from "../StatusBadge";
import { PaymentBadge, PaymentStatus } from "../PaymentBadge";
import { TaskerButton } from "../TaskerButton";
import { EmptyState } from "../EmptyState";

export type BookingRow = {
  id: string;
  service: string;
  clientName: string;
  location: string;
  scheduledDate: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
};

export type BookingAction =
  | "accept"
  | "reject"
  | "cancel"
  | "start"
  | "complete"
  | "dispute"
  | "view";

interface BookingDataTableProps {
  bookings: BookingRow[];
  activeTab: BookingStatus;
  onAction: (action: BookingAction, booking: BookingRow) => void;
}

export const BookingTable: React.FC<BookingDataTableProps> = ({
  bookings,
  activeTab,
  onAction,
}) => {
  const filtered = React.useMemo(
    () => bookings.filter(b => b.status === activeTab),
    [bookings, activeTab]
  );

  const columns: DataTableColumnDef<BookingRow>[] = [
    {
      accessorKey: "id",
      header: "Booking ID",
      cell: ({ row }) => <span className="font-mono text-blue-600">{row.original.id}</span>,
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => <span className="font-medium text-foreground">{row.original.service}</span>,
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
            {row.original.clientName.charAt(0)}
          </div>
          <span>{row.original.clientName}</span>
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <span className="text-muted-foreground text-xs">{row.original.location}</span>,
    },
    {
      accessorKey: "scheduledDate",
      header: "Scheduled Date",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.scheduledDate}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => <PaymentBadge status={row.original.paymentStatus} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const booking = row.original;
        return (
          <div className="flex items-center gap-1">
            {activeTab === "Requests" && (
              <>
                <TaskerButton
                  tone="success"
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium"
                  onClick={() => onAction("accept", booking)}
                >
                  Accept
                </TaskerButton>
                <TaskerButton
                  tone="danger"
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium"
                  onClick={() => onAction("reject", booking)}
                >
                  Reject
                </TaskerButton>
              </>
            )}

            {activeTab === "Accepted" && (
              <>
                <TaskerButton
                  className="px-2.5 py-1.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100"
                  onClick={() => onAction("start", booking)}
                >
                  Start Job
                </TaskerButton>
                <TaskerButton
                  tone="warning"
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium"
                  onClick={() => onAction("dispute", booking)}
                >
                  Dispute
                </TaskerButton>
              </>
            )}

            {activeTab === "In Progress" && (
              <>
                <TaskerButton
                  tone="success"
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium"
                  onClick={() => onAction("complete", booking)}
                >
                  Complete
                </TaskerButton>
                <TaskerButton
                  tone="warning"
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium"
                  onClick={() => onAction("dispute", booking)}
                >
                  Dispute
                </TaskerButton>
              </>
            )}

            <TaskerButton
              tone="muted"
              size="icon"
              className="h-[30px] w-[30px] p-0 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
              onClick={() => onAction("view", booking)}
              aria-label="View booking"
              title="View booking"
            >
              <Eye className="h-3.5 w-3.5" />
            </TaskerButton>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filtered.length > 0 ? filtered : []}
      emptyState={
        filtered.length === 0 ? (
          <EmptyState
            icon={Eye}
            title={`No ${activeTab.toLowerCase()} bookings`}
          />
        ) : undefined
      }
    />
  );
};