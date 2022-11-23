import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClubsTrophie } from './club-trophie.entity';
import { Club } from './club.entity';
import { NationTrophie } from './nation-trophie.entity';
import { Nation } from './nation.entity';

@Entity('trophies')
export class Trophie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cup: string;

  @OneToMany(() => ClubsTrophie, (clubsTrophie) => clubsTrophie.trophie)
  clubsTrophies: ClubsTrophie[];

  @OneToMany(() => NationTrophie, (nationTrophie) => nationTrophie.trophie)
  nationTrophies: NationTrophie[];
}
