import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Customer {
  @Prop({ type: String })
  email?: string;

  @Prop({ type: String })
  phoneNumber?: string;

  @Prop({ type: String })
  password?: string;

  @Prop({ type: String })
  otp?: string;

  @Prop({ type: String })
  address?: string;

  @Prop({ type: String })
  city?: string;

  @Prop({ type: String })
  name?: string;

  @Prop({ type: String })
  displayName?: string;

  @Prop({ type: String })
  pincode?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomerCars' })
  cars?: mongoose.Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  termsAndConditionsAccepted: boolean;

  @Prop({ type: Number, default: 0 })
  notificationCount: number;

  @Prop({ type: Boolean, default: false })
  isAccountVerified: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.index({ email: 1, phoneNumber: 1 }, { unique: true });
