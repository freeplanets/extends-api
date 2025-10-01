import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';


//即使刷新網頁，Token 值仍保持不變
const swaggerCustomOptions:SwaggerCustomOptions = {
  yamlDocumentUrl: 'docs-yaml',
  swaggerOptions: {
    persistAuthorization: true,
  }
}
const authOption:SecuritySchemeObject = {
    description: 'JWT token authorization',
    //type: 'apiKey',
    type: 'http',
    // in: 'header',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    // name: 'WWW-AUTH',
}
const crosOp: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(crosOp);
  const options = new DocumentBuilder().addBearerAuth(authOption).build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, swaggerCustomOptions);
  await app.listen(process.env.PORT ?? 3000, () => { 
    console.log(`server start at port ${process.env.PORT ?? 3000}:${process.env.PORT}`);
  });
}
bootstrap();
// console.log(process.env);
