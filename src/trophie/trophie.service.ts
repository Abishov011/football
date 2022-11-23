import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trophie } from 'src/entities/trophie.entity';
import { Repository } from 'typeorm';
import { CreateTrophieDto } from './dto/trophie.request.dto';
import { ResponseTrophieDto } from './dto/trophie.response.dto';
import { TrophieController } from './trophie.controller';

@Injectable()
export class TrophieService {
  constructor(
    @InjectRepository(Trophie)
    private readonly trophieRepository: Repository<Trophie>,
  ) {}

  async create(dto: CreateTrophieDto): Promise<ResponseTrophieDto> {
    const trophie = new Trophie();
    trophie.cup = dto.cup;
    return await this.trophieRepository.save(trophie);
  }
}
