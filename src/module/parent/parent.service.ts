import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/utils/base.service';
import { Parent } from 'src/entities/parent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService extends BaseService<Parent> {
    constructor(
        @InjectRepository(Parent)
        private readonly parentRepository: Repository<Parent>
    ) {
        super(parentRepository);
    }

    async findByIdWithStudent(id: number): Promise<Parent> {
        if(! await this.parentRepository.exists({where: {id: id}})){ 
            throw new BadRequestException('Data not found');
        }
        return await this.parentRepository.findOneOrFail({ where: {id: id}, relations: ['students'] });
    }
}
