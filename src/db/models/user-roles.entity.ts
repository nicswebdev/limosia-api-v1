import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Users } from './users.entity';
import { Role } from './role.entity';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_roles')
@Exclude()
export class UserRole {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @OneToOne(() => Users, (users) => users.user_role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Expose()
  user: number;

  @ApiProperty()
  @ManyToOne(() => Role, (role) => role.user_role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  @Expose()
  role: number;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
