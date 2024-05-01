import dayjs from "dayjs"

export default function Login() {
  const START_YEAR = 1970
  const THIS_YEAR = dayjs().year()
  const AGE_GAP = 18
  return (
    <div className="flex flex-col row gap-6 ">
      <div className="flex gap-6">
        <div>이름</div>
        <input />
      </div>
      <div className="flex gap-6">
        <div>출생년도</div>
        <select>
          {new Array(THIS_YEAR - AGE_GAP - START_YEAR)
            .fill(0)
            .map((_, index) => (
              <option key={index} value={START_YEAR + index}>
                {START_YEAR + index}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}
