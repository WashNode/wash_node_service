import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Vendor extends Document {
  @Prop({
    type: String,
    required: [true, 'can\'t be blank'],
  })
  email: string;

  @Prop({ type: String })
  phoneNumber?: string;

  @Prop({ type: String })
  password?: string;

  @Prop({ type: Number })
  otp?: number;

  @Prop({ type: String })
  address?: string;

  @Prop({ type: String })
  city?: string;

  @Prop({ type: String })
  shopName?: string;

  @Prop({ type: String })
  establishmentYear?: string;

  @Prop({ type: String })
  ownerName?: string;

  @Prop({ type: String })
  addressProof?: string;

  @Prop({ type: Boolean, default: false })
  termsAndConditionsAccepted: boolean;

  @Prop([String])
  zone?: string[];

  @Prop({ type: Number })
  vendorNumber?: number;

  @Prop([
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
      serviceIncludes: String,
      servicePrice: Number,
      isMinAmount: {
        type: Boolean,
        default: false,
      },
    },
  ])
  services?: {
    serviceId: mongoose.Types.ObjectId;
    serviceIncludes: string;
    servicePrice: number;
    isMinAmount: boolean;
  }[];

  @Prop([String])
  images?: string[];

  @Prop({ type: Number })
  rating?: number;

  @Prop({ type: Number, default: 0 })
  notificationCount: number;

  @Prop({ type: Number })
  bookingCount?: number;

  @Prop({ type: String })
  token?: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discount',
    },
  ])
  discount?: mongoose.Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  isPickupAvailable: boolean;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);

VendorSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'vendorId',
  justOne: false,
});

VendorSchema.index({ email: 1 }, { unique: true });
