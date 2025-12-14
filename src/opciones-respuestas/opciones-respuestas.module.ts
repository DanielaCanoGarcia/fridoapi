import { Module } from '@nestjs/common';
import { OpcionesService } from './opciones-respuestas.service';
import { OpcionesController } from './opciones-respuestas.controller';

@Module({
  controllers: [OpcionesController],
  providers: [OpcionesService],
})
export class OpcionesRespuestasModule {}
