import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './middlewares';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthMiddleware, AuthService],
  exports: [AuthMiddleware],
})
export class AuthModule {}
