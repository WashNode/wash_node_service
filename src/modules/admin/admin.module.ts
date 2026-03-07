import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    AuthModule,
    BookingModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminModule { }
