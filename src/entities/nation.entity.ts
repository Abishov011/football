import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NationTrophie } from './nation-trophie.entity';
import { Player } from './player.entity';
import { Trophie } from './trophie.entity';

@Entity('nationals')
export class Nation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @OneToOne(() => Player)
  @JoinColumn()
  captain: Player;

  @OneToMany(() => Player, (player) => player.nation)
  players: Player[];

  @OneToMany(() => NationTrophie, (nationTrophie) => nationTrophie.nation, {
    cascade: true,
  })
  nationTrophies: NationTrophie[];
}
