import { ApiProperty } from '@nestjs/swagger';

export class ResponseClubDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly foundingDate: Date;

  @ApiProperty()
  readonly president: string;
}

export class ResponseClubTrophieDto {
  @ApiProperty()
  readonly id: number;
}
