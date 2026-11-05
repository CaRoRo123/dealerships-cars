import { IsString, IsNumber, IsOptional } from 'class-validator';

import { Dealership } from '../entities/dealership.entity.js';

export class CreateDealershipDto {

    name: string;
    city: string;
    active: boolean;
    
}
