import * as mammoth from 'mammoth';
import { Checker } from './if.abstract';
import { ErrCode } from '../../utils/enumError';

export class WordFile extends Checker {
    async check(file: Express.Multer.File): Promise<boolean> {
        if (
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimetype === 'application/msword'
        ) {
            this.mytop.FileInProcess = true;
            const text = await this.parse(file);
            const ans = this.badWrods.isProfane(text);
            if (ans) {
                this.mytop.Error = ErrCode.BAD_WORD_DETECTED_IN_FILE;
            }
        }
        return false;
    }    
    async parse(file:Express.Multer.File) {
        const result = await mammoth.extractRawText({buffer: file.buffer});
        console.log('word file message:', result.messages);
        return result.value;
    }
}