import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Student } from 'src/entities/student.entity';
import { StudentService } from './student.service';
import { ResponseTemplate } from 'src/utils/response-template.util';
import { plainToClass } from 'class-transformer';
import { Parent } from 'src/entities/parent.entity';

class CreateStudentDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    parentId: number;
}

class UpdateStudentDto extends CreateStudentDto{
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

class StudentResponseDto extends Student{
    // exclude some attributes
}

@Controller('student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) {}

    @Get('/getall')
    @HttpCode(HttpStatus.OK)
    async getAll() {
        try {
            var data = await this.studentService.findAll();
            return ResponseTemplate(
                HttpStatus.OK,
                data.map(parent => plainToClass(StudentResponseDto, parent))
            );
        } catch (error) {
            throw error;
        }
    }

    @Get('/getbyid/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id') id: number
    ) {
        try {
            var data = await this.studentService.findByIdWithParent(id);
            return ResponseTemplate(
                HttpStatus.OK,
                plainToClass(StudentResponseDto, data)
            );
        }catch(error){
            throw error;
        }
    }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() body: CreateStudentDto
    ) {
        try {
            var entity = plainToClass(Student, body);
            entity.parent = new Parent({ id: body.parentId });
            var data = await this.studentService.create(entity);
            return ResponseTemplate(
                HttpStatus.CREATED,
                plainToClass(StudentResponseDto, data)
            );
        } catch (error) {
            throw error;
        }
    }

    @Post('/update')
    @HttpCode(HttpStatus.OK)
    async update(
        @Body() body: UpdateStudentDto
    ) {
        try {
            var entity = plainToClass(Student, body);
            entity.parent = new Parent({ id: body.parentId });
            var data = await this.studentService.update(entity);
            return ResponseTemplate(
                HttpStatus.OK,
                plainToClass(StudentResponseDto, data)
            )
        } catch (error) {
            throw error;
        }
    }

    @Delete('/delete')
    @HttpCode(HttpStatus.OK)
    async delete(
        @Query('id') id: number
    ) {
        try {
            await this.studentService.delete(id);
            return ResponseTemplate(
                HttpStatus.OK,
                null,
                "Deleted successfully"
            )
        } catch (error) {
            throw error;
        }
    }
}
