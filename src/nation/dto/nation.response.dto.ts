import { ApiProperty } from '@nestjs/swagger';
import { ResponsePlayerDto } from 'src/player/dto/player.response.dto';

export class ResponseNationDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty({ type: ResponsePlayerDto })
  readonly captain: ResponsePlayerDto;

  @ApiProperty()
  readonly country: string;
}

export class ResponseNationTrophieDto {
  @ApiProperty()
  readonly id: number;
}
