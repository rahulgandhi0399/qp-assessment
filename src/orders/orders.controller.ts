import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, CreateOrderSuccessDto, FindAllOrdersQueryDto, GetOrdersSuccessDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiBearerAuth('Bearer')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a order' })
  @ApiOkResponse({ type: CreateOrderDto })
  @Post()
  create(@Request() req,@Body() createOrderDto: CreateOrderDto):Promise<CreateOrderSuccessDto> {
    const userId = req.user.id
    return this.ordersService.create(createOrderDto,userId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard) 
  @ApiOperation({ summary: 'Get all orders (for admin)' })
  @ApiOkResponse({ type: CreateOrderDto })
  @Get()
  findAll(@Query() query:FindAllOrdersQueryDto):Promise<GetOrdersSuccessDto> {
    return this.ordersService.findAll(query);
  }
  
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'get order by id (for user)' })
  @ApiOkResponse({ type: CreateOrderDto })
  @Get(':id')
  findOne(@Request() req,@Param('id') id: string):Promise<CreateOrderSuccessDto> {
    const userId = req.user.id
    return this.ordersService.findOne(+id,userId);
  }


}
