import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OpcionesService } from './opciones-respuestas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOpcionDto } from './dto/create-opciones-respuesta.dto';
import { UpdateOpcionDto } from './dto/update-opciones-respuesta.dto';

@Controller('opciones')
export class OpcionesController {
  constructor(private readonly opcionesService: OpcionesService) {}

  // Crear opción de respuesta (solo tutor dueño de la lectura)
  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Req() req, @Body() dto: CreateOpcionDto) {
    return this.opcionesService.crear(req.user.sub, dto);
  }

  // Actualizar opción
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  actualizar(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateOpcionDto,
  ) {
    return this.opcionesService.actualizar(req.user.sub, +id, dto);
  }

  // Eliminar opción
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  eliminar(@Req() req, @Param('id') id: string) {
    return this.opcionesService.eliminar(req.user.sub, +id);
  }
}
