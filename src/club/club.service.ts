import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFile } from 'fs/promises';
import { ClubsTrophie } from 'src/entities/club-trophie.entity';
import { Club } from 'src/entities/club.entity';
import { Player } from 'src/entities/player.entity';
import { Trophie } from 'src/entities/trophie.entity';
import { Repository } from 'typeorm';
import { CreateClubDto, UpdateClubDto } from './dto/club.request.dto';
import {
  ResponseClubDto,
  ResponseClubTrophieDto,
} from './dto/club.response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(Trophie)
    private trophieRepository: Repository<Trophie>,
    @InjectRepository(ClubsTrophie)
    private clubsTrophieRepository: Repository<ClubsTrophie>,
  ) {}

  async create(
    dto: CreateClubDto,
    clubImgUrl: Express.Multer.File,
  ): Promise<ResponseClubDto> {
    const imageUrl = uuidv4() + clubImgUrl.originalname;

    const club = new Club();
    club.name = dto.name;
    club.foundingDate = dto.foundingDate;
    club.president = dto.president;
    club.clubImgUrl = imageUrl;

    const [newClubImg] = await Promise.all([
      this.clubRepository.save(club),
      writeFile(`upload/${imageUrl}`, clubImgUrl.buffer),
    ]);
    return newClubImg;
  }

  async update(id: number, dto: UpdateClubDto): Promise<ResponseClubDto> {
    const club = await this.clubRepository.findOne({ where: { id } });
    if (!club) {
      throw new NotFoundException('CLUB NOT FOUND');
    }

    club.name = dto.name;
    club.president = dto.president;
    club.foundingDate = dto.foundingDate;

    return await this.clubRepository.save(club);
  }

  async findAll() {
    return await this.clubRepository.find();
  }

  async findById(id: number): Promise<ResponseClubDto> {
    return await this.clubRepository.findOne({ where: { id } });
  }

  async addCaptain(clubId: number, playerId: number): Promise<ResponseClubDto> {
    const club = await this.clubRepository.findOne({ where: { id: clubId } });
    if (!club) {
      throw new NotFoundException('CLUB NOT FOUND');
    }

    const player = await this.playerRepository.findOne({
      where: { id: playerId, club: { id: club.id } },
    });

    if (!player) {
      throw new NotFoundException('PLAYER NOT FOUND');
    }

    club.captain = player;

    return await this.clubRepository.save(club);
  }

  async addTrophie(
    clubId: number,
    trophieId: number,
  ): Promise<ResponseClubTrophieDto> {
    const club = await this.clubRepository.findOne({ where: { id: clubId } });
    if (!club) {
      throw new NotFoundException('CLUB NOT FOUND');
    }

    const trophie = await this.trophieRepository.findOne({
      where: { id: trophieId },
    });

    if (!trophie) {
      throw new NotFoundException('TROPHIE NOT FOUND');
    }

    const clubsTrophie = new ClubsTrophie();
    clubsTrophie.club = club;
    clubsTrophie.trophie = trophie;

    return await this.clubsTrophieRepository.save(clubsTrophie);
  }

  async deleteTrophie(clubId: number, trophieId: number): Promise<void> {
    const clubsTrophie = await this.clubsTrophieRepository.findOne({
      where: { club: { id: clubId }, trophie: { id: trophieId } },
    });
    if (!clubsTrophie) {
      throw new NotFoundException('CLUBSTROPHIE NOT FOUND');
    }

    await this.clubsTrophieRepository.remove(clubsTrophie);
  }
}
