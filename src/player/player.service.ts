import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from 'src/entities/player.entity';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/player.request.dto';
import { ResponsePlayerDto } from './dto/player.response.dto';
import { Club } from 'src/entities/club.entity';
import { Nation } from 'src/entities/nation.entity';
import { writeFile, unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(Nation)
    private nationRepository: Repository<Nation>,
  ) {}

  async create(
    dto: CreatePlayerDto,
    playerImgUrl: Express.Multer.File,
  ): Promise<ResponsePlayerDto> {
    const imageUrl = uuidv4() + playerImgUrl.originalname;

    const player = new Player();
    player.firstname = dto.firstname;
    player.lastname = dto.lastname;
    player.birthDate = dto.birthDate;
    player.transferPrice = dto.transferPrice;
    player.leg = dto.leg;
    player.playerNumber = dto.playerNumber;
    player.playerImgUrl = imageUrl;

    let club;

    if (dto.clubId) {
      club = await this.clubRepository.findOne({ where: { id: dto.clubId } });
      if (club) {
        player.club = club;
      }
    }

    let nation;
    if (dto.nationId) {
      nation = await this.nationRepository.findOne({
        where: { id: dto.nationId },
      });
      if (nation) {
        player.nation = nation;
      }
    }

    const [newPlayer] = await Promise.all([
      this.playerRepository.save(player),
      writeFile(`upload/${imageUrl}`, playerImgUrl.buffer),
    ]);

    if (dto.isClubCaptain && club) {
      newPlayer.club = null;
      club.captain = newPlayer;
      await this.clubRepository.save(club);
    }

    if (dto.isNationCaptain && nation) {
      newPlayer.nation = null;
      nation.captain = newPlayer;
      await this.nationRepository.save(nation);
    }

    return newPlayer;
  }

  async findAll(): Promise<ResponsePlayerDto[]> {
    return await this.playerRepository.find();
  }

  async findById(id: number): Promise<ResponsePlayerDto> {
    return await this.playerRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    dto: UpdatePlayerDto,
    playerImgUrl: Express.Multer.File,
  ): Promise<ResponsePlayerDto> {
    const player = await this.playerRepository.findOne({ where: { id } });

    if (!player) {
      throw new NotFoundException('PLAYER NOT FOUND');
    }

    player.firstname = dto.firstname;
    player.lastname = dto.lastname;
    player.birthDate = dto.birthDate;
    player.transferPrice = dto.transferPrice;
    player.weekleySalary = dto.weekleySalary;
    player.playerNumber = dto.playerNumber;

    if (dto.clubId) {
      const club = await this.clubRepository.findOne({
        where: { id: dto.clubId },
      });
      if (club) {
        player.club = club;
      }
    }

    if (dto.nationId) {
      const nation = await this.nationRepository.findOne({
        where: { id: dto.nationId },
      });
      if (nation) {
        player.nation = nation;
      }
    }

    if (playerImgUrl) {
      const imageUrl = uuidv4() + playerImgUrl.originalname;
      try {
        await unlink(`upload/${player.playerImgUrl}`);
      } catch (err) {
        console.log(err.message);
      }

      player.playerImgUrl = imageUrl;

      await writeFile(`upload/${imageUrl}`, playerImgUrl.buffer);
    }

    console.log(player);

    return await this.playerRepository.save(player);
  }

  async delete(id: number): Promise<void> {
    const player = await this.playerRepository.findOne({ where: { id } });

    const nation = await this.nationRepository.findOne({
      where: { captain: { id: id } },
    });

    if (nation) {
      nation.captain = null;
      await this.nationRepository.save(nation);
    }

    if (!player) {
      throw new NotFoundException('PLAYER IS NOT FOUND');
    }

    await this.playerRepository.remove(player);

    try {
      await unlink(`upload/${player.playerImgUrl}`);
    } catch (err) {
      console.log(err);
    }
  }
}
