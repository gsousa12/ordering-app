import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { SignupRequestDto } from '../../domain/dtos/request/signup.request.dto';
import { AuthService } from '../../domain/services/auth.service';
import { AuthMapper } from '../../domain/mappers/auth.mapper';
import { LoginRequestDto } from '../../domain/dtos/request/login.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() signupRequestDto: SignupRequestDto) {
    try {
      const user = await AuthMapper.toMapperSignup(signupRequestDto);
      const createdUser = await this.authService.create(user);
      const signupResponse = AuthMapper.toMapperResponse(createdUser);
      return signupResponse;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginRequestDto) {
    try {
      return this.authService.login(loginDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
