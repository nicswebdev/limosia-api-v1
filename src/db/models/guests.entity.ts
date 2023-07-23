import { IsBoolean, IsEmail, IsStrongPassword, Length } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Guests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 30)
  f_name: string;

  @Column()
  @Length(2, 30)
  l_name: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dob: Date | null;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip_code: string;

  @Column()
  phone: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  @Length(5, 50)
  email: string;

  @Column()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
  })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  @IsBoolean()
  delete_row: boolean;

  @BeforeInsert()
  async setHashedPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
