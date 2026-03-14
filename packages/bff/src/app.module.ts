import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WeatherModule } from "./weather/weather.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ExternalApiModule } from "./external-api/external-api.module";
import { CacheConfigModule } from "./cache/cache.module";

@Module({
  imports: [
    // 環境変数の読み込み (.envファイル対応)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    CacheConfigModule,
    ExternalApiModule,
    WeatherModule,
    DashboardModule,
  ],
})
export class AppModule {}
