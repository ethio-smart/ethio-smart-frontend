import axios from "axios"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL 

export const api = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
//
api.interceptors.request.use((config) => {
  // localStorage is only available in the browser.
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})