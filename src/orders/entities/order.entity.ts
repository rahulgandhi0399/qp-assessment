
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { User } from 'src/auth/entities/user.entity';

export enum OrderStatusEnum {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPING = 'shipping',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}


@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'enum', enum: OrderStatusEnum, default: OrderStatusEnum.PENDING })
  status: OrderStatusEnum;
  
  
  @Column({ name: 'referenceId' }) // Make sure column name matches database
  referenceId: string;

  @Column({ nullable: true })
  deliveryAddress: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[];
}