import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { forward } from 'src/lib/requetForwar';
import { SetVisibilityDTO } from './dto/setVisibility.dto';
import { UpdateRuleUNiverDto } from './dto/updateRuleOfUniver.dto';
import { joinUniverDto } from './dto/joinUniver.dto';
import { BanirPartivipantDto } from './dto/banirParticipant.dto';
import { CreateUniversDto } from './dto/createUniver.dto';

const UNIVERSE_SERVICE = 'universe_service';

@ApiBearerAuth()
@Controller()
export class UniversesProxyController {
  constructor(private readonly http: HttpService) {}

  /* =====================================================
   * Universes
   * ===================================================== */

  @Post('/universes')
  createUniverse(@Req() req: any, @Body() body: CreateUniversDto) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'post',
      '/universes',
      req,
      body,
    );
  }

  @Get('/universes')
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'limit', required: true })
  @ApiQuery({ name: 'searchTerm', required: false })
  getAllUniverses(@Req() req: any, @Query() query: any) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'get',
      '/universes',
      req,
      undefined,
      query,
    );
  }

  @Get('/universes/popular')
  getPopularUniverses(@Req() req: any) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'get',
      '/universes/popular',
      req,
    );
  }

  @Get('/universes/:universeId')
  getUniverseById(
    @Req() req: any,
    @Param('universeId') universeId: string,
  ) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'get',
      `/universes/${universeId}/userId/${req.user.id}`,
      req,
    );
  }

  @Get('/users/:userId/universes')
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'limit', required: true })
  @ApiQuery({ name: 'searchTerm', required: false })
  getUserUniverses(
    @Req() req: any,
    @Param('userId') userId: string,
    @Query() query: any,
  ) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'get',
      `/universes/users/${userId}/universes`,
      req,
      undefined,
      query,
    );
  }

  /* =====================================================
   * Updates
   * ===================================================== */

  @Patch('/universes/:universeId')
  updateUniverse(
    @Req() req: any,
    @Param('universeId') universeId: string,
    @Body() body: any,
  ) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'patch',
      `/universes/${universeId}`,
      req,
      body,
    );
  }

  @Patch('/universes/:universeId/visibility')
  updateVisibility(
    @Req() req: any,
    @Param('universeId') universeId: string,
    @Body() body: SetVisibilityDTO,
  ) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'patch',
      `/universes/${universeId}/visibility`,
      req,
      body,
    );
  }

  @Patch('/universes/:universeId/rules')
  updateRules(
    @Req() req: any,
    @Param('universeId') universeId: string,
    @Body() body: UpdateRuleUNiverDto,
  ) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'patch',
      `/universes/${universeId}/rules`,
      req,
      body,
    );
  }

  /* =====================================================
   * Media
   * ===================================================== */

  @Patch('/universes/:universeId/logo')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  updateLogo(
    @Req() req: any,
    @Param('universeId') universeId: string,
    @UploadedFile() file: any,
    @Body() body: any,
  ) {
    const formData = new FormData();
    if (file) {
      formData.append('file', file.buffer, file.originalname);
    }
    Object.entries(body).forEach(([key, value]) =>
      formData.append(key, value as any),
    );

    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'patch',
      `/universes/${universeId}/logo`,
      req,
      formData,
    );
  }

  @Patch('/universes/:universeId/banner')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  updateBanner(
    @Req() req: any,
    @Param('universeId') universeId: string,
    @UploadedFile() file: any,
    @Body() body: any,
  ) {
    const formData = new FormData();
    if (file) {
      formData.append('file', file.buffer, file.originalname);
    }
    Object.entries(body).forEach(([key, value]) =>
      formData.append(key, value as any),
    );

    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'patch',
      `/universes/${universeId}/banner`,
      req,
      formData,
    );
  }

  /* =====================================================
   * Membership & moderation
   * ===================================================== */

  @Post('/universes/:universeId/join')
  joinUniverse(
    @Req() req: any,
    @Param('universeId') universeId: string,
    @Body() body: joinUniverDto,
  ) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'post',
      `/universes/${universeId}/join`,
      req,
      body,
    );
  }

  @Post('/universes/:universeId/participants/:participantId/ban')
  banParticipant(
    @Req() req: any,
    @Param('universeId') universeId: string,
    @Param('participantId') participantId: string,
    @Body() body: BanirPartivipantDto,
  ) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'post',
      `/universes/${universeId}/participants/${participantId}/ban`,
      req,
      body,
    );
  }

  /* =====================================================
   * Deletion
   * ===================================================== */

  @Delete('/universes/:universeId')
  deleteUniverse(
    @Req() req: any,
    @Param('universeId') universeId: string,
    @Query('userId') userId: string,
  ) {
    return forward(
      this.http,
      UNIVERSE_SERVICE,
      'delete',
      `/universes/${universeId}`,
      req,
      undefined,
      { userId },
    );
  }
}
