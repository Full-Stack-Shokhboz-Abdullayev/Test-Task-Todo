import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '../common/guards/auth.guard';
import { LoginDto } from './dto/login.dto';

interface IRequestUser extends Request {
  user: { username: string; password: string };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    const admin = {
      username: this.configService.get('ADMIN_USERNAME'),
      password: this.configService.get('ADMIN_PASSWORD'),
    };

    if (
      loginDto.username === admin.username &&
      loginDto.password === admin.password
    ) {
      return admin;
    }
    throw new NotFoundException('Admin not found!');
  }

  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  @Get()
  getMe(@Req() req: IRequestUser) {
    return req.user;
  }
}
