import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {resetPass} from './dto/resetPassword.dto'
import { ValidationPipe }  from './pipes/validation.pipes';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    // login using local strategy
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        // sending an access token when login is successful
        // req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
        // sending access token
        return this.authService.login(req.user);
        // return req.user;
    }
    
    // reset password
    @Post('reset')
    async reset(@Body(new ValidationPipe()) resetpass: resetPass ): Promise<any> {
        return this.authService.resetPassword(resetpass);
        return ;
    }

    // getting user  using jwt strategy 
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    logout(@Request() req) {
        return req.user;
    }
}

