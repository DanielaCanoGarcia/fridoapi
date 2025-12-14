import { Test, TestingModule } from '@nestjs/testing';
import { OpcionesRespuestasController } from './opciones-respuestas.controller';
import { OpcionesRespuestasService } from './opciones-respuestas.service';

describe('OpcionesRespuestasController', () => {
  let controller: OpcionesRespuestasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpcionesRespuestasController],
      providers: [OpcionesRespuestasService],
    }).compile();

    controller = module.get<OpcionesRespuestasController>(OpcionesRespuestasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
