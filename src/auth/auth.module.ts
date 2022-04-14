import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import {UserModule} from '../users/users.module'
@Module({
  imports:[UserModule,PassportModule],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy]
})
export class AuthModule {}
