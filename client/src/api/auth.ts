import axios from "@/config/axios"

export function login(userName: string, yearOfBirth: number) {
  return axios.post<{ jwtToken: string }>("/auth/login", {
    userName,
    yearOfBirth,
  })
}

export function checkJWT(jwtToken: string) {
  return axios.get<{ result: boolean }>("/auth/check-token", {
    params: { jwtToken: jwtToken },
  })
}
