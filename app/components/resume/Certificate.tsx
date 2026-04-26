
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"

type CertificateProps = {
  certifications: string[]
}

function Certificate({ certifications }: CertificateProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award size={20} />
          Certificates
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {certifications?.length ? (
          certifications.map((cert, index) => (
            <div
              key={index}
              className="border-l-2 border-gray-400 pl-6"
            >
              <h3 className="font-medium text-gray-900">
                {cert}
              </h3>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No certificates available
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default Certificate