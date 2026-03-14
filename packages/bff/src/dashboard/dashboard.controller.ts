import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

/**
 * DashboardController
 *
 * BFFパターンのメリットが最も分かりやすいエンドポイント:
 *
 * クライアントは1回のリクエストで3つのサービスのデータを取得できる。
 * BFFなしの場合、クライアントが以下を個別に呼び出す必要がある:
 *   1. GET /api/weather?city=Tokyo
 *   2. GET /api/air-quality?city=Tokyo
 *   3. GET /api/news?city=Tokyo
 *
 * さらに、Web/Mobile で異なるレスポンスを返すことで
 * 各クライアントに最適化されたデータを提供する。
 */
@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * Web向けダッシュボード
   *
   * 1リクエストで取得:
   * - 天気（詳細 + 3時間毎の予報）
   * - 大気品質（汚染物質の内訳付き）
   * - ニュース（全文 + URL）
   * - サービス稼働状況
   */
  @Get('web/dashboard')
  async getWebDashboard(@Query('city') city: string) {
    this.validateCity(city);
    return this.dashboardService.getForWeb(city);
  }

  /**
   * モバイル向けダッシュボード
   *
   * 同じ3つのサービスから、モバイルに最適化した軽量レスポンス:
   * - 天気（3項目 + 日別予報）
   * - 大気品質（AQI数値のみ）
   * - ニュース（最新3件のタイトルのみ）
   */
  @Get('mobile/dashboard')
  async getMobileDashboard(@Query('city') city: string) {
    this.validateCity(city);
    return this.dashboardService.getForMobile(city);
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
