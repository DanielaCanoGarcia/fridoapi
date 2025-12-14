import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateSeccionDto {
  @IsString()
  texto: string;

  @IsString()
  ilustracion_url: string;

  @IsInt()
  order_index: number;
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
}
