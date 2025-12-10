import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';

@Injectable()
export class SeccionesService {
  constructor(private prisma: PrismaService) {}

  async listarPorLectura(idLectura: number) {
    return this.prisma.secciones.findMany({
      where: { id_lecturas: idLectura },
      orderBy: { order_index: 'asc' },
    });
  }

  async crearSeccion(idUsuario: number, dto: CreateSeccionDto) {
    const lectura = await this.prisma.lecturas.findUnique({
      where: { id_lecturas: dto.id_lecturas },
      select: { posted_by: true },
    });
    if (!lectura) throw new NotFoundException('Lectura no encontrada');

    if (lectura.posted_by !== idUsuario) {
      throw new ForbiddenException('No tienes permisos para agregar secciones a esta lectura');
    }

    const existsIndex = await this.prisma.secciones.findFirst({
      where: { id_lecturas: dto.id_lecturas, order_index: dto.order_index },
    });
    if (existsIndex) {
      throw new BadRequestException('Ya existe una sección con ese order_index en la lectura');
    }

    return this.prisma.secciones.create({
      data: {
        id_lecturas: dto.id_lecturas,
        texto: dto.texto,
        ilustracion_url: dto.ilustracion_url,
        order_index: dto.order_index,
      },
    });
  }

  async obtenerSeccion(idSeccion: number) {
    const seccion = await this.prisma.secciones.findUnique({
      where: { id_secciones: idSeccion },
    });
    if (!seccion) throw new NotFoundException('Sección no encontrada');
    return seccion;
  }

  async actualizarSeccion(idUsuario: number, idSeccion: number, dto: UpdateSeccionDto) {
    const seccion = await this.prisma.secciones.findUnique({
      where: { id_secciones: idSeccion },
      include: { lectura: true },
    });
    if (!seccion) throw new NotFoundException('Sección no encontrada');

    if (seccion.lectura.posted_by !== idUsuario) {
      throw new ForbiddenException('No tienes permisos para editar esta sección');
    }

    if (dto.order_index !== undefined) {
      const conflict = await this.prisma.secciones.findFirst({
        where: {
          id_lecturas: seccion.id_lecturas,
          order_index: dto.order_index,
          NOT: { id_secciones: idSeccion },
        },
      });
      if (conflict) {
        throw new BadRequestException('Otra sección ya usa ese order_index');
      }
    }

    return this.prisma.secciones.update({
      where: { id_secciones: idSeccion },
      data: {
        texto: dto.texto ?? seccion.texto,
        ilustracion_url: dto.ilustracion_url ?? seccion.ilustracion_url,
        order_index: dto.order_index ?? seccion.order_index,
      },
    });
  }

  async eliminarSeccion(idUsuario: number, idSeccion: number) {
    const seccion = await this.prisma.secciones.findUnique({
      where: { id_secciones: idSeccion },
      include: { lectura: true },
    });
    if (!seccion) throw new NotFoundException('Sección no encontrada');

    if (seccion.lectura.posted_by !== idUsuario) {
      throw new ForbiddenException('No tienes permisos para eliminar esta sección');
    }

    return this.prisma.secciones.delete({ where: { id_secciones: idSeccion } });
  }
}
