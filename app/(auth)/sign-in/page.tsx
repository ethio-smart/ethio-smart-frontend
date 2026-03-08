"use client"

import { Phone, Lock, Eye, EyeOff, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import Link from "next/link"
import { useState } from "react"

function SignIn() {
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted">
        <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="w-full max-w-lg rounded-2xl bg-background p-8 shadow-lg">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Phone/Email input field */}
          {authMethod === "email" ? (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-9 py-5 shadow-none focus:border-primary border-2"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-9 py-5 shadow-none focus:border-primary border-2"
                />
              </div>
            </div>
          )}
          {/* Password */}
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

          {/* Forgot password */}
          <div className="text-right">
            <Button
              type="button"
              variant="link"
              className="px-0 text-sm text-primary"
            >
              <Link href={'/forgot-password'}>
                Forgot password?
              </Link>
            
            </Button>
          </div>
           {/* Submit */}
          <Button type="submit" className="w-full py-5">
            Sign In
          </Button>
          {/* other sign in methods*/}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setAuthMethod(authMethod === "phone" ? "email" : "phone")
            }
            className="w-full py-5 hover:bg-secondary border border-black"
          >
            {authMethod === "phone" ? (
              <>
                <Mail className="mr-2 h-4 w-4 text-primary" />
                Sign in with email 
              </>
            ) : (
              <>
                <Phone className="mr-2 h-4 w-4 text-primary" />
                Sign in with phone 
              </>
            )}
          </Button>

        </form>

        <p className="text-end py-4 text-sm">
          Don’t have an account?{" "}
          <Link
            className="text-primary font-medium hover:underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn