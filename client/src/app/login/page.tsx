"use client"

import { login } from "@/api/auth"
import dayjs from "dayjs"
import { useState } from "react"

export default function Login() {
  const START_YEAR = 1970
  const THIS_YEAR = dayjs().year()
  const AGE_GAP = 18
  const [userName, setUserName] = useState("")
  const [yearOfBirth, setYearOfBirth] = useState(START_YEAR)

  function onClickLogin() {
    login(userName, yearOfBirth)
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
        />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-[100px]">출생년도</div>
        <select
          className="block appearance-none 
          w-full bg-white border border-gray-200 
          text-gray-700 py-3 px-4 pr-8 rounded leading-tight 
          focus:outline-none focus:bg-gray-200 focus:border-gray-500"
          id="grid-state"
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
