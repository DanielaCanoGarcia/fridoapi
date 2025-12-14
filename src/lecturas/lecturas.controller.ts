import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { LecturasService } from './lecturas.service';
import { CreateLecturaDto } from './dto/create-lectura.dto';
import { UpdateLecturaDto } from './dto/update-lectura.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('lecturas')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class LecturasController {
  constructor(private readonly lecturasService: LecturasService) {}

  @Post()
  @Roles('tutor')
  crear(@Req() req: any, @Body() dto: CreateLecturaDto) {
    const idTutor = req.user.id ?? req.user.sub;
    return this.lecturasService.crear(Number(idTutor), dto);
  }

  @Get()
  listar() {
    return this.lecturasService.listarTodas();
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.lecturasService.obtenerLectura(id);
  }

  @Patch(':id')
  @Roles('tutor')
  actualizar(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLecturaDto) {
    const idTutor = req.user.id ?? req.user.sub;
    return this.lecturasService.actualizarLectura(Number(idTutor), id, dto);
  }

  @Delete(':id')
  @Roles('tutor')
  eliminar(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    const idTutor = req.user.id ?? req.user.sub;
    return this.lecturasService.eliminarLectura(Number(idTutor), id);
  }
}
