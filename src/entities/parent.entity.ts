import { BaseEntity } from "src/entities/base.entity";
import { Student } from "src/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('Parent')
export class Parent extends BaseEntity<Parent> {
    @Column({name: 'name', type: 'varchar', length: 50})
    name: string;

    @Column({name: 'email', type: 'varchar', length: 50, unique: true})
    email: string;

    @Column({name: 'phone_number', type: 'varchar', length: 50, unique: true})
    phoneNumber: string;

    @Column({name: 'address', type: 'varchar', length: 50, nullable: true})
    address: string;

    @OneToMany(() => Student, student => student.parent, { cascade: true, onDelete: 'CASCADE' })
    students: Student[];
}