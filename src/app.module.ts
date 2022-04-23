import { Module,UseGuards } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UserModule } from './users/users.module'
import {MongooseModule} from '@nestjs/mongoose'
import { UsersService } from './users/users.service';
import { UserSchema } from './users/schema/user.schema';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRootAsync({useFactory:()=>({uri:process.env.MONGO_URI})}),
    UserModule,
    AuthModule,
    AuthModule],
    
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
