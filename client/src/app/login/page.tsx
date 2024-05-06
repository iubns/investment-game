"use client"

import { login } from "@/api/auth"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"

export default function Login() {
  const START_YEAR = 1970
  const THIS_YEAR = dayjs().year()
  const AGE_GAP = 18

  const { push } = useRouter()

  const [userName, setUserName] = useState("")
  const [yearOfBirth, setYearOfBirth] = useState(START_YEAR)

  async function onClickLogin() {
    const { status, data } = await login(userName, yearOfBirth)
    if (status === 200) {
      localStorage.setItem("jwtToken", data.jwtToken)
      push("/")
    }
  }

  function onChangeName(e: ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value)
  }

  function onYearOfBirth(e: ChangeEvent<HTMLSelectElement>) {
    setYearOfBirth(Number.parseInt(e.target.value))
  }

  return (
    <div className="flex flex-col row gap-6 p-4">
      <div className="flex gap-6 items-center">
        <div className="w-[100px]">이름</div>
        <input
          className="
          shadow appearance-none border 
          rounded w-full py-2 px-3
          text-gray-700 leading-tight 
           focus:outline-none focus:shadow-outline"
          id="userName"
          type="text"
          placeholder="이름"
          onChange={onChangeName}
        />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-[100px]">출생년도</div>
        <select
          id="grid-state"
          onChange={onYearOfBirth}
          className="block appearance-none 
          w-full bg-white border border-gray-200 
          text-gray-700 py-3 px-4 pr-8 rounded leading-tight 
          focus:outline-none focus:bg-gray-200 focus:border-gray-500"
        >
          {new Array(THIS_YEAR - AGE_GAP - START_YEAR)
            .fill(0)
            .map((_, index) => (
              <option key={index} value={START_YEAR + index}>
                {START_YEAR + index}
              </option>
            ))}
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClickLogin}
      >
        시작하기
      </button>
    </div>
  )
}
