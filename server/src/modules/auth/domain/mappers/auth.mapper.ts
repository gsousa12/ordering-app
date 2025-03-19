import { User } from 'src/modules/user/domain/entities/user.entity';
import { SignupResponseDto } from '../dtos/response/signup.response.dto';
import { SignupRequestDto } from '../dtos/request/signup.request.dto';
import { LoginResponseDto } from '../dtos/response/login.response.dto';

export class AuthMapper {
  static async toMapperSignup(signupRequestDto: SignupRequestDto): Promise<User> {
    const user = new User();
    user.name = signupRequestDto.name;
    user.email = signupRequestDto.email;
    user.password = signupRequestDto.password;
    return user;
  }

  static async toMapperSignupResponse(user: User): Promise<SignupResponseDto> {
    const signUpResponse = new SignupResponseDto();
    signUpResponse.name = user.name;
    signUpResponse.email = user.email;
    signUpResponse.createdAt = user.createdAt || new Date();
    return signUpResponse;
  }

  static async toMapperLoginResponse(refresh_token: string): Promise<LoginResponseDto> {
    const loginResponse = new LoginResponseDto();
    loginResponse.refresh_token = refresh_token;
    return loginResponse;
  }
}
