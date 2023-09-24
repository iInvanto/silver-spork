import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 255 })
  name: string;

  @ApiProperty()
  @Column({ length: 255 })
  email: string;

  @ApiProperty()
  @Column({ length: 255 })
  password: string;
}
