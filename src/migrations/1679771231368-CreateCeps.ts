import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCeps1679771231368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_ceps',
        columns: [
          {
            name: 'cep',
            type: 'char(8)',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'logradouro',
            type: 'varchar',
          },
          {
            name: 'complemento',
            type: 'varchar',
          },
          {
            name: 'bairro',
            type: 'varchar',
          },
          {
            name: 'localidade',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
          },
          {
            name: 'ibge',
            type: 'varchar',
          },
          {
            name: 'gia',
            type: 'varchar',
          },
          {
            name: 'ddd',
            type: 'varchar',
          },
          {
            name: 'siafi',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_ceps');
  }
}
