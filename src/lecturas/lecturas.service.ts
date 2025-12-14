import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLecturaDto } from './dto/create-lectura.dto';
import { UpdateLecturaDto } from './dto/update-lectura.dto';

@Injectable()
export class LecturasService {
  constructor(private prisma: PrismaService) {}

  async crear(idUsuario: number, dto: CreateLecturaDto) {
    // 1️⃣ Validación de rol (solo tutor)
    const usuario = await this.prisma.usuario.findUnique({
      where: { id_usuario: idUsuario },
    });

    if (!usuario || usuario.rol !== 'tutor') {
      throw new ForbiddenException('Solo los tutores pueden crear lecturas');
    }

    // 2️⃣ Transacción
    return this.prisma.$transaction(async (tx) => {
      // A. Crear lectura
      const lectura = await tx.lecturas.create({
        data: {
          titulo: dto.titulo,
          nivel: dto.nivel,
          portada_url: dto.portada_url,
          posted_by: idUsuario,
        },
      });

      // B. Crear secciones
      if (dto.secciones?.length > 0) {
        await tx.secciones.createMany({
          data: dto.secciones.map((sec) => ({
            id_lecturas: lectura.id_lecturas,
            texto: sec.texto,
            ilustracion_url: sec.ilustracion_url,
            order_index: sec.order_index,
          })),
        });
      }

      // C. Devolver lectura + secciones
      return tx.lecturas.findUnique({
        where: { id_lecturas: lectura.id_lecturas },
        include: {
          secciones: {
            orderBy: { order_index: 'asc' },
          },
        },
      });
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

  async actualizarLectura(
    idTutor: number,
    idLectura: number,
    dto: UpdateLecturaDto,
  ) {
    const lectura = await this.prisma.lecturas.findUnique({
      where: { id_lecturas: idLectura },
    });

    if (!lectura) {
      throw new NotFoundException('Lectura no encontrada');
    }

    if (lectura.posted_by !== idTutor) {
      throw new ForbiddenException(
        'No puedes editar una lectura que no creaste',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Actualizar lectura
      await tx.lecturas.update({
        where: { id_lecturas: idLectura },
        data: {
          titulo: dto.titulo ?? lectura.titulo,
          nivel: dto.nivel ?? lectura.nivel,
          portada_url: dto.portada_url ?? lectura.portada_url,
        },
      });

      // 2️⃣ Si vienen secciones → borrar e insertar
      if (dto.secciones) {
        // borrar secciones anteriores
        await tx.secciones.deleteMany({
          where: { id_lecturas: idLectura },
        });

        // crear nuevas secciones
        if (dto.secciones.length > 0) {
          await tx.secciones.createMany({
            data: dto.secciones.map((sec) => ({
              id_lecturas: idLectura,
              texto: sec.texto,
              ilustracion_url: sec.ilustracion_url,
              order_index: sec.order_index,
            })),
          });
        }
      }

      // 3️⃣ devolver lectura completa
      return tx.lecturas.findUnique({
        where: { id_lecturas: idLectura },
        include: {
          secciones: {
            orderBy: { order_index: 'asc' },
          },
        },
      });
    });
  }


  async eliminarLectura(idTutor: number, idLectura: number) {
    const lectura = await this.prisma.lecturas.findUnique({
      where: { id_lecturas: idLectura },
    });

    if (!lectura) throw new NotFoundException('Lectura no encontrada');

    if (lectura.posted_by !== idTutor) {
      throw new ForbiddenException('No puedes eliminar una lectura que no creaste');
    }

    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Eliminar secciones
      await tx.secciones.deleteMany({
        where: { id_lecturas: idLectura },
      });

      // 2️⃣ Eliminar preguntas (si existen)
      await tx.preguntas.deleteMany({
        where: { id_lecturas: idLectura },
      });

      // 3️⃣ Eliminar lectura
      return tx.lecturas.delete({
        where: { id_lecturas: idLectura },
      });
    });
  }

}
