import { read, utils } from 'xlsx';
import { Checker } from './if.abstract';
import { ErrCode } from '../../utils/enumError';
export class ExcelFile extends Checker {
    async check(file: Express.Multer.File): Promise<boolean> {
        if (
            file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/vnd.ms-excel'
        ) {
            this.mytop.FileInProcess = true;
            const text = this.parse(file);
            const ans = this.badWrods.isProfane(text);
            if (ans) {
                this.mytop.Error = ErrCode.BAD_WORD_DETECTED_IN_FILE;
            }
        }
        return false;
    }
    parse(file:Express.Multer.File) {
        const data:string[] = [];
        const workbook = read(file.buffer);
        workbook.SheetNames.forEach((sname) => {
            const worksheet = workbook.Sheets[sname];
            const ans = utils.sheet_to_json(worksheet);
            ans.forEach((itm:any) => {
                data.push(Object.keys(itm).map((key) => itm[key]).join(','));
            })
        });
        return data.join(',');
    }
}