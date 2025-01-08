import { BaseEntity } from "src/entities/base.entity";
import { Parent } from "src/entities/parent.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('Student')
export class Student extends BaseEntity<Student> {
    @Column({name: 'name', type: 'varchar', length: 50})
    name: string;

    @ManyToOne(() => Parent, parent => parent.students)
    parent: Parent;
}