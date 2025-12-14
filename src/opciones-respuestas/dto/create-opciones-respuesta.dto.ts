import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateOpcionDto {
  @IsInt()
  id_pregunta: number;

  @IsString()
  opcion: string;

  @IsBoolean()
  es_correcta: boolean;
}
