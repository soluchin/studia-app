import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { Parent } from 'src/entities/parent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    TypeOrmModule.forFeature([Parent])
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
