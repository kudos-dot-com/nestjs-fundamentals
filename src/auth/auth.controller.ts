import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {resetPass} from './dto/resetPassword.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    // login using local strategy
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        // return this.authService.login(req.user);
        return req.user;
    }
    
    // reset password
    @Post('reset')
    async reset(@Body() resetpass: resetPass ): Promise<any> {
        return this.authService.resetPassword(resetpass);
        return ;
    }

    // getting user  using jwt strategy 
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
