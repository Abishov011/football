import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { isEmail, isNotEmpty, IsOptional } from 'class-validator';

export class CreateClubDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly foundingDate: Date;

  @ApiProperty()
  readonly president: string;

  @ApiPropertyOptional({ format: 'binary', type: 'string' })
  @IsOptional()
  readonly clubImgUrl: string;
}

export class UpdateClubDto {
  @ApiPropertyOptional()
  readonly name: string;

  @ApiPropertyOptional()
  readonly foundingDate: Date;

  @ApiPropertyOptional()
  readonly president: string;

  @ApiPropertyOptional({ format: 'binary', type: 'string' })
  @IsOptional()
  readonly clubImgUrl: string;
}

export class changeCaptainDto {
  @ApiProperty()
  readonly playerId: number;
}

export class addTrophieDto {
  @ApiProperty()
  readonly trophieId: number;
}
