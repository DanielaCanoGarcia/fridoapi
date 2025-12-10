import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLecturaDto } from './dto/create-lectura.dto';
import { UpdateLecturaDto } from './dto/update-lectura.dto';

@Injectable()
export class LecturasService {
  constructor(private prisma: PrismaService) {}

  async crearLectura(idTutor: number, dto: CreateLecturaDto) {
    return this.prisma.lecturas.create({
      data: {
        titulo: dto.titulo,
        portada_url: dto.portada_url,
        nivel: dto.nivel,
        posted_by: idTutor,
      },
    });
  }

  async listarTodas() {
    return this.prisma.lecturas.findMany({
      orderBy: { creado_en: 'desc' },
      include: {
        usuario: {
          select: { id_usuario: true, nombre: true, apellido_pat: true, correo: true },
        },
      },
    });
  }

  async obtenerLectura(idLectura: number) {
    const lectura = await this.prisma.lecturas.findUnique({
      where: { id_lecturas: idLectura },
      include: {
        usuario: {
          select: { id_usuario: true, nombre: true, apellido_pat: true, correo: true },
        },
        secciones: {
          orderBy: { order_index: 'asc' },
        },
      },
    });
    if (!lectura) throw new NotFoundException('Lectura no encontrada');
    return lectura;
  }

  async actualizarLectura(idTutor: number, idLectura: number, dto: UpdateLecturaDto) {
    const lectura = await this.prisma.lecturas.findUnique({ where: { id_lecturas: idLectura } });
    if (!lectura) throw new NotFoundException('Lectura no encontrada');
    if (lectura.posted_by !== idTutor) {
      throw new ForbiddenException('No puedes editar una lectura que no creaste');
    }
    return this.prisma.lecturas.update({
      where: { id_lecturas: idLectura },
      data: {
        titulo: dto.titulo ?? lectura.titulo,
        portada_url: dto.portada_url ?? lectura.portada_url,
        nivel: dto.nivel ?? lectura.nivel,
      },
    });
  }

  async eliminarLectura(idTutor: number, idLectura: number) {
    const lectura = await this.prisma.lecturas.findUnique({ where: { id_lecturas: idLectura } });
    if (!lectura) throw new NotFoundException('Lectura no encontrada');
    if (lectura.posted_by !== idTutor) {
      throw new ForbiddenException('No puedes eliminar una lectura que no creaste');
    }
    return this.prisma.lecturas.delete({ where: { id_lecturas: idLectura } });
  }
}
