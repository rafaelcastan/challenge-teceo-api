import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ClearEverythingNotNumber } from '../pipes/clear-everything-not-number';
import { CepsService } from './ceps.service';
import { CepDto } from './dto/cep.dto';

@Controller('ceps')
export class CepsController {
  constructor(private readonly cepsService: CepsService) {}

  @Get(':cep')
  @ApiOkResponse({
    description: 'Busca de Endereço por CEP',
    type: CepDto,
  })
  findOne(
    @Param('cep', new ClearEverythingNotNumber()) cep: string,
  ): Promise<CepDto> {
    return this.cepsService.findOneAndCache(cep);
  }
}
