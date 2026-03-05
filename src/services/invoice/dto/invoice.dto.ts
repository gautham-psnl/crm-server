import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInvoiceDto {
    @IsString()
    @IsNotEmpty()
    quotationId!: string;

    @IsString()
    @IsNotEmpty()
    customerId!: string;

    @IsNumber()
    amount!: number;
}

export class UpdateInvoiceDto {
    @IsString()
    @IsOptional()
    statusId?: string;

    @IsNumber()
    @IsOptional()
    amount?: number;
}
