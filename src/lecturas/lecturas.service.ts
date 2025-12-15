import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLecturaDto } from './dto/create-lectura.dto';
import { UpdateLecturaDto } from './dto/update-lectura.dto';

@Injectable()
export class LecturasService {
  constructor(private prisma: PrismaService) {}

  async crear(idUsuario: number, dto: CreateLecturaDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id_usuario: idUsuario },
    });

    if (!usuario || usuario.rol !== 'tutor') {
      throw new ForbiddenException('Solo los tutores pueden crear lecturas');
    }

    return this.prisma.$transaction(async (tx) => {
      // Crear lectura
      const lectura = await tx.lecturas.create({
        data: {
          titulo: dto.titulo,
          nivel: dto.nivel,
          portada_url: dto.portada_url,
          posted_by: idUsuario,
        },
      });

      // Crear secciones
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

      // Crear preguntas + opciones
      if (dto.preguntas?.length > 0) {
        for (const [index, pregunta] of dto.preguntas.entries()) {
          const nuevaPregunta = await tx.preguntas.create({
            data: {
              id_lecturas: lectura.id_lecturas,
              pregunta: pregunta.pregunta,
              orden: index + 1,
            },
          });

          if (pregunta.opciones?.length > 0) {
            await tx.opciones_respuesta.createMany({
              data: pregunta.opciones.map((op) => ({
                id_pregunta: nuevaPregunta.id_pregunta,
                opcion: op.opcion,
                es_correcta: op.es_correcta,
              })),
            });
          }
        }
      }

      // Devolver lectura completa con secciones y preguntas+opciones
      return tx.lecturas.findUnique({
        where: { id_lecturas: lectura.id_lecturas },
        include: {
          secciones: { orderBy: { order_index: 'asc' } },
          preguntas: {
            orderBy: { orden: 'asc' },
            include: { opciones: true },
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
      preguntas: {
        orderBy: { orden: 'asc' },
        include: { opciones: true }
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

  if (!lectura) throw new NotFoundException('Lectura no encontrada');
  if (lectura.posted_by !== idTutor)
    throw new ForbiddenException('No puedes editar una lectura que no creaste');

  return this.prisma.$transaction(async (tx) => {
    // Actualizar datos básicos
    await tx.lecturas.update({
      where: { id_lecturas: idLectura },
      data: {
        titulo: dto.titulo ?? lectura.titulo,
        nivel: dto.nivel ?? lectura.nivel,
        portada_url: dto.portada_url ?? lectura.portada_url,
      },
    });

    // Actualizar secciones
    if (dto.secciones) {
      await tx.secciones.deleteMany({ where: { id_lecturas: idLectura } });
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

    // Actualizar preguntas y opciones
    if (dto.preguntas) {
      // borrar opciones ligadas a las preguntas de esta lectura
      await tx.opciones_respuesta.deleteMany({
        where: { pregunta: { id_lecturas: idLectura } },
      });

      // borrar preguntas anteriores
      await tx.preguntas.deleteMany({ where: { id_lecturas: idLectura } });

      // crear nuevas preguntas y opciones
      for (const [index, preg] of dto.preguntas.entries()) {
        const nuevaPregunta = await tx.preguntas.create({
          data: {
            id_lecturas: idLectura,
            pregunta: preg.pregunta,
            orden: index + 1,
          },
        });

        if (preg.opciones?.length > 0) {
          await tx.opciones_respuesta.createMany({
            data: preg.opciones.map((op) => ({
              id_pregunta: nuevaPregunta.id_pregunta,
              opcion: op.opcion,
              es_correcta: op.es_correcta,
            })),
          });
        }
      }
    }

    // Devolver lectura completa
    return tx.lecturas.findUnique({
      where: { id_lecturas: idLectura },
      include: {
        secciones: { orderBy: { order_index: 'asc' } },
        preguntas: {
          orderBy: { orden: 'asc' },
          include: { opciones: true },
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
      await tx.secciones.deleteMany({
        where: { id_lecturas: idLectura },
      });

      await tx.preguntas.deleteMany({
        where: { id_lecturas: idLectura },
      });

      return tx.lecturas.delete({
        where: { id_lecturas: idLectura },
      });
    });
  }

}
