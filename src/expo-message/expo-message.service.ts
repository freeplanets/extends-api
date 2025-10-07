import { Injectable } from '@nestjs/common';
import { ExpoMessage } from './expo-message';
import { FuncWithTryCatchNew } from '../classes/common/func.def';

const expo = new ExpoMessage();
@Injectable()
export class ExpoMessageService {
    async send(tokens:string[], message:string) {
        return FuncWithTryCatchNew(expo, 'sendMessages', tokens, message);
    }
}
