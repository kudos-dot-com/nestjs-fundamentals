import { Controller,Post,Body,Get, Param } from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { user } from './interfaces/user.interface'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    async findAll(): Promise<user[]> {
        return await this.usersService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id): Promise<user> {
        return await this.usersService.findOne(id);
    }
    @Post()
    async create(@Body() createuser : CreateUserDto): Promise<user> {
        return await this.usersService.addUser(createuser);
}
}
