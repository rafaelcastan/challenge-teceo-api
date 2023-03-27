import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import { ICep } from '../services/via-cep/interfaces/cep.interface';
import { Repository } from 'typeorm';
import { ViaCepService } from '../services/via-cep/via-cep.service';
import { CepsService } from './ceps.service';
import { Cep } from './entities/cep.entity';

describe('CepsService', () => {
  let service: CepsService;
  const viacepServiceMock = mock<ViaCepService>();
  const repositoryCepMock = mock<Repository<Cep>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CepsService,
        { provide: ViaCepService, useValue: viacepServiceMock },
        { provide: getRepositoryToken(Cep), useValue: repositoryCepMock },
      ],
    }).compile();

    service = module.get<CepsService>(CepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneAndCache', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return stored Cep', async () => {
      const cepMock = mock<Cep>({ cep: '38302302' });
      repositoryCepMock.findOne.mockResolvedValue(cepMock);

      await expect(service.findOneAndCache(cepMock.cep)).resolves.toEqual(
        cepMock,
      );

      expect(repositoryCepMock.findOne).toHaveBeenCalledWith({
        where: { cep: cepMock.cep },
      });
      expect(viacepServiceMock.getCepData).not.toHaveBeenCalled();
      expect(repositoryCepMock.create).not.toHaveBeenCalled();
      expect(repositoryCepMock.save).not.toHaveBeenCalled();
    });

    it('should store a Cep', async () => {
      const cepMock = mock<Cep>({ cep: '38302302' });
      repositoryCepMock.findOne.mockResolvedValue(null);
      viacepServiceMock.getCepData.mockResolvedValue(cepMock);
      repositoryCepMock.create.mockReturnValue(cepMock);
      repositoryCepMock.save.mockResolvedValue(cepMock);

      await expect(service.findOneAndCache(cepMock.cep)).resolves.toEqual(
        cepMock,
      );

      expect(repositoryCepMock.findOne).toHaveBeenCalledWith({
        where: { cep: cepMock.cep },
      });
      expect(viacepServiceMock.getCepData).toHaveBeenCalledWith(cepMock.cep);
      expect(repositoryCepMock.create).toHaveBeenCalledWith(cepMock);
      expect(repositoryCepMock.save).toHaveBeenCalledWith(cepMock);
    });
  });
});
