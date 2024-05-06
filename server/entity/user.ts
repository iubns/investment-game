import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryColumn("uuid")
  id: string

  @Column({ type: "text" })
  name: string

  @Column({ type: "int" })
  yearOfBirth: number
}
