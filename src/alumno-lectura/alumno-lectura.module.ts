import { Module } from '@nestjs/common';
import { AlumnoLecturaService } from './alumno-lectura.service';
import { AlumnoLecturaController } from './alumno-lectura.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AlumnoLecturaController],
  providers: [AlumnoLecturaService],
})
export class AlumnoLecturaModule {}
