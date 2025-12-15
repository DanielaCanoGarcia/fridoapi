import { IsString, IsArray, ValidateNested, IsInt, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class CreateLecturaSeccionDto {
  @IsString()
  texto: string;

  @IsString()
  ilustracion_url: string;

  @IsInt()
  order_index: number;
}

class CreateLecturaOpcionDto {
  @IsString()
  opcion: string;

  @IsBoolean()
  es_correcta: boolean;
}

class CreateLecturaPreguntaDto {
  @IsString()
  pregunta: string;

  @IsInt()
  orden: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLecturaOpcionDto)
  opciones: CreateLecturaOpcionDto[];
}

export class CreateLecturaDto {
  @IsString()
  titulo: string;

  @IsString()
  nivel: string;

  @IsString()
  portada_url: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLecturaSeccionDto)
  secciones: CreateLecturaSeccionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLecturaPreguntaDto)
  preguntas: CreateLecturaPreguntaDto[];
}
