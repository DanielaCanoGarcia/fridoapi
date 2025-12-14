import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';

@Injectable()
export class PreguntasService {
  constructor(private prisma: PrismaService) {}

  async crear(idUsuario: number, dto: CreatePreguntaDto) {
    const lectura = await this.prisma.lecturas.findUnique({
      where: { id_lecturas: dto.id_lecturas },
    });

    console.log('ID USUARIO JWT:', idUsuario);
    console.log('LECTURA POSTED_BY:', lectura?.posted_by);

    if (!lectura) throw new NotFoundException('Lectura no encontrada');
    if (lectura.posted_by !== idUsuario)
      throw new ForbiddenException('No tienes permiso');

    return this.prisma.preguntas.create({
      data: {
        id_lecturas: dto.id_lecturas,
        pregunta: dto.pregunta,
        orden: dto.orden,
      },
    });
  }

  listarPorLectura(idLectura: number) {
    return this.prisma.preguntas.findMany({
      where: { id_lecturas: idLectura },
      include: { opciones: true },
      orderBy: { orden: 'asc' },
    });
  }

  async actualizar(
    idUsuario: number,
    idPregunta: number,
    dto: UpdatePreguntaDto,
  ) {
    const pregunta = await this.prisma.preguntas.findUnique({
      where: { id_pregunta: idPregunta },
      include: { lectura: true },
    });

    if (!pregunta) throw new NotFoundException('Pregunta no encontrada');
    if (pregunta.lectura.posted_by !== idUsuario)
      throw new ForbiddenException('No tienes permiso');

    return this.prisma.preguntas.update({
      where: { id_pregunta: idPregunta },
      data: dto,
    });
  }

  async eliminar(idUsuario: number, idPregunta: number) {
    const pregunta = await this.prisma.preguntas.findUnique({
      where: { id_pregunta: idPregunta },
      include: { lectura: true },
    });

    if (!pregunta) throw new NotFoundException('Pregunta no encontrada');
    if (pregunta.lectura.posted_by !== idUsuario)
      throw new ForbiddenException('No tienes permiso');

    return this.prisma.preguntas.delete({
      where: { id_pregunta: idPregunta },
    });
  }
}
