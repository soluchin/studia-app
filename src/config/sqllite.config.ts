import './env.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const sqliteConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'sqlite.db',

    autoLoadEntities: true,
    synchronize: true,
};