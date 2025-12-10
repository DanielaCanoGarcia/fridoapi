import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre_usuario: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  avatar_url?: string;
}
