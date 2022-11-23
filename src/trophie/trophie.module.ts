import { Controller, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trophie } from 'src/entities/trophie.entity';
import { TrophieController } from './trophie.controller';
import { TrophieService } from './trophie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trophie])],
  providers: [TrophieService],
  controllers: [TrophieController],
})
export class TrophieModule {}
