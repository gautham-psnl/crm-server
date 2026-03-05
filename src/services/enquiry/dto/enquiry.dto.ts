import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateEnquiryDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsNotEmpty()
    phone!: string;

    @IsString()
    @IsOptional()
    destination?: string;

    @IsNumber()
    @IsOptional()
    budget?: number;

    @IsString()
    @IsNotEmpty()
    sourceId!: string;

    @IsString()
    @IsOptional()
    assignedToId?: string;
}

export class UpdateEnquiryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    destination?: string;

    @IsNumber()
    @IsOptional()
    budget?: number;

    @IsString()
    @IsOptional()
    statusId?: string;

    @IsString()
    @IsOptional()
    assignedToId?: string;
}
