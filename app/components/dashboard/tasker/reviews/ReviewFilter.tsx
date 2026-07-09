import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

interface ReviewFiltersProps {
  ratingFilter: number | null;
  setRatingFilter: (rating: number | null) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const ReviewFilters = ({
  ratingFilter,
  setRatingFilter,
  sortBy,
  setSortBy,
}: ReviewFiltersProps) => {
  return (
    <div className="flex justify-between flex-wrap gap-3">
      
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={!ratingFilter ? "default" : "outline"}
          onClick={() => setRatingFilter(null)}
        >
          All
        </Button>

        {[5, 4, 3, 2, 1].map((star) => (
          <Button
            key={star}
            variant={ratingFilter === star ? "default" : "outline"}
            onClick={() => setRatingFilter(star)}
          >
            {star}★
          </Button>
        ))}
      </div>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="highest">Highest</SelectItem>
        </SelectContent>
      </Select>

    </div>
  )
}