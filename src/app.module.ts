import { Module,UseGuards } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UserModule } from './users/users.module'
import {MongooseModule} from '@nestjs/mongoose'
import { UsersService } from './users/users.service';
import config from './config/keys';
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
    
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
