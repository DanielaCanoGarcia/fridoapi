import { IsBoolean, IsInt, IsOptional, IsNumber } from 'class-validator';

export class UpdateAlumnoLecturaDto {
  @IsOptional()
  @IsBoolean()
  completado?: boolean;

  @IsOptional()
  @IsInt()
  correctas?: number;

  @IsOptional()
  @IsInt()
  total_preguntas?: number;

  @IsOptional()
  @IsNumber()
  comprension?: number;
}
