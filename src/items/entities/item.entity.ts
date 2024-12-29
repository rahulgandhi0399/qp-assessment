
import { OrderItem } from 'src/orders/entities/orderItem.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', default: 'draft' })
  status: string;

  @Column({ type: 'numeric', default: 1 })
  inventory: number;

  @Column({ name: 'price', type: 'numeric', precision: 12, scale: 2 })
  price: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  imageUrl: string;


  @Column({ name: 'created_at', default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: new Date() })
  updatedAt: Date;

  @OneToMany(() => OrderItem, orderItem => orderItem.itemId)
  orderItems: OrderItem[];
   
   
  
}