import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgressDataSourceOptions } from './data-sources/postgres';
import { CepsModule } from './ceps/ceps.module';
import { Cep } from './ceps/entities/cep.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...postgressDataSourceOptions,
      entities: [Cep],
      migrations: ['migrations/*.ts'],
      synchronize: false,
    }),
    ConfigModule.forRoot(),
    CepsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
