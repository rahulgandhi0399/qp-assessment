import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url:configService.get('DB_URL'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        logging: true,
        synchronize: true,
      }),
    }),
    OrdersModule,
    ItemsModule,
    AuthModule,
  ],  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
