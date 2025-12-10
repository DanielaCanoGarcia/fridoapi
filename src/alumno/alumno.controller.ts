import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Controller('alumno')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('tutor') // Solo los tutores pueden manejar alumnos
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) {}

  // Crear alumno
  @Post()
  crearAlumno(@Req() req, @Body() dto: CreateAlumnoDto) {
    return this.alumnoService.crearAlumno(req.user.sub, dto);
  }

  // Listar alumnos del tutor
  @Get()
  listarAlumnos(@Req() req) {
    return this.alumnoService.listarAlumnosDelTutor(req.user.sub);
  }

  // Obtener alumno específico
  @Get(':id')
  obtenerAlumno(@Req() req, @Param('id') id: string) {
    return this.alumnoService.obtenerAlumnoPorId(req.user.sub, Number(id));
  }

  // Actualizar alumno
  @Patch(':id')
  actualizarAlumno(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateAlumnoDto,
  ) {
    return this.alumnoService.actualizarAlumno(req.user.sub, Number(id), dto);
  }

  // Eliminar alumno
  @Delete(':id')
  eliminarAlumno(@Req() req, @Param('id') id: string) {
    return this.alumnoService.eliminarAlumno(req.user.sub, Number(id));
  }
}
