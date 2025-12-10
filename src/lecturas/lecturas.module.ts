import { Module } from '@nestjs/common';
import { LecturasService } from './lecturas.service';
import { LecturasController } from './lecturas.controller';
import { PrismaModule } from '../prisma/prisma.module'; // importa si tu PrismaModule NO es global

@Module({
  imports: [PrismaModule],
  controllers: [LecturasController],
  providers: [LecturasService],
  exports: [LecturasService],
})
export class LecturasModule {}
