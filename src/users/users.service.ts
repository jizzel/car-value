import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }
  find(email: string = '') {
    if (!email) {
      return this.repo.find();
    }
    return this.repo.findBy({ email });
  }
  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    return this.repo.remove(user);
  }
}