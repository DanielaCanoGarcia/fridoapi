import { Test, TestingModule } from '@nestjs/testing';
import { RespuestaAlumnoService } from './respuesta-alumno.service';

describe('RespuestaAlumnoService', () => {
  let service: RespuestaAlumnoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespuestaAlumnoService],
    }).compile();

    service = module.get<RespuestaAlumnoService>(RespuestaAlumnoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
