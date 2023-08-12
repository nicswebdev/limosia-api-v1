import { IsBoolean } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class Guests {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @ApiProperty({ type: Users })
  @OneToOne(() => Users, (users) => users.guest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ApiProperty()
  @Column({
    type: 'date',
    nullable: true,
  })
  dob: Date | null;

  @ApiProperty()
  @Column({ nullable: true })
  address: string | null;

  @ApiProperty()
  @Column({ nullable: true })
  city: string | null;

  @ApiProperty()
  @Column({ nullable: true })
  state: string | null;

  @ApiProperty()
  @Column({ nullable: true })
  zip_code: string | null;

  @ApiProperty()
  @Column({ nullable: true })
  phone: string | null;

  @ApiProperty()
  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @ApiProperty()
  @Column({ default: false })
  @IsBoolean()
  @Exclude()
  delete_row: boolean;
}
