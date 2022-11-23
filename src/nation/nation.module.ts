import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NationTrophie } from 'src/entities/nation-trophie.entity';
import { Nation } from 'src/entities/nation.entity';
import { Player } from 'src/entities/player.entity';
import { Trophie } from 'src/entities/trophie.entity';
import { NationController } from './nation.controller';
import { NationService } from './nation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nation, Player, Trophie, NationTrophie])],
  controllers: [NationController],
  providers: [NationService],
})
export class NationModule {}
