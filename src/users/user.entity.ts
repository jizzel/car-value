import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

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
