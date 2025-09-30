import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ContentInspectionService {
    constructor(){}
    async verify(req:Request, file:Express.Multer.File) {
        
    }
    async verifies(req:Request, files:Express.Multer.File[]) {
        
    }
}
