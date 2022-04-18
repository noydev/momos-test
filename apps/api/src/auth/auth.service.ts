import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dtos/auth.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}
  private tokenSecret = this.configService.get<string>('TOKEN_SECRET');

  login(authDto: AuthDto): string {
    const { username, password } = authDto;

    if (username === 'admin' && password === 'admin') {
      return jwt.sign(username, this.tokenSecret);
    } else {
      throw new UnauthorizedException();
    }
  }
}
