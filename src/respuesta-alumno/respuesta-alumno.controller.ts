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
import { RespuestasAlumnoService } from './respuesta-alumno.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRespuestaAlumnoDto } from './dto/create-respuesta-alumno.dto';
import { UpdateRespuestaAlumnoDto } from './dto/update-respuesta-alumno.dto';

@Controller('respuestas-alumno')
export class RespuestasAlumnoController {
  constructor(private readonly service: RespuestasAlumnoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Req() req, @Body() dto: CreateRespuestaAlumnoDto) {
    return this.service.crear(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('alumno-lectura/:id')
  listar(@Param('id') id: string) {
    return this.service.listarPorAlumnoLectura(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  actualizar(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateRespuestaAlumnoDto,
  ) {
    return this.service.actualizar(req.user.sub, +id, dto);
  }
}
