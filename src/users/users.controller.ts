import { Controller,Post,Body,Get, Param, BadRequestException, ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

class checkId implements PipeTransform {
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
    async findAll(): Promise<CreateUserDto[]> {
        return await this.usersService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id',checkId) id): Promise<CreateUserDto> {
        return await this.usersService.findOne(id);
    }
    @Post('/create')
    async create(@Body() createuser : CreateUserDto): Promise<CreateUserDto> {
        return await this.usersService.addUser(createuser);
}
}
