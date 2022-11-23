import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from './club.entity';
import { Trophie } from './trophie.entity';

@Entity({ name: 'clubs_trophie' })
export class ClubsTrophie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Club, (club) => club.clubsTrophies)
  club: Club;

  @ManyToOne(() => Trophie, (trophie) => trophie.clubsTrophies)
  trophie: Trophie;
}
