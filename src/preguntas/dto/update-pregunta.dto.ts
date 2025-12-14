import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdatePreguntaDto {
  @IsOptional()
  @IsString()
  pregunta?: string;

  @IsOptional()
  @IsInt()
  orden?: number;
}
