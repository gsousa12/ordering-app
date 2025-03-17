import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  password: string;
}
