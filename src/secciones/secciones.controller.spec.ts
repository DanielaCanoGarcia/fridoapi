import { Test, TestingModule } from '@nestjs/testing';
import { SeccionesController } from './secciones.controller';
import { SeccionesService } from './secciones.service';

describe('SeccionesController', () => {
  let controller: SeccionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeccionesController],
      providers: [SeccionesService],
    }).compile();

    controller = module.get<SeccionesController>(SeccionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
