import { Model } from 'mongoose';

/**
 * Base repository class that provides common CRUD operations
 * for all repositories to inherit from.
 */
export abstract class BaseRepository<T> {
    abstract getModel(): Model<T>;

    async create(data: Partial<T>): Promise<T> {
        const model = this.getModel();
        const created = new model(data);
        return created.save() as unknown as T;
    }

    async findOne(filter: any): Promise<T | null> {
        const model = this.getModel();
        return model.findOne(filter).exec() as unknown as T | null;
    }

    async findAll(filter: any = {}): Promise<T[]> {
        const model = this.getModel();
        return model.find(filter).exec() as unknown as T[];
    }

    async findBySelectedFields(filter: any = {}, fields: string[]): Promise<T[]> {
        const model = this.getModel();
        return model.find(filter).select(fields).exec() as unknown as T[];
    }

    async findById(id: string): Promise<T | null> {
        const model = this.getModel();
        return model.findById(id).exec() as unknown as T | null;
    }

    async updateOne(filter: any, update: any): Promise<T | null> {
        const model = this.getModel();
        return model.findOneAndUpdate(filter, update, { new: true }).exec() as unknown as T | null;
    }

    async deleteOne(filter: any): Promise<any> {
        const model = this.getModel();
        return model.deleteOne(filter).exec();
    }

    async count(filter: any = {}): Promise<number> {
        const model = this.getModel();
        return model.countDocuments(filter).exec();
    }
}
