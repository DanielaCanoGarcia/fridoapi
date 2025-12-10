import { IsInt, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateSeccionDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  texto?: string;

  @IsOptional()
  @IsUrl()
  ilustracion_url?: string;

  @IsOptional()
  @IsInt()
  order_index?: number;
}
