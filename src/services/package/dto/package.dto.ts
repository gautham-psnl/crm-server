import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePackageDto {
    @IsString()
    @IsNotEmpty()
    destination!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    duration!: number;

    @IsNumber()
    price!: number;

    @IsObject()
    hotelDetails!: Record<string, any>;

    @IsObject()
    dayWisePlan!: Record<string, any>;

    @IsObject()
    inclusions!: Record<string, any>;

    @IsObject()
    exclusions!: Record<string, any>;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class UpdatePackageDto {
    @IsString()
    @IsOptional()
    destination?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    duration?: number;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsObject()
    @IsOptional()
    hotelDetails?: Record<string, any>;

    @IsObject()
    @IsOptional()
    dayWisePlan?: Record<string, any>;

    @IsObject()
    @IsOptional()
    inclusions?: Record<string, any>;

    @IsObject()
    @IsOptional()
    exclusions?: Record<string, any>;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
