import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { user } from './interfaces/user.interface';

class TestPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string' && /^[a-f0-9]{24}$/.test(value)) {
      return value;
    } else {
      throw new BadRequestException('Error in object id');
    }
  }
}
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(): Promise<user[]> {
    return await this.usersService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', TestPipe) id): Promise<user> {
    return await this.usersService.findOne(id);
  }
  @Post()
  async create(@Body() createuser: CreateUserDto): Promise<user> {
    return await this.usersService.addUser(createuser);
  }
}
