import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type LanguageProps = {
  languages: string[]
}

function Language({ languages }: LanguageProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-4">
          {languages?.length ? (
            languages.map((lang, index) => (
              <Badge
                key={index}
                className="bg-neutral-100 text-black"
                variant="outline"
              >
                {lang}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No languages listed
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Language