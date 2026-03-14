import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

/**
 * キャッシュモジュール
 *
 * BFFパターンの重要な要素:
 * - 外部APIへのリクエストを減らす
 * - レスポンス速度を向上
 * - レート制限対策
 *
 * TTL: 300秒（5分）
 * ストア: インメモリ（本番ではRedis等に切り替え可能）
 */
@Global()
@Module({
  imports: [
    CacheModule.register({
      ttl: 300_000, // 5分 (ミリ秒)
      max: 100, // 最大エントリ数
    }),
  ],
  exports: [CacheModule],
})
export class CacheConfigModule {}
