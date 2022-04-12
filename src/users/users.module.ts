import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [MongooseModule.forRoot('ss', {})],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
