import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateItemDto {
    @ApiProperty({
      description: 'The name of the item',
      example: 'Wireless Mouse',
    })
    @IsString()
    name: string;
  
    @ApiProperty({
      description: 'A brief description of the item',
      example: 'A high-precision wireless mouse with ergonomic design.',
    })
    @IsString()
    description: string;
  
    @ApiProperty({
      description: 'The status of the item, must be one of the following: active, inactive, or pending',
      example: 'active',
    })
    @IsString()
    @IsIn(['active', 'inactive', 'pending'], { message: 'Status must be active, inactive, or pending' })
    status: string;
  
    @ApiProperty({
      description: 'The inventory count for the item. Must be zero or greater.',
      example: 50,
      minimum: 0,
    })
    @IsInt()
    @Min(0, { message: 'Inventory must be zero or greater' })
    inventory: number;
  
    @ApiProperty({
      description: 'The price of the item. Must be a positive number.',
      example: 29.99,
      minimum: 0.01,
    })
    @IsPositive({ message: 'Price must be a positive number' })
    price: number;

    @ApiProperty({
        description: 'A image of the item',
        example: 'image url.',
      })
      @IsString()
      imageUrl: string;

      @ApiProperty({
        description: 'category of the item',
        example: 'fruits',
      })
      @IsString()
      category: string;  
  }

export class CreateItemSuccessResponseDto {
    @ApiProperty({
        description: 'true',
        example: true,
      })
    success:boolean;
    @ApiProperty({ type: CreateItemDto })
    data:CreateItemDto
}  
export class GetItemsSuccessResponseDto {
    @ApiProperty({
        description: 'true',
        example: true,
      })
    success:boolean;

    @ApiProperty({
        description: 'total',
        example: 50,
      })
    total:number
    @ApiProperty({ type: CreateItemDto })
    data:CreateItemDto[]
}  

export class FindAllItemsQueryDto {
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
