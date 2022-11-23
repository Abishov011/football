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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/player.request.dto';
import { ResponsePlayerDto } from './dto/player.response.dto';
import { PlayerService } from './player.service';
import { ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../auth/guards/jwt-auth.guard';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('playerImgUrl'))
  @ApiOkResponse({ type: ResponsePlayerDto })
  async createPlayer(
    @Body(new ValidationPipe({ transform: true })) dto: CreatePlayerDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1048576 * 2,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    playerImgUrl: Express.Multer.File,
  ): Promise<ResponsePlayerDto> {
    return await this.playerService.create(dto, playerImgUrl);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @ApiOkResponse({ type: [ResponsePlayerDto] })
  async getPlayers(): Promise<ResponsePlayerDto[]> {
    return await this.playerService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: ResponsePlayerDto })
  async getPlayerById(@Param('id') id: string): Promise<ResponsePlayerDto> {
    return await this.playerService.findById(+id);
  }

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('playerImgUrl'))
  async updatePlayer(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    dto: UpdatePlayerDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1048576 * 2,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    playerImgUrl: Express.Multer.File,
  ): Promise<ResponsePlayerDto> {
    return await this.playerService.update(+id, dto, playerImgUrl);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlayer(@Param('id') id: string): Promise<void> {
    return await this.playerService.delete(+id);
  }
}
