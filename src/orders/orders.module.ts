import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/orderItem.entity';
import { Item } from 'src/items/entities/item.entity';
import { LoggerModule } from 'libs/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderItem,Item]), LoggerModule,],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
