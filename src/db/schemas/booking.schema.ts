import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Booking {
    @Prop({
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'Cancelled'],
        default: 'Accepted',
    })
    requestStatus: string;

    @Prop({
        type: String,
        enum: ['Yet to start', 'In Progress', 'Completed'],
        default: 'Yet to start',
    })
    jobStatus: string;

    @Prop({ type: String })
    cancelReason?: string;

    @Prop({ type: Date })
    date?: Date;

    @Prop({ type: String })
    timeslot?: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'can\'t be blank'],
    })
    requestBy: mongoose.Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: [true, 'can\'t be blank'],
    })
    requestTo: mongoose.Types.ObjectId;

    @Prop([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: [true, 'can\'t be blank'],
        },
    ])
    service: mongoose.Types.ObjectId[];

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerCars',
        required: [true, 'can\'t be blank'],
    })
    carInfo: mongoose.Types.ObjectId;

    @Prop({ type: String })
    referenceId?: string;

    @Prop({ type: Date })
    startedAt?: Date;

    @Prop({ type: Date })
    completedAt?: Date;

    @Prop({ type: String })
    servicedBy?: string;

    @Prop({ type: Number, default: 0 })
    serviceAmount: number;

    @Prop({ type: Boolean, default: false })
    isPickUp: boolean;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

// Add index
BookingSchema.index({ requestBy: 1, requestTo: 1 });
