import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubsTrophie } from 'src/entities/club-trophie.entity';
import { Club } from 'src/entities/club.entity';
import { Player } from 'src/entities/player.entity';
import { Trophie } from 'src/entities/trophie.entity';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Player, Trophie, ClubsTrophie])],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
