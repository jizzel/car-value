import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: '1', email, password } as User),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with salted and hashed password', async () => {
    const user = await service.signUp('joe@fmail.com', 'joe');
    expect(user.password).not.toEqual('joe');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('it throws an error if email is in use', async (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: '2', email: 'test@test.com', password: 'pass' } as User,
      ]);

    try {
      await service.signUp('test@test.com', 'pass');
    } catch (err) {
      done();
    }
  });

  it('throws an error if user signs in with email that not exist', async () => {
    await expect(service.signIn('notFound@test.com', 'test')).rejects.toThrow(
      NotFoundException,
    );
  });
});
