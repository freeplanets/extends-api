import { Test, TestingModule } from '@nestjs/testing';
import { ExpoMessageService } from './expo-message.service';

describe('ExpoMessageService', () => {
  let service: ExpoMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpoMessageService],
    }).compile();

    service = module.get<ExpoMessageService>(ExpoMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
