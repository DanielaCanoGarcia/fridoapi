import { IsString, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class CreateLecturaSeccionDto {
  @IsString()
  texto: string;

  @IsString()
  ilustracion_url: string;

  @IsInt()
  order_index: number;
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
}
