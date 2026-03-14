import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenWeatherMapService } from './openweathermap.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // 5秒タイムアウト
    }),
  ],
  providers: [OpenWeatherMapService],
  exports: [OpenWeatherMapService],
})
export class ExternalApiModule {}
