import * as tf from '@tensorflow/tfjs-node';
import * as nsfw from 'nsfwjs';
import { Checker } from './if.abstract';
import { ErrCode } from '../../utils/enumError';
import Tesseract, { createWorker } from 'tesseract.js';
import { IReturnObj } from '../../dto/interface/common.if';
// interface IProb {
//     className: string; //"Neutral",
//     probability: number; // 0.9999980926513672    
// }
enum ProbName {
    Neutral = '中性',
    Porn = '色情',
    Drawing = '繪畫',
    Hentai = '變態',
    Sexy = '性感',
}

export class ImageVerify extends Checker {
    private mdlUrl = 'https://images.uuss.net/models/mobilenet_v2/model.json';
    private badPicScore = 50;
    async check(file: Express.Multer.File): Promise<boolean> {
        const scores = await this.parse(file);
        if (scores) {
            if (scores.score > this.badPicScore) {
                console.log('ImageVerify scores:', scores);
                this.mytop.Error = ErrCode.BAD_IMAGE_DETECTED;
            }
        }
        if (!this.mytop.Error) {
            const hasBadWord = await this.verifyBadWrod(file);
            if (hasBadWord) {
                this.mytop.Error = ErrCode.BAD_WORD_DETECTED_IN_PIC;
            }
        }
        return false;
    }
    async parse(file:Express.Multer.File) {
        const rtn:IReturnObj = {};
        let image:tf.Tensor3D | tf.Tensor4D;
        try {
            console.log('mimetype:', file.mimetype);
            switch(file.mimetype) {
                case 'image/jpeg':  //For Joint Photographic Experts Group images (JPEG, JPG).
                    image = tf.node.decodeJpeg(file.buffer);
                    break;
                case 'image/png':   //For Portable Network Graphics images (PNG).
                    image = tf.node.decodePng(file.buffer);
                    break;
                case 'image/bmp':   //For Bitmap images (BMP).
                    image = tf.node.decodeBmp(file.buffer);
                    break;
                case 'image/gif':   //For Graphics Interchange Format images (GIF).
                    image = tf.node.decodeGif(file.buffer);
                    break;
                case 'image/webp':  //For WebP images.
                    //image = tf.node.decodeImage(file.buffer);
                    //break;                    
                case 'image/svg+xml':   //For Scalable Vector Graphics (SVG).
                case 'image/tiff': //For Tagged Image File Format images (TIFF).
                case 'image/apng':  //For Animated Portable Network Graphics images (APNG).
                case 'image/avif':  //For AV1 Image File Format images (AVIF).
                    return false;
            }
            this.mytop.FileInProcess = true;
            console.log('ImageVerify image', image!.rankType);
            const model = await nsfw.load(this.mdlUrl);
            const ans = await model.classify(image! as any);
            return this.scoreCal(ans);
            //return this.transfer(ans);
        } catch (err) {
            console.log('ImageVery error:', err);
            return false;
        }
    }
    async verifyBadWrod(file:Express.Multer.File) {
        const langs = ['eng', 'chi_tra', 'chi_sim']; //, 'jpn', 'kor'];
        let rlt:Tesseract.RecognizeResult;
        for (let i=0, n=langs.length; i<n; i++) {
            const worker = await createWorker(langs[i]); //, 1, {logger: m => console.log(langs[i],m)});
            //rlt = await Tesseract.recognize(file.buffer, langs[i], {logger: m => console.log(langs[i],m)});
            rlt = await worker.recognize(file.buffer);
            console.log(`image verify ${langs[i]} text:`, rlt.data);
            if (this.badWrods.isProfane(rlt.data.text)) {
                return true;
            }
        }
        return false;
    }
    scoreCal(probs:nsfw.PredictionType[]) {
        const scores = { score: 0 };
        probs.forEach((prob) => {
            const probability = prob.probability * 100;
            scores[prob.className] = probability;
            if (prob.className === 'Porn') {
                scores.score += probability;
            } else if (prob.className === 'Hentai') {
                scores.score += probability;
            } else if (prob.className === 'Sexy') {
                scores.score += probability/2;
            }
        });
        return scores;
    }
    transfer(probs:nsfw.PredictionType[]) {
        const obj = {};
        probs.forEach((prob) => {
            obj[ProbName[prob.className]] = Math.round(prob.probability * 100);
        })
        return obj;
    }
}