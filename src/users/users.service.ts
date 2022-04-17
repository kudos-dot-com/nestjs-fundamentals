import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { throws } from 'assert/strict';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-users.dto';
import { UserSchema } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly UserModel:Model<CreateUserDto>) {}
    
    async findAll(): Promise<CreateUserDto[]>{
        return await this.UserModel.find();
    }
    async findOne(email:string): Promise<CreateUserDto>{
      const user = await this.UserModel.findOne({email});
      if(user)
      {
          return user
      }
      else{
          throw new NotFoundException("User not found");
      }
    }
    async findOneById(id:string): Promise<CreateUserDto>{
        const user = await this.UserModel.findById({_id:id});
        if(user)
        {
            return user
        }
        else{
            throw new NotFoundException("User not found");
        }
    }
    async addUser(user:CreateUserDto): Promise<CreateUserDto>{
        const newUser = new this.UserModel(user);
        return await newUser.save();
    }
    async update(user): Promise<CreateUserDto>{
        return await this.UserModel.findOneAndUpdate({email:user.email},user);
    }
}
