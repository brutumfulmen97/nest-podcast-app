import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    findAll: async () => [{ id: 'id' }],
    findFeatured: jest.fn(),
    findOne: jest.fn(),
    create: async () => ({ id: 'id' }),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all episodes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 'id' }]);
  });

  it('should find featured episodes', async () => {
    const episodeId = 'id';
    const mockResult = [{ id: episodeId, name: 'my episode' }];

    jest
      .spyOn(mockEpisodesService, 'findFeatured')
      .mockResolvedValue(mockResult);

    const result = await controller.findFeatured();
    expect(result).toEqual(mockResult);
  });

  it('should not find featured episodes', async () => {
    jest.spyOn(mockEpisodesService, 'findFeatured').mockResolvedValue([]);
    const result = await controller.findFeatured();
    expect(result).toEqual([]);
  });

  it('should find one episode', async () => {
    const episodeId = 'id';
    const mockResult = [{ id: episodeId, name: 'my episode' }];
    jest.spyOn(mockEpisodesService, 'findOne').mockResolvedValue(mockResult);
    const result = await controller.findOne(episodeId);
    expect(result).toEqual(mockResult);
  });

  it('should throw an error if no episode is found', async () => {
    jest.spyOn(mockEpisodesService, 'findOne').mockResolvedValue(null);
    await expect(controller.findOne('id')).rejects.toThrow('Episode not found');
  });

  it('should create an episode', async () => {
    const result = await controller.create({
      name: 'name',
      publishedAt: new Date(),
    });
    expect(result).toEqual({ id: 'id' });
  });
});
