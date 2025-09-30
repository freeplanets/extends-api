import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
//import { MongooseModule } from '@nestjs/mongoose';
//import { LoginToken, LoginTokenSchema } from '../dto/schemas/login-token.schema';
import { ContentInspectionController } from './content-inspection.controller';

@Module({
    imports: [
        JwtModule,
        // MongooseModule.forFeature([
        //     {name: LoginToken.name, schema: LoginTokenSchema },
        // ])
    ],
    controllers: [ContentInspectionController],
})
export class ContentInspectionModule {}
