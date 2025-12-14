import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRespuestaAlumnoDto {
  @IsOptional()
  @IsBoolean()
  es_correcta?: boolean;
}
