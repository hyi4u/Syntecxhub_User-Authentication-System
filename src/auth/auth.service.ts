import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { loginDto } from './dto/loginDto.dto';

import bcrpt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username, true);
    if (!user) {
      throw new BadRequestException('the user not found');
    }
    try {
      const match = await bcrpt.compare(password, user.password);
      if (!match) {
        throw new BadRequestException('the password not correct');
      }
    } catch (err) {
      console.log(err);
    }

    delete (user as any).password;
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(dto: CreateUserDto) {
    const user = await this.usersService.create(dto);

    const payload = { username: user.username, sub: user.id };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
