/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Phone, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { setUser, setEmail, setLoading, fetchUser } from "@/app/store/slices/authSlice"
import { api } from "@/app/utils/axiosinstance"
import { validateEmail, validatePhoneET, validatePassword } from "@/app/utils/validation"
import { registerDeviceToken } from "@/app/store/slices/notificationSlice"
import useFCM from "@/app/hooks/useFCM"
import { useLocale } from "next-intl"

function SignIn() {
  const dispatch = useAppDispatch()
  const router = useRouter() 
  const loading = useAppSelector((state) => state.auth.loading)
  const {errornotification} = useAppSelector((state) => state.notification)
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmailInput] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("")
  const currentPath = window.location.pathname;
    const locale=useLocale()
  
  // console.log('notification error', errornotification)

  useEffect(() => {
    // dispatch(setError(""))
    setError("")
    dispatch(setLoading(false))

  }, [dispatch])
  const { fcmToken} = useFCM(); 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // dispatch(setError("")) 
    setError("")
    // Validation
    let errorMessage: string | null = null

    if (authMethod === "email") {
      errorMessage = validateEmail(email)
    } else {
      errorMessage = validatePhoneET(phone)
    }

    if (!errorMessage) {
      errorMessage = validatePassword(password)
    }

    if (errorMessage) {
      // dispatch(setError(errorMessage))
      setError(errorMessage)
      return
    }
   

    dispatch(setLoading(true))
    try {
      const res = await api.post("/auth/login", {
        identifier: authMethod === "email" ? email : phone,
        password,
      })
      
      const { user, access_token } = res.data

      dispatch(setUser(user))
      dispatch(setEmail(user.email || ""))

      // localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("accessToken", access_token)
      await dispatch(fetchUser())
  
     console.log('fcm token from signinpage',fcmToken)
    if (fcmToken) {
      console.log('fcm🙄🙄🙄🙄🙄🙄🙄🙄')
  await dispatch(
    registerDeviceToken({
      token: fcmToken,
      platform: "WEB",
    })
  );
}

      // Role routing
    if (user.role === "USER" && currentPath !== "/") {
        router.push("/")
      } else if (user.role === "TASKER") {
        router.push(`/${locale}/tasker/dashboard`)
      } else if (user.role === "SUPER_ADMIN" || user.role === "SYSTEM_ADMIN") {
        router.push(`/${locale}/admin/dashboard`)
      } else {
        router.push("/")
      }

    } catch (err: any) {
      // dispatch(setError(err?.response?.data?.message || "Login failed"))
      setError(err?.response?.data?.message || "Login failed")

    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted">
      <Link
        href="/"
        className={`absolute top-6 left-6 inline-flex items-center gap-2 text-sm transition-colors ${
          loading 
            ? "text-muted-foreground/50 cursor-not-allowed" 
            : "text-muted-foreground hover:text-primary"
        }`}
        aria-disabled={loading}
        tabIndex={loading ? -1 : undefined}
      >
        <ArrowLeft className={`h-4 w-4 ${loading ? "opacity-50" : ""}`} />
        Back
      </Link>

      <div className="w-full max-w-lg rounded-2xl bg-background p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {authMethod === "email" ? (
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-9 py-5 border-2 shadow-none focus:border-primary"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="pl-9 py-5 border-2 shadow-none focus:border-primary"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-9 pr-10 py-5 shadow-none border-2 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4 cursor-pointer" /> : <Eye className="h-4 w-4 cursor-pointer" />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full py-5" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => {
              setAuthMethod((prev) => (prev === "phone" ? "email" : "phone"));
              setError(null);
            }}
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
          <Link href="/sign-up" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn