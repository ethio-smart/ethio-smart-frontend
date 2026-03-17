// Name validation
export const validateName = (name: string) => {
  if (!name.trim()) return "Name is required"
  if (name.length < 2) return "Name must be at least 2 characters"
  if (name.length > 50) return "Name must be less than 50 characters"
  if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters"
  return null
}

// Email validation
export const validateEmail = (email: string) => {
  if (!email.trim()) return "Email is required"

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) return "Invalid email format"

  return null
}

//  phone validation
export const validatePhoneET = (phone: string) => {
  if (!phone.trim()) return "Phone number is required"

  const regex = /^(?:\+2519\d{8}|09\d{8})$/
  if (!regex.test(phone)) return "Enter a valid  phone number"

  return null
}

//  phone numbers to +251 format
export const normalizePhoneET = (phone: string) => {
  if (phone.startsWith("09")) {
    return "+251" + phone.slice(1)
  }
  return phone
}

// Password validation
export const validatePassword = (password: string) => {
  if (!password) return "Password is required"
  if (password.length < 6) return "Password must be at least 6 characters"
  return null
}

