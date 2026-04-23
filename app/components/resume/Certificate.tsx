import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, Calendar } from 'lucide-react'


function Certificate() {
  return (
   <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
           <Award size={20} />
              Certificate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-2 border-gray-400 pl-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">Technical Diploma in Electrical Engineering</h3>
                  <p className="text-gray-600">Addis Ababa Technical College</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  2015 - 2018
                </div>
              </div>
            </div>

            <div className="border-l-2 border-gray-400 pl-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">Certificate in Plumbing & Pipe Fitting</h3>
                  <p className="text-gray-600">Ethiopian Vocational Training Institute</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  2017
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
  )
}

export default Certificate