import { IsInt, IsString } from 'class-validator';

export class CreatePreguntaDto {
  @IsInt()
  id_lecturas: number;

  @IsString()
  pregunta: string;

  @IsInt()
  orden: number;
}
