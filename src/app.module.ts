import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoConfig from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentInspectionModule } from './content-inspection/content-inspection.module';

let dbase = process.env.MONGO_DB;
if (process.env.IS_OFFLINE) dbase = process.env.LMONGO_DB;

@Module({
  imports: [
    ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [mongoConfig],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config:ConfigService) => ({
    //     uri: config.get<string>('mongo.uri'),
    //     directConnection: true,
    //     dbName: dbase,
    //     connectTimeoutMS: 5000,        
    //   }),
    }),
    ContentInspectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
