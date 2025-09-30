import { ErrCode } from '../../utils/enumError';
import { ExcelFile } from './excel-file';
import { Checker } from './if.abstract';
import * as BadWords from 'bad-words-chinese';
import { WordFile } from './word-file';
import { PdfFile } from './pdf-file';
import { ImageVerify } from './images-verify';

export class BadFilesOp {
    private error:ErrCode | undefined;
    private isFileInProcess = false;
    private imageScore:object = {};
    constructor(private list:Checker[] =[]) {}
    add(checker:Checker) {
        checker.setTop(this);
        this.list.push(checker);
    }
    async check(file:Express.Multer.File) {
        this.FileInProcess = false;
        for (let i=0,n=this.list.length; i < n; i++) {
            if (!this.isFileInProcess) {
                const checker = this.list[i];
                await checker.check(file);
            } else {
                console.log('file in process');
            }
        }
    }
    set Error(code:ErrCode) {
        this.error = code;
    }
    get Error():ErrCode | undefined {
        return this.error;
    }
    set FileInProcess(b:boolean) {
        this.isFileInProcess = b;
    }
    set ImageScore(score:object) {
        this.imageScore = score;
    }
    get ImageScore() {
        return this.imageScore;
    }
}
export const getBadFilesOp = (badWrods?: BadWords) => {
    if (!badWrods) badWrods = new BadWords();
    const badFilesOp = new BadFilesOp();
    badFilesOp.add(new PdfFile(badWrods));
    badFilesOp.add(new ExcelFile(badWrods));
    badFilesOp.add(new WordFile(badWrods));
    badFilesOp.add(new ImageVerify(badWrods));
    return badFilesOp;
}