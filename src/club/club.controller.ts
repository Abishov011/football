import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ClubService } from './club.service';
import {
  addTrophieDto,
  changeCaptainDto,
  CreateClubDto,
  UpdateClubDto,
} from './dto/club.request.dto';
import { ResponseClubDto } from './dto/club.response.dto';

@ApiTags('club')
@Controller('club')
export class ClubController {
  nationService: any;
  constructor(private readonly clubService: ClubService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('clubImgUrl'))
  @ApiOkResponse({ type: ResponseClubDto })
  async createClub(
    @Body(new ValidationPipe({ transform: true })) dto: CreateClubDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1048576 * 2,
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    clubImgUrl: Express.Multer.File,
  ): Promise<ResponseClubDto> {
    return await this.clubService.create(dto, clubImgUrl);
  }

  @Put('/:id')
  async updateClub(
    @Param('id') id: string,
    @Body() dto: UpdateClubDto,
  ): Promise<ResponseClubDto> {
    return await this.clubService.update(+id, dto);
  }

  @Get()
  @ApiOkResponse({ type: [ResponseClubDto] })
  async getClubs(): Promise<ResponseClubDto[]> {
    return await this.clubService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: ResponseClubDto })
  async getClubById(@Param('id') id: string): Promise<ResponseClubDto> {
    return await this.clubService.findById(+id);
  }

  @Put('/:id/captain')
  async changeCaptain(@Param('id') id: string, @Body() dto: changeCaptainDto) {
    return await this.clubService.addCaptain(+id, dto.playerId);
  }

  @Put('/:id/trophie')
  async newTrophie(@Param('id') id: string, @Body() dto: addTrophieDto) {
    return await this.clubService.addTrophie(+id, dto.trophieId);
  }

  @Delete('/:id/trophie')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrophie(
    @Param('id') clubId: number,
    @Query('trophieId') trophieId: number,
  ): Promise<void> {
    return await this.clubService.deleteTrophie(clubId, trophieId);
  }
}
