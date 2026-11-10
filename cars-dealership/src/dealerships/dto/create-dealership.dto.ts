import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

import { Dealership } from '../entities/dealership.entity.js';

export class CreateDealershipDto {

    @IsString() 
    name: string;
    @IsString() 
    city: string;
    @IsBoolean()    
    active: boolean;
    cars?: Dealership[];
    
}
