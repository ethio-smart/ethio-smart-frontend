import axios from "axios"

export const api = axios.create({
  baseURL: "https://ethio-smart-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
})