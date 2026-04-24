import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function Summary() {
  return (
    <Card className="mb-8">
          <CardHeader>
            <CardTitle> Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Experienced and dedicated service provider with over 5 years of expertise in electrical services, 
              plumbing, and home maintenance. Committed to delivering high-quality workmanship and exceptional 
              customer service. Strong problem-solving skills and attention to detail ensure efficient and reliable 
              service delivery for residential and commercial clients.
            </p>
          </CardContent>
        </Card>
  )
}

export default Summary