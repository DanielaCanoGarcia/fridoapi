import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateOpcionDto {
  @IsOptional()
  @IsString()
  opcion?: string;

  @IsOptional()
  @IsBoolean()
  es_correcta?: boolean;
}
