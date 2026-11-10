import { Entity } from 'typeorm';
import { Car } from '../../cars/entities/car.entity.js';
import { OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { UpdateDateColumn } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';

@Entity()
export class Dealership {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    city: string;

    @Column()
    active: boolean;

    @OneToMany(() => Car, (car) => car.dealership)
    cars: Car[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
