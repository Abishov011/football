import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { ClubModule } from './club/club.module';
import { NationModule } from './nation/nation.module';
import { TrophieModule } from './trophie/trophie.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 55000,
      username: 'postgres',
      password: 'postgrespw',
      database: 'football',
      entities: [__dirname + '/entities/*.entity.{ts,js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PlayerModule,
    ClubModule,
    NationModule,
    TrophieModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
