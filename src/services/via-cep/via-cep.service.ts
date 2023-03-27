import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ICep } from './interfaces/cep.interface';

@Injectable()
export class ViaCepService {
  constructor(private httpService: HttpService) {}

  async getCepData(cep: string): Promise<ICep> {
    const { data } = await firstValueFrom(
      this.httpService.get<ICep>(`https://viacep.com.br/ws/${cep}/json/`).pipe(
        catchError(() => {
          throw new BadRequestException();
        }),
      ),
    );

    if (!data.cep) {
      throw new NotFoundException('Cep não encontrado');
    }

    return data;
  }
}
