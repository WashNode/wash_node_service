import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DiscountModule } from './discount/discount.module';
import { ServicesModule } from './services/services.module';
import { VendorsModule } from './vendor/vendors.module';

@Module({
  imports: [
    AuthModule,
    BookingModule,
    DashboardModule,
    DiscountModule,
    ServicesModule,
    VendorsModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminModule { }
