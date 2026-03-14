import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenWeatherMapService } from './openweathermap.service';
import { AirQualityService } from './air-quality.service';
import { LocalNewsService } from './news.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // 5秒タイムアウト
    }),
  ],
  providers: [OpenWeatherMapService, AirQualityService, LocalNewsService],
  exports: [OpenWeatherMapService, AirQualityService, LocalNewsService],
})
export class ExternalApiModule {}
