import { ApiProperty } from '@nestjs/swagger';

export class CreateTrophieDto {
  @ApiProperty()
  readonly cup: string;
}
