import { IsOptional, IsString, IsArray, ValidateNested, IsInt, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateSeccionDto {
  @IsString()
  texto: string;

  @IsString()
  ilustracion_url: string;

  @IsInt()
  order_index: number;
}

class UpdateOpcionDto {
  @IsString()
  opcion: string;

  @IsBoolean()
  es_correcta: boolean;
}

class UpdatePreguntaDto {
  @IsString()
  pregunta: string;

  @IsInt()
  orden: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOpcionDto)
  opciones: UpdateOpcionDto[];
}

export class UpdateLecturaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  nivel?: string;

  @IsOptional()
  @IsString()
  portada_url?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSeccionDto)
  secciones?: UpdateSeccionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePreguntaDto)
  preguntas?: UpdatePreguntaDto[];
}
