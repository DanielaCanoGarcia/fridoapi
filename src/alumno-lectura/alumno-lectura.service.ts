import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlumnoLecturaDto } from './dto/create-alumno-lectura.dto';
import { UpdateAlumnoLecturaDto } from './dto/update-alumno-lectura.dto';

@Injectable()
export class AlumnoLecturaService {
  constructor(private prisma: PrismaService) {}

  async crear(idUsuario: number, dto: CreateAlumnoLecturaDto) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { id_alumno: dto.id_alumno },
    });

    if (!alumno) throw new NotFoundException('Alumno no encontrado');
    if (alumno.id_usuario !== idUsuario)
      throw new ForbiddenException('No tienes permiso');

    return this.prisma.alumno_lectura.create({
      data: {
        id_alumno: dto.id_alumno,
        id_lectura: dto.id_lectura,
        iniciado_en: new Date(),
      },
    });
  }

  listarPorAlumno(idAlumno: number) {
    return this.prisma.alumno_lectura.findMany({
      where: { id_alumno: idAlumno },
      include: {
        lectura: true,
      },
    });
  }

  async actualizar(
    idUsuario: number,
    idAlumnoLectura: number,
    dto: UpdateAlumnoLecturaDto,
  ) {
    const registro = await this.prisma.alumno_lectura.findUnique({
      where: { id_alumno_lectura: idAlumnoLectura },
      include: { alumno: true },
    });

    if (!registro)
      throw new NotFoundException('Registro no encontrado');

    if (registro.alumno.id_usuario !== idUsuario)
      throw new ForbiddenException('No tienes permiso');

    return this.prisma.alumno_lectura.update({
      where: { id_alumno_lectura: idAlumnoLectura },
      data: {
        ...dto,
        completado_en: dto.completado ? new Date() : undefined,
      },
    });
  }
}
