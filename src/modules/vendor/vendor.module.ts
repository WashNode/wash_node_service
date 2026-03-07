import { Module } from '@nestjs/common';
import { VendorAuthModule } from './auth/vendor-auth.module';
import { VendorAvailabilityModule } from './availability/vendor-availability.module';

@Module({
    imports: [
        VendorAuthModule,
        VendorAvailabilityModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class VendorModule { }
