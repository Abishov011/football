import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClubsTrophie } from './club-trophie.entity';
import { Player } from './player.entity';

@Entity('clubs')
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'founding_date' })
  foundingDate: Date;

  @Column()
  president: string;

  @OneToMany(() => Player, (player) => player.club)
  players: Player[];

  @Column({ nullable: true })
  clubImgUrl: string;

  @OneToOne(() => Player)
  @JoinColumn()
  captain: Player;

  @OneToMany(() => ClubsTrophie, (clubsTrophie) => clubsTrophie.club)
  clubsTrophies: ClubsTrophie[];
}
