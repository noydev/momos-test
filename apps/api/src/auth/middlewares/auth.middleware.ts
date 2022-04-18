import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  private tokenSecret = this.configService.get<string>('TOKEN_SECRET');

  private readonly logger = new Logger(AuthMiddleware.name);
  use(req: Request, res: Response, next: () => void): void {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null)
      throw new UnauthorizedException(
        'Invalid or missing authorization header'
      );

    jwt.verify(token, this.tokenSecret, (err: Error) => {
      if (err) {
        this.logger.warn(err);
        throw new UnauthorizedException('Invalid');
      }

      return next();
    });
  }
}
