import { IsBoolean, IsInt } from 'class-validator';

export class CreateRespuestaAlumnoDto {
  @IsInt()
  id_alumno_lectura: number;

  @IsInt()
  id_pregunta: number;

  @IsInt()
  id_opcion: number;

  @IsBoolean()
  es_correcta: boolean;
}
