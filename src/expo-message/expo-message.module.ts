import { Module } from '@nestjs/common';
import { ExpoMessageService } from './expo-message.service';
import { ExpoMessageController } from './expo-message.controller';

@Module({
  controllers: [ExpoMessageController],
  providers: [ExpoMessageService]
})
export class ExpoMessageModule {}
