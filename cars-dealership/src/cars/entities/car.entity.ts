import { Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, 
    JoinColumn,
 ManyToOne} from 'typeorm';

  import { Dealership } from '../../dealerships/entities/dealership.entity.js';

export enum CarStatus {
    AVAILABLE = 'available',
    SOLD = 'sold',
    RESERVED = 'reserved',
}

@Entity()

export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    plate: string;
    
    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    price: number;

    @Column({type: 'enum', enum: CarStatus, default: CarStatus.AVAILABLE})
    status: CarStatus;

    @Column()
    dealershipId: number;

    @ManyToOne(() => Dealership, dealership => dealership.cars)
    dealership: Dealership;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
