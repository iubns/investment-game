"use client"

import { checkJWT } from "@/api/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UserAtom } from "@/atom/user"
import { useSetRecoilState } from "recoil"
import { decodeToken } from "react-jwt"

export default function Index() {
  const { push } = useRouter()
  const setUserInfo = useSetRecoilState(UserAtom)

  useEffect(() => {
    checkUserToken()
  }, [])

  async function checkUserToken() {
    const jwtToken = localStorage.getItem("jwtToken")
    console.log("jwtToken", jwtToken)
    if (!jwtToken) {
      push("/login")
      return
    }

    const { data } = await checkJWT(jwtToken)
    const isValidToken = data.result
    if (!isValidToken) {
      localStorage.removeItem("jwtToken")
      push("/login")
      return
    }

    setUserInfo(decodeToken(jwtToken) as any)
    push("/home")
  }
  return <div></div>
}
