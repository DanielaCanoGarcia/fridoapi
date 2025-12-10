import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';

@Module({
  imports: [],
  controllers: [AlumnoController],
  providers: [AlumnoService],
  exports: [AlumnoService],
})
export class AlumnoModule {}
