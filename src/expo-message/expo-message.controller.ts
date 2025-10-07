import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ExpoMessageService } from './expo-message.service';
import { SendMessageReqDto } from '../dto/expo-message/send-message-request.dto';

@Controller('expo-message')
@ApiTags('expo-message')
export class ExpoMessageController {
    constructor(private readonly emService:ExpoMessageService){}
    @Post('send')
    async send(
        @Body() {tokens, message}:SendMessageReqDto,
        @Res() res:Response,
    ) {
       const rlt = await this.emService.send(tokens, message);
       return res.status(HttpStatus.OK).json(rlt); 
    }
}
