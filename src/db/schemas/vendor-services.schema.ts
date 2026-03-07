import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class VendorServices {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: [true, 'can\'t be blank'],
  })
  vendorId: mongoose.Types.ObjectId;

  @Prop({ type: String })
  email?: string;

  @Prop({ type: String })
  customerName?: string;

  @Prop({ type: String })
  contactNumber?: string;

  @Prop({ type: String })
  carRegistrationNo?: string;

  @Prop({ type: String })
  carType?: string;

  @Prop({ type: String })
  carModel?: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'can\'t be blank'],
    },
  ])
  services: mongoose.Types.ObjectId[];

  @Prop({ type: String })
  servicedBy?: string;

  @Prop({ type: Number, default: 0 })
  serviceAmount: number;

  @Prop({
    type: String,
    default: 'Cash',
    enum: ['UPI', 'Cash', 'Others']
  })
  paymentMode: string;
}

export const VendorServicesSchema = SchemaFactory.createForClass(VendorServices);

// Add index
VendorServicesSchema.index({
  vendorId: 1,
});
