import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function VerificationStatus() {
  return (
    <Card className="bg-secondary shadow-none">
      <CardHeader>
        <CardTitle>Verification Status</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <Item
          title="Identity Verified"
          desc="Verified on March 15, 2022"
        />

        <Item
          title="Payment Method Verified"
          desc=""
        />
      </CardContent>
    </Card>
  )
}

function Item({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  )
}