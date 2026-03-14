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
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<OWMCurrentResponse>(`${this.baseUrl}/weather`, {
          params: {
            q: city,
            appid: this.apiKey,
            units: 'metric', // 摂氏
            lang: 'ja',
          },
        }),
      );
      return data;
    } catch (error: any) {
      this.handleApiError(error, city);
    }
  }

  /** 5日間予報を取得 */
  async getForecast(city: string): Promise<OWMForecastResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<OWMForecastResponse>(`${this.baseUrl}/forecast`, {
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

  /** 外部APIエラーをクライアント向けに変換 */
  private handleApiError(error: any, city: string): never {
    const status = error?.response?.status;

    if (status === 404) {
      throw new HttpException(
        `City "${city}" not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (status === 401) {
      throw new HttpException(
        'Weather API authentication failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (status === 429) {
      throw new HttpException(
        'Weather API rate limit exceeded. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    throw new HttpException(
      'Failed to fetch weather data',
      HttpStatus.BAD_GATEWAY,
    );
  }
}
