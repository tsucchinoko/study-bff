import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ExternalApiModule } from '../external-api/external-api.module';

@Module({
  imports: [ExternalApiModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
