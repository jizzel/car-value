import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service';
import { request } from 'express';
import { User } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: any, res: any, next: (error?: any) => void): Promise<any> {
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }
    next();
  }
}
