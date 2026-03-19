"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { api } from "@/app/utils/axiosinstance"
import { setLoading } from "@/app/store/slices/authSlice"
import { toast } from "sonner"



function VerifyOtp() {
  const [otp, setOtp] = useState("")
  const router = useRouter()
  console.log('otp',otp)

  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.auth.loading)
  const email = useAppSelector((state) => state.auth.email)
  console.log('email',email)

  const handleVerify = async () => {
    if (otp.length !== 6) {
      // Toast
      toast.info('Enter a valid 6 digit code')
      return
    }

    try {
      dispatch(setLoading(true))

      const res = await api.post("auth/verify-signup", {
        email,
       code: otp,
      })
      console.log('response from verify otp',res)

      if (res.status === 201) {
        router.push("/")
      }
    } catch (error) {
      setOtp(' ')
      console.error('error💥💥',error)
      // toast
      toast.error('Invalid or expired OTP')
     
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-muted">
      
      <Link
        href="/sign-up"
        className="absolute top-5 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="w-full max-w-lg rounded-2xl bg-background p-8 shadow-lg space-y-5">
        <h2 className="text-2xl font-semibold">Enter Verification Code</h2>

        <p className="text-neutral-600">
          We’ve sent a 6-digit code to your email. Enter it below to verify your account.
        </p>

        <div className="space-y-10">

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup className="flex gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-14 h-14"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button
            onClick={handleVerify}
            disabled={loading}
            className="py-5 bg-primary w-full"
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>

        </div>

        <p className="text-sm text-neutral-500">
          Didn’t receive the code?{" "}
          <button className="text-primary hover:underline">
            Resend Code
          </button>
        </p>
      </div>
    </div>
  )
}

export default VerifyOtp