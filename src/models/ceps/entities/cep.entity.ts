import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('tb_ceps')
export class Cep {
  @BeforeInsert()
  formatCep() {
    this.cep = this.cep.replace(/\D+/g, '');
  }

  @PrimaryColumn()
  cep: string;

  @Column()
  logradouro?: string;

  @Column()
  complemento?: string;

  @Column()
  bairro?: string;

  @Column()
  localidade?: string;

  @Column()
  uf?: string;

  @Column()
  ibge?: string;

  @Column()
  gia?: string;

  @Column()
  ddd?: string;

  @Column()
  siafi?: string;

  @CreateDateColumn()
  created_at: Date;
}
