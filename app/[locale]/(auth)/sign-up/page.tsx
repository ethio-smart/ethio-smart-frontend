"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { useRouter } from "next/navigation"
import { setLoading, setEmail } from "@/app/store/slices/authSlice"
import { api } from "@/app/utils/axiosinstance"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"

function SignUp() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const loading = useAppSelector((state) => state.auth.loading)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      dispatch(setLoading(true))
      const res = await api.post("/auth/signup", formData)
      console.log('signup response')

      if (res.status === 201) {
        // store email for OTP verification
        dispatch(setEmail(formData.email))

        router.push("/verify-otp")
      }
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted">
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="w-full max-w-lg rounded-2xl bg-background p-8 shadow-lg">
        <div className="mb-4 py-4 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome To
          </h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                name="firstName"
                value={formData.firstName}
                placeholder="enter your first name"
                onChange={handleChange}
                className="pl-9 py-5 border-2 shadow-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Last Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                name="lastName"
                value={formData.lastName}
                placeholder="enter your last name"
                onChange={handleChange}
                className="pl-9 py-5 border-2 shadow-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                name="email"
                type="email"
                value={formData.email}
                placeholder="enter your email"
                onChange={handleChange}
                className="pl-9 py-5 border-2 shadow-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                placeholder="enter your phone number"
                onChange={handleChange}
                className="pl-9 py-5 border-2 shadow-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />

              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="enter your password"
                className="pl-9 pr-9 border-2 shadow-none py-5 focus:border-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <p className="text-end py-4 text-sm">
          Have an account?{" "}
          <Link
            className="text-primary font-medium hover:underline"
            href="/sign-in"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp