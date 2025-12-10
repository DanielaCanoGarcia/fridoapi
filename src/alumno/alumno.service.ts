import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Injectable()
export class AlumnoService {
  constructor(private prisma: PrismaService) {}

  // Crear alumno asociado al tutor (idUsuario = id del tutor desde el JWT)
  async crearAlumno(idUsuario: number, dto: CreateAlumnoDto) {
    // Opcional: prevenir nombres repetidos por tutor
    const existing = await this.prisma.alumno.findFirst({
      where: { id_usuario: idUsuario, nombre_usuario: dto.nombre_usuario },
    });
    if (existing) {
      throw new BadRequestException('Ya existe un alumno con ese nombre para este tutor');
    }

    return this.prisma.alumno.create({
      data: {
        id_usuario: idUsuario,
        nombre_usuario: dto.nombre_usuario,
        avatar_url: dto.avatar_url ?? '',
      },
    });
  }

  // Listar alumnos del tutor
  async listarAlumnosDelTutor(idUsuario: number) {
    return this.prisma.alumno.findMany({
      where: { id_usuario: idUsuario },
      orderBy: { creado_en: 'desc' },
    });
  }

  // Obtener alumno por id si pertenece al tutor
  async obtenerAlumnoPorId(idUsuario: number, idAlumno: number) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { id_alumno: idAlumno },
    });
    if (!alumno) throw new NotFoundException('Alumno no encontrado');
    if (alumno.id_usuario !== idUsuario) throw new ForbiddenException('No tienes acceso a este alumno');
    return alumno;
  }

  // Actualizar alumno (solo si pertenece al tutor)
  async actualizarAlumno(idUsuario: number, idAlumno: number, dto: UpdateAlumnoDto) {
    const alumno = await this.prisma.alumno.findUnique({ where: { id_alumno: idAlumno } });
    if (!alumno) throw new NotFoundException('Alumno no encontrado');
    if (alumno.id_usuario !== idUsuario) throw new ForbiddenException('No tienes permiso para actualizar este alumno');

    return this.prisma.alumno.update({
      where: { id_alumno: idAlumno },
      data: {
        nombre_usuario: dto.nombre_usuario ?? alumno.nombre_usuario,
        avatar_url: dto.avatar_url ?? alumno.avatar_url,
      },
    });
  }

  // Eliminar alumno (solo si pertenece al tutor)
  async eliminarAlumno(idUsuario: number, idAlumno: number) {
    const alumno = await this.prisma.alumno.findUnique({ where: { id_alumno: idAlumno } });
    if (!alumno) throw new NotFoundException('Alumno no encontrado');
    if (alumno.id_usuario !== idUsuario) throw new ForbiddenException('No tienes permiso para eliminar este alumno');

    return this.prisma.alumno.delete({ where: { id_alumno: idAlumno } });
  }
}
