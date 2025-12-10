import { IsInt, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateSeccionDto {
  @IsInt()
  id_lecturas: number;

  @IsString()
  @MinLength(1)
  texto: string;

  @IsUrl()
  ilustracion_url: string;

  @IsInt()
  order_index: number;
}
