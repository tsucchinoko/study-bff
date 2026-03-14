import { Injectable, Logger } from '@nestjs/common';
import { AirQualityResponse } from './air-quality.interface';

/**
 * 大気品質マイクロサービス（擬似）
 *
 * 実際のプロダクトでは:
 * - 別チームが管理するマイクロサービスへのHTTP呼び出し
 * - gRPC や メッセージキュー経由の通信
 * などが想定される
 *
 * ここではモックデータ + ランダム遅延 + 一定確率の障害で
 * マイクロサービスの振る舞いを擬似的に再現する
 */
@Injectable()
export class AirQualityService {
  private readonly logger = new Logger(AirQualityService.name);

  /** 障害発生確率 (20%) — BFFのフォールバック動作を体験するため */
  private readonly failureRate = 0.2;

  async getAirQuality(city: string): Promise<AirQualityResponse> {
    // 擬似的なネットワーク遅延 (100-500ms)
    const delay = 100 + Math.random() * 400;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // 一定確率で障害をシミュレート
    if (Math.random() < this.failureRate) {
      this.logger.warn(`Air quality service unavailable for city: ${city}`);
      throw new Error('Air quality service temporarily unavailable');
    }

    this.logger.log(`Fetched air quality for ${city} (${Math.round(delay)}ms)`);

    return this.generateMockData(city);
  }

  /** 都市名からシード値を生成し、一貫性のあるモックデータを返す */
  private generateMockData(city: string): AirQualityResponse {
    const seed = this.cityToSeed(city);
    const aqi = (seed % 5) + 1;

    const labels: Record<number, string> = {
      1: '良好',
      2: 'まずまず',
      3: '敏感な人には不健康',
      4: '不健康',
      5: '非常に不健康',
    };

    const advices: Record<number, string> = {
      1: '屋外活動に最適です。',
      2: '通常の屋外活動が可能です。',
      3: '敏感な方は長時間の屋外活動を控えてください。',
      4: '屋外での激しい運動を避けてください。',
      5: '屋外活動を控え、マスクの着用を推奨します。',
    };

    return {
      aqi,
      label: labels[aqi],
      components: {
        pm2_5: Math.round((seed * 1.3 + 5) % 80),
        pm10: Math.round((seed * 2.1 + 10) % 120),
        no2: Math.round((seed * 0.8 + 3) % 60),
        o3: Math.round((seed * 1.5 + 20) % 100),
        co: Math.round((seed * 0.3 + 100) % 500),
      },
      healthAdvice: advices[aqi],
    };
  }

  private cityToSeed(city: string): number {
    return Array.from(city.toLowerCase()).reduce(
      (sum, char) => sum + char.charCodeAt(0),
      0,
    );
  }
}
