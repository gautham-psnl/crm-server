import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateDealDto {
    @IsString()
    @IsNotEmpty()
    prospectId!: string;

    @IsNumber()
    expectedValue!: number;

    @IsInt()
    @Min(0)
    @Max(100)
    probability!: number;

    @IsDateString()
    expectedCloseDate!: string;

    @IsString()
    @IsNotEmpty()
    ownerId!: string;
}

export class UpdateDealDto {
    @IsString()
    @IsOptional()
    statusId?: string;

    @IsNumber()
    @IsOptional()
    expectedValue?: number;

    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    probability?: number;

    @IsDateString()
    @IsOptional()
    expectedCloseDate?: string;

    @IsString()
    @IsOptional()
    ownerId?: string;
}
