import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ServicesProps = {
  services: string[]
}

function Services({ services }: ServicesProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Services</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-3">
          {services?.length ? (
            services.map((service, index) => (
              <Badge
                key={index}
                className="bg-neutral-100 text-black"
                variant="outline"
              >
                {service}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No services listed
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Services