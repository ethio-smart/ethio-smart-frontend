import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


function Summary({summary}:{summary:string}) {
  return (
    <Card className="mb-8">
          <CardHeader>
            <CardTitle> Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              {summary}
            </p>
          </CardContent>
        </Card>
  )
}

export default Summary