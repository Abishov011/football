import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PlayerLeg } from 'src/entities/player.entity';
import { ToBoolean } from 'src/helper/to-boolean';

export class CreatePlayerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ enum: PlayerLeg })
  @IsEnum(PlayerLeg)
  readonly leg: PlayerLeg;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  readonly birthDate: Date;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  readonly transferPrice: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly clubId?: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  readonly nationId: number;

  @ApiProperty()
  @IsBoolean()
  @Type(() => Boolean)
  @ToBoolean()
  readonly isClubCaptain: boolean;

  @ApiProperty()
  @IsBoolean()
  @Type(() => Boolean)
  @ToBoolean()
  readonly isNationCaptain: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly playerNumber: number;

  @ApiPropertyOptional({ format: 'binary', type: 'string' })
  @IsOptional()
  readonly playerImgUrl: string;
}

export class UpdatePlayerDto {
  @ApiPropertyOptional()
  readonly firstname: string;

  @ApiPropertyOptional()
  readonly lastname: string;

  @ApiPropertyOptional()
  readonly birthDate: Date;

  @ApiPropertyOptional()
  readonly transferPrice: number;

  @ApiPropertyOptional()
  readonly weekleySalary: number;

  @ApiPropertyOptional()
  readonly playerNumber: number;

  @ApiPropertyOptional()
  readonly clubId?: number;

  @ApiPropertyOptional()
  readonly nationId?: number;

  @ApiPropertyOptional({ format: 'binary', type: 'string' })
  @IsOptional()
  readonly playerImgUrl: string;
}
