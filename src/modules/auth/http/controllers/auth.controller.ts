import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException, Res } from '@nestjs/common';
import { SignupRequestDto } from '../../domain/dtos/request/signup.request.dto';
import { AuthService } from '../../domain/services/auth.service';
import { AuthMapper } from '../../domain/mappers/auth.mapper';
import { LoginRequestDto } from '../../domain/dtos/request/login.request.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() signupRequestDto: SignupRequestDto) {
    try {
      const ownerUser = await AuthMapper.toMapperSignup(signupRequestDto);
      const createdOwnerUser = await this.authService.signup(ownerUser);
      const signupResponse = AuthMapper.toMapperResponse(createdOwnerUser);
      return signupResponse;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    try {
      const login = await this.authService.login(loginDto, res);
      return login;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      const logout = await this.authService.logout(res);
      return logout;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
