import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Service {
  @Prop({
    type: String,
    required: [true, 'can\'t be blank'],
  })
  serviceName: string;

  @Prop({ type: String })
  serviceIncludes?: string;

  @Prop({ type: Number })
  servicePrice?: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

// Add index
ServiceSchema.index({
  serviceName: 1,
}, {
  unique: true
});
