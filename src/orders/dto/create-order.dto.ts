import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, Max, Min, ValidateNested } from "class-validator";
import { Order } from "../entities/order.entity";

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'The unique identifier of the product',
    example: 101,
  })
  @IsNumber()
  @IsPositive({ message: 'Product ID must be a positive number' })
  productId: number;

  @ApiProperty({
    description: 'The quantity of the product to be ordered. Must be a positive number.',
    example: 3,
  })
  @IsNumber()
  @IsPositive({ message: 'Quantity must be a positive number' })
  quantity: number;
}

export class CreateOrderDto {

  @ApiProperty({
    description: 'A unique reference ID for the order',
    example: 'REF123456789',
  })
  @IsString()
  referenceId: string;

  @ApiProperty({
    description: 'A list of items included in the order',
    type: [CreateOrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

}
  export class CreateOrderSuccessDto{
    @ApiProperty({
      description: 'true',
      example: true,
    })
    success:boolean;

    @ApiProperty({ type: Order })
    data:Order
  }
  
  export class GetOrdersSuccessDto{
    @ApiProperty({
      description: 'true',
      example: true,
    })
    success:boolean;

    @ApiProperty({ type: Order })
    data:Order[]
  }
   
  export class FindAllOrdersQueryDto {
    @ApiPropertyOptional({ minimum: 1, default: 1 })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    offset?: number = 1;
  
    @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 10 })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    limit?: number = 10;
  
    @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
    @IsOptional()
    order?: 'ASC' | 'DESC' = 'DESC';
  }
