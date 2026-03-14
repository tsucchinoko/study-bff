import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { OWMCurrentResponse, OWMForecastResponse } from './openweathermap.interface';

/**
 * OpenWeatherMap API クライアント
 *
 * 外部APIとの通信を隔離し、BFFの他のサービスから
 * 直接外部APIに依存しないようにする
 */
@Injectable()
export class OpenWeatherMapService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const key = this.configService.get<string>('OPENWEATHERMAP_API_KEY');
    if (!key) {
      throw new Error('OPENWEATHERMAP_API_KEY is not configured');
    }
    this.apiKey = key;
  }

  /** 現在の天気を取得 */
  async getCurrentWeather(city: string): Promise<OWMCurrentResponse> {
    return this.fetchFromApi<OWMCurrentResponse>('weather', city);
  }

  /** 5日間予報を取得 */
  async getForecast(city: string): Promise<OWMForecastResponse> {
    return this.fetchFromApi<OWMForecastResponse>('forecast', city);
  }

  /** 共通のAPI呼び出し */
  private async fetchFromApi<T>(endpoint: string, city: string): Promise<T> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<T>(`${this.baseUrl}/${endpoint}`, {
          params: {
            q: city,
            appid: this.apiKey,
            units: 'metric',
            lang: 'ja',
          },
        }),
      );
      return data;
    } catch (error: any) {
      this.handleApiError(error, city);
    }
  }

  private static readonly errorStatusMap = new Map<number, { message: string | ((city: string) => string); status: HttpStatus }>([
    [404, { message: (city: string) => `City "${city}" not found`, status: HttpStatus.NOT_FOUND }],
    [401, { message: 'Weather API authentication failed', status: HttpStatus.INTERNAL_SERVER_ERROR }],
    [429, { message: 'Weather API rate limit exceeded. Please try again later.', status: HttpStatus.TOO_MANY_REQUESTS }],
  ]);

  /** 外部APIエラーをクライアント向けに変換 */
  private handleApiError(error: any, city: string): never {
    const status = error?.response?.status;
    const mapped = OpenWeatherMapService.errorStatusMap.get(status);

    if (mapped) {
      const message = typeof mapped.message === 'function' ? mapped.message(city) : mapped.message;
      throw new HttpException(message, mapped.status);
    }

    throw new HttpException('Failed to fetch weather data', HttpStatus.BAD_GATEWAY);
  }
}
