import { Test, TestingModule } from '@nestjs/testing';
import { ContentInspectionController } from './content-inspection.controller';

describe('ContentInspectionController', () => {
  let controller: ContentInspectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentInspectionController],
    }).compile();

    controller = module.get<ContentInspectionController>(ContentInspectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
