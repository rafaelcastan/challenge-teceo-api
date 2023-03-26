import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ViaCepService } from './via-cep.service';

@Module({
  imports: [HttpModule],
  providers: [ViaCepService],
  exports: [ViaCepService],
})
export class ViaCepModule {}
