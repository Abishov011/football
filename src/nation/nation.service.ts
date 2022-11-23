import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NationTrophie } from 'src/entities/nation-trophie.entity';
import { Nation } from 'src/entities/nation.entity';
import { Player } from 'src/entities/player.entity';
import { Trophie } from 'src/entities/trophie.entity';
import { Repository } from 'typeorm';
import { CreateNationDto } from './dto/nation.request.dto';
import {
  ResponseNationDto,
  ResponseNationTrophieDto,
} from './dto/nation.response.dto';

@Injectable()
export class NationService {
  constructor(
    @InjectRepository(Nation)
    private readonly nationRepository: Repository<Nation>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Trophie)
    private readonly trophieRepository: Repository<Trophie>,
    @InjectRepository(NationTrophie)
    private readonly nationTrophieRepository: Repository<NationTrophie>,
  ) {}

  async create(dto: CreateNationDto): Promise<ResponseNationDto> {
    const nation = new Nation();
    nation.country = dto.country;
    return await this.nationRepository.save(nation);
  }

  async findAll(): Promise<ResponseNationDto[]> {
    return await this.nationRepository.find({ relations: ['captain'] });
  }

  async addCaptain(
    nationId: number,
    playerId: number,
  ): Promise<ResponseNationDto> {
    const nation = await this.nationRepository.findOne({
      where: { id: nationId },
    });

    if (!nation) {
      throw new NotFoundException('NATION NOT FOUND');
    }

    const player = await this.playerRepository.findOne({
      where: { id: playerId, nation: { id: nationId } },
    });

    if (!player) {
      throw new NotFoundException('PLAYER NOT FOUND');
    }

    nation.captain = player;
    return await this.nationRepository.save(nation);
  }

  async addTrophie(
    nationId: number,
    trophieId: number,
  ): Promise<ResponseNationTrophieDto> {
    const nation = await this.nationRepository.findOne({
      where: { id: nationId },
    });
    if (!nation) {
      throw new NotFoundException('NATION NOT FOUND');
    }

    const trophie = await this.trophieRepository.findOne({
      where: { id: trophieId },
    });
    if (!trophie) {
      throw new NotFoundException('TROPHIE NOT FOUND');
    }

    const nationTrophie = new NationTrophie();
    (nationTrophie.nation = nation), (nationTrophie.trophie = trophie);

    return await this.nationTrophieRepository.save(nationTrophie);
  }
}
