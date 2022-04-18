import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { resetPass } from './dto/resetPassword.dto';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass,user.password);//comparing the bcrypt hash with the password
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async resetPassword(body: resetPass): Promise<any> {
    const user = await this.usersService.findOne(body.email);
    if (user) {
      user.password = body.password;
      await this.usersService.update(user);
      return user;
    }
    throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}