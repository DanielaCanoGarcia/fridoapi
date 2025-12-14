import { IsInt } from 'class-validator';

export class CreateAlumnoLecturaDto {
  @IsInt()
  id_alumno: number;

  @IsInt()
  id_lectura: number;
}
