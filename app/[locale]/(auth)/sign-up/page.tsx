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
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { useRouter } from "next/navigation"
import { setLoading, setEmail } from "@/app/store/slices/authSlice"
import { api } from "@/app/utils/axiosinstance"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"

// Validation functions
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string) => {
  // Ethiopian phone number validation
  // Accepts formats: +2519XXXXXXXX, 09XXXXXXXX, 9XXXXXXXX
  const ethiopianPhoneRegex = /^(\+251|0)?9[0-9]{8}$/;
  
  // Remove all non-digit characters for validation
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it matches Ethiopian format and has correct length
  return ethiopianPhoneRegex.test(cleanPhone) || 
         (cleanPhone.startsWith('2519') && cleanPhone.length === 12) ||
         (cleanPhone.startsWith('09') && cleanPhone.length === 10) ||
         (cleanPhone.startsWith('9') && cleanPhone.length === 9);
};

const validatePassword = (password: string) => {
  return password.length >= 8;
};

const validateName = (name: string) => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

function SignUp() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const loading = useAppSelector((state) => state.auth.loading)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  })

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  })

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    };

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = "First name must be at least 2 characters and contain only letters";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = "Last name must be at least 2 characters and contain only letters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid Ethiopian phone number (e.g., 09XXXXXXXX, +2519XXXXXXXX, or 9XXXXXXXX)";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Clear error for this field when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      dispatch(setLoading(true))
      const res = await api.post("/auth/signup", formData)
      console.log('signup response')

      if (res.status === 201) {
        // store email for OTP verification
        dispatch(setEmail(formData.email))

        router.push("/verify-otp")
      }
    } catch (error: any) {
      console.error(error)
      
      // Handle API validation errors
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        setErrors((prev) => ({
          ...prev,
          ...apiErrors,
        }));
      } else if (error.response?.data?.message) {
        // Handle general API error messages
        const errorMessage = error.response.data.message;
        if (errorMessage.toLowerCase().includes('email')) {
          setErrors((prev) => ({ ...prev, email: errorMessage }));
        } else if (errorMessage.toLowerCase().includes('phone')) {
          setErrors((prev) => ({ ...prev, phone: errorMessage }));
        } else {
          // You could add a general error state here if needed
          console.error('Signup error:', errorMessage);
        }
      }
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
                className={`pl-9 py-5 border-2 shadow-none focus:border-primary ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.firstName && (
              <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4" />
                {errors.firstName}
              </div>
            )}
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
                className={`pl-9 py-5 border-2 shadow-none focus:border-primary ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.lastName && (
              <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4" />
                {errors.lastName}
              </div>
            )}
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
                className={`pl-9 py-5 border-2 shadow-none focus:border-primary ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4" />
                {errors.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                placeholder="09XXXXXXXX or +2519XXXXXXXX"
                onChange={handleChange}
                className={`pl-9 py-5 border-2 shadow-none focus:border-primary ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.phone && (
              <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4" />
                {errors.phone}
              </div>
            )}
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
                className={`pl-9 pr-9 border-2 shadow-none py-5 focus:border-primary ${
                  errors.password ? "border-red-500" : ""
                }`}
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
            {errors.password && (
              <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4" />
                {errors.password}
              </div>
            )}
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