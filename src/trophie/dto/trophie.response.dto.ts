import { ApiProperty } from '@nestjs/swagger';

export class ResponseTrophieDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly cup: string;
}
