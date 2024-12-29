import { Injectable } from '@nestjs/common';
import { CreateItemDto, CreateItemSuccessResponseDto, FindAllItemsQueryDto, GetItemsSuccessResponseDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CommonError, ItemErrorCodes } from 'errors';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private ItemRepository: Repository<Item>){}

  async checkIfItemExists(id:number){
    const existingItem = await this.ItemRepository.findOne({
      where: { id: id }
    }); 
    if(!existingItem) {
      throw new CommonError(ItemErrorCodes.ITEM_NOT_FOUND)

    }
  }

  async create(createItemDto: CreateItemDto):Promise<CreateItemSuccessResponseDto> {
    const existingItem = await this.ItemRepository.findOne({
      where: { name: createItemDto.name }
    });

    if (existingItem) {
      throw new CommonError(ItemErrorCodes.ITEM_EXISTS);
    }
    createItemDto.name = createItemDto.name.trim()
    createItemDto.description = createItemDto.description?.trim()
    const item = await this.ItemRepository.save(createItemDto);

    return {success:true,
      data : item
    };
  }

  async findAll(query:FindAllItemsQueryDto):Promise<GetItemsSuccessResponseDto> {
    const totalCount = await this.ItemRepository.count();
    const items = await this.ItemRepository.find({
      take: query.limit, // Limit the number of results
      skip: query.offset, // Offset for pagination
      order: {
        createdAt: query.order,
      },
    });
    return  {success:true,
      total:totalCount,
      data : items
    };
  }

  async findOne(id: number):Promise<CreateItemSuccessResponseDto>  {
    await this.checkIfItemExists(id)
    const item = await this.ItemRepository.findOne({where:{id:id}});
    return {success:true,
      data : item
    };
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.checkIfItemExists(id)
    await this.ItemRepository.update({id:id},updateItemDto)
    return "updated"
  }

  async incrementInventory(id: number, updateItemDto: UpdateItemDto) {
    await this.checkIfItemExists(id)
    await this.ItemRepository.update({id:id},updateItemDto)
    return "updated"
  }

  async  remove(id: number) {
    await this.checkIfItemExists(id)
    await this.ItemRepository.update({id:id},{status:'deleted'})
    return "deleted"
  }
}
