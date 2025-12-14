import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRespuestaAlumnoDto } from './dto/create-respuesta-alumno.dto';
import { UpdateRespuestaAlumnoDto } from './dto/update-respuesta-alumno.dto';

@Injectable()
export class RespuestasAlumnoService {
  constructor(private prisma: PrismaService) {}

  async crear(idUsuario: number, dto: CreateRespuestaAlumnoDto) {
    const alumnoLectura = await this.prisma.alumno_lectura.findUnique({
      where: { id_alumno_lectura: dto.id_alumno_lectura },
      include: { alumno: true },
    });

    if (!alumnoLectura)
      throw new NotFoundException('Registro alumno_lectura no encontrado');

    if (alumnoLectura.alumno.id_usuario !== idUsuario)
      throw new ForbiddenException('No tienes permiso');

    return this.prisma.respuestas_alumno.create({
      data: {
        id_alumno_lectura: dto.id_alumno_lectura,
        id_pregunta: dto.id_pregunta,
        id_opcion: dto.id_opcion,
        es_correcta: dto.es_correcta,
      },
    });
  }

  listarPorAlumnoLectura(idAlumnoLectura: number) {
    return this.prisma.respuestas_alumno.findMany({
      where: { id_alumno_lectura: idAlumnoLectura },
      include: {
        pregunta: true,
        opcion: true,
      },
    });
  }

  async actualizar(
    idUsuario: number,
    idRespuesta: number,
    dto: UpdateRespuestaAlumnoDto,
  ) {
    const respuesta = await this.prisma.respuestas_alumno.findUnique({
      where: { id_respuestas_alumno: idRespuesta },
      include: {
        alumno_lectura: {
          include: { alumno: true },
        },
      },
    });

    if (!respuesta)
      throw new NotFoundException('Respuesta no encontrada');

    if (respuesta.alumno_lectura.alumno.id_usuario !== idUsuario)
      throw new ForbiddenException('No tienes permiso');

    return this.prisma.respuestas_alumno.update({
      where: { id_respuestas_alumno: idRespuesta },
      data: dto,
    });
  }
}
