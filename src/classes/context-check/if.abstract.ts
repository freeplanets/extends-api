import { ErrCode } from '../../utils/enumError';
import { BadFilesOp } from './bad-file-op';
import * as BadWords from 'bad-words-chinese';

export abstract class Checker {
    protected mytop:BadFilesOp;
    protected error:ErrCode;
    protected mimetype = ''
    constructor(protected badWrods?:BadWords ) {}
    abstract check(file:Express.Multer.File):Promise<boolean>;
    setTop(mytop:BadFilesOp) {
        this.mytop = mytop;
    }
}
