import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Phone } from 'lucide-react'
import Link from 'next/link'


function ForgotPassword() {
  return (
     <div className="min-h-screen w-full flex items-center justify-center bg-muted">
        <Link
        href="/sign-in"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="w-full max-w-lg rounded-2xl bg-background p-8 shadow-lg">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Forgot Your Password
          </h1>
        </div>

        {/* Form */}
        <form className="space-y-5">
         
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number or Email</Label>
              <div className="relative">
                {/* <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" /> */}
                <Input
                  id="phone"
                  type="tel"
                  placeholder=""
                  className="pl-9 py-5 shadow-none focus:border-primary border-2"
                />
              </div>
            </div>
        
           {/* Submit */}
          
            <Link href={'/verify-otp'}><Button type="submit" className="w-full py-5">Submit </Button></Link>       
          
        
        </form>

       
      </div>
    </div>
  )
}

export default ForgotPassword