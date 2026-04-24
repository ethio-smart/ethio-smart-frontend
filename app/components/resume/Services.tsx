import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


function Services() {
  return (
    <Card className="mb-8">
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {/* <div className="space-y-2"> */}
            
                {/* <div className="flex flex-wrap gap-2"> */}
                  <Badge className='bg-neutral-100' variant="outline">Electrical Work</Badge>
                  <Badge className='bg-neutral-100 text-black' variant={'outline'}>Plumbing</Badge>
                  <Badge className='bg-neutral-100 text-black' variant={'outline'}>Home Repair</Badge>
                  <Badge className='bg-neutral-100 text-black' variant={'outline'}>Maintenance</Badge>
                  <Badge className='bg-neutral-100 text-black' variant={'outline'}>Deep Cleaning</Badge>
                  <Badge className='bg-neutral-100 text-black' variant={'outline'}>Home Repair</Badge>
                  <Badge className='bg-neutral-100 text-black' variant={'outline'}>Maintenance</Badge>
                  <Badge className='bg-neutral-100 text-black' variant={'outline'}>Deep Cleaning</Badge>
                </div>
              {/* </div> */}
            
            {/* </div> */}
          </CardContent>
        </Card>
  )
}

export default Services