"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Index() {
  const { push } = useRouter()
  useEffect(() => {
    const userInfo = localStorage.getItem("jwt")
    if (!userInfo) {
      push("/login")
    }
  }, [])
  return <>??</>
}
