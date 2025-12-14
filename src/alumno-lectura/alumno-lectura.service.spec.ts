import { Test, TestingModule } from '@nestjs/testing';
import { AlumnoLecturaService } from './alumno-lectura.service';

describe('AlumnoLecturaService', () => {
  let service: AlumnoLecturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlumnoLecturaService],
    }).compile();

    service = module.get<AlumnoLecturaService>(AlumnoLecturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
