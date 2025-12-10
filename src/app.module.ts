import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AlumnoModule } from './alumno/alumno.module';
import { LecturasModule } from './lecturas/lecturas.module';
import { SeccionesModule } from './secciones/secciones.module';

@Module({
  imports: [UsuarioModule, PrismaModule, AuthModule, AlumnoModule, LecturasModule, SeccionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
