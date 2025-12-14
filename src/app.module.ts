import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AlumnoModule } from './alumno/alumno.module';
import { LecturasModule } from './lecturas/lecturas.module';
import { SeccionesModule } from './secciones/secciones.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { OpcionesRespuestasModule } from './opciones-respuestas/opciones-respuestas.module';
import { AlumnoLecturaModule } from './alumno-lectura/alumno-lectura.module';
import { RespuestasAlumnoModule } from './respuesta-alumno/respuesta-alumno.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // <--- Agregado
    UsuarioModule,
    PrismaModule,
    AuthModule,
    AlumnoModule,
    LecturasModule,
    SeccionesModule,
    PreguntasModule,
    OpcionesRespuestasModule,
    AlumnoLecturaModule,
    RespuestasAlumnoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
