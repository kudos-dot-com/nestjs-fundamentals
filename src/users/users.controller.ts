import { Controller,Post,Body,Get, Param, BadRequestException, ArgumentMetadata, PipeTransform, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import {checkId , ValidationPipe} from './pipes/validation.pipes';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @UseGuards(LocalAuthGuard)
    @Get()
    async findAll(): Promise<CreateUserDto[]> {
        return await this.usersService.findAll();
    }

    @UseGuards(LocalAuthGuard)
    @Get(':id')
    async findOne(@Param('id',new checkId()) id): Promise<CreateUserDto> {
        return await this.usersService.findOneById(id);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/create')
    async create(@Body(new ValidationPipe()) createuser : CreateUserDto): Promise<CreateUserDto> {
        return await this.usersService.addUser(createuser);
}
}
