import { IsString } from 'class-validator';
export class resetPass{
    @IsString()
   readonly name: string;

    @IsString()
   readonly email: string;
    
    @IsString()
    password: string;
}