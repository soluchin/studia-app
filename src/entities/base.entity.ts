import { Exclude } from "class-transformer";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export interface IBaseEntity{
    id: number;
    createdDate: Date;
}

export class BaseEntity<T> implements IBaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Exclude()
    @Column({name: 'created_date', nullable: true})
    createdDate: Date;
  
    constructor(entity: Partial<T>){
      Object.assign(this, entity);
    }
}