import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Zone {
  @Prop({
    type: String,
    required: [true, 'can\'t be blank'],
  })
  zoneName: string;

  @Prop({ type: Boolean, default: true })
  activeStatus: boolean;

  @Prop({ type: Number })
  zoneNumber?: number;

  @Prop({ type: String, default: 'CB' })
  district: string;

  @Prop({ type: Boolean, default: false })
  isDefault: boolean;
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);
