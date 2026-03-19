
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"




export default function AccountDetailsForm() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>
          Update your personal information and contact details.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="grid grid-cols-2 gap-4">
          <Input placeholder=" Fname" defaultValue="Alex " />
          <Input placeholder=" Lname" defaultValue="Johnson " />
          <Input placeholder="Location" defaultValue="San Francisco, CA" />
          <Input placeholder="Email" defaultValue="alex.j@premium.design" />
          <Input placeholder="Phone" defaultValue="+2519 012-3456" />
        </div>

        {/* <Separator/> */}
      </CardContent>
    </Card>
  )
}