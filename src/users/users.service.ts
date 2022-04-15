import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './interfaces/user.interface'
import { UserSchema } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly UserModel:Model<user>) {}
    
    async findAll(): Promise<user[]>{
        return await this.UserModel.find();
    }
    async findOne(email:string): Promise<user>{
      return await this.UserModel.findOne({email});
    }
    async addUser(user:user): Promise<user>{
        const newUser = new this.UserModel(user);
        return await newUser.save();
    }
    async update(user): Promise<user>{
        return await this.UserModel.findOneAndUpdate({email:user.email},user);
    }
}
