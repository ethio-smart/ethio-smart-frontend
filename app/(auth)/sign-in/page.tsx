import { Phone, Lock, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SignIn() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted">
      <div className="w-full max-w-md rounded-2xl bg-background p-8 shadow-lg">
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
          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="pl-9 py-5 shadow-none focus:border-primary border-2 "
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-9 pr-9 border-2 outline-0 shadow-none py-5 focus:border-primary"
              />
              {/* implement eye off/on */}
              <EyeOff className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-muted-foreground" />
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Button
              type="button"
              variant="link"
              className="px-0 text-sm text-primary"
            >
              Forgot password?
            </Button>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
