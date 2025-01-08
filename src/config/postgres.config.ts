import './env.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const postgresConfig: TypeOrmModuleOptions = {
    type: 'postgres',

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,

    autoLoadEntities: true,
    synchronize: true,
};