import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateEpisodeDto } from 'src/dto/create-episode.dto';
import { Episode } from 'src/entity/episode.entity';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  async findAll(
    sort: 'asc' | 'desc' = 'desc',
    limit?: number,
  ): Promise<Episode[]> {
    const sortAsc = (a: Episode, b: Episode) => a.name.localeCompare(b.name);
    const sortDesc = (a: Episode, b: Episode) => b.name.localeCompare(a.name);

    const sortedEpisodes = this.episodes.sort(
      sort === 'asc' ? sortAsc : sortDesc,
    );

    if (limit) {
      return sortedEpisodes.slice(0, limit);
    }

    return sortedEpisodes;
  }

  async findFeatured() {
    return this.episodes.find((episode) => episode.featured);
  }

  async findOne(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);
    return newEpisode;
  }
}
