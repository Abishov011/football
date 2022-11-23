import { ApiProperty } from '@nestjs/swagger';

export class ResponsePlayerDto {
  @ApiProperty()
  readonly firstname: string;

  @ApiProperty()
  readonly lastname: string;

  @ApiProperty()
  readonly birthDate: Date;

  @ApiProperty()
  readonly transferPrice: number;

  @ApiProperty()
  readonly playerNumber: number;

  @ApiProperty()
  readonly weekleySalary: number;
}
