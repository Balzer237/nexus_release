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
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { forward } from 'lib/requetForwar';

@ApiBearerAuth()
@Controller()
export class UniversesProxyController {
  constructor(private readonly http: HttpService) {}

  
  

  /* ------------------------------------------------------------------
   * Universes
   * ------------------------------------------------------------------ */

  // Create universe
  @Post('/universes')
  createUniverse(@Body() body: any, @Req() req: any) {
    return forward('universe-service','post', '/universes', req, body);
  }

  // Get all universes (pagination + search)
  @Get('/universes')
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'limit', required: true })
  @ApiQuery({ name: 'searchTerm', required: false })
  getAllUniverses(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('searchTerm') searchTerm?: string,
  ) {
    return forward('universe-service','get', '/universes', null, null, {
      page,
      limit,
      searchTerm,
    });
  }

  // Get popular universes
  @Get('/universes/popular')
  getPopularUniverses() {
    return forward('universe-service','get', '/universes/popular');
  }

  // Get universe by ID
  @Get('/universes/:universeId')
  getUniverseById(
    @Param('universeId') universeId: string,
    @Req() req: any,
  ) {
    return forward(
        'universe-service',
      'get',
      `/universes/${universeId}`,
      req,
    );
  }

  // Get universes joined by a user
  @Get('/users/:userId/universes')
  getUserUniverses(
    @Param('userId') userId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('searchTerm') searchTerm?: string,
  ) {
    return forward(
        'universe-service',
      'get',
      `/users/${userId}/universes`,
      null,
      null,
      { page, limit, searchTerm },
    );
  }

  
  @Patch('/universes/:universeId')
  updateUniverse(
    @Param('universeId') universeId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return forward(
        'universe-service',
      'patch',
      `/universes/${universeId}`,
      req,
      body,
    );
  }

  // Update universe visibility
  @Patch('/universes/:universeId/visibility')
  updateUniverseVisibility(
    @Param('universeId') universeId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return forward(
        'universe-service',
      'patch',
      `/universes/${universeId}/visibility`,
      req,
      body,
    );
  }

  // Update universe rules
  @Patch('/universes/:universeId/rules')
  updateUniverseRules(
    @Param('universeId') universeId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return forward(
        'universe-service',
      'patch',
      `/universes/${universeId}/rules`,
      req,
      body,
    );
  }

  /* ------------------------------------------------------------------
   * Membership & moderation
   * ------------------------------------------------------------------ */

  // Join universe
  @Post('/universes/:universeId/join')
  joinUniverse(
    @Param('universeId') universeId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return forward(
        'universe-service',
      'post',
      `/universes/${universeId}/join`,
      req,
      body,
    );
  }

  // Ban participant
  @Post('/universes/:universeId/participants/:participantId/ban')
  banParticipant(
    @Param('universeId') universeId: string,
    @Param('participantId') participantId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return forward(
        'universe-service',
      'post',
      `/universes/${universeId}/participants/${participantId}/ban`,
      req,
      body,
    );
  }

  /* ------------------------------------------------------------------
   * Media (logo / banner)
   * ------------------------------------------------------------------ */

  // Update universe logo
  @Patch('/universes/:universeId/logo')
  updateUniverseLogo(
    @Param('universeId') universeId: string,
    @Req() req: any,
  ) {
    return forward(
        'universe-service',
      'patch',
      `/universes/${universeId}/logo`,
      req,
    );
  }

  // Update universe banner
  @Patch('/universes/:universeId/banner')
  updateUniverseBanner(
    @Param('universeId') universeId: string,
    @Req() req: any,
  ) {
    return forward(
        'universe-service',
      'patch',
      `/universes/${universeId}/banner`,
      req,
    );
  }

  /* ------------------------------------------------------------------
   * Deletion
   * ------------------------------------------------------------------ */

  // Delete universe
  @Delete('/universes/:universeId')
  deleteUniverse(
    @Param('universeId') universeId: string,
    @Req() req: any,
  ) {
    return forward(
        'universe-service',
      'delete',
      `/universes/${universeId}`,
      req,
    );
  }
}
