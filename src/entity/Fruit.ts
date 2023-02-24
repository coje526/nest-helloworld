import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('fruit_price') // 指定table name
export class Fruit {
    // 每新增一筆的時候id+1
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
    
    @Column()
    price: number;
}
