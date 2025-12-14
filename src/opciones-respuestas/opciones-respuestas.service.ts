import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOpcionDto } from './dto/create-opciones-respuesta.dto';
import { UpdateOpcionDto } from './dto/update-opciones-respuesta.dto';

@Injectable()
export class OpcionesService {
  constructor(private prisma: PrismaService) {}

  async crear(idUsuario: number, dto: CreateOpcionDto) {
    const pregunta = await this.prisma.preguntas.findUnique({
      where: { id_pregunta: dto.id_pregunta },
      include: { lectura: true },
    });

    if (!pregunta) throw new NotFoundException('Pregunta no encontrada');
    if (pregunta.lectura.posted_by !== idUsuario)
      throw new ForbiddenException('No tienes permiso');

    return this.prisma.opciones_respuesta.create({
      data: dto,
    });
  }

  async actualizar(
    idUsuario: number,
    idOpcion: number,
    dto: UpdateOpcionDto,
  ) {
    const opcion = await this.prisma.opciones_respuesta.findUnique({
      where: { id_opcion: idOpcion },
      include: { pregunta: { include: { lectura: true } } },
    });

    if (!opcion) throw new NotFoundException('Opción no encontrada');
    if (opcion.pregunta.lectura.posted_by !== idUsuario)
      throw new ForbiddenException('No tienes permiso');

    return this.prisma.opciones_respuesta.update({
      where: { id_opcion: idOpcion },
      data: dto,
    });
  }

  async eliminar(idUsuario: number, idOpcion: number) {
    const opcion = await this.prisma.opciones_respuesta.findUnique({
      where: { id_opcion: idOpcion },
      include: { pregunta: { include: { lectura: true } } },
    });

    if (!opcion) throw new NotFoundException('Opción no encontrada');
    if (opcion.pregunta.lectura.posted_by !== idUsuario)
      throw new ForbiddenException('No tienes permiso');

    return this.prisma.opciones_respuesta.delete({
      where: { id_opcion: idOpcion },
    });
  }
}
