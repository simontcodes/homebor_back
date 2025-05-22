import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-admin')
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  // @Post('register-coordinator')
  // register(@Body() dto: RegisterUserDto) {
  //   return this.authService.register(dto);
  // }

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    console.log('login dto', dto);
    return this.authService.login(dto);
  }
}
