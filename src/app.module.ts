import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './module/student/student.module';
import { ParentModule } from './module/parent/parent.module';
import { EntitiesModule } from './utils/entities.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'dist'),
      exclude: ['/api*'],
    }),
    StudentModule,
    ParentModule,
    EntitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
