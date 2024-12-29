import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, CreateItemSuccessResponseDto, FindAllItemsQueryDto, GetItemsSuccessResponseDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard, AdminGuard) 
  @ApiOperation({ summary: 'Create a item' })
  @ApiOkResponse({ type: CreateItemSuccessResponseDto })
  @Post()
  create(@Body() createItemDto: CreateItemDto):Promise<CreateItemSuccessResponseDto> {
    return this.itemsService.create(createItemDto);
  }

  @ApiOperation({ summary: 'find all items' })
  @ApiOkResponse({ type: GetItemsSuccessResponseDto })
  @Get()
  findAll(@Query() query: FindAllItemsQueryDto):Promise<GetItemsSuccessResponseDto> {
    return this.itemsService.findAll(query);
  }


  @ApiOperation({ summary: 'get a item by id' })
  @ApiOkResponse({ type: CreateItemSuccessResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string):Promise<CreateItemSuccessResponseDto> {
    return this.itemsService.findOne(+id);
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: 'Update  a item' })
  @ApiOkResponse({ type: CreateItemSuccessResponseDto }) 
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }
  
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard, AdminGuard) 
  @ApiOperation({ summary: 'increment inventory for a item' })
  @ApiOkResponse({ type: CreateItemSuccessResponseDto })
  @Patch(':id')
  updateInventory(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard, AdminGuard) 
  @ApiOperation({ summary: 'Delete a item' })
  @ApiOkResponse({ type: CreateItemSuccessResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
