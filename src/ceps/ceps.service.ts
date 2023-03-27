import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ViaCepService } from '../services/via-cep/via-cep.service';

import { Repository } from 'typeorm';
import { Cep } from './entities/cep.entity';

@Injectable()
export class CepsService {
  constructor(
    @InjectRepository(Cep)
    private cepsRepository: Repository<Cep>,
    private viaCepService: ViaCepService,
  ) {}

  async findOneAndCache(cep: string) {
    const storedCepData = await this.cepsRepository.findOne({
      where: { cep },
    });

    if (!storedCepData) {
      const data = await this.viaCepService.getCepData(cep);

      const cepData = this.cepsRepository.create(data);
      return this.cepsRepository.save(cepData);
    }

    return storedCepData;
  }
}
