import { Module } from '@nestjs/common';
import { CepsService } from './ceps.service';
import { CepsController } from './ceps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cep } from './entities/cep.entity';
import { ViaCepModule } from 'src/services/via-cep/via-cep.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cep]), ViaCepModule],
  controllers: [CepsController],
  providers: [CepsService],
})
export class CepsModule {}
