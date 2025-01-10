import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from '../config/postgres.config';
import { Parent } from '../entities/parent.entity';
import { Student } from '../entities/student.entity';
import { sqliteConfig } from 'src/config/sqllite.config';

@Module({
    imports: [
        // TypeOrmModule.forRoot(postgresConfig),
        TypeOrmModule.forRoot(sqliteConfig),
        TypeOrmModule.forFeature([
            Parent,
            Student
        ]),
    ],
})
export class EntitiesModule {}
