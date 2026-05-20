import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/loginDto.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { Public } from './decorators/IsPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: Express.Request) {
    return this.authService.login(req.user);
  }
  @Public()
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
