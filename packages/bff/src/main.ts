import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS: Web・モバイルからのアクセスを許可
  app.enableCors();

  // グローバルエラーハンドリング
  app.useGlobalFilters(new HttpExceptionFilter());

  // APIプレフィックス
  app.setGlobalPrefix('api');

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🌤️  BFF server running on http://localhost:${port}`);
}
bootstrap();
