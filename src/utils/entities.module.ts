import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from '../config/postgres.config';
import { Parent } from '../entities/parent.entity';
import { Student } from '../entities/student.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot(postgresConfig),
        TypeOrmModule.forFeature([
            Parent,
            Student
        ]),
    ],
})
export class EntitiesModule {}
