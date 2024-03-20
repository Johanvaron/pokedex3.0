import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/Pokemon`, this.auth.Pokemon);
    /* this.router.post(`${this.path}login`, ValidationMiddleware(CreateUserDto), this.auth.logIn); */
  }
}
