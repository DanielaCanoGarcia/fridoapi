import { Module } from '@nestjs/common';
import { RespuestasAlumnoService } from './respuesta-alumno.service';
import { RespuestasAlumnoController } from './respuesta-alumno.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RespuestasAlumnoController],
  providers: [RespuestasAlumnoService],
})
export class RespuestasAlumnoModule {}
