import { Test, TestingModule } from '@nestjs/testing';
import { RespuestaAlumnoController } from './respuesta-alumno.controller';
import { RespuestaAlumnoService } from './respuesta-alumno.service';

describe('RespuestaAlumnoController', () => {
  let controller: RespuestaAlumnoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RespuestaAlumnoController],
      providers: [RespuestaAlumnoService],
    }).compile();

    controller = module.get<RespuestaAlumnoController>(RespuestaAlumnoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
