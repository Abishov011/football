import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Nation } from './nation.entity';
import { Trophie } from './trophie.entity';

@Entity({ name: 'nation_trophie' })
export class NationTrophie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Nation, (nation) => nation.nationTrophies)
  nation: Nation;

  @ManyToOne(() => Trophie, (trophie) => trophie.nationTrophies)
  trophie: Trophie;
}
