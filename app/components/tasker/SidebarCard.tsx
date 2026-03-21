import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TaskerType } from "@/app/types/types"
import { FileText, SendHorizontal } from "lucide-react"


export default function SidebarCard({
  tasker,
}: {
  tasker: TaskerType
}) {
 

  return (
    <Card className="h-fit sticky top-10 shadow-none border-none md:border md:shadow" >
      <CardContent className="p-6 space-y-5 shadow-non">

        <div className="text-sm text-muted-foreground space-y-1 hidden md:block">
          <p>Status: {tasker.status}</p>
          <p>
            Match Quality: High 
          </p>
        </div>

        <Button className="w-full py-5">
          <SendHorizontal/>
          Send Request
        </Button>

        <Button variant="outline" className="w-full py-5">
          <FileText color="black"/>
          View Resume
        </Button>

      </CardContent>
    </Card>
  )
}