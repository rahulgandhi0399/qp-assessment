import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'libs/logger/logger.module';


@Module({
  imports: [TypeOrmModule.forFeature([Item]),LoggerModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
