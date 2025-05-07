import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';



@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  //TODO: add relationship to clients
}
