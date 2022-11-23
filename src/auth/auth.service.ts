import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/user.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const userDb = await this.userService.getByEmailOrUsername(
      createUserDto.email,
      createUserDto.username,
    );
    if (userDb) {
      throw new HttpException(
        `${createUserDto.email} or ${createUserDto.username}  already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userRepository.save(user);

    const { password, ...data } = newUser;

    return data;
  }

  async login(email: string, hashedPassword: string) {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('USER NOT FOUND');
    }

    const isPasswordMatching = await bcrypt.compare(
      hashedPassword,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password, ...userData } = user;

    return userData;
  }

  public getCookieWithJwtToken(userId: number) {
    const payload = { sub: userId };
    const token = this.jwtService.sign(payload);
    return `accessToken=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `accessToken=; HttpOnly; Path=/; Max-Age=0`;
  }
}
