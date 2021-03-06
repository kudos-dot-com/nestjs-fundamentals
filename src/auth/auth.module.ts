import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import {UserModule} from '../users/users.module';
import {JwtModule} from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[UserModule,PassportModule,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
