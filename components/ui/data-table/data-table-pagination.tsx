"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

interface Props<TData> {
  table: Table<TData>
}

export default function DataTablePagination<TData>({
  table
}: Props<TData>) {

  return (
    <div className="flex items-center justify-between">

      <div className="text-sm text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

    </div>
  )
}