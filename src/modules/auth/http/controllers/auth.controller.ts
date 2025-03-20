import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Res,
  Request,
} from '@nestjs/common';
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
      const signupResponse = AuthMapper.toMapperSignupResponse(createdOwnerUser);
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
      const loginResponse = await AuthMapper.toMapperLoginResponse(login);
      return loginResponse;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      const logout = await this.authService.logout(res);
      return logout;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  async refreshToken(@Body() Body, @Res({ passthrough: true }) res: Response) {
    const refresh_token = Body.refresh_token;
    try {
      const valideRefreshToken = await this.authService.validateRefreshToken(refresh_token, res);
      return valideRefreshToken;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
