import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
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
      return await this.UserModel.findOne({email});
    }
    async findOneById(id:string): Promise<CreateUserDto>{
        return await this.UserModel.findById({_id:id});
      }
    async addUser(user:CreateUserDto): Promise<CreateUserDto>{
        const newUser = new this.UserModel(user);
        return await newUser.save();
    }
    async update(user): Promise<CreateUserDto>{
        return await this.UserModel.findOneAndUpdate({email:user.email},user);
    }
}
