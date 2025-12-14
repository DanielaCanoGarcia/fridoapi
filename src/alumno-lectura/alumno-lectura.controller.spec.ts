import { Test, TestingModule } from '@nestjs/testing';
import { AlumnoLecturaController } from './alumno-lectura.controller';
import { AlumnoLecturaService } from './alumno-lectura.service';

describe('AlumnoLecturaController', () => {
  let controller: AlumnoLecturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlumnoLecturaController],
      providers: [AlumnoLecturaService],
    }).compile();

    controller = module.get<AlumnoLecturaController>(AlumnoLecturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
