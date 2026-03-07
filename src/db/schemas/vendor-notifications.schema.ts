import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class VendorNotifications {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: [true, 'can\'t be blank'],
  })
  vendorId: mongoose.Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isRead: boolean;

  @Prop({ type: String })
  message?: string;
}

export const VendorNotificationsSchema = SchemaFactory.createForClass(VendorNotifications);

// Add index
VendorNotificationsSchema.index({
  vendorId: 1
});
