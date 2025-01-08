import { Repository } from 'typeorm';
import { IBaseEntity } from '../entities/base.entity';
import { BadRequestException } from '@nestjs/common';

export class BaseService<T extends IBaseEntity> {
    constructor(private readonly repository: Repository<T>) {}

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<T> {
        if(! await this.repository.exists({where: {id: id as any}})){ 
            throw new BadRequestException('Data not found');
        }
        return await this.repository.findOneByOrFail({id: id as any});
    }

    async create(entity: T): Promise<T> {
        (entity as any).createdDate = new Date();
        return await this.repository.save(entity);
    }

    async update(entity: T): Promise<T> {
        if(! await this.repository.exists({where: {id: entity.id as any}})){ 
            throw new BadRequestException('Data not found');
        }
        return await this.repository.save(entity);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}