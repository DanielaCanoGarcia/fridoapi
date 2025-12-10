import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { SeccionesService } from './secciones.service';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('secciones')
@UseGuards(JwtAuthGuard, RolesGuard) // requiere autenticación; RolesGuard deja pasar si no hay @Roles
export class SeccionesController {
  constructor(private readonly seccionesService: SeccionesService) {}

  // Listar secciones por lectura (cualquiera autenticado)
  @Get('/lectura/:id_lecturas')
  listarPorLectura(@Param('id_lecturas', ParseIntPipe) id_lecturas: number) {
    return this.seccionesService.listarPorLectura(id_lecturas);
  }

  // Obtener sección por id (cualquiera autenticado)
  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.seccionesService.obtenerSeccion(id);
  }

  // Crear sección - solo tutor propietario de la lectura
  @Post()
  @Roles('tutor')
  crear(@Req() req: any, @Body() dto: CreateSeccionDto) {
    const idUsuario = Number(req.user.id ?? req.user.sub);
    return this.seccionesService.crearSeccion(idUsuario, dto);
  }

  // Actualizar sección - solo tutor dueño
  @Patch(':id')
  @Roles('tutor')
  actualizar(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSeccionDto,
  ) {
    const idUsuario = Number(req.user.id ?? req.user.sub);
    return this.seccionesService.actualizarSeccion(idUsuario, id, dto);
  }

  // Eliminar sección - solo tutor dueño
  @Delete(':id')
  @Roles('tutor')
  eliminar(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    const idUsuario = Number(req.user.id ?? req.user.sub);
    return this.seccionesService.eliminarSeccion(idUsuario, id);
  }
}
