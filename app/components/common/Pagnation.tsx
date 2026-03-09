"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination"

type AppPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function AppPagination({
  currentPage,
  totalPages,
  onPageChange,
}: AppPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <Pagination>
      <PaginationContent>

        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            className="px-2  [&>span]:hidden border"
            onClick={() =>
              onPageChange(Math.max(currentPage - 1, 1))
            }
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1
          const isActive = currentPage === page

          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                className={
                  isActive
                    ? "bg-primary text-white hover:bg-primary"
                    : ""
                }
                isActive={isActive}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
          
            className="px-2  [&>span]:hidden border"
            onClick={() =>
              onPageChange(
                Math.min(currentPage + 1, totalPages)
              )
            }
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}