"use client"

import { UserAtom } from "@/atom/user"
import { useRouter } from "next/navigation"
import { useRecoilValue } from "recoil"

export default function Home() {
  const userInfo = useRecoilValue(UserAtom)
  const { push } = useRouter()

  if (!userInfo) {
    push("/")
    return
  }
  return <div>{userInfo.name}님 안녕하세요!</div>
}
