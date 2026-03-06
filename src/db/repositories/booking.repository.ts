import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from '../schemas/booking.schema';

/**
 * Encapsulates all database interactions for the booking aggregate.
 * Keeping Mongoose model usage confined to this layer allows the service
 * to focus purely on business logic and makes the code easier to test.
 */
@Injectable()
export class BookingRepository {
    constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) { }

    async create(bookingData: Partial<Booking>): Promise<Booking> {
        const created = new this.bookingModel(bookingData);
        return created.save();
    }

    async findOne(filter: any): Promise<Booking | null> {
        return this.bookingModel.findOne(filter).exec();
    }

    async findAll(filter: any = {}): Promise<Booking[]> {
        return this.bookingModel.find(filter).exec();
    }

    async findById(id: string): Promise<Booking | null> {
        return this.bookingModel.findById(id).exec();
    }

    async updateOne(filter: any, update: any): Promise<Booking | null> {
        return this.bookingModel.findOneAndUpdate(filter, update, { new: true }).exec();
    }

    async deleteOne(filter: any): Promise<any> {
        return this.bookingModel.deleteOne(filter).exec();
    }

    async count(filter: any = {}): Promise<number> {
        return this.bookingModel.countDocuments(filter).exec();
    }
}