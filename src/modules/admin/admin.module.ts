import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    AuthModule,
    BookingModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminModule { }
