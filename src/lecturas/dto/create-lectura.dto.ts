import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateLecturaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  portada_url: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nivel: string;
}
