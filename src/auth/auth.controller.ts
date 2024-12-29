import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  LoginDto, LoginSuccessResponseDto, SignUpDto } from './dto/create-auth.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @ApiOperation({ summary: 'Create a customer' })
  @ApiOkResponse({ type: LoginSuccessResponseDto })
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto):Promise<LoginSuccessResponseDto> {
      return this.authService.signUp(signUpDto);
  }

  @ApiOperation({ summary: 'login to account' })
  @ApiOkResponse({ type: LoginSuccessResponseDto })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto):Promise<LoginSuccessResponseDto> {
      return this.authService.login(loginDto);
  }
  
}
