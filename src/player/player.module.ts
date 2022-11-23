import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/entities/player.entity';
import { Club } from 'src/entities/club.entity';
import { Nation } from 'src/entities/nation.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Club, Nation])],
  providers: [PlayerService],
  controllers: [PlayerController],
})
export class PlayerModule {}
