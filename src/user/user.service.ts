import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/user.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getByEmailOrUsername(email: string, username: string) {
    const user = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    });
    if (user) {
      return user;
    }
    return;
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      select: ['password', 'id', 'email', 'username'],
    });
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`USER NOT FOUND`);
    }

    return user;
  }
}
