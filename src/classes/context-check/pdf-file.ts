import * as PdfParse from 'pdf-parse'
import { Checker } from './if.abstract';
import { ErrCode } from '../../utils/enumError';

export class PdfFile extends Checker {
    async check(file: Express.Multer.File): Promise<boolean> {
        if (file.mimetype === 'application/pdf') {
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
        const data = await PdfParse(file.buffer);
        console.log('PdfFile info:', data.info);
        Object.keys(data).forEach((key) => {
            console.log(key, ' => ', data[key]);
        })
        const hasText = data.text && data.text.trim().length > 0;
        if (hasText) {
            console.log('PdfFile text:', data.text.trim());
            return data.text.trim();
        }
        return false;
    }
}