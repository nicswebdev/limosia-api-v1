import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-roles.entity';
import { Guests } from './guests.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ExternalAuth } from './external-auth.entity';
import { Order } from './orders.entity';

@Entity()
export class Users {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  f_name: string;

  @ApiProperty()
  @Column()
  l_name: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  @Column({ default: false })
  delete_row: boolean;

  @ApiProperty()
  @OneToOne(() => Guests, (guest) => guest.user)
  guest: Guests | number;

  @ApiProperty()
  @OneToOne(() => UserRole, (user_role) => user_role.user)
  user_role: UserRole | number;

  @ApiProperty()
  @OneToOne(() => ExternalAuth, (external_auth) => external_auth.user)
  external_auth: ExternalAuth | number;

  @OneToOne(() => Order, (order) => order.user)
  order: Order | number;

  @BeforeInsert()
  async setHashedPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }
}
