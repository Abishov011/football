import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from './club.entity';
import { Nation } from './nation.entity';

export enum PlayerLeg {
  RIGHT = 'right',
  LEFT = 'left',
}

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ name: 'player_number', nullable: true })
  playerNumber: number;

  @Column({ name: 'weekly_salary', type: 'numeric', nullable: true })
  weekleySalary: number;

  @Column({ name: 'transfer_price', type: 'numeric' })
  transferPrice: number;

  @Column({ nullable: true })
  playerImgUrl: string;

  @Column({ enum: PlayerLeg, type: 'enum' })
  leg: PlayerLeg;

  @ManyToOne(() => Club, (club) => club.players, { onDelete: 'CASCADE' })
  club: Club;

  @ManyToOne(() => Nation, (nation) => nation.players, { onDelete: 'CASCADE' })
  nation: Nation;
}
