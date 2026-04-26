import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Funnel } from "lucide-react"


export default function FilterSidebar() {
  return (
    <Card className="rounded-md shadow-xs">
      <CardContent className="px-6 space-y-5">
        <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg uppercase">
          Refine Search
        </h3>
        <Funnel size={18}/>
      </div>
      <div className="h-px bg-gray-200"></div>
      {/* location */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Location</p>

          <div className="flex items-center gap-2">
            <Checkbox defaultChecked />
            <span className="text-sm">Within 2km</span>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">Within 5km</span>
          </div>
        </div>
         {/* Availability */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Availability</p>

          <div className="flex items-center gap-2">
            <Checkbox defaultChecked />
            <span className="text-sm">Immediate Start</span>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">Available Today</span>
          </div>
        </div>
        {/* price */}
       <div className="space-y-3">
          <p className="text-sm font-medium">Price Range</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="min">Min</Label>
              <Input
                id="min"
                type="number"
                placeholder="0"
                min={0}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="max">Max</Label>
              <Input
                id="max"
                type="number"
                placeholder="5000"
                min={0}
              />
            </div>
          </div>
          </div>
      </CardContent>
    </Card>
  )
}