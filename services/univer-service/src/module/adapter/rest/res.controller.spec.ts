import { Test, TestingModule } from '@nestjs/testing';
import { ResController } from './rest.controller';

describe('ResController', () => {
  let controller: ResController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResController],
    }).compile();

    controller = module.get<ResController>(ResController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
