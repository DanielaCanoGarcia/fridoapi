import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';

@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly service: PreguntasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Req() req, @Body() dto: CreatePreguntaDto) {
    return this.service.crear(req.user.sub, dto);
  }

  @Get('lectura/:id')
  listar(@Param('id') id: string) {
    return this.service.listarPorLectura(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  actualizar(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdatePreguntaDto,
  ) {
    return this.service.actualizar(req.user.sub, +id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  eliminar(@Req() req, @Param('id') id: string) {
    return this.service.eliminar(req.user.sub, +id);
  }
}
