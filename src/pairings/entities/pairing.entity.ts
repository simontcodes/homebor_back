import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Home } from 'src/homes/entities/home.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Pairing extends BaseEntity {
  @ManyToOne(() => Client, { nullable: false })
  client: Client;

  @ManyToOne(() => Home, { nullable: false })
  home: Home;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => User, { nullable: true })
  approved_by: User;
}
