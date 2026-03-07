import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Discount {
  @Prop({ type: String })
  name?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Number })
  percentage?: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
