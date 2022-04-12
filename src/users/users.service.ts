import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModel: Model<user>) {}

  async findAll(): Promise<user[]> {
    return await this.UserModel.find();
  }
  async findOne(id: string): Promise<user> {
    return await this.UserModel.findById(id);
  }
  async addUser(user: user): Promise<user> {
    const newUser = new this.UserModel(user);
    return await newUser.save();
  }
}
