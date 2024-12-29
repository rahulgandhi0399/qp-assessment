import { Injectable, UnauthorizedException, ConflictException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { SignUpDto, LoginDto, LoginSuccessResponseDto } from './dto/create-auth.dto';
import { CommonError, AuthErrorCodes } from 'errors';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<LoginSuccessResponseDto> {
       try {
         const { email, password, ...rest } = signUpDto;

        // Check if user exists
        const existingUser = await this.userRepository.findOne({
            where: { email }
        });
        if (existingUser) {
            throw new CommonError(AuthErrorCodes.USER_EXISTS);
        }
        
        // Hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            ...rest
        });
        
        await this.userRepository.save(user);
        
        // Generate JWT token
        const token = this.jwtService.sign({ userId: user.id });
        // Remove password from response
        const { password: _, isAdmin,createdAt,updatedAt,orders,...userResponse } = user;
        console.log(userResponse);
        
        return {
            success:true,
            data: userResponse,
            token
        };
    } catch(error){
        return error;
    }
    }

    async login(loginDto: LoginDto):Promise<LoginSuccessResponseDto> {
        const { email, password } = loginDto;

        // Find user
        const user = await this.userRepository.findOne({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const token = this.jwtService.sign({ userId: user.id, isAdmin: user.isAdmin  });

        // Remove password and other data from response
        const { password: _,createdAt,updatedAt,orders,isAdmin, ...userResponse } = user;

        return {
            success:true,
            data: userResponse,
            token
        };
    }
}