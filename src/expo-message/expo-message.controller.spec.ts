import { Test, TestingModule } from '@nestjs/testing';
import { ExpoMessageController } from './expo-message.controller';

describe('ExpoMessageController', () => {
  let controller: ExpoMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpoMessageController],
    }).compile();

    controller = module.get<ExpoMessageController>(ExpoMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
