import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
    throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async resetPassword(body)
  {
    const user = await this.usersService.findOne(body.email);
    if (user) {
        user.password = body.password;
        await this.usersService.update(user);
        return user;
    }
    return null;
    throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}