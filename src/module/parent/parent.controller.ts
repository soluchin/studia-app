import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ParentService } from './parent.service';
import { Parent } from 'src/entities/parent.entity';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Exclude, plainToClass } from 'class-transformer';
import { Student } from 'src/entities/student.entity';
import { ResponseTemplate } from 'src/utils/response-template.util';
import e from 'express';

class CreateParentDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 15)
    phoneNumber: string;

    @IsOptional()
    @IsString()
    address: string;
}

class UpdateParentDto extends CreateParentDto{
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

class ParentResponseDto extends Parent{
    // exclude some attributes
}

class ParentDropdownDto extends Parent{
    @Exclude()
    email: string;

    @Exclude()
    phoneNumber: string;

    @Exclude()
    address: string;

    @Exclude()
    students: Student[];
}

@Controller('parent')
export class ParentController {
    constructor(
        private readonly parentService: ParentService
    ) {}

    @Get('/getall')
    @HttpCode(HttpStatus.OK)
    async getAll() {
        try {
            var data = await this.parentService.findAll();
            return ResponseTemplate(
                HttpStatus.OK,
                data.map(parent => plainToClass(ParentResponseDto, parent))
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
            var data = await this.parentService.findByIdWithStudent(id);
            return ResponseTemplate(
                HttpStatus.OK,
                plainToClass(ParentResponseDto, data)
            );
        }catch(error){
            throw error;
        }
    }

    @Get('/dropdown')
    @HttpCode(HttpStatus.OK)
    async dropdown() {
        try {
            var data = await this.parentService.findAll();
            return ResponseTemplate(
                HttpStatus.OK,
                data.map(parent => plainToClass(ParentDropdownDto, parent))
            );
        } catch (error) {
            throw error;
        }
    }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() body: CreateParentDto
    ) {
        try {
            const entity = plainToClass(Parent, body);
            var data = await this.parentService.create(entity);
            return ResponseTemplate(
                HttpStatus.CREATED,
                plainToClass(ParentResponseDto, data)
            );
        } catch (error) {
            throw error;
        }
    }

    @Post('/update')
    @HttpCode(HttpStatus.OK)
    async update(
        @Body() body: UpdateParentDto
    ) {
        try {
            const entity = plainToClass(Parent, body);
            var data = await this.parentService.update(entity);
            return ResponseTemplate(
                HttpStatus.OK,
                plainToClass(ParentResponseDto, data)
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
            await this.parentService.delete(id);
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