import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { WeatherService } from './weather.service';

/**
 * WeatherController
 *
 * BFFパターンのポイント:
 * - /web/weather と /mobile/weather で異なるレスポンス形式を返す
 * - 同じドメインロジック (WeatherService) を共有しつつ、
 *   クライアントに最適化されたデータを提供する
 */
@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  /** Web向けエンドポイント: 詳細な天気データ */
  @Get('web/weather')
  async getWebWeather(@Query('city') city: string) {
    this.validateCity(city);
    return this.weatherService.getForWeb(city);
  }

  /** モバイル向けエンドポイント: 簡易な天気データ */
  @Get('mobile/weather')
  async getMobileWeather(@Query('city') city: string) {
    this.validateCity(city);
    return this.weatherService.getForMobile(city);
  }

  /** ヘルスチェック */
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      uptime: process.uptime(),
    };
  }

  private validateCity(city: string): void {
    if (!city || city.trim() === '') {
      throw new HttpException(
        'Query parameter "city" is required',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
