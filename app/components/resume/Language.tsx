import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


function Language() {
  return (
    <Card className="mb-8">
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
                <Badge className='bg-neutral-100 text-black' variant={'outline'}>Amharic</Badge>
                  <Badge className='bg-neutral-100 text-black' variant={'outline'}>English</Badge>
                  <Badge className='bg-neutral-100 text-black' variant={'outline'}>French</Badge>
             
              
            </div>
          </CardContent>
        </Card>
  )
}

export default Language