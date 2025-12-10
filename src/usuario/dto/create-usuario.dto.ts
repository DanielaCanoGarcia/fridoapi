import { IsString, IsEmail, MinLength, IsIn } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido_pat: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contraseña: string;

  @IsIn(['profesor', 'tutor'])
  rol: string;

  @IsString()
  usuario: string;
}
