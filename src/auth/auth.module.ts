import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JwtStrategy } from './stratagies/jwt.strategy';
import { LoggerModule } from 'libs/logger/logger.module';
import { ErrorsInterceptor } from 'errors/error.interceptor';
import { CommonError } from 'errors';
//process.env.JWT_SECRET
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        LoggerModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret:  'your-secret-key',
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy,],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}