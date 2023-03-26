import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CepDto } from 'src/models/ceps/dto/cep.dto';

@Injectable()
export class ViaCepService {
  constructor(private httpService: HttpService) {}

  async getCepData(cep: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<CepDto>(`https://viacep.com.br/ws/${cep}/json/`)
        .pipe(
          catchError((error: AxiosError) => {
            throw error.response.data;
          }),
        ),
    );

    if (!data.cep) {
      throw new NotFoundException();
    }

    return data;
  }
}
