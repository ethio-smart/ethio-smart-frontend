import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tasker } from "@/app/types/types"
import { CheckCircle, FileText, SendHorizontal } from "lucide-react"
import Link from "next/link"


export default function SidebarCard({
  tasker,
}: {
  tasker: Tasker
}) {
 

  return (
    <Card className="h-fit sticky top-10 shadow-none border-none md:border md:shadow" >
      <CardContent className="p-6 space-y-5 shadow-non">

        <div className="text-sm  space-y-1 hidden md:block">
          <p>Status: {tasker.status}</p>
          <div className="flex items-center gap-2">
         {tasker.availability ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : (
              <CheckCircle className="text-gray-400" size={16} />
            )}
            <span>
              {tasker.availability ? "Available for work" : "Currently unavailable"}
            </span>
            </div>
        </div>

        <Button className="w-full py-5">
          <SendHorizontal/>
          Send Request
        </Button>

       
         
            <Link target="_blank" rel="noopener noreferrer" href={'/en/resume'} >
          {/* <FileText color="black"/> */}
                <Button variant="outline" className="w-full py-5">
                    View Resume
                </Button>
                    </Link>
      
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          You will only be charged after the tasker accepts your request.
        </p>

      </CardContent>
    </Card>
  )
}