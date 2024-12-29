
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './order.entity';
import { Item } from 'src/items/entities/item.entity';

@Entity({ name: 'orders_items' })
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column()
    itemId: number;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    discountPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;

    @ManyToOne(() => Item, groceryItem => groceryItem.orderItems)
    groceryItem: Item;
}