import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() {}) {
    return {};
  }
}
