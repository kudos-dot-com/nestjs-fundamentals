import { IsString, IsInt } from 'class-validator';
export class CreateUserDto{
    @IsString()
    name: string;

    @IsString()
    email: string;
    
    @IsString()
    password: string;
}