import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { SignupRequestDto } from '../../domain/dtos/request/signup.request.dto';
import { AuthService } from '../../domain/services/auth.service';
import { AuthMapper } from '../../domain/mappers/auth.mapper';

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
}
