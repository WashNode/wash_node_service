import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DiscountModule } from './discount/discount.module';

@Module({
  imports: [
    AuthModule,
    BookingModule,
    DashboardModule,
    DiscountModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminModule { }
