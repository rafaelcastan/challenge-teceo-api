import { PartialType } from '@nestjs/mapped-types';
import { CepDto } from './cep.dto';

export class UpdateCepDto extends PartialType(CepDto) {}
