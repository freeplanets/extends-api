import { Test, TestingModule } from '@nestjs/testing';
import { ContentInspectionService } from './content-inspection.service';

describe('ContentInspectionService', () => {
  let service: ContentInspectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentInspectionService],
    }).compile();

    service = module.get<ContentInspectionService>(ContentInspectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
