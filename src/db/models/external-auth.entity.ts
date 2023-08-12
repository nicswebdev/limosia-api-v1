import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from './users.entity';

@Entity('external_auths')
export class ExternalAuth {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: Users })
  @ManyToOne(() => Users, (users) => users.external_auth, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column()
  user_id: number;

  @ApiProperty()
  @Column()
  provider_user_id: number;

  @ApiProperty()
  @Column()
  provider_name: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  @Column({ default: false })
  delete_row: boolean;
}
