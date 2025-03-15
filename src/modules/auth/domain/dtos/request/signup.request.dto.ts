import { IsNotEmpty } from 'class-validator';

export class SignupRequestDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
