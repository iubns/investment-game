import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "text" })
  name: string

  @Column({ type: "int" })
  yearOfBirth: number
}
