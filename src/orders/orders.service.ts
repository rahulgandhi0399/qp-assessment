import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, CreateOrderSuccessDto, FindAllOrdersQueryDto, GetOrdersSuccessDto } from './dto/create-order.dto';
import { Order, OrderStatusEnum } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In,  Repository } from 'typeorm';
import { OrderItem } from './entities/orderItem.entity';
import { Item } from 'src/items/entities/item.entity';
import { CommonError, OrderErrorCodes } from 'errors';
import { CustomLogger } from '../../libs/logger/logger';
@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) 
  private OrderRepository: Repository<Order>,
  @InjectRepository(OrderItem)
  private orderItemRepository: Repository<OrderItem>,
  @InjectRepository(Item)
  private ItemRepository: Repository<Item>,
  private dataSource: DataSource,
  private logger: CustomLogger){}
  
 
  async create(createOrderDto: CreateOrderDto,userId:number):Promise<CreateOrderSuccessDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    const isDuplicateOrder = await this.OrderRepository.findOne({where:{userId:userId,referenceId : createOrderDto.referenceId}})
    if(isDuplicateOrder){
      throw new BadRequestException({
        message: `order exists with given reference for ${userId} userId`,
        details: isDuplicateOrder
      })
    }
    try {
      // Get all product IDs from the order
      const productIds = createOrderDto.items.map(item => item.productId);

      const products = await this.ItemRepository.find({where:{id:In(productIds)}});
      
      // Create a map for easier product lookup
      const productMap = new Map(products.map(p => [p.id, p]));

      // Validate products availability in memory
      const unavailableProducts = [];
      let totalAmount = 0;

      for (const item of createOrderDto.items) {
        const product = productMap.get(item.productId);
        
        if (!product) {
          throw new CommonError(OrderErrorCodes.PRODUCT_ID_NOT_FOUND);
          
        }

        if (product.inventory < item.quantity) {
          unavailableProducts.push({
            productId: item.productId,
            requested: item.quantity,
            available: product.inventory
          });
        }

        totalAmount += product.price * item.quantity;
      }

      if (unavailableProducts.length > 0) {
        throw new BadRequestException({
          message: 'Insufficient stock for some products',
          details: unavailableProducts
        });
      }

      // Create order
      const orderResult = await queryRunner.manager.insert(Order, {
        userId: userId,
        status: OrderStatusEnum.PENDING,
        totalAmount,
        referenceId:createOrderDto.referenceId
      });
      const orderId = orderResult.identifiers[0].id;

      // Prepare bulk order items insert
      const orderItems = createOrderDto.items.map(item => ({
        orderId,
        itemId: item.productId,
        quantity: item.quantity,
        price: productMap.get(item.productId).price,
        subtotal:item.quantity
      }));
      console.log(orderItems)
      // Bulk insert order items
      await queryRunner.manager.insert(OrderItem, orderItems);

      // Prepare bulk product updates
      const productUpdates = createOrderDto.items.map(item => {
        const product = productMap.get(item.productId);
        return {
          id: item.productId,
          stock: product.inventory - item.quantity
        };
      });

      // Bulk update products stock
      await Promise.all(
        productUpdates.map(update =>
          queryRunner.manager.update(Item, update.id, { inventory: update.stock })
        )
      );

      await queryRunner.commitTransaction();

      
      const createdOrder = await this.OrderRepository.findOne({
        where: { id: orderId },
        relations: ['orderItems']
      }); 
      
      this.logger.log({
        message: `created order for ${userId} userId with ${orderId} orderid`,
        data:createdOrder
        
      });
      // Fetch and return the complete order
      return {success:true,
        data:createdOrder
      }

    } catch (err) {
      this.logger.log({
        message: `error in create  order for ${userId} userId `,
        data:err
        
      });
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  

 async findAll(query:FindAllOrdersQueryDto):Promise<GetOrdersSuccessDto> {
  const orders = await this.OrderRepository.find();
    return {success:true,
      data:orders
    };
  }

  async findOne(id: number,userId:number): Promise<CreateOrderSuccessDto> {
    const order = await this.OrderRepository.findOne({where:{id:id,userId:userId}});

    return {success:true,
      data:order
    };
  }

}
