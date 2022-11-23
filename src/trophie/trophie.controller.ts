import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrophieDto } from './dto/trophie.request.dto';
import { ResponseTrophieDto } from './dto/trophie.response.dto';
import { TrophieService } from './trophie.service';

@ApiTags('trophie')
@Controller('trophie')
export class TrophieController {
  constructor(private readonly trophieService: TrophieService) {}

  @Post()
  @ApiOkResponse({ type: ResponseTrophieDto })
  async createTrophie(
    @Body() dto: CreateTrophieDto,
  ): Promise<ResponseTrophieDto> {
    return await this.trophieService.create(dto);
  }
}
