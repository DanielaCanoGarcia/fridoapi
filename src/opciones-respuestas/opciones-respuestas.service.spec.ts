import { Test, TestingModule } from '@nestjs/testing';
import { OpcionesRespuestasService } from './opciones-respuestas.service';

describe('OpcionesRespuestasService', () => {
  let service: OpcionesRespuestasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpcionesRespuestasService],
    }).compile();

    service = module.get<OpcionesRespuestasService>(OpcionesRespuestasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
