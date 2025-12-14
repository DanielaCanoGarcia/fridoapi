import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AlumnoLecturaService } from './alumno-lectura.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAlumnoLecturaDto } from './dto/create-alumno-lectura.dto';
import { UpdateAlumnoLecturaDto } from './dto/update-alumno-lectura.dto';

@Controller('alumno-lectura')
export class AlumnoLecturaController {
  constructor(private readonly service: AlumnoLecturaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Req() req, @Body() dto: CreateAlumnoLecturaDto) {
    return this.service.crear(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('alumno/:id')
  listar(@Param('id') id: string) {
    return this.service.listarPorAlumno(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  actualizar(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateAlumnoLecturaDto,
  ) {
    return this.service.actualizar(req.user.sub, +id, dto);
  }
}
