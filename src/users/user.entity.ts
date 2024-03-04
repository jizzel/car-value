import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with id: ${this.id}`);
  }

  @AfterUpdate()
  logAfterUpdate() {
    console.log(`Updated user with id: ${this.id}`);
  }

  @AfterRemove()
  logAfterRemove() {
    console.log(`Removed user with id: ${this.id}`);
  }
}
