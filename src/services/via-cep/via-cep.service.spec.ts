import { HttpService } from '@nestjs/axios';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { mock } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';
import { ICep } from './interfaces/cep.interface';
import { ViaCepService } from './via-cep.service';

describe('ViaCepService', () => {
  let service: ViaCepService;
  const httpServiceMock = mock<HttpService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViaCepService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get<ViaCepService>(ViaCepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCepData', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a cep', async () => {
      const cepMock = mock<ICep>({ cep: '38302302' });
      const response: AxiosResponse<ICep> = {
        data: cepMock,
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
        status: 200,
        statusText: 'OK',
      };
      jest.spyOn(httpServiceMock, 'get').mockImplementation(() => of(response));

      const cepData = service.getCepData(cepMock.cep);

      expect(httpServiceMock.get).toHaveBeenCalled();
      expect(cepData).resolves.toBe(cepMock);
    });

    it('should return a not found exception', async () => {
      const response: AxiosResponse<any> = {
        data: { error: true },
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
        status: 200,
        statusText: 'error',
      };
      jest.spyOn(httpServiceMock, 'get').mockReturnValue(of(response));

      const cepData = service.getCepData('11111111');

      expect(httpServiceMock.get).toHaveBeenCalled();
      expect(cepData).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should return a bad request exception', async () => {
      jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValue(throwError(() => BadRequestException));

      const cepData = service.getCepData('123456789');

      expect(httpServiceMock.get).toHaveBeenCalled();
      expect(cepData).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
