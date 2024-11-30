import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { ConfigService } from '../config/config.service';
import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { IsPositivePipe } from '../pipes/is-positive/is-positive.pipe';
import { ApiKeyGuardGuard } from '../guards/api-key-guard/api-key-guard.guard';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private readonly episodesService: EpisodesService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe, IsPositivePipe)
    limit?: number,
  ) {
    return this.episodesService.findAll(sort, limit);
  }

  @Get('featured')
  async findFeatured() {
    const episode = await this.episodesService.findFeatured();
    if (!episode) {
      throw new NotFoundException('No featured episodes found');
    }
    return episode;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }
    return episode;
  }

  @UseGuards(ApiKeyGuardGuard)
  @Post()
  create(@Body(ValidationPipe) body: CreateEpisodeDto) {
    return this.episodesService.create(body);
  }
}
