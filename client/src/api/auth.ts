import axios from "@/config/axios"

export function login(userName: string, yearOfBirth: number) {
  axios.post("/auth/login", {
    userName,
    yearOfBirth,
  })
}
