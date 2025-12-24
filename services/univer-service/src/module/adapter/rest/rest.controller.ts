import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

/* =======================
 * Use cases
 * ======================= */
import { CreateUniverUseCase } from '../../application/useCases/createUniver.usecase';
import { getAllUniversUsecase } from '../../application/useCases/getAllUniver.usecase';
import { GetUniversByIdToUserUsecase } from '../../application/useCases/getUniversByid.usecase';
import { GetPopulareUniversUsecase } from '../../application/useCases/getPopulareUniver.usecase';
import { getAllUserUniversUsecase } from '../../application/useCases/getAllUserUniverJoined.usecase';
import { UniversUpdateUsecase } from '../../application/useCases/updateuniver.usecase';
import { setVisibilityUseCase } from '../../application/useCases/setVisibilityUniver.usecase';
import { UpdateRuleUsecase } from '../../application/useCases/updateRule.usecase';
import { UpdateLogoUseCase } from '../../application/useCases/updateLogo.usecase';
import { UpdateBanierUseCase } from '../../application/useCases/updateBanier.usecase';
import { JointUniversUsecase } from '../../application/useCases/jointUniver.usecase';
import { BanirPartivipantUsecase } from '../../application/useCases/banierParticipant.usecase';
import { deleteUniverUseCase } from '../../application/useCases/deleteUniver.usecase';

/* =======================
 * DTOs
 * ======================= */
import { CreateUniversDto } from '../dto/entrant/createUniver.dto';
import { SetVisibilityDTO } from '../dto/entrant/setVisibility.dto';
import { UpdateRuleUNiverDto } from '../dto/entrant/updateRuleOfUniver.dto';
import { uploadMediaDto } from '../dto/entrant/uploadMedia.dto';
import { joinUniverDto } from '../dto/entrant/joinUniver.dto';
import { BanirPartivipantDto } from '../dto/entrant/banirParticipant.dto';

/* =======================
 * Helpers
 * ======================= */
import { getFileType } from 'src/lib/constants/fileType';

@Controller('/universes')
export class UniverController {
  constructor(
    private readonly createUniver: CreateUniverUseCase,
    private readonly getAllUnivers: getAllUniversUsecase,
    private readonly getUniverseById: GetUniversByIdToUserUsecase,
    private readonly getPopularUnivers: GetPopulareUniversUsecase,
    private readonly getUserUniverses: getAllUserUniversUsecase,
    private readonly updateUniver: UniversUpdateUsecase,
    private readonly setVisibility: setVisibilityUseCase,
    private readonly updateRules: UpdateRuleUsecase,
    private readonly updateLogo: UpdateLogoUseCase,
    private readonly updateBanner: UpdateBanierUseCase,
    private readonly joinUniverse: JointUniversUsecase,
    private readonly banParticipant: BanirPartivipantUsecase,
    private readonly deleteUniverse: deleteUniverUseCase,
  ) {}

  /* =====================================================
   * Creation & retrieval
   * ===================================================== */

  @Post()
  create(@Body() dto: CreateUniversDto) {
    return this.createUniver.execute(dto);
  }

  @Get()
  getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('searchTerm') searchTerm?: string,
  ) {
    if (!page || !limit) {
      throw new BadRequestException('page and limit are required');
    }

    return this.getAllUnivers.execute({ page, limit, searchTerm });
  }

  @Get('/popular')
  getPopular() {
    return this.getPopularUnivers.execute('default');
  }

  @Get('/:universeId/userId/:userId')
  getById(@Param('universeId') universeId: string, @Param('userId') userId:string) {
    return this.getUniverseById.execute(universeId, userId);
  }



  @Get('/users/:userId/universes')
  getUserJoinedUniverses(
    @Param('userId') userId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('searchTerm') searchTerm?: string,
  ) {
    if (!page || !limit) {
      throw new BadRequestException('page and limit are required');
    }

    return this.getUserUniverses.execute({
      userId,
      page,
      limit,
      searchTerm,
    });
  }

  /* =====================================================
   * Updates
   * ===================================================== */

  @Patch('/:universeId')
  update(
    @Param('universeId') universeId: string,
    @Body() data: any,
  ) {
    return this.updateUniver.execute(data);
  }

  @Patch('/:universeId/visibility')
  updateVisibility(
    @Param('universeId') universeId: string,
    @Body() dto: SetVisibilityDTO,
  ) {
    return this.setVisibility.execute(dto);
  }

  @Patch('/:universeId/rules')
  updateRulesUniver(
    @Param('universeId') universeId: string,
    @Body() dto: UpdateRuleUNiverDto,
  ) {
    return this.updateRules.execute(dto);
  }

  /* =====================================================
   * Media
   * ===================================================== */

  @Patch('/:universeId/logo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/universes/logo',
        filename: (_, file, cb) => {
          cb(null, `logo-${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  updateLogoUniver(
    @Param('universeId') universeId: string,
    @UploadedFile() file: any,
    @Body() _: uploadMediaDto,
  ) {
    return this.updateLogo.execute(universeId, {
      filename: file.filename,
      type: getFileType(file.mimetype),
      originalName: file.originalname,
      size: file.size,
      storagePath: file.path,
      format: file.mimetype,
    });
  }

  @Patch('/:universeId/banner')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/universes/banner',
        filename: (_, file, cb) => {
          cb(null, `banner-${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  updateBannerUniver(
    @Param('universeId') universeId: string,
    @UploadedFile() file: any,
    @Body() _: uploadMediaDto,
  ) {
    return this.updateBanner.execute(universeId, {
      filename: file.filename,
      type: getFileType(file.mimetype),
      originalName: file.originalname,
      size: file.size,
      storagePath: file.path,
      format: file.mimetype,
    });
  }

  /* =====================================================
   * Membership & moderation
   * ===================================================== */

  @Post('/:universeId/join')
  join(
    @Param('universeId') universeId: string,
    @Body() dto: joinUniverDto,
  ) {
    return this.joinUniverse.execute(dto);
  }

  @Post('/:universeId/participants/:participantId/ban')
  ban(
    @Param('universeId') universeId: string,
    @Param('participantId') participantId: string,
    @Body() dto: BanirPartivipantDto,
  ) {
    return this.banParticipant.execute(dto);
  }

  /* =====================================================
   * Deletion
   * ===================================================== */

  @Delete('/:universeId')
  delete(
    @Param('universeId') universeId: string,
    @Query('userId') userId: string,
  ) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    return this.deleteUniverse.execute(universeId, userId);
  }
}
3