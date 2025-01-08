import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/utils/base.service';
import { Student } from 'src/entities/student.entity';
import { In, Repository } from 'typeorm';
import { Parent } from 'src/entities/parent.entity';

@Injectable()
export class StudentService extends BaseService<Student> {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Parent)
        private readonly parentRepository: Repository<Parent>
    ) {
        super(studentRepository);
    }

    async findByIdWithParent(id: number): Promise<Student> {
        if(! await this.studentRepository.exists({where: {id: id}})){ 
            throw new BadRequestException('Data not found');
        }
        return await this.studentRepository.findOneOrFail({ where: {id: id}, relations: {parent: true} });
    }

    override async create(entity: Student): Promise<Student> {
        if(! await this.parentRepository.exists({where: {id: entity.parent.id}})){
            throw new BadRequestException('Parent not found');
        }
        entity.createdDate = new Date();
        return await this.studentRepository.save(entity);
    }

    override async update(entity: Student): Promise<Student> {
        if(! await this.studentRepository.exists({where: {id: entity.id}})){
            throw new BadRequestException('Student not found');
        }
        if(! await this.parentRepository.exists({where: {id: entity.parent.id}})){
            throw new BadRequestException('Parent not found');
        }
        return await this.studentRepository.save(entity);
    }
}
