import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNationDto {
  @ApiProperty()
  readonly country: string;
}

export class UpdateNationDto {
  @ApiProperty()
  readonly isNationCaptain: boolean;

  @ApiProperty()
  readonly country: string;
}

export class UpdateNationCaptainDto {
  @ApiProperty()
  playerId: number;
}

export class addTrophieDto {
  @ApiProperty()
  readonly trophieId: number;
}
