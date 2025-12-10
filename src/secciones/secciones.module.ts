import { Module } from '@nestjs/common';
import { SeccionesService } from './secciones.service';
import { SeccionesController } from './secciones.controller';
import { PrismaModule } from '../prisma/prisma.module'; // importa si tu PrismaModule no es global

@Module({
  imports: [PrismaModule],
  controllers: [SeccionesController],
  providers: [SeccionesService],
  exports: [SeccionesService],
})
export class SeccionesModule {}
