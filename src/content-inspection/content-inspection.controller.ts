import { Controller, HttpStatus, Post, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../utils/tokens/token-guard';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FileNamePipe } from '../utils/pipes/file-name.pipe';
import { CommonResponseDto } from '../dto/common/common-response.dto';
import { FileUploadDto } from '../dto/common/file-upload.dto';
import { FilesUploadDto } from '../dto/common/files-upload.dto';

@Controller('content-inspection')
@ApiTags('content-inspection')
//@UseGuards(TokenGuard)
//@ApiBearerAuth()
export class ContentInspectionController {
    //constructor(private readonly ciSerivce:ContentInspectionService) {}

    @ApiOperation({
        summary: '檢查從主站來的單一檔案內容, 是否包含不雅內容',
        description: '檢查從主站來的單一檔案內容, 是否包含不雅內容',
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        description: '上傳圖片檔案',
        //type: AnnouncementCreateDto,
        type: FileUploadDto,
    })    
    @Post('verify')
    async verify(
        @UploadedFile(FileNamePipe) file:Express.Multer.File,
        @Req() req:Request,
        @Res() res:Response,
    ) {
        //console.log('headers:', req.headers);
        return res.status(HttpStatus.OK).json(new CommonResponseDto());
    }

    @ApiOperation({
        summary: '檢查從主站來的多個檔案內容, 是否包含不雅內容',
        description: '檢查從主站來的多個檔案內容, 是否包含不雅內容',
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(AnyFilesInterceptor()) 
        @ApiBody({
        description: '上傳圖片檔案',
        //type: AnnouncementCreateDto,
        type: FilesUploadDto,
    })
    @Post('verifies')
    async verifys(
        @UploadedFiles(FileNamePipe) files:Array<Express.Multer.File>,
        @Req() req:Request,
        @Res() res:Response,
    ) {
        //console.log('headers:', req.headers);
        return res.status(HttpStatus.OK).json(new CommonResponseDto());
    }    
}
