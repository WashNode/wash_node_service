import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class VendorAvailability {
  @Prop({
    type: Date,
    required: true,
  })
  date: Date;

  @Prop({ type: Array })
  booked?: any[];

  @Prop({ type: Array })
  blocked?: any[];

  @Prop({
    type: String,
    required: true,
  })
  vendorId: string;
}

export const VendorAvailabilitySchema = SchemaFactory.createForClass(VendorAvailability);

// Add index
VendorAvailabilitySchema.index({
  vendorId: 1,
  date: 1,
}, {
});
