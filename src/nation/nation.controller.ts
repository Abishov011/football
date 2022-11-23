import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  addTrophieDto,
  CreateNationDto,
  UpdateNationCaptainDto,
} from './dto/nation.request.dto';
import { ResponseNationDto } from './dto/nation.response.dto';
import { NationService } from './nation.service';

@ApiTags('nation')
@Controller('nation')
export class NationController {
  constructor(private readonly nationService: NationService) {}

  @Post()
  @ApiOkResponse({ type: ResponseNationDto })
  async createPlayer(@Body() dto: CreateNationDto): Promise<ResponseNationDto> {
    return await this.nationService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [ResponseNationDto] })
  async getNation(): Promise<ResponseNationDto[]> {
    return await this.nationService.findAll();
  }

  @Put('/:id/captain')
  async updateNation(
    @Param('id') id: string,
    @Body() dto: UpdateNationCaptainDto,
  ) {
    return await this.nationService.addCaptain(+id, dto.playerId);
  }

  @Put('/:id/trophie')
  async newTrophie(@Param('id') id: string, @Body() dto: addTrophieDto) {
    return await this.nationService.addTrophie(+id, dto.trophieId);
  }
}
