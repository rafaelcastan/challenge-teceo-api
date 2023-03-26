import { DataSource, DataSourceOptions } from 'typeorm';

export const postgressDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'viacep2023',
  database: 'postgres',
  migrations: ['src/migrations/*.ts'],
};

const postgressDataSource = new DataSource(postgressDataSourceOptions);

export default postgressDataSource;
