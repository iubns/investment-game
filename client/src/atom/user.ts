import { atom } from "recoil"
import { User } from "@entity/user"

export const UserAtom = atom<User>({
  key: "user-data",
  default: undefined,
})
