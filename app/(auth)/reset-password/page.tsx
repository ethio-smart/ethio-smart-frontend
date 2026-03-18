'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react'
import Link from 'next/link'


function ResetPassword() {
     const [showPassword, setShowPassword] = useState(false)
  return (
     <div className="min-h-screen w-full flex items-center justify-center bg-muted">
        <Link
        href="/verify-otp"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="w-full max-w-lg rounded-2xl bg-background p-8 shadow-lg">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Reset Your Password
          </h1>
        </div>

        {/* Form */}
        <form className="space-y-5">
         
            <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-9 pr-10 py-5 shadow-none border-2 focus:border-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <Eye className="h-4 w-4 cursor-pointer" />
                ) : (
                  <EyeOff className="h-4 w-4 cursor-pointer" />
                )}
              </button>
            </div>
          </div>
            <div className="space-y-2">
            <Label htmlFor="password">Coonfirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="confirm your password"
                className="pl-9 pr-10 py-5 shadow-none border-2 focus:border-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <Eye className="h-4 w-4 cursor-pointer" />
                ) : (
                  <EyeOff className="h-4 w-4 cursor-pointer" />
                )}
              </button>
            </div>
          </div>
        
           {/* Submit */}
        
               <Link href={'/'}>  <Button type="submit" className="w-full py-5">Continue</Button></Link>  
          
          

        </form>

       
      </div>
    </div>
  )
}

export default ResetPassword