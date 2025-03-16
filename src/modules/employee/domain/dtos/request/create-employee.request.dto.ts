import { IsNotEmpty } from 'class-validator';

export class CreateEmployeeRequestDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
